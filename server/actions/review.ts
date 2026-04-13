"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";

export async function submitReview(formData: {
  productId: string;
  rating: number;
  comment: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Not authenticated");

  const { productId, rating, comment } = formData;

  if (rating < 1 || rating > 5) throw new Error("Rating must be 1-5");
  if (!comment.trim()) throw new Error("Review cannot be empty");

  // Upsert — update if exists, create if not
  await prisma.review.upsert({
    where: { productId_userId: { productId, userId: session.user.id! } },
    update: { rating, comment },
    create: {
      productId,
      userId: session.user.id!,
      userName: session.user.name ?? "Anonymous",
      rating,
      comment,
    },
  });

  // Recalculate product rating
  const stats = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      rating: stats._avg.rating ?? 0,
      reviewsCount: stats._count.rating,
    },
  });

  updateTag(`reviews-${productId}`);
  updateTag(`product-${productId}`);
}

export async function deleteReview(productId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Not authenticated");

  await prisma.review.delete({
    where: { productId_userId: { productId, userId: session.user.id! } },
  });

  const stats = await prisma.review.aggregate({
    where: { productId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      rating: stats._avg.rating ?? 0,
      reviewsCount: stats._count.rating,
    },
  });

  updateTag(`reviews-${productId}`);
  updateTag(`product-${productId}`);
}
