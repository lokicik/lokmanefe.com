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
    formats: ['image/webp'],
    // Covers use stable URLs. Changed artwork should get a new URL/version.
    minimumCacheTTL: 604800, // 7 days; upstream max-age may be longer.
    // Audited against every coverImage in content/books. Keep the default
    // size sets: existing responsive images already share those variants.
    remotePatterns: [
      { protocol: "http", hostname: "books.google.com" },
      ...[
        "books.google.com",
        "covers.openlibrary.org",
        "encrypted-tbn0.gstatic.com",
        "encrypted-tbn2.gstatic.com",
        "www.alfakitap.com",
        "images-na.ssl-images-amazon.com",
        "upload.wikimedia.org",
        "images.isbndb.com",
        "inchiostroeparole.it",
        "img.kitapyurdu.com",
        "m.media-amazon.com",
        "i.dr.com.tr",
      ].map((hostname) => ({ protocol: "https" as const, hostname })),
    ],
  },
  // Optimize static generation
  experimental: {
    optimizePackageImports: ['lucide-react', '@vercel/analytics', '@vercel/speed-insights'],
  },
  // Configure headers for better caching
  async headers() {
    // `next dev` serves chunks and assets at unhashed URLs, so a year of
    // immutable caching would keep running stale code after edits.
    if (process.env.NODE_ENV !== "production") return [];

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
