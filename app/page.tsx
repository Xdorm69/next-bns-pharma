
import { AboutSection } from "@/components/Pages/AboutSection";
import { BlogPreview } from "@/components/Pages/BlogSection";
import { ContactForm } from "@/components/Pages/ContactForm";
import { CTABanner } from "@/components/Pages/CTABanner";
import HeroPage from "@/components/Pages/HeroPage";
import { ProcessSection } from "@/components/Pages/ProcessSection";
import ProductsPage from "@/components/Pages/Products";
import { QualitiesSection } from "@/components/Pages/QualitiesSection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bns Pharma | Trusted Pharmaceutical Solutions",
  description:
    "Bns Pharma delivers high-quality pharmaceutical products with a focus on innovation, safety, and patient well-being.",
  keywords: [
    "pharmaceutical company",
    "Bns Pharma",
    "pharma products",
    "medicine manufacturing",
    "healthcare solutions",
  ],
  openGraph: {
    title: "Bns Pharma | Trusted Pharmaceutical Solutions",
    description:
      "Explore Bns Pharma's medicines, healthcare solutions, and trusted pharmaceutical products.",
    url: "https://bnspharmaceuticals.com",
    siteName: "Bns Pharma",
    type: "website",
  },
  alternates: {
    canonical: "https://bnspharmaceuticals.com",
  },
};

const Page = () => {
  return (
    <>
      <HeroPage />
      <AboutSection />
      <QualitiesSection />
      <ProductsPage />
      <ProcessSection />
      <CTABanner />
      <BlogPreview />
      <ContactForm />
    </>
  );
};

export default Page;
