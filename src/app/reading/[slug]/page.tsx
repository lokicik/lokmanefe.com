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
import { absoluteUrl, person, serializeJsonLd, site, socialImage } from "@/lib/seo";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour

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
      `${book.title} by ${book.author} on ${site.name}'s reading list. Reading status, progress, and any personal notes.`,
    alternates: {
      canonical: `/reading/${slug}`,
    },
    openGraph: {
      title: `${book.title} | ${site.name}'s Reading List`,
      description: book.description || `${book.title} by ${book.author} on ${site.name}'s reading list.`,
      url: `/reading/${slug}`,
      type: "article",
      publishedTime: book.completedDate
        ? new Date(book.completedDate).toISOString()
        : undefined,
      authors: [absoluteUrl("/#about")],
      modifiedTime: book.lastModified,
      images: [socialImage(book.title)],
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.description,
      images: [socialImage(book.title)],
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
    url: absoluteUrl(`/reading/${book.slug}`),
    image: book.coverImage,
    review: typeof book.rating === "number" && Number.isFinite(book.rating) && book.rating >= 1 && book.rating <= 5 ? {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: book.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: person,
    } : undefined,
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <BookPageContent book={book} content={renderedContent} />
    </>
  );
}
