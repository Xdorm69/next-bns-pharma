import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/constants/images";
import { footer } from "@/lib/constants/footer";
import { ProductCatType } from "@prisma/client";
import { navbar } from "@/lib/constants/navbar";

const socialIconMap = {
  Instagram: <Instagram />,
  Facebook: <Facebook />,
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-gray-200">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Company */}
          <div>
            <div className="text-2xl font-bold mb-2">
              <Image
                src={images.shared.logo}
                alt="logo"
                width={150}
                height={150}
                loading="lazy"
                className="w-18 h-18 object-cover"
              />
              <p>BNS Pharmaceuticals</p>
            </div>
            <p className="text-muted-foreground max-w-sm">
              {footer.description}
            </p>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>{footer.certification}</p>
              <p>{footer.address.line1}</p>
              <p>{footer.address.line2}</p>
              <p>{footer.address.line3}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">
                Products
              </h3>
              <ul className="space-y-1">
                {Object.values(ProductCatType).map((category) => (
                  <li key={category}>
                    <Link
                      href={`/products?category=${category}`}
                      className="text-muted-foreground/50 hover:text-primary"
                    >
                      {category.charAt(0).toUpperCase() +
                        category.slice(1).toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">
                Company
              </h3>
              <ul className="space-y-1">
                {navbar.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground/50 hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-muted-foreground mb-2">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {footer.socials.map((social) => (
                <Button variant="ghost" size="icon" asChild key={social.name}>
                  <Link
                    href={social.url}
                    target="_blank"
                    className="bg-muted text-primary"
                  >
                    {socialIconMap[social.name as keyof typeof socialIconMap]}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-muted-foreground text-sm">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
