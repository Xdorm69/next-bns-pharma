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
  type: ProductTypesEnum,
  category: ProductCatTypeEnum,
  ingredients: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  thumbnail: z.string().optional(),
});

export type AddProductSchemaType = z.infer<typeof AddProductSchema>;
