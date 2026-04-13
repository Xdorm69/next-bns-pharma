"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductCatType, ProductTypes } from "@prisma/client";

export type ProductForm = {
  name: string;
  description: string;
  type: ProductTypes;
  category: ProductCatType;
  ingredients: string;
  image: File | null;
  thumbnail: string;
};

const EmptyForm: ProductForm = {
  name: "",
  description: "",
  type: "" as ProductTypes,
  category: "" as ProductCatType,
  ingredients: "",
  image: null,
  thumbnail: "",
};

const AddProductsForm = () => {
  const [formData, setFormData] = useState<ProductForm>(EmptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ------------------------- Validation -------------------------
  const validate = (data: ProductForm) => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = "Product name is required";
    if (!data.type) newErrors.type = "Product type is required";
    if (!data.category) newErrors.category = "Category type is required";
    if (!data.image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------------- Mutation -------------------------
  const addProduct = async (data: ProductForm) => {
    if (!data.image) throw new Error("No image selected");

    const fileToBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    const base64Image = await fileToBase64(data.image);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, image: base64Image }),
    });

    const result = await res.json();
    if (!result.success)
      throw new Error(result.error || "Failed to add product");
    return result;
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onMutate: () => toast.loading("Adding product...", { id: "add-product" }),
    onSuccess: () => {
      toast.success("Product added successfully!", { id: "add-product" });
      setFormData(EmptyForm);
      setErrors({});
    },
    onError: (error: { message: string }) =>
      toast.error(error.message || "Failed to add product", {
        id: "add-product",
      }),
  });

  // ------------------------- Handlers -------------------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value)
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;
    mutation.mutate(formData);
  };

  // ------------------------- JSX -------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-xl mx-auto p-4 bg-card rounded shadow"
    >
      {/* Name */}
      <div>
        <Label>Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Product Type */}
        <div>
          <Label>Product Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: ProductTypes) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ProductTypes).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value: ProductCatType) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PCD">PCD</SelectItem>
              <SelectItem value="THIRDPARTY">Third-party</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <Label>Ingredients</Label>
        <Textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Enter ingredients"
        />
      </div>

      {/* Image */}
      <div>
        <Label>Product Image</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
};

export default AddProductsForm;
