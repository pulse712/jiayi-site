import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Building2, Wrench, TrendingUp } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies — Real-World Applications",
  description:
    "How global OEM manufacturers use JIAYI precision cutting tools to improve tool life, reduce cycle times, and lower cost-per-part in hydraulic and precision machining.",
  alternates: { canonical: "/case-studies" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

const CASE_STUDIES = [
  {
    slug: "sun-hydraulics-cavity-tools",
    industry: "Hydraulics",
    client: "Major Hydraulic OEM — USA",
    title: "Sun Hydraulics T-Series Cavity Tools: 3× Tool Life Improvement",
    challenge:
      "A leading US hydraulic manifold manufacturer was replacing imported cavity tools every 150 pieces due to premature edge chipping on D03 and D05 body bores machined in 316 stainless steel. Total tool cost was exceeding $12 per manifold.",
    solution:
      "JIAYI engineered a custom K20 submicron carbide cavity tool with a 0.2 µm Ra edge prep and AlTiN-X coating. Geometry was optimized for interrupted cuts typical in manifold porting with a 12° positive rake and reinforced corner radius.",
    results: [
      "Tool life increased from 150 to 480 pieces — 3.2× improvement",
      "Tool cost per manifold reduced from $12.00 to $3.80",
      "Surface finish improved from Ra 1.6 to Ra 0.8 µm",
      "No process changes required — drop-in replacement",
    ],
    category: "Cavity Tools",
    products: ["JY-T12-D03-K20", "JY-T12-D05-K20"],
    image: "/images/case-hydraulics.jpg",
  },
  {
    slug: "aerospace-reamer-titanium",
    industry: "Aerospace",
    client: "Tier-1 Aerospace Supplier — Germany",
    title: "PCD Reamer for Ti-6Al-4V Structural Components: 60% Cycle Time Reduction",
    challenge:
      "A German aerospace tier-1 was machining precision holes in Ti-6Al-4V wing rib components. Their existing HSS-Co reamers required 3 passes at 8 m/min to achieve H7 tolerance, resulting in 4.2-minute cycle time per hole and frequent regrinding.",
    solution:
      "JIAYI developed a 6-flute PCD reamer with 15° helix, polished flutes, and diamond-coated margins. The tool was qualified to aerospace PPAP Level 2 with full dimensional traceability.",
    results: [
      "Cycle time reduced from 4.2 to 1.7 minutes per hole — 60% reduction",
      "Cutting speed increased from 8 to 25 m/min",
      "Tool life: 2,200 holes vs 380 holes for HSS-Co",
      "PPAP approved on first submission",
    ],
    category: "Reamers",
    products: ["JY-PCD-R12-6F"],
    image: "/images/case-aerospace.jpg",
  },
  {
    slug: "medical-device-carbide-drill",
    industry: "Medical",
    client: "Medical Device Manufacturer — Switzerland",
    title: "Micro Carbide Drills for Surgical Instrument Components",
    challenge:
      "A Swiss medical device OEM required ⌀0.8 mm through-holes in 17-4PH stainless steel bone screw components to ±0.005 mm positional tolerance. Breakage rates with existing tools were 12%, causing significant scrap and downtime.",
    solution:
      "JIAYI produced K10 submicron carbide micro drills with a 130° split-point geometry, TiCN coating, and polished flutes. Specialized packaging with individual foam inserts prevented edge damage in transit.",
    results: [
      "Breakage rate reduced from 12% to under 0.5%",
      "Positional tolerance consistently within ±0.003 mm",
      "Tool life: 800 holes per drill vs 220 previously",
      "Scrap rate on component reduced by 94%",
    ],
    category: "Drills",
    products: ["JY-MD-0.8-K10"],
    image: "/images/case-medical.jpg",
  },
  {
    slug: "automotive-thread-milling",
    industry: "Automotive",
    client: "Tier-2 Automotive Supplier — Mexico",
    title: "Thread Milling vs Tapping: 40% Cost Savings on Transmission Housing",
    challenge:
      "A Mexican automotive supplier was producing M10×1.5 threaded ports in AlSi9Cu3 transmission housings. Tapping tool breakage inside cast threads was causing 8% scrap rate and frequent spindle crashes.",
    solution:
      "JIAYI designed a 3-flute solid carbide thread mill with K20 substrate, TiAlN coating, and helical flute for chip evacuation. A single-pass thread milling cycle replaced tapping, eliminating breakage risk entirely.",
    results: [
      "Scrap rate reduced from 8% to 0.2%",
      "Eliminated spindle crash risk — no tool breakage possible",
      "Cost per thread reduced by 40% including tooling amortization",
      "Same thread mill handles M8, M10, and M12 with program change only",
    ],
    category: "Thread Mills",
    products: ["JY-TM-3F-K20"],
    image: "/images/case-automotive.jpg",
  },
];

const INDUSTRY_COLORS: Record<string, string> = {
  Hydraulics: "bg-blue-50 text-blue-700 border-blue-200",
  Aerospace: "bg-purple-50 text-purple-700 border-purple-200",
  Medical: "bg-green-50 text-green-700 border-green-200",
  Automotive: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function CaseStudiesPage() {
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Case Studies", url: `${SITE_URL}/case-studies` },
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
            <span className="text-white/80">Case Studies</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
            Case Studies
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Real results from real manufacturers — documented improvements in tool life, cycle
            time, and cost-per-part across hydraulics, aerospace, medical, and automotive applications.
          </p>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Building2, value: "50+", label: "Countries Served" },
            { icon: Wrench, value: "200+", label: "Custom Tool Projects" },
            { icon: TrendingUp, value: "3×", label: "Avg. Tool Life Gain" },
            { icon: TrendingUp, value: "40%", label: "Avg. Cost Reduction" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded bg-primary/10 grid place-items-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-charcoal">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case study list */}
      <section className="py-16">
        <div className="container-page space-y-10">
          {CASE_STUDIES.map((cs, i) => (
            <article
              key={cs.slug}
              id={cs.slug}
              className={`grid lg:grid-cols-[1fr_1.5fr] gap-10 items-start border border-border rounded-md overflow-hidden bg-background ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              {/* Image / industry badge side */}
              <div className="relative min-h-[240px] bg-charcoal overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="relative h-full flex flex-col items-start justify-between p-8">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      INDUSTRY_COLORS[cs.industry] ?? "bg-surface text-charcoal border-border"
                    }`}
                  >
                    {cs.industry}
                  </span>
                  <div>
                    <div className="text-xs text-white/60 font-mono mb-2">{cs.client}</div>
                    <div className="text-2xl font-black text-white/10 uppercase font-display leading-none">
                      {cs.industry}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                  {cs.category}
                </div>
                <h2 className="text-xl font-bold text-charcoal leading-snug">{cs.title}</h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Challenge
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Solution
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Results
                    </div>
                    <ul className="space-y-1.5">
                      {cs.results.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-sm text-charcoal">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={{ pathname: "/quote", query: { product: cs.products[0] } }}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Request Similar Solution <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Discuss Your Application
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal">
        <div className="container-page text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white">
            Have a similar application?
          </h2>
          <p className="mt-4 text-white/70">
            Share your workpiece material, tolerances, and volume requirements. Our engineering
            team will recommend the optimal tool and provide a documented improvement estimate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Submit Application Details <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-7 py-3.5 text-sm font-bold text-white hover:border-white transition-colors"
            >
              Talk to an Engineer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
