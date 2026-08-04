import { describe, expect, it } from "vitest";

import { SHOWCASE_SLIDES } from "./showcase-slides";

// The copy and figures below are transcribed from the Figma frames and restated
// in spec.md FR-008/FR-009. Asserting them here is what stops a typo in the
// panel from passing review — nothing else in the suite reads this text.
const EXPECTED = [
  {
    id: "website",
    accent: "#e99041",
    badgeLabel: "AI-Powered Design Builder",
    headline: "Launch a professional website in minutes",
    subcopy:
      "Generate a complete, responsive website tailored to your business, ready to customize and publish.",
    stats: [
      ["5 min", "Average generation"],
      ["50+", "Unique styles"],
      ["100%", "Responsive & SEO"],
      ["Trusted by 2,000+ clients", "4.9/5 average rating"],
    ],
  },
  {
    id: "portfolio",
    accent: "#847eda",
    badgeLabel: "AI Portfolio Builder",
    headline: "Professional portfolio. Instantly yours.",
    subcopy:
      "AI creates a polished PDF portfolio that showcases your services, projects, and expertise in a clear, professional format.",
    stats: [
      ["50+", "Professional layouts"],
      ["100%", "Brand matched"],
      ["1 click", "Export as PDF"],
      ["Trusted by 2,000+ clients", "4.9/5 average rating"],
    ],
  },
  {
    id: "brochure",
    accent: "#6fc074",
    badgeLabel: "AI Brochure Generator",
    headline: "Create a brochure that sells your business",
    subcopy:
      "Generate a professional brochure with your services, branding, and contact details, ready to print or share digitally.",
    stats: [
      ["100%", "Ready for print"],
      ["PDF export", "Download & share"],
      ["Your Style", "Matches your brand"],
      ["Trusted by 2,000+ clients", "4.9/5 average rating"],
    ],
  },
] as const;

describe("SHOWCASE_SLIDES", () => {
  it("holds exactly three slides in website, portfolio, brochure order", () => {
    expect(SHOWCASE_SLIDES.map((slide) => slide.id)).toEqual([
      "website",
      "portfolio",
      "brochure",
    ]);
  });

  it("gives every slide a unique id and accent", () => {
    expect(new Set(SHOWCASE_SLIDES.map((s) => s.id)).size).toBe(SHOWCASE_SLIDES.length);
    expect(new Set(SHOWCASE_SLIDES.map((s) => s.accent)).size).toBe(SHOWCASE_SLIDES.length);
  });

  it("spells every accent as lowercase hex", () => {
    for (const slide of SHOWCASE_SLIDES) {
      expect(slide.accent, slide.id).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("leaves no text or asset field empty", () => {
    for (const slide of SHOWCASE_SLIDES) {
      for (const field of ["badgeLabel", "headline", "subcopy", "mockupSrc", "mockupAlt", "textureSrc"] as const) {
        expect(slide[field].trim(), `${slide.id}.${field}`).not.toBe("");
      }
      // lucide icons are forwardRef components, so they are objects rather than
      // plain functions — assert renderability, not a specific typeof.
      expect(slide.BadgeIcon, slide.id).toBeTruthy();
      expect(typeof slide.BadgeIcon, slide.id).not.toBe("string");
    }
  });

  it("describes the capability in each mockup alt rather than the file", () => {
    for (const slide of SHOWCASE_SLIDES) {
      expect(slide.mockupAlt, slide.id).not.toMatch(/\.png|mockup|image/i);
      expect(slide.mockupAlt.length, slide.id).toBeGreaterThan(20);
    }
  });

  it("carries four stats per slide with the rating on the last one only", () => {
    for (const slide of SHOWCASE_SLIDES) {
      expect(slide.stats, slide.id).toHaveLength(4);
      expect(slide.stats.filter((stat) => stat.rating), slide.id).toHaveLength(1);
      expect(slide.stats[3]?.rating, slide.id).toBe(true);
      for (const stat of slide.stats) {
        expect(stat.value.trim(), slide.id).not.toBe("");
        expect(stat.caption.trim(), slide.id).not.toBe("");
      }
    }
  });

  it("matches the copy and figures recorded in the specification", () => {
    expect(SHOWCASE_SLIDES).toHaveLength(EXPECTED.length);
    EXPECTED.forEach((expected, index) => {
      const slide = SHOWCASE_SLIDES[index]!;
      expect(slide.id).toBe(expected.id);
      expect(slide.accent).toBe(expected.accent);
      expect(slide.badgeLabel).toBe(expected.badgeLabel);
      expect(slide.headline).toBe(expected.headline);
      expect(slide.subcopy).toBe(expected.subcopy);
      expect(slide.stats.map((stat) => [stat.value, stat.caption])).toEqual(
        expected.stats.map((stat) => [...stat]),
      );
    });
  });

  it("is frozen, so no consumer can reorder or mutate the set", () => {
    expect(Object.isFrozen(SHOWCASE_SLIDES)).toBe(true);
  });
});
