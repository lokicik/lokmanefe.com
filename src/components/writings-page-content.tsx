"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MarkdownWriting } from "@/lib/markdown-writings";
import { formatDate } from "@/lib/utils";
import { WritingsSearch } from "@/components/writings-search";
import { Clock, Calendar, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WritingsPageContentProps {
  initialWritings: MarkdownWriting[];
}

export function WritingsPageContent({
  initialWritings,
}: WritingsPageContentProps) {
  const [writings, setWritings] = useState<MarkdownWriting[]>(initialWritings);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isYearPopoverOpen, setIsYearPopoverOpen] = useState(false);

  const activeFilter = searchParams.get("filter") || "all";
  const selectedYear = searchParams.get("year") || "all";

  const handleFilterChange = (filter: "all" | "article" | "story") => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("year", year);
    router.push(`${pathname}?${params.toString()}`);
    setIsYearPopoverOpen(false);
  };

  const handleFilteredWritingsChange = useCallback(
    (newWritings: MarkdownWriting[]) => {
      setWritings(newWritings);
    },
    []
  );

  const availableYears = useMemo(() => {
    const years = new Set(
      initialWritings.map((writing) =>
        new Date(writing.date).getFullYear().toString()
      )
    );
    return ["all", ...Array.from(years).sort((a, b) => b.localeCompare(a))];
  }, [initialWritings]);

  const filteredWritings = useMemo(() => {
    let result = initialWritings;

    if (activeFilter !== "all") {
      result = result.filter((writing) => writing.type === activeFilter);
    }

    if (selectedYear !== "all") {
      result = result.filter(
        (writing) =>
          new Date(writing.date).getFullYear().toString() === selectedYear
      );
    }

    return result;
  }, [initialWritings, activeFilter, selectedYear]);

  const counts = useMemo(() => {
    return {
      all: initialWritings.length,
      articles: initialWritings.filter((w) => w.type === "article").length,
      stories: initialWritings.filter((w) => w.type === "story").length,
    };
  }, [initialWritings]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Writings</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Articles, essays, and stories on technology, fiction, and everything
          in between.
        </p>
      </div>

      {/* Search and filtering */}
      <div className="mb-8 space-y-4">
        <WritingsSearch
          writings={filteredWritings}
          onFilteredWritingsChange={handleFilteredWritingsChange}
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all")}
            >
              All ({counts.all})
            </Button>
            <Button
              variant={activeFilter === "article" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("article")}
            >
              Articles ({counts.articles})
            </Button>
            <Button
              variant={activeFilter === "story" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("story")}
            >
              Stories ({counts.stories})
            </Button>
          </div>

          <Popover open={isYearPopoverOpen} onOpenChange={setIsYearPopoverOpen}>
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

      {writings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No writings found.</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {writings.map((writing) => (
            <article key={writing.slug} className="group">
              <Link href={`/writings/${writing.slug}`} className="block">
                <div className="space-y-4">
                  {/* Post meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge
                      variant={
                        writing.type === "article" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {writing.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time>{formatDate(writing.date)}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{writing.readingTime} min read</span>
                    </div>
                    {writing.wordCount && (
                      <span>{writing.wordCount.toLocaleString()} words</span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {writing.title}
                    </h2>
                  </div>

                  {/* Excerpt */}
                  {writing.excerpt && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {writing.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {writing.tags && writing.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {writing.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-xs font-medium transition-colors bg-muted/50 text-muted-foreground group-hover:bg-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read more */}
                  <div className="text-primary font-medium text-sm group-hover:underline">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
