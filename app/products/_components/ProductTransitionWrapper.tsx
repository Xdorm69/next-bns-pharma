"use client";

import { useTransition, useEffect, ReactNode } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { ProductSkeletonFallback } from "../page";

type Props = {
  children: ReactNode;
};

export default function ProductsTransitionWrapper({ children }: Props) {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [type] = useQueryState("type", parseAsString.withDefault("all"));
  const [category] = useQueryState(
    "category",
    parseAsString.withDefault("all"),
  );
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {});
  }, [search, type, category, page]);

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 z-10">
          <ProductSkeletonFallback />
        </div>
      )}
      <div
        className={`transition-opacity duration-200 ${
          isPending ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
