import { Suspense } from "react";
import SearchFilter from "./_components/SearchFilter";
import { updateTag } from "next/cache";
import ProductsList from "./_components/ProductList";
import { loadSearchParams } from "@/server/nuqs/NuqsLoader";
import { SearchParams } from "nuqs/server";
import ProductTypeFilter from "./_components/filters/ProductTypeFilter";
import TypeFilter from "./_components/filters/TypeFilter";
import PaginationBtns from "@/components/PaginationBtns";
import { prisma } from "@/lib/prisma";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const ITEMS_PER_PAGE = 12;

const Page = async ({ searchParams }: pageProps) => {
  const {
    search,
    productType,
    type,
    page = 1,
  } = await loadSearchParams(searchParams);

  const refetchProducts = async () => {
    "use server";
    updateTag("products");
  };

  const countProducts = await prisma.product.count();

  return (
    <section className="min-h-screen bg-gray-100 flex">
      <Sidebar refetchProducts={refetchProducts} />

      {/* Main Content */}
      <main className="p-6 ">
        <div className="mb-4 flex flex-col sm:flex-row justify-between">
          <SearchFilter refetchProducts={refetchProducts} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <Suspense fallback={<ProductSkeletonFallback />}>
            <ProductsList
              search={search}
              productType={productType}
              type={type}
              page={page ?? 1}
            />
          </Suspense>
        </div>
        <div className="mt-4">
          <PaginationBtns
            totalPages={Math.ceil(countProducts / ITEMS_PER_PAGE)}
          />
        </div>
      </main>
    </section>
  );
};

export default Page;

const Sidebar = ({
  refetchProducts,
}: {
  refetchProducts: () => Promise<void>;
}) => {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 text-xl font-bold border-b">Filters</div>

      <div className="px-6 py-2">
        <ProductTypeFilter refetchProducts={refetchProducts} />
        <TypeFilter refetchProducts={refetchProducts} />
      </div>
    </aside>
  );
};

const ProductSkeletonFallback = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow p-6 w-full">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded mt-4"></div>
            <div className="h-4 bg-gray-200 rounded mt-2"></div>
            <div className="h-4 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
