import { getWritings } from "@/lib/markdown-writings";
import { WritingsPageContent } from "@/components/writings-page-content";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "A collection of articles and stories on software development, AI, and more.",
  alternates: {
    canonical: "/writings",
  },
  openGraph: {
    title: "Writings | Lokman Efe",
    description: "In-depth articles and stories on technology and creativity.",
    url: "/writings",
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
    url: `${baseUrl}/writings`,
    mainEntity: {
      "@type": "Blog",
      name: "Lokman Efe's Blog",
      blogPost: writings.map((writing) => ({
        "@type": "BlogPosting",
        headline: writing.title,
        url: `${baseUrl}/writings/${writing.slug}`,
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
