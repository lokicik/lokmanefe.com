import { getBookBySlug, getBooks } from "@/lib/markdown-books";
import { BookPageContent } from "@/components/book-page-content";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  return {
    title: `${book.title} by ${book.author} - My Take`,
    description:
      book.description || `My thoughts and reflections on ${book.title}`,
  };
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  // Get the rendered markdown content
  const booksDirectory = path.join(process.cwd(), "content/books");
  const fullPath = path.join(booksDirectory, `${slug}.md`);

  let renderedContent = "";

  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content } = matter(fileContents);

    // Render markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(content);

    renderedContent = processedContent.toString();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookPageContent book={book} content={renderedContent} />
    </Suspense>
  );
}
