import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about JIAYI precision cutting tools: ordering, custom tooling, tolerances, coatings, lead times, and shipping.",
  alternates: { canonical: "/faq" },
};

const FAQ_CATEGORIES = [
  {
    category: "Products & Specifications",
    items: [
      {
        question: "What types of cutting tools does JIAYI manufacture?",
        answer:
          "JIAYI manufactures a full range of precision carbide cutting tools including cavity tools, port tools, reamers, drills, end mills, thread mills, gear cutting tools, and composite machining tools (PCD/PCBN). We also produce custom tools from customer drawings for hydraulic OEM and precision manufacturing applications.",
      },
      {
        question: "What materials are your tools made from?",
        answer:
          "Our tools are manufactured from tungsten carbide (K10–K40 grades), HSS-Co (M35/M42), PCD (polycrystalline diamond), PCBN (polycrystalline cubic boron nitride), and cermet substrates. The optimal substrate is selected based on your workpiece material and cutting parameters.",
      },
      {
        question: "What coatings do you offer?",
        answer:
          "We offer PVD and CVD coatings including TiAlN, AlTiN, TiCN, TiN, DLC (diamond-like carbon), and CVD diamond. Our in-house coating facility ensures batch consistency and eliminates third-party coating delays.",
      },
      {
        question: "What tolerance can you hold?",
        answer:
          "Standard catalog tools are manufactured to ±0.005 mm on critical dimensions including diameter, runout, and profile. Concentricity is held to under 0.003 mm. Tighter tolerances (±0.002 mm) are available for custom orders upon request.",
      },
      {
        question: "Are your cavity and port tools compatible with Sun Hydraulics / HydraForce / Parker?",
        answer:
          "Yes. Our cavity tools and port tools are engineered to be directly compatible with Sun Hydraulics T-series, HydraForce, Parker Hannifin, Danfoss, Bosch Rexroth, and Eaton Vickers cartridge valve standards. Each product page lists the compatible hydraulic standards.",
      },
    ],
  },
  {
    category: "Custom Tooling & OEM",
    items: [
      {
        question: "Can you manufacture tools from my drawings?",
        answer:
          "Yes. Send us your DWG, DXF, or PDF drawings and we will review them within 24 hours with a quote, recommended substrate/coating, and lead time. We sign mutual NDAs before any drawing review for sensitive geometries.",
      },
      {
        question: "What is the minimum order quantity (MOQ) for custom tools?",
        answer:
          "MOQ for custom tools is typically 10–20 pieces depending on the geometry complexity. For standard catalog items, there is no minimum order quantity. Contact our engineering team to discuss your specific volume requirements.",
      },
      {
        question: "How long does it take to develop a prototype?",
        answer:
          "Prototype lead time is typically 7–14 business days from drawing approval and deposit receipt. Complex multi-step tools or those requiring special substrates may take up to 21 days. We can expedite to 5 days for urgent requirements at a rush fee.",
      },
      {
        question: "Do you offer regrinding and recoating services?",
        answer:
          "Yes. We offer a full regrind, recoat, and re-inspect service for worn carbide tools. Turnaround is 5–7 business days after receipt. Typical cost is 30–40% of the new tool price. Minimum batch size is 5 tools of the same geometry.",
      },
    ],
  },
  {
    category: "Quality & Certification",
    items: [
      {
        question: "Is JIAYI ISO 9001 certified?",
        answer:
          "Yes. JIAYI is ISO 9001:2015 certified and audited annually. Our quality management system covers design, production, and after-sales processes. We also comply with ISO 14001 environmental management standards.",
      },
      {
        question: "What quality documentation ships with an order?",
        answer:
          "Every shipment includes a Certificate of Conformance (CoC), CMM dimensional inspection report, carbide substrate material certificate, coating thickness and composition report, and a laser-marked lot code for full traceability. No additional charge for PPAP documentation.",
      },
      {
        question: "Can I request PPAP documentation?",
        answer:
          "Yes. We provide PPAP Level 2 and Level 3 documentation at no additional charge for automotive and aerospace customers. Please specify your PPAP level requirement at time of order.",
      },
    ],
  },
  {
    category: "Ordering & Shipping",
    items: [
      {
        question: "How quickly can I get a quote?",
        answer:
          "Standard catalog items are quoted within 2–4 hours during business hours (Mon–Sat 09:00–18:00 CST). Custom tool quotes based on drawings are returned within 24 hours. Submit your request via the quote form or email engineering@jiayitool.com.",
      },
      {
        question: "What are your lead times for standard catalog tools?",
        answer:
          "Standard catalog tools are typically in stock or manufactured within 7–14 business days. High-volume or frequently ordered items are maintained in stock for 3–5 day dispatch. Custom tools typically require 14–21 business days.",
      },
      {
        question: "What shipping terms and countries do you ship to?",
        answer:
          "We ship to 50+ countries worldwide under EXW, FOB Shenzhen, CIF, and DDP terms. We handle full export documentation including commercial invoice, packing list, certificate of origin, and material declaration. DHL, FedEx, and UPS express are available for small orders.",
      },
      {
        question: "Do you accept payment in currencies other than USD?",
        answer:
          "We accept payment in USD, EUR, and CNY via T/T bank transfer, PayPal (orders under $2,000), and letter of credit (L/C) for large orders. All invoices are issued in USD by default unless otherwise agreed.",
      },
    ],
  },
];

// Flatten all items for JSON-LD
const allFaqItems = FAQ_CATEGORIES.flatMap((cat) => cat.items);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

export default function FaqPage() {
  const jsonLdFaq = faqSchema(allFaqItems);
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "FAQ", url: `${SITE_URL}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Hero */}
      <section className="border-b border-border bg-charcoal">
        <div className="container-page py-16 relative">
          <div className="text-xs text-white/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">FAQ</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Everything you need to know about our products, custom tooling process, quality standards,
            and global shipping.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container-page max-w-4xl">
          {/* Quick jump links */}
          <div className="mb-12 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/[\s&/]+/g, "-")}`}
                className="text-xs font-semibold uppercase tracking-wider border border-border rounded px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {cat.category}
              </a>
            ))}
          </div>

          <div className="space-y-14">
            {FAQ_CATEGORIES.map((cat) => (
              <div
                key={cat.category}
                id={cat.category.toLowerCase().replace(/[\s&/]+/g, "-")}
              >
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                  {cat.category}
                </h2>

                <div className="divide-y divide-border border border-border rounded-md overflow-hidden">
                  {cat.items.map((item, idx) => (
                    <details key={idx} className="group bg-background">
                      <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 list-none">
                        <span className="text-sm font-semibold text-charcoal group-open:text-primary transition-colors">
                          {item.question}
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 border border-border rounded-md p-8 bg-surface text-center">
            <h2 className="text-lg font-bold text-charcoal">Still have a question?</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Our engineering team responds within 24 hours on business days.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-md border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
