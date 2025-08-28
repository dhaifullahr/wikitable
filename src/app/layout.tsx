import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Wiki Table - Download Tables Easily",
    template: "%s | Wiki Table",
  },
  description: "Download tables from Wikipedia pages easily and export in CSV or Excel.",
  keywords: ["Wikipedia", "table extract", "export CSV", "download table"],
  authors: [{ name: "Rama", url: "https://x.com/dhaifulahr" }],
  verification: {
    google: "yfzj9NiqTfDWQ3JNcy4NQB8UXlD7JyjD1Vn_VXmSbxw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://wikitable.vercel.app"),
  openGraph: {
    title: "Wiki Table - Download tables from Wikipedia",
    description: "Easily extract and download Wikipedia tables in various formats.",
    url: "https://wikitable.vercel.app",
    siteName: "Wiki Table",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Screenshot of Wiki Table tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiki Table - Download tables from Wikipedia",
    description: "Easily extract and download Wikipedia tables in various formats.",
    images: ["https://yourdomain.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
