"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

export function ProductCard({ data }: { data: Product }) {
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm shadow-lg gap-4">
      {/* Image */}
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={data.thumbnail || data.image} // use thumbnail if available
            alt={data.name}
            loading="lazy"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
        <CardTitle className="text-lg font-semibold font-mono">
          {data.name}
        </CardTitle>
        <CardDescription>
          {data.type && (
            <p className="text-sm text-muted-foreground">{data.type}</p>
          )}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-2">
        {data.description && (
          <p className=" line-clamp-2">{data.description}</p>
        )}

        {(data.rating !== undefined || data.reviewsCount !== undefined) && (
          <p className="text-xs text-yellow-500">
            {data.rating ? `⭐ ${data.rating.toFixed(1)}` : ""}{" "}
            {data.reviewsCount ? `(${data.reviewsCount} reviews)` : ""}
          </p>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="w-full flex justify-between items-center">
        {data.price && (
          <h1 className="font-mono font-bold text-lg text-primary">
            MRP {data.price}
          </h1>
        )}
        <Button
          variant={"outline"}
          onClick={() => {
            router.push(`/products/${data.id}`);
          }}
        >
          View More
        </Button>
      </CardFooter>
    </Card>
  );
}
