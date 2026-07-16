import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@supernova/ui-web",
    "@supernova/design-tokens",
    "@supernova/localization",
  ],
};

export default nextConfig;
