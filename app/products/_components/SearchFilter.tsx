"use client";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type SearchFilterProps = {
  refetchProducts: () => void;
};

const SearchFilter = ({ refetchProducts }: SearchFilterProps) => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // ⏳ Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔄 Refetch when debounced value updates
  useEffect(() => {
    refetchProducts();
  }, [debouncedSearch]);

  return (
    <div className="w-1/4">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
