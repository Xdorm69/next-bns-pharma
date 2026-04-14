import { hero } from "@/lib/constants/hero";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="container py-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LEFT  */}
        <div>
          {/* BANNER  */}
          <h4 className="uppercase px-4 py-2 bg-accent text-muted-foreground text-xs w-fit mx-auto md:mx-0">
            {hero.banner}
          </h4>
          {/* HEADING  */}
          <h1 className="heading-1 mt-4 text-center md:text-left">
            {hero.heading}
          </h1>
          {/* DESCRIPTION  */}
          <p className="description mt-2 text-center md:text-left">
            {hero.description}
          </p>

          {/* CTA  */}
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            <Link href="/about" className="btn btn-primary">
              Get Started
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>

        {/* RIGHT  */}
        <div className="w-[900px] h-[400px] hidden md:block relative">
          <Image
            src={hero.image}
            alt="Hero"
            width={500}
            height={500}
            loading="eager"
            className="w-full h-full object-cover rounded-xs grayscale"
          />

          {/* PURITY BANNER */}
          <div className="absolute -bottom-8 -left-8 shadow bg-secondary p-4 border-l-4 border-primary w-fit">
            <h2 className="text-2xl font-bold font-primary">99.9%</h2>
            <p className="uppercase text-muted-foreground text-xs mt-2">
              Purity Standard Met
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
