
import AddProductsForm from "./_components/AddProductsForm";
import { ProtectAdmin } from "@/lib/utils/protectAdmin";

export default async function DashboardPage() {
  const session = await ProtectAdmin();

  return (
    <PageWrapper>
      <div className="my-10 flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-bold">Welcome, {session?.user?.name}</h1>
        <AddProductsForm />
      </div>
    </PageWrapper>
  );
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen w-full">
      <div className="cont">{children}</div>
    </section>
  );
};
