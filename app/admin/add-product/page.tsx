import AddProductsForm from "../_components/AddProductsForm";
import { ProtectAdmin } from "@/lib/utils/protectAdmin";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const session = await ProtectAdmin();

  return (
    <section className="min-h-screen py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>

        <p className="text-sm text-muted-foreground mb-1">
          Logged in as{" "}
          <span className="font-medium text-foreground">{session?.user?.name}</span>
        </p>

        <AddProductsForm />
      </div>
    </section>
  );
};

export default page;
