import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Skip output file tracing for faster builds on resource-constrained servers
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/core-linux-x64-gnu",
      "node_modules/@swc/core-linux-x64-musl",
      "node_modules/@esbuild/linux-x64",
      "node_modules/webpack",
      "node_modules/rollup",
      "node_modules/terser",
    ],
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
