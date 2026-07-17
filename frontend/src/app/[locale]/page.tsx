import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight, CheckCircle2, Factory, Wrench, Globe,
  HeadphonesIcon, Award, BookOpen, Download, FileUp,
  Mail, Zap, Settings, FileText, ShoppingCart, PenLine,
  Cpu, Truck,
} from "lucide-react";
import {
  getCategories, getIndustries, getBlogPosts,
  extractImageUrl, getStrapiImageUrl,
} from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "JIAYI TOOL — Precision. Performance. Reliability.",
    description:
      "Factory-direct precision carbide cutting tools for aerospace, automotive, hydraulic OEM and precision manufacturing. Walter & Rollomatic grinding, ISO 9001 certified. Shenzhen, China.",
    alternates: { canonical: "/" },
  };
}

const HEADING = "font-display uppercase";

// Fallback industry images
const INDUSTRY_IMAGES: Record<string, string> = {
  aerospace:              "/images/ind-aerospace.jpg",
  automotive:             "/images/ind-automotive.jpg",
  hydraulics:             "/images/ind-hydraulics.jpg",
  electronics:            "/images/ind-electronics.jpg",
  medical:                "/images/ind-medical.jpg",
  energy:                 "/images/ind-energy.jpg",
  "oil-and-gas":          "/images/ind-energy.jpg",
  "precision-engineering":"/images/ind-rail.jpg",
  "precision-components": "/images/ind-rail.jpg",
  defense:                "/images/ind-shipbuilding.jpg",
  shipbuilding:           "/images/ind-shipbuilding.jpg",
  "mold-making":          "/images/ind-hydraulics.jpg",
  "carbon-fiber":         "/images/ind-aerospace.jpg",
};

// Fallback category images
const CATEGORY_IMAGES: Record<string, string> = {
  "cavity-tools":              "/images/cat-cavity.jpg",
  "port-tools":                "/images/cat-cavity.jpg",
  "hole-making-tools":         "/images/cat-hole-making.jpg",
  "milling-cutters":           "/images/cat-milling.jpg",
  "threading-tools":           "/images/cat-milling.jpg",
  "composite-material-machining": "/images/cat-composite.jpg",
};

const PROCESS_STEPS = [
  { n: 1, icon: Mail,         title: "Contact Us",          body: "Send an email, submit the quote form, or upload your drawings directly. Tell us your application and requirements." },
  { n: 2, icon: Zap,          title: "24h Quote Response",  body: "An application engineer reviews your specs and responds within one business day — with pricing, lead time, and substrate recommendation." },
  { n: 3, icon: Settings,     title: "Engineering Review",  body: "We confirm geometry, substrate, coating and tolerances. NDA available before any drawing review." },
  { n: 4, icon: FileText,     title: "Formal Quote",        body: "You receive a written quotation with itemized pricing, delivery terms, and full technical specification." },
  { n: 5, icon: ShoppingCart, title: "Purchase Order",      body: "Once you approve, issue your PO. Production is scheduled and starts within 1–2 business days." },
  { n: 6, icon: PenLine,      title: "Approval Drawing",    body: "For custom tools, we send a production drawing for your sign-off before grinding begins — no surprises." },
  { n: 7, icon: Cpu,          title: "Production",          body: "Your tools are ground on Walter 5-axis CNC centres and 100% inspected on Zoller optical measurement systems." },
  { n: 8, icon: Truck,        title: "Shipping & Support",  body: "Tools ship with CoC, CMM report, and material certificate. Our team remains available for post-delivery support." },
];

const WHY_US = [
  {
    icon: Factory,
    title: "Factory Direct Manufacturer",
    body: "No middlemen. You deal directly with our engineering team in Shenzhen — better pricing, faster decisions, full technical support.",
  },
  {
    icon: Wrench,
    title: "OEM & ODM Available",
    body: "Send your drawings — we engineer, prototype and manufacture to your exact specifications with full dimensional inspection report.",
  },
  {
    icon: Award,
    title: "Walter & Rollomatic Grinding",
    body: "Same 5-axis grinding machines used by European aerospace tier-1 suppliers. ±0.005 mm tolerance on every production batch.",
  },
  {
    icon: HeadphonesIcon,
    title: "Engineering Support",
    body: "Dedicated application engineers respond within 24 hours. Substrate selection, coating, geometry — all optimized for your application.",
  },
  {
    icon: Globe,
    title: "Global Delivery",
    body: "DDP shipping to 50+ countries. Full export documentation, CoC, CMM report, and material certificate with every shipment.",
  },
];

