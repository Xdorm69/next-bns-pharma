import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);

  if (!session) {
    try {
      const [pcd, thirdParty] = await prisma.$transaction([
        prisma.product.findMany({
          where: { type: "PCD" },
          take: 3,
          orderBy: { clicks: "desc" },
        }),
        prisma.product.findMany({
          where: { type: "ThirdParty" },
          take: 3,
          orderBy: { clicks: "desc" },
        }),
      ]);
      return NextResponse.json(
        { success: true, data: { pcd, thirdParty } },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  try {
    const [pcd, thirdParty] = await prisma.$transaction([
      prisma.product.findMany({ where: { type: "PCD" } }),
      prisma.product.findMany({ where: { type: "ThirdParty" } }),
    ]);
    return NextResponse.json(
      { success: true, data: { pcd, thirdParty } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
