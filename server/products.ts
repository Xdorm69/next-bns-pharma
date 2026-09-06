
"use server";

import { withAdminAuth } from "@/lib/auth/withAdminAuth";
import * as productService from "@/lib/services/products";
import * as userService from "@/lib/services/users";
import { Product, ProductCatType, ProductTypes } from "@prisma/client";
import { updateTag } from "next/cache";
import { cacheLife, cacheTag } from "next/cache";
import { ActionResponse } from "@/types/actions";
import { prisma } from "@/lib/prisma";

/**
 * This file is the Next.js boundary for products: "use server", cache
 * tags/lifetimes, admin-auth gating, and cache invalidation on mutation.
 * The actual Prisma queries and business rules live in
 * lib/services/products.ts, which knows nothing about any of that — so the
 * same logic is reusable from a route handler, a script, or a test.
 */

type FetchProductsProps = {
  search?: string;
  type?: string;
  category?: string;
  active?: boolean;
  take?: number;
  page?: number;
  skip?: number;
};

type addProductType = {
  name: string;
  description: string;
  type: ProductTypes;
  category: ProductCatType;
  ingredients: string;
  image: string;
  thumbnail: string;
};

// getProducts/getProductById are public, cached reads (not admin-gated), so
// they intentionally keep their own paginated-result shape rather than
// ActionResponse<T> — that type is for admin mutations below.
type getProductsResponse = {
  success: boolean;
  message?: string;
  products: Product[];
  total: number;
  totalPages: number;
};

export async function getProducts({
  search,
  type,
  category,
  active,
  take,
  page = 1,
}: FetchProductsProps): Promise<getProductsResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  if (process.env.NODE_ENV === "development")
    console.log("📦 getProducts called:", { search, type, category, active, page });

  try {
    const { products, total, totalPages } = await productService.listProducts({
      search,
      type,
      category,
      active,
      take,
      page,
    });

    return { success: true, products, total, totalPages };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      message: (error as Error).message,
      products: [],
      total: 0,
      totalPages: 0,
    };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${id}`);

  try {
    return await productService.findProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getProductBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`product-${slug}`);

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// ── Admin mutations below ────────────────────────────────────────────────
// Every one of these is wrapped with withAdminAuth, which runs the
// isAdmin() check once and converts any thrown error into a consistent
// ActionResponse failure.

export const addProduct = withAdminAuth(
  async (body: addProductType): Promise<ActionResponse<Product>> => {
    const product = await productService.createProduct(body);
    updateTag("products");
    return { success: true, data: product };
  },
);

export const deleteProduct = withAdminAuth(
  async (id: string): Promise<ActionResponse<Product>> => {
    const product = await productService.removeProduct(id);
    updateTag("products");
    return { success: true, data: product };
  },
);

export const toggleProductActive = withAdminAuth(
  async (id: string, active: boolean): Promise<ActionResponse<Product>> => {
    const product = await productService.setProductActive(id, active);
    updateTag("products");
    updateTag(`product-${id}`);
    return { success: true, data: product };
  },
);

export const adminPageDetails = withAdminAuth(
  async (): Promise<
    ActionResponse<{ totalProducts: number; totalUsers: number }>
  > => {
    const [totalProducts, totalUsers] = await Promise.all([
      productService.countProducts(),
      userService.countUsers(),
    ]);

    return { success: true, data: { totalProducts, totalUsers } };
  },
);

export const editProduct = withAdminAuth(
  async (
    id: string,
    data: {
      name: string;
      type: ProductTypes;
      category: ProductCatType;
    },
  ): Promise<ActionResponse<Product>> => {
    const product = await productService.updateProductInfo(id, data);
    updateTag("products");
    return { success: true, data: product };
  },
);
