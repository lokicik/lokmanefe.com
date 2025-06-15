import Link from "next/link";
import { MarkdownPost, getRelatedPosts } from "@/lib/markdown-posts";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar } from "lucide-react";

interface RelatedPostsProps {
  currentPost: MarkdownPost;
  allPosts: MarkdownPost[];
  limit?: number;
}

export function RelatedPosts({
  currentPost,
  allPosts,
  limit = 3,
}: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts, limit);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Posts</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="space-y-3 p-4 rounded-lg border hover:shadow-md transition-all duration-200 hover:border-muted-foreground/20">
              {/* Post meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time>{formatDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted/50 text-muted-foreground px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center">
                      +{post.tags.length - 3} more
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
