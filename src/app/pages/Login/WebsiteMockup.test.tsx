import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mockReducedMotion } from "../../../test/reduced-motion";
import { WebsiteMockup } from "./WebsiteMockup";

const ALT = "A generated business website shown on a desktop and a phone";
const ACCENT = "#e99041";
const SECTION_INTERVAL_MS = 2800;
const LABELS = ["Home", "About", "Portfolio", "Blog", "Contact"];

function renderMockup(active = true) {
  return render(
    <WebsiteMockup src="/website-mockup.png" alt={ALT} accent={ACCENT} active={active} />,
  );
}

// jsdom normalises inline colours to rgb(), so accept either spelling of the accent.
function isAccented(element: HTMLElement): boolean {
  const colour = element.style.color;
  return colour.includes("233, 144, 65") || colour.toLowerCase().includes("e99041");
}

function activeIndex(): number {
  return LABELS.findIndex((label) => isAccented(screen.getByText(label)));
}

/** The travelling underline — the only element the mockup gives a 1.5em height. */
function underline(container: HTMLElement): HTMLElement {
  const found = [...container.querySelectorAll<HTMLElement>("span")].find(
    (span) => span.style.height === "1.5em",
  );
  if (!found) throw new Error("the nav underline was not rendered");
  return found;
}

describe("WebsiteMockup", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("stands in for the capability as a single labelled image", () => {
    renderMockup();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAccessibleName(ALT);
  });

  it("re-renders the whole nav, which is what lets one item sweep", () => {
    renderMockup();

    for (const label of LABELS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("accents exactly one section at a time, starting at the first", () => {
    renderMockup();

    expect(LABELS.filter((label) => isAccented(screen.getByText(label)))).toEqual(["Home"]);
    expect(activeIndex()).toBe(0);
  });

  it("sweeps through the sections and wraps", () => {
    renderMockup();

    act(() => void vi.advanceTimersByTime(SECTION_INTERVAL_MS));
    expect(activeIndex()).toBe(1);

    act(() => void vi.advanceTimersByTime(SECTION_INTERVAL_MS * 3));
    expect(activeIndex()).toBe(4);

    act(() => void vi.advanceTimersByTime(SECTION_INTERVAL_MS));
    expect(activeIndex()).toBe(0);
  });

  it("moves the underline to the section it is on", () => {
    const { container } = renderMockup();

    const start = underline(container).style.left;
    act(() => void vi.advanceTimersByTime(SECTION_INTERVAL_MS));
    const moved = underline(container).style.left;

    expect(moved).not.toBe(start);
    // Left to right, so the underline only ever advances within a pass.
    expect(parseFloat(moved)).toBeGreaterThan(parseFloat(start));
  });

  it("sweeps nothing while its slide is not selected", () => {
    renderMockup(false);

    act(() => void vi.advanceTimersByTime(SECTION_INTERVAL_MS * 8));
    expect(activeIndex()).toBe(0);
  });

  it("never sweeps under reduced motion", () => {
    const media = mockReducedMotion(true);
    try {
      const { container } = renderMockup();
      const start = underline(container).style.left;

      act(() => void vi.advanceTimersByTime(SECTION_INTERVAL_MS * 8));
      expect(activeIndex()).toBe(0);
      expect(underline(container).style.left).toBe(start);
    } finally {
      media.restore();
    }
  });
});
