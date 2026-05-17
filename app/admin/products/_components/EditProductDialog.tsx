"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { editProduct } from "@/server/products";

import { Product, ProductCatType, ProductTypes } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Edit } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";


export default function EditProductDialog({ product}: { product: Product}) {
  const [open, setOpen] = useState(false);

  // loading state
  const [isPending, startTransition] = useTransition();

  // shadcn select state
  const [type, setType] = useState<ProductTypes>(product.type);

  const [category, setCategory] = useState<ProductCatType>(product.category);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      type,
      category,
    };

    startTransition(async () => {
      const {
        success,
        message,
        product: updatedProduct,
      } = await editProduct(product.id, data);

      if (!success) {
        toast.error(
          `Failed to update product ${product.name}: ${
            updatedProduct?.name || message
          }`,
        );

        return;
      }

      toast.success(`Product ${updatedProduct.name} updated successfully`);
      
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit className="text-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* ID */}
          <span className="text-muted-foreground text-xs">
            ID: {product.id}
          </span>

          {/* Name */}
          <Label className="mb-1 mt-2">Name</Label>

          <Input name="name" type="text" defaultValue={product.name} />

          {/* Selects */}
          <div className="mt-2 mb-4 flex flex-wrap justify-between gap-4">
            {/* Type */}
            <div className="flex-1">
              <Label className="mb-1">Type</Label>

              <Select
                value={type}
                onValueChange={(value) => setType(value as ProductTypes)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {Object.values(ProductTypes).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="flex-1">
              <Label className="mb-1">Category</Label>

              <Select
                value={category}
                onValueChange={(value) => setCategory(value as ProductCatType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {Object.values(ProductCatType).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
