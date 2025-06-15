"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Calendar } from "lucide-react";
import { MarkdownPost } from "@/lib/markdown-posts";
import { formatDate } from "@/lib/utils";

interface BlogArchiveProps {
  archive: { [year: string]: { [month: string]: MarkdownPost[] } };
}

export function BlogArchive({ archive }: BlogArchiveProps) {
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
        <p className="text-muted-foreground">No posts found.</p>
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

          const totalPosts = months.reduce(
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
                  {totalPosts} post{totalPosts !== 1 ? "s" : ""}
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
                        {archive[year][month].map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block group"
                          >
                            <div className="flex items-start justify-between gap-4 p-2 rounded hover:bg-muted/30 transition-colors">
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                                  {post.title}
                                </h5>
                                {post.excerpt && (
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                    {post.excerpt}
                                  </p>
                                )}
                                {post.tags && post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {post.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="bg-muted/70 text-muted-foreground px-2 py-0.5 rounded text-xs"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                      <span className="text-xs text-muted-foreground">
                                        +{post.tags.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col items-end text-xs text-muted-foreground space-y-1 flex-shrink-0">
                                <time>{formatDate(post.date)}</time>
                                <span>{post.readingTime} min read</span>
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
