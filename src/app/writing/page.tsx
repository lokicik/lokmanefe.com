import { getWritings } from "@/lib/markdown-writing";
import { WritingsPageContent } from "@/components/writing-page-content";
import { Suspense } from "react";
import { Metadata } from "next";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writings",
  description:
    "A collection of articles and stories on software development, AI, and more.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writings | Lokman Efe",
    description: "In-depth articles and stories on technology and creativity.",
    url: "/writing",
  },
};

export default async function WritingsPage() {
  const writings = await getWritings();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Writings | Lokman Efe",
    description:
      "A collection of articles and stories on software development, AI, and more.",
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
      <Suspense fallback={<div>Loading...</div>}>
        <WritingsPageContent initialWritings={writings} />
      </Suspense>
    </>
  );
}
