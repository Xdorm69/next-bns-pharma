import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const adminLinks = [
  { href: "/admin/add-product", label: "Add Product" },
  { href: "/admin/users", label: "Manage Users" },
  { href: "/admin/products", label: "Manage Products" },
];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <section className="min-h-screen py-12">
      <div className="container">
        <div className="font-primary text-3xl">
          Welcome <p className="font-bold">{session?.user?.name}</p>
        </div>
        <div className="flex gap-4 mt-4 flex-wrap">
          {adminLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button>{link.label}</Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
