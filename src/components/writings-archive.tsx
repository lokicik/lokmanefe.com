"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Calendar } from "lucide-react";
import { MarkdownWriting } from "@/lib/markdown-writings";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface WritingsArchiveProps {
  archive: { [year: string]: { [month: string]: MarkdownWriting[] } };
}

export function WritingsArchive({ archive }: WritingsArchiveProps) {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());

  const years = Object.keys(archive).sort((a, b) => parseInt(b) - parseInt(a));

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  if (years.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">No writings found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Archive</h2>

      <div className="space-y-4">
        {years.map((year) => {
          const isExpanded = expandedYears.has(year);
          const months = Object.keys(archive[year]).sort((a, b) => {
            const monthOrder = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            return monthOrder.indexOf(b) - monthOrder.indexOf(a);
          });

          const totalWritings = months.reduce(
            (sum, month) => sum + archive[year][month].length,
            0
          );

          return (
            <div key={year} className="border rounded-lg">
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <h3 className="text-lg font-semibold">{year}</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {totalWritings} writing{totalWritings !== 1 ? "s" : ""}
                </span>
              </button>

              {isExpanded && (
                <div className="border-t">
                  {months.map((month) => (
                    <div key={month} className="p-4 border-b last:border-b-0">
                      <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                        {month} {year}
                      </h4>
                      <div className="space-y-2">
                        {archive[year][month].map((writing) => (
                          <Link
                            key={writing.slug}
                            href={`/writings/${writing.slug}`}
                            className="block group"
                          >
                            <div className="flex items-start justify-between gap-4 p-2 rounded hover:bg-muted/30 transition-colors">
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                                  {writing.title}
                                </h5>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge
                                    variant={
                                      writing.type === "article"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="capitalize text-xs"
                                  >
                                    {writing.type}
                                  </Badge>
                                  {writing.excerpt && (
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {writing.excerpt}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end text-xs text-muted-foreground space-y-1 flex-shrink-0">
                                <time>{formatDate(writing.date)}</time>
                                <span>{writing.readingTime} min read</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
