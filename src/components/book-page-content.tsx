"use client";

import { Book } from "@/lib/markdown-books";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Star, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  book: Book;
  content?: string; // Add rendered markdown content
};

export function BookPageContent({ book, content }: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/reading">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reading
          </Button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Book Cover */}
          <div className="w-full lg:w-64 flex justify-center lg:justify-start flex-shrink-0">
            {book.coverImage ? (
              <div className="relative w-48 h-72 bg-muted rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className="object-contain w-full h-full"
                  width={192}
                  height={288}
                  priority
                />
              </div>
            ) : (
              <div className="w-48 h-72 bg-muted rounded-lg flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {book.author}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant={
                    book.status === "completed" ? "default" : "secondary"
                  }
                >
                  {book.status === "currently-reading"
                    ? "Reading"
                    : book.status === "completed"
                    ? "Completed"
                    : book.status === "want-to-read"
                    ? "Want to Read"
                    : book.status}
                </Badge>
                {book.rating && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {book.rating}/5
                  </Badge>
                )}
                <Badge variant="outline">{book.pages} pages</Badge>
              </div>
            </div>

            {book.description && (
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            )}

            {/* Progress for currently reading books */}
            {book.status === "currently-reading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Reading Progress</span>
                  <span>{book.progress}%</span>
                </div>
                <Progress value={book.progress} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Page {book.currentPage} of {book.pages}
                </p>
              </div>
            )}

            {/* Reading dates */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {book.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Started:{" "}
                  {book.startDate.length === 4
                    ? book.startDate
                    : new Date(book.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </div>
              )}
              {book.completedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Completed:{" "}
                  {book.completedDate.length === 4
                    ? book.completedDate
                    : new Date(book.completedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </div>
              )}
              {!book.completedDate && !book.startDate && (
                <div className="text-muted-foreground">Read previously</div>
              )}
            </div>

            {/* Tags */}
            {book.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Take Content */}
      {content && (
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
}
