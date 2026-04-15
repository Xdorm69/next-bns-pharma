"use server";

import sharp from "sharp";
import {
  addProduct,
  deleteProduct,
  getProducts,
  toggleProductActive,
} from "@/server/products";
import { ProductCatType, ProductTypes } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addProductAction(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) throw new Error("Image required");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const compressed = await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toBuffer();

  const base64 = `data:image/webp;base64,${compressed.toString("base64")}`;

  await addProduct({
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || "",
    type: formData.get("type") as ProductTypes,
    category: formData.get("category") as ProductCatType,
    ingredients: (formData.get("ingredients") as string) || "",
    image: base64,
    thumbnail: "",
  });

  revalidatePath("/admin/products");
}

export async function deleteProductAction(id: string) {
  await deleteProduct(id);
  revalidatePath("/admin/products");
}

export async function toggleProductActiveAction(id: string, active: boolean) {
  await toggleProductActive(id, !active);
  revalidatePath("/admin/products");
}

export async function fetchProductsAction(filters: {
  search?: string;
  type?: string;
  category?: string;
  active?: boolean;
  page?: number;
  take?: number;
}) {
  const { search, type, category, active, page, take } = filters;
  const products = await getProducts({
    search,
    type,
    category,
    active,
    page,
    take,
  });
  return products;
}
