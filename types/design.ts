/**
 * Look-and-feel choices, asked once and applied across the whole site
 * regardless of which generation mode builds it. Kept separate from
 * OnboardingFormData because these render as pill/button pickers rather
 * than free text.
 */
export interface DesignPrefs {
  tagline: string;
  style: string;
  palette: string;
  fonts: string;
  animation: string;
  /** Light mode, dark mode, or both with a working toggle — drives the
   * THEME IMPLEMENTATION block in the page-build prompts. */
  theme: string;
  cta: string;
  imageSource: "pexels" | "ai" | "uploaded" | "placeholder";
}

export const STYLE_OPTIONS = [
  "Luxury / elegant",
  "Modern / minimal",
  "Bold / playful",
  "Corporate / professional",
  "Warm / organic",
  "Dark / premium tech",
] as const;

export const PALETTE_OPTIONS = [
  "Warm cream & gold",
  "Navy & cyan",
  "Black & white minimal",
  "Earthy greens & browns",
  "Pastel & soft",
  "Let the AI choose to fit the brand",
] as const;

export const FONT_OPTIONS = [
  "Elegant serif headings",
  "Clean modern sans",
  "Bold display + sans",
  "Let the AI choose",
] as const;

export const ANIMATION_OPTIONS = [
  "None (static)",
  "Subtle (gentle fades on scroll)",
  "Medium (hover effects + scroll reveals)",
  "High (rich motion everywhere)",
] as const;

export const THEME_OPTIONS = [
  "Light mode",
  "Dark mode",
  "Light + dark (theme toggle)",
] as const;

export const EMPTY_DESIGN_PREFS: DesignPrefs = {
  tagline: "",
  style: STYLE_OPTIONS[1],
  palette: PALETTE_OPTIONS[5],
  fonts: FONT_OPTIONS[3],
  animation: ANIMATION_OPTIONS[2],
  theme: THEME_OPTIONS[0],
  cta: "",
  imageSource: "placeholder",
};
