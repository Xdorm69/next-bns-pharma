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
import { Product, ProductTypes } from "@prisma/client";

export function ProductCard({ data }: { data: Product }) {
  return (
    <Card className="w-full max-w-sm shadow-lg">
      {/* Image */}
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={data.thumbnail || data.image} // use thumbnail if available
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="mt-4 text-lg font-semibold">
          {data.name}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-2">
        {data.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
            {data.description}
          </p>
        )}

        <div className="flex justify-between items-center text-sm">
          {data.price && (
            <span className="font-semibold text-gray-900">₹{data.price}</span>
          )}
          <span className="text-gray-500">{data.ProductType}</span>
        </div>

        {data.type && (
          <p className="text-xs text-gray-500">Type: {data.type}</p>
        )}
        {data.category && (
          <p className="text-xs text-gray-500">Category: {data.category}</p>
        )}
        {data.manufacturer && (
          <p className="text-xs text-gray-500">
            Manufacturer: {data.manufacturer}
          </p>
        )}
        {data.stock !== undefined && (
          <p className="text-xs text-gray-500">Stock: {data.stock}</p>
        )}
        {data.expiryDate && (
          <p className="text-xs text-red-500">
            Expiry: {new Date(data.expiryDate).toLocaleDateString()}
          </p>
        )}

        {(data.rating !== undefined || data.reviewsCount !== undefined) && (
          <p className="text-xs text-yellow-500">
            {data.rating ? `⭐ ${data.rating.toFixed(1)}` : ""}{" "}
            {data.reviewsCount ? `(${data.reviewsCount} reviews)` : ""}
          </p>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button onClick={() => toast.success("Clicked!")} className="w-full">
          View More
        </Button>
      </CardFooter>
    </Card>
  );
}
