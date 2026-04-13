import { Suspense } from "react";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "@/server/nuqs/NuqsLoader";
import SearchFilter from "./_components/SearchFilter";
import ProductsList from "./_components/ProductList";
import MobileSidebar from "./_components/MobileSidebar";
import TypeFilter from "./_components/filters/TypeFilter";
import CategoryFilter from "./_components/filters/CategoryFilter";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { search, type, category, page } = await loadSearchParams(searchParams);

  // DEBUG 1 — paste this, check terminal on every filter change
  console.log("🔍 PAGE PARAMS:", { search, type, category, page });

  const listKey = `${search ?? ""}-${type ?? "all"}-${category ?? "all"}-${page}`;

  // DEBUG 2 — if this doesn't change when you filter, Suspense key won't remount
  console.log("🔑 LIST KEY:", listKey);

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

        <div className="bg-white rounded-2xl shadow p-4 md:p-6">
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
      <div className="p-6 text-xl font-bold border-b">Filters</div>
      <div className="px-6 py-4 overflow-y-auto flex-1">
        <TypeFilter />
        <CategoryFilter />
      </div>
    </aside>
  );
};

// ---- Skeleton ----
const ProductSkeletonFallback = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow p-6 w-full">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg" />
            <div className="h-4 bg-gray-200 rounded mt-4" />
            <div className="h-4 bg-gray-200 rounded mt-2" />
            <div className="h-4 bg-gray-200 rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
