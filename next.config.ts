import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    cssChunking: "loose",
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default withNextIntl(nextConfig);
