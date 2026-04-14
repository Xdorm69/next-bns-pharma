// app/robots.ts
// Next.js generates /robots.txt from this file automatically.
// DELETE the existing /public/robots.txt — this replaces it.
// The app/robots.ts version is smarter: it can block admin routes etc.

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers on public pages
        userAgent: "*",
        allow: ["/", "/about", "/products", "/contact"],
        // Block admin, auth, api, and dashboard from being indexed
        disallow: ["/admin/", "/api/", "/auth/", "/dashboard/"],
      },
    ],
    sitemap: "https://bnspharmaceuticals.com/sitemap.xml",
    host: "https://bnspharmaceuticals.com",
  };
}
