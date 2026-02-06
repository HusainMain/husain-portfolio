"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = (stored as "dark" | "light") || (prefersDark ? "dark" : "light");
      setTheme(initial);
      updateDocument(initial);
    } catch {}
  }, []);

  function updateDocument(next: "dark" | "light") {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", next);
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    updateDocument(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-full border border-slate-700 bg-slate-900 text-slate-300 hover:border-purple-500 hover:text-white transition-colors"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
