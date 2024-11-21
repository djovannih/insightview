"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
              className="rounded-full bg-gray-200 p-2 transition duration-300 focus:outline-none dark:bg-gray-700"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
