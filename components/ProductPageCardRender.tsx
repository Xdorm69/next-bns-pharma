"use client";
import React, { useEffect, useState } from "react";
import { ProductCardRender } from "@/components/ProductCardRender";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/Hooks/api";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PaginationBtns } from "./PaginationBtns";
import TableFilters from "./TableFilters";

const ProductPageCardRender = ({
  type,
  title,
  description,
}: {
  type: string;
  title?: string;
  description?: string;
}) => {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [priceOrder, setPriceOrder] = useState<string>("");
  const [expiryOrder, setExpiryOrder] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const take = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, priceOrder, expiryOrder]);

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      type,
      debouncedSearch,
      priceOrder,
      expiryOrder,
      page,
    ], // ✅ include filters
    queryFn: async () =>
      await fetchApi<Product[]>(
        `/api/products/${type}?search=${debouncedSearch}&price=${priceOrder}&expiry=${expiryOrder}&take=${take}&skip=${
          page * take
        }`
      ),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });

  const products: Product[] = data?.data || [];

  return (
    <div className="relative">
      {isError && <p>Error fetching products</p>}

      {title && description && (
        <div className="mb-4">
          <h1 className="text-4xl font-bold my-2 text-center font-mono">
            {title}
          </h1>
          <p className="text-xl w-1/2 mx-auto text-muted-foreground text-center">
            {description}
          </p>
        </div>
      )}

      {/* FILTERS */}
      <div className="flex justify-between items-center my-10">
        {/* SEARCH */}
        <div className="w-full">
          <TableFilters
            disabled={!products.length || !isAuthenticated}
            search={search}
            setSearch={setSearch}
            setPage={setPage}
            filters={[
              {
                title: "Price Filter",
                state: priceOrder,
                setState: setPriceOrder,
                selectItems: [
                  { key: "Low to High", value: "asc" },
                  { key: "High to Low", value: "desc" },
                ],
              },
              {
                title: "Expiry Filter",
                state: expiryOrder,
                setState: setExpiryOrder,
                selectItems: [
                  { key: "Low to High", value: "asc" },
                  { key: "High to Low", value: "desc" },
                ],
              },
            ]}
          />
        </div>
      </div>

      <ProductCardRender
        isAuthenticated={isAuthenticated}
        isLoading={isFetching || isLoading}
        data={products || []}
      />

      {isAuthenticated ? (
        <PaginationBtns
          page={page}
          setPage={setPage}
          isLastPage={products.length < take}
        />
      ) : (
        <div className="absolute bg-gradient-to-t  from-background from-45%  to-transparent  w-full h-96 -bottom-4 scale-105 z-50 flex flex-col">
          <div className="w-full relative top-1/2 flex items-center justify-center flex-col gap-1 py-6 rounded">
            <h1 className="text-4xl font-bold text-center font-mono ">
              Login to view all products
            </h1>
            <Link href={"/auth/login"} className="text-primary text-center ">
              Click here to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPageCardRender;
