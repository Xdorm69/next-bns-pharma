"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, User, X } from "lucide-react";
import AuthBtns from "./AuthBtns";
import { signOut, useSession } from "next-auth/react";
import Skeleton from "./ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/lib/Constants";

const navbarLinks = [
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession();
  const isAdmin = session?.data?.user?.role === "ADMIN";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Images.shared.logo}
            alt="logo"
            width={90}
            height={90}
            className="object-contain w-22 h-22"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navbarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isAdmin && <AdminDropdownMenu />}

          {/* Auth */}
          {session.status === "loading" ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : session.status === "authenticated" ? (
            <UserMenu
              user={session.data.user}
              onLogout={() => signOut({ callbackUrl: "/" })}
            />
          ) : (
            <div className="hidden md:block">
              <AuthBtns />
            </div>
          )}

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-2">
          {/* Links */}
          {navbarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

          {/* Admin */}
          {isAdmin && <AdminDropdownMenu />}

          {/* Auth */}
          {session.status === "loading" ? (
            <Skeleton className="w-full h-10 rounded" />
          ) : session.status === "authenticated" ? (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          ) : (
            <AuthBtns />
          )}
        </div>
      )}
    </nav>
  );
}

/* --- Sub Components --- */

const AdminDropdownMenu = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 text-sm">
          Admin <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/admin/add-product")}>
          Add Product
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/admin/users")}>
          Users
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/admin/products")}>
          Products
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserMenu = ({
  user,
  onLogout,
}: {
  user: { name?: string; email?: string };
  onLogout: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full overflow-hidden"
      >
        <User className="w-5 h-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      <DropdownMenuLabel>
        {user?.name || user?.email || "User"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout} className="text-red-500">
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
