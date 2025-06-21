"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type {
  ReadingGoal,
  ReadingChallenge,
  ReadingStreak,
} from "@/lib/markdown-books";

interface ReadingGoalsProps {
  goal: ReadingGoal;
  streak: ReadingStreak;
  challenges: ReadingChallenge[];
}

export function ReadingGoals({ goal, streak, challenges }: ReadingGoalsProps) {
  const [showChallenges, setShowChallenges] = useState(false);

  const currentYear = new Date().getFullYear();
  const daysInYear = new Date(currentYear, 11, 31).getDate() === 31 ? 366 : 365;
  const currentDayOfYear =
    Math.floor(
      (new Date().getTime() - new Date(currentYear, 0, 1).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;
  const yearProgress = (currentDayOfYear / daysInYear) * 100;

  const isAheadOfSchedule = goal.progress > yearProgress;
  const booksPerMonth = goal.targetBooks / 12;
  const currentMonth = new Date().getMonth() + 1;
  const expectedBooks = Math.floor(booksPerMonth * currentMonth);

  return (
    <div className="space-y-6">
      {/* Main Goal Card */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {goal.year} Reading Goal
              </CardTitle>
            </div>
            <Badge variant={isAheadOfSchedule ? "default" : "secondary"}>
              {isAheadOfSchedule ? "Ahead" : "On Track"}
            </Badge>
          </div>
          <CardDescription>
            {goal.completedBooks} of {goal.targetBooks} books completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-muted-foreground">
              <span>
                Expected by now:{" "}
                <strong className="text-foreground">{expectedBooks}</strong>
              </span>
            </div>
            <div className="text-muted-foreground">
              <span>
                Avg/month:{" "}
                <strong className="text-foreground">
                  {booksPerMonth.toFixed(1)}
                </strong>
              </span>
            </div>
          </div>

          {goal.completedPages && (
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                <span>
                  Total pages read:{" "}
                  <strong className="text-foreground">
                    {goal.completedPages.toLocaleString()}
                  </strong>
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reading Streak */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Reading Streak</CardTitle>
            </div>
            <Badge variant={streak.isActive ? "default" : "secondary"}>
              {streak.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <CardDescription>Keep the momentum going!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{streak.currentStreak}</div>
              <div className="text-sm text-muted-foreground">
                Current Streak
              </div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{streak.longestStreak}</div>
              <div className="text-sm text-muted-foreground">
                Longest Streak
              </div>
            </div>
          </div>
          {streak.lastReadDate && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                <span>
                  Last completed:{" "}
                  <strong className="text-foreground">
                    {new Date(streak.lastReadDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </strong>
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reading Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Reading Challenges</CardTitle>
            </div>
            <Dialog open={showChallenges} onOpenChange={setShowChallenges}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View All ({challenges.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>All Reading Challenges</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {challenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Personal challenges to enhance your reading journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {challenges.slice(0, 3).map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} compact />
            ))}
            {challenges.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No active challenges. Set some goals to track your progress!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChallengeCard({
  challenge,
  compact = false,
}: {
  challenge: ReadingChallenge;
  compact?: boolean;
}) {
  const progress = (challenge.currentCount / challenge.targetCount) * 100;
  const isCompleted = challenge.completed;
  const isOverdue =
    challenge.deadline &&
    new Date(challenge.deadline) < new Date() &&
    !isCompleted;

  return (
    <div
      className={`p-4 rounded-lg border ${
        isCompleted
          ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
          : isOverdue
          ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
          : "bg-muted/50"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className={`font-medium ${compact ? "text-sm" : "text-base"}`}>
            {challenge.title}
          </h4>
          {!compact && (
            <p className="text-sm text-muted-foreground mt-1">
              {challenge.description}
            </p>
          )}
        </div>
        <Badge
          variant={
            isCompleted ? "default" : isOverdue ? "destructive" : "secondary"
          }
        >
          {isCompleted
            ? "✅ Completed"
            : isOverdue
            ? "⏰ Overdue"
            : "🎯 Active"}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">
            {challenge.currentCount} / {challenge.targetCount} {challenge.type}
          </span>
        </div>
        <Progress value={Math.min(progress, 100)} className="h-2" />

        {challenge.deadline && (
          <div className="text-xs text-muted-foreground">
            Deadline:{" "}
            {new Date(challenge.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </div>
  );
}
