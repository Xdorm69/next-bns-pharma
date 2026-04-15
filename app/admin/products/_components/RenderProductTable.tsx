"use client";

import { useState, useTransition, useCallback } from "react";
import { Product, ProductCatType, ProductTypes } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Copy,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Search,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fetchProductsAction,
  deleteProductAction,
  toggleProductActiveAction,
} from "../../_actions/productActions";

const MAX = 8;

type Filters = {
  search: string;
  type: string;
  category: string;
  active: boolean;
  page: number;
};

const INITIAL_FILTERS: Filters = {
  search: "",
  type: "",
  category: "",
  active: false,
  page: 0,
};

export default function RenderProductTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [totalCount, setTotalCount] = useState(initialProducts.length);
  const [isFetching, startFetch] = useTransition();
  const [isMutating, startMutate] = useTransition();

  const refetch = useCallback(
    (overrides?: Partial<Filters>) => {
      const merged = { ...filters, ...overrides };
      startFetch(async () => {
        try {
          const result = await fetchProductsAction({
            search: merged.search,
            type: merged.type,
            category: merged.category,
            active: merged.active,
            page: merged.page,
            take: MAX,
          });
          setProducts(result?.products ?? []);
          setTotalCount(result?.total ?? 0);
        } catch {
          toast.error("Failed to fetch products");
        }
      });
    },
    [filters],
  );

  const updateFilter = (key: keyof Filters, value: string | number) => {
    const newFilters = {
      ...filters,
      [key]: value,
      page: key === "page" ? value : 0,
    };
    setFilters(newFilters as Filters);
    refetch(newFilters as Partial<Filters>);
  };

  const handleDelete = (id: string) => {
    startMutate(async () => {
      try {
        await deleteProductAction(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted");
      } catch {
        toast.error("Failed to delete product");
      }
    });
  };

  const handleToggleActive = (id: string, current: boolean) => {
    startMutate(async () => {
      try {
        await toggleProductActiveAction(id, current);
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, active: !current } : p)),
        );
        toast.success(`Product ${current ? "deactivated" : "activated"}`);
      } catch {
        toast.error("Failed to update product");
      }
    });
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / MAX));

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products…"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-9"
          />
        </div>

        <FilterSelect
          placeholder="Product Type"
          value={filters.type}
          onChange={(v) => updateFilter("type", v)}
          options={[
            { key: "All", value: "" },
            { key: "Tablet", value: "TABLET" },
            { key: "Syrup", value: "SYRUP" },
            { key: "Capsule", value: "CAPSULE" },
            { key: "Injection", value: "INJECTION" },
            { key: "Ointment", value: "OINTMENT" },
            { key: "Drops", value: "DROPS" },
            { key: "Other", value: "OTHER" },
          ]}
        />

        <FilterSelect
          placeholder="Category"
          value={filters.category}
          onChange={(v) => updateFilter("category", v)}
          options={[
            { key: "All", value: "" },
            { key: "PCD", value: "PCD" },
            { key: "Third Party", value: "THIRDPARTY" },
          ]}
        />

        <FilterSelect
          placeholder="Active"
          value={filters.active.toString()}
          onChange={(v) => updateFilter("active", v)}
          options={[
            { key: "All", value: "" },
            { key: "Active", value: "true" },
            { key: "Inactive", value: "false" },
          ]}
        />

        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={isFetching}
          title="Refresh"
        >
          <RefreshCw className={cn("w-4 h-4", isFetching && "animate-spin")} />
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-16 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-16 text-center text-muted-foreground"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <CopyHoverCard data={product.id} tag="ID" />
                    </TableCell>
                    <TableCell className="font-medium max-w-[160px] truncate">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product.type as ProductTypes}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {product.category as ProductCatType}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.clicks ?? 0}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          product.isActive
                            ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                            : "bg-zinc-500/10 text-zinc-600 border-zinc-200",
                        )}
                        variant="outline"
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {/* Toggle active */}
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isMutating}
                          onClick={() =>
                            handleToggleActive(
                              product.id,
                              product.isActive ?? false,
                            )
                          }
                          title={product.isActive ? "Deactivate" : "Activate"}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {product.isActive ? (
                            <ToggleRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </Button>

                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isMutating}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete product?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove{" "}
                                <span className="font-semibold">
                                  {product.name}
                                </span>{" "}
                                from the database. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Page {filters.page + 1} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page === 0 || isFetching}
            onClick={() => updateFilter("page", filters.page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page + 1 >= totalPages || isFetching}
            onClick={() => updateFilter("page", filters.page + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function FilterSelect({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: { key: string; value: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value || "_all"} value={opt.value || "_all"}>
            {opt.key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function CopyHoverCard({ data, tag }: { data: string; tag: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success(`${tag} copied`);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "p-0 h-auto font-mono text-xs",
            tag === "ID" && "text-primary",
          )}
        >
          {data.length > 10 ? data.slice(0, 10) + "…" : data}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{tag}</h4>
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs text-muted-foreground break-all">{data}</p>
            <Copy
              onClick={handleCopy}
              className="w-4 h-4 shrink-0 text-muted-foreground hover:text-primary cursor-pointer mt-0.5"
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
