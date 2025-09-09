import { ProductCard } from "./ProductCard";
import { Product } from "@prisma/client";

type ProductRenderType = {
  data: Product[];
  isLoading?: boolean;
};

export const ProductCardRender = ({
  data,

  isLoading,
}: ProductRenderType) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* LOADING  */}
        {isLoading && <ProductGridSkeleton />}
        {!isLoading &&
          data.map((product: Product) => (
            <ProductCard key={product.id} data={product} />
          ))}
      </div>
    </>
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="bg-gray-800 w-full rounded-2xl shadow animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-700 rounded-t-2xl" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="w-3/4 h-5 bg-gray-700 rounded" />
        {/* Description */}
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-2/3 h-4 bg-gray-700 rounded" />
        {/* Price */}
        <div className="w-1/4 h-4 bg-gray-700 rounded" />
        {/* Button */}
        <div className="mt-4 h-10 w-full bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
};
