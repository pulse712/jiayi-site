"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { CheckCircle2, FileUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  company: z.string().trim().min(1, "Required").max(120),
  contact: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().min(1, "Required"),
  product: z.string().max(200).optional().or(z.literal("")),
  material: z.string().max(500).optional().or(z.literal("")),
  tolerance: z.string().max(500).optional().or(z.literal("")),
  quantity: z.string().max(40).optional().or(z.literal("")),
  standard: z.string().min(1, "Required"),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

const COUNTRIES = [
  "United States", "Germany", "United Kingdom", "France", "Italy", "Spain",
  "Mexico", "Brazil", "Japan", "South Korea", "India", "Australia",
  "Canada", "Netherlands", "China", "Other",
];

const STANDARDS = [
  "SAE J1926", "ISO 6149", "Sun Hydraulics", "HydraForce",
  "Parker", "Danfoss", "Bosch Rexroth", "Other",
];

type Props = {
  defaultProduct?: string;
};

export function QuoteForm({ defaultProduct }: Props) {
  const t = useTranslations("quote");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="border border-primary/20 bg-primary/5 rounded-md p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
        <h2 className="mt-5 text-2xl font-bold">{t("successTitle")}</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">{t("successBody")}</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="border border-border rounded-md p-8 bg-background space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t("companyName")} required error={errors.company}>
          <Input name="company" required />
        </Field>
        <Field label={t("contactName")} required error={errors.contact}>
          <Input name="contact" required />
        </Field>
        <Field label="Email" required error={errors.email}>
          <Input name="email" type="email" required />
        </Field>
        <Field label={t("phone")} error={errors.phone}>
          <Input name="phone" />
        </Field>
        <Field label={t("country")} required error={errors.country}>
          <select name="country" required defaultValue="" className={inputCls}>
            <option value="" disabled>{t("selectCountry")}</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label={t("standard")} required error={errors.standard}>
          <select name="standard" required defaultValue="" className={inputCls}>
            <option value="" disabled>{t("selectStandard")}</option>
            {STANDARDS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label={t("productCode")} error={errors.product}>
          <Input name="product" defaultValue={defaultProduct ?? ""} />
        </Field>
        <Field label={t("quantity")} error={errors.quantity}>
          <Input name="quantity" placeholder="e.g. 500 pcs" />
        </Field>
        <Field label={t("material")} error={errors.material}>
          <Input name="material" placeholder="Carbide K20, etc." />
        </Field>
        <Field label={t("tolerance")} error={errors.tolerance}>
          <Input name="tolerance" placeholder="± 0.005 mm" />
        </Field>
      </div>

      <Field label={t("notes")} error={errors.notes}>
        <Textarea name="notes" rows={4} />
      </Field>

      {/* File upload UI (display only — actual upload wired to Strapi later) */}
      <Field label={t("drawing")}>
        <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-md py-8 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
          <FileUp className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">{t("upload")}</span>
          <input type="file" accept=".pdf,.dwg,.dxf" className="sr-only" />
        </label>
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-md bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? "Sending…" : t("send")}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <div className="mt-1 text-xs text-primary">{error}</div>}
    </label>
  );
}
