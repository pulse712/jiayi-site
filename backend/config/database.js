const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    postgres: {
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: parseInt(env("DATABASE_PORT", "5432"), 10),
        database: env("DATABASE_NAME", "jiayi"),
        user: env("DATABASE_USERNAME", "jiayi"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env("DATABASE_SSL", "false") === "true"
          ? { rejectUnauthorized: false }
          : false,
      },
      pool: { min: 2, max: 10 },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, "..", env("DATABASE_FILENAME", ".tmp/data.db")),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  };
};
