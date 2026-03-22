import { prisma } from "@/lib/prisma";
import SearchBox from "./SearchBox";
import { ProductCardRender } from "@/components/ProductCardRender";
import { Product, ProductCatType } from "@prisma/client";

export default async function ProductPageCardRender({
  searchParams,
  type,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  type: ProductCatType;
}) {
  const search = searchParams?.search || "";
  const take = Number(searchParams?.take) || 12;
  const skip = Number(searchParams?.skip) || 0;

  let products: Product[] = [];

  try {
    products = await prisma.product.findMany({
      where: { type: type, name: { contains: search as string, mode: "insensitive" } },
      take,
      skip,
    });
  } catch (error) {
    products = [];
    console.log(error);
  }

  return (
    <div className="relative">
      <div className="my-6">
        <SearchBox />
      </div>

      <ProductCardRender isLoading={false} data={products} />
    </div>
  );
}
