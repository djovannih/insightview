import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Toaster } from "@/components/ui/sonner";
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

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body className="min-h-screen bg-muted">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="mx-auto max-w-3xl py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
