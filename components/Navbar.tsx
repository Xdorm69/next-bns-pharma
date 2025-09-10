"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import AuthBtns from "./AuthBtns";
import { useSession } from "next-auth/react";
import Skeleton from "./ui/skeleton";
import { useRouter } from "next/navigation";
// ✅ assuming you have a skeleton component

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSession();
  const isAdmin = session?.data?.user?.role === "ADMIN";
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="cont">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-mono">
            PharmaCo.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Products Dropdown */}
            <ProductsDropdownMenu />
            {/* About */}
            <Link href="/about">
              <Button variant={"outline"}>About</Button>
            </Link>

            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">Admin <ChevronDown/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push("/admin/add-product")}
                  >
                    Add Product
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/admin/users")}>
                    Users
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/admin/products")}
                  >
                    Products
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {session.status === "loading" ? (
              <Skeleton className="w-20 h-10 rounded" />
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
          <div className="md:hidden mt-2 flex flex-col space-y-2 px-2 pb-4">
            <ProductsDropdownMenu />
            <Link
              href="/about"
              className="px-2 py-1 text-gray-800 hover:text-blue-700"
            >
              About
            </Link>

            {session.status === "loading" ? (
              <Skeleton className="w-full h-10 rounded" />
            ) : (
              <AuthBtns />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

const ProductsDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="px-2 py-1 flex gap-1 items-center bg-muted w-full md:w-auto justify-between"
        >
          <span>Products</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[88vw] md:w-full">
        <Link href="/products/third-party" className="w-full">
          <DropdownMenuItem className="w-full">Third Party</DropdownMenuItem>
        </Link>
        <Link href="/products/pcd" className="w-full">
          <DropdownMenuItem className="w-full">PCD</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
