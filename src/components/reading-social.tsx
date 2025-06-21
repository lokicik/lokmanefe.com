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
} from "@/components/ui/dialog";
import {
  Share2,
  Trophy,
  Users,
  MessageCircle,
  Copy,
  Twitter,
  Linkedin,
  Facebook,
  CheckCircle,
} from "lucide-react";
import type { Book, ReadingGoal, ReadingStreak } from "@/lib/markdown-books";

interface ReadingSocialProps {
  books: Book[];
  goal: ReadingGoal;
  streak: ReadingStreak;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
}

interface Activity {
  icon: string;
  description: string;
  timestamp: string;
}

export function ReadingSocial({ books, goal, streak }: ReadingSocialProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(
    null
  );

  const completedBooks = books.filter((book) => book.status === "completed");
  const achievements = generateAchievements(books, goal, streak);
  const recentActivity = getRecentActivity(books);

  return (
    <div className="space-y-6">
      {/* Reading Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <CardTitle>Reading Profile</CardTitle>
          </div>
          <CardDescription>
            Share your reading journey with others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              📚
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Lokman&apos;s Reading Journey
            </h3>
            <p className="text-muted-foreground mb-4">
              Passionate developer exploring the world through books
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {completedBooks.length}
                </div>
                <div className="text-sm text-muted-foreground">Books Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {streak.longestStreak}
                </div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {achievements.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Achievements
                </div>
              </div>
            </div>

            <Button onClick={() => setShareDialogOpen(true)} className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share Reading Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <CardTitle>Achievements</CardTitle>
            </div>
            <Badge variant="outline">{achievements.length} unlocked</Badge>
          </div>
          <CardDescription>Milestones in your reading journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onShare={() => {
                  setSelectedAchievement(achievement.id);
                  setShareDialogOpen(true);
                }}
              />
            ))}
          </div>
          {achievements.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Keep reading to unlock achievements!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-500" />
            <CardTitle>Recent Activity</CardTitle>
          </div>
          <CardDescription>Your latest reading updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
            {recentActivity.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  No recent activity. Start reading to see updates here!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        achievement={
          selectedAchievement
            ? achievements.find((a) => a.id === selectedAchievement) || null
            : null
        }
        stats={{
          completedBooks: completedBooks.length,
          streak: streak.longestStreak,
          goal,
        }}
      />
    </div>
  );
}

function AchievementCard({
  achievement,
  onShare,
}: {
  achievement: Achievement;
  onShare: () => void;
}) {
  return (
    <div className="p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{achievement.icon}</div>
          <div>
            <h4 className="font-medium">{achievement.title}</h4>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onShare}
          className="text-xs"
        >
          <Share2 className="h-3 w-3 mr-1" />
          Share
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Unlocked {achievement.unlockedDate}
      </div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
      <div className="mt-1 text-lg">{activity.icon}</div>
      <div className="flex-1">
        <p className="text-sm">{activity.description}</p>
        <div className="text-xs text-muted-foreground mt-1">
          {activity.timestamp}
        </div>
      </div>
    </div>
  );
}

function ShareDialog({
  open,
  onOpenChange,
  achievement,
  stats,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  achievement: Achievement | null;
  stats: { completedBooks: number; streak: number; goal: ReadingGoal };
}) {
  const [copied, setCopied] = useState(false);

  const shareText = achievement
    ? `🎉 Achievement Unlocked: ${achievement.title}! ${achievement.description} #ReadingGoals #BookLover`
    : `📚 My Reading Stats: ${stats.completedBooks} books completed, ${stats.streak}-day streak, ${stats.goal.progress}% goal progress! #ReadingJourney #BookLover`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}&title=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(shareText)}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Achievement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">{shareText}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Share on:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shareUrls.twitter, "_blank")}
                className="w-full"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shareUrls.linkedin, "_blank")}
                className="w-full"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shareUrls.facebook, "_blank")}
                className="w-full"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="w-full"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function generateAchievements(
  books: Book[],
  goal: ReadingGoal,
  streak: ReadingStreak
): Achievement[] {
  const achievements: Achievement[] = [];
  const completedBooks = books.filter((book) => book.status === "completed");

  // First book achievement
  if (completedBooks.length >= 1) {
    achievements.push({
      id: "first-book",
      title: "First Steps",
      description: "Completed your first book!",
      icon: "🎯",
      unlockedDate: "Recently",
    });
  }

  // Reading streak achievements
  if (streak.longestStreak >= 7) {
    achievements.push({
      id: "week-streak",
      title: "Consistent Reader",
      description: "Maintained a 7-day reading streak",
      icon: "🔥",
      unlockedDate: "Recently",
    });
  }

  // Goal progress achievements
  if (goal.progress >= 50) {
    achievements.push({
      id: "halfway-hero",
      title: "Halfway Hero",
      description: "Reached 50% of your reading goal",
      icon: "🏃‍♂️",
      unlockedDate: "Recently",
    });
  }

  if (goal.progress >= 100) {
    achievements.push({
      id: "goal-crusher",
      title: "Goal Crusher",
      description: "Completed your annual reading goal!",
      icon: "🏆",
      unlockedDate: "Recently",
    });
  }

  return achievements;
}

function getRecentActivity(books: Book[]): Activity[] {
  const activities: Activity[] = [];

  // Recent completions
  const recentCompletions = books
    .filter((book) => book.status === "completed" && book.completedDate)
    .sort(
      (a, b) =>
        new Date(b.completedDate!).getTime() -
        new Date(a.completedDate!).getTime()
    )
    .slice(0, 3);

  recentCompletions.forEach((book) => {
    activities.push({
      icon: "✅",
      description: `Finished reading "${book.title}"`,
      timestamp: new Date(book.completedDate!).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
  });

  // Currently reading
  const currentlyReading = books.filter(
    (book) => book.status === "currently-reading"
  );
  currentlyReading.forEach((book) => {
    const progress = ((book.currentPage / book.pages) * 100).toFixed(0);
    activities.push({
      icon: "📖",
      description: `Reading "${book.title}" (${progress}% complete)`,
      timestamp: "Ongoing",
    });
  });

  return activities.slice(0, 5);
}
