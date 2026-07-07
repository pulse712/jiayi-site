import type {
  StrapiListResponse,
  StrapiSingleResponse,
  CategoryAttributes,
  ProductAttributes,
  IndustryAttributes,
  BlogPostAttributes,
  SiteSettingAttributes,
} from "@/types/strapi";

const STRAPI_URL =
  process.env.STRAPI_INTERNAL_URL ||
  "http://localhost:1337";
const STRAPI_PUBLIC_URL =
  process.env.STRAPI_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://cms.jiayi-tools.com";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

// ─────────────────────────────────────────────
// Base fetch with auth header
// ─────────────────────────────────────────────
async function strapiGet<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate = 10
): Promise<T | null> {
  try {
    const url = new URL(`${STRAPI_URL}/api${path}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url.toString(), {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : {},
      next: { revalidate },
    });

    if (!res.ok) return null;
    return res.json() as T;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────
export async function getCategories(): Promise<CategoryAttributes[]> {
  const res = await strapiGet<StrapiListResponse<CategoryAttributes>>(
    "/categories",
    { "populate[0]": "image", "sort": "sortOrder:asc", "pagination[pageSize]": "100" }
  );
  if (res?.data) return res.data;
  return [];
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategoryAttributes | null> {
  const res = await strapiGet<StrapiListResponse<CategoryAttributes>>(
    "/categories",
    { "filters[slug][$eq]": slug, "populate[0]": "image" }
  );
  if (res?.data?.[0]) return res.data[0];
  return null;
}

// ─────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────
export async function getProductsByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 24
): Promise<{ data: ProductAttributes[]; total: number }> {
  const res = await strapiGet<StrapiListResponse<ProductAttributes>>(
    "/products",
    {
      "filters[category][slug][$eq]": categorySlug,
      "populate[0]": "image",
      "populate[1]": "category",
      "populate[2]": "gallery",
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
    }
  );
  if (res?.data) {
    return { data: res.data, total: res.meta.pagination.total };
  }
  return { data: [], total: 0 };
}

export async function getProductBySlug(
  slug: string
): Promise<ProductAttributes | null> {
  const res = await strapiGet<StrapiListResponse<ProductAttributes>>(
    "/products",
    {
      "filters[slug][$eq]": slug,
      "populate[0]": "image",
      "populate[1]": "category",
      "populate[2]": "gallery",
      "populate[3]": "technicalDrawing",
    }
  );
  if (res?.data?.[0]) return res.data[0];
  return null;
}

// ─────────────────────────────────────────────
// Industries
// ─────────────────────────────────────────────
export async function getIndustries(): Promise<IndustryAttributes[]> {
  const res = await strapiGet<StrapiListResponse<IndustryAttributes>>(
    "/industries",
    {
      "populate[0]": "image",
      "populate[1]": "applications",
      "sort": "sortOrder:asc",
      "pagination[pageSize]": "100"
    }
  );
  if (res?.data) return res.data;
  return [];
}

export async function getIndustryBySlug(
  slug: string
): Promise<IndustryAttributes | null> {
  const res = await strapiGet<StrapiListResponse<IndustryAttributes>>(
    "/industries",
    {
      "filters[slug][$eq]": slug,
      "populate[0]": "image",
      "populate[1]": "applications"
    }
  );
  if (res?.data?.[0]) return res.data[0];
  return null;
}

// ─────────────────────────────────────────────
// Blog Posts
// ─────────────────────────────────────────────
export async function getBlogPosts(
  page = 1,
  pageSize = 12
): Promise<{ data: BlogPostAttributes[]; total: number }> {
  const res = await strapiGet<StrapiListResponse<BlogPostAttributes>>(
    "/blog-posts",
    {
      "populate": "image",
      "sort": "date:desc",
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
    }
  );
  if (res?.data) {
    return { data: res.data, total: res.meta.pagination.total };
  }
  return { data: [], total: 0 };
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostAttributes | null> {
  const res = await strapiGet<StrapiListResponse<BlogPostAttributes>>(
    "/blog-posts",
    { "filters[slug][$eq]": slug, "populate": "image" }
  );
  if (res?.data?.[0]) return res.data[0];
  return null;
}

// ─────────────────────────────────────────────
// Site Settings
// ─────────────────────────────────────────────
export async function getSiteSettings(): Promise<SiteSettingAttributes> {
  const res = await strapiGet<StrapiSingleResponse<SiteSettingAttributes>>(
    "/site-setting",
    {},
    3600
  );
  if (res?.data) return res.data;
  return {
    siteName: "JIAYI TOOL",
    tagline: "Precision. Performance. Reliability.",
    phone1: "+86 18688733869",
    phone2: "+86 15602977156",
    email: "sales@jiayitool.com",
    address:
      "Floors 1–3, No. 12 Jingshan Road, Luotian Community, Songgang Town, Bao'an District, Shenzhen",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Jingshan+Road+Luotian+Songgang+Bao%27an+Shenzhen&output=embed",
  };
}

// ─────────────────────────────────────────────
// Quote Request (POST)
// ─────────────────────────────────────────────
export async function submitQuoteRequest(
  data: Record<string, string>
): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/quote-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN
          ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────
// Contact Message (POST)
// ─────────────────────────────────────────────
export async function submitContactMessage(
  data: Record<string, string>
): Promise<boolean> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN
          ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Helper: resolve Strapi image URL to absolute URL
// Handles both Strapi v4 {url: "/uploads/..."} and v5 nested formats
export function getStrapiImageUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_PUBLIC_URL}${url}`;
}

// Helper: extract image from Strapi v5 response
// In Strapi v5, relations/media can be returned as { data: { id, ...attrs } } or flat
export function extractImageUrl(image: unknown): string {
  if (!image) return "";

  // Flat format: { url: "/uploads/..." }
  if (typeof (image as Record<string, unknown>).url === "string") {
    return getStrapiImageUrl((image as Record<string, unknown>).url as string);
  }

  // Nested v5 format: { data: { url: "..." } }
  const data = (image as Record<string, unknown>).data as Record<string, unknown> | null;
  if (data?.url && typeof data.url === "string") {
    return getStrapiImageUrl(data.url);
  }

  return "";
}
