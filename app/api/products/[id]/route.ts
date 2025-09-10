import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: id } });
    return NextResponse.json({succes: true, data: product});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ succes: false, data: []});

  }
}
