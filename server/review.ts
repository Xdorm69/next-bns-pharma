
import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { ProductCatType } from "@prisma/client";

export async function getReviews(productId: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`reviews-${productId}`);

  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function getSuggestedProducts(
  productId: string,
  category: string,
) {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  return prisma.product.findMany({
    where: {
      category: category as ProductCatType,
      id: { not: productId },
      isActive: true,
    },
    take: 6,
    orderBy: { rating: "desc" },
  });
}

export async function getUserReview(productId: string, userId: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`reviews-${productId}`);

  return prisma.review.findUnique({
    where: { productId_userId: { productId, userId } },
  });
}
