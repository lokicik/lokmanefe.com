import { getBooks, getBookStats } from "@/lib/markdown-books";
import { ReadingPageContent } from "@/components/reading-page-content";
import { Metadata } from "next";
import { absoluteUrl, serializeJsonLd, site, socialImage } from "@/lib/seo";
import { serializeSearchParams, type ArchiveSearchParams } from "@/lib/archive-params";
import { filterBooks } from "@/lib/archive-filters";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "A curated collection of my reading journey, including book notes, progress, and literary analytics.",
  alternates: {
    canonical: "/reading",
  },
  openGraph: {
    title: "Reading List | Lokman Efe",
    description:
      "Explore the books I'm reading, my progress, and my thoughts on them.",
    url: "/reading",
    images: [socialImage("Reading")],
  },
  twitter: {
    card: "summary_large_image",
    title: `Reading | ${site.name}`,
    images: [socialImage("Reading")],
  },
};

export default async function ReadingPage({ searchParams }: {
  searchParams: Promise<ArchiveSearchParams>;
}) {
  const queryString = serializeSearchParams(await searchParams);
  const books = await getBooks();
  const filters = new URLSearchParams(queryString);
  const visibleBooks = filterBooks(books, {
    q: filters.get("q") ?? "",
    status: filters.get("status") || "currently-reading",
    year: filters.get("year") || "all",
  });

  // Calculate all data on the server side
  const stats = getBookStats(books);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Reading List | Lokman Efe",
    description:
      "A curated collection of my reading journey, including book notes, progress, and literary analytics.",
    url: absoluteUrl("/reading"),
    mainEntity: {
      "@type": "ItemList",
      name: "Book Reading List",
      numberOfItems: visibleBooks.length,
      itemListElement: visibleBooks.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: book.title,
          author: {
            "@type": "Person",
            name: book.author,
          },
          url: absoluteUrl(`/reading/${book.slug}`),
        },
      })),
    },
  };

  // Additional calculations (currently unused) can be re-added when the UI supports them

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ReadingPageContent books={books} stats={stats} queryString={queryString} />
    </>
  );
}
