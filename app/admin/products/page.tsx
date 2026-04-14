import { Metadata } from "next";
import RenderProductTable from "./_components/RenderProductTable";

export const metadata: Metadata = {
  title: "Products", // → "Products | BNS Pharma"
  description:
    "Browse BNS Pharma's full range of pharmaceutical products — tablets, syrups, capsules, injections, ointments and drops. Available for PCD franchise and third-party manufacturing.",
  keywords: [
    "pharma products India",
    "PCD franchise products",
    "third party pharma products",
    "tablet syrup capsule manufacturer",
    "BNS Pharma products list",
  ],
  alternates: {
    canonical: "https://bnspharmaceuticals.com/products",
  },
  openGraph: {
    title: "Products | BNS Pharma",
    description:
      "Tablets, syrups, capsules, injections & more — for PCD franchise and third-party manufacturing.",
    url: "https://bnspharmaceuticals.com/products",
  },
};

const page = () => {
  return (
    <section className="my-16 w-full h-screen">
      <div className="container">
        <h2 className="heading-2">Products List</h2>
        <p className="description">
          Here you can manage all the products in our database.
        </p>
        <RenderProductTable />
      </div>
    </section>
  );
};

export default page;
