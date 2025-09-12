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
import { ChevronDown, Menu, User } from "lucide-react";
import AuthBtns from "./AuthBtns";
import { useSession } from "next-auth/react";
import Skeleton from "./ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession();
  const isAdmin = session?.data?.user?.role === "ADMIN";
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="cont flex justify-between h-16 items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-mono">
          PharmaCo.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ProductsDropdownMenu />
          <Link href="/about" className="text-gray-700 hover:text-primary">
            About
          </Link>
        </div>

        {/* ADMING AND LOGOUT BTNS  */}
        <div className="flex gap-6">
          {isAdmin && <AdminDropdownMenu />}

          {/* User / Auth */}
          {session.status === "loading" ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : session.status === "authenticated" ? (
            <UserMenu
              user={session.data.user}
              onLogout={() => router.push("/auth/logout")}
            />
          ) : (
            <AuthBtns />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 pb-4">
          <ProductsDropdownMenu />
          <Link href="/about" className="text-gray-700 hover:text-primary">
            About
          </Link>
          {isAdmin && <AdminDropdownMenu />}
          {session.status === "loading" ? (
            <Skeleton className="w-full h-10 rounded" />
          ) : session.status === "authenticated" ? (
            <UserMenu
              user={session.data.user}
              onLogout={() => router.push("/auth/logout")}
              mobile
            />
          ) : (
            <AuthBtns />
          )}
        </div>
      )}
    </nav>
  );
}

/* --- Sub Components --- */

const ProductsDropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center gap-1">
        Products <ChevronDown className="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <Link href="/products/third-party">
        <DropdownMenuItem>Third Party</DropdownMenuItem>
      </Link>
      <Link href="/products/pcd">
        <DropdownMenuItem>PCD</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  </DropdownMenu>
);

const AdminDropdownMenu = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          Admin <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
  mobile = false,
}: {
  user: { name: string; email: string; id: string };
  onLogout: () => void;
  mobile?: boolean;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="rounded-full w-10 h-10 p-0 overflow-hidden"
      >
        <User className="w-6 h-6" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className={mobile ? "w-full" : "w-48"} align="end">
      <DropdownMenuLabel>
        {user?.name || user?.email || "User"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <Link href="/profile">
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </Link>
      <DropdownMenuItem variant="destructive" onClick={onLogout}>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
