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
        STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN || "",
        REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || "jiayi-revalidate-2026",
      },
    },
  ],
};
