"use client";

import { useQueryState, parseAsString } from "nuqs";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";

const SearchFilter = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      shallow: false, // ← triggers full server re-render, skeleton shows
      throttleMs: 500,
    }),
  );

  // use-debounce is cleaner than useEffect chains
  const handleChange = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <div className="w-1/4">
      <Input
        type="text"
        placeholder="Search"
        defaultValue={search}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
