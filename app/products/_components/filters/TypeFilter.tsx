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

export default function TypeFilter() {
  const [type, setType] = useQueryState(
    "type",
    parseAsStringEnum([...Object.values(ProductTypes), "all"])
      .withDefault("all")
      .withOptions({ shallow: false }),
  );

  const handleTypeChange = (value: ProductTypes | "all") => {
    setType(value);
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-primary font-bold">Product</h2>

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
