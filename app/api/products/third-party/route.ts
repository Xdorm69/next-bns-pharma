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
      const thirdParty = await prisma.product.findMany({
        where: { type: "THIRDPARTY"},
        take: 3,
        orderBy: { clicks: "desc" },
      });
      return NextResponse.json(
        { success: true, data: thirdParty },
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
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search") as string;
    const priceFilter = searchParams.get("price") as "asc" | "desc";
    const expiryFilter = searchParams.get("expiry") as "asc" | "desc";
    const take = Number(searchParams.get("take")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;

    const orderBy: Array<{
      price?: "asc" | "desc";
      expiryDate?: "asc" | "desc";
    }> = [];
    if (priceFilter) orderBy.push({ price: priceFilter });
    if (expiryFilter) orderBy.push({ expiryDate: expiryFilter });

    const thirdParty = await prisma.product.findMany({
      where: { type: "THIRDPARTY", name: { contains: search, mode: "insensitive" } },
      orderBy: orderBy.length ? orderBy : undefined,
      take,
      skip,
    });

    return NextResponse.json({ success: true, data: thirdParty }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
