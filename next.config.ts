import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
  },
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true, // logs every cache HIT/MISS/SKIP in terminal
    },
  },
};

export default nextConfig;
