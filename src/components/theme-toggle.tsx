"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
      className={cn(
        "mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm font-medium transition-colors",
        isLight
          ? "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200"
          : "border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-600 hover:bg-slate-700/80",
      )}
    >
      <span className="flex items-center gap-2">
        {isLight ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
        {isLight ? "Tema claro" : "Tema escuro"}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-current/70">
        {isLight ? "Claro" : "Escuro"}
      </span>
    </button>
  );
}
