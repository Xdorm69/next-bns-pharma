
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


type PageProps = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const [session, product] = await Promise.all([
    getServerSession(authOptions),
    getProductById(id),
  ]);

  if (!product) return notFound();

  // 🚀 non-blocking
  void updateClick(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Product Hero */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-96 h-72 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={product.thumbnail || product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover w-full h-full"
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
