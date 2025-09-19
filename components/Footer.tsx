"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-gray-200 mt-12">
      <div className="cont py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold mb-2">BNS Pharmaceuticals</h2>
            <p className="text-muted-foreground max-w-sm">
              Committed to providing high-quality healthcare products with trust
              and innovation.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>(An ISO & GMP Certified Company)</p>
              <p>Ground Floor, Shop No. 19,</p>
              <p>Wadhawa Nagar, Dhakoli,</p>
              <p>Zirakpur SAS Nagar, Punjab - 140603</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">
                Products
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/products/third-party"
                    className="text-muted-foreground/50 hover:text-primary"
                  >
                    Third Party
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/pcd"
                    className="text-muted-foreground/50 hover:text-primary"
                  >
                    PCD
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">
                Company
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground/50 hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground/50 hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-muted-foreground mb-2">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="w-5 h-5 text-primary" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank">
                  <Linkedin className="w-5 h-5 text-primary" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="w-5 h-5 text-primary" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} BNS Pharmaceuticals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
