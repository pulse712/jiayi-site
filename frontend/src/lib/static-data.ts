/**
 * Static fallback data — used when Strapi API is not reachable.
 * Once Strapi is populated, these are only used as emergency fallback.
 */

import type {
  CategoryAttributes,
  IndustryAttributes,
  ProductAttributes,
  BlogPostAttributes,
} from "@/types/strapi";

// ─────────────────────────────────────────────
// Product Categories
// ─────────────────────────────────────────────
export const categories: CategoryAttributes[] = [];

export const compatStandards = [
  "SAE J1926", "ISO 6149", "Sun Hydraulics", "HydraForce",
  "Parker", "Danfoss", "Bosch Rexroth", "Eaton",
];

export function sampleProducts(_categorySlug: string): ProductAttributes[] {
  return [];
}

// ─────────────────────────────────────────────
// Industries
// ─────────────────────────────────────────────
export const industries: IndustryAttributes[] = [
  {
    id: 1,
    slug: "aerospace",
    name: "Aerospace & Aviation",
    category: "milling",
    image: null,
    desc: "Titanium and Inconel structural components, turbine housings and hydraulic actuation systems.",
    details:
      "From single-crystal turbine blade roots to large-frame fuselage ribs, JIAYI tooling holds tight tolerances in heat-resistant superalloys (Inconel 718, Waspaloy) and Ti-6Al-4V.",
    applications: [
      "Turbine blade & disc machining",
      "Structural pocketing in Ti-6Al-4V",
      "Landing gear actuators",
      "Engine casing port-tools",
    ],
  },
  {
    id: 2,
    slug: "automotive",
    name: "Automotive Manufacturing",
    category: "hole-making",
    image: null,
    desc: "Powertrain, transmission housings and high-volume valve body machining.",
    details:
      "High-volume automotive lines demand predictable cycle times and minimal tool changes. JIAYI's coated carbide drills, step tools and combination cutters are validated on transfer lines for cast-iron blocks, aluminium heads and steel transmission components.",
    applications: [
      "Engine block & cylinder heads",
      "EV motor housings",
      "Transmission valve bodies",
      "Brake calipers & steering knuckles",
    ],
  },
  {
    id: 3,
    slug: "medical",
    name: "Medical Devices",
    category: "milling",
    image: null,
    desc: "Surgical instruments, implants and precision micro components in titanium and stainless.",
    details:
      "Medical machining requires burr-free surfaces, biocompatible materials and micro-geometry control. JIAYI micro end mills and Swiss-type tools handle Ti-6Al-4V ELI, CoCrMo, PEEK and 17-4PH stainless.",
    applications: [
      "Orthopaedic & spinal implants",
      "Dental abutments",
      "Surgical instrument tips",
      "Bone screws & plates",
    ],
  },
  {
    id: 4,
    slug: "hydraulics",
    name: "Hydraulics & Fluid Power",
    category: "cavity-tools",
    image: null,
    desc: "Cartridge valve cavities, manifold ports and custom hydraulic form tools.",
    details:
      "JIAYI is a recognised specialist in hydraulic cavity, port and form tooling. We machine and supply cavity tools matched to Sun Hydraulics, HydraForce, Parker, Bosch Rexroth, Eaton and Danfoss standards.",
    applications: [
      "Cartridge valve cavities",
      "SAE / ISO port machining",
      "Manifold block production",
      "Custom form tools",
    ],
  },
  {
    id: 5,
    slug: "energy",
    name: "Power & Energy",
    category: "threading",
    image: null,
    desc: "Wind turbine gearboxes, oil & gas tooling and downhole threaded connections.",
    details:
      "Energy-sector parts run large, heavy and expensive — a failed tool can scrap a six-figure forging. JIAYI deep-hole drills, indexable threading inserts and API thread tooling are engineered for wind gearbox shafts and downhole tubulars.",
    applications: [
      "Wind turbine main shafts & gearboxes",
      "API / OCTG threading",
      "Oil & gas valve bodies",
      "Hydro & nuclear components",
    ],
  },
  {
    id: 6,
    slug: "electronics",
    name: "Electronics & Semiconductors",
    category: "composite-machining",
    image: null,
    desc: "PCB routing, micro-machining and ceramic substrate processing.",
    details:
      "Electronics manufacturing pushes diameters down to 0.1 mm and demands chatter-free cuts in copper-clad laminate, aluminium nitride, alumina and CFRP.",
    applications: [
      "PCB routing & depaneling",
      "Ceramic substrate machining",
      "Heat sink finishing",
      "Semiconductor jigs & fixtures",
    ],
  },
  {
    id: 7,
    slug: "shipbuilding",
    name: "Shipbuilding",
    category: "gear",
    image: null,
    desc: "Marine gearboxes, propulsion components and large diameter hydraulic systems.",
    details:
      "Marine propulsion and deck machinery rely on large gears, heavy shafts and oversized hydraulic manifolds. JIAYI supplies gear cutters, large-diameter cavity tools and deep-hole drills sized for marine gearbox cases.",
    applications: [
      "Marine gearbox cases",
      "Propulsion shafting",
      "Rudder & steering hydraulics",
      "Deck winch manifolds",
    ],
  },
  {
    id: 8,
    slug: "rail",
    name: "Rail Transit",
    category: "port-tools",
    image: null,
    desc: "Brake systems, bogie hydraulics and rolling stock manifold port machining.",
    details:
      "Rolling stock combines safety-critical brake hydraulics with high-volume bogie and coupler production. JIAYI port tools, cavity cutters and indexable drills are deployed across high-speed rail, metro and freight programmes.",
    applications: [
      "Brake control manifolds",
      "Bogie hydraulic blocks",
      "Coupler & draft gear machining",
      "Suspension actuators",
    ],
  },
];

