import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@supernova/ui-web",
    "@supernova/charts-web",
    "@supernova/design-tokens",
    "@supernova/localization",
  ],
};

export default nextConfig;
