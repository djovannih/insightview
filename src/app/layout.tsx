import { PropsWithChildren } from "react";
import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "InsightView",
  description:
    "Effortlessly transcribe interviews, extract AI-driven insights, and generate HTML-ready articles with InsightView for streamlined content creation.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
