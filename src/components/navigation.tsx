"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppearancePicker } from "@/components/appearance-picker";
import { Button } from "@/components/ui/button";
import { ParrotIcon } from "@/components/parrot-icon";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/reading", label: "Reading" },
  { href: "/#projects", label: "Projects" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Lokman Efe, home"
            className="text-2xl font-bold flex-shrink-0 flex items-center"
          >
            <ParrotIcon size={32} className="text-primary" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : !link.href.includes("#") &&
                      pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-10 items-center px-1 text-sm font-medium transition-colors hover:text-primary",
                      isActive &&
                        "text-primary after:absolute after:inset-x-1 after:bottom-0 after:h-px after:bg-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="h-10 w-10 p-0"
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
          <div id="mobile-navigation" className="md:hidden border-t">
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
