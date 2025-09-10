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
  type: ProductCatType;
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ------------------------- Validation -------------------------
  const validate = (data: ProductFormData) => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = "Product name is required";
    if (!data.ProductType) newErrors.ProductType = "Product type is required";
    if (!data.type) newErrors.type = "Category type is required";
    if (!data.image) newErrors.image = "Product image is required";
    if (data.price !== undefined && (isNaN(data.price) || data.price < 0))
      newErrors.price = "Price must be a positive number";
    if (data.stock !== undefined && (isNaN(data.stock) || data.stock < 0))
      newErrors.stock = "Stock must be a positive number";
    if (data.clicks !== undefined && (isNaN(data.clicks) || data.clicks < 0))
      newErrors.clicks = "Clicks must be a positive number";
    if (
      data.rating !== undefined &&
      (isNaN(data.rating) || data.rating < 0 || data.rating > 5)
    )
      newErrors.rating = "Rating must be between 0 and 5";
    if (
      data.reviewsCount !== undefined &&
      (isNaN(data.reviewsCount) || data.reviewsCount < 0)
    )
      newErrors.reviewsCount = "Reviews count must be positive";
    if (data.expiryDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.expiryDate))
      newErrors.expiryDate = "Expiry date must be in YYYY-MM-DD format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------------- Mutation -------------------------
  const addProduct = async (data: ProductFormData) => {
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
      setErrors({});
    },
    onError: (error: { message: string }) =>
      toast.error(error.message || "Failed to add product", {
        id: "add-product",
      }),
  });

  // ------------------------- Handlers -------------------------
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
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
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
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <Label>Product Type</Label>
          <Select
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
          {errors.ProductType && (
            <p className="text-red-500 text-sm">{errors.ProductType}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <Label>Type</Label>
          <Select
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
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock}</p>
          )}
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
          {errors.expiryDate && (
            <p className="text-red-500 text-sm">{errors.expiryDate}</p>
          )}
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

      {/* Category and Manufacturer */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Painkiller"
          />
        </div>
        <div>
          <Label>Manufacturer</Label>
          <Input
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Enter manufacturer"
          />
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
