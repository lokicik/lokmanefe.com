import { notFound } from "next/navigation";
import {
  getWritingBySlug,
  getWritings,
  renderMarkdownContent,
} from "@/lib/markdown-writing";
import { formatDate } from "@/lib/utils";
import { SocialShare } from "@/components/social-share";
import { RelatedWritings } from "@/components/related-writing";
import { WritingContent } from "@/components/writing-content";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, person, serializeJsonLd, site, socialImage } from "@/lib/seo";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params at build time
export async function generateStaticParams() {
  const writings = await getWritings({ includeUnlisted: true });
  return writings.map((writing) => ({
    slug: writing.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const writing = await getWritingBySlug(slug);

  if (!writing || !writing.published) {
    return {
      title: "Writing Not Found",
    };
  }

  return {
    title: writing.title,
    description: writing.excerpt || writing.description,
    alternates: {
      canonical: `/writing/${slug}`,
    },
    openGraph: {
      title: writing.title,
      description: writing.excerpt || writing.description,
      url: `/writing/${slug}`,
      type: "article",
      publishedTime: new Date(writing.date).toISOString(),
      authors: [absoluteUrl("/#about")],
      modifiedTime: writing.lastModified,
      images: [socialImage(writing.title)],
    },
    twitter: {
      card: "summary_large_image",
      title: writing.title,
      description: writing.excerpt || writing.description,
      images: [socialImage(writing.title)],
    },
  };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = await getWritingBySlug(slug);

  if (!writing || !writing.published) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: writing.title,
    datePublished: new Date(writing.date).toISOString(),
    dateModified: writing.lastModified,
    author: person,
    description: writing.excerpt || writing.description,
    image: socialImage(writing.title).url,
    publisher: { "@id": person["@id"] },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/writing/${slug}`),
    },
  };

  // Get all writings for related writings functionality
  const allWritings = await getWritings();

  const renderedContent = await renderMarkdownContent(writing.content);

  if (!renderedContent || typeof renderedContent !== "string") {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground">
          Failed to render writing content.
        </p>
      </div>
    );
  }

  // Get the full URL for sharing
  const writingUrl = absoluteUrl(`/writing/${writing.slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <Badge
                variant={writing.type === "article" ? "default" : "secondary"}
                className="capitalize"
              >
                {writing.type}
              </Badge>
              <span className="inline-flex flex-wrap items-center justify-center gap-x-1.5">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <Calendar aria-hidden="true" className="h-4 w-4" />
                  <time dateTime={new Date(writing.date).toISOString()}>{formatDate(writing.date)}</time>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  {writing.readingTime} min
                </span>
                {writing.wordCount > 0 && (
                  <span className="hidden items-center gap-1.5 sm:inline-flex">
                    <span aria-hidden="true">·</span>
                    <span className="whitespace-nowrap">
                      {new Intl.NumberFormat("en-US").format(writing.wordCount)} words
                    </span>
                  </span>
                )}
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {writing.title}
          </h1>

          <p className="mb-6 text-sm text-muted-foreground">
            By{" "}
            <Link href="/#about" rel="author" className="rounded-sm font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {site.name}
            </Link>
            {" "}({site.fullName})
          </p>

          {writing.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
              {writing.excerpt}
            </p>
          )}

          {writing.tags && writing.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {writing.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </header>

        {/* Content with enhanced features */}
        <WritingContent content={renderedContent} showComments={true} />

        {/* Footer actions */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>Was this helpful? Share it with others!</p>
            </div>
            <SocialShare
              title={writing.title}
              url={writingUrl}
              description={writing.excerpt}
            />
          </div>
        </footer>

        {/* Related Posts */}
        <RelatedWritings currentWriting={writing} allWritings={allWritings} />
      </article>
    </>
  );
}
