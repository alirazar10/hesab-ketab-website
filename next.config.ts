import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// A static site: `npm run build` writes plain HTML/CSS to `out/`, which any static host can serve.
const nextConfig: NextConfig = {
  output: "export",
  // A second folder lets a build run while `next dev` is using `.next`.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // `/en/` is written as `en/index.html`, which every static host serves.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
