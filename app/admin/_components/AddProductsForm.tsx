"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ProductTypes, ProductCatType } from "@prisma/client";
import { toast } from "sonner";
import { AddProductClientSchema } from "@/lib/validations/addprod";
import { addProductAction } from "../_actions/productActions";

import { Loader2, PackagePlus } from "lucide-react";
import { TextInput } from "./TextInput";
import { TextAreaInput } from "./TextAreaInput";
import { SelectInput } from "./SelectInput";
import { FileInput } from "./FileInput";

export default function AddProductsForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<{
    type: string;
    category: string;
    image: File | null;
  }>({ type: "", category: "", image: null });

  const handleSubmit = (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      type: formState.type,
      category: formState.category,
      ingredients: formData.get("ingredients"),
      image: formState.image,
    };

    const result = AddProductClientSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Merge controlled state into formData before sending
    formData.set("type", formState.type);
    formData.set("category", formState.category);

    startTransition(async () => {
      try {
        await addProductAction(formData);
        toast.success("Product added successfully!");
      } catch (err) {
        toast.error((err as Error).message || "Failed to add product.");
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <PackagePlus className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">New Product</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to add a product.
          </p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="bg-card border rounded-xl shadow-sm p-6 space-y-5"
      >
        {/* Name */}
        <TextInput
          name="name"
          label="Product Name"
          placeholder="e.g. Amoxicillin 500mg"
          error={errors.name}
        />

        {/* Description */}
        <TextAreaInput
          name="description"
          label="Description"
          placeholder="Brief product description…"
          error={errors.description}
          rows={3}
        />

        {/* Type + Category */}
        <div className="flex gap-4">
          <SelectInput
            name="type"
            label="Product Type"
            options={Object.values(ProductTypes)}
            placeholder="Select type"
            error={errors.type}
            onChange={(val) => setFormState((p) => ({ ...p, type: val }))}
          />
          <SelectInput
            name="category"
            label="Category"
            options={Object.values(ProductCatType)}
            placeholder="Select category"
            error={errors.category}
            onChange={(val) => setFormState((p) => ({ ...p, category: val }))}
          />
        </div>

        {/* Ingredients */}
        <TextAreaInput
          name="ingredients"
          label="Ingredients"
          placeholder="List key ingredients…"
          error={errors.ingredients}
          rows={2}
        />

        {/* Image */}
        <FileInput
          name="image"
          error={errors.image}
          onChange={(file) => setFormState((p) => ({ ...p, image: file }))}
        />

        {/* Submit */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Adding product…
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </div>
  );
}
