module.exports = () => ({
  // i18n is built into Strapi v5 — configure default locale and available locales
  i18n: {
    enabled: true,
    config: {
      defaultLocale: "en",
      locales: ["en", "es"],
    },
  },
});
