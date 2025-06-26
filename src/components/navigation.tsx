"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FontPicker } from "@/components/font-picker";
import { FontSizePicker } from "@/components/font-size-picker";
import { Button } from "@/components/ui/button";
import { ParrotIcon } from "@/components/parrot-icon";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/reading"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Reading
              </Link>
            </div>

            <div className="flex items-center space-x-2 border-l pl-4">
              <FontSizePicker />
              <FontPicker />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
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
                href="/blog"
                className="block px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/reading"
                className="block px-3 py-2 text-base font-medium transition-colors hover:text-primary hover:bg-muted rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reading
              </Link>

              {/* Mobile settings */}
              <div className="px-3 py-2 space-y-3 border-t mt-2 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Font Size</span>
                  <FontSizePicker />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Font Family</span>
                  <FontPicker />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
