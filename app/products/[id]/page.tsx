"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchApi } from "@/Hooks/api"; // your fetch wrapper
import { Product } from "@prisma/client";
import Skeleton from "@/components/ui/skeleton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ProductPage() {
  const { id } = useParams(); // get product id from URL

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetchApi<Product>(`/api/products/${id}`);
      if (!res.data) throw new Error("Product not found");
      return res.data;
    },
    enabled: !!id, // only fetch if id exists
  });

  if (isLoading)
    return (
      <div className="cont">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );

  if (isError || !data)
    return <p className="text-center mt-8">Product not found</p>;

  return (
    <section className="my-12 w-full pb-24 h-[90vh] flex justify-center items-start px-4">
      <div className="cont w-full grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Product Image */}
        <div className="flex justify-center items-center h-full flex-col">
          <div className="flex-1 h-[68vh] rounded shadow overflow-hidden">
            <Image
              width={600}
              height={500}
              loading="lazy"
              src={data.image}
              alt={data.name}
              className="object-contain"
            />
          </div>
          <div className="flex gap-4 w-full mt-4">
            <div className="bg-gray-500 w-20 h-20 rounded shadow" />
            <div className="bg-gray-500 w-20 h-20 rounded shadow" />
            <div className="bg-gray-500 w-20 h-20 rounded shadow" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold font-mono">
            {data.name}
          </h1>
          {data.description && (
            <p className="text-gray-700 text-lg">{data.description}</p>
          )}

          {/* Price */}
          <p className="text-2xl font-semibold text-green-600">
            ₹{data.price?.toFixed(2) ?? "N/A"}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
            <Badge>
              Category:{" "}
              <span className="font-medium">{data.category || "N/A"}</span>
            </Badge>
            <Badge>
              Type: <span className="font-medium">{data.ProductType}</span>
            </Badge>
            <Badge>
              Manufacturer:{" "}
              <span className="font-medium">
                {data.manufacturer || "Unknown"}
              </span>
            </Badge>
            <Badge>
              Stock:{" "}
              <span className="font-medium">
                {data.stock ?? "Not specified"}
              </span>
            </Badge>
            <Badge variant={"destructive"}>
              Expiry:{" "}
              <span className="font-medium">
                {data.expiryDate
                  ? new Date(data.expiryDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </Badge>
          </div>

          {/* Reviews */}
          <div className="mt-4">
            <p className="text-gray-800 font-medium">
              Rating:{" "}
              <span className="text-yellow-500">
                {data.rating ?? "No ratings"}
              </span>
            </p>
            <p className="text-gray-600">Reviews: {data.reviewsCount ?? 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
