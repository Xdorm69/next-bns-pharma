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

export const baseProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  type: z
    .string()
    .min(1, "Type required")
    .transform((val) => val as keyof typeof ProductTypesEnum),

  category: z
    .string()
    .min(1, "Category required")
    .transform((val) => val as keyof typeof ProductCatTypeEnum),

  ingredients: z.string().optional(),
  thumbnail: z.string().optional(),
});

export const AddProductSchema = baseProductSchema.extend({
  image: z.string().min(1, "Image URL is required"),
});

export const AddProductClientSchema = baseProductSchema.extend({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required"),
});

export type AddProductSchemaType = z.infer<typeof AddProductSchema>;
