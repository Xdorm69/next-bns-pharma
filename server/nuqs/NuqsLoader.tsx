import { parseAsInteger } from "nuqs";
import { parseAsString, createLoader } from "nuqs/server";

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(""),
  productType: parseAsString.withDefault("all"),
  type: parseAsString.withDefault("all"),
  page: parseAsInteger,
};
export const loadSearchParams = createLoader(coordinatesSearchParams);
