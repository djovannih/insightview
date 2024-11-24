import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/layout/header/theme-toggle";

export default function Header() {
  return (
    <nav className="bg-card shadow-sm">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex h-9 items-center gap-2">
            <Image src="/images/logo.png" width={27} height={32} alt="Logo" />
            <h1 className="text-2xl font-bold tracking-wide text-accent-foreground">
              {"Insightview"}
            </h1>
          </Link>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
