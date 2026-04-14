import PaginationBtns from "@/components/PaginationBtns";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/server/products";
import { Product } from "@prisma/client";
import ProductResults from "./ProductResults";


// ProductsListWrapper.tsx
import { Suspense } from "react";
import { ProductSkeletonFallback } from "../page";


type ProductListProps = {
  search?: string;
  type: string;
  category: string;
  page: number;
};

export const ProductsListWrapper = (props: ProductListProps) => {
  return (
    <Suspense fallback={<ProductSkeletonFallback />}>
      <ProductsList {...props} />
    </Suspense>
  );
}

const ProductsList = async ({
  search,
  type,
  category,
  page,
}: ProductListProps) => {
  const { products, totalPages, total } = await getProducts({
    search,
    type,
    category,
    page: page || 1,
  });

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <>
      <ProductResults
        count={total}
        search={search}
        type={type}
        category={category}
        page={page}
      />
      <div className="bg-white rounded-2xl shadow p-4 md:p-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
        {/* Moved outside grid so it spans full width */}
        <div className="mt-6">
          <PaginationBtns totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default ProductsList;
