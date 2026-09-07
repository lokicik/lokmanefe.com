"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href === "/#projects") {
      return pathname === "/" && activeHash === "#projects";
    }
    if (href === "/") {
      return pathname === "/" && activeHash !== "#projects";
    }
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    cn(
      "relative flex min-h-11 items-center rounded-sm px-1 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      isLinkActive(href) &&
        "text-primary after:absolute after:inset-x-1 after:bottom-0 after:h-px after:bg-primary"
    );

  return (
    <nav
      aria-label="Primary navigation"
      className="site-navigation sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75"
    >
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="Lokman Efe, home"
            className="touch-target flex shrink-0 items-center justify-center rounded-sm text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ParrotIcon size={32} />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isLinkActive(link.href) ? "page" : undefined}
                  className={navLinkClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 border-l pl-4">
              <AppearancePicker />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <Link href="/#projects" className={navLinkClass("/#projects")}>
              Projects
            </Link>
            <AppearancePicker />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              className="touch-target"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="border-t pb-3 pt-2 md:hidden">
            {navLinks
              .filter((link) => link.href !== "/#projects")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isLinkActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-md px-3 text-base font-medium transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isLinkActive(link.href) && "bg-muted text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
}
