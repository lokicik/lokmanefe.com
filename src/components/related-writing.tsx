import Link from "next/link";
import { MarkdownWriting, getRelatedWritings } from "@/lib/markdown-writing";
import { cn, formatDate } from "@/lib/utils";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RelatedWritingsProps {
  currentWriting: MarkdownWriting;
  allWritings: MarkdownWriting[];
  limit?: number;
}

export function RelatedWritings({
  currentWriting,
  allWritings,
  limit = 3,
}: RelatedWritingsProps) {
  const relatedWritings = getRelatedWritings(
    currentWriting,
    allWritings,
    limit
  );

  if (relatedWritings.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Writings</h2>

      <div
        className={cn(
          "grid gap-6",
          relatedWritings.length === 2 && "md:grid-cols-2",
          relatedWritings.length >= 3 && "md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {relatedWritings.map((writing) => (
          <Link
            key={writing.slug}
            href={`/writing/${writing.slug}`}
            prefetch={false}
            className="group block"
          >
            <article className="h-full space-y-3 p-4 rounded-lg border transition-[border-color,box-shadow] duration-200 hover:border-muted-foreground/20 hover:shadow-md">
              {/* Post meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <Badge
                  variant={writing.type === "article" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {writing.type}
                </Badge>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Calendar className="h-3 w-3" />
                  <time>{formatDate(writing.date)}</time>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Clock className="h-3 w-3" />
                  <span>{writing.readingTime} min read</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                {writing.title}
              </h3>

              {/* Excerpt */}
              {writing.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {writing.excerpt}
                </p>
              )}

              {/* Tags */}
              {writing.tags && writing.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {writing.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted/50 text-muted-foreground px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {writing.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center">
                      +{writing.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Read more indicator */}
              <div className="text-primary text-sm font-medium group-hover:underline pt-2">
                Read more →
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
