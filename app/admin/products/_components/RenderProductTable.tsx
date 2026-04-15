"use client";

import { useState, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  deleteProductAction,
  toggleProductActiveAction,
} from "../../_actions/productActions";

const PAGE_SIZE = 8;

type ActiveFilter = "all" | "active" | "inactive";

type Filters = {
  search: string;
  type: string;
  category: string;
  active: ActiveFilter;
};

const INITIAL_FILTERS: Filters = {
  search: "",
  type: "all",
  category: "all",
  active: "all",
};

export default function RenderProductTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [isMutating, setIsMutating] = useState(false);

  // ── Client-side filtering ──────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !filters.search ||
        p.name.toLowerCase().includes(filters.search.toLowerCase());

      const matchType =
        filters.type === "all" || p.type === filters.type;

      const matchCategory =
        filters.category === "all" || p.category === filters.category;

      const matchActive =
        filters.active === "all" ||
        (filters.active === "active" ? p.isActive : !p.isActive);

      return matchSearch && matchType && matchCategory && matchActive;
    });
  }, [products, filters]);

  // ── Pagination ─────────────────────────────────────────────────────────────

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // reset to page 1 on any filter change
  };

  // ── Mutations ──────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    setIsMutating(true);
    try {
      await deleteProductAction(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setIsMutating(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    setIsMutating(true);
    try {
      await toggleProductActiveAction(id, current);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: !current } : p)),
      );
      toast.success(`Product ${current ? "deactivated" : "activated"}`);
    } catch {
      toast.error("Failed to update product");
    } finally {
      setIsMutating(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Filters */}
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
            { label: "All Types", value: "all" },
            { label: "Tablet", value: "TABLET" },
            { label: "Syrup", value: "SYRUP" },
            { label: "Capsule", value: "CAPSULE" },
            { label: "Injection", value: "INJECTION" },
            { label: "Ointment", value: "OINTMENT" },
            { label: "Drops", value: "DROPS" },
            { label: "Other", value: "OTHER" },
          ]}
        />

        <FilterSelect
          placeholder="Category"
          value={filters.category}
          onChange={(v) => updateFilter("category", v)}
          options={[
            { label: "All Categories", value: "all" },
            { label: "PCD", value: "PCD" },
            { label: "Third Party", value: "THIRDPARTY" },
          ]}
        />

        <FilterSelect
          placeholder="Status"
          value={filters.active}
          onChange={(v) => updateFilter("active", v as ActiveFilter)}
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
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
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-16 text-center text-muted-foreground"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((product) => (
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
                            handleToggleActive(product.id, product.isActive ?? false)
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
                              <AlertDialogTitle>Delete product?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove{" "}
                                <span className="font-semibold">{product.name}</span>{" "}
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
          {filtered.length === 0
            ? "No results"
            : `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
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
  options: { label: string; value: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
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
