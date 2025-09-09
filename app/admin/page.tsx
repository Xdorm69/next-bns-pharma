// app/dashboard/page.tsx (Server Component by default)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddProductsForm from "./_components/AddProductsForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <PageWrapper>
        <p className="my-10">Please log in to view this page.</p>
      </PageWrapper>
    );
  }

  const isAdmin = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });
  if (!isAdmin || isAdmin?.role !== "ADMIN") {
    return (
      <PageWrapper>
        <p className="my-10">You are not authorized to view this page.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="my-10 flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-bold">Welcome, {session.user?.name}</h1>
        <AddProductsForm/>
      </div>
    </PageWrapper>
  );
}

const PageWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <section className="min-h-screen w-full">
            <div className="cont">
                {children}
            </div>
        </section>
    )
}
