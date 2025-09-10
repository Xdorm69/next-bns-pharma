"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProductCatType } from "@prisma/client";

type ProductTypes =
  | "TABLET"
  | "SYRUP"
  | "CAPSULE"
  | "INJECTION"
  | "OINTMENT"
  | "DROPS"
  | "OTHER";

type ProductFormData = {
  name: string;
  description?: string;
  price?: number;
  ProductType: ProductTypes;
  type: ProductCatType; // e.g., PCD, third-party
  clicks?: number;
  stock?: number;
  isActive: boolean;
  category?: string;
  ingredients?: string;
  manufacturer?: string;
  expiryDate?: string;
  image: File | null;
  thumbnail?: string;
  rating?: number;
  reviewsCount?: number;
};

const AddProductsForm = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: undefined,
    ProductType: "TABLET",
    type: "PCD",
    clicks: 0,
    stock: undefined,
    isActive: true,
    category: "",
    ingredients: "",
    manufacturer: "",
    expiryDate: "",
    image: null,
    thumbnail: "",
    rating: undefined,
    reviewsCount: undefined,
  });

  const addProduct = async (formData: ProductFormData) => {
    if (!formData.image) throw new Error("No image selected");

    const fileToBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    const base64Image = await fileToBase64(formData.image);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, image: base64Image }),
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.error || "Failed to add product");

    return data;
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onMutate: () => {
      toast.loading("Adding product...", { id: "add-product" });
    },
    onSuccess: (data) => {
      toast.success("Product added successfully!", { id: "add-product" });

      setFormData({
        name: "",
        description: "",
        price: undefined,
        ProductType: "TABLET",
        type: "PCD",
        clicks: 0,
        stock: undefined,
        isActive: true,
        category: "",
        ingredients: "",
        manufacturer: "",
        expiryDate: "",
        image: null,
        thumbnail: "",
        rating: undefined,
        reviewsCount: undefined,
      });
    },
    onError: (error: {message: string}) => {
      toast.error(error.message || "Failed to add product", {
        id: "add-product",
      });
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-sm bg-card p-2 rounded shadow"
    >
      {/* Name */}
      <div>
        <Label className="mb-1">Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label className="mb-1">Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Price */}
        <div className="w-full">
          <Label className="mb-1">Price</Label>
          <Input
            type="number"
            name="price"
            step="0.01"
            value={formData.price ?? ""}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        {/* Product Type */}
        <div className="w-full">
          <Label className="mb-1">Product Type</Label>
          <Select
            name="ProductType"
            value={formData.ProductType}
            onValueChange={(value: ProductTypes) =>
              setFormData((prev) => ({ ...prev, ProductType: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {[
                "TABLET",
                "SYRUP",
                "CAPSULE",
                "INJECTION",
                "OINTMENT",
                "DROPS",
                "OTHER",
              ].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type (PCD / Third-party) */}
        <div className="w-full">
          <Label className="mb-1">Type</Label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value: ProductCatType) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PCD">PCD</SelectItem>
              <SelectItem value="THIRDPARTY">Third-party</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {/* Stock */}
        <div className="flex-1">
          <Label className="mb-1">Stock</Label>
          <Input
            type="number"
            name="stock"
            value={formData.stock ?? ""}
            onChange={handleChange}
            placeholder="Enter stock quantity"
          />
        </div>
        {/* Expiry Date */}
        <div className="flex-1">
          <Label className="mb-1">Expiry Date</Label>
          <Input
            type="date"
            className="w-full"
            name="expiryDate"
            value={formData.expiryDate ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Active */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={formData.isActive}
          onCheckedChange={(checked: unknown) =>
            setFormData((prev) => ({ ...prev, isActive: checked as boolean }))
          }
        />
        <Label>Active</Label>
      </div>

      <div className="flex w-full items-center gap-4">
        {/* Category */}
        <div className="flex-1">
          <Label className="mb-1">Category</Label>
          <Input
            className="w-full"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Painkiller"
          />
        </div>

        {/* Manufacturer */}
        <div className="flex-1">
          <Label className="mb-1">Manufacturer</Label>
          <Input
            name="manufacturer"
            className="w-full"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Enter manufacturer"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <Label className="mb-1">Ingredients</Label>
        <Textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Enter ingredients"
        />
      </div>

      {/* Image */}
      <div>
        <Label className="mb-1">Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={mutation.isPending}>
        Add Product
      </Button>
    </form>
  );
};

export default AddProductsForm;
