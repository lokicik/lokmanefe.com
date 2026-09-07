"use client";

import * as React from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  APPEARANCE_PRESETS,
  APPEARANCE_STORAGE_KEYS,
  DEFAULT_APPEARANCE_PRESET_ID,
  DEFAULT_TEXT_SIZE_ID,
  TEXT_SIZES,
  isAppearancePresetId,
  isTextSizeId,
  type AppearancePresetId,
  type TextSizeId,
} from "@/lib/appearance";

function applyPreset(presetId: AppearancePresetId) {
  const preset = APPEARANCE_PRESETS.find((item) => item.id === presetId);
  if (!preset) return;

  const root = document.documentElement;
  root.dataset.appearance = presetId;
  root.style.setProperty("--font-body", `var(${preset.bodyCssVar})`);
  root.style.setProperty("--font-heading", `var(${preset.headingCssVar})`);
  localStorage.setItem(APPEARANCE_STORAGE_KEYS.preset, presetId);
}

function applyTextSize(textSizeId: TextSizeId) {
  const textSize = TEXT_SIZES.find((item) => item.id === textSizeId);
  if (!textSize) return;

  const root = document.documentElement;
  root.dataset.textSize = textSizeId;
  root.style.setProperty("--text-scale", String(textSize.scale));
  localStorage.setItem(APPEARANCE_STORAGE_KEYS.textSize, textSizeId);
}

export function AppearancePicker() {
  const [selectedPresetId, setSelectedPresetId] =
    React.useState<AppearancePresetId>(DEFAULT_APPEARANCE_PRESET_ID);
  const [selectedSizeId, setSelectedSizeId] =
    React.useState<TextSizeId>(DEFAULT_TEXT_SIZE_ID);

  React.useEffect(() => {
    const root = document.documentElement;
    const storedPreset = localStorage.getItem(APPEARANCE_STORAGE_KEYS.preset);
    const storedSize = localStorage.getItem(APPEARANCE_STORAGE_KEYS.textSize);
    const initialPreset = root.dataset.appearance ?? null;
    const initialSize = root.dataset.textSize ?? null;

    if (isAppearancePresetId(storedPreset)) {
      setSelectedPresetId(storedPreset);
    } else if (isAppearancePresetId(initialPreset)) {
      setSelectedPresetId(initialPreset);
    }

    if (isTextSizeId(storedSize)) {
      setSelectedSizeId(storedSize);
    } else if (isTextSizeId(initialSize)) {
      setSelectedSizeId(initialSize);
    }

  }, []);

  const selectedSizeIndex = TEXT_SIZES.findIndex(
    (option) => option.id === selectedSizeId
  );
  const selectedSize = TEXT_SIZES[selectedSizeIndex] ?? TEXT_SIZES[1];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="touch-target transition-transform active:scale-[0.96]"
          aria-label="Text appearance"
        >
          <span aria-hidden="true" className="text-sm font-semibold tracking-tight">
            Aa
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        collisionPadding={8}
        className="appearance-popover z-[51] w-72 rounded-lg p-3 shadow-lg"
      >
        <div className="mb-3">
          <p className="text-sm font-semibold">Appearance</p>
          <p className="text-xs text-muted-foreground">
            Reading and headings
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Typeface</p>
          <div className="grid grid-cols-2 gap-2">
            {APPEARANCE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-label={`${preset.name} typeface preset`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    applyPreset(preset.id);
                  }}
                  style={{ fontFamily: `var(${preset.bodyCssVar})` }}
                  className={`flex min-h-11 items-center justify-between rounded-md border px-3 text-left text-sm transition-[background-color,border-color,transform] active:scale-[0.96] ${
                    isSelected
                      ? "border-primary/50 bg-accent"
                      : "border-border/70 hover:bg-accent/60"
                  }`}
                >
                  <span>{preset.label}</span>
                  <Check
                    aria-hidden="true"
                    className={`ml-2 h-3.5 w-3.5 shrink-0 transition-opacity ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Text size</p>
          <div className="flex items-center justify-between rounded-md border border-border/70 p-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Decrease text size"
              onClick={() => {
                const previous = TEXT_SIZES[selectedSizeIndex - 1];
                if (!previous) return;
                setSelectedSizeId(previous.id);
                applyTextSize(previous.id);
              }}
              disabled={selectedSizeIndex <= 0}
              className="touch-target transition-transform active:scale-[0.96]"
            >
              <Minus aria-hidden="true" className="h-4 w-4" />
            </Button>
            <span
              aria-live="polite"
              className="min-w-24 text-center text-sm font-medium tabular-nums"
            >
              {selectedSize.name} · {selectedSize.pixels}px
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Increase text size"
              onClick={() => {
                const next = TEXT_SIZES[selectedSizeIndex + 1];
                if (!next) return;
                setSelectedSizeId(next.id);
                applyTextSize(next.id);
              }}
              disabled={selectedSizeIndex >= TEXT_SIZES.length - 1}
              className="touch-target transition-transform active:scale-[0.96]"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
