"use server";

import { prisma } from "@/lib/prisma";

export async function updateClick(slug: string) {
  await prisma.product.update({
    where: { slug },
    data: { clicks: { increment: 1 } },
  });
}