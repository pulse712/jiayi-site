/**
 * Seed: Product Categories
 * Run with: npm run strapi -- seed:run --file database/seeds/01-categories.ts
 */
const categories = [
  {
    name: "Hole Making Tools",
    slug: "hole-making",
    short: "Drills, reamers and boring tools for precision hole production.",
    description:
      "Solid carbide drills, indexable drills, reamers and boring bars engineered for tight tolerance hole production in hydraulic manifolds and valve bodies.",
    count: 124,
    sortOrder: 1,
  },
  {
    name: "Cavity Tools",
    slug: "cavity-tools",
    short: "SAE / ISO cavity form tools for hydraulic cartridge valves.",
    description:
      "Complete range of cavity form tools compatible with Sun Hydraulics, HydraForce, Parker and Bosch Rexroth cartridge valve standards.",
    count: 96,
    sortOrder: 2,
  },
  {
    name: "Composite Material Machining",
    slug: "composite-machining",
    short: "PCD and diamond coated tools for CFRP and abrasive composites.",
    description:
      "PCD tipped and diamond coated tools designed for clean, delamination-free machining of carbon fiber, GFRP and other composite stacks.",
    count: 48,
    sortOrder: 3,
  },
  {
    name: "Milling Cutters",
    slug: "milling",
    short: "End mills, face mills and form cutters in carbide and HSS.",
    description:
      "High performance milling cutters with TiAlN and AlTiN coatings for steel, stainless and superalloy machining.",
    count: 152,
    sortOrder: 4,
  },
  {
    name: "Port Tools",
    slug: "port-tools",
    short: "Port contour tools per SAE J1926, ISO 6149, BSPP and metric.",
    description:
      "Single-pass port tools producing complete port form, chamfer and thread relief in one operation.",
    count: 84,
    sortOrder: 5,
  },
  {
    name: "Threading Tools",
    slug: "threading",
    short: "Taps, thread mills and indexable threading inserts.",
    description:
      "Complete threading program including taps, solid carbide thread mills and indexable inserts for UN, metric, NPT and BSPP threads.",
    count: 110,
    sortOrder: 6,
  },
  {
    name: "Gear Tools",
    slug: "gear",
    short: "Hobs, shapers and form tools for gear and spline production.",
    description:
      "Precision gear cutting tools including hobs, shaper cutters and form milling cutters for spur, helical and spline applications.",
    count: 62,
    sortOrder: 7,
  },
];

export async function seed(strapi: any) {
  for (const cat of categories) {
    const existing = await strapi
      .query("api::category.category")
      .findOne({ where: { slug: cat.slug } });

    if (!existing) {
      await strapi.query("api::category.category").create({ data: cat });
      console.log(`  ✅ Created category: ${cat.name}`);
    } else {
      console.log(`  ⏭  Category already exists: ${cat.name}`);
    }
  }
}
