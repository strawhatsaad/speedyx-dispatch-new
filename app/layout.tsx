import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SpeedyX Dispatch - Premium Truck Dispatch Services",
  description:
    "Get the highest rates, fastest factoring, and 24/7 support. We handle the hassle so you can focus on the road.",
  keywords:
    "truck dispatch, freight dispatch, carrier services, load booking, truck factoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
