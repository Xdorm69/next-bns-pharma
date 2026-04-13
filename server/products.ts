import { ITEMS_PER_PAGE } from "@/app/products/page";
import { prisma } from "@/lib/prisma";
import { ProductCatType, ProductTypes } from "@prisma/client";
import { cacheLife } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

type fnProps = {
  search?: string;
  type?: string;
  category?: string;
  page?: number;
};

export async function getProducts({
  search,
  type,
  category,
  page = 1,
}: fnProps) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  // ✅ sanitize page
  const safePage = Math.max(1, Number(page) || 1);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      type: type !== "all" ? (type as ProductTypes) : undefined,
      category: category !== "all" ? (category as ProductCatType) : undefined,
    },
    skip: (safePage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return products;
}
