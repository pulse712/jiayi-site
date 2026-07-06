"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LocaleError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-5xl font-black text-charcoal/10 font-display mb-4">ERROR</div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Something went wrong</h1>
        <p className="text-muted-foreground text-sm mb-8">
          We couldn&apos;t load this page. This is usually a temporary issue.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors rounded-md"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-surface transition-colors rounded-md"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
