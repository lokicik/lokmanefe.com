"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  Star,
  Lightbulb,
  BookOpen,
  Calendar,
  User,
  Tag,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { Book, BookRecommendation } from "@/lib/markdown-books";

interface BookWishlistProps {
  wishlistBooks: Book[];
  recommendations: BookRecommendation[];
}

export function BookWishlist({
  wishlistBooks,
  recommendations,
}: BookWishlistProps) {
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  return (
    <div className="space-y-6">
      {/* Want to Read */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <CardTitle>Want to Read</CardTitle>
            </div>
            <Badge variant="outline">{wishlistBooks.length} books</Badge>
          </div>
          <CardDescription>Books on your reading wishlist</CardDescription>
        </CardHeader>
        <CardContent>
          {wishlistBooks.length > 0 ? (
            <div className="grid gap-4">
              {wishlistBooks.map((book) => (
                <WishlistBookCard key={book.slug} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No books in your wishlist yet.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Add books you want to read to track your reading goals!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <CardTitle>Recommended for You</CardTitle>
            </div>
            <Dialog
              open={showAllRecommendations}
              onOpenChange={setShowAllRecommendations}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View All ({recommendations.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>All Recommendations</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recommendations.map((rec, index) => (
                    <RecommendationCard
                      key={index}
                      recommendation={rec}
                      detailed
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Personalized book suggestions based on your reading history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.slice(0, 3).map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} />
            ))}
            {recommendations.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  Complete more books to get personalized recommendations!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Discovery Categories */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-blue-500" />
            <CardTitle>Discover New Books</CardTitle>
          </div>
          <CardDescription>
            Explore new genres and expand your reading horizons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <DiscoveryCategory
              title="Technical Books"
              description="Latest programming and tech books"
              count={12}
              color="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200"
            />
            <DiscoveryCategory
              title="Leadership"
              description="Management and team building"
              count={8}
              color="bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200"
            />
            <DiscoveryCategory
              title="System Design"
              description="Architecture and scalability"
              count={6}
              color="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200"
            />
            <DiscoveryCategory
              title="Productivity"
              description="Personal development"
              count={15}
              color="bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200"
            />
            <DiscoveryCategory
              title="Career Growth"
              description="Professional development"
              count={10}
              color="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200"
            />
            <DiscoveryCategory
              title="Innovation"
              description="Creativity and disruption"
              count={7}
              color="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WishlistBookCard({ book }: { book: Book }) {
  const addedDate = book.startDate
    ? new Date(book.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="w-16 h-20 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
        📚
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-base mb-1 line-clamp-2">
          {book.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <User className="h-3 w-3" />
          <span>{book.author}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{book.pages} pages</span>
          {addedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Added {addedDate}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          {book.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button size="sm" variant="outline" className="text-xs">
          Start Reading
        </Button>
        <Button size="sm" variant="ghost" className="text-xs">
          <ExternalLink className="h-3 w-3 mr-1" />
          Details
        </Button>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  detailed = false,
}: {
  recommendation: BookRecommendation;
  detailed?: boolean;
}) {
  const confidenceColor =
    recommendation.confidence >= 4
      ? "text-green-600 dark:text-green-400"
      : recommendation.confidence >= 3
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-orange-600 dark:text-orange-400";

  return (
    <div
      className={`p-4 border rounded-lg ${
        detailed ? "bg-muted/30" : "hover:bg-muted/50"
      } transition-colors`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-base mb-1">{recommendation.title}</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{recommendation.author}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < recommendation.confidence
                  ? `fill-current ${confidenceColor}`
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3">
        {recommendation.reason}
      </p>

      {detailed && recommendation.basedOn.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">
            Based on your reading of:
          </p>
          <div className="flex flex-wrap gap-1">
            {recommendation.basedOn.map((bookTitle) => (
              <Badge key={bookTitle} variant="outline" className="text-xs">
                {bookTitle}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-medium ${confidenceColor}`}>
            {recommendation.confidence}/5 match
          </span>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            Add to Wishlist
          </Button>
          <Button size="sm" variant="ghost" className="text-xs">
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DiscoveryCategory({
  title,
  description,
  count,
  color,
}: {
  title: string;
  description: string;
  count: number;
  color: string;
}) {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${color}`}
    >
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-xs opacity-80 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{count} books</span>
        <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  );
}
