import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter, Manrope } from "next/font/google";
import StructuredData from "./StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

// ─── ROOT METADATA ────────────────────────────────────────────────────────────
// Applies to every page. Individual pages override with their own `metadata` export.
// The `template` means page titles auto-render as: "Products | BNS Pharma"
export const metadata: Metadata = {
  metadataBase: new URL("https://bnspharmaceuticals.com"),

  title: {
    default: "BNS Pharma | Trusted Pharmaceutical Solutions",
    template: "%s | BNS Pharma",
  },

  description:
    "BNS Pharma delivers high-quality pharmaceutical products — tablets, syrups, capsules, injections & more. PCD and third-party manufacturing. Based in Zirakpur, Punjab.",

  keywords: [
    "BNS Pharma",
    "pharmaceutical company India",
    "PCD pharma franchise",
    "third party pharma manufacturing",
    "medicine manufacturer Punjab",
    "pharma company Zirakpur",
    "tablet syrup capsule manufacturer",
    "bnspharmaceuticals",
  ],

  authors: [{ name: "BNS Pharma", url: "https://bnspharmaceuticals.com" }],
  creator: "BNS Pharma",
  publisher: "BNS Pharma",

  // ── Open Graph ──────────────────────────────────────────────────────────────
  // Controls how your link looks when shared on WhatsApp, Facebook, LinkedIn etc.
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bnspharmaceuticals.com",
    siteName: "BNS Pharma",
    title: "BNS Pharma | Trusted Pharmaceutical Solutions",
    description:
      "High-quality pharma products — PCD franchise & third-party manufacturing. Based in Zirakpur, Punjab.",
    images: [
      {
        // Create a 1200×630 image and place it at /public/og-image.jpg
        // Use: Canva, Figma, or just export your hero banner as JPG
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BNS Pharma – Trusted Pharmaceutical Solutions",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "BNS Pharma | Trusted Pharmaceutical Solutions",
    description:
      "PCD pharma franchise & third-party manufacturing. Quality medicines from Zirakpur, Punjab.",
    images: ["/og-image.jpg"],
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png", // 180×180 PNG in /public
    shortcut: "/favicon.ico",
  },

  // ── Canonical ───────────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://bnspharmaceuticals.com",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${manrope.variable} antialiased font-sans`}
      >
        <SessionProviderWrapper>
          <ReactQueryProvider>
            <Navbar />
            <NuqsAdapter>
              <StructuredData />
              {children}
            </NuqsAdapter>
            <Analytics />
            <Footer />
            <Toaster richColors duration={2000} />
          </ReactQueryProvider>
          <SpeedInsights />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
