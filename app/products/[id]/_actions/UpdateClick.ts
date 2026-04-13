"use server";

import { prisma } from "@/lib/prisma";

export async function updateClick(id: string) {
  await prisma.product.update({
    where: { id },
    data: { clicks: { increment: 1 } },
  });
}