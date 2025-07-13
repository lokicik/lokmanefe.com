import { notFound } from "next/navigation";
import {
  getWritingBySlug,
  getWritings,
  renderMarkdownContent,
} from "@/lib/markdown-writings";
import { formatDate } from "@/lib/utils";
import { SocialShare } from "@/components/social-share";
import { RelatedWritings } from "@/components/related-writings";
import { WritingContent } from "@/components/writing-content";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const writing = await getWritingBySlug(slug);

  if (!writing) {
    return {
      title: "Writing Not Found",
    };
  }

  return {
    title: writing.title,
    description: writing.excerpt || writing.description,
    alternates: {
      canonical: `/writings/${slug}`,
    },
    openGraph: {
      title: writing.title,
      description: writing.excerpt || writing.description,
      url: `/writings/${slug}`,
      type: "article",
      publishedTime: new Date(writing.date).toISOString(),
      authors: ["Lokman Efe"],
    },
    twitter: {
      card: "summary_large_image",
      title: writing.title,
      description: writing.excerpt || writing.description,
    },
  };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const writing = await getWritingBySlug(slug);

  if (!writing || !writing.published) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: writing.title,
    datePublished: new Date(writing.date).toISOString(),
    dateModified: writing.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Lokman Efe",
      url: baseUrl,
    },
    description: writing.excerpt || writing.description,
    image: `${baseUrl}/og?title=${encodeURIComponent(writing.title)}`,
    publisher: {
      "@type": "Organization",
      name: "Lokman Efe",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/writings/${slug}`,
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
  const writingUrl = `${baseUrl}/writings/${writing.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-2">
              <Badge
                variant={writing.type === "article" ? "default" : "secondary"}
                className="capitalize"
              >
                {writing.type}
              </Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time>Published {formatDate(writing.date)}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{writing.readingTime} min read</span>
              </div>
              {writing.wordCount && (
                <span>{writing.wordCount.toLocaleString()} words</span>
              )}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {writing.title}
          </h1>

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

          {/* Social sharing */}
          <div className="flex justify-center">
            <SocialShare
              title={writing.title}
              url={writingUrl}
              description={writing.excerpt}
            />
          </div>
        </header>

        {/* Content with enhanced features */}
        <WritingContent content={renderedContent} showComments={true} />

        {/* Footer actions */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
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

export async function generateStaticParams() {
  // This would normally fetch all slugs, but for now we'll return empty
  // Next.js will handle dynamic generation
  return [];
}
