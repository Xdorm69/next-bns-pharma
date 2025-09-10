"use client";

import { Card, CardContent } from "@/components/ui/card";


const steps = [
  { title: "Consultation", desc: "Discuss your requirements with our team." },
  {
    title: "Manufacturing / Supply",
    desc: "High-quality production in WHO-certified facilities.",
  },
  {
    title: "Delivery",
    desc: "PAN-India logistics with reliable supply chain.",
  },
];

export function ProcessSection() {
  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="cont">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, idx) => (
            <Card key={idx} className="flex-1 border-none shadow-sm">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="font-bold text-primary">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
