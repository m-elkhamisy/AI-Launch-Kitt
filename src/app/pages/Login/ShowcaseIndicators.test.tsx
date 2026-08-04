import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ShowcaseIndicators, UNFILLED_DOT } from "./ShowcaseIndicators";

const ACCENT = "#e99041";

function renderAt(selectedIndex: number) {
  const onSelect = vi.fn();
  render(
    <ShowcaseIndicators count={3} selectedIndex={selectedIndex} accent={ACCENT} onSelect={onSelect} />,
  );
  return { onSelect, dots: screen.getAllByRole("button") };
}

function backgroundOf(dot: HTMLElement) {
  return dot.style.background;
}

// jsdom re-serialises colours (#e99041 becomes rgb(233, 144, 65)), so run the
// expected value through the same CSS parser rather than hand-rolling a
// hex-to-rgb conversion that could drift from jsdom's formatting.
function asCss(value: string) {
  const probe = document.createElement("div");
  probe.style.background = value;
  return probe.style.background;
}

describe("ShowcaseIndicators", () => {
  it("fills cumulatively — one dot on the first slide", () => {
    const { dots } = renderAt(0);

    expect(dots).toHaveLength(3);
    expect(backgroundOf(dots[0]!)).toBe(asCss(ACCENT));
    expect(backgroundOf(dots[1]!)).toBe(asCss(UNFILLED_DOT));
    expect(backgroundOf(dots[2]!)).toBe(asCss(UNFILLED_DOT));
  });

  it("fills cumulatively — two dots on the second slide", () => {
    const { dots } = renderAt(1);

    expect(backgroundOf(dots[0]!)).toBe(asCss(ACCENT));
    expect(backgroundOf(dots[1]!)).toBe(asCss(ACCENT));
    expect(backgroundOf(dots[2]!)).toBe(asCss(UNFILLED_DOT));
  });

  it("fills cumulatively — all three dots on the last slide", () => {
    const { dots } = renderAt(2);

    for (const dot of dots) {
      expect(backgroundOf(dot)).toBe(asCss(ACCENT));
    }
  });

  it("names each dot and marks only the current one", () => {
    const { dots } = renderAt(1);

    expect(dots[0]).toHaveAccessibleName("Show slide 1 of 3");
    expect(dots[1]).toHaveAccessibleName("Show slide 2 of 3");
    expect(dots[2]).toHaveAccessibleName("Show slide 3 of 3");

    expect(dots[0]).not.toHaveAttribute("aria-current", "true");
    expect(dots[1]).toHaveAttribute("aria-current", "true");
    expect(dots[2]).not.toHaveAttribute("aria-current", "true");
  });

  it("groups the dots under an accessible name", () => {
    renderAt(0);

    expect(screen.getByRole("group", { name: /slide/i })).toBeInTheDocument();
  });

  it("reports the index that was chosen", () => {
    const { onSelect, dots } = renderAt(0);

    dots[2]!.click();

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it("renders real buttons, so keyboard operation comes for free", () => {
    const { dots } = renderAt(0);

    for (const dot of dots) {
      expect(dot.tagName).toBe("BUTTON");
      expect(dot).toHaveAttribute("type", "button");
    }
  });
});
