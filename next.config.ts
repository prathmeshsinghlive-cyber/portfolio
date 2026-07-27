import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Strip console.* calls in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Enable Next.js image optimization for Vercel CDN
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Compress responses
  compress: true,
};

export default nextConfig;
