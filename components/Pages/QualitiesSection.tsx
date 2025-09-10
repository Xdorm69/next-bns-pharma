"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const usps = [
  "WHO-certified facilities",
  "Affordable & reliable supply chain",
  "Trusted by 200+ partners",
  "PAN-India delivery",
];

export function QualitiesSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="cont">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground mt-2">
            Trusted by healthcare providers and businesses nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((item, idx) => (
            <Card
              key={idx}
              className="border-none shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="flex flex-col items-center p-6 space-y-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                <p className="text-center font-medium">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
