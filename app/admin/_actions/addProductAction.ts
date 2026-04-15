// app/actions/addProductAction.ts
"use server";

import sharp from "sharp";
import { addProduct } from "@/server/products";
import { ProductCatType, ProductTypes } from "@prisma/client";

export async function addProductAction(formData: FormData) {
  const file = formData.get("image") as File;

  if (!file) throw new Error("Image required");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 🔥 compress on server
  const compressed = await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toBuffer();

  const base64 = `data:image/webp;base64,${compressed.toString("base64")}`;

  return await addProduct({
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || "",
    type: formData.get("type") as ProductTypes,
    category: formData.get("category") as ProductCatType,
    ingredients: (formData.get("ingredients") as string) || "",
    image: base64,
    thumbnail: "",
  });
}
