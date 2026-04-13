import { parseAsInteger, parseAsString, createLoader } from "nuqs/server";

export const coordinatesSearchParams = {
  search: parseAsString
    .withDefault("")
    .withOptions({ shallow: false, scroll: false }),
  type: parseAsString
    .withDefault("all")
    .withOptions({ shallow: false, scroll: true }),
  category: parseAsString
    .withDefault("all")
    .withOptions({ shallow: false, scroll: true }),
  page: parseAsInteger
    .withDefault(1)
    .withOptions({ shallow: false, scroll: true }),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);
