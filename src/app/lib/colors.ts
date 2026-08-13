// Fills the rest of a custom palette from its primary colour, so picking one
// swatch is enough. Lifted verbatim from three identical copies inside the
// Colors & Fonts modal — the arithmetic is unchanged and pinned by colors.test.ts.

export type DerivedPalette = { secondary: string; background: string; text: string };

/** Lightens a channel toward white by `weight` (0 = unchanged, 1 = white). */
const mix = (channel: number, weight: number) => Math.round(channel + (255 - channel) * weight);

const toHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

/** Splits a 6-digit hex (leading # optional) into channels; null if malformed. */
export function parseHexChannels(value: string): { r: number; g: number; b: number } | null {
  const hex = value.replace("#", "");
  if (hex.length !== 6) return null;
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

export function derivePaletteFromPrimary(r: number, g: number, b: number): DerivedPalette {
  return {
    secondary: toHex(mix(r, 0.5), mix(g, 0.5), mix(b, 0.5)),
    background: toHex(mix(r, 0.88), mix(g, 0.88), mix(b, 0.88)),
    // Dark text on a light primary, light text on a dark one.
    text: (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.45
      ? toHex(Math.round(r * 0.15), Math.round(g * 0.15), Math.round(b * 0.15))
      : toHex(mix(r, 0.92), mix(g, 0.92), mix(b, 0.92)),
  };
}
