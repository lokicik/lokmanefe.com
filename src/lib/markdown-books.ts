import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export type BookStatus =
  | "want-to-read"
  | "currently-reading"
  | "completed"
  | "paused"
  | "did-not-finish";

export type BookNote = {
  chapter: string;
  title: string;
  date: string;
  content: string;
  renderedContent?: string; // Add pre-rendered HTML
  pageNumbers?: string;
  keyTakeaways?: string[];
};

export type ReadingGoal = {
  year: number;
  targetBooks: number;
  targetPages?: number;
  completedBooks: number;
  completedPages: number;
  progress: number; // percentage
};

export type ReadingChallenge = {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  deadline?: string;
  type: "books" | "pages" | "genres" | "authors";
  completed: boolean;
};

export type ReadingStreak = {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string;
  isActive: boolean;
};

export type BookRecommendation = {
  title: string;
  author: string;
  reason: string;
  confidence: number; // 1-5
  basedOn: string[]; // book titles that influenced this recommendation
};

export type Book = {
  slug: string;
  title: string;
  author: string;
  isbn?: string;
  pages: number;
  currentPage: number;
  status: BookStatus;
  startDate?: string;
  completedDate?: string;
  rating?: number; // 1-5 stars
  description: string;
  disclaimer?: string;
  coverImage?: string;
  tags: string[];
  notes: BookNote[];
  createdAt: Date;
  updatedAt: Date;
  progress: number; // calculated percentage
};

const booksDirectory = path.join(process.cwd(), "content/books");

// Calculate progress percentage
function calculateProgress(currentPage: number, totalPages: number): number {
  if (totalPages === 0) return 0;
  return Math.min(Math.round((currentPage / totalPages) * 100), 100);
}

