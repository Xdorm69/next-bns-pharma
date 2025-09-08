"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  description: string;
  price?: string;
  imageUrl: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  ctaLabel = "View Details",
  onCtaClick,
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-white/10">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
        <CardTitle className="mt-4 text-lg">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
          {description}
        </p>
        {price && <p className="mt-2 font-semibold text-gray-900">{price}</p>}
      </CardContent>

      <CardFooter>
        <Button onClick={onCtaClick} className="w-full">
          {ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
