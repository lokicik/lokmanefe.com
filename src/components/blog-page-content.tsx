"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { MarkdownPost } from "@/lib/markdown-posts";
import { formatDate } from "@/lib/utils";
import { BlogSearch } from "@/components/blog-search";
import { BlogArchive } from "@/components/blog-archive";
import { Clock, Calendar } from "lucide-react";

interface BlogPageContentProps {
  initialPosts: MarkdownPost[];
  archive: { [year: string]: { [month: string]: MarkdownPost[] } };
}

export function BlogPageContent({
  initialPosts,
  archive,
}: BlogPageContentProps) {
  const [posts] = useState<MarkdownPost[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] =
    useState<MarkdownPost[]>(initialPosts);
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [currentView, setCurrentView] = useState<"list" | "archive">("list");

  const handleFilteredPostsChange = useCallback((newPosts: MarkdownPost[]) => {
    setFilteredPosts(newPosts);
  }, []);

  const handleTagChange = useCallback((tag: string | undefined) => {
    setSelectedTag(tag);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Blog</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Thoughts on development, technology, and more.
        </p>
      </div>

      {/* Search and filtering */}
      <div className="mb-8">
        <BlogSearch
          posts={posts}
          onFilteredPostsChange={handleFilteredPostsChange}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
        />
      </div>

      {/* View toggle */}
      <div className="mb-8">
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setCurrentView("list")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === "list"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setCurrentView("archive")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === "archive"
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Archive
          </button>
        </div>
      </div>

      {currentView === "archive" ? (
        <BlogArchive archive={archive} />
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No posts found.</p>
              {(selectedTag || posts.length > 0) && (
                <p className="text-sm text-muted-foreground">
                  {selectedTag
                    ? `No posts found with the tag "${selectedTag}".`
                    : "Try adjusting your search criteria."}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="space-y-4">
                      {/* Post meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time>{formatDate(post.date)}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                        {post.wordCount && (
                          <span>{post.wordCount.toLocaleString()} words</span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h2>
                      </div>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                                selectedTag === tag
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                              }`}
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
        </>
      )}
    </div>
  );
}
