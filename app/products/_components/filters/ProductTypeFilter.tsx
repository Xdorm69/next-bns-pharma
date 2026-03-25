"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductTypes } from "@prisma/client";
import { useQueryState, parseAsStringEnum } from "nuqs";

const productTypeValues = [
  "TABLET",
  "SYRUP",
  "CAPSULE",
  "INJECTION",
  "OINTMENT",
  "DROPS",
  "OTHER",
] as const;

type filterProps = {
  refetchProducts: () => void;
};

export default function ProductTypeFilter({ refetchProducts }: filterProps) {
  const [type, setType] = useQueryState(
    "productType",
    parseAsStringEnum([...productTypeValues, "all"]).withDefault("all"),
  );

  const handleTypeChange = (value: ProductTypes | "all") => {
    setType(value);
    refetchProducts();
  };

  return (
    <div className="flex items-center justify-between">
      <h2>Product</h2>

      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="All Types" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {Object.values(ProductTypes).map((type) => (
            <SelectItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
