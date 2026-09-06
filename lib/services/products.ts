import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { AddProductSchema } from "@/lib/validations/addprod";
import { Product, ProductCatType, ProductTypes } from "@prisma/client";
import { uploadProductImage, deleteProductImage } from "./image-upload";

/**
 * Product service layer.
 *
 * Holds the actual Prisma queries and business rules for products. Nothing
 * in here knows about Next.js cache tags, "use server", or admin auth —
 * that's the job of the thin wrappers in server/products.ts. Keeping the
 * two apart means the same logic can be called from a server action, a
 * route handler, or a script/test without dragging in framework concerns.
 */

export type ProductFilters = {
  search?: string;
  type?: string;
  category?: string;
  active?: boolean;
  take?: number;
  page?: number;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  totalPages: number;
};

function buildProductWhere({
  search,
  type,
  category,
  active,
}: Pick<ProductFilters, "search" | "type" | "category" | "active">) {
  return {
    ...(search && {
      name: {
        startsWith: search,
        mode: "insensitive" as const,
      },
    }),
    ...(type && type !== "all" && { type: type as ProductTypes }),
    ...(category &&
      category !== "all" && { category: category as ProductCatType }),
    ...(active !== undefined && { isActive: active }),
  };
}

export async function listProducts({
  search,
  type,
  category,
  active,
  take = ITEMS_PER_PAGE,
  page = 1,
}: ProductFilters): Promise<ProductListResult> {
  const safePage = Math.max(1, Number(page) || 1);
  const skip = (safePage - 1) * take;
  const where = buildProductWhere({ search, type, category, active });

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, totalPages: Math.ceil(total / take) };
}

export async function findProductById(id: string): Promise<Product | null> {
  return prisma.product.findUnique({ where: { id } });
}

export type NewProductInput = {
  name: string;
  description: string;
  type: ProductTypes;
  category: ProductCatType;
  ingredients: string;
  image: string; // base64 payload from the client
  thumbnail: string;
};

/**
 * Validates, uploads the image, then creates the product. If the DB write
 * fails after a successful upload, the uploaded image is deleted so it
 * doesn't linger orphaned in ImageKit.
 */
export async function createProduct(body: NewProductInput): Promise<Product> {
  const parsed = AddProductSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message).join(", ");
    throw new Error(errors);
  }

  const data = parsed.data;
  const uploaded = await uploadProductImage(data.image, data.name);

  try {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type as ProductTypes,
        category: data.category as ProductCatType,
        ingredients: data.ingredients,
        image: uploaded.url,
        thumbnail: data.thumbnail,
      },
    });
  } catch (err) {
    console.error("Prisma create error:", err);
    await deleteProductImage(uploaded.fileId);
    throw err;
  }
}

export async function removeProduct(id: string): Promise<Product> {
  return prisma.product.delete({ where: { id } });
}

export async function setProductActive(
  id: string,
  active: boolean,
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: { isActive: active },
  });
}

export type ProductEditInput = {
  name: string;
  type: ProductTypes;
  category: ProductCatType;
};

export async function updateProductInfo(
  id: string,
  data: ProductEditInput,
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      type: data.type,
      category: data.category,
    },
  });
}

export async function countProducts(): Promise<number> {
  return prisma.product.count();
}
