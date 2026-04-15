import RenderUserTable from "./_components/RenderUserTable";
import { fetchUsersAction } from "../_actions/fetchActions";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const initialUsers = await fetchUsersAction({ page: 0, take: 8 });

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
          <div className="p-2.5 rounded-xl bg-violet-500/10">
            <Users className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-sm text-muted-foreground">
              View and manage all registered users.
            </p>
          </div>
        </div>

        <RenderUserTable initialUsers={initialUsers ?? []} />
      </div>
    </section>
  );
};

export default page;
