import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { mockReducedMotion, runAnimationFramesImmediately } from "../../../test/reduced-motion";
import { ShowcaseSlideView } from "./ShowcaseSlideView";
import { SHOWCASE_SLIDES } from "./showcase-slides";

// The website slide is the flat-image case; the portfolio slide is the rebuilt one.
const IMAGE_SLIDE = SHOWCASE_SLIDES[0]!;
const PDF_SLIDE = SHOWCASE_SLIDES[1]!;

/**
 * Every element the panel fades in, so none of them can be left invisible.
 *
 * Selected by carrying an inline opacity *and* transform, which is exactly what
 * `riseIn` sets and nothing else in the panel does — the texture, the subcopy and
 * the stat captions all hold a fixed opacity of their own and must be left out.
 */
function entranceElements(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>("[style*='opacity']")].filter(
    (element) => element.style.opacity !== "" && element.style.transform !== "",
  );
}

describe("ShowcaseSlideView", () => {
  it("renders the flat mockup for an image slide", () => {
    render(<ShowcaseSlideView slide={IMAGE_SLIDE} active />);

    expect(screen.getByAltText(IMAGE_SLIDE.mockupAlt)).toBeInTheDocument();
  });

  it("renders the rebuilt viewer for a slide that carries its pages", () => {
    render(<ShowcaseSlideView slide={PDF_SLIDE} active />);

    // The rebuilt viewer takes the alt as its own label rather than as an <img>.
    expect(screen.getByRole("img", { name: PDF_SLIDE.mockupAlt })).toBeInTheDocument();
    if (PDF_SLIDE.mockup.kind !== "pdf") throw new Error("expected the pdf mockup");
    expect(screen.getByText(PDF_SLIDE.mockup.fileName)).toBeInTheDocument();
  });

  it("ends its entrance fully visible", () => {
    const frames = runAnimationFramesImmediately();
    try {
      const { container } = render(<ShowcaseSlideView slide={IMAGE_SLIDE} active />);

      const faded = entranceElements(container);
      // Guards the failure this animation could introduce: a panel that never
      // finishes its entrance is a blank slide, not a subtle effect.
      expect(faded.length).toBeGreaterThan(0);
      for (const element of faded) {
        expect(element.style.opacity).toBe("1");
      }
    } finally {
      frames.restore();
    }
  });

  it("renders an unselected slide invisible, ready to enter when it is reached", () => {
    const { container } = render(<ShowcaseSlideView slide={IMAGE_SLIDE} active={false} />);

    const faded = entranceElements(container);
    expect(faded.length).toBeGreaterThan(0);
    for (const element of faded) {
      expect(element.style.opacity).toBe("0");
    }
  });

  it("shows every element immediately under reduced motion", () => {
    const media = mockReducedMotion(true);
    try {
      // Not even the unselected case may hide anything: with no entrance to play,
      // an element left at opacity 0 would never be shown at all.
      const { container } = render(<ShowcaseSlideView slide={IMAGE_SLIDE} active={false} />);

      for (const element of entranceElements(container)) {
        expect(element.style.opacity).toBe("1");
      }
    } finally {
      media.restore();
    }
  });
});
