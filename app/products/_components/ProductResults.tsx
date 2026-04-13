type Props = {
  count: number;
  search?: string;
  type?: string;
  category?: string;
  page?: number;
};

const ProductResults = ({ count, search, type, category, page }: Props) => {
  return (
    <div className="min-h-[56px] flex flex-col justify-center">
      <h2 className="font-semibold text-lg md:text-xl leading-tight">
        {count} {count === 1 ? "product" : "products"} found
      </h2>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground min-h-[24px]">
        {search && (
          <span className="bg-muted px-2 py-1 rounded-md">🔍 "{search}"</span>
        )}

        {type && type !== "all" && (
          <span className="bg-muted px-2 py-1 rounded-md">Type: {type}</span>
        )}

        {category && category !== "all" && (
          <span className="bg-muted px-2 py-1 rounded-md">
            Category: {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductResults;
