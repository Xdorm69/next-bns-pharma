import ProductPageCardRender from "@/components/ProductPageCardRender";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCD Products | Bns Pharma",
  description:
    "Explore Bns Pharma's wide range of Pharmaceutical Contract Development (PCD) products crafted with precision and quality assurance.",
  keywords: [
    "PCD pharma products",
    "pharmaceutical contract development",
    "Bns Pharma PCD",
    "PCD medicines",
  ],
  openGraph: {
    title: "PCD Products | Bns Pharma",
    description:
      "Browse high-quality PCD pharmaceutical products by Bns Pharma designed for efficiency and trust.",
    url: "https://bnspharmaceuticals.com/pcd-products",
    siteName: "Bns Pharma",
    type: "website",
  },
  alternates: {
    canonical: "https://bnspharmaceuticals.com/pcd-products",
  },
};

const page = () => {
  return (
    <section className="w-full min-h-screen my-10">
      <div className="cont">
        <div className="mt-4">
          <ProductPageCardRender
            type="PCD"
            searchParams={{ take: 12, skip: 0 }}
          />
        </div>
      </div>
    </section>
  );
};

export default page;
