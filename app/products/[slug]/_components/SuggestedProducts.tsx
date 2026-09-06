
import { ProductCard } from "@/components/ProductCard";
import { getSuggestedProducts } from "@/server/review";
import { Product } from "@prisma/client";

type Props = { productId: string; category: string };

export default async function SuggestedProducts({
  productId,
  category,
}: Props) {
  const products = await getSuggestedProducts(productId, category);
  if (!products.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}
