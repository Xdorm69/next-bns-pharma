import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { imagekit } from "@/lib/imagekit";


export async function POST(request: NextRequest) {
  // 1️⃣ Get session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "User is unauthenticated" },
      { status: 401 }
    );
  }

  // 2️⃣ Check admin role
  const email = session.user?.email;

  if (!email) {
    return NextResponse.json(
      { success: false, error: "User email not found in session" },
      { status: 400 }
    );
  }

  const isAdmin = await prisma.user.findUnique({
    where: { email },
  });


  if (!isAdmin || isAdmin.role !== "ADMIN") {
    return NextResponse.json(
      { success: false, error: "User is not authorized" },
      { status: 403 }
    );
  }

  // 3️⃣ Parse form data
  const data = await request.json();
  const {
    name,
    description,
    price,
    ProductType,
    type,
    clicks,
    stock,
    isActive,
    category,
    ingredients,
    manufacturer,
    expiryDate,
    image, // base64 string
    thumbnail,
    rating,
    reviewsCount,
  } = data;

  // 4️⃣ Upload image to ImageKit
  let imageUrl = "";
  try {
    const uploadResponse = await imagekit.upload({
      file: image, // base64 string or file buffer
      fileName: `${name}-${Date.now()}.jpg`,
      folder: "/products",
    });
    imageUrl = uploadResponse.url;
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Image upload failed" },
      { status: 500 }
    );
  }

  // 5️⃣ Save product in database
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      ProductType,
      type,
      clicks: clicks || 0,
      stock,
      isActive,
      category,
      ingredients,
      manufacturer,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      image: imageUrl,
      thumbnail,
      rating,
      reviewsCount,
    },
  });

  return NextResponse.json({ success: true, product });
}
