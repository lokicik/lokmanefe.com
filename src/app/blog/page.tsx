import Link from "next/link";
import { getMarkdownPosts } from "@/lib/markdown-posts";
import { formatDate } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await getMarkdownPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Thoughts on development, technology, and more.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No posts yet.</p>
          <p className="text-sm text-muted-foreground">
            Add markdown files to the <code>content/posts/</code> directory to
            get started.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <time className="text-sm text-muted-foreground font-medium">
                      {formatDate(post.date)}
                    </time>
                    <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h2>
                  </div>

                  {post.excerpt && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-muted/50 text-muted-foreground px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-primary font-medium text-sm group-hover:underline">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
