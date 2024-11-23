"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

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
            <button
              onClick={toggleTheme}
              className="group relative flex items-center justify-center rounded-full border border-muted/40 bg-transparent p-2 transition-all duration-300 hover:bg-muted/50"
              aria-label="Toggle theme"
            >
              <span
                className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-md transition duration-300 group-hover:opacity-100"
                aria-hidden="true"
              ></span>
              <span
                className="relative flex items-center justify-center text-muted-foreground transition-transform group-hover:text-primary"
                aria-hidden="true"
              >
                <Moon className="hidden h-5 w-5 dark:block" />
                <Sun className="block h-5 w-5 dark:hidden" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
