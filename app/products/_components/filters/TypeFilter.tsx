"use client";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCatType } from "@prisma/client";

type filterProps = {
  refetchProducts: () => void;
};
const TypeFilter = ({ refetchProducts }: filterProps) => {
  const [type, setType] = useQueryState("type", { defaultValue: "all" });
  const handleTypeChange = (t: ProductCatType) => {
    setType(t);
    refetchProducts();
  };
  return (
    <div className="flex items-center justify-between">
      <h1>Type</h1>

      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {["PCD", "THIRDPARTY"].map((type) => (
            <SelectItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TypeFilter;
