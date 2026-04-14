
import { productDisplay } from "@/lib/constants/productDisplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductDisplay = () => {
  return (
    <section className="py-12 bg-muted-foreground/5">
      <div className="container">
        {/* TITLE  */}
        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <div>
            <p className="text-xs uppercase text-primary">Catalog Access</p>
            <h2 className="heading-2">Product Divisions</h2>
          </div>

          <Link
            href="/products"
            className="hidden md:flex text-blue-800 w-fit gap-2 md:text-sm items-center border-b-2 border-accent px-4 py-2 rounded-xs"
          >
            View Full Inventory <ArrowRight size={16} />
          </Link>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {productDisplay.products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xs shadow relative"
            >
              {/* IMAGE  */}
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  loading="lazy"
                  height={300}
                  className="w-full h-48 object-cover mt-4"
                />
              )}

              {/* CATEGORY TAG  */}
              <div className="text-xs font-primary font-semibold text-muted-foreground bg-accent px-2 py-1 rounded-xs shadow top-4 right-4 uppercase absolute w-fit">
                {product.category}
              </div>
              {/* TITLE  */}
              <h3 className="text-lg font-semibold font-primary">
                {product.title}
              </h3>
              {/* DESCRIPTION  */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              {/* VIEW LINK  */}
              <Link
                href={`/products/${product.id}`}
                className="text-blue-800 flex gap-1 text-sm mt-4 items-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