export default async function HomePage() {
  const [t, categories, industries, { data: blogPosts }] = await Promise.all([
    getTranslations(),
    getCategories(),
    getIndustries(),
    getBlogPosts(1, 3),
  ]);

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-tools.jpg"
            alt="JIAYI precision carbide cutting tools"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/30" />
        </div>

        <div className="container-page relative py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5">
              {t("hero.badge")}
            </p>
            <h1 className={`${HEADING} text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] text-white`}>
              {t("hero.titleA")}
              <br />
              <span className="text-primary">{t("hero.titleB")}</span>
              <br />
              {t("hero.titleC")}
            </h1>
            <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "✔ Factory Direct Manufacturer",
                "✔ OEM & ODM Available",
                "✔ Walter & Rollomatic Grinding",
                "✔ Engineering Support",
                "✔ Global Delivery",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center text-xs font-semibold text-white/80 bg-white/10 border border-white/20 rounded px-3 py-1.5"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 border-2 border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:border-white transition-colors"
              >
                <FileUp className="h-4 w-4" />
                Upload Drawings
              </Link>
            </div>
          </div>

          {/* Stat band */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-3xl">
            {[
              { v: "2009", l: "Est." },
              { v: "50+",  l: "Countries" },
              { v: "8,000+", l: "Tools/Day" },
              { v: "ISO 9001", l: "Certified" },
            ].map(({ v, l }) => (
              <div key={l} className="bg-charcoal/60 px-6 py-4 text-center">
                <div className={`${HEADING} text-2xl font-black text-primary`}>{v}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────────────────── */}
      <section className="py-16 bg-surface border-b border-border">
        <div className="container-page">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Why JIAYI
            </p>
            <h2 className={`${HEADING} text-2xl md:text-3xl font-extrabold text-charcoal`}>
              Factory, Not Trading Company
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm">
              We manufacture every tool we sell — in our own 1,800 m² facility in Shenzhen, with our own engineers, machines, and coating lines.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WHY_US.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-background border border-border rounded-md p-5 hover:border-primary transition-colors">
                <div className="h-10 w-10 rounded bg-primary/10 grid place-items-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-charcoal leading-snug">{title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS PROCESS ────────────────────────────────────────────── */}
      <section className="py-24 bg-charcoal overflow-hidden">
        <div className="container-page">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
              How It Works
            </p>
            <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-white`}>
              Our Business Process
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              From your first inquiry to final delivery — a transparent, engineer-led process with no surprises.
            </p>
          </div>

          {/* Row 1 — steps 1–4 */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-white/20" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PROCESS_STEPS.slice(0, 4).map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.n} className="flex flex-col items-center text-center group">
                    {/* Icon circle */}
                    <div className="relative z-10 mb-5">
                      <div className="h-20 w-20 rounded-full bg-primary shadow-[0_0_0_8px_rgba(220,38,38,0.15)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-white text-charcoal text-[11px] font-black flex items-center justify-center shadow-md">
                        {step.n}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed max-w-[160px]">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Turn arrow */}
          <div className="hidden md:flex justify-end pr-[12.5%] my-2">
            <div className="flex flex-col items-center gap-1 text-white/20">
              <div className="h-8 w-px border-l-2 border-dashed border-white/20" />
              <ArrowRight className="h-4 w-4 rotate-90" />
            </div>
          </div>

          {/* Row 2 — steps 5–8, reversed direction */}
          <div className="relative mt-2">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-white/20" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PROCESS_STEPS.slice(4, 8).map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.n} className="flex flex-col items-center text-center group">
                    <div className="relative z-10 mb-5">
                      <div className="h-20 w-20 rounded-full bg-primary shadow-[0_0_0_8px_rgba(220,38,38,0.15)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-white text-charcoal text-[11px] font-black flex items-center justify-center shadow-md">
                        {step.n}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed max-w-[160px]">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-primary/90 transition-colors"
            >
              Start Your Order <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-xs text-white/30">Engineering team responds within 24 hours</p>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ──────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
                Product Catalogue
              </p>
              <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-charcoal`}>
                Cutting Tools for Every Application
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                200+ standard tools across 7 categories — all in carbide, PCD, PCBN and HSS-Co. Custom geometries available from your drawings.
              </p>
            </div>
            <Link
              href="/products"
              className="group shrink-0 inline-flex items-center gap-2 text-primary font-bold uppercase text-sm"
            >
              Full Catalogue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.slice(0, 8).map((cat) => {
              const imgUrl = extractImageUrl(cat.image) || CATEGORY_IMAGES[cat.slug] || "";
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="group border border-border rounded-md bg-background overflow-hidden hover:border-primary transition-colors"
                >
                  <div className="aspect-[5/3] relative overflow-hidden bg-charcoal">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`${HEADING} text-2xl font-black text-white/10`}>
                          {cat.name.split(" ")[0]}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors" />
                    {cat.count > 0 && (
                      <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-background px-2 py-1 rounded">
                        {cat.count} products
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-charcoal group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    {cat.short && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {cat.short}
                      </p>
                    )}
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      View Tools <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
                Industries We Serve
              </p>
              <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-charcoal`}>
                Powering the World&apos;s Critical Industries
              </h2>
            </div>
            <Link
              href="/industries"
              className="group shrink-0 inline-flex items-center gap-2 text-primary font-bold uppercase text-sm"
            >
              All Industries <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {industries.map((ind) => {
              const imgUrl = extractImageUrl(ind.image) || INDUSTRY_IMAGES[ind.slug] || "";
              return (
                <Link
                  key={ind.slug}
                  href="/industries"
                  className="group relative overflow-hidden rounded-md bg-charcoal aspect-[4/3]"
                >
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-charcoal/80" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white leading-tight block">
                      {ind.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FACTORY BAND ────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
            <Image
              src="/images/factory.jpg"
              alt="JIAYI factory production floor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/50" />
            <Link
              href="/factory"
              className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/90 transition-colors rounded"
            >
              Tour the Factory <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="px-8 py-12 lg:px-16 lg:py-16 flex flex-col justify-center">
            <p className="text-primary font-bold uppercase tracking-[0.25em] text-xs mb-4">
              About JIAYI
            </p>
            <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-white leading-tight`}>
              Your Trusted Partner in Precision
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Founded in 2009 in Shenzhen, JIAYI is a <strong className="text-white">factory-direct manufacturer</strong> — not a trading company. We operate our own 1,800 m² grinding facility with Walter and Rollomatic 5-axis CNC systems, in-house PVD/CVD coating lines, and Zoller 100% optical inspection.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              We serve 50+ countries, producing cavity tools, port tools, reamers, drills, end mills, and custom carbide solutions for hydraulic OEMs, aerospace, medical, and automotive manufacturers.
            </p>

            <div className="mt-8 space-y-2.5">
              {[
                "ISO 9001:2015 certified — audited annually",
                "±0.005 mm tolerance on standard catalog tools",
                "100% Zoller optical inspection on every batch",
                "24-hour quote response — engineering team, not sales",
                "Full CoC + CMM report with every shipment",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary hover:border-primary transition-all"
              >
                {t("common.learnMore")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/quality"
                className="inline-flex items-center gap-2 border-2 border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary hover:border-primary transition-all"
              >
                Quality Assurance <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS BAND ────────────────────────────────────────────── */}
      <section className="py-14 bg-background border-b border-border">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-primary mb-8">
            Explore More
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: "/products",
                icon: Wrench,
                title: "Product Catalogue",
                body: "200+ standard tools across 7 categories",
                cta: "Browse Products",
              },
              {
                href: "/industries",
                icon: Factory,
                title: "Industry Applications",
                body: "Aerospace, Hydraulics, Medical, Automotive & more",
                cta: "View Industries",
              },
              {
                href: "/blog",
                icon: BookOpen,
                title: "Technical Blog",
                body: "Application guides, material notes & machining tips",
                cta: "Read Articles",
              },
              {
                href: "/downloads",
                icon: Download,
                title: "Download Center",
                body: "Product catalogs, tech docs, ISO certificates",
                cta: "Download Now",
              },
            ].map(({ href, icon: Icon, title, body, cta }) => (
              <Link
                key={href}
                href={href}
                className="group border border-border rounded-md p-6 bg-background hover:border-primary transition-colors"
              >
                <div className="h-10 w-10 rounded bg-primary/10 grid place-items-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-charcoal group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  {cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST BLOG POSTS ───────────────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-surface border-b border-border">
          <div className="container-page">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-10">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
                  Technical Blog
                </p>
                <h2 className={`${HEADING} text-3xl font-extrabold text-charcoal`}>
                  Latest Application Notes
                </h2>
              </div>
              <Link
                href="/blog"
                className="group shrink-0 inline-flex items-center gap-2 text-primary font-bold uppercase text-sm"
              >
                All Articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => {
                const imgUrl = post.image ? getStrapiImageUrl(post.image.url) : null;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group border border-border rounded-md bg-background overflow-hidden hover:border-primary transition-colors"
                  >
                    <div className="aspect-[5/3] relative bg-charcoal overflow-hidden">
                      {imgUrl && (
                        <Image
                          src={imgUrl}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-primary bg-background px-2 py-1 rounded">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-muted-foreground">{post.date}</div>
                      <h3 className="mt-2 text-sm font-semibold text-charcoal leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-charcoal">
        <div className="container-page text-center max-w-3xl">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Ready to Get Started?
          </p>
          <h2 className={`${HEADING} text-3xl md:text-4xl font-extrabold text-white`}>
            Ready to Boost Your Machining Efficiency?
          </h2>
          <p className="mt-5 text-white/70 text-lg leading-relaxed">
            Upload your drawings now. Our engineering team will respond within 24 hours with
            pricing, lead time, and the optimal substrate and coating recommendation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-primary/90 transition-colors"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:border-white transition-colors"
            >
              <FileUp className="h-4 w-4" /> Upload Drawings
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/40">
            ISO 9001:2015 Certified · ±0.005 mm Tolerance · 50+ Countries Served
          </p>
        </div>
      </section>
    </>
  );
}
