"use client";
import React, { useEffect, useState } from "react";
import { ProductCardRender } from "@/components/ProductCardRender";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/Hooks/api";
import { Product } from "@prisma/client";
import { Input } from "./ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "./ui/select"; // ✅ import everything from shadcn wrapper


const ProductPageCardRender = ({
  type,
  title,
  description,
}: {
  type: string;
  title?: string;
  description?: string;
}) => {
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

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ["products", type, debouncedSearch, priceOrder, expiryOrder, page], // ✅ include filters
    queryFn: async () =>
      await fetchApi<Product[]>(
        `/api/products/${type}?search=${debouncedSearch}&price=${priceOrder}&expiry=${expiryOrder}&take=${take}&skip=${page * take}`
      ),
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
  });

  const products: Product[] = data?.data || [];

  return (
    <div>
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
        <Input
          placeholder="Search.."
          className="max-w-sm"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          {/* PRICE FILTER */}
          <Select onValueChange={setPriceOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price filter</SelectLabel>
                <SelectItem value="asc">Low to High</SelectItem>
                <SelectItem value="desc">High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* EXPIRY FILTER */}
          <Select onValueChange={setExpiryOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Expiry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Expiry filter</SelectLabel>
                <SelectItem value="asc">Low to High</SelectItem>
                <SelectItem value="desc">High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductCardRender
        isLoading={isFetching || isLoading}
        data={products || []}
      />

      <PaginationBtns
        page={page}
        setPage={setPage}
        isLastPage={products.length < take}
      />
    </div>
  );
};

export default ProductPageCardRender;

const PaginationBtns = ({
  page,
  setPage,
  isLastPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLastPage: boolean; // true if no more products
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        className="px-4 py-2 rounded bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </button>

      <span className="px-4 py-2 font-mono">Page {page + 1}</span>

      <button
        className="px-4 py-2 rounded bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};
