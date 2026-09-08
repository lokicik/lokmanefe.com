import type { Book } from "@/lib/markdown-books";
import type { MarkdownWriting } from "@/lib/markdown-writing";

export function filterBooks(books: Book[], { q = "", status = "currently-reading", year = "all" }: {
  q?: string; status?: string; year?: string;
}) {
  const query = q.trim().toLowerCase();
  return books.filter((book) => {
    if (query && ![book.title, book.author, ...book.tags].some((value) => value.toLowerCase().includes(query))) return false;
    if (status !== "all" && book.status !== status) return false;
    const date = book.completedDate || book.startDate;
    return year === "all" || Boolean(date && new Date(date).getFullYear().toString() === year);
  });
}

export function filterWritings(writings: MarkdownWriting[], { q = "", filter = "all", year = "all" }: {
  q?: string; filter?: string; year?: string;
}) {
  const query = q.trim().toLowerCase();
  return writings.filter((writing) => {
    if (filter !== "all" && writing.type !== filter) return false;
    if (year !== "all" && new Date(writing.date).getFullYear().toString() !== year) return false;
    return !query || [writing.title, writing.excerpt ?? "", writing.content, ...(writing.tags ?? [])]
      .some((value) => value.toLowerCase().includes(query));
  });
}
