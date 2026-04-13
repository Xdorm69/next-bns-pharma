"use client";
import { parseAsString, useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCatType } from "@prisma/client";

const CategoryFilter = () => {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("all").withOptions({
      shallow: false,
    }),
  );
  const handleCategoryChange = (c: ProductCatType) => {
    setCategory(c);
  };
  return (
    <div className="flex items-center justify-between">
      <h1>Type</h1>

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {Object.entries(ProductCatType).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
