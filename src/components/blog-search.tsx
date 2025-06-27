"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownPost } from "@/lib/markdown-posts";

interface BlogSearchProps {
  posts: MarkdownPost[];
  onFilteredPostsChange: (posts: MarkdownPost[]) => void;
  selectedTag?: string;
  onTagChange: (tag: string | undefined) => void;
}

export function BlogSearch({
  posts,
  onFilteredPostsChange,
  selectedTag,
  onTagChange,
}: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const contentMatch = post.content.toLowerCase().includes(query);
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);
        const tagsMatch = post.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        return titleMatch || contentMatch || excerptMatch || tagsMatch;
      });
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag));
    }

    return filtered;
  }, [posts, searchQuery, selectedTag]);

  // Update parent component when filtered posts change
  useEffect(() => {
    onFilteredPostsChange(filteredPosts);
  }, [filteredPosts, onFilteredPostsChange]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      onTagChange(undefined); // Deselect tag
    } else {
      onTagChange(tag); // Select new tag
    }
  };

  const handleClearTag = () => {
    onTagChange(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search posts by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">
              Filter by tags
            </h3>
            {selectedTag && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearTag}
                className="text-xs"
              >
                Clear filter
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Info */}
      {(searchQuery || selectedTag) && (
        <div className="text-sm text-muted-foreground">
          {filteredPosts.length === 0 ? (
            <p>No posts found matching your criteria.</p>
          ) : (
            <p>
              Found {filteredPosts.length} post
              {filteredPosts.length !== 1 ? "s" : ""}
              {searchQuery &&
                selectedTag &&
                ` matching "${searchQuery}" with tag "${selectedTag}"`}
              {searchQuery && !selectedTag && ` matching "${searchQuery}"`}
              {!searchQuery && selectedTag && ` tagged with "${selectedTag}"`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