// ─────────────────────────────────────────────
// Blog Posts (static fallback)
// ─────────────────────────────────────────────
export const posts: BlogPostAttributes[] = [
  {
    id: 1,
    slug: "cavity-tool-sun-hydraulics-t-series",
    title: "Selecting the Right Cavity Tool for Sun Hydraulics T-Series Cartridges",
    date: "October 14, 2025",
    category: "Application Notes",
    image: null,
    author: "JIAYI Engineering Team",
    readTime: "6 min read",
    tags: ["Sun Hydraulics", "Cavity Tools", "Cartridge Valves", "Manifolds"],
    excerpt:
      "A practical guide to matching cavity geometry, substrate and coating for the most common Sun Hydraulics T-series cartridge valves.",
    content: [
      {
        heading: "Why cavity geometry matters",
        body: "Sun Hydraulics T-series cavities are tightly toleranced, and a single deviation in step diameter or shoulder height can cost the OEM a costly rework cycle. JIAYI tools are ground to ±0.005 mm against the master gauge for every batch.",
      },
      {
        heading: "Cavity reference chart",
        body: "Use this quick lookup to pair the most common Sun T-series cavities with the JIAYI tool family and recommended substrate.",
        table: {
          headers: ["Cavity", "Nominal Ø", "Tool Family", "Recommended Substrate"],
          rows: [
            ["T-2A", "9.53 mm", "JY-CAV-T2A", "K20 sub-micron"],
            ["T-10A", "19.05 mm", "JY-CAV-T10A", "K20 sub-micron"],
            ["T-11A", "22.23 mm", "JY-CAV-T11A", "K30 reinforced"],
            ["T-17A", "31.75 mm", "JY-CAV-T17A", "K30 reinforced"],
          ],
        },
      },
      {
        heading: "Coating recommendations",
        body: "Coating choice should follow the workpiece, not the cavity size.",
        bullets: [
          "Steel and ductile iron: AlTiN at 80–120 m/min cutting speed.",
          "Aluminum manifolds: uncoated polished or DLC — never AlTiN.",
          "Stainless 316L: AlCrN with high-pressure coolant.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "pcd-vs-carbide-composite-machining",
    title: "PCD vs. Carbide: When to Specify Diamond Tools for Composite Machining",
    date: "September 22, 2025",
    category: "Materials",
    image: null,
    author: "Dr. Liang Chen, Head of R&D",
    readTime: "8 min read",
    tags: ["PCD", "Composites", "CFRP", "Tool Life"],
    excerpt:
      "Tool life economics and quality comparison for PCD versus coated carbide when machining CFRP and GFRP stacks.",
    content: [
      {
        heading: "The economic crossover point",
        body: "PCD tools cost 8–12× more than coated carbide upfront, but in CFRP machining they routinely deliver 60–80× the tool life. The break-even typically lands around 200 holes for drilling.",
      },
      {
        heading: "Head-to-head wear data (CFRP, 4 mm Ø drill)",
        body: "Production trial across three shops, identical fixtures, identical feeds.",
        table: {
          headers: ["Tool", "Holes to wear limit", "Delamination index", "Cost per 1000 holes"],
          rows: [
            ["Coated carbide", "180", "2.4", "US$ 142"],
            ["PCD brazed tip", "14,500", "0.6", "US$ 38"],
            ["PCD veined", "22,000", "0.5", "US$ 31"],
          ],
        },
      },
    ],
  },
  {
    id: 3,
    slug: "port-tooling-sae-j1926-vs-iso-6149",
    title: "Port Tooling Compliance: SAE J1926 vs. ISO 6149 — A Practical Comparison",
    date: "August 30, 2025",
    category: "Standards",
    image: null,
    author: "JIAYI Engineering Team",
    readTime: "7 min read",
    tags: ["SAE J1926", "ISO 6149", "Hydraulic Ports", "Standards"],
    excerpt:
      "Side-by-side dimensional comparison of the two dominant hydraulic port standards and what it means for tool selection.",
    content: [
      {
        heading: "Two standards, one cavity family",
        body: "SAE J1926 and ISO 6149 share a common ancestry but diverge in thread form, spotface diameter and sealing geometry. A single port tool cannot reliably produce both.",
        table: {
          headers: ["Feature", "SAE J1926", "ISO 6149"],
          rows: [
            ["Thread form", "UN/UNF inch", "Metric, 60° flank"],
            ["Sealing", "O-ring on shoulder", "O-ring in deeper counterbore"],
            ["Spotface tolerance", "+0.25 / 0", "+0.10 / 0"],
            ["Typical region", "North America", "EU, China, Japan"],
          ],
        },
      },
    ],
  },
  {
    id: 4,
    slug: "manifold-drilling-cycle-time-reduction",
    title: "Reducing Cycle Time on Hydraulic Manifold Drilling Operations",
    date: "July 18, 2025",
    category: "Productivity",
    image: null,
    author: "Marco Rossi, Applications Engineer",
    readTime: "5 min read",
    tags: ["Case Study", "Cycle Time", "Manifolds", "Drilling"],
    excerpt:
      "Real-world case study showing 28% cycle time reduction through tool geometry optimization on a tier-1 valve body line.",
    content: [
      {
        heading: "Before vs. after",
        body: "Six-week production trial on the same fixture and machine.",
        table: {
          headers: ["Metric", "Baseline", "Optimized", "Δ"],
          rows: [
            ["Cycle time per hole", "6.4 s", "4.6 s", "−28%"],
            ["Tool life (holes)", "380", "410", "+8%"],
            ["Surface finish (Ra)", "1.6 µm", "1.0 µm", "−38%"],
            ["Annualized savings", "—", "US$ 84,000", "—"],
          ],
        },
      },
    ],
  },
  {
    id: 5,
    slug: "altin-vs-tialn-stainless-steel",
    title: "AlTiN vs. TiAlN Coatings: Which Performs Better in Stainless Steel?",
    date: "June 5, 2025",
    category: "Coatings",
    image: null,
    author: "Dr. Liang Chen, Head of R&D",
    readTime: "6 min read",
    tags: ["AlTiN", "TiAlN", "Coatings", "Stainless Steel"],
    excerpt:
      "Comparative wear data from a six-month production trial across multiple stainless grades and machining conditions.",
    content: [
      {
        heading: "Trial results across stainless grades",
        body: "14,000 minutes of cutting time, identical end mills, same coolant.",
        table: {
          headers: ["Material", "Speed", "Best coating", "Tool life uplift"],
          rows: [
            ["304", "120 m/min", "AlTiN", "+35%"],
            ["316L", "100 m/min", "AlTiN", "+28%"],
            ["17-4 PH (H1025)", "80 m/min", "TiAlN", "+12%"],
            ["410 martensitic", "70 m/min", "TiAlN", "+18%"],
          ],
        },
      },
    ],
  },
  {
    id: 6,
    slug: "threading-inconel-718-guide",
    title: "Threading Inconel 718: Tool Recommendations and Parameter Guide",
    date: "May 11, 2025",
    category: "Aerospace",
    image: null,
    author: "JIAYI Aerospace Group",
    readTime: "9 min read",
    tags: ["Inconel 718", "Threading", "Aerospace", "Thread Milling"],
    excerpt:
      "Specific tool geometry, coating and cutting parameter recommendations for threading Inconel 718 in aerospace applications.",
    content: [
      {
        heading: "Parameter starting points",
        body: "Conservative starting parameters for solid carbide thread mills, 6–12 mm diameter.",
        table: {
          headers: ["Pitch", "Cutting speed", "Radial DOC / pass", "Coolant"],
          rows: [
            ["M6 × 1.0", "40 m/min", "0.08 mm", "70 bar through-tool"],
            ["M10 × 1.5", "38 m/min", "0.10 mm", "70 bar through-tool"],
            ["M16 × 2.0", "35 m/min", "0.10 mm", "70 bar through-tool"],
          ],
        },
      },
    ],
  },
];