// Parse book notes from markdown content
async function parseBookNotes(content: string): Promise<BookNote[]> {
  const notes: BookNote[] = [];

  // Split content by chapter headings (## Chapter X or ## Part X)
  const sections = content.split(/^## (Chapter|Part|Section) (.+)$/gm);

  for (let i = 1; i < sections.length; i += 3) {
    const type = sections[i]; // Chapter, Part, Section
    const title = sections[i + 1];
    const noteContent = sections[i + 2] || "";

    // Extract date from the first line if it exists (format: _Date: YYYY-MM-DD_ or *Date: YYYY-MM-DD*)
    const dateMatch = noteContent.match(/^[_*]Date: (\d{4}-\d{2}-\d{2})[_*]/m);
    const date = dateMatch
      ? dateMatch[1]
      : new Date().toISOString().split("T")[0];

    // Extract page numbers (format: _Pages: 123-145_ or *Pages: 123-145*)
    const pageMatch = noteContent.match(/^[_*]Pages: (.+)[_*]/m);
    const pageNumbers = pageMatch ? pageMatch[1] : undefined;

    // Extract key takeaways (format: ### Key Takeaways followed by bullet points)
    const takeawaysMatch = noteContent.match(
      /### Key Takeaways\s*((?:[-*] .+\n?)+)/
    );
    const keyTakeaways = takeawaysMatch
      ? takeawaysMatch[1]
          .split("\n")
          .filter((line) => line.trim())
          .map((line) => line.replace(/^[-*] /, ""))
      : undefined;

    // Render markdown content to HTML
    const renderedContent = await renderMarkdownContent(noteContent.trim());

    notes.push({
      chapter: `${type} ${title}`,
      title: title.trim(),
      date,
      content: noteContent.trim(),
      renderedContent,
      pageNumbers,
      keyTakeaways,
    });
  }

  return notes;
}

export async function getBooks(): Promise<Book[]> {
  try {
    if (!fs.existsSync(booksDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(booksDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const books: Book[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(booksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const slug = fileName.replace(/\.md$/, "");
      const stats = fs.statSync(fullPath);

      const currentPage = data.currentPage || 0;
      const totalPages = data.pageCount || data.pages || 0;
      const progress = calculateProgress(currentPage, totalPages);
      const notes = await parseBookNotes(content);

      books.push({
        slug,
        title: data.title || slug,
        author: data.author || "Unknown Author",
        isbn: data.isbn,
        pages: totalPages,
        currentPage,
        status: data.status || "not-started",
        startDate: data.startDate,
        completedDate: data.completionDate || data.completedDate,
        rating: data.rating,
        description: data.description || "",
        disclaimer: data.disclaimer,
        coverImage: data.coverImage,
        tags: data.tags || [],
        notes,
        createdAt: data.startDate ? new Date(data.startDate) : stats.birthtime,
        updatedAt: stats.mtime,
        progress,
      });
    }

    // Sort by date: completed books by completion date, others by start date
    return books.sort((a, b) => {
      const dateA = a.status === "completed" ? a.completedDate : a.startDate;
      const dateB = b.status === "completed" ? b.completedDate : b.startDate;

      const timeA = dateA ? new Date(dateA).getTime() : 0;
      const timeB = dateB ? new Date(dateB).getTime() : 0;

      // Fallback to createdAt if dates are not available
      if (timeA === 0 && timeB === 0) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }

      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error reading books:", error);
    return [];
  }
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  try {
    const fullPath = path.join(booksDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = fs.statSync(fullPath);

    const currentPage = data.currentPage || 0;
    const totalPages = data.pageCount || data.pages || 0;
    const progress = calculateProgress(currentPage, totalPages);
    const notes = await parseBookNotes(content);

    return {
      slug,
      title: data.title || slug,
      author: data.author || "Unknown Author",
      isbn: data.isbn,
      pages: totalPages,
      currentPage,
      status: data.status || "not-started",
      startDate: data.startDate,
      completedDate: data.completionDate || data.completedDate,
      rating: data.rating,
      description: data.description || "",
      disclaimer: data.disclaimer,
      coverImage: data.coverImage,
      tags: data.tags || [],
      notes,
      createdAt: data.startDate ? new Date(data.startDate) : stats.birthtime,
      updatedAt: stats.mtime,
      progress,
    };
  } catch (error) {
    console.error("Error reading book:", error);
    return null;
  }
}

export async function renderMarkdownContent(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  return result.toString();
}

export function getCurrentlyReading(books: Book[]): Book[] {
  return books.filter((book) => book.status === "currently-reading");
}

export function getCompletedBooks(books: Book[]): Book[] {
  return books.filter((book) => book.status === "completed");
}

export function getBookStats(books: Book[]): {
  totalBooks: number;
  currentlyReading: number;
  completed: number;
  totalPages: number;
  pagesRead: number;
  averageRating: number;
  wantToRead: number;
  paused: number;
  didNotFinish: number;
} {
  const completed = getCompletedBooks(books);
  const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
  const pagesRead = books.reduce((sum, book) => {
    // For completed books, count full page count as pages read
    if (book.status === "completed") {
      return sum + book.pages;
    }
    // For other books, use current page
    return sum + book.currentPage;
  }, 0);

  const ratedBooks = completed.filter((book) => book.rating);
  const averageRating =
    ratedBooks.length > 0
      ? ratedBooks.reduce((sum, book) => sum + (book.rating || 0), 0) /
        ratedBooks.length
      : 0;

  return {
    totalBooks: books.length,
    currentlyReading: getCurrentlyReading(books).length,
    completed: completed.length,
    wantToRead: books.filter((book) => book.status === "want-to-read").length,
    paused: books.filter((book) => book.status === "paused").length,
    didNotFinish: books.filter((book) => book.status === "did-not-finish")
      .length,
    totalPages,
    pagesRead,
    averageRating,
  };
}

// Reading Goals and Analytics
export function calculateReadingGoal(
  books: Book[],
  year: number = new Date().getFullYear()
): ReadingGoal {
  const yearlyBooks = books.filter(
    (book) =>
      book.completedDate && new Date(book.completedDate).getFullYear() === year
  );

  const completedBooks = yearlyBooks.length;
  const completedPages = yearlyBooks.reduce((sum, book) => sum + book.pages, 0);

  // Default target of 12 books per year (1 per month)
  const targetBooks = 12;
  const progress = Math.min((completedBooks / targetBooks) * 100, 100);

  return {
    year,
    targetBooks,
    completedBooks,
    completedPages,
    progress: Math.round(progress),
  };
}

export function calculateReadingStreak(books: Book[]): ReadingStreak {
  const completedBooks = books
    .filter((book) => book.completedDate)
    .sort(
      (a, b) =>
        new Date(b.completedDate!).getTime() -
        new Date(a.completedDate!).getTime()
    );

  if (completedBooks.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastReadDate: "",
      isActive: false,
    };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const lastReadDate = completedBooks[0].completedDate!;
  const daysSinceLastRead = Math.floor(
    (new Date().getTime() - new Date(lastReadDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Calculate streaks (books completed within 7 days of each other)
  for (let i = 0; i < completedBooks.length - 1; i++) {
    const current = new Date(completedBooks[i].completedDate!);
    const next = new Date(completedBooks[i + 1].completedDate!);
    const daysBetween = Math.floor(
      (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysBetween <= 7) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);
  currentStreak = daysSinceLastRead <= 7 ? tempStreak : 0;

  return {
    currentStreak,
    longestStreak,
    lastReadDate,
    isActive: daysSinceLastRead <= 7,
  };
}

export function getGenreDistribution(books: Book[]): {
  [genre: string]: number;
} {
  const genreCount: { [genre: string]: number } = {};

  books.forEach((book) => {
    book.tags.forEach((tag) => {
      genreCount[tag] = (genreCount[tag] || 0) + 1;
    });
  });

  return genreCount;
}

export function getReadingVelocity(books: Book[]): {
  averagePagesPerDay: number;
  averageCompletionTime: number; // days
  fastestRead: { book: Book; days: number } | null;
} {
  const completedBooks = books.filter(
    (book) =>
      book.status === "completed" && book.startDate && book.completedDate
  );

  // If no books have proper start/end dates, provide a reasonable estimate
  if (completedBooks.length === 0) {
    const allCompletedBooks = books.filter(
      (book) => book.status === "completed"
    );
    if (allCompletedBooks.length === 0) {
      return {
        averagePagesPerDay: 0,
        averageCompletionTime: 0,
        fastestRead: null,
      };
    }

    // Calculate based on reading speed (words per minute)
    const totalPages = allCompletedBooks.reduce(
      (sum, book) => sum + book.pages,
      0
    );

    // Reading speed parameters:
    // - Average 250-300 words per page
    // - Your reading speed: 350-2000 words per minute
    // - Reading time: 30-60 minutes per day
    const wordsPerPage = 275; // Average

    // Use moderate reading speed (700 wpm) and 45 min/day reading time
    const readingSpeedWPM = 700; // Middle of your 350-2000 range
    const readingMinutesPerDay = 45;
    const wordsPerDay = readingSpeedWPM * readingMinutesPerDay;
    const pagesPerDay = wordsPerDay / wordsPerPage;

    // Calculate average completion time based on average book size
    const averageBookPages = totalPages / allCompletedBooks.length;
    const averageCompletionDays = Math.round(averageBookPages / pagesPerDay);

    return {
      averagePagesPerDay: Math.round(pagesPerDay),
      averageCompletionTime: averageCompletionDays,
      fastestRead: null,
    };
  }

  let totalPages = 0;
  let totalDays = 0;
  let fastestRead: { book: Book; days: number } | null = null;

  completedBooks.forEach((book) => {
    const startDate = new Date(book.startDate!);
    const endDate = new Date(book.completedDate!);
    const days = Math.max(
      1,
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );

    totalPages += book.pages;
    totalDays += days;

    if (!fastestRead || days < fastestRead.days) {
      fastestRead = { book, days };
    }
  });

  return {
    averagePagesPerDay: Math.round(totalPages / totalDays),
    averageCompletionTime: Math.round(totalDays / completedBooks.length),
    fastestRead,
  };
}

export function generateBookRecommendations(
  books: Book[]
): BookRecommendation[] {
  // Simple recommendation system based on completed books and tags
  const completedBooks = books.filter(
    (book) => book.status === "completed" && book.rating && book.rating >= 4
  );

  // This would typically integrate with an external API, but for now we'll return sample data
  const sampleRecommendations: BookRecommendation[] = [
    {
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Gang of Four",
      reason: "Based on your love for software architecture books",
      confidence: 5,
      basedOn: completedBooks.slice(0, 2).map((book) => book.title),
    },
    {
      title: "Refactoring: Improving the Design of Existing Code",
      author: "Martin Fowler",
      reason: "Perfect follow-up to Clean Code principles",
      confidence: 4,
      basedOn: ["Clean Code"],
    },
  ];

  return sampleRecommendations;
}
