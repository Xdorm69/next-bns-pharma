"use client";

import { Card, CardContent } from "@/components/ui/card";
import { contact } from "@/lib/constants/contact";
import { useState } from "react";

export const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section className="bg-muted/40 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-xs text-primary font-semibold mb-2">
            FAQ
          </p>
          <h2 className="font-primary text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Quick answers to the questions we hear most often.
          </p>
        </div>

        <Card className="border border-border/60">
          <CardContent className="p-0 divide-y divide-border/60">
            {contact.faqs.map((faq, i) => (
              <div
                key={i}
                className="px-6 py-5 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className="font-semibold text-sm">{faq.q}</h4>
                  <svg
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                {openFaq === i && (
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
