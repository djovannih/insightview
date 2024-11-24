"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
  );
}
