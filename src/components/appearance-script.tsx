import {
  APPEARANCE_PRESETS,
  APPEARANCE_STORAGE_KEYS,
  DEFAULT_APPEARANCE_PRESET_ID,
  DEFAULT_TEXT_SIZE_ID,
  LEGACY_FONT_TO_PRESET,
  LEGACY_SIZE_TO_ID,
  TEXT_SIZES,
} from "@/lib/appearance";

export function AppearanceScript() {
  const presets = Object.fromEntries(
    APPEARANCE_PRESETS.map((preset) => [
      preset.id,
      {
        body: preset.bodyCssVar,
        heading: preset.headingCssVar,
      },
    ])
  );
  const textSizes = Object.fromEntries(
    TEXT_SIZES.map((size) => [size.id, size.scale])
  );

  const script = `
    (() => {
      try {
        const root = document.documentElement;
        const presets = ${JSON.stringify(presets)};
        const textSizes = ${JSON.stringify(textSizes)};
        const keys = ${JSON.stringify(APPEARANCE_STORAGE_KEYS)};
        const legacyFonts = ${JSON.stringify(LEGACY_FONT_TO_PRESET)};
        const legacySizes = ${JSON.stringify(LEGACY_SIZE_TO_ID)};

        let presetId = localStorage.getItem(keys.preset);
        if (!presets[presetId]) {
          presetId = legacyFonts[localStorage.getItem(keys.legacyFont)] || ${JSON.stringify(
            DEFAULT_APPEARANCE_PRESET_ID
          )};
          localStorage.setItem(keys.preset, presetId);
        }

        let textSizeId = localStorage.getItem(keys.textSize);
        if (!textSizes[textSizeId]) {
          textSizeId = legacySizes[localStorage.getItem(keys.legacyTextSize)] || ${JSON.stringify(
            DEFAULT_TEXT_SIZE_ID
          )};
          localStorage.setItem(keys.textSize, textSizeId);
        }

        const preset = presets[presetId];
        root.dataset.appearance = presetId;
        root.dataset.textSize = textSizeId;
        root.style.setProperty("--font-body", "var(" + preset.body + ")");
        root.style.setProperty("--font-heading", "var(" + preset.heading + ")");
        root.style.setProperty("--text-scale", String(textSizes[textSizeId]));
      } catch {}
    })();
  `;

  return (
    <script
      id="appearance-script"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
