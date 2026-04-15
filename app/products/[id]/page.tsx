import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getProductById } from "@/server/products";
import { updateClick } from "./_actions/UpdateClick";
import StarDisplay from "./_components/StarDisplay";
import ReviewSkeleton from "./_components/ReviewSkeleton";
import ReviewSection from "./_components/ReviewSection";
import SuggestedSkeleton from "./_components/SuggestedSkeleton";
import SuggestedProducts from "./_components/SuggestedProducts";
import { Metadata, ResolvingMetadata } from "next";

type PageProps = { params: Promise<{ id: string }> };

// ─── DYNAMIC METADATA ────────────────────────────────────────────────────────
// Runs server-side for every product. Google indexes each product page with
// its own unique title, description, and OG image.
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  // If product not found, return minimal metadata (page will 404 anyway)
  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product could not be found.",
      robots: { index: false, follow: false },
    };
  }

  // Inherit parent OG images as fallback if product has no image
  const parentImages = (await parent).openGraph?.images || [];

  const title = product.name;
  const description = product.description
    ? `${product.description.slice(0, 140)}...`
    : `${product.name} — a ${product.type.toLowerCase()} by BNS Pharma. Available for PCD franchise and third-party manufacturing.`;

  return {
    // → "Paracetamol 500mg | BNS Pharma"
    title,
    description,

    keywords: [
      product.name,
      product.type.toLowerCase(),
      `${product.type.toLowerCase()} manufacturer India`,
      `buy ${product.name.toLowerCase()}`,
      "BNS Pharma",
      product.category === "PCD"
        ? "PCD pharma franchise"
        : "third party manufacturing",
    ],

    alternates: {
      canonical: `https://bnspharmaceuticals.com/products/${id}`,
    },

    openGraph: {
      title: `${product.name} | BNS Pharma`,
      description,
      url: `https://bnspharmaceuticals.com/products/${id}`,
      images: [
        {
          url: product.image, // ImageKit URL from your DB
          alt: product.name,
          width: 800,
          height: 800,
        },
        ...parentImages, // fallback to global OG image
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | BNS Pharma`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const [session, product] = await Promise.all([
    getServerSession(authOptions),
    getProductById(id),
  ]);

  if (!product) return notFound();

  // 🚀 non-blocking
  void updateClick(id);
  const compressedImageUrl = product.image + "?tr=q-75,f-auto,w-400";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* ── JSON-LD Structured Data ─────────────────────────────────────── */}
        {/* This is what Google uses to show rich results (star ratings etc.) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description ?? "",
              image: product.image,
              brand: {
                "@type": "Brand",
                name: "BNS Pharma",
              },
              manufacturer: {
                "@type": "Organization",
                name: "BNS Pharma",
                url: "https://bnspharmaceuticals.com",
              },
              ...(product.rating && product.reviewsCount
                ? {
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: product.rating.toFixed(1),
                      reviewCount: product.reviewsCount,
                      bestRating: "5",
                      worstRating: "1",
                    },
                  }
                : {}),
              offers: {
                "@type": "Offer",
                availability: product.isActive
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
                seller: {
                  "@type": "Organization",
                  name: "BNS Pharma",
                },
              },
            }),
          }}
        />

        {/* Product Hero */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-96 h-72 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={compressedImageUrl}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </p>
              <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
              <p className="text-sm text-gray-400">{product.type}</p>
            </div>

            {/* Star summary */}
            <div className="flex items-center gap-2">
              <StarDisplay rating={product.rating ?? 0} size="lg" />
              <span className="text-sm text-gray-500">
                {product.rating?.toFixed(1) ?? "No ratings"}{" "}
                {product.reviewsCount
                  ? `(${product.reviewsCount} reviews)`
                  : ""}
              </span>
            </div>

            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.ingredients && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Ingredients
                </p>
                <p className="text-sm text-gray-500">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>
        {/* Reviews — streamed */}
        <Suspense fallback={<ReviewSkeleton />}>
          <ReviewSection
            productId={product.id}
            userId={session?.user?.id}
            userName={session?.user?.name}
          />
        </Suspense>
        {/* Suggested — streamed */}
        <Suspense fallback={<SuggestedSkeleton />}>
          <SuggestedProducts
            productId={product.id}
            category={product.category}
          />
        </Suspense>
      </div>
    </div>
  );
}
