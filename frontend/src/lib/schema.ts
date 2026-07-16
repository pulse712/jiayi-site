/**
 * JSON-LD structured data helpers.
 * Use these in generateMetadata or page <script> tags for Google rich results.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

// ─── Organization (used on every page via root layout) ─────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JIAYI TOOL",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Factory-direct precision carbide cutting tools for global hydraulic OEM manufacturers since 2009.",
    foundingDate: "2009",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Floors 1–3, No. 12 Jingshan Road, Luotian Community, Songgang Town",
      addressLocality: "Shenzhen",
      addressRegion: "Guangdong",
      postalCode: "518105",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+86-18688733869",
        contactType: "sales",
        availableLanguage: ["English", "Chinese", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        email: "sales@jiayitool.com",
        contactType: "customer support",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/jiayi-tool",
      "https://www.facebook.com/jiayitool",
    ],
  };
}

// ─── Product (used on /products/[category] pages) ──────────────────────────
export function productSchema({
  name,
  description,
  image,
  sku,
  url,
}: {
  name: string;
  description: string;
  image?: string;
  sku: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    url,
    image: image || `${SITE_URL}/logo.png`,
    brand: {
      "@type": "Brand",
      name: "JIAYI TOOL",
    },
    manufacturer: {
      "@type": "Organization",
      name: "JIAYI TOOL",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "JIAYI TOOL" },
    },
  };
}

// ─── Article / BlogPosting ──────────────────────────────────────────────────
export function articleSchema({
  title,
  excerpt,
  date,
  author,
  image,
  slug,
}: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "JIAYI TOOL",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: image || `${SITE_URL}/logo.png`,
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };
}

// ─── Local Business ─────────────────────────────────────────────────────────
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    name: "JIAYI TOOL",
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: "+86-18688733869",
    email: "sales@jiayitool.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Floors 1–3, No. 12 Jingshan Road, Luotian Community",
      addressLocality: "Shenzhen",
      addressRegion: "Guangdong",
      postalCode: "518105",
      addressCountry: "CN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.7333,
      longitude: 113.8833,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
  };
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
