export const APPEARANCE_PRESETS = [
  {
    id: "default",
    name: "Default",
    label: "Default",
    bodyCssVar: "--font-inter",
    headingCssVar: "--font-space-grotesk",
  },
  {
    id: "space",
    name: "Space Grotesk",
    label: "Space",
    bodyCssVar: "--font-space-grotesk",
    headingCssVar: "--font-space-grotesk",
  },
  {
    id: "merri",
    name: "Merriweather",
    label: "Merri",
    bodyCssVar: "--font-merriweather",
    headingCssVar: "--font-space-grotesk",
  },
  {
    id: "code",
    name: "Source Code Pro",
    label: "Code",
    bodyCssVar: "--font-source-code",
    headingCssVar: "--font-space-grotesk",
  },
  {
    id: "playfair",
    name: "Playfair headings",
    label: "Playfair",
    bodyCssVar: "--font-inter",
    headingCssVar: "--font-playfair",
  },
] as const;

export type AppearancePresetId = (typeof APPEARANCE_PRESETS)[number]["id"];

export const TEXT_SIZES = [
  { id: "small", name: "Small", pixels: 15, scale: 0.9375 },
  { id: "normal", name: "Normal", pixels: 16, scale: 1 },
  { id: "large", name: "Large", pixels: 18, scale: 1.125 },
  { id: "extra-large", name: "Extra Large", pixels: 20, scale: 1.25 },
] as const;

export type TextSizeId = (typeof TEXT_SIZES)[number]["id"];

export const APPEARANCE_STORAGE_KEYS = {
  preset: "appearance-preset",
  textSize: "text-size",
  legacyFont: "selected-font",
  legacyTextSize: "selected-font-size",
} as const;

export const DEFAULT_APPEARANCE_PRESET_ID: AppearancePresetId = "default";
export const DEFAULT_TEXT_SIZE_ID: TextSizeId = "normal";

export const LEGACY_FONT_TO_PRESET: Record<string, AppearancePresetId> = {
  inter: "default",
  "space-grotesk": "space",
  merriweather: "merri",
  "source-code": "code",
  playfair: "playfair",
};

export const LEGACY_SIZE_TO_ID: Record<string, TextSizeId> = {
  "14px": "small",
  "15px": "small",
  "16px": "normal",
  "18px": "large",
  "20px": "extra-large",
};

export function isAppearancePresetId(
  value: string | null
): value is AppearancePresetId {
  return APPEARANCE_PRESETS.some((preset) => preset.id === value);
}

export function isTextSizeId(value: string | null): value is TextSizeId {
  return TEXT_SIZES.some((size) => size.id === value);
}
