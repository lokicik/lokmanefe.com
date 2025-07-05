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
  title: "Reading - Lokman Efe",
  description: "My reading journey, book notes, goals, and analytics tracking",
};

export default async function ReadingPage() {
  const books = await getBooks();

  // Calculate all data on the server side
  const stats = getBookStats(books);
  const goal = calculateReadingGoal(books);
  const genreDistribution = getGenreDistribution(books);

  // Additional calculations (currently unused) can be re-added when the UI supports them

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReadingPageContent
        books={books}
        stats={stats}
        goal={goal}
        genreDistribution={genreDistribution}
      />
    </Suspense>
  );
}
