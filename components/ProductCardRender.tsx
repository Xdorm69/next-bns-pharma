import { ProductData } from "@/types/product";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import { Button } from "./ui/button";

type ProductRenderType = {
  title: string;
  data: ProductData[];
  link?: string;
};

export const ProductCardRender = ({ title, data, link }: ProductRenderType) => {
  return (
    <div>
      <h1 className="text-4xl font-bold my-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((product: ProductData) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.imgUrl}
            ctaLabel={product.ctaLabel}
            onCtaClick={product.ctaClick}
          />
        ))}
      </div>

      {link && (
        <div className="w-full flex justify-end my-8">
          <Link href={link}>
            <Button className="text-white">View More</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
