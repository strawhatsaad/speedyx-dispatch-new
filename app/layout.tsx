import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LiquidFilters from "@/components/LiquidFilters";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpeedyX Dispatch",
  description: "Premium Logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white antialiased`}>
        <LiquidFilters />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
