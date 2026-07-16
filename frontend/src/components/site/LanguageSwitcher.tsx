"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", label: "English",    short: "EN", googleCode: "en" },
  { code: "es", label: "Español",    short: "ES", googleCode: "es" },
  { code: "de", label: "Deutsch",    short: "DE", googleCode: "de" },
  { code: "ru", label: "Русский",    short: "RU", googleCode: "ru" },
  { code: "ja", label: "日本語",      short: "JA", googleCode: "ja" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

function getActiveLang(): LangCode {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.split("; ").find((r) => r.startsWith("googtrans="));
  if (match) {
    const parts = match.split("/");
    const lang = parts[parts.length - 1] as LangCode;
    if (lang && LANGUAGES.some((l) => l.code === lang)) return lang;
  }
  return "en";
}

function translateTo(code: LangCode) {
  if (code === "en") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    window.location.reload();
    return;
  }
  const googleCode = LANGUAGES.find((l) => l.code === code)?.googleCode ?? code;
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = googleCode;
    select.dispatchEvent(new Event("change"));
    return;
  }
  document.cookie = `googtrans=/en/${googleCode}; path=/`;
  document.cookie = `googtrans=/en/${googleCode}; path=/; domain=${window.location.hostname}`;
  window.location.reload();
}

type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export function LanguageSwitcher({ variant = "light", className }: Props) {
  const [active, setActive]   = useState<LangCode>("en");
  const [open, setOpen]       = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(getActiveLang());
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code: LangCode) => {
    setActive(code);
    setOpen(false);
    translateTo(code);
  };

  const activeLang = LANGUAGES.find((l) => l.code === active) ?? LANGUAGES[0];

  const isDark = variant === "dark";
  const triggerCls = cn(
    "inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-bold tracking-wider transition-colors cursor-pointer select-none",
    isDark
      ? "border-white/20 text-white/80 hover:border-white/50 hover:text-white"
      : "border-border text-muted-foreground hover:border-primary hover:text-primary",
    className
  );
  const dropdownCls = cn(
    "absolute z-50 mt-1 min-w-[9rem] rounded-md border shadow-lg py-1 text-xs font-semibold",
    isDark
      ? "bg-charcoal border-white/10 text-white"
      : "bg-background border-border text-charcoal"
  );

  return (
    <div ref={ref} className="relative inline-block" role="navigation" aria-label="Language">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={triggerCls}
      >
        <Globe className="h-3.5 w-3.5 shrink-0" />
        <span>{activeLang.short}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className={dropdownCls}
          style={{ top: "100%", right: 0 }}
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === active}>
              <button
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between gap-3 px-4 py-2 transition-colors",
                  lang.code === active
                    ? "text-primary bg-primary/5"
                    : isDark
                    ? "text-white/70 hover:bg-white/5 hover:text-white"
                    : "text-charcoal hover:bg-surface"
                )}
              >
                <span>{lang.label}</span>
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    lang.code === active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {lang.short}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
