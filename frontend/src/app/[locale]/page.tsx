import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight, Target, Layers, Cpu, Sparkles,
  PenTool, ShieldCheck, FileText,
} from "lucide-react";
import { getIndustries, getFeaturedIndustries, extractImageUrl } from "@/lib/strapi";
import { SectionTitle } from "@/components/site/SectionTitle";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "JIAYI TOOL — Precision. Performance. Reliability.",
    description:
      "High-precision cutting tools and customized solutions for Aerospace, Automotive, Hydraulic Systems and Precision Manufacturing.",
    alternates: { canonical: "/" },
  };
}

const capabilities = [
  { icon: Target, title: "Micro Tolerance", body: "Tight tolerances down to ±0.005 mm" },
  { icon: Layers, title: "Premium Materials", body: "Carbide, HSS-Co and advanced alloys" },
  { icon: Cpu, title: "Advanced CNC", body: "5-axis grinding for complex geometries" },
  { icon: Sparkles, title: "Surface Coating", body: "PVD / CVD coatings for longer tool life" },
  { icon: PenTool, title: "Custom Design", body: "Tailored solutions from your drawings" },
  { icon: ShieldCheck, title: "Quality Assurance", body: "100% inspection with strict controls" },
];

const INDUSTRY_IMAGES: Record<string, string> = {
  aerospace: "/images/ind-aerospace.jpg",
  automotive: "/images/ind-automotive.jpg",
  hydraulics: "/images/ind-hydraulics.jpg",
  electronics: "/images/ind-electronics.jpg",
  medical: "/images/ind-medical.jpg",
  energy: "/images/ind-energy.jpg",
  "precision-engineering": "/images/ind-rail.jpg",
  defense: "/images/ind-shipbuilding.jpg",
};

const HEADING = "font-display uppercase";

export default async function HomePage() {
  const [t, industries, featuredIndustries] = await Promise.all([
    getTranslations(),
    getIndustries(),
    getFeaturedIndustries(),
  ]);

  const featuredSlugs = ["aerospace", "automotive", "hydraulics", "electronics"];
  const displayIndustries = featuredIndustries.length > 0
    ? featuredIndustries.slice(0, 4)
    : featuredSlugs
        .map((s) => industries.find((i) => i.slug === s))
        .filter(Boolean) as typeof industries;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface border-b border-border">
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, hsl(240 30% 14% / 0.05), transparent)",
          }}
          aria-hidden
        />
        <div className="container-page relative grid lg:grid-cols-2 gap-12 py-20 lg:py-28 items-center">
          <div>
            <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5">
              {t("hero.badge")}
            </p>
            <h1
              className={`${HEADING} text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] text-charcoal`}
            >
              {t("hero.titleA")}
              <br />
              <span className="text-primary">{t("hero.titleB")}</span>
              <br />
              {t("hero.titleC")}
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-charcoal transition-colors"
              >
                {t("hero.requestQuote")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-charcoal px-8 py-4 text-sm font-bold uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-charcoal-foreground transition-colors"
              >
                {t("hero.browseProducts")}
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="/images/hero-tools.jpg"
                alt="JIAYI precision carbide cutting tools"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/30" />
            </div>
            {/* Tolerance badge */}
            <div className="absolute -bottom-6 -left-6 bg-background px-6 py-4 shadow-xl border-l-4 border-primary">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Industry Standard
              </p>
              <p className={`${HEADING} text-3xl font-black text-charcoal leading-none mt-1`}>
                {t("hero.tolerance")}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {t("hero.toleranceLabel")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.25em] mb-3">
                Industries We Serve
              </p>
              <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-charcoal`}>
                Powering the World&apos;s Critical Industries
              </h2>
            </div>
            <Link
              href="/industries"
              className="group inline-flex items-center gap-2 text-primary font-bold uppercase text-sm"
            >
              View All Industries
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries`}
                className="group relative overflow-hidden bg-surface"
              >
                <div className="aspect-[4/3] overflow-hidden bg-charcoal relative">
                  {extractImageUrl(ind.image) || INDUSTRY_IMAGES[ind.slug] ? (
                    <img
                      src={extractImageUrl(ind.image) || INDUSTRY_IMAGES[ind.slug]}
                      alt={ind.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full grid-pattern flex items-center justify-center">
                      <span className={`${HEADING} text-2xl font-black text-white/20`}>
                        {ind.name.split(" ")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/10 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur px-5 py-4 flex items-center justify-between">
                  <span className="font-bold uppercase text-[11px] tracking-wider text-charcoal truncate">
                    {ind.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Engineering Excellence
            </p>
            <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-charcoal`}>
              Advanced Capabilities. Uncompromised Quality.
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center group">
                <div className="mx-auto w-14 h-14 mb-4 bg-background rounded-full grid place-items-center shadow-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-charcoal mb-2">
                  {title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / STATS BAND */}
      <section className="bg-charcoal text-charcoal-foreground">
        <div className="grid lg:grid-cols-2">
          {/* Factory image */}
          <div className="relative min-h-[260px] lg:min-h-[340px] overflow-hidden">
            <img
              src="/images/factory.jpg"
              alt="JIAYI factory"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/50" />
          </div>
          {/* Content */}
          <div className="px-6 py-8 lg:px-16 lg:py-12 flex flex-col justify-center">
            <p className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-4">
              About JIAYI
            </p>
            <h2
              className={`${HEADING} text-4xl md:text-5xl font-extrabold text-white leading-tight`}
            >
              Your Trusted Partner in Precision
            </h2>
            <p className="mt-6 text-white/70 max-w-xl leading-relaxed">
              With over 15 years of experience and continuous innovation, JIAYI delivers
              high-performance cutting tools and custom solutions to hydraulic OEMs and precision
              manufacturers in more than 50 countries.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-8">
              {[
                { v: "50+", l: "Countries Served" },
                { v: "200+", l: "Skilled Professionals" },
                { v: "100+", l: "Advanced Machines" },
                { v: "100%", l: "Quality Commitment" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary pl-5">
                  <div
                    className={`${HEADING} text-4xl md:text-5xl font-black text-white leading-none`}
                  >
                    {s.v}
                  </div>
                  <div className="mt-2 text-[11px] text-white/50 font-bold uppercase tracking-widest">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 w-fit inline-flex items-center gap-2 border-2 border-white/25 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary hover:border-primary transition-all"
            >
              {t("common.learnMore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SLIM CTA */}
      <section className="bg-background border-b border-border py-10">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-charcoal text-charcoal-foreground grid place-items-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`${HEADING} text-lg font-extrabold text-charcoal leading-tight`}>
                Have a Project in Mind?
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Send us your drawings or requirements — our engineering team will provide the best
                solution.
              </p>
            </div>
          </div>
          <Link
            href="/quote"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-bold uppercase text-xs tracking-[0.15em] hover:bg-charcoal transition-colors"
          >
            {t("common.requestQuote")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
