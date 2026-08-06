import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { mockReducedMotion, runAnimationFramesImmediately } from "../../../test/reduced-motion";
import { ShowcaseSlideView } from "./ShowcaseSlideView";
import { SHOWCASE_SLIDES } from "./showcase-slides";

// One slide per mockup kind, so the panel's dispatch is covered end to end.
const WEBSITE_SLIDE = SHOWCASE_SLIDES[0]!;
const PDF_SLIDE = SHOWCASE_SLIDES[1]!;
const BROCHURE_SLIDE = SHOWCASE_SLIDES[2]!;

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
  it("renders the website mockup with its nav re-rendered over the export", () => {
    render(<ShowcaseSlideView slide={WEBSITE_SLIDE} active />);

    expect(screen.getByRole("img", { name: WEBSITE_SLIDE.mockupAlt })).toBeInTheDocument();
    // The nav labels are ours, not the export's — this is what lets one sweep.
    for (const label of ["Home", "About", "Portfolio", "Blog", "Contact"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("renders the brochure viewer for the slide that carries its spreads", () => {
    render(<ShowcaseSlideView slide={BROCHURE_SLIDE} active />);

    expect(screen.getByRole("img", { name: BROCHURE_SLIDE.mockupAlt })).toBeInTheDocument();
    if (BROCHURE_SLIDE.mockup.kind !== "brochure") throw new Error("expected the brochure mockup");
    expect(screen.getByText(BROCHURE_SLIDE.mockup.fileName)).toBeInTheDocument();
    expect(screen.getByText(BROCHURE_SLIDE.mockup.fileMeta)).toBeInTheDocument();
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
      const { container } = render(<ShowcaseSlideView slide={WEBSITE_SLIDE} active />);

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
    const { container } = render(<ShowcaseSlideView slide={WEBSITE_SLIDE} active={false} />);

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
      const { container } = render(<ShowcaseSlideView slide={WEBSITE_SLIDE} active={false} />);

      for (const element of entranceElements(container)) {
        expect(element.style.opacity).toBe("1");
      }
    } finally {
      media.restore();
    }
  });
});
