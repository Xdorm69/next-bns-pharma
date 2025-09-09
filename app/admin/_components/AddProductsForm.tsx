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
      className="space-y-4 w-md bg-card p-2 rounded shadow"
    >
      {/* Name */}
      <div>
        <Label>Name</Label>
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
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>

      {/* Price */}
      <div>
        <Label>Price</Label>
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
      <div>
        <Label>Product Type</Label>
        <Select
          name="ProductType"
          value={formData.ProductType}
          onValueChange={(value: ProductTypes) =>
            setFormData((prev) => ({ ...prev, ProductType: value }))
          }
        >
          <SelectTrigger>
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
      <div>
        <Label>Type (PCD / Third-party)</Label>
        <Select
          name="type"
          value={formData.type}
          onValueChange={(value: ProductCatType) =>
            setFormData((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PCD">PCD</SelectItem>
            <SelectItem value="THIRDPARTY">Third-party</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stock */}
      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          name="stock"
          value={formData.stock ?? ""}
          onChange={handleChange}
          placeholder="Enter stock quantity"
        />
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

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category e.g., Painkiller"
        />
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

      {/* Manufacturer */}
      <div>
        <Label>Manufacturer</Label>
        <Input
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          placeholder="Enter manufacturer"
        />
      </div>

      {/* Expiry Date */}
      <div>
        <Label>Expiry Date</Label>
        <Input
          type="date"
          name="expiryDate"
          value={formData.expiryDate ?? ""}
          onChange={handleChange}
        />
      </div>

      {/* Image */}
      <div>
        <Label>Image</Label>
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
