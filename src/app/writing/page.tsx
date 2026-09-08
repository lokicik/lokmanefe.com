import { getWritings } from "@/lib/markdown-writing";
import { WritingsPageContent } from "@/components/writing-page-content";
import { Metadata } from "next";
import { absoluteUrl, person, serializeJsonLd, site, socialImage } from "@/lib/seo";
import { serializeSearchParams, type ArchiveSearchParams } from "@/lib/archive-params";
import { filterWritings } from "@/lib/archive-filters";

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
    images: [socialImage("Writing")],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing | ${site.name}`,
    images: [socialImage("Writing")],
  },
};

export default async function WritingsPage({ searchParams }: {
  searchParams: Promise<ArchiveSearchParams>;
}) {
  const queryString = serializeSearchParams(await searchParams);
  const writings = await getWritings();
  const filters = new URLSearchParams(queryString);
  const visibleWritings = filterWritings(writings, {
    q: filters.get("q") ?? "",
    filter: filters.get("filter") || "all",
    year: filters.get("year") || "all",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Writing | Lokman Efe",
    description:
      "Notes on shipping software, debugging systems, and the occasional story.",
    url: absoluteUrl("/writing"),
    mainEntity: {
      "@type": "Blog",
      name: "Lokman Efe's Blog",
      blogPost: visibleWritings.map((writing) => ({
        "@type": "BlogPosting",
        headline: writing.title,
        url: absoluteUrl(`/writing/${writing.slug}`),
        datePublished: writing.date,
        dateModified: writing.lastModified,
        author: person,
        image: socialImage(writing.title).url,
        description: writing.description || writing.excerpt,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <WritingsPageContent initialWritings={writings} queryString={queryString} />
    </>
  );
}
