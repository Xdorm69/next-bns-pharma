import { authOptions } from "@/lib/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import { devComment } from "@/lib/utils/devComment";
import { AddProductSchema } from "@/lib/validations/addprod";
import { Product, ProductCatType, ProductTypes } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cacheLife, cacheTag } from "next/cache";

type FetchProductsProps = {
  search?: string;
  type?: string;
  category?: string;
  page?: number;
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

export async function getProducts({
  search,
  type,
  category,
  page = 1,
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
  };

  if (process.env.NODE_ENV === "development")
    console.log("📦 getProducts called:", { where, safePage });

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      take: ITEMS_PER_PAGE,
      skip: (safePage - 1) * ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total: count,
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
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
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("User unauthorized");
  }

  // ONLY ADMIN CAN ADD PRODUCTS
  const isAdmin = session.user.role === "ADMIN";
  if (!isAdmin) throw new Error("Unauthorized");

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

    return { success: true, product };
  } catch (err) {
    console.error("Prisma create error:", err);

    throw err;
  }
}
