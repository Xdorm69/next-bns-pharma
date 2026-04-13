"use server";

import { revalidateTag } from "next/cache";

export default async function RefetchProducts() {
  revalidateTag("/products", "max");
}
