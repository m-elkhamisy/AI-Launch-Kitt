import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mockReducedMotion } from "../../../test/reduced-motion";
import { usePageCycle } from "./usePageCycle";

const INTERVAL = 2400;

function render(props: { count: number; intervalMs?: number; active: boolean }) {
  return renderHook(
    ({ count, active }: { count: number; active: boolean }) =>
      usePageCycle({ count, intervalMs: props.intervalMs ?? INTERVAL, active }),
    { initialProps: { count: props.count, active: props.active } },
  );
}

describe("usePageCycle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("opens on the first page", () => {
    const { result } = render({ count: 5, active: true });

    expect(result.current).toBe(0);
  });

  it("advances one page per interval", () => {
    const { result } = render({ count: 5, active: true });

    act(() => void vi.advanceTimersByTime(INTERVAL - 1));
    expect(result.current).toBe(0);

    act(() => void vi.advanceTimersByTime(1));
    expect(result.current).toBe(1);

    act(() => void vi.advanceTimersByTime(INTERVAL * 3));
    expect(result.current).toBe(4);
  });

  it("wraps back to the first page after the last", () => {
    const { result } = render({ count: 5, active: true });

    act(() => void vi.advanceTimersByTime(INTERVAL * 5));
    expect(result.current).toBe(0);

    act(() => void vi.advanceTimersByTime(INTERVAL));
    expect(result.current).toBe(1);
  });

  it("walks the whole document inside the carousel's 15s slide", () => {
    const { result } = render({ count: 5, active: true });

    // The point of the 2400ms interval: every page is shown, and the sheet is
    // back on page one before the carousel moves on.
    act(() => void vi.advanceTimersByTime(15_000));
    expect(result.current).toBe(1);
    expect(INTERVAL * 5).toBeLessThan(15_000);
  });

  it("stays on the first page while the slide is not selected", () => {
    const { result } = render({ count: 5, active: false });

    act(() => void vi.advanceTimersByTime(INTERVAL * 10));
    expect(result.current).toBe(0);
  });

  it("restarts from the first page when the slide is left and re-entered", () => {
    const { result, rerender } = render({ count: 5, active: true });

    act(() => void vi.advanceTimersByTime(INTERVAL * 2));
    expect(result.current).toBe(2);

    // Leaving resets, so returning replays the document rather than resuming it.
    act(() => rerender({ count: 5, active: false }));
    expect(result.current).toBe(0);

    act(() => rerender({ count: 5, active: true }));
    expect(result.current).toBe(0);

    act(() => void vi.advanceTimersByTime(INTERVAL));
    expect(result.current).toBe(1);
  });

  it("starts no timer for a single page", () => {
    const { result } = render({ count: 1, active: true });

    act(() => void vi.advanceTimersByTime(INTERVAL * 10));
    expect(result.current).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clears the interval on unmount so nothing fires after teardown", () => {
    const { unmount } = render({ count: 5, active: true });

    unmount();

    expect(() => vi.advanceTimersByTime(INTERVAL * 10)).not.toThrow();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("holds an index that a shrinking page set would leave out of range", () => {
    const { result, rerender } = render({ count: 5, active: true });

    act(() => void vi.advanceTimersByTime(INTERVAL * 4));
    expect(result.current).toBe(4);

    act(() => rerender({ count: 2, active: true }));
    expect(result.current).toBe(0);
  });

  describe("reduced motion", () => {
    it("never turns a page when the visitor asked for reduced motion", () => {
      const media = mockReducedMotion(true);
      try {
        const { result } = render({ count: 5, active: true });

        act(() => void vi.advanceTimersByTime(INTERVAL * 20));
        expect(result.current).toBe(0);
        expect(vi.getTimerCount()).toBe(0);
      } finally {
        media.restore();
      }
    });

    it("turns pages normally when reduced motion is not requested", () => {
      const media = mockReducedMotion(false);
      try {
        const { result } = render({ count: 5, active: true });

        act(() => void vi.advanceTimersByTime(INTERVAL));
        expect(result.current).toBe(1);
      } finally {
        media.restore();
      }
    });
  });
});
