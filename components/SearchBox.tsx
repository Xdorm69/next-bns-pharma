// components/SearchBox.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/Hooks/useDebounce";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const debounced = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debounced) params.set("search", debounced);
    else params.delete("search");

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debounced]);

  return (
    <input
      type="text"
      className="border p-2 rounded w-full"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
