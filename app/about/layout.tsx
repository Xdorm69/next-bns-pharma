import type { Metadata } from "next";
import { ReactNode } from "react";

// ✅ FIXED: Same bug as contact/layout.tsx — was a plain variable, not exported
export const metadata: Metadata = {
  title: "About Us",  // → "About Us | BNS Pharma"
  description:
    "Learn about BNS Pharma's mission, vision, and journey in delivering innovative, safe, and high-quality pharmaceutical products across India.",
  keywords: [
    "About BNS Pharma",
    "pharma company history",
    "pharmaceutical mission vision",
    "BNS Pharma team",
  ],
  alternates: {
    canonical: "https://bnspharmaceuticals.com/about",
  },
  openGraph: {
    title: "About Us | BNS Pharma",
    description:
      "Discover BNS Pharma's vision, mission, and journey in advancing healthcare across India.",
    url: "https://bnspharmaceuticals.com/about",
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
