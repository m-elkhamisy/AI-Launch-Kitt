import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LogoMark } from "./LogoMark";
import { LogoSvg } from "./LogoSvg";
import { LOGO_GLYPH, LOGO_MARK, LOGO_MARK_GRADIENT, LOGO_WORDMARK } from "./logo-paths";

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

  it("keeps the gradient ramp in user space, spanning past the mark's edge", () => {
    // The mark path stops at x 35.54 but the ramp is defined out to 44.42. If
    // these ever collapse to a 0→1 bounding-box range the mark turns purple too
    // early, which is the kind of change that looks plausible in a diff.
    expect(LOGO_MARK_GRADIENT.x1).toBeCloseTo(8.87992, 5);
    expect(LOGO_MARK_GRADIENT.x2).toBeCloseTo(44.4204, 4);
    expect(LOGO_MARK_GRADIENT.stops).toHaveLength(9);
    expect(LOGO_MARK_GRADIENT.stops[0]).toEqual({ offset: 0, color: "#85D2DB" });
    expect(LOGO_MARK_GRADIENT.stops.at(-1)).toEqual({ offset: 1, color: "#5752A3" });
  });
});

describe("LogoSvg", () => {
  it("renders the mark, the gradient and every wordmark letter", () => {
    const { container } = render(<LogoSvg />);

    expect(screen.getByRole("img", { name: "AI Launch Kit" })).toBeInTheDocument();

    const paths = Array.from(container.querySelectorAll("path"));
    // two mark shapes plus the fourteen letters
    expect(paths).toHaveLength(16);
    for (const path of paths) {
      expect(path.getAttribute("d")).toMatch(/^M[\d.]/);
    }
  });

  it("declares the gradient in user space and points the mark at it", () => {
    const { container } = render(<LogoSvg />);

    const gradient = container.querySelector("linearGradient");
    expect(gradient).not.toBeNull();
    expect(gradient!.getAttribute("gradientUnits")).toBe("userSpaceOnUse");
    expect(gradient!.querySelectorAll("stop")).toHaveLength(9);

    // The fill must reference the id this instance actually generated.
    const id = gradient!.getAttribute("id")!;
    expect(id).toBeTruthy();
    const markPath = container.querySelector("path");
    expect(markPath!.getAttribute("fill")).toBe(`url(#${id})`);
  });
});

describe("LogoMark", () => {
  it("renders only the two mark shapes on the 50x36 canvas", () => {
    const { container } = render(<LogoMark />);

    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("viewBox")).toBe("0 0 50 36");
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });

  it("is decorative unless given a title", () => {
    const { container, unmount } = render(<LogoMark />);
    expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
    unmount();

    render(<LogoMark title="AI Launch Kit" />);
    expect(screen.getByRole("img", { name: "AI Launch Kit" })).toBeInTheDocument();
  });

  it("gives each instance its own gradient id, so two logos cannot collide", () => {
    const { container } = render(
      <>
        <LogoMark />
        <LogoSvg />
      </>,
    );

    const ids = Array.from(container.querySelectorAll("linearGradient")).map((g) => g.id);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    // Every id must be a valid url(#…) fragment — no colons from useId.
    for (const id of ids) {
      expect(id).toMatch(/^[a-zA-Z][a-zA-Z0-9]*$/);
    }
  });
});
