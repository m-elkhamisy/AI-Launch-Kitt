import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mockReducedMotion, runAnimationFramesImmediately } from "../../../test/reduced-motion";
import { PdfViewerMockup } from "./PdfViewerMockup";
import type { ShowcasePage } from "./showcase-slides";

const PAGES: readonly ShowcasePage[] = [
  { src: "/page-1.webp", label: "1" },
  { src: "/page-2.webp", label: "2" },
  { src: "/page-3.webp", label: "3" },
  { src: "/page-4.webp", label: "4" },
  { src: "/page-5.webp", label: "5" },
];

const ALT = "A generated PDF portfolio open in a document viewer";
const PAGE_INTERVAL_MS = 2400;

function renderViewer(active = true) {
  return render(
    <PdfViewerMockup
      fileName="Sample_Portfolio_2025.pdf"
      pages={PAGES}
      alt={ALT}
      active={active}
    />,
  );
}

// jsdom normalises some colour values in inline styles, so accept either spelling
// of the brand teal rather than pinning the assertion to one of them.
function isRinged(element: Element): boolean {
  const style = element.getAttribute("style") ?? "";
  return style.includes("6fccdd") || style.includes("111, 204, 221");
}

/** The rail's thumbnail boxes, in page order — the only elements given an outline. */
function thumbnails(container: HTMLElement): Element[] {
  return [...container.querySelectorAll("[style*='outline']")];
}

function ringedIndex(container: HTMLElement): number {
  return thumbnails(container).findIndex(isRinged);
}

describe("PdfViewerMockup", () => {
  beforeEach(() => {
    // The viewer turns its own pages on an interval, so every assertion about
    // which page is open needs the clock under test control.
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("stands in for the capability as a single labelled image", () => {
    renderViewer();

    // One image role for the whole window: the pages and chrome inside are
    // decoration, so a screen reader gets the capability, not ten page scans.
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAccessibleName(ALT);
  });

  it("names the document in its title bar", () => {
    renderViewer();

    expect(screen.getByText("Sample_Portfolio_2025.pdf")).toBeInTheDocument();
  });

  it("renders every page twice — once open, once in the rail", () => {
    const { container } = renderViewer();

    const sources = [...container.querySelectorAll("img")].map((img) => img.getAttribute("src"));
    for (const page of PAGES) {
      expect(sources.filter((src) => src === page.src)).toHaveLength(2);
    }
  });

  it("numbers the rail in page order", () => {
    const { container } = renderViewer();

    const labels = [...container.querySelectorAll("span")]
      .map((span) => span.textContent)
      .filter((text) => text !== null && /^[1-9]$/.test(text));
    expect(labels).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("rings exactly the open page", () => {
    const { container } = renderViewer();

    expect(thumbnails(container)).toHaveLength(PAGES.length);
    expect(thumbnails(container).filter(isRinged)).toHaveLength(1);
    expect(ringedIndex(container)).toBe(0);
  });

  it("moves the ring as the pages turn, and wraps", () => {
    const { container } = renderViewer();

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS));
    expect(ringedIndex(container)).toBe(1);

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS * 3));
    expect(ringedIndex(container)).toBe(4);

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS));
    expect(ringedIndex(container)).toBe(0);
  });

  it("turns no page while its slide is not selected", () => {
    const { container } = renderViewer(false);

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS * 10));
    expect(ringedIndex(container)).toBe(0);
  });

  it("becomes visible once its entrance has run", () => {
    const frames = runAnimationFramesImmediately();
    try {
      renderViewer();

      // Guards the failure mode the reveal could cause: a panel left at opacity 0
      // is a blank slide, not a subtle animation.
      expect(screen.getByRole("img").style.opacity).toBe("1");
    } finally {
      frames.restore();
    }
  });

  describe("reduced motion", () => {
    it("renders already settled and never turns a page", () => {
      const media = mockReducedMotion(true);
      try {
        const { container } = renderViewer();

        expect(screen.getByRole("img").style.opacity).toBe("1");
        // No transition either — there is nothing to ease between.
        expect(screen.getByRole("img").style.transition).toBe("");

        act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS * 20));
        expect(ringedIndex(container)).toBe(0);
      } finally {
        media.restore();
      }
    });
  });
});
