"use client";

import * as React from "react";
import { Moon, Sun, Palette, Monitor, Droplets } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Ensure component is mounted before rendering
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent layout shifts when dropdown opens
  React.useEffect(() => {
    if (isOpen) {
      // Store original body width to prevent shifts
      const originalWidth = document.body.style.width;
      const bodyWidth = document.body.offsetWidth;
      document.body.style.width = `${bodyWidth}px`;

      return () => {
        // Restore original width
        document.body.style.width = originalWidth;
      };
    }
  }, [isOpen]);

  const themes = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "Blue", value: "blue", icon: Droplets },
    { name: "Sepia", value: "sepia", icon: Palette },
    { name: "Soft Dark", value: "soft-dark", icon: Moon },
    { name: "System", value: "system", icon: Monitor },
  ];

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[60] min-w-[140px]"
        sideOffset={8}
        avoidCollisions={false}
        side="bottom"
        alignOffset={-4}
        collisionPadding={16}
      >
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={theme === themeOption.value ? "bg-accent" : ""}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{themeOption.name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
