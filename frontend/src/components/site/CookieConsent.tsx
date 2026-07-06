"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "jy-cookie-consent";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const timer = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, at: new Date().toISOString() })
      );
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md"
    >
      <div className="relative rounded-xl border border-border bg-background shadow-2xl ring-1 ring-black/5">
        <button
          type="button"
          onClick={() => decide("rejected")}
          aria-label={t("close")}
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-5 pr-10">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
              <Cookie className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">{t("title")}</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("body")}{" "}
            <Link href="/privacy" className="text-primary underline underline-offset-2">
              {t("learnMore")}
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {t("reject")}
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
