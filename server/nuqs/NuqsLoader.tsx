import { parseAsInteger } from "nuqs";
import { parseAsString, createLoader } from "nuqs/server";

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(""),
  type: parseAsString.withDefault("all"),
  category: parseAsString.withDefault("all"),
  page: parseAsInteger,
};
export const loadSearchParams = createLoader(coordinatesSearchParams);
