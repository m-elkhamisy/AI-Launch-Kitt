import { describe, expect, it } from "vitest";

import { derivePaletteFromPrimary, parseHexChannels } from "./colors";

describe("parseHexChannels", () => {
  it("accepts a 6-digit hex with or without the leading hash", () => {
    expect(parseHexChannels("#6fccdd")).toEqual({ r: 0x6f, g: 0xcc, b: 0xdd });
    expect(parseHexChannels("6fccdd")).toEqual({ r: 0x6f, g: 0xcc, b: 0xdd });
  });

  it("rejects anything that is not six digits", () => {
    expect(parseHexChannels("#6fc")).toBeNull();
    expect(parseHexChannels("")).toBeNull();
    expect(parseHexChannels("#6fccddee")).toBeNull();
  });
});

describe("derivePaletteFromPrimary", () => {
  // Values recomputed independently from the expressions in the pre-extraction
  // App.tsx (commit e4dd0ed), so the three inlined copies and this shared one
  // are provably the same function.
  it("derives the palette for a light primary", () => {
    expect(derivePaletteFromPrimary(0x6f, 0xcc, 0xdd)).toEqual({
      secondary: "#b7e6ee",
      background: "#eef9fb",
      text: "#111f21",
    });
  });

  it("derives the palette for a dark primary", () => {
    expect(derivePaletteFromPrimary(0x25, 0x63, 0xeb)).toEqual({
      secondary: "#92b1f5",
      background: "#e5ecfd",
      text: "#eef3fd",
    });
  });

  it("flips text dark once the primary is bright enough", () => {
    expect(derivePaletteFromPrimary(0xff, 0xff, 0xff).text).toBe("#262626");
    expect(derivePaletteFromPrimary(0x00, 0x00, 0x00).text).toBe("#ebebeb");
  });
});
