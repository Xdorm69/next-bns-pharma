"use client";
import TableCompt from "@/components/TableCompt";
import { fetchApi } from "@/Hooks/api";
import { Product, ProductCatType, ProductTypes, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import TableFilters from "@/components/TableFilters";
import { useSession } from "next-auth/react";
import { PaginationBtns } from "@/components/PaginationBtns";

const RenderProductTable = () => {
  const [search, setSearch] = React.useState<string>("");
  const [productType, setProductType] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [active, setActive] = React.useState<string>("");
  const [page, setPage] = useState<number>(0);
  const max = 8;

  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin", "products", search, productType, category, active, page],
    queryFn: async () => {
      return await fetchApi<Product[]>(
        `/api/products?productType=${productType}&category=${category}&active=${active}&search=${search}&take=${max}&skip=${
          page * max
        }`
      );
    },
  });

  const products = res?.data ?? [];

  return (
    <div>
      {/* FILTERS  */}
      <TableFilters
    
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        filters={[
          {
            state: productType,
            setState: setProductType,
            title: "Product Type",
            selectItems: [
              { key: "Tablet", value: "TABLET" },
              { key: "Syrup", value: "SYRUP" },
              { key: "Capsule", value: "CAPSULE" },
              { key: "Injection", value: "INJECTION" },
              { key: "Ointment", value: "OINTMENT" },
              { key: "Drops", value: "DROPS" },
              { key: "Other", value: "OTHER" },
            ],
          },
          {
            state: category,
            setState: setCategory,
            title: "Category",
            selectItems: [
              { key: "PCD", value: "PCD" },
              { key: "Third Party", value: "THIRDPARTY" },
            ],
          },
          {
            state: active,
            setState: setActive,
            title: "Active",
            selectItems: [
              { key: "Yes", value: "true" },
              { key: "No", value: "false" },
            ],
          },
        ]}
      />

      <TableCompt
        data={products}
        columns={[
          {
            column: "id",
            render: (row) => <CopyHoverCard data={row.id} tag="Id" />,
          },
          { column: "name", render: (row) => row.name },
          {
            column: "description",
            render: (row) => (
              row.description ? <CopyHoverCard data={row.description} tag="Description" /> : "-"
            ),
          },
          { column: "price", render: (row) => row.price || "-" },
          { column: "type", render: (row) => row.ProductType as ProductTypes },
          { column: "type", render: (row) => row.type as ProductCatType },
          { column: "clicks", render: (row) => row.clicks || "0" },
          { column: "category", render: (row) => row.category || "-" },
          { column: "Ingredients", render: (row) => row.ingredients ? <CopyHoverCard data={row.ingredients} tag="Ingredients" /> : "-" },
          { column: "Manufacturer", render: (row) => row.manufacturer || "-" },
          {
            column: "Expiry Date",
            render: (row) => {
              return row.expiryDate ? (
                <CopyHoverCard
                  data={new Date(row.expiryDate).toString()}
                  tag="Expiry Date"
                />
              ) : (
                <div>NA</div>
              );
            },
          },
          { column: "stock", render: (row) => row.stock },
          { column: "isActive", render: (row) => row.isActive ? "Yes" : "No" },
          { column: "image", render: (row) => row.image ? <CopyHoverCard data={row.image} tag="Image" /> : "NA" },
          { column: "thumbnail", render: (row) => row.thumbnail || "NA" },
          { column: "rating", render: (row) => row.rating || "0" },
          { column: "reviewsCount", render: (row) => row.reviewsCount || "0" },
          {
            column: "createdAt",
            render: (row) => (
              <CopyHoverCard
                data={new Date(row.createdAt).toString()}
                tag="Created At"
              />
            ),
          },
          {
            column: "updatedAt",
            render: (row) => (
              <CopyHoverCard
                data={new Date(row.updatedAt).toString()}
                tag="Updated At"
              />
            ),
          },
        ]}
        loading={isLoading}
        error={isError ? (error as Error)?.message : null}
      />
      <PaginationBtns
        page={page}
        setPage={setPage}
        isLastPage={products.length < max}
      />
    </div>
  );
};

export default RenderProductTable;

const CopyHoverCard = ({
  data,
  tag,
  placeHolder,
}: {
  data: string;
  tag: string;
  placeHolder?: string;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success(`${data} copied successfully`);
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={cn("p-0", tag === "Id" && "text-primary")}
        >
          {placeHolder ?? data.split("").slice(0, 15).join("") + "..."}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{tag}</h4>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm">{data}</p>
              <Copy
                onClick={handleCopy}
                className="text-muted-foreground hover:text-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const RenderRoleCard = ({ role }: { role: "ADMIN" | "USER" }) => {
  return (
    <Badge
      className={cn(
        " border-1 bg-amber-500 border-amber-200",
        role === "ADMIN" && "bg-emerald-500 border-emerald-200"
      )}
    >
      {role}
    </Badge>
  );
};
