import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // Don't prefix the default locale (en) in URLs
  // e.g. /products instead of /en/products
  // Spanish: /es/products
  localePrefix: "as-needed",
});
