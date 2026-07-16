import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@supernova/ui-web",
    "@supernova/design-tokens",
    "@supernova/brand",
    "@supernova/localization",
  ],
};

export default nextConfig;
