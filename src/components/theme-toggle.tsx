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

const themes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "Blue", value: "blue", icon: Droplets },
  { name: "Sepia", value: "sepia", icon: Palette },
  { name: "Soft Dark", value: "soft-dark", icon: Moon },
  { name: "System", value: "system", icon: Monitor },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }

  const selectedTheme =
    themes.find((themeOption) => themeOption.value === theme) ?? themes[5];
  const CurrentThemeIcon = selectedTheme.icon;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0 transition-transform active:scale-[0.96]"
        >
          <CurrentThemeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Theme: {selectedTheme.name}</span>
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
                className="min-h-10 w-full justify-start transition-transform active:scale-[0.96]"
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
