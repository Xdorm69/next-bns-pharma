// app/sitemap.ts
// Next.js auto-generates /sitemap.xml from this file.
// Submit https://bnspharmaceuticals.com/sitemap.xml to Google Search Console.

import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://bnspharmaceuticals.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: now,
      changeFrequency: "daily",   // products change often
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // ── Dynamic product routes ─────────────────────────────────────────────────
  // Fetches every active product from your Prisma DB and adds it to the sitemap.
  // Google will crawl and index each individual product page.
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    productRoutes = products.map((p) => ({
      url: `${BASE_URL}/products/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch products", error);
  }

  return [...staticRoutes, ...productRoutes];
}
