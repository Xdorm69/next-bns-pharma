import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="py-24 w-full min-h-screen">
      <div className="cont">
        <div className="flex w-full h-full items-center justify-center">
          <div>
            {/* HERO TEXT  */}
            <h1 className="text-6xl font-bold">BNS Pharma</h1>
            <p className="text-muted-foreground font-mono max-w-sm mt-4">
              Committed to providing high-quality healthcare products with trust
              and innovation.
            </p>
            {/* BUTTONS  */}
            <div className="flex items-center gap-4 mt-4">
              <Button className="text-white">Get-Started</Button>
              <Button variant={"outline"}>View More</Button>
            </div>
          </div>
          <div className="hidden md:block bg-white/10 rounded-xl shadow w-1/2 h-1/2">
            <Image
              src={"/hero.jpg"}
              width={800}
              priority
              height={600}
              className="object-cover w-full h-full"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
