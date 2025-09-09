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
import { toast } from "sonner";
import { ProductData } from "@/types/product";

export function ProductCard({ data }: { data: ProductData }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-white/10">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="mt-4 text-lg">{data.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
          {data.description}
        </p>
        {data.price && (
          <p className="mt-2 font-semibold text-gray-900">{data.price}</p>
        )}
      </CardContent>

      <CardFooter>
        <Button onClick={() => toast.success("clicked")} className="w-full">
          View More
        </Button>
      </CardFooter>
    </Card>
  );
}
