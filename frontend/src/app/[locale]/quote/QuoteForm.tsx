"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { CheckCircle2, FileUp, X, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  company:   z.string().trim().min(1, "Required").max(120),
  contact:   z.string().trim().min(1, "Required").max(120),
  email:     z.string().trim().email("Invalid email").max(255),
  phone:     z.string().trim().max(40).optional().or(z.literal("")),
  country:   z.string().min(1, "Required"),
  product:   z.string().max(200).optional().or(z.literal("")),
  material:  z.string().max(500).optional().or(z.literal("")),
  tolerance: z.string().max(500).optional().or(z.literal("")),
  quantity:  z.string().max(40).optional().or(z.literal("")),
  standard:  z.string().min(1, "Required"),
  notes:     z.string().max(2000).optional().or(z.literal("")),
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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [".pdf", ".dwg", ".dxf"];

type Props = {
  defaultProduct?: string;
};

export function QuoteForm({ defaultProduct }: Props) {
  const t = useTranslations("quote");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [file, setFile]       = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── File selection handler ─────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFileError("");
    if (!selected) { setFile(null); return; }

    const ext = "." + selected.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError("Only PDF, DWG, and DXF files are accepted.");
      setFile(null);
      e.target.value = "";
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFileError("File exceeds the 10 MB limit.");
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(selected);
  };

  const clearFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Form submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Collect text fields from the form
    const raw = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    for (const [k, v] of raw.entries()) {
      if (typeof v === "string") data[k] = v;
    }

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      // Build multipart FormData with validated text fields + optional file
      const fd = new FormData();
      for (const [k, v] of Object.entries(parsed.data)) {
        if (v !== undefined && v !== "") fd.append(k, v);
      }
      if (file) fd.append("drawing", file, file.name);

      const res = await fetch("/api/quote", { method: "POST", body: fd });

      if (res.ok) {
        setSent(true);
      } else {
        const json = await res.json().catch(() => ({}));
        setErrors({ _form: json?.error ?? "Submission failed. Please try again." });
      }
    } catch {
      setErrors({ _form: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────
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
      {/* Form-level error */}
      {errors._form && (
        <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
          {errors._form}
        </div>
      )}

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
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={t("standard")} required error={errors.standard}>
          <select name="standard" required defaultValue="" className={inputCls}>
            <option value="" disabled>{t("selectStandard")}</option>
            {STANDARDS.map((s) => <option key={s} value={s}>{s}</option>)}
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

      {/* ── File upload ─────────────────────────────────────────────────── */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-1.5">
          {t("drawing")}
        </span>

        {file ? (
          /* Selected file preview */
          <div className="flex items-center gap-3 border border-primary/40 bg-primary/5 rounded-md px-4 py-3">
            <Paperclip className="h-4 w-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-charcoal truncate">{file.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove file"
              className="p-1 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          /* Drop zone */
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-md py-8 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
            <FileUp className="h-6 w-6 text-primary" />
            <span className="text-sm text-muted-foreground">{t("upload")}</span>
            <span className="text-[11px] text-muted-foreground/70">PDF, DWG, DXF — max 10 MB</span>
            <input
              ref={fileInputRef}
              type="file"
              name="drawing"
              accept=".pdf,.dwg,.dxf,application/pdf"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        )}

        {fileError && (
          <div className="mt-1.5 text-xs text-destructive">{fileError}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-md bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Sending…
          </span>
        ) : t("send")}
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
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}
