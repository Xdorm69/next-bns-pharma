import type { Metadata } from "next";
import Capabilities from "@/components/Pages/v2/Capabilities";
import Cretifications from "@/components/Pages/v2/Cretifications";
import Cta from "@/components/Pages/v2/Cta";
import { HeroSection } from "@/components/Pages/v2/HeroSection";
import ProductDisplay from "@/components/Pages/v2/ProductDisplay";
import Trust from "@/components/Pages/v2/Trust";

// Home page uses the root layout `default` title (no template applied).
// Override it explicitly here for full control.
export const metadata: Metadata = {
  title: "BNS Pharma | Trusted Pharmaceutical Solutions",
  description:
    "BNS Pharma offers PCD pharma franchise and third-party manufacturing of tablets, syrups, capsules, injections & more. Trusted by professionals across India.",
  alternates: {
    canonical: "https://bnspharmaceuticals.com",
  },
  openGraph: {
    url: "https://bnspharmaceuticals.com",
    title: "BNS Pharma | Trusted Pharmaceutical Solutions",
    description:
      "PCD pharma franchise & third-party manufacturing. Quality medicines from Zirakpur, Punjab.",
  },
};

const Page = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <Cretifications />
      <Capabilities />
      <ProductDisplay />
      <Trust />
      <Cta />
    </main>
  );
};

export default Page;
