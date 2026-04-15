import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { ProductTypes } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { success: false, error: "User is not authenticated" },
      { status: 403 },
    );

  if (session.user.role !== "ADMIN")
    return NextResponse.json(
      { success: false, error: "User is not authorized" },
      { status: 403 },
    );

  try {
    const searchParams = new URL(request.url).searchParams;
    const type = searchParams.get("type") as ProductTypes;
    const active = searchParams.get("active");
    const search = searchParams.get("search");
    const take = Number(searchParams.get("take")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;

    const products = await prisma.product.findMany({
      where: {
        ...(type && {
          type: type,
        }),
        ...(active && { isActive: active === "true" }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { ingredients: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      take,
      skip,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 },
    );
  }
}
