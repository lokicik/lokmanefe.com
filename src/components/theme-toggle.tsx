"use client";

import * as React from "react";
import { Moon, Sun, Palette, Monitor, Droplets } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="z-[51] w-36 p-1" sideOffset={8}>
        <div className="space-y-1">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <Button
                key={themeOption.value}
                variant={theme === themeOption.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => {
                  setTheme(themeOption.value);
                  setIsOpen(false);
                }}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{themeOption.name}</span>
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
