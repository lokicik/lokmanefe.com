import { notFound } from "next/navigation";
import {
  getMarkdownPostBySlug,
  renderMarkdownContent,
} from "@/lib/markdown-posts";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getMarkdownPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const renderedContent = await renderMarkdownContent(post.content);

  if (!renderedContent || typeof renderedContent !== "string") {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground">Failed to render post content.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-4">
          <time className="text-sm text-muted-foreground font-medium">
            Published {formatDate(post.date)}
          </time>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {post.tags.map((tag) => (
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

      {/* Content */}
      <div
        className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-img:rounded-lg prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  // This would normally fetch all slugs, but for now we'll return empty
  // Next.js will handle dynamic generation
  return [];
}
