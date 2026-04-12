import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductDisplay = () => {
  const demoProducts = [
    {
      id: "1d4e66b8-e37e-4169-87a0-5bcef083e4f6",
      title: "MC-Q-10",
      category: "CAPSULE",
      description:
        "Co-Enzyme-Q10, Lycopene , VitaminS ,Zinc Sulphate, Dha & L-Arginine",
      image:
        "https://ik.imagekit.io/amitoj24/products/MC-Q-10-1757578737464_n1hF-zh2p.jpg",
    },
    {
      id: "5f2e882b-bde3-4386-acd2-92679c5a4b24",
      title: "Bitoxvit",
      category: "CAPSULE",
      description:
        "Antioxidant, lycopene ,Multivitamins & Multi-Mineral capsules",
      image:
        "https://ik.imagekit.io/amitoj24/products/Bitoxvit_-1757578494953_u99w_E2SP.jpg",
    },
    {
      id: "e7d799bd-9b89-40b2-a8f5-ce680435726c",
      title: "BMULTI-VIT",
      category: "TABLET",
      description: "Multivitamin & Multiminerals & Antioxidat syrup",
      image:
        "https://ik.imagekit.io/amitoj24/products/BMULTI-VIT-1757577885472_Z6mmojVmL.jpg",
    },
  ];
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
          {demoProducts.map((product, index) => (
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
