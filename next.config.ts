import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "media.licdn.com", protocol: "https" },
      { hostname: "images.pexels.com", protocol: "https" },
      { hostname: "res.cloudinary.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
