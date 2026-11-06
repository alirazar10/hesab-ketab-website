import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// A static site: `npm run build` writes plain HTML/CSS to `out/`, which any static host can serve.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
