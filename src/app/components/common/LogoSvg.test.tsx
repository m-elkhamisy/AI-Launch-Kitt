import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LogoSvg } from "./LogoSvg";
import { LOGO_GLYPH, LOGO_MARK, LOGO_WORDMARK } from "./logo-paths";

// The brand marks are the only Figma path data left; every other icon is a
// lucide component. A missing key would render <path d={undefined} /> without
// throwing, so assert the geometry is actually there.

describe("logo path data", () => {
  it("carries the full wordmark", () => {
    expect(LOGO_WORDMARK).toHaveLength(14);
    for (const d of LOGO_WORDMARK) {
      expect(d).toMatch(/^M[\d.]/);
    }
  });

  it("carries the mark and the compact glyph", () => {
    for (const d of [...Object.values(LOGO_MARK), ...Object.values(LOGO_GLYPH)]) {
      expect(d).toMatch(/^M[\d.]/);
    }
  });
});

describe("LogoSvg", () => {
  it("renders the mark, the gradient and every wordmark letter", () => {
    const { container } = render(<LogoSvg />);

    expect(screen.getByRole("img", { name: "AI Launch Kit" })).toBeInTheDocument();
    expect(container.querySelector("linearGradient#logoGrad")).not.toBeNull();

    const paths = Array.from(container.querySelectorAll("path"));
    // two mark shapes plus the fourteen letters
    expect(paths).toHaveLength(16);
    for (const path of paths) {
      expect(path.getAttribute("d")).toMatch(/^M[\d.]/);
    }
  });
});
