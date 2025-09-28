import ProductPageCardRender from "@/components/ProductPageCardRender";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Third-Party Manufacturing | Bns Pharma",
  description:
    "Discover Bns Pharma's third-party manufacturing solutions with a focus on innovation, compliance, and trusted healthcare products.",
  keywords: [
    "third-party pharma manufacturing",
    "Bns Pharma third-party",
    "pharmaceutical outsourcing",
    "contract manufacturing",
  ],
  openGraph: {
    title: "Third-Party Manufacturing | Bns Pharma",
    description:
      "Bns Pharma offers trusted third-party manufacturing solutions ensuring quality and efficiency.",
    url: "https://bnspharmaceuticals.com/third-party-products",
    siteName: "Bns Pharma",
    type: "website",
  },
  alternates: {
    canonical: "https://bnspharmaceuticals.com/third-party-products",
  },
};

const page = () => {
  return (
    <section className="w-full min-h-screen my-10">
      <div className="cont">
        <ProductPageCardRender
          type="third-party"
          title="Third-Party Products"
          description="Explore our range of third-party products designed for quality and efficiency."
        />
      </div>
    </section>
  );
};

export default page;
