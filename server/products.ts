import { ITEMS_PER_PAGE } from "@/app/products/page";
import { prisma } from "@/lib/prisma";
import { ProductCatType, ProductTypes } from "@prisma/client";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

type fnProps = {
  search?: string;
  productType?: string;
  type?: string;
  page?: number;
};
export async function getProducts({
  search,
  productType,
  type,
  page = 1,
}: fnProps) {
  "use cache";
  cacheTag("products");

  // ✅ sanitize page
  const safePage = Math.max(1, Number(page) || 1);

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      ProductType:
        productType !== "all" ? (productType as ProductTypes) : undefined,
      type: type !== "all" ? (type as ProductCatType) : undefined,
    },
    skip: (safePage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  return products;
}
