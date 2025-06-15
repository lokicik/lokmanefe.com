import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { FontPicker } from "@/components/font-picker";
import { FontSizePicker } from "@/components/font-size-picker";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            △
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Blog
            </Link>
            <FontSizePicker />
            <FontPicker />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
