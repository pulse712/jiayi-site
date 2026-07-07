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
export const industries: IndustryAttributes[] = [];

// ─────────────────────────────────────────────
// Blog Posts (static fallback)
// ─────────────────────────────────────────────
export const posts: BlogPostAttributes[] = [];
