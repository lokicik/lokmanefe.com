import {
  getBooks,
  getBookStats,
  calculateReadingGoal,
  getGenreDistribution,
} from "@/lib/markdown-books";
import { ReadingPageContent } from "@/components/reading-page-content";
import { Metadata } from "next";
import { Suspense } from "react";

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
  },
};

export default async function ReadingPage() {
  const books = await getBooks();

  // Calculate all data on the server side
  const stats = getBookStats(books);
  const goal = calculateReadingGoal(books);
  const genreDistribution = getGenreDistribution(books);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reading List | Lokman Efe",
    description:
      "A curated collection of my reading journey, including book notes, progress, and literary analytics.",
    url: `${baseUrl}/reading`,
    mainEntity: {
      "@type": "CollectionPage",
      name: "Book Reading List",
      itemListElement: books.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Book",
          name: book.title,
          author: {
            "@type": "Person",
            name: book.author,
          },
          url: `${baseUrl}/reading/${book.slug}`,
        },
      })),
    },
  };

  // Additional calculations (currently unused) can be re-added when the UI supports them

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ReadingPageContent
          books={books}
          stats={stats}
          goal={goal}
          genreDistribution={genreDistribution}
        />
      </Suspense>
    </>
  );
}
