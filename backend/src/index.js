"use strict";

module.exports = {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    try {
      // Strapi v5 — ensure the API token type is full-access
      // so the frontend can read all published content
      const tokens = await strapi
        .query("strapi::api-token")
        .findMany({});

      if (tokens.length === 0) {
        strapi.log.warn("No API tokens found — create one in Settings → API Tokens");
        return;
      }

      // Update all read-only tokens to full-access so content is accessible
      for (const token of tokens) {
        if (token.type === "read-only") {
          await strapi.query("strapi::api-token").update({
            where: { id: token.id },
            data: { type: "full-access" },
          });
          strapi.log.info(`✅ Updated API token "${token.name}" to full-access`);
        }
      }

      strapi.log.info("✅ API token permissions configured.");
    } catch (err) {
      strapi.log.warn("Bootstrap skipped: " + err.message);
    }
  },
};
