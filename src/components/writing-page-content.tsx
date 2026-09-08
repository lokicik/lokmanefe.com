"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Calendar, ChevronDown, Clock, Search, X } from "lucide-react";
import { filterWritings } from "@/lib/archive-filters";
import type { MarkdownWriting } from "@/lib/markdown-writing";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WritingsPageContentProps {
  initialWritings: MarkdownWriting[];
  queryString: string;
}

export function WritingsPageContent({
  initialWritings,
  queryString,
}: WritingsPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useMemo(() => new URLSearchParams(queryString), [queryString]);
  const queryFromUrl = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [isYearPopoverOpen, setIsYearPopoverOpen] = useState(false);

  const activeFilter = searchParams.get("filter") || "all";
  const selectedYear = searchParams.get("year") || "all";
  const showSearch = initialWritings.length >= 6 || Boolean(queryFromUrl);

  const counts = useMemo(
    () => ({
      all: initialWritings.length,
      articles: initialWritings.filter((writing) => writing.type === "article")
        .length,
      stories: initialWritings.filter((writing) => writing.type === "story")
        .length,
    }),
    [initialWritings]
  );
  const showTypeFilters = counts.stories > 0 || activeFilter !== "all";

  const availableYears = useMemo(() => {
    return Array.from(
      new Set(
        initialWritings.map((writing) =>
          new Date(writing.date).getFullYear().toString()
        )
      )
    ).sort((a, b) => b.localeCompare(a));
  }, [initialWritings]);
  const showYearFilter = availableYears.length > 1 || selectedYear !== "all";

  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (!showSearch || searchQuery.trim() === queryFromUrl) return;

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
      } else {
        params.delete("q");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [pathname, queryFromUrl, router, searchParams, searchQuery, showSearch]);

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

  const filteredWritings = useMemo(
    () => filterWritings(initialWritings, { q: searchQuery, filter: activeFilter, year: selectedYear }),
    [initialWritings, searchQuery, activeFilter, selectedYear]
  );

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-10 sm:mb-12">
        <h1 className="text-4xl font-bold">Writing</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Notes on shipping software, debugging systems, and the occasional story.
        </p>
      </header>

      {(showSearch || showTypeFilters || showYearFilter) && (
        <section aria-label="Writing filters" className="mb-8 space-y-4">
          {showSearch && (
            <div>
              <label htmlFor="writing-search" className="sr-only">
                Search writing
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="writing-search"
                  name="writing-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Search writing…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-11 pl-10 pr-12"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear writing search"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            {showTypeFilters && (
              <div className="flex flex-wrap gap-2" aria-label="Writing type">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={filterHref("filter", "all", "all")} replace scroll={false} prefetch={false} aria-current={activeFilter === "all" ? "page" : undefined}>
                    All ({counts.all})
                  </Link>
                </Button>
                <Button
                  variant={activeFilter === "article" ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={filterHref("filter", "article", "all")} replace scroll={false} prefetch={false} aria-current={activeFilter === "article" ? "page" : undefined}>
                    Articles ({counts.articles})
                  </Link>
                </Button>
                <Button
                  variant={activeFilter === "story" ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link href={filterHref("filter", "story", "all")} replace scroll={false} prefetch={false} aria-current={activeFilter === "story" ? "page" : undefined}>
                    Stories ({counts.stories})
                  </Link>
                </Button>
              </div>
            )}

            {showYearFilter && (
              <Popover
                open={isYearPopoverOpen}
                onOpenChange={setIsYearPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
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
      )}

      {filteredWritings.length === 0 ? (
        <div className="border-t py-12 text-center">
          <p className="text-muted-foreground">No writing matches these filters.</p>
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {filteredWritings.map((writing) => {
            const visibleTags = writing.tags?.slice(0, 3) ?? [];
            const remainingTags = Math.max(
              0,
              (writing.tags?.length ?? 0) - visibleTags.length
            );

            return (
              <article key={writing.slug} className="group">
                <Link
                  href={`/writing/${writing.slug}`}
                  prefetch={false}
                  className="block rounded-sm py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:py-8"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                    <Badge
                      variant={writing.type === "article" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {writing.type}
                    </Badge>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <Calendar aria-hidden="true" className="h-4 w-4" />
                      <time>{formatDate(writing.date)}</time>
                    </span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <Clock aria-hidden="true" className="h-4 w-4" />
                      {writing.readingTime} min
                    </span>
                    {writing.wordCount > 0 && (
                      <span className="hidden whitespace-nowrap sm:inline">
                        {new Intl.NumberFormat("en-US").format(writing.wordCount)} words
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold leading-tight transition-colors group-hover:text-primary sm:text-3xl">
                    {writing.title}
                  </h2>

                  {writing.excerpt && (
                    <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                      {writing.excerpt}
                    </p>
                  )}

                  {(visibleTags.length > 0 || remainingTags > 0) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {visibleTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted/60 px-2 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {remainingTags > 0 && (
                        <span className="self-center text-xs text-muted-foreground">
                          +{remainingTags}
                        </span>
                      )}
                    </div>
                  )}

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
