import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { FileDown, FileText, BookOpen, Ruler, ShieldCheck, ExternalLink } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Download Center — Catalogs & Technical Documents",
  description:
    "Download JIAYI product catalogs, technical datasheets, ISO certificates, CAD drawings, and application guides for precision carbide cutting tools.",
  alternates: { canonical: "/downloads" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

const DOWNLOAD_CATEGORIES = [
  {
    id: "catalogs",
    icon: BookOpen,
    title: "Product Catalogs",
    description: "Full product range catalogs in PDF format, suitable for offline reference.",
    items: [
      {
        title: "JIAYI Master Catalog 2025",
        description: "Complete catalog of all standard cutting tools — 200+ products with specifications, materials, coatings, and compatible hydraulic standards.",
        fileSize: "18.4 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/jiayi-master-catalog-2025-en.pdf",
      },
      {
        title: "Cavity & Port Tools Catalog",
        description: "Detailed catalog for hydraulic cavity tools and port tools — Sun Hydraulics, HydraForce, Parker Hannifin, Danfoss, and Bosch Rexroth compatible.",
        fileSize: "6.2 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/jiayi-cavity-port-tools-en.pdf",
      },
      {
        title: "Hole-Making & Reamer Catalog",
        description: "Drills, reamers, and boring tools for precision hole-making in hydraulic manifold and OEM component machining.",
        fileSize: "5.1 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/jiayi-hole-making-en.pdf",
      },
      {
        title: "Custom Tool Design Guide",
        description: "Engineering guide for requesting custom tool designs — drawing templates, specification form, and material selection chart.",
        fileSize: "2.8 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/jiayi-custom-tool-guide-en.pdf",
      },
    ],
  },
  {
    id: "technical",
    icon: Ruler,
    title: "Technical Documents",
    description: "Application guides, cutting parameter tables, and engineering reference material.",
    items: [
      {
        title: "Carbide Grade Selection Chart",
        description: "Cross-reference guide for selecting the correct carbide grade (K10–K40) based on workpiece material and cutting conditions.",
        fileSize: "0.9 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/carbide-grade-selection.pdf",
      },
      {
        title: "Coating Selection Guide",
        description: "Comparison of PVD/CVD coatings (TiAlN, AlTiN, TiCN, DLC, Diamond) with recommended application ranges and performance benchmarks.",
        fileSize: "1.4 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/coating-selection-guide.pdf",
      },
      {
        title: "Hydraulic Cavity Tool Application Notes",
        description: "Recommended cutting speeds, feeds, coolant strategies, and tolerancing guidance for hydraulic cavity machining.",
        fileSize: "1.1 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/cavity-tool-application-notes.pdf",
      },
      {
        title: "Tool Life Optimization Handbook",
        description: "Step-by-step methodology for diagnosing premature tool wear, optimizing cutting parameters, and improving cost-per-part.",
        fileSize: "2.2 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/tool-life-optimization.pdf",
      },
    ],
  },
  {
    id: "quality",
    icon: ShieldCheck,
    title: "Quality & Compliance",
    description: "Certificates, compliance declarations, and quality system documentation.",
    items: [
      {
        title: "ISO 9001:2015 Certificate",
        description: "JIAYI TOOL ISO 9001:2015 quality management system certificate, valid through 2026.",
        fileSize: "0.3 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/iso-9001-certificate.pdf",
      },
      {
        title: "RoHS Compliance Declaration",
        description: "Restriction of Hazardous Substances compliance declaration for all JIAYI cutting tools.",
        fileSize: "0.2 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/rohs-declaration.pdf",
      },
      {
        title: "REACH Compliance Statement",
        description: "REACH regulation compliance statement confirming absence of substances of very high concern (SVHC).",
        fileSize: "0.2 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/reach-compliance.pdf",
      },
    ],
  },
  {
    id: "forms",
    icon: FileText,
    title: "Order & Engineering Forms",
    description: "Templates and forms to speed up your procurement and custom tooling process.",
    items: [
      {
        title: "Custom Tool Specification Form",
        description: "Fill-in form for submitting custom tool requirements including geometry, substrate, coating, tolerances, and quantity.",
        fileSize: "0.4 MB",
        fileType: "PDF",
        lang: "EN",
        href: "/downloads/files/custom-tool-spec-form.pdf",
      },
      {
        title: "RFQ Template (Excel)",
        description: "Excel template for bulk quotation requests — list multiple tool codes, quantities, delivery addresses, and special requirements.",
        fileSize: "0.1 MB",
        fileType: "XLSX",
        lang: "EN",
        href: "/downloads/files/rfq-template.xlsx",
      },
    ],
  },
];

export default function DownloadsPage() {
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Download Center", url: `${SITE_URL}/downloads` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Hero */}
      <section className="border-b border-border bg-charcoal">
        <div className="container-page py-16">
          <div className="text-xs text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Download Center</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Download Center
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Product catalogs, technical documents, quality certificates, and engineering forms —
            everything you need to specify and order JIAYI precision cutting tools.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-4 flex flex-wrap gap-3">
          {DOWNLOAD_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider border border-border rounded px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.title}
            </a>
          ))}
        </div>
      </section>

      {/* Download sections */}
      <section className="py-16">
        <div className="container-page space-y-16">
          {DOWNLOAD_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id}>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-md bg-primary/10 grid place-items-center shrink-0">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-charcoal">{cat.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{cat.description}</p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.title}
                    className="border border-border rounded-md bg-background p-5 flex gap-4 hover:border-primary transition-colors group"
                  >
                    <div className="shrink-0 h-12 w-12 rounded bg-surface grid place-items-center border border-border">
                      <FileDown className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {item.fileType}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{item.lang}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">{item.fileSize}</span>
                        <a
                          href={item.href}
                          download
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                          <FileDown className="h-3.5 w-3.5" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Need a specific document CTA */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="container-page text-center max-w-2xl">
          <ExternalLink className="h-8 w-8 text-primary mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-charcoal">
            Can&apos;t find what you need?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Our engineering team can provide product-specific datasheets, custom CoC templates,
            and application notes on request.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Request a Document
          </Link>
        </div>
      </section>
    </>
  );
}
