import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const homepage = url.searchParams.get("homepage"); // ?homepage=true
  const session = await getServerSession(authOptions);

  if (!session || homepage === "true") {
    try {
      const pcd = await prisma.product.findMany({
        where: { type: 'PCD' },
        take: 3,
        orderBy: { clicks: "desc" },
      });
      return NextResponse.json({ success: true, data: pcd }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  try {
    const pcd = await prisma.product.findMany({
      where: { type: "PCD" },
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
