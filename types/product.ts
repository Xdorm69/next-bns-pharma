import { ProductTypes } from "@prisma/client";

export type ProductData = {
  id: string;
  name: string;
  description: string | undefined;
  price: number | undefined;
  type: ProductTypes;
  clicks: number;
  createdAt: Date;
  image: string;
  thumbnail: string | undefined;
};

