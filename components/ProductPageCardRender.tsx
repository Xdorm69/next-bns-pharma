"use client";
import React from "react";
import { ProductCardRender } from "@/components/ProductCardRender";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/Hooks/api";
import { ProductData } from "@/types/product";

const ProductPageCardRender = ({ type }: { type: string }) => {
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["products", type],
    queryFn: async () => await fetchApi<ProductData[]>(`/api/products/${type}`),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });

  const products: ProductData[] = data?.data || [];

  return (
    <div>
      {isError && <p>Error fetching pcd products</p>}

      <ProductCardRender
        isLoading={isFetching || isLoading}
        data={products || []}
      />
    </div>
  );
};

export default ProductPageCardRender;
