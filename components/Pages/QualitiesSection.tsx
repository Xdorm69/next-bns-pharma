"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const usps = [
  {
    title: "WHO-certified facilities",
    desc: "Manufactured under strict global quality standards for safety.",
  },
  {
    title: "Affordable & reliable",
    desc: "Ensuring consistent availability of essential medicines nationwide.",
  },
  {
    title: "Trusted by 200+ partners",
    desc: "Building long-term relationships with hospitals, clinics, and distributors.",
  },
  {
    title: "PAN-India delivery",
    desc: "Efficient logistics network reaching urban and rural communities.",
  },
];

// Pick hover colors per card
const hoverColors = [
  "hover:bg-orange-400",
  "hover:bg-blue-400",
  "hover:bg-green-400",
  "hover:bg-purple-400",
];

export function QualitiesSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="cont">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-mono">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground mt-2">
            Trusted by healthcare providers and businesses nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Card
                className={`border-none shadow-sm bg-card transition-colors duration-300 ${
                  hoverColors[idx % hoverColors.length]
                }`}
              >
                <CardContent className="flex flex-col items-center p-6 space-y-3 text-center">
                  <CheckCircle className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-white" />
                  <h3 className="font-medium font-mono transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/90">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
