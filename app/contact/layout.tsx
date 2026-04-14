import type { Metadata } from "next";
import { ReactNode } from "react";

// ✅ FIXED: Was `const Metadata = {...}` (just a variable, never used by Next.js)
// Must be `export const metadata` for Next.js to pick it up
export const metadata: Metadata = {
  title: "Contact Us",  // renders as "Contact Us | BNS Pharma" via root template
  description:
    "Get in touch with BNS Pharma. Visit our offices in Dhakoli, Zirakpur or call (+91) 7696291637. We serve Chandigarh, Panchkula, Mohali and all of Punjab.",
  keywords: [
    "contact BNS Pharma",
    "BNS Pharma address",
    "pharma company Zirakpur contact",
    "BNS Pharma phone number",
  ],
  alternates: {
    canonical: "https://bnspharmaceuticals.com/contact",
  },
  openGraph: {
    title: "Contact Us | BNS Pharma",
    description:
      "Two offices in Dhakoli, Zirakpur. Call (+91) 7696291637 or email bnspharma@gmail.com.",
    url: "https://bnspharmaceuticals.com/contact",
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
