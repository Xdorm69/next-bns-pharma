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
import { ModeToggle } from "./ui/ModeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="dark:bg-card shadow-md sticky top-0 z-50">
      <div className="cont">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            BNS Pharmaceuticals
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="px-2 py-1 flex gap-1 items-center bg-muted"
                >
                  Products <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <Link href="/products/third-party">
                  <DropdownMenuItem>Third Party</DropdownMenuItem>
                </Link>
                <Link href="/products/pcd">
                  <DropdownMenuItem>PCD</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About */}
            <Link href="/about">
              <Button variant={"outline"}>About</Button>
            </Link>

            {/* MODE TOGGLE  */}
            <ModeToggle />

            {/* Login Button */}
            <Button
              variant="default"
              className="text-white font-semibold font-sans"
              asChild
            >
              <Link href="/auth/login">Login</Link>
            </Button>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full text-left">
                  Products
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link href="/products/third-party">Third Party</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products/pcd">PCD</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="px-2 py-1 text-gray-800 hover:text-blue-700"
            >
              About
            </Link>

            <Button variant="default" asChild className="w-full">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
