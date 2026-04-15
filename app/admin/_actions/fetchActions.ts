"use server";

import { getProducts } from "@/server/products";
import { getUsers } from "@/server/users";

export type ProductFilters = {
  search?: string;
  type?: string;
  category?: string;
  active?: boolean;
  page?: number;
  take?: number;
};

export type UserFilters = {
  search?: string;
  role?: string;
  subscribed?: string;
  provider?: string;
  page?: number;
  take?: number;
};

export async function fetchProductsAction(filters: ProductFilters) {
  const { search = "", type = "", category = "", active = true, page = 0, take = 8 } = filters;

  return await getProducts({
    search,
    type,
    category,
    active,
    take,
    skip: page * take,
  });
}

export async function fetchUsersAction(filters: UserFilters) {
  const { search = "", role = "", subscribed = "", provider = "", page = 0, take = 8 } = filters;

  return await getUsers({
    search,
    role,
    subscribed,
    provider,
    take,
    skip: page * take,
  });
}
