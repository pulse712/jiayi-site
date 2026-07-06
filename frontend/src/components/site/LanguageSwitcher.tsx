"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function translateTo(langCode: string) {
  if (langCode === "en") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    window.location.reload();
    return;
  }
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event("change"));
    return;
  }
  document.cookie = `googtrans=/en/${langCode}; path=/`;
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
  window.location.reload();
}

type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export function LanguageSwitcher({ variant = "light", className }: Props) {
  const [active, setActive] = useState("en");

  useEffect(() => {
    const match = document.cookie.split("; ").find((r) => r.startsWith("googtrans="));
    if (match) {
      const parts = match.split("/");
      const lang = parts[parts.length - 1];
      if (lang && lang !== "en") setActive(lang);
    }
  }, []);

  const handleSelect = (code: string) => {
    setActive(code);
    translateTo(code);
  };

  const border = variant === "dark" ? "border-white/20" : "border-border";
  const inactive = variant === "dark"
    ? "text-white/60 hover:text-white"
    : "text-muted-foreground hover:text-foreground";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded overflow-hidden border text-xs font-bold tracking-wider",
        border,
        className
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => handleSelect("en")}
        aria-pressed={active === "en"}
        className={cn(
          "px-3 py-1.5 transition-colors",
          active === "en" ? "bg-charcoal text-white" : inactive
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSelect("es")}
        aria-pressed={active === "es"}
        className={cn(
          "px-3 py-1.5 transition-colors border-l",
          border,
          active === "es" ? "bg-charcoal text-white" : inactive
        )}
      >
        ES
      </button>
    </div>
  );
}
