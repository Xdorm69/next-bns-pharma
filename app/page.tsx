
"use client";
import { AboutSection } from "@/components/Pages/AboutSection";
import { BlogPreview } from "@/components/Pages/BlogSection";
import { ContactForm } from "@/components/Pages/ContactForm";
import { CTABanner } from "@/components/Pages/CTABanner";
import HeroPage from "@/components/Pages/HeroPage";
import { ProcessSection } from "@/components/Pages/ProcessSection";
import ProductsPage from "@/components/Pages/Products";
import { QualitiesSection } from "@/components/Pages/QualitiesSection";

const Page = () => {
  return (
    <>
   
      <HeroPage/>
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
