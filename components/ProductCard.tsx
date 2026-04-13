import Image from "next/image";
import { Product } from "@prisma/client";
import Link from "next/link";

export function ProductCard({ data }: { data: Product }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-sm shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-60 bg-gray-100">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 justify-between">
        {/* Title + Type */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold line-clamp-1">
            {data.name}
          </h2>
          {data.type && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {data.type}
            </p>
          )}
        </div>

        {/* Description */}
        {data.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Rating */}
        {(data.rating !== undefined || data.reviewsCount !== undefined) && (
          <p className="text-xs text-yellow-500">
            {data.rating ? `⭐ ${data.rating.toFixed(1)}` : ""}
            {data.reviewsCount ? ` (${data.reviewsCount} reviews)` : ""}
          </p>
        )}

        {/* Footer */}
        <Link
          href={`/products/${data.id}`}
          className="text-center btn btn-primary "
        >
          View More
        </Link>
      </div>
    </div>
  );
}
