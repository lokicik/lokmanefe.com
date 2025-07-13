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
    title: book.title,
    description:
      book.description ||
      `My thoughts and reflections on "${book.title}" by ${book.author}.`,
    alternates: {
      canonical: `/reading/${slug}`,
    },
    openGraph: {
      title: `${book.title} | My Reading Notes`,
      description: book.description || `A summary of my thoughts on the book.`,
      url: `/reading/${slug}`,
      type: "article",
      publishedTime: book.completedDate
        ? new Date(book.completedDate).toISOString()
        : undefined,
      authors: [book.author],
    },
    twitter: {
      card: "summary",
      title: book.title,
      description: book.description,
    },
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    datePublished: book.datePublished,
    inLanguage: "en-US",
    description: book.description,
    isbn: book.isbn,
    numberOfPages: book.pages,
    url: `${baseUrl}/reading/${book.slug}`,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: book.rating,
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: "Lokman Efe",
      },
    },
  };

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <BookPageContent book={book} content={renderedContent} />
      </Suspense>
    </>
  );
}
