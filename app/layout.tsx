import type { Metadata } from "next";
import { Inter, Roboto, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
import localFont from "next/font/local";
import Preloader from "@/components/Preloader";
import { AppProvider } from "@/components/providers/FirstContextProvider";

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
  title: "Bns Pharma",
  description: "bns pharma website",
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
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
            >
              <Navbar />

              <main className="font-sans">{children}</main>
              <Footer />

              <Toaster richColors duration={2000} />
            </ThemeProvider>
          </ReactQueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
