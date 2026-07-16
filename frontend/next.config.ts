import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Skip node_modules from output file tracing — not needed for npm start deploys
  // This prevents the slow post-build scan of 750MB+ node_modules on each build
  outputFileTracingExcludes: {
    "*": ["./node_modules/**/*"],
  },
  images: {
    remotePatterns: [
      {
        // Strapi local media
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        // Strapi on VPS
        protocol: "https",
        hostname: "**",
        pathname: "/uploads/**",
      },
      {
        // Cloudflare R2 / existing CDN images
        protocol: "https",
        hostname: "pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
