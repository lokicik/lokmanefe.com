"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Search, X } from "lucide-react";
import { filterBooks } from "@/lib/archive-filters";
import type { Book, BookStatus } from "@/lib/markdown-books";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ReadingPageContentProps {
  books: Book[];
  queryString: string;
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
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function ReadingPageContent({ books, stats, queryString }: ReadingPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useMemo(() => new URLSearchParams(queryString), [queryString]);
  const queryFromUrl = searchParams.get("q") ?? "";
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [isYearPopoverOpen, setIsYearPopoverOpen] = useState(false);

  const selectedStatus = searchParams.get("status") || "currently-reading";
  const selectedYear = searchParams.get("year") || "all";

  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (searchTerm.trim() === queryFromUrl) return;

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm.trim()) {
        params.set("q", searchTerm.trim());
      } else {
        params.delete("q");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [pathname, queryFromUrl, router, searchParams, searchTerm]);

  const filterHref = (key: string, value: string, defaultValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const availableYears = useMemo(() => {
    return Array.from(
      new Set(
        books
          .map((book) => {
            const date = book.completedDate || book.startDate;
            return date ? new Date(date).getFullYear().toString() : null;
          })
          .filter((year): year is string => year !== null)
      )
    ).sort((a, b) => b.localeCompare(a));
  }, [books]);
  const showYearFilter = availableYears.length > 1;

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All", count: stats.totalBooks },
      {
        value: "currently-reading",
        label: "Reading",
        count: stats.currentlyReading,
      },
      { value: "completed", label: "Completed", count: stats.completed },
      {
        value: "want-to-read",
        label: "Want to read",
        count: stats.wantToRead,
      },
      ...(stats.paused > 0
        ? [{ value: "paused", label: "Paused", count: stats.paused }]
        : []),
      ...(stats.didNotFinish > 0
        ? [{ value: "did-not-finish", label: "DNF", count: stats.didNotFinish }]
        : []),
    ],
    [stats]
  );

  const filteredBooks = useMemo(
    () => filterBooks(books, { q: searchTerm, status: selectedStatus, year: selectedYear }),
    [books, searchTerm, selectedStatus, selectedYear]
  );

  const archiveStats = useMemo(
    () => ({
      authors: new Set(books.map((book) => book.author)).size,
      genres: new Set(books.flatMap((book) => book.tags)).size,
    }),
    [books]
  );

  const formatShortDate = (date: string) =>
    date.length === 4 ? date : formatDate(date);

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-4xl font-bold">Reading</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Books I&apos;m reading, have completed, and want to explore.
        </p>
      </header>

      <section aria-label="Reading filters" className="mb-10 space-y-4">
        <div>
          <label htmlFor="reading-search" className="sr-only">
            Search books, authors, or tags
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="reading-search"
              name="reading-search"
              type="search"
              autoComplete="off"
              placeholder="Search books, authors, or tags…"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-11 pl-10 pr-12"
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchTerm("")}
                aria-label="Clear book search"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="horizontal-scroll -mx-4 min-w-0 flex-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2" aria-label="Reading status">
              {statusOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    selectedStatus === option.value ? "default" : "outline"
                  }
                  size="sm"
                  asChild
                >
                  <Link
                    href={filterHref("status", option.value, "currently-reading")}
                    replace
                    scroll={false}
                    prefetch={false}
                    aria-current={selectedStatus === option.value ? "page" : undefined}
                  >
                    {option.label} ({numberFormatter.format(option.count)})
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {showYearFilter && (
            <Popover
              open={isYearPopoverOpen}
              onOpenChange={setIsYearPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit shrink-0 gap-2"
                >
                  {selectedYear === "all" ? "All years" : selectedYear}
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-36 p-1">
                <Button
                  variant={selectedYear === "all" ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={filterHref("year", "all", "all")} replace scroll={false} prefetch={false} onClick={() => setIsYearPopoverOpen(false)}>
                    All years
                  </Link>
                </Button>
                {availableYears.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                    className="w-full justify-start"
                  >
                    <Link href={filterHref("year", year, "all")} replace scroll={false} prefetch={false} onClick={() => setIsYearPopoverOpen(false)}>
                      {year}
                    </Link>
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </section>

      <section aria-labelledby="library-heading">
        <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-2">
          <h2 id="library-heading" className="text-2xl font-bold">
            Library
          </h2>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {numberFormatter.format(filteredBooks.length)} shown
          </p>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredBooks.map((book) => {
              const backUrl = queryString ? `${pathname}?${queryString}` : pathname;
              const href = `/reading/${book.slug}?back=${encodeURIComponent(
                backUrl
              )}`;

              return (
                <article key={book.slug} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={href}
                        prefetch={false}
                        className="rounded-sm text-lg font-semibold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {book.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        by {book.author}
                      </p>
                      {book.status === "currently-reading" && book.progress > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Page {numberFormatter.format(book.currentPage)} of{" "}
                          {numberFormatter.format(book.pages)} ({book.progress}%)
                        </p>
                      )}
                      {book.status === "completed"
                        ? (book.startDate || book.completedDate) && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {book.startDate &&
                                `Started ${formatShortDate(book.startDate)}`}
                              {book.startDate && book.completedDate && " · "}
                              {book.completedDate &&
                                `Completed ${formatShortDate(book.completedDate)}`}
                            </p>
                          )
                        : book.startDate && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Started {formatShortDate(book.startDate)}
                            </p>
                          )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {book.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="hidden text-xs sm:inline-flex"
                        >
                          {tag}
                        </Badge>
                      ))}
                      <Badge variant={getStatusVariant(book.status)}>
                        {getStatusLabel(book.status)}
                      </Badge>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">No books match these filters.</p>
          </div>
        )}
      </section>

      <aside className="mt-12 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Archive</span>
        {" · "}
        {numberFormatter.format(stats.totalBooks)} books
        {" · "}
        {numberFormatter.format(stats.pagesRead)} pages read
        {" · "}
        {numberFormatter.format(archiveStats.authors)} authors
        {" · "}
        {numberFormatter.format(archiveStats.genres)} genres
      </aside>
    </div>
  );
}

function getStatusVariant(
  status: BookStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "currently-reading":
      return "default";
    case "completed":
      return "secondary";
    case "did-not-finish":
      return "destructive";
    default:
      return "outline";
  }
}

function getStatusLabel(status: BookStatus): string {
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
  }
}
