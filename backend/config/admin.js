module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "changeMe-admin-jwt-secret-dev"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "changeMe-api-token-salt-dev"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "changeMe-transfer-token-salt-dev"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY", "changeMe-encryption-key-32chars!"),
  },
  url: env("ADMIN_URL", "/admin"),
  flags: {
    nps: false,
    promoteEE: false,
  },
  head: {
    favicon: "/favicon.png",
  },
  theme: {
    light: {},
    dark: {},
  },
});
