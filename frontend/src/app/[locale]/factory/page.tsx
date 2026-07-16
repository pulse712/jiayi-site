import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight, CheckCircle2, Gauge, Microscope,
  Shield, Thermometer, Layers, Cpu, Ruler,
} from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Factory Tour — Equipment & Testing Capabilities",
  description:
    "Tour JIAYI's 1,800 m² Shenzhen precision tool factory: Walter 5-axis grinders, Zoller optical inspection, PVD/CVD coating lines, and ISO 9001 quality systems.",
  alternates: { canonical: "/factory" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

// ── Data ──────────────────────────────────────────────────────────────────────

const PRODUCTION_STEPS = [
  {
    step: "01",
    title: "Raw Material Incoming",
    body: "Every carbide rod and PCD blank is inspected on arrival — hardness (HRA), TRS bending strength, grain size analysis and chemical composition verified against mill certificates before entering stock.",
    icon: Layers,
    image: "/images/factory-materials.jpg",
    specs: ["Hardness: HRA ≥ 92.5 (K10–K20)", "TRS: ≥ 3,500 N/mm²", "Grain size: 0.4–0.8 µm submicron", "Certificate: traceability to heat number"],
  },
  {
    step: "02",
    title: "5-Axis CNC Grinding",
    body: "Walter Helitronic Vision 400L and Rollomatic GrindSmart 830XW grinding centres produce the complete tool geometry in a single setup — flutes, clearances, point geometry and chamfers — eliminating repositioning errors.",
    icon: Cpu,
    image: "/images/factory-grinding.jpg",
    specs: ["42 × 5-axis CNC grinding centres", "Automated wheel change — up to 12 wheels", "Repeatability: ±0.001 mm", "Capacity: 8,000+ tools/day"],
  },
  {
    step: "03",
    title: "PVD / CVD Coating",
    body: "In-house Hauzer and Platit PVD arc-evaporation units apply TiAlN, AlTiN, TiCN and DLC coatings to customer specification. CVD diamond coating is applied for PCD composite and aluminium tools.",
    icon: Thermometer,
    image: "/images/factory-coating.jpg",
    specs: ["Coating thickness: 1–4 µm PVD", "Deposition temperature: 450–500 °C", "Adhesion: Rockwell HF1–HF2", "Batch traceability — lot-coded"],
  },
  {
    step: "04",
    title: "Optical Inspection",
    body: "Zoller Genius 3 and Genius 700 tool measuring machines inspect 100% of production. Point angle, helix angle, core diameter, runout, edge radius, flute form and coating uniformity are verified against the nominal drawing.",
    icon: Microscope,
    image: "/images/factory-inspection.jpg",
    specs: ["100× magnification CCD camera system", "Runout tolerance: ≤ 0.003 mm", "Edge radius measurement: ±0.001 mm", "100% production inspection — no sampling"],
  },
  {
    step: "05",
    title: "CMM Dimensional Verification",
    body: "Mitutoyo Crysta-Apex CMMs perform full 3D dimensional verification on first-off and statistical sampling during production. Aerospace and medical orders receive 100% CMM with full dimensional report.",
    icon: Ruler,
    image: "/images/factory-cmm.jpg",
    specs: ["Mitutoyo Crysta-Apex C 776 CMM", "Measurement uncertainty: ±0.0015 mm", "Full 3D programme per drawing", "Report archived 7 years"],
  },
  {
    step: "06",
    title: "Final Packing & Shipment",
    body: "Tools are laser-marked with a lot code, individually foam-packed, and shipped with a Certificate of Conformance (CoC), dimensional report and material certificate. DDP shipping to 50+ countries.",
    icon: Shield,
    image: "/images/factory-packing.jpg",
    specs: ["Laser marking: lot + operator traceability", "Individual foam-lined cassette packaging", "CoC + CMM report with every order", "DHL / FedEx express + freight forwarding"],
  },
];

const EQUIPMENT = [
  {
    category: "CNC Grinding",
    machines: [
      { name: "Walter Helitronic Vision 400L", qty: "18×", detail: "5-axis tool grinding, Ø3–160 mm, up to 12 automatic wheel changes" },
      { name: "Rollomatic GrindSmart 830XW", qty: "12×", detail: "6-axis micro tool grinding, Ø0.1–25 mm, Swiss precision" },
      { name: "Vollmer QWD760", qty: "6×", detail: "PCD and PCBN wire erosion for diamond tool manufacture" },
      { name: "ANCA MX7", qty: "6×", detail: "High-throughput round tool grinding, production lots" },
    ],
  },
  {
    category: "Coating",
    machines: [
      { name: "Hauzer Flexicoat 1200", qty: "4×", detail: "Arc-evaporation PVD — TiAlN, AlTiN, TiCN, CrN" },
      { name: "Platit π80", qty: "2×", detail: "LARC® pulsed arc PVD — nanocomposite coatings, DLC" },
      { name: "Bernex CVD Reactor", qty: "1×", detail: "CVD diamond coating for PCD tools and composite machining" },
    ],
  },
  {
    category: "Measurement & Inspection",
    machines: [
      { name: "Zoller Genius 3", qty: "6×", detail: "100× CCD optical tool measuring — geometry, runout, edge radius" },
      { name: "Zoller Genius 700", qty: "4×", detail: "High-resolution inspection for micro tools Ø0.1–25 mm" },
      { name: "Mitutoyo Crysta-Apex C 776", qty: "3×", detail: "3D CMM — full dimensional verification, uncertainty ±0.0015 mm" },
      { name: "Mitutoyo SJ-410 Surface Tester", qty: "8×", detail: "Surface roughness Ra / Rz measurement" },
      { name: "XRF Spectrometer", qty: "1×", detail: "Carbide substrate chemical composition verification" },
    ],
  },
  {
    category: "Supporting Equipment",
    machines: [
      { name: "Bystronic Laser Marker", qty: "6×", detail: "Lot code, product code and customer branding laser engraving" },
      { name: "Ultrasonic Cleaner Lines", qty: "4×", detail: "Multi-stage ultrasonic cleaning before and after coating" },
      { name: "Coordinate Marking Machine", qty: "2×", detail: "High-precision dot-peen marking for steel shanks" },
      { name: "Centrotherm Oven", qty: "2×", detail: "Controlled atmosphere stress-relief before coating" },
    ],
  },
];

const TESTING_CAPABILITIES = [
  {
    icon: Gauge,
    title: "Cutting Performance Testing",
    body: "In-house machining trials on Haas VF-4 and DMG Mori NLX machining centres — tool life, surface finish, and cycle time documented before product release.",
    highlights: ["ISO 3685 tool life methodology", "Workpiece materials: steel, stainless, cast iron, aluminium, titanium, composites", "Surface finish Ra measurement on every trial"],
  },
  {
    icon: Microscope,
    title: "Wear and Failure Analysis",
    body: "SEM/EDS scanning electron microscopy for failure analysis and coating adhesion evaluation — used during product development and for warranty investigations.",
    highlights: ["Hitachi SU3500 SEM + EDS", "Flank wear, crater wear, edge chipping classification", "Root cause reports within 5 business days"],
  },
  {
    icon: Shield,
    title: "Coating Adhesion & Hardness",
    body: "Rockwell scratch adhesion testing (HF scale), Vickers micro-hardness of substrate and coating, and cross-section coating thickness via SEM — all per ISO 26443.",
    highlights: ["Rockwell HF1–HF6 scratch test", "Vickers hardness: HV0.05–HV30", "Coating thickness cross-section SEM verification"],
  },
  {
    icon: Ruler,
    title: "Dimensional & Geometric Metrology",
    body: "Full 3D measurement on Mitutoyo CMM backed by NIST-traceable calibration artefacts. All gauges and measuring instruments on a controlled calibration schedule.",
    highlights: ["ISO/IEC 17025 calibration traceability", "Gauge R&R studies per customer PPAP", "Annual external calibration audit"],
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FactoryPage() {
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
    { name: "Factory Tour", url: `${SITE_URL}/factory` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/factory.jpg"
            alt="JIAYI precision tool factory production floor"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container-page py-24 relative">
          <div className="text-xs text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-primary">About</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Factory Tour</span>
          </div>
          <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
            Shenzhen, China — Est. 2009
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
            Factory Tour, Equipment & Testing Capabilities
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-3xl leading-relaxed">
            1,800 m² of precision grinding, PVD coating, and 100% optical inspection under one
            roof in Shenzhen. Everything from raw carbide rod to certified shipment in 14 days.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Request a Factory Tour <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-7 py-3.5 text-sm font-bold text-white hover:border-primary hover:text-primary transition-colors"
            >
              Watch Factory Videos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key numbers ───────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border -mx-0">
          {[
            { v: "1,800 m²", l: "Production Floor" },
            { v: "42+", l: "5-Axis CNC Grinders" },
            { v: "8,000+", l: "Tools per Day" },
            { v: "ISO 9001", l: "Certified Since 2012" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-surface px-8 py-6 text-center">
              <div className="text-2xl md:text-3xl font-black text-primary">{v}</div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Production process ────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-page">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
              End-to-End Manufacturing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
              From Raw Carbide to Certified Shipment
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Six tightly controlled production stages, every step under one roof — no outsourcing,
              no hand-offs, no quality gaps.
            </p>
          </div>

          <div className="space-y-20">
            {PRODUCTION_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isReversed = i % 2 === 1;
              return (
                <div
                  key={step.step}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-border bg-charcoal">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 font-mono text-4xl font-black text-white/10 leading-none">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-md bg-primary/10 grid place-items-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Step {step.step}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                    <ul className="mt-5 space-y-2">
                      {step.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2.5 text-sm text-charcoal">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Equipment list ────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Capital Equipment
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
              Best-in-Class Manufacturing Equipment
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We invest in the same machines used by tier-1 aerospace tooling suppliers in Europe —
              because our customers demand the same tolerances.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {EQUIPMENT.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 pb-2 border-b border-border">
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.machines.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-start gap-4 border border-border rounded-md p-4 bg-background"
                    >
                      <div className="shrink-0 text-right min-w-[2.5rem]">
                        <span className="text-xs font-bold text-primary font-mono">{m.qty}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-charcoal">{m.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{m.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testing capabilities ──────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-page">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Quality Laboratory
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-charcoal">
              Testing & Validation Capabilities
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              In-house testing means we know the performance of every tool we ship — not just
              its dimensions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {TESTING_CAPABILITIES.map(({ icon: Icon, title, body, highlights }) => (
              <div
                key={title}
                className="border border-border rounded-md bg-background p-7 hover:border-primary transition-colors"
              >
                <div className="h-12 w-12 rounded-md bg-primary/10 grid place-items-center mb-5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-charcoal">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
                <ul className="mt-5 space-y-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-charcoal">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facility photo grid ───────────────────────────────────────────── */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="container-page">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
              Inside JIAYI
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-charcoal">
              The Factory in Pictures
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { src: "/images/factory.jpg",            alt: "JIAYI main production floor with Walter grinders" },
              { src: "/images/factory-grinding.jpg",   alt: "5-axis CNC tool grinding in progress" },
              { src: "/images/factory-coating.jpg",    alt: "PVD coating chamber interior" },
              { src: "/images/factory-inspection.jpg", alt: "Zoller Genius optical inspection station" },
              { src: "/images/factory-cmm.jpg",        alt: "Mitutoyo CMM dimensional verification" },
              { src: "/images/factory-packing.jpg",    alt: "Final packing and laser marking area" },
              { src: "/images/factory-materials.jpg",  alt: "Carbide rod incoming material storage" },
              { src: "/images/about-building.jpg",     alt: "JIAYI headquarters building exterior" },
            ].map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-md border border-border bg-charcoal group ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-charcoal">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-4">
              Visit Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Book a Factory Visit
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              We welcome customer visits to our Shenzhen facility. A typical tour covers the
              full production flow — from carbide selection through grinding, coating, inspection,
              and final packing. We can also arrange a live machining demonstration with your
              workpiece material.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Full production walkthrough — 2 to 3 hours",
                "Live CNC grinding demonstration",
                "Metrology lab and CMM demonstration",
                "Engineering workshop with our application team",
                "Airport transfer from Shenzhen / Hong Kong available",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Schedule a Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-7 py-3.5 text-sm font-bold text-white hover:border-white transition-colors"
              >
                Watch Virtual Tour
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-white/10 rounded-md p-6">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Address</div>
              <p className="text-white/80 text-sm leading-relaxed">
                Floors 1–3, No. 12 Jingshan Road<br />
                Luotian Community, Songgang Town<br />
                Bao&apos;an District, Shenzhen 518105<br />
                Guangdong, China
              </p>
            </div>
            <div className="border border-white/10 rounded-md p-6">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">How to Get There</div>
              <div className="space-y-2 text-sm text-white/70">
                <div><span className="text-primary font-semibold">Shenzhen Bao&apos;an Airport</span> — 18 min by taxi</div>
                <div><span className="text-primary font-semibold">Hong Kong International Airport</span> — 90 min via Shenzhen Bay crossing</div>
                <div><span className="text-primary font-semibold">Guangzhou Baiyun Airport</span> — 80 min by high-speed rail + taxi</div>
              </div>
            </div>
            <div className="border border-white/10 rounded-md p-6">
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Visit Hours</div>
              <div className="text-sm text-white/70">
                Monday – Saturday · 09:00 – 17:00 CST<br />
                <span className="text-white/40 text-xs mt-1 block">Appointment required — contact us 3 business days in advance</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
