/**
 * Seed: Industries
 */
const industries = [
  {
    name: "Aerospace & Aviation",
    slug: "aerospace",
    desc: "Titanium and Inconel structural components, turbine housings and hydraulic actuation systems.",
    details:
      "From single-crystal turbine blade roots to large-frame fuselage ribs, JIAYI tooling holds tight tolerances in heat-resistant superalloys (Inconel 718, Waspaloy) and Ti-6Al-4V.",
    applications: [
      "Turbine blade & disc machining",
      "Structural pocketing in Ti-6Al-4V",
      "Landing gear actuators",
      "Engine casing port-tools",
    ],
    category: "milling",
    sortOrder: 1,
  },
  {
    name: "Automotive Manufacturing",
    slug: "automotive",
    desc: "Powertrain, transmission housings and high-volume valve body machining.",
    details:
      "High-volume automotive lines demand predictable cycle times. JIAYI's coated carbide drills, step tools and combination cutters are validated on transfer lines for cast-iron blocks, aluminium heads and EV motor housings.",
    applications: [
      "Engine block & cylinder heads",
      "EV motor housings",
      "Transmission valve bodies",
      "Brake calipers & steering knuckles",
    ],
    category: "hole-making",
    sortOrder: 2,
  },
  {
    name: "Medical Devices",
    slug: "medical",
    desc: "Surgical instruments, implants and precision micro components in titanium and stainless.",
    details:
      "JIAYI micro end mills and Swiss-type tools handle Ti-6Al-4V ELI, CoCrMo, PEEK and 17-4PH stainless for orthopaedic implants, dental abutments and minimally invasive instruments.",
    applications: [
      "Orthopaedic & spinal implants",
      "Dental abutments",
      "Surgical instrument tips",
      "Bone screws & plates",
    ],
    category: "milling",
    sortOrder: 3,
  },
  {
    name: "Hydraulics & Fluid Power",
    slug: "hydraulics",
    desc: "Cartridge valve cavities, manifold ports and custom hydraulic form tools.",
    details:
      "JIAYI is a recognised specialist in hydraulic cavity, port and form tooling — Sun Hydraulics, HydraForce, Parker, Bosch Rexroth, Eaton and Danfoss standards.",
    applications: [
      "Cartridge valve cavities",
      "SAE / ISO port machining",
      "Manifold block production",
      "Custom form tools",
    ],
    category: "cavity-tools",
    sortOrder: 4,
  },
  {
    name: "Power & Energy",
    slug: "energy",
    desc: "Wind turbine gearboxes, oil & gas tooling and downhole threaded connections.",
    details:
      "JIAYI deep-hole drills, indexable threading inserts and API thread tooling are engineered for wind gearbox shafts, downhole tubulars, valve bodies and nuclear / hydro components.",
    applications: [
      "Wind turbine main shafts & gearboxes",
      "API / OCTG threading",
      "Oil & gas valve bodies",
      "Hydro & nuclear components",
    ],
    category: "threading",
    sortOrder: 5,
  },
  {
    name: "Electronics & Semiconductors",
    slug: "electronics",
    desc: "PCB routing, micro-machining and ceramic substrate processing.",
    details:
      "JIAYI micro routers, diamond-coated end mills and PCD tooling support PCB depaneling, semiconductor jig machining and heat-sink production.",
    applications: [
      "PCB routing & depaneling",
      "Ceramic substrate machining",
      "Heat sink finishing",
      "Semiconductor jigs & fixtures",
    ],
    category: "composite-machining",
    sortOrder: 6,
  },
  {
    name: "Shipbuilding",
    slug: "shipbuilding",
    desc: "Marine gearboxes, propulsion components and large diameter hydraulic systems.",
    details:
      "JIAYI supplies gear cutters, large-diameter cavity tools and deep-hole drills sized for marine gearbox cases, rudder actuators and winch hydraulics.",
    applications: [
      "Marine gearbox cases",
      "Propulsion shafting",
      "Rudder & steering hydraulics",
      "Deck winch manifolds",
    ],
    category: "gear",
    sortOrder: 7,
  },
  {
    name: "Rail Transit",
    slug: "rail",
    desc: "Brake systems, bogie hydraulics and rolling stock manifold port machining.",
    details:
      "JIAYI port tools, cavity cutters and indexable drills are deployed across high-speed rail, metro and freight programmes.",
    applications: [
      "Brake control manifolds",
      "Bogie hydraulic blocks",
      "Coupler & draft gear machining",
      "Suspension actuators",
    ],
    category: "port-tools",
    sortOrder: 8,
  },
];

export async function seed(strapi: any) {
  for (const ind of industries) {
    const existing = await strapi
      .query("api::industry.industry")
      .findOne({ where: { slug: ind.slug } });

    if (!existing) {
      await strapi.query("api::industry.industry").create({ data: ind });
      console.log(`  ✅ Created industry: ${ind.name}`);
    } else {
      console.log(`  ⏭  Industry already exists: ${ind.name}`);
    }
  }
}
