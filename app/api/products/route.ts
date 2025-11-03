import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { imagekit } from "@/lib/imagekit";
import {
  AddProductSchema,
  AddProductSchemaType,
} from "@/lib/validations/addprod";
import { ProductCatType, ProductTypes } from "@prisma/client";

export async function POST(request: NextRequest) {
  // 1️⃣ Get session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "User is unauthenticated" },
      { status: 401 }
    );
  }

  const isAdmin = session.user.role === "ADMIN";
  if (!isAdmin)
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 403 }
    );

  // 3️⃣ Parse and validate JSON using Zod
  let data: AddProductSchemaType;
  try {
    const body = await request.json();
    const parsed = AddProductSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    data = parsed.data; // Use validated and parsed data
  } catch (err) {
    console.error(err)
    const text = await request.text();
    console.error("Invalid JSON body:", text);
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

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
      { status: 500 }
    );
  }

  // 5️⃣ Save product in database
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price ?? 0,
        ProductType: data.ProductType,
        type: data.type,
        clicks: data.clicks ?? 0,
        stock: data.stock ?? 0,
        isActive: data.isActive ?? true,
        category: data.category,
        ingredients: data.ingredients,
        manufacturer: data.manufacturer,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
        image: imageUrl,
        thumbnail: data.thumbnail,
        rating: data.rating,
        reviewsCount: data.reviewsCount,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Prisma create error:", err);

    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { success: false, error: "User is not authenticated" },
      { status: 403 }
    );

  if (session.user.role !== "ADMIN")
    return NextResponse.json(
      { success: false, error: "User is not authorized" },
      { status: 403 }
    );

  try {
    const searchParams = new URL(request.url).searchParams;
    const productType = searchParams.get("productType");
    const type = searchParams.get("type") as ProductCatType;
    const active = searchParams.get("active");
    const search = searchParams.get("search");
    const take = Number(searchParams.get("take")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;

    const products = await prisma.product.findMany({
      where: {
        ...(productType && { ProductType: productType as ProductTypes }),
        ...(type && {
          type: type,
        }),
        ...(active && { isActive: active === "true" }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { manufacturer: { contains: search, mode: "insensitive" } },
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
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 400 }
    );
  }
}
