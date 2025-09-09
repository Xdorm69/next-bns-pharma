"use client";
import { toast } from "sonner";
import { ProductData } from "@/types/product";
import { ProductCardRender } from "../ProductCardRender";

export default function ProductsPage() {
  const generateThirdDemoProductData = (length: number = 3): ProductData[] => {
    return Array.from({ length }).map((_, id) => ({
      id: id.toString(),
      name: `Product${id}`,
      description: `Description${id}`,
      imgUrl: `/imgurl${id}.jpg`,
      ctaLabel: "View Details",
      ctaClick: () => toast.success("product clicked"),
    }));
  };
  const generatePCDDemoProductData = (length: number = 3): ProductData[] => {
    return Array.from({ length }).map((_, id) => ({
      id: id.toString(),
      name: `Product${id}`,
      description: `Description${id}`,
      imgUrl: `/imgurl${id}.jpg`,
      ctaLabel: "View Details",
      ctaClick: () => toast.success("product clicked"),
    }));
  };

  return (
    <section className="min-h-screen w-full">
      <div className="cont">
        <div className="mb-8">
          <ProductCardRender
            title={"Popular Third Party Products"}
            data={generateThirdDemoProductData(3)}
            link={"/products/third-party"}
          />
        </div>
        <div>
          <ProductCardRender
            title={"Popular PCD Party Products"}
            data={generatePCDDemoProductData(3)}
            link={"/products/pcd"}
          />
        </div>
      </div>
    </section>
  );
}
