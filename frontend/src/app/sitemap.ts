import type { MetadataRoute } from "next";
import { getCategories, getBlogPosts } from "@/lib/strapi";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiayi-tools.com";

// All supported locales — "en" is the default (no prefix in URL)
const LOCALES = ["en", "es", "de", "ru", "ja", "zh"] as const;

/** Prefix a path for a given locale. EN has no prefix (default). */
function localePath(locale: string, path: string): string {
  return locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
}

/** Expand a single path to all locale variants. */
function allLocales(
  path: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localePath(locale, path),
    lastModified: new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, { data: posts }] = await Promise.all([
    getCategories(),
    getBlogPosts(1, 100),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    ...allLocales("/",              { changeFrequency: "weekly",  priority: 1.0 }),
    ...allLocales("/about",         { changeFrequency: "monthly", priority: 0.8 }),
    ...allLocales("/industries",    { changeFrequency: "monthly", priority: 0.8 }),
    ...allLocales("/products",      { changeFrequency: "weekly",  priority: 0.9 }),
    ...allLocales("/services",      { changeFrequency: "monthly", priority: 0.7 }),
    ...allLocales("/quality",       { changeFrequency: "monthly", priority: 0.7 }),
    ...allLocales("/blog",          { changeFrequency: "weekly",  priority: 0.8 }),
    ...allLocales("/contact",       { changeFrequency: "yearly",  priority: 0.6 }),
    ...allLocales("/quote",         { changeFrequency: "yearly",  priority: 0.7 }),
    ...allLocales("/faq",           { changeFrequency: "monthly", priority: 0.7 }),
    ...allLocales("/downloads",     { changeFrequency: "monthly", priority: 0.7 }),
    ...allLocales("/case-studies",  { changeFrequency: "monthly", priority: 0.7 }),
    ...allLocales("/videos",        { changeFrequency: "monthly", priority: 0.6 }),
    ...allLocales("/factory",       { changeFrequency: "monthly", priority: 0.7 }),
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.flatMap((c) =>
    allLocales(`/products/${c.slug}`, { changeFrequency: "weekly", priority: 0.85 })
  );

  const blogPages: MetadataRoute.Sitemap = posts.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: localePath(locale, `/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...categoryPages, ...blogPages];
}
