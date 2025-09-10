"use client";

import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="w-full bg-muted/30 py-16">
      <div className="cont">
        <Card className="shadow-md border-none">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-mono">
              About Us
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              BNS Pharmaceuticals is committed to providing affordable,
              high-quality medicines with trust and innovation. Our mission is
              to ensure better healthcare access by combining scientific
              excellence with ethical business practices.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
