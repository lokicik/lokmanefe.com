import { notFound } from "next/navigation";
import {
  getMarkdownPostBySlug,
  getMarkdownPosts,
  renderMarkdownContent,
} from "@/lib/markdown-posts";
import { formatDate } from "@/lib/utils";
import { SocialShare } from "@/components/social-share";
import { RelatedPosts } from "@/components/related-posts";
import { BlogPostContent } from "@/components/blog-post-content";
import { Clock, Calendar } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getMarkdownPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Get all posts for related posts functionality
  const allPosts = await getMarkdownPosts();

  const renderedContent = await renderMarkdownContent(post.content);

  if (!renderedContent || typeof renderedContent !== "string") {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground">Failed to render post content.</p>
      </div>
    );
  }

  // Get the full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time>Published {formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            {post.wordCount && (
              <span>{post.wordCount.toLocaleString()} words</span>
            )}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
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

        {/* Social sharing */}
        <div className="flex justify-center">
          <SocialShare
            title={post.title}
            url={postUrl}
            description={post.excerpt}
          />
        </div>
      </header>

      {/* Content with enhanced features */}
      <BlogPostContent content={renderedContent} showComments={true} />

      {/* Footer actions */}
      <footer className="mt-12 pt-8 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p>Was this helpful? Share it with others!</p>
          </div>
          <SocialShare
            title={post.title}
            url={postUrl}
            description={post.excerpt}
          />
        </div>
      </footer>

      {/* Related Posts */}
      <RelatedPosts currentPost={post} allPosts={allPosts} />
    </article>
  );
}

export async function generateStaticParams() {
  // This would normally fetch all slugs, but for now we'll return empty
  // Next.js will handle dynamic generation
  return [];
}
