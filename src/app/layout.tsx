import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import Header from "@/components/layout/header/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Insightview",
  description:
    "Effortlessly transcribe interviews, extract AI-driven insights, and generate HTML-ready articles with Insightview for streamlined content creation.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
