"use client";

import { cn } from "@/lib/utils";
import { Box, Factory, ShieldEllipsis } from "lucide-react";
import { capabilities } from "@/lib/constants/capabilities";
import Image from "next/image";
import Link from "next/link";

const capabilitiesIconMap = {
  factory: Factory,
  box: Box,
  "shield-ellipsis": ShieldEllipsis,
};

const Capabilities = () => {
  return (
    <section className="py-12">
      <div className="container">
        {/* Heading */}
        <div className="relative w-fit">
          <h2 className="heading-2">Institutional Capabilities</h2>
          <div className="absolute h-1 w-1/2 bg-primary mt-2" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-8">
          {capabilities.data.map((item, index) => {
            const Icon = item.icon
              ? capabilitiesIconMap[
                  item.icon as keyof typeof capabilitiesIconMap
                ]
              : null;

            return (
              <div
                key={index}
                className={cn(
                  "bg-white shadow-sm rounded-xs px-4 py-8 flex gap-4",
                  (index === 0 || index === 3) && "md:col-span-2",
                )}
              >
                <div className="flex-1">
                  {/* Icon */}
                  {Icon && <Icon className="text-3xl mb-2 text-primary" />}

                  {/* Title */}
                  <h2 className="text-xl font-semibold">{item.title}</h2>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>

                  {/* Footer */}
                  {item.footer?.type === "link" && (
                    <Link
                      href={item.footer.href!}
                      className="text-primary text-sm"
                    >
                      {item.footer.text}
                    </Link>
                  )}

                  {item.footer?.type === "text" && (
                    <p className="text-sm text-muted-foreground">
                      {item.footer.text}
                    </p>
                  )}

                  {item.footer?.type === "list" && (
                    <ul className="list-disc list-inside text-sm">
                      {item.footer.items &&
                        item.footer.items.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                  )}
                </div>

                {/* Image */}
                {item.image && (
                  <div className="w-40 h-32 relative rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                    <Link
                      href="/about"
                      className="absolute bottom-2 left-2 text-xs bg-white px-2 py-1 rounded"
                    >
                      Active Research
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
