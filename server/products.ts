import { authOptions } from "@/lib/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import { AddProductSchema } from "@/lib/validations/addprod";
import { Product, ProductCatType, ProductTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";
import { cacheLife, cacheTag } from "next/cache";

type FetchProductsProps = {
  search?: string;
  type?: string;
  category?: string;
  active?: boolean;
  take?: number;
  page?: number;
  skip?: number;
};

type addProductType = {
  name: string;
  description: string;
  type: ProductTypes;
  category: ProductCatType;
  ingredients: string;
  image: string;
  thumbnail: string;
};

function buildWhereClause({
  search,
  type,
  category,
}: Omit<FetchProductsProps, "page">) {
  return {
    ...(search && {
      name: { contains: search, mode: "insensitive" as const },
    }),
    ...(type && type !== "all" && { type: type as ProductTypes }),
    ...(category &&
      category !== "all" && { category: category as ProductCatType }),
  };
}

async function isAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

export async function getProducts({
  search,
  type,
  take = ITEMS_PER_PAGE,
  category,
  active,
  page = 1,
  skip = (page - 1) * take,
}: FetchProductsProps) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const safePage = Math.max(1, Number(page) || 1);

  const where = {
    ...(search && {
      name: {
        startsWith: search, // 🔥 faster
        mode: "insensitive" as const,
      },
    }),
    ...(type && type !== "all" && { type: type as ProductTypes }),
    ...(category &&
      category !== "all" && { category: category as ProductCatType }),
    ...(active !== undefined && { isActive: active }),
  };

  if (process.env.NODE_ENV === "development")
    console.log("📦 getProducts called:", { where, safePage });

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total: count,
    totalPages: Math.ceil(count / take),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${id}`);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function addProduct(
  body: addProductType,
): Promise<{ success: boolean; product?: Product; error?: string }> {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) throw new Error("Unauthorized");

  const parsed = AddProductSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message).join(", ");
    throw new Error(errors);
  }

  const data = parsed.data; // Use validated and parsed data

  // 4️⃣ Upload image to ImageKit
  let imageUrl = "";
  try {
    const uploadResponse = await imagekit.upload({
      file: data.image, // base64 string
      fileName: `${data.name}-${Date.now()}.jpg`,
      folder: "/products",
    });
    imageUrl = uploadResponse.url;
  } catch (err) {
    console.error("Image upload error:", err);
    throw new Error("Image upload failed");
  }

  // 5️⃣ Save product in database
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type as ProductTypes,
        category: data.category as ProductCatType,
        ingredients: data.ingredients,
        image: imageUrl,
        thumbnail: data.thumbnail,
      },
    });

    //refresh cache
    updateTag("products");
    return { success: true, product };
  } catch (err) {
    console.error("Prisma create error:", err);

    throw err;
  }
}

export async function deleteProduct(id: string) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) throw new Error("Unauthorized");

    const product = await prisma.product.delete({
      where: { id },
    });

    //refresh cache
    updateTag("products");
    return product;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function toggleProductActive(id: string, active: boolean) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) throw new Error("Unauthorized");

    const product = await prisma.product.update({
      where: { id },
      data: {
        isActive: active,
      },
    });

    //refresh cache
    updateTag("products");
    updateTag(`product-${id}`);
    
    return product;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
