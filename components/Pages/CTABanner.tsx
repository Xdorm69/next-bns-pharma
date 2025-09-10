"use client";

import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="w-full py-16 bg-primary text-primary-foreground">
      <div className="cont flex w-full justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Looking for a reliable pharma partner?
        </h2>
        <Button size="lg" variant="secondary">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
