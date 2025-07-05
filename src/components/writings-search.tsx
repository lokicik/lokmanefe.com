"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownWriting } from "@/lib/markdown-writings";

interface WritingsSearchProps {
  writings: MarkdownWriting[];
  onFilteredWritingsChange: (writings: MarkdownWriting[]) => void;
}

export function WritingsSearch({
  writings,
  onFilteredWritingsChange,
}: WritingsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredWritings = useMemo(() => {
    let filtered = writings;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((writing) => {
        const titleMatch = writing.title.toLowerCase().includes(query);
        const contentMatch = writing.content.toLowerCase().includes(query);
        const excerptMatch = writing.excerpt?.toLowerCase().includes(query);
        const tagsMatch = writing.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        return titleMatch || contentMatch || excerptMatch || tagsMatch;
      });
    }

    return filtered;
  }, [writings, searchQuery]);

  // Update parent component when filtered posts change
  useEffect(() => {
    onFilteredWritingsChange(filteredWritings);
  }, [filteredWritings, onFilteredWritingsChange]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search writings by title, content, or tags..."
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

      {/* Results Info */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          {filteredWritings.length === 0 ? (
            <p>No writings found matching your criteria.</p>
          ) : (
            <p>
              Found {filteredWritings.length} writing
              {filteredWritings.length !== 1 ? "s" : ""} matching &quot;
              {searchQuery}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
