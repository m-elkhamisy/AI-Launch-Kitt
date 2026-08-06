import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BrochureViewerMockup } from "./BrochureViewerMockup";
import { mockReducedMotion } from "../../../test/reduced-motion";
import type { ShowcasePage } from "./showcase-slides";

const PAGES: readonly ShowcasePage[] = [
  { src: "/spread-1.webp", label: "1" },
  { src: "/spread-2.webp", label: "2" },
];

const ALT = "A generated print-ready brochure open in a document viewer";
const PAGE_INTERVAL_MS = 5000;

function renderViewer(active = true) {
  return render(
    <BrochureViewerMockup
      fileName="Brochure.pdf"
      fileMeta="22.07.2026 • 13:42"
      pages={PAGES}
      alt={ALT}
      active={active}
    />,
  );
}

/**
 * The rail's page buttons, in spread order.
 *
 * The box and its digit are separate elements — the digit sets a font-size, which
 * would rescale the box's em sizing — so match the box: a 24em square holding one
 * of the page labels. That excludes the digit itself and the chevron and zoom
 * squares, which carry no text.
 */
function pageButtons(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>("span")].filter(
    (span) =>
      span.style.width === "24em" && PAGES.some((page) => span.textContent === page.label),
  );
}

/** The rail marks the open spread with a fill; the others are left transparent. */
function openSpreadIndex(container: HTMLElement): number {
  return pageButtons(container).findIndex(
    (span) => span.style.background !== "transparent" && span.style.background !== "",
  );
}

describe("BrochureViewerMockup", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("stands in for the capability as a single labelled image", () => {
    renderViewer();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAccessibleName(ALT);
  });

  it("names and dates the document in its title bar", () => {
    renderViewer();

    expect(screen.getByText("Brochure.pdf")).toBeInTheDocument();
    expect(screen.getByText("22.07.2026 • 13:42")).toBeInTheDocument();
  });

  it("mounts every spread so a turn never has to load one", () => {
    const { container } = renderViewer();

    const sources = [...container.querySelectorAll("img")].map((img) => img.getAttribute("src"));
    expect(sources).toEqual(PAGES.map((page) => page.src));
  });

  it("marks exactly the open spread in the rail", () => {
    const { container } = renderViewer();

    expect(pageButtons(container)).toHaveLength(PAGES.length);
    expect(openSpreadIndex(container)).toBe(0);
  });

  it("turns to the second spread and back", () => {
    const { container } = renderViewer();

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS));
    expect(openSpreadIndex(container)).toBe(1);

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS));
    expect(openSpreadIndex(container)).toBe(0);
  });

  it("turns no spread while its slide is not selected", () => {
    const { container } = renderViewer(false);

    act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS * 6));
    expect(openSpreadIndex(container)).toBe(0);
  });

  it("never turns a spread under reduced motion", () => {
    const media = mockReducedMotion(true);
    try {
      const { container } = renderViewer();

      act(() => void vi.advanceTimersByTime(PAGE_INTERVAL_MS * 6));
      expect(openSpreadIndex(container)).toBe(0);
    } finally {
      media.restore();
    }
  });
});
