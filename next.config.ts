import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "images.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "static.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "**.hashnode.dev",
      },
    ],
  },
};

export default nextConfig;
