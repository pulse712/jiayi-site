/**
 * Seed: Blog Posts
 */
const posts = [
  {
    title: "Selecting the Right Cavity Tool for Sun Hydraulics T-Series Cartridges",
    slug: "cavity-tool-sun-hydraulics-t-series",
    excerpt:
      "A practical guide to matching cavity geometry, substrate and coating for the most common Sun Hydraulics T-series cartridge valves.",
    date: "2025-10-14",
    category: "Application Notes",
    author: "JIAYI Engineering Team",
    readTime: "6 min read",
    tags: ["Sun Hydraulics", "Cavity Tools", "Cartridge Valves", "Manifolds"],
    content: [
      {
        heading: "Why cavity geometry matters",
        body: "Sun Hydraulics T-series cavities are tightly toleranced. JIAYI tools are ground to ±0.005 mm against the master gauge for every batch.",
      },
      {
        heading: "Cavity reference chart",
        body: "Use this quick lookup to pair the most common Sun T-series cavities with the JIAYI tool family.",
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
    title: "PCD vs. Carbide: When to Specify Diamond Tools for Composite Machining",
    slug: "pcd-vs-carbide-composite-machining",
    excerpt:
      "Tool life economics and quality comparison for PCD versus coated carbide when machining CFRP and GFRP stacks.",
    date: "2025-09-22",
    category: "Materials",
    author: "Dr. Liang Chen, Head of R&D",
    readTime: "8 min read",
    tags: ["PCD", "Composites", "CFRP", "Tool Life"],
    content: [
      {
        heading: "The economic crossover point",
        body: "PCD tools cost 8–12× more upfront, but deliver 60–80× the tool life in CFRP. Break-even is around 200 holes.",
      },
      {
        heading: "Head-to-head wear data (CFRP, 4 mm Ø drill)",
        body: "Production trial across three shops, identical fixtures and feeds.",
        table: {
          headers: ["Tool", "Holes to wear limit", "Delamination index", "Cost per 1000 holes"],
          rows: [
            ["Coated carbide", "180", "2.4", "US$ 142"],
            ["PCD brazed tip", "14,500", "0.6", "US$ 38"],
            ["PCD veined", "22,000", "0.5", "US$ 31"],
          ],
        },
      },
      {
        heading: "When carbide still wins",
        body: "PCD is not always the right call:",
        bullets: [
          "Prototype runs under 100 parts — capital cost dominates.",
          "Mixed stacks containing titanium — diamond reacts with Ti at temperature.",
          "Frequent geometry changes — carbide regrinds cheaply.",
        ],
      },
    ],
  },
  {
    title: "Port Tooling Compliance: SAE J1926 vs. ISO 6149 — A Practical Comparison",
    slug: "port-tooling-sae-j1926-vs-iso-6149",
    excerpt:
      "Side-by-side dimensional comparison of the two dominant hydraulic port standards and what it means for tool selection.",
    date: "2025-08-30",
    category: "Standards",
    author: "JIAYI Engineering Team",
    readTime: "7 min read",
    tags: ["SAE J1926", "ISO 6149", "Hydraulic Ports", "Standards"],
    content: [
      {
        heading: "Two standards, one cavity family",
        body: "SAE J1926 and ISO 6149 share a common ancestry but diverge in thread form, spotface diameter and sealing geometry.",
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
      {
        heading: "Common floor-level mistakes",
        body: "We see the same three failure modes during audits:",
        bullets: [
          "Mixing SAE and ISO tools in the same carousel without color coding.",
          "Reusing a worn ISO tool to 'rough' an SAE port — leaves an out-of-spec spotface.",
          "Substituting a metric tap for an ISO 6149 port form tool.",
        ],
      },
    ],
  },
  {
    title: "Reducing Cycle Time on Hydraulic Manifold Drilling Operations",
    slug: "manifold-drilling-cycle-time-reduction",
    excerpt:
      "Real-world case study showing 28% cycle time reduction through tool geometry optimization on a tier-1 valve body line.",
    date: "2025-07-18",
    category: "Productivity",
    author: "Marco Rossi, Applications Engineer",
    readTime: "5 min read",
    tags: ["Case Study", "Cycle Time", "Manifolds", "Drilling"],
    content: [
      {
        heading: "Before vs. after",
        body: "Six-week production trial, same fixture and machine.",
        table: {
          headers: ["Metric", "Baseline", "Optimized", "Δ"],
          rows: [
            ["Cycle time per hole", "6.4 s", "4.6 s", "−28%"],
            ["Tool life (holes)", "380", "410", "+8%"],
            ["Surface finish (Ra)", "1.6 µm", "1.0 µm", "−38%"],
            ["Annualized savings", "—", "US$ 84,000", "—"],
          ],
        },
        quote:
          "The deburring station downstream was removed entirely. That alone paid for the tool program in eight weeks.",
      },
    ],
  },
  {
    title: "AlTiN vs. TiAlN Coatings: Which Performs Better in Stainless Steel?",
    slug: "altin-vs-tialn-stainless-steel",
    excerpt:
      "Comparative wear data from a six-month production trial across multiple stainless grades.",
    date: "2025-06-05",
    category: "Coatings",
    author: "Dr. Liang Chen, Head of R&D",
    readTime: "6 min read",
    tags: ["AlTiN", "TiAlN", "Coatings", "Stainless Steel"],
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
    title: "Threading Inconel 718: Tool Recommendations and Parameter Guide",
    slug: "threading-inconel-718-guide",
    excerpt:
      "Specific tool geometry, coating and cutting parameter recommendations for threading Inconel 718 in aerospace applications.",
    date: "2025-05-11",
    category: "Aerospace",
    author: "JIAYI Aerospace Group",
    readTime: "9 min read",
    tags: ["Inconel 718", "Threading", "Aerospace", "Thread Milling"],
    content: [
      {
        heading: "Why Inconel 718 is hard to thread",
        body: "Inconel 718 work-hardens aggressively, holds heat at the cutting zone, and welds to most tool substrates.",
      },
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
        quote: "On Inconel, tool change discipline is the cheapest insurance you can buy.",
      },
    ],
  },
];

export async function seed(strapi: any) {
  for (const post of posts) {
    const existing = await strapi
      .query("api::blog-post.blog-post")
      .findOne({ where: { slug: post.slug } });

    if (!existing) {
      await strapi.query("api::blog-post.blog-post").create({ data: post });
      console.log(`  ✅ Created post: ${post.title}`);
    } else {
      console.log(`  ⏭  Post already exists: ${post.title}`);
    }
  }
}
