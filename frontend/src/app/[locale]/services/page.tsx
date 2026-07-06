import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Cog, FileSearch, Truck, Wrench, Headphones, Microscope } from "lucide-react";
import { SectionTitle } from "@/components/site/SectionTitle";

export const metadata: Metadata = {
  title: "Services — Custom Tooling, OEM/ODM & Engineering Support",
  description:
    "Custom carbide tool manufacturing, OEM/ODM engineering, regrinding, technical consultation and global logistics for hydraulic OEMs.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    icon: Cog,
    title: "Custom Tool Manufacturing",
    body: "Send DWG, DXF or PDF drawings. We engineer, prototype and manufacture to your exact specifications with full dimensional inspection.",
  },
  {
    icon: FileSearch,
    title: "OEM / ODM Engineering",
    body: "Our application engineers collaborate on tool geometry, substrate and coating selection — from prototype to volume production.",
  },
  {
    icon: Wrench,
    title: "Tool Regrinding & Recoating",
    body: "Extend tool life with our regrinding service. Strip, regrind, recoat and re-inspect — typically 30–40% of new tool cost.",
  },
  {
    icon: Microscope,
    title: "Application Consultation",
    body: "Free machining parameter recommendations, tool life optimization and process troubleshooting from our senior engineers.",
  },
  {
    icon: Truck,
    title: "Global Logistics",
    body: "DDP shipping to 50+ countries, full export documentation, EXW/FOB/CIF terms and certificate of origin for every shipment.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Support",
    body: "Every customer is assigned a bilingual account engineer covering technical, commercial and logistical questions end-to-end.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative border-b border-border overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <img src="/images/hero-services.jpg" alt="Services" className="h-full w-full object-cover opacity-30" />
        </div>
        <div className="container-page py-20 relative">
          <div className="text-xs text-white/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Services
          </h1>
          <p className="mt-4 text-white/75 max-w-3xl">
            Beyond catalogue tools — JIAYI delivers end-to-end engineering and supply services
            tailored to OEM procurement teams.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background p-7">
              <div className="h-12 w-12 rounded-md bg-surface grid place-items-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-charcoal">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-border">
        <div className="container-page">
          <SectionTitle
            eyebrow="Workflow"
            title="From Drawing to Delivery"
            subtitle="A typical custom tool runs the following five-step engagement, all coordinated by a single account engineer."
          />
          <div className="mt-12 grid md:grid-cols-5 gap-px bg-border border border-border">
            {[
              ["01", "Drawing Receipt", "DWG / DXF / PDF accepted under NDA"],
              ["02", "Engineering Review", "Geometry, substrate, coating recommendations"],
              ["03", "Quotation", "Within 24 hours including lead time"],
              ["04", "Manufacturing", "Walter & Rollomatic 5-axis grinding"],
              ["05", "Inspection & Ship", "CMM report + DDP delivery"],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-background p-5">
                <div className="text-3xl font-black text-primary/20 tabular-nums">{n}</div>
                <div className="mt-3 text-sm font-semibold text-charcoal">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
