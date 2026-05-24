import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    serverContent: {
      expire: 60 * 5, // 5 mins
    },
  },
};

export default nextConfig;
