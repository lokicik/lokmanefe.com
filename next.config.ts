import type { NextConfig } from "next";
import { site } from "./src/lib/seo";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  output: "standalone",
  async redirects() {
    return [
      ...["lokmanefe.com", "lokmanbaturayefe.com", "www.lokmanbaturayefe.com"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${site.url}/:path*`,
        permanent: true,
      })),
      {
        source: "/writing/windows-11-whatsapp-cok-yavas",
        destination: "/writing/windows-11-efficiency-mode-process-lasso",
        permanent: true,
      },
      {
        source: "/writing/whatsapp-desktop-slow-windows-11",
        destination: "/writing/windows-11-efficiency-mode-process-lasso",
        permanent: true,
      },
      { source: "/projects", destination: "/#projects", permanent: true },
    ];
  },
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
