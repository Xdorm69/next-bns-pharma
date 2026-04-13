import { ITEMS_PER_PAGE } from "@/lib/Constants";
import { prisma } from "@/lib/prisma";
import { Product, ProductCatType, ProductTypes } from "@prisma/client";
import { cacheLife, cacheTag } from "next/cache";

type FetchProductsProps = {
  search?: string;
  type?: string;
  category?: string;
  page?: number;
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

  // Coerce safely — never trust incoming values
  const safePage = Math.max(1, Number(page) || 1);
  const where = buildWhereClause({ search, type, category });

  // DEBUG 3 — if this logs on EVERY request, cache is not working
  // If it only logs once then stops, cache IS working
  console.log("📦 getProducts called (cache miss):", { where, safePage });

  // Run both queries in parallel
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (safePage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, totalPages: Math.ceil(total / ITEMS_PER_PAGE) };
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
