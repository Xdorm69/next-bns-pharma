import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Package, Users, PlusCircle, BarChart3, ShieldCheck } from "lucide-react";

const adminLinks = [
  {
    href: "/admin/add-product",
    label: "Add Product",
    description: "Add a new product to the catalogue",
    icon: PlusCircle,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    href: "/admin/products",
    label: "Manage Products",
    description: "View, edit, and delete products",
    icon: Package,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    href: "/admin/users",
    label: "Manage Users",
    description: "View and manage user accounts",
    icon: Users,
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
  },
];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <section className="min-h-screen py-12 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
              Admin Panel
            </p>
            <h1 className="text-2xl font-bold">
              Welcome back,{" "}
              <span className="text-primary">{session?.user?.name}</span>
            </h1>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Products", icon: Package, value: "—" },
            { label: "Total Users", icon: Users, value: "—" },
            { label: "Analytics", icon: BarChart3, value: "—" },
          ].map(({ label, icon: Icon, value }) => (
            <div
              key={label}
              className="rounded-xl border bg-card p-5 flex items-center gap-4 shadow-sm"
            >
              <div className="p-2 rounded-lg bg-muted">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action cards */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {adminLinks.map(({ href, label, description, icon: Icon, color, border }) => (
            <Link
              key={href}
              href={href}
              className={`group rounded-xl border ${border} bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`inline-flex p-2.5 rounded-lg ${color} mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                {label}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
