module.exports = {
  apps: [
    // ── Strapi CMS ────────────────────────────────────────────────────────────
    {
      name: "strapi",
      cwd: "/home/vpsuser/Downloads/Jiayi-Website-Next/backend",
      script: "npm",
      args: "run start",
      interpreter: "none",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "900M",
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: "1337",
        NODE_OPTIONS: "--max-old-space-size=768",
      },
    },

    // ── Next.js Frontend ──────────────────────────────────────────────────────
    {
      name: "frontend",
      cwd: "/home/vpsuser/Downloads/Jiayi-Website-Next/frontend",
      script: "node",
      args: ".next/standalone/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "700M",
      restart_delay: 3000,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "0.0.0.0",
        NODE_OPTIONS: "--max-old-space-size=512",
        STRAPI_INTERNAL_URL: "http://localhost:1337",
        STRAPI_PUBLIC_URL: "https://cms.jiayi-tools.com",
        NEXT_PUBLIC_STRAPI_URL: "https://cms.jiayi-tools.com",
        NEXT_PUBLIC_SITE_URL: "https://jiayi-tools.com",
        // Set these via environment variables or .env file on the server:
        STRAPI_API_TOKEN: "cd174978ba49f4c1d74d34bef75f65f34cc810f78b81568a1aa0b9a6b505c2c0f64eb61499376b38ce8ab299d17118573b3ba40db87f5394a12dcff6614742e60786575586b84b6e29984149c1f74059214cfc98d0588d8be25440a3507e2ee9a5ede49363154c8f74a4357fdc68c1b95966915d4832732789b810eeab2437a9",
        REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || "jiayi-revalidate-2026",
      },
    },
  ],
};
