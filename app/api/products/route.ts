import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { imagekit } from "@/lib/imagekit";
import { AddProductSchema } from "@/lib/validations/addprod";
import { ProductTypes } from "@prisma/client";

export async function POST(request: NextRequest) {
  // 1️⃣ Get session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "User is unauthenticated" },
      { status: 401 },
    );
  }

  const isAdmin = session.user.role === "ADMIN";
  if (!isAdmin)
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 403 },
    );

  const body = await request.json();
  const parsed = AddProductSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message).join(", ");
    return NextResponse.json(
      { success: false, error: errors },
      { status: 400 },
    );
  }

  const data = parsed.data; // Use validated and parsed data

  // 4️⃣ Upload image to ImageKit
  let imageUrl = "";
  try {
    const uploadResponse = await imagekit.upload({
      file: data.image, // base64 string
      fileName: `${data.name}-${Date.now()}.jpg`,
      folder: "/products",
    });
    imageUrl = uploadResponse.url;
  } catch (err) {
    console.error("Image upload error:", err);
    return NextResponse.json(
      { success: false, error: "Image upload failed" },
      { status: 500 },
    );
  }

  // 5️⃣ Save product in database
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        category: data.category,
        ingredients: data.ingredients,
        image: imageUrl,
        thumbnail: data.thumbnail,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Prisma create error:", err);

    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 },
    );
  }
}

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
