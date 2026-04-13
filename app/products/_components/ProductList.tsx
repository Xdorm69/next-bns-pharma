import { ProductCard } from "@/components/ProductCard";
import { Product } from "@prisma/client";

type ProductListProps = {
  products: Product[];
  search?: string;
  type: string;
  category: string;
  page: number;
};
const ProductsList = async ({ products }: ProductListProps) => {
  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductsList;
