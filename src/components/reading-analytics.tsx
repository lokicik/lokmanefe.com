"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
  Star,
  Zap,
  Target,
} from "lucide-react";
import type { Book } from "@/lib/markdown-books";

interface ReadingAnalyticsProps {
  books: Book[];
  velocity: {
    averagePagesPerDay: number;
    averageCompletionTime: number;
    fastestRead: { book: Book; days: number } | null;
  };
  genreDistribution: { [genre: string]: number };
}

export function ReadingAnalytics({
  books,
  velocity,
  genreDistribution,
}: ReadingAnalyticsProps) {
  const completedBooks = books.filter((book) => book.status === "completed");
  const currentlyReading = books.filter(
    (book) => book.status === "currently-reading"
  );

  // Calculate monthly reading pattern
  const monthlyReading = getMonthlyReadingPattern(completedBooks);
  const currentYear = new Date().getFullYear();

  // Calculate author diversity
  const uniqueAuthors = new Set(completedBooks.map((book) => book.author)).size;

  // Calculate average rating
  const ratedBooks = completedBooks.filter((book) => book.rating);
  const averageRating =
    ratedBooks.length > 0
      ? ratedBooks.reduce((sum, book) => sum + (book.rating || 0), 0) /
        ratedBooks.length
      : 0;

  // Sort genres by frequency
  const sortedGenres = Object.entries(genreDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalPagesRead = completedBooks.reduce(
    (sum, book) => sum + book.pages,
    0
  );
  const estimatedReadingTime = Math.round(
    totalPagesRead / (velocity.averagePagesPerDay || 1)
  );

  // Calculate reading insights
  const insights = [
    {
      title: "Total Pages Read",
      value: totalPagesRead.toLocaleString(),
      description: "Across all completed books",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      description: `Based on ${ratedBooks.length} rated books`,
    },
    {
      title: "Author Diversity",
      value: uniqueAuthors,
      description: "Unique authors read",
    },
    {
      title: "Average Pages/Day",
      value: velocity.averagePagesPerDay.toFixed(1),
      description: "When actively reading",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Reading Insights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold mb-1">{insight.value}</div>
              <div className="text-sm font-medium mb-1">{insight.title}</div>
              <div className="text-xs text-muted-foreground">
                {insight.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Velocity Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <CardTitle>Reading Velocity</CardTitle>
          </div>
          <CardDescription>
            Your reading speed and efficiency metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {velocity.averagePagesPerDay}
              </div>
              <div className="text-sm text-muted-foreground">Pages/Day</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {velocity.averageCompletionTime}
              </div>
              <div className="text-sm text-muted-foreground">Days/Book</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalPagesRead.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </div>
          </div>

          {velocity.fastestRead && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="font-medium">Fastest Read</span>
              </div>
              <div className="text-sm">
                <strong>{velocity.fastestRead.book.title}</strong> in just{" "}
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {velocity.fastestRead.days} days
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Genre Distribution */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-500" />
            <CardTitle>Genre Preferences</CardTitle>
          </div>
          <CardDescription>
            Your reading interests and diversity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedGenres.map(([genre, count]) => {
              const percentage = (count / completedBooks.length) * 100;
              return (
                <div key={genre} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">
                      {genre}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {count} books
                      </span>
                      <Badge variant="secondary">
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Unique genres explored:
              </span>
              <span className="font-medium">
                {Object.keys(genreDistribution).length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <CardTitle>Reading Insights</CardTitle>
          </div>
          <CardDescription>
            Patterns and achievements in your reading journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Authors Discovered</span>
                </div>
                <span className="font-medium">{uniqueAuthors}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Average Rating</span>
                </div>
                <span className="font-medium">
                  {averageRating > 0
                    ? `${averageRating.toFixed(1)}/5`
                    : "Not rated"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Estimated Reading Time</span>
                </div>
                <span className="font-medium">{estimatedReadingTime} days</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Books This Year</span>
                </div>
                <span className="font-medium">
                  {
                    completedBooks.filter(
                      (book) =>
                        book.completedDate &&
                        new Date(book.completedDate).getFullYear() ===
                          currentYear
                    ).length
                  }
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Currently Reading</span>
                </div>
                <span className="font-medium">{currentlyReading.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Completion Rate</span>
                </div>
                <span className="font-medium">
                  {books.length > 0
                    ? Math.round((completedBooks.length / books.length) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Reading Pattern */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <CardTitle>Monthly Reading Pattern</CardTitle>
          </div>
          <CardDescription>
            Books completed each month this year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyReading.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{month.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {month.count} books
                  </span>
                </div>
                <Progress
                  value={
                    month.count > 0
                      ? (month.count /
                          Math.max(...monthlyReading.map((m) => m.count))) *
                        100
                      : 0
                  }
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getMonthlyReadingPattern(
  books: Book[]
): Array<{ month: number; name: string; count: number }> {
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyCount = new Array(12).fill(0);

  books.forEach((book) => {
    if (book.completedDate) {
      const date = new Date(book.completedDate);
      if (date.getFullYear() === currentYear) {
        monthlyCount[date.getMonth()]++;
      }
    }
  });

  return months.map((name, index) => ({
    month: index + 1,
    name,
    count: monthlyCount[index],
  }));
}
