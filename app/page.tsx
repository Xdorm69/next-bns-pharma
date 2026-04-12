import Capabilities from "@/components/Pages/v2/Capabilities";
import Cretifications from "@/components/Pages/v2/Cretifications";
import Cta from "@/components/Pages/v2/Cta";
import { HeroSection } from "@/components/Pages/v2/HeroSection";
import ProductDisplay from "@/components/Pages/v2/ProductDisplay";
import Trust from "@/components/Pages/v2/Trust";

const Page = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <Cretifications/>
      <Capabilities/>
      <ProductDisplay/>
      <Trust/>
      <Cta/>
    </main>
  );
};

export default Page;
