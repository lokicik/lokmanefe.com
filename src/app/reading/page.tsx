import {
  getBooks,
  getBookStats,
  calculateReadingGoal,
  calculateReadingStreak,
  getGenreDistribution,
  getReadingVelocity,
  generateBookRecommendations,
} from "@/lib/markdown-books";
import { ReadingPageContent } from "@/components/reading-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading - Lokman Baturay Efe",
  description: "My reading journey, book notes, goals, and analytics tracking",
};

export default async function ReadingPage() {
  const books = await getBooks();

  // Calculate all data on the server side
  const stats = getBookStats(books);
  const goal = calculateReadingGoal(books);
  const streak = calculateReadingStreak(books);
  const genreDistribution = getGenreDistribution(books);
  const velocity = getReadingVelocity(books);
  const recommendations = generateBookRecommendations(books);

  // Filter books for different categories
  const wishlistBooks = books.filter((book) => book.status === "want-to-read");
  const currentlyReading = books.filter(
    (book) => book.status === "currently-reading"
  );

  // Calculate reading progress for currently reading books
  const currentProgress =
    currentlyReading.length > 0
      ? (currentlyReading.reduce(
          (sum, book) => sum + book.currentPage / book.pages,
          0
        ) /
          currentlyReading.length) *
        100
      : 0;

  const challenges = [
    {
      id: "2024-diversity",
      title: "Genre Explorer",
      description: "Read books from 5 different genres",
      targetCount: 5,
      currentCount: Object.keys(genreDistribution).length,
      type: "genres" as const,
      completed: Object.keys(genreDistribution).length >= 5,
      deadline: "2024-12-31",
    },
    {
      id: "2024-pages",
      title: "Page Turner",
      description: "Read 5,000 pages this year",
      targetCount: 5000,
      currentCount: goal.completedPages || 0,
      type: "pages" as const,
      completed: (goal.completedPages || 0) >= 5000,
      deadline: "2024-12-31",
    },
  ];

  return (
    <ReadingPageContent
      books={books}
      stats={stats}
      goal={goal}
      streak={streak}
      genreDistribution={genreDistribution}
      velocity={velocity}
      recommendations={recommendations}
      wishlistBooks={wishlistBooks}
      currentProgress={currentProgress}
      challenges={challenges}
    />
  );
}
