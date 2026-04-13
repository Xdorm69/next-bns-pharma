import Capabilities from "@/components/pages/v2/Capabilities";
import Cretifications from "@/components/pages/v2/Cretifications";
import Cta from "@/components/pages/v2/Cta";
import { HeroSection } from "@/components/pages/v2/HeroSection";
import ProductDisplay from "@/components/pages/v2/ProductDisplay";
import Trust from "@/components/pages/v2/Trust";

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
