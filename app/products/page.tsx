import { Suspense } from "react";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/server/nuqs/NuqsLoader";
import SearchFilter from "./_components/SearchFilter";
import ProductsList from "./_components/ProductList";
import MobileSidebar from "./_components/MobileSidebar";
import TypeFilter from "./_components/filters/TypeFilter";
import CategoryFilter from "./_components/filters/CategoryFilter";
import { Filter } from "lucide-react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { search, type, category, page } = await loadSearchParams(searchParams);

  const listKey = `${search ?? ""}-${type ?? "all"}-${category ?? "all"}-${page}`;

  return (
    <section className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 min-w-0">
        <div className="mb-4 flex items-center gap-3">
          {/* Mobile sidebar trigger */}
          <MobileSidebar />
          <SearchFilter />
        </div>

        <div>
          {/* <ProductSkeletonFallback /> */}
          <Suspense key={listKey} fallback={<ProductSkeletonFallback />}>
            <ProductsList
              search={search}
              type={type}
              category={category}
              page={page as number}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Page;

// ---- Sidebar (desktop only) ----
const DesktopSidebar = () => {
  return (
    <aside className="hidden md:flex w-64 shrink-0 h-screen sticky top-0 bg-white shadow-lg border-r flex-col">
      <div className="p-6 text-xl font-bold border-b flex gap-2">
        <Filter /> Filters
      </div>
      <div className="px-6 py-4 overflow-y-auto flex flex-col gap-2">
        <TypeFilter />
        <CategoryFilter />

        {/* CLEAR FILTER BTN  */}
        {/* <Button className="w-full" variant={'destructive'}>Clear Filters</Button> */}
        <div className="border-l-4 border-primary bg-gray-100 text-xs font-primary px-4 mt-4 py-2">
          Accessing the institutional catalouge required validated credentials.
          Some molecules may have regional complaince restrictions.
        </div>
      </div>
    </aside>
  );
};

// ---- Skeleton ----
const ProductSkeletonFallback = () => {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-sm shadow p-6 w-full">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-sm" />
              <div className="h-4 bg-gray-200 rounded mt-4" />
              <div className="h-4 bg-gray-200 rounded mt-2" />
              <div className="h-4 bg-gray-200 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
