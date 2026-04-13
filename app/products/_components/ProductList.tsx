
import PaginationBtns from "@/components/PaginationBtns";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/server/products";
import { Product } from "@prisma/client";

type ProductListProps = {
  search?: string;
  type: string;
  category: string;
  page: number;
};

const ProductsList = async ({
  search,
  type,
  category,
  page,
}: ProductListProps) => {
  const { products, totalPages } = await getProducts({
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
    <div>
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
  );
};

export default ProductsList;
