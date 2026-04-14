# BNS Pharma — SEO Implementation Guide

## What was changed and why

### 🐛 Bug Fixes (important!)
Your `contact/layout.tsx` and `about/layout.tsx` had this:
```ts
const Metadata = { title: '...' }  // ❌ plain variable — Next.js ignores this
```
It must be:
```ts
export const metadata: Metadata = { title: '...' }  // ✅ exported, typed
```
This means your contact and about pages had NO metadata being sent to Google.

---

## Files Changed

| File | What changed |
|------|-------------|
| `app/layout.tsx` | Added `title.template`, twitter card, robots, verification |
| `app/page.tsx` | Added explicit home metadata |
| `app/contact/layout.tsx` | Fixed export bug + full metadata |
| `app/about/layout.tsx` | Fixed export bug + full metadata |
| `app/products/page.tsx` | Added metadata export |
| `app/products/[id]/page.tsx` | Added `generateMetadata()` + JSON-LD |
| `app/sitemap.ts` | New — auto-generates `/sitemap.xml` with all products |
| `app/robots.ts` | Replaces `public/robots.txt` — blocks /admin /api |
| `components/StructuredData.tsx` | New — Organization + LocalBusiness JSON-LD |

---

## Step-by-step setup

### 1. Create your OG image
- Size: **1200 × 630 px**
- Tool: Canva (free), Figma, or just export your hero banner
- Save as `/public/og-image.jpg`
- This image shows when someone shares your link on WhatsApp, LinkedIn etc.

### 2. Create favicon files
Go to https://favicon.io or https://realfavicongenerator.net
Upload your `company_logo.png` and download the package.
Place in `/public/`:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

### 3. Add StructuredData to layout.tsx
```tsx
import StructuredData from "@/components/StructuredData";

// Inside <body>:
<StructuredData />
```

### 4. Delete public/robots.txt
The new `app/robots.ts` replaces it. Having both causes conflicts.

### 5. Google Search Console
1. Go to https://search.google.com/search-console
2. Add Property → URL prefix → `https://bnspharmaceuticals.com`
3. Verify via HTML tag → copy the code
4. Paste the code in `layout.tsx` → `verification.google`
5. After deploying, go to Sitemaps → submit `https://bnspharmaceuticals.com/sitemap.xml`

### 6. Test your metadata
- **OG tags**: https://opengraph.xyz — paste your URL, see the WhatsApp/Facebook preview
- **Twitter card**: https://cards-dev.twitter.com/validator
- **Structured data**: https://search.google.com/test/rich-results
- **Sitemap**: just visit `yoursite.com/sitemap.xml` in browser after deploy

---

## SEO tips specific to your project

### Dynamic products (`/products/[id]`)
Your `generateMetadata()` now pulls `product.name`, `product.description`,
and `product.image` from the DB and uses them as title/description/OG image.
Each product page is unique to Google. This is the biggest SEO win.

### Admin routes are blocked
`/admin`, `/api`, `/auth`, `/dashboard` are in robots.txt disallow.
Google won't waste crawl budget on login pages.

### Cache + SEO
Your `server/products.ts` uses `"use cache"` with `cacheLife("hours")`.
This means the sitemap and product pages are served fast, which is a
Core Web Vitals signal (Page Experience ranking factor).

### Image alt text
Your existing product page already uses `alt={product.name}` — good.
Make sure all `<Image>` components across the site have descriptive alt text.

### Local SEO (important for Punjab market)
The `LocalBusiness` JSON-LD in `StructuredData.tsx` targets local search.
When someone in Chandigarh searches "pharma company near me", Google uses
this data. Fill in the exact coordinates of your office.

---

## What NOT to do
- ❌ Don't keyword-stuff descriptions ("best pharma best medicine best quality...")
- ❌ Don't use the same description on multiple pages
- ❌ Don't block `/products` in robots.txt
- ❌ Don't use `<head>` tags manually — use the Metadata API only
- ❌ Don't set `noindex` on pages you want indexed
