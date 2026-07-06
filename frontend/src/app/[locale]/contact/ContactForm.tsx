"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="border border-primary/20 bg-primary/5 rounded-md p-8 text-center h-fit">
        <p className="text-sm text-primary font-medium">{t("sent")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border rounded-md p-8 bg-background space-y-5 h-fit"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("formTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("formSubtitle")}</p>
      </div>

      <Field label={t("name")} required>
        <Input name="name" required />
      </Field>
      <Field label="Email" required>
        <Input name="email" type="email" required />
      </Field>
      <Field label={t("subject")}>
        <Input name="subject" />
      </Field>
      <Field label={t("message")} required>
        <Textarea name="message" rows={5} required />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Sending…" : t("formTitle")}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
        {label}{" "}
        {required && <span className="text-primary">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
