import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Clock, ShieldCheck } from "lucide-react";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
  title: "Request a Custom Quote",
  description:
    "Send your specifications and technical drawings. JIAYI responds with a custom quote within 24 hours.",
  alternates: { canonical: "/quote" },
};

type Props = {
  searchParams: Promise<{ product?: string }>;
};

export default async function QuotePage({ searchParams }: Props) {
  const { product } = await searchParams;
  const t = await getTranslations("quote");

  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img src="/images/hero-quote.jpg" alt="Request a Quote" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Request a Quote</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid lg:grid-cols-[1.5fr_1fr] gap-12">
          <QuoteForm defaultProduct={product} />

          <aside className="space-y-5">
            <div className="border border-border rounded-md p-6 bg-charcoal text-charcoal-foreground">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-white">{t("promise")}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{t("promiseBody")}</p>
            </div>
            <div className="border border-border rounded-md p-6">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <h3 className="mt-4 text-base font-semibold text-charcoal">{t("nda")}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("ndaBody")}</p>
            </div>
            <div className="border border-border rounded-md p-6 bg-surface">
              <h3 className="text-sm font-semibold text-charcoal">Direct Engineering Contact</h3>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <div>engineering@jiayitool.com</div>
                <div>+86 18688733869</div>
                <div>Mon – Sat · 09:00 – 18:00 CST</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
