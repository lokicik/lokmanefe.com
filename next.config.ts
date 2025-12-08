import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  output: "standalone",
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ],
  },
  // Optimize static generation
  experimental: {
    optimizePackageImports: ['lucide-react', '@vercel/analytics', '@vercel/speed-insights'],
  },
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|gif|ico|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
