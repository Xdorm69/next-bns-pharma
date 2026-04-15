import { Metadata } from "next";
import RenderProductTable from "./_components/RenderProductTable";
import { fetchProductsAction } from "../_actions/fetchActions";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Products | Admin",
  description: "Admin panel — manage all products.",
};

const page = async () => {
  const initialProducts = await fetchProductsAction({ take: 100 });

  return (
    <section className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Back */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-500/10">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-muted-foreground">
              Manage all products in the database.
            </p>
          </div>
        </div>

        <RenderProductTable initialProducts={initialProducts.products ?? []} />
      </div>
    </section>
  );
};

export default page;
