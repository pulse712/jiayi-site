import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ShieldCheck, Ruler, Microscope, ClipboardCheck,
  Award, Gauge, FileCheck2, Boxes,
} from "lucide-react";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata: Metadata = {
  title: "Quality Assurance — ISO 9001 Certified Precision Tooling",
  description:
    "ISO 9001 certified quality system: CMM inspection, Zoller tool presetting, full material traceability and CoC with every JIAYI shipment.",
  alternates: { canonical: "/quality" },
};

const pillars = [
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015 Certified",
    body: "Our quality management system is independently audited and re-certified annually, covering design, production and after-sales.",
  },
  {
    icon: Ruler,
    title: "±0.005 mm Tolerance",
    body: "Diameter, runout and profile tolerances held to ±0.005 mm on production tools — verified on every batch, not just first-off.",
  },
  {
    icon: Microscope,
    title: "100% Optical Inspection",
    body: "Zoller Genius 3 and Genius 700 tool measuring machines inspect geometry, edge prep and coating thickness at 100× magnification.",
  },
  {
    icon: ClipboardCheck,
    title: "Full Traceability",
    body: "Every tool is laser-marked with a lot code linking back to carbide substrate heat number, grinding wheel and operator.",
  },
  {
    icon: Gauge,
    title: "SPC & Process Control",
    body: "Statistical process control on 12 critical grinding parameters keeps Cpk > 1.67 across our 42 five-axis grinders.",
  },
  {
    icon: FileCheck2,
    title: "Certificate of Conformance",
    body: "Every shipment includes CMM inspection report, material certification and CoC — no separate PPAP charge.",
  },
];

const standards = [
  { code: "ISO 9001:2015", label: "Quality Management" },
  { code: "ISO 14001", label: "Environmental Management" },
  { code: "IATF 16949", label: "Automotive (in progress)" },
  { code: "RoHS / REACH", label: "Material Compliance" },
  { code: "DIN 6535", label: "Shank Standards" },
  { code: "ANSI B94.50", label: "Cutting Tool Standards" },
];

export default function QualityPage() {
  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image src="/images/hero-quality.jpg" alt="Quality" fill sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Quality</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Quality Assurance
          </h1>
          <p className="mt-4 text-white/75 max-w-3xl">
            Precision is measured, not claimed. Every JIAYI tool passes through an ISO 9001
            certified workflow that leaves an auditable trail from raw carbide to your shop floor.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <SectionTitle
            eyebrow="Our Standards"
            title="Six Pillars of the JIAYI Quality System"
            subtitle="A repeatable, documented process — the reason global hydraulic and aerospace OEMs qualify us as an approved vendor."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-background p-7">
                <div className="h-12 w-12 rounded-md bg-surface grid place-items-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-charcoal">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-border">
        <div className="container-page">
          <SectionTitle
            eyebrow="Inspection Workflow"
            title="Five Gates Before a Tool Ships"
            subtitle="Nothing leaves the facility until it clears every gate. Records are archived for 7 years."
          />
          <div className="mt-12 grid md:grid-cols-5 gap-px bg-border border border-border">
            {[
              ["01", "Incoming Material", "Carbide hardness, grain size, heat certificate"],
              ["02", "First-Off Inspection", "CMM verification before batch release"],
              ["03", "In-Process SPC", "Runout, diameter, profile on every 10th piece"],
              ["04", "Final Optical Check", "Zoller 100% inspection + coating thickness"],
              ["05", "Packing & CoC", "Laser mark, foam pack, CoC generated"],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-background p-5">
                <div className="text-3xl font-black text-primary/20 tabular-nums">{n}</div>
                <div className="mt-3 text-sm font-semibold text-charcoal">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle
              eyebrow="Certifications"
              title="Standards We Work To"
              subtitle="JIAYI tools are engineered to internationally recognized standards."
            />
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {standards.map((s) => (
                <div
                  key={s.code}
                  className="flex items-start gap-3 rounded-md border border-border bg-background p-4"
                >
                  <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-charcoal">{s.code}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-border bg-surface overflow-hidden">
            <div className="aspect-video overflow-hidden relative">
              <Image src="/images/quality-inspection.jpg" alt="Quality inspection at JIAYI" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-8">
              <Boxes className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-2xl font-bold text-charcoal">
                What Ships With Every Order
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-charcoal">
                {[
                  "Certificate of Conformance (CoC)",
                  "CMM dimensional inspection report",
                  "Carbide substrate material certificate",
                  "Coating thickness & composition report",
                  "Laser-marked lot code for traceability",
                  "Individual foam-lined tool packaging",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Request Sample Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
