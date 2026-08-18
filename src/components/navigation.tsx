"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppearancePicker } from "@/components/appearance-picker";
import { Button } from "@/components/ui/button";
import { ParrotIcon } from "@/components/parrot-icon";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold flex-shrink-0 flex items-center"
          >
            <ParrotIcon size={32} className="text-primary" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/writing"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Writing
              </Link>
              <Link
                href="/reading"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Reading
              </Link>
              <Link
                href="/#projects"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Projects
              </Link>
            </div>

            <div className="flex items-center space-x-2 border-l pl-4">
              <AppearancePicker />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/#projects"
              className="inline-flex min-h-10 items-center px-1 text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </Link>
            <AppearancePicker />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/writing"
                className="block px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Writing
              </Link>
              <Link
                href="/reading"
                className="block px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reading
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
