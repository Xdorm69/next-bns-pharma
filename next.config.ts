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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bnspharmaceuticals.com" }],
        destination: "https://www.bnspharmaceuticals.com/:path*",
        permanent: true,
      },
      // next.config.js - add to your redirects array
      {
        source: "/third-party-products",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/pcd-products",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
