
"use server";

import { isAdmin } from "@/lib/auth";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import { AddProductSchema } from "@/lib/validations/addprod";
import { Product, ProductCatType, ProductTypes, User } from "@prisma/client";
import { revalidatePath, updateTag } from "next/cache";
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

type getProductsResponse = {
  success: boolean;
  message?: string;
  products: Product[];
  total: number;
  totalPages: number;
};

type adminPageResponseType = {
  success: boolean;
  message?: string;
  totalProducts: number;
  totalUsers: number;
};

export async function getProducts({
  search,
  type,
  take = ITEMS_PER_PAGE,
  category,
  active,
  page = 1,
  skip,
}: FetchProductsProps): Promise<getProductsResponse> {
  "use cache";
  cacheLife("hours");
  
  cacheTag("products");

  const safePage = Math.max(1, Number(page) || 1);

  const safeSkip = (safePage - 1) * take;

  const where = {
    ...(search && {
      name: {
        startsWith: search,
        mode: "insensitive" as const,
      },
    }),
    ...(type && type != "all" && { type: type as ProductTypes }),
    ...(category &&
      category != "all" && { category: category as ProductCatType }),
    ...(active !== undefined && { isActive: active }),
  };

  if (process.env.NODE_ENV === "development")
    console.log("📦 getProducts called:", { where, safePage });

  try {
    const [products, count] = await Promise.all([
      prisma.product.findMany({
        where,
        take,
        skip: safeSkip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      success: true,
      products,
      total: count,
      totalPages: Math.ceil(count / take),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      message: (error as Error).message,
      products: [],
      total: 0,
      totalPages: 0,
    };
  }
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

export async function adminPageDetails(): Promise<adminPageResponseType> {
  const isAdminUser = await isAdmin();

  if (!isAdminUser)
    return {
      success: false,
      message: "Unauthorized",
      totalProducts: 0,
      totalUsers: 0,
    };

  try {
    const [totalProducts, totalUsers] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
    ]);

    return { success: true, totalProducts, totalUsers };
  } catch (error) {
    console.error("Error getting admin page details:", error);

    return {
      success: false,
      message: (error as Error).message,
      totalProducts: 0,
      totalUsers: 0,
    };
  }
}

type editProductResponse = {
  success: boolean;
  message: string;
  product: Product;
};

export async function editProduct(
  id: string,
  data: {
    name: string;
    type: ProductTypes;
    category: ProductCatType;
  },
): Promise<editProductResponse> {
  //verifying admin
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    return {
      success: false,
      message: "Unauthorized",
      product: {} as Product,
    };
  }

  try {
    //updating my product;
    const p = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        category: data.category,
      },
    });

    //updating cache
    updateTag("products");

    return {
      success: true,
      message: "Product updated successfully",
      product: p,
    };

  } catch (error) {
    console.log("ERROR WHILE UPDATING PRODUCT, " + error);
    return {
      success: false,
      message: "Error while updating product",
      product: {} as Product,
    };
  }
}
