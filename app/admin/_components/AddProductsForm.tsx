"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ProductTypes, ProductCatType } from "@prisma/client";
import { toast } from "sonner";
import { AddProductClientSchema } from "@/lib/validations/addprod";
import { addProductAction } from "../_actions/addProductAction";
import { TextInput } from "./TextInput";
import { TextAreaInput } from "./TextAreaInput";
import { SelectInput } from "./SelectInput";
import { FileInput } from "./FileInput";

export default function AddProductsForm() {
  const [isPending, startTransition] = useTransition();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<any>({
    type: "",
    category: "",
    image: null,
  });

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
        fieldErrors[err.path[0] as keyof typeof data] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    startTransition(async () => {
      try {
        await addProductAction(formData);
        toast.success("Product added!");
      } catch (err) {
        toast.error((err as Error).message);
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-4 bg-card rounded shadow"
    >
      <TextInput name="name" label="Name" error={errors.name} />

      <TextAreaInput
        name="description"
        label="Description"
        error={errors.description}
      />

      {/* HIDDEN / */}
      <input type="hidden" name="type" value={formState.type} />
      <input type="hidden" name="category" value={formState.category} />

      <div className="flex gap-4">
        <SelectInput
          name="type"
          options={Object.values(ProductTypes)}
          placeholder="Select type"
          error={errors.type}
          onChange={(val) => setFormState((p: any) => ({ ...p, type: val }))}
        />

        <SelectInput
          name="category"
          options={Object.values(ProductCatType)}
          placeholder="Select category"
          error={errors.category}
          onChange={(val) =>
            setFormState((p: any) => ({ ...p, category: val }))
          }
        />
      </div>

      <TextAreaInput
        name="ingredients"
        label="Ingredients"
        error={errors.ingredients}
      />

      <FileInput
        name="image"
        error={errors.image}
        onChange={(file) => setFormState((p: any) => ({ ...p, image: file }))}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
}
