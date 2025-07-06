"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Book, ReadingGoal } from "@/lib/markdown-books";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  genreDistribution: { [genre: string]: number };
}

export function ReadingPageContent({
  books,
  stats,
  goal,
  genreDistribution,
}: ReadingPageContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isYearPopoverOpen, setIsYearPopoverOpen] = useState(false);

  const selectedStatus = searchParams.get("status") || "currently-reading";
  const selectedYear = searchParams.get("year") || "all";

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", status);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("year", year);
    router.push(`${pathname}?${params.toString()}`);
    setIsYearPopoverOpen(false);
  };

  const availableYears = useMemo(() => {
    const years = new Set(
      books
        .map((book) => {
          const date = book.completedDate || book.startDate;
          return date ? new Date(date).getFullYear().toString() : null;
        })
        .filter((year): year is string => year !== null)
    );
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = books;

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(lowercasedTerm) ||
          book.author.toLowerCase().includes(lowercasedTerm) ||
          book.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
      );
    }

    if (selectedStatus !== "all") {
      result = result.filter((book) => book.status === selectedStatus);
    }

    if (selectedYear !== "all") {
      result = result.filter((book) => {
        const date = book.completedDate || book.startDate;
        return date
          ? new Date(date).getFullYear().toString() === selectedYear
          : false;
      });
    }

    return result;
  }, [books, searchTerm, selectedStatus, selectedYear]);

  const completedBooks = books.filter((book) => book.status === "completed");
  const currentlyReadingBooks = books.filter(
    (book) => book.status === "currently-reading"
  );

  const formatShortDate = (date: string) =>
    date.length === 4 ? date : formatDate(date);

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
          <div className="flex justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange("all")}
              >
                All ({stats.totalBooks})
              </Button>
              <Button
                variant={
                  selectedStatus === "currently-reading" ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleStatusChange("currently-reading")}
              >
                Reading ({stats.currentlyReading})
              </Button>
              <Button
                variant={selectedStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange("completed")}
              >
                Completed ({stats.completed})
              </Button>
              <Button
                variant={
                  selectedStatus === "want-to-read" ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleStatusChange("want-to-read")}
              >
                Want to Read ({stats.wantToRead})
              </Button>
            </div>

            <Popover
              open={isYearPopoverOpen}
              onOpenChange={setIsYearPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <span>
                    {selectedYear === "all" ? "All Years" : selectedYear}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-36 p-1">
                <div className="space-y-1">
                  {availableYears.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => handleYearChange(year)}
                      className="w-full justify-start"
                    >
                      {year === "all" ? "All Years" : year}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
      {/* Library */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Library</h2>
        {filteredBooks.length > 0 ? (
          <div className="space-y-6">
            {filteredBooks.map((book) => {
              const backUrl = `${pathname}?${searchParams.toString()}`;
              const href = `/reading/${book.slug}?back=${encodeURIComponent(
                backUrl
              )}`;
              return (
                <div key={book.slug}>
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={href}
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {book.title}
                      </Link>
                      <p className="text-muted-foreground text-sm">
                        by {book.author}
                      </p>
                      {book.status === "currently-reading" &&
                        book.progress > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Page {book.currentPage} of {book.pages} (
                            {book.progress}
                            %)
                          </p>
                        )}
                      {book.status === "completed"
                        ? (book.startDate || book.completedDate) && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {book.startDate && (
                                <>Started: {formatShortDate(book.startDate)} </>
                              )}
                              {book.startDate && book.completedDate && " - "}
                              {book.completedDate && (
                                <>
                                  Completed:{" "}
                                  {formatShortDate(book.completedDate)}
                                </>
                              )}
                            </p>
                          )
                        : book.startDate && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Started: {formatShortDate(book.startDate)}
                            </p>
                          )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {book.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="default"
                          className="text-xs hidden sm:inline-block"
                        >
                          {tag}
                        </Badge>
                      ))}
                      <Badge variant={getStatusVariant(book.status)}>
                        {getStatusLabel(book.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No books match your criteria.
            </p>
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
      return "default";
    case "did-not-finish":
      return "destructive";
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
      return "Unknown";
  }
}
