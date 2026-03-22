import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const searchParams = new URL(req.url).searchParams;
    const search = (searchParams.get("search") || "") as string;
    const take = Number(searchParams.get("take")) || 3;
    const skip = Number(searchParams.get("skip")) || 0;
    
    
    const pcd = await prisma.product.findMany({
      where: { type: "PCD", name: { contains: search, mode: "insensitive" } },
      take,
      skip,
    });

    return NextResponse.json({ success: true, data: pcd }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
