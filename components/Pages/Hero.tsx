import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="py-12 w-full bg-background">
      <div className="cont">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex-1">
            {/* HERO TEXT  */}
            <h1 className="text-6xl font-bold font-mono">
              Innovating for a healthier world
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm mt-4">
              Committed to providing high-quality healthcare products with trust
              and innovation.
            </p>
            {/* BUTTONS  */}
            <div className="flex items-center gap-4 mt-4">
              <Button className="text-white">Get-Started</Button>
              <Button variant={"outline"}>View More</Button>
            </div>
          </div>
          <div className="flex-1 relative">
            {/* Blue background */}
            <div className="absolute top-0 left-0 w-4/5 h-4/5 z-20 rounded-full bg-primary/40" />

            {/* Main Image */}
            <div className="hidden md:block rounded-xl w-full relative z-30 overflow-hidden">
              <Image
                src="/hero.png"
                width={900}
                height={600}
                priority
                alt="hero"
                className="object-cover w-full h-full"
              />

              {/* Gradient overlay on top of image */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent from-[65%] to-background z-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
