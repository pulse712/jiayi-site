module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: parseInt(env("PORT", "1337"), 10),
  url: env("PUBLIC_URL", "http://localhost:1337"),
  app: {
    keys: env("APP_KEYS", "changeMe1,changeMe2,changeMe3,changeMe4").split(","),
  },
  webhooks: {
    populateRelations: env("WEBHOOKS_POPULATE_RELATIONS", "false") === "true",
  },
});
