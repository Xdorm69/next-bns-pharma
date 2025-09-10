import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// File: app/api/products/[id]/route.ts
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id: id as string }, // 👈 if `id` is Int in Prisma schema → use Number(id)
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
