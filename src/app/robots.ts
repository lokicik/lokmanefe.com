import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Slurp", allow: "/", crawlDelay: 1 },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
