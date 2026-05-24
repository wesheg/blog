import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    content: {
      stale: 60 * 5, // 5 mins
      revalidate: 60 * 60, // 1 hr
      expire: 60 * 60 * 24 * 7, // 1 week
    },
  },
};

export default nextConfig;
