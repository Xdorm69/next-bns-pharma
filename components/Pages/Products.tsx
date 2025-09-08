"use client";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";

type ProductData = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  ctaLabel: string;
  ctaClick: () => void;
};

export default function ProductsPage() {
  const demoProductsData: ProductData[] = [
    {
      id: "1",
      name: "Product1",
      description: "Description1",
      imgUrl: "/imgurl1.jpg",
      ctaLabel: "View Details",
      ctaClick: () => toast.success("product clicked"),
    },
    {
      id: "2",
      name: "Product2",
      description: "Description2",
      imgUrl: "/imgurl2.jpg",
      ctaLabel: "View Details",
      ctaClick: () => toast.success("product clicked"),
    },
    {
      id: "3",
      name: "Product3",
      description: "Description3",
      imgUrl: "/imgurl3.jpg",
      ctaLabel: "View Details",
      ctaClick: () => toast.success("product clicked"),
    },
  ];
  return (
    <section className="min-h-screen w-full">
      <div className="cont">
        <div className="mb-8">
          <ProductCardRender
            title={"Popular Third Party Products"}
            data={demoProductsData}
            link={"/products/third-party"}
          />
        </div>
        <div>
          <ProductCardRender
            title={"Popular PCD Party Products"}
            data={demoProductsData}
            link={"/products/pcd"}
          />
        </div>
      </div>
    </section>
  );
}

type ProductRenderType = {
  title: string;
  data: ProductData[];
  link: string;
};

const ProductCardRender = ({ title, data, link }: ProductRenderType) => {
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

      <div className="w-full flex justify-end my-8">
        <Link href={link}>
          <Button className="text-white">View More</Button>
        </Link>
      </div>
    </div>
  );
};
