import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "de", "ru", "ja"],
  defaultLocale: "en",
  // Default locale (en) has no prefix: /products
  // Other locales are prefixed: /es/products, /de/products, /ru/products, /ja/products
  localePrefix: "as-needed",
});
