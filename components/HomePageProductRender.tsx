"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/hooks/api";
import { ProductCardRender } from "./ProductCardRender";
import { Product } from "@prisma/client";

const HomePageProductRender = ({ type }: { type: string }) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["products", "home", type],
    queryFn: async () =>
      await fetchApi<Product[]>(`/api/products/${type}?homepage=true`),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });

  const products: Product[] = data?.data || [];

  return (
    <>
      {isError && <h1>Error fetching {type} products</h1>}
      <ProductCardRender isLoading={isFetching || isLoading} data={products} />
    </>
  );
};

export default HomePageProductRender;
