"use client";

import { useState } from "react";
import type {
  Book,
  ReadingGoal,
  ReadingStreak,
  BookRecommendation,
  ReadingChallenge,
} from "@/lib/markdown-books";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

interface ReadingPageContentProps {
  books: Book[];
  stats: {
    totalBooks: number;
    currentlyReading: number;
    completed: number;
    totalPages: number;
    pagesRead: number;
    averageRating: number;
    wantToRead: number;
    paused: number;
    didNotFinish: number;
  };
  goal: ReadingGoal;
  streak: ReadingStreak;
  genreDistribution: { [genre: string]: number };
  velocity: {
    averagePagesPerDay: number;
    averageCompletionTime: number;
    fastestRead: { book: Book; days: number } | null;
  };
  recommendations: BookRecommendation[];
  wishlistBooks: Book[];
  currentProgress: number;
  challenges: ReadingChallenge[];
}

export function ReadingPageContent({
  books,
  stats,
  goal,
  genreDistribution,
  velocity,
}: ReadingPageContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<string>("currently-reading");

  // Filter books based on search and status
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      selectedStatus === "all" || book.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const completedBooks = books.filter((book) => book.status === "completed");
  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currently-reading"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Reading</h1>
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          Books I&apos;m reading, have completed, and want to explore.
        </p>

        {/* Simple Progress Line */}
        <div className="text-muted-foreground">
          <p>
            Currently reading{" "}
            <strong className="text-foreground">
              {stats.currentlyReading}
            </strong>{" "}
            {stats.currentlyReading === 1 ? "book" : "books"}, completed{" "}
            <strong className="text-foreground">{stats.completed}</strong>{" "}
            total. This year:{" "}
            <strong className="text-foreground">
              {goal.completedBooks}/{goal.targetBooks}
            </strong>{" "}
            books.
          </p>
          {currentlyReadingBooks.length > 0 && (
            <p className="mt-1">
              Reading:{" "}
              <strong className="text-foreground">
                {currentlyReadingBooks[0].title}
              </strong>{" "}
              by {currentlyReadingBooks[0].author}
              {currentlyReadingBooks[0].currentPage && (
                <span className="text-muted-foreground">
                  {" "}
                  (page {currentlyReadingBooks[0].currentPage} of{" "}
                  {currentlyReadingBooks[0].pages})
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Reading Insights - Moved up */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Insights</h2>
        <div className="text-muted-foreground space-y-1">
          <p>
            Reading speed: <strong className="text-foreground">350-2000</strong>{" "}
            words per minute
          </p>
          <p>
            Total pages read:{" "}
            <strong className="text-foreground">
              {completedBooks.reduce((sum, book) => sum + book.pages, 0)}
            </strong>
          </p>
          <p>
            Authors discovered:{" "}
            <strong className="text-foreground">
              {new Set(completedBooks.map((book) => book.author)).size}
            </strong>
          </p>
          <p>
            Genres explored:{" "}
            <strong className="text-foreground">
              {Object.keys(genreDistribution).length}
            </strong>
          </p>
          {velocity.fastestRead && (
            <p>
              Fastest read:{" "}
              <strong className="text-foreground">
                {velocity.fastestRead.book.title}
              </strong>{" "}
              in {velocity.fastestRead.days} days
            </p>
          )}
        </div>
      </section>

      {/* Search */}
      <section>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books, authors, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
            >
              All ({stats.totalBooks})
            </Button>
            <Button
              variant={
                selectedStatus === "currently-reading" ? "default" : "outline"
              }
              size="sm"
              onClick={() => setSelectedStatus("currently-reading")}
            >
              Reading ({stats.currentlyReading})
            </Button>
            <Button
              variant={selectedStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus("completed")}
            >
              Completed ({stats.completed})
            </Button>
            <Button
              variant={
                selectedStatus === "want-to-read" ? "default" : "outline"
              }
              size="sm"
              onClick={() => setSelectedStatus("want-to-read")}
            >
              Want to Read ({stats.wantToRead})
            </Button>
          </div>
        </div>
      </section>

      {/* Books List */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Library</h2>
        {filteredBooks.length === 0 ? (
          <p className="text-muted-foreground">No books found.</p>
        ) : (
          <div className="space-y-6">
            {filteredBooks.map((book) => (
              <div key={book.slug} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Link
                      href={`/reading/${book.slug}`}
                      className="text-xl font-semibold hover:text-primary transition-colors"
                    >
                      {book.title}
                    </Link>
                    <p className="text-muted-foreground">by {book.author}</p>
                    {book.status === "currently-reading" &&
                      book.currentPage && (
                        <p className="text-sm text-muted-foreground">
                          Page {book.currentPage} of {book.pages} (
                          {Math.round((book.currentPage / book.pages) * 100)}%)
                        </p>
                      )}
                    {book.status === "completed" && book.rating && (
                      <p className="text-sm text-muted-foreground">
                        Rating: {book.rating}/5 stars
                      </p>
                    )}
                    {book.status === "completed" && book.completedDate && (
                      <p className="text-sm text-muted-foreground">
                        Completed:{" "}
                        {book.completedDate.length === 4
                          ? book.completedDate // Just show year if it's only 4 characters
                          : new Date(book.completedDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                      </p>
                    )}
                    {book.status === "completed" && !book.completedDate && (
                      <p className="text-sm text-muted-foreground">
                        Read previously
                      </p>
                    )}
                    {book.status === "currently-reading" && book.startDate && (
                      <p className="text-sm text-muted-foreground">
                        Started:{" "}
                        {new Date(book.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={getStatusVariant(book.status)}>
                      {getStatusLabel(book.status)}
                    </Badge>
                    {book.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {book.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "currently-reading":
      return "default";
    case "completed":
      return "secondary";
    case "want-to-read":
      return "outline";
    default:
      return "outline";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "currently-reading":
      return "Reading";
    case "completed":
      return "Completed";
    case "want-to-read":
      return "Want to Read";
    case "paused":
      return "Paused";
    case "did-not-finish":
      return "DNF";
    default:
      return status;
  }
}
