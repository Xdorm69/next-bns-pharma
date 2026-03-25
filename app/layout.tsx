import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const equitanSans = localFont({
  src: [
    {
      path: "/fonts/EquitanSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-equitan",
});

const brSonoma = localFont({
  src: [
    {
      path: "/fonts/BRSonoma-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-brsonoma",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bnspharmaceuticals.com"), // <-- your real domain
  title: "Bns Pharma | Trusted Pharmaceutical Solutions",
  description:
    "Bns Pharma delivers high-quality pharmaceutical products with a focus on innovation, safety, and patient well-being. Explore our medicines, healthcare solutions, and research-driven products.",
  icons: "/company_logo.png",
  keywords: [
    "Bns Pharma",
    "pharmaceutical company",
    "pharma products",
    "healthcare solutions",
    "medicine manufacturing",
    "quality pharma",
    "trusted pharmaceuticals",
  ],
  openGraph: {
    title: "Bns Pharma | Trusted Pharmaceutical Solutions",
    description:
      "Discover Bns Pharma's wide range of high-quality medicines and healthcare solutions trusted by professionals worldwide.",
    url: "https://bnspharmaceuticals.com",
    siteName: "Bns Pharma",

    images: [
      {
        url: "/company_logo.png", // place your product/company logo in /public/logo.png
        width: 512,
        height: 512,
        alt: "Bns Pharma Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
        className={`${equitanSans.variable} ${brSonoma.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <ReactQueryProvider>
              <Navbar />

              <main className="font-sans">
                <NuqsAdapter>
                  {children}
                </NuqsAdapter>
                <Analytics />
              </main>
              <Footer />

              <Toaster richColors duration={2000} />
          </ReactQueryProvider>
          <SpeedInsights />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
