import { getWritings } from "@/lib/markdown-writing";
import { WritingsPageContent } from "@/components/writing-page-content";
import { Suspense } from "react";
import { Metadata } from "next";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on shipping software, debugging systems, and the occasional story.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing | Lokman Efe",
    description:
      "Notes on shipping software, debugging systems, and the occasional story.",
    url: "/writing",
  },
};

export default async function WritingsPage() {
  const writings = await getWritings();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Writing | Lokman Efe",
    description:
      "Notes on shipping software, debugging systems, and the occasional story.",
    url: `${baseUrl}/writing`,
    mainEntity: {
      "@type": "Blog",
      name: "Lokman Efe's Blog",
      blogPost: writings.map((writing) => ({
        "@type": "BlogPosting",
        headline: writing.title,
        url: `${baseUrl}/writing/${writing.slug}`,
        datePublished: writing.date,
        author: {
          "@type": "Person",
          name: "Lokman Efe",
        },
        description: writing.description || writing.excerpt,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div>Loading…</div>}>
        <WritingsPageContent initialWritings={writings} />
      </Suspense>
    </>
  );
}
