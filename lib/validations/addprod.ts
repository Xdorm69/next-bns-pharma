import { z } from "zod";
import { ProductTypes, ProductCatType } from "@prisma/client";

const ProductTypesEnum = z.enum([
  ProductTypes.TABLET,
  ProductTypes.SYRUP,
  ProductTypes.CAPSULE,
  ProductTypes.INJECTION,
  ProductTypes.OINTMENT,
  ProductTypes.DROPS,
  ProductTypes.OTHER,
]);

const ProductCatTypeEnum = z.enum([
  ProductCatType.PCD,
  ProductCatType.THIRDPARTY,
]);

// Zod schema for product
export const AddProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  ProductType: ProductTypesEnum,
  type: ProductCatTypeEnum,
  clicks: z.number().int().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  isActive: z.boolean().optional(),
  category: z.string().optional(),
  ingredients: z.string().optional(),
  manufacturer: z.string().optional(),
  expiryDate: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().optional()
  ),
  image: z.string().min(1, "Image URL is required"),
  thumbnail: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewsCount: z.number().int().nonnegative().optional(),
});

export type AddProductSchemaType = z.infer<typeof AddProductSchema>;
