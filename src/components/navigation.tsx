import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { FontPicker } from "@/components/font-picker";
import { FontSizePicker } from "@/components/font-size-picker";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          <Link
            href="/"
            className="text-2xl font-bold flex-shrink-0 min-w-[2rem]"
          >
            △
          </Link>

          <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap min-w-[3rem] text-center"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap min-w-[2.5rem] text-center"
              >
                Blog
              </Link>
            </div>

            <div className="flex items-center space-x-2 border-l pl-4 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <FontSizePicker />
                <FontPicker />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
