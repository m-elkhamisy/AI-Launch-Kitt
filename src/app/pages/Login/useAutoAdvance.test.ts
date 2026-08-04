import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAutoAdvance } from "./useAutoAdvance";

// The hook only ever calls scrollNext, so a two-field stub is enough — embla
// measures real layout, which jsdom does not provide, so the actual scrolling is
// verified by hand (see quickstart.md) rather than mocked into a false pass.
function stubApi() {
  return { scrollNext: vi.fn() } as unknown as Parameters<typeof useAutoAdvance>[0];
}

/**
 * Replaces window.matchMedia for one test. `listeners` collects the change
 * handlers the hook registers so a test can assert they are removed again.
 */
function mockReducedMotion(matches: boolean) {
  const listeners: unknown[] = [];
  const removed: unknown[] = [];
  const original = window.matchMedia;

  window.matchMedia = ((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? matches : false,
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: unknown): void => {
      listeners.push(listener);
    },
    removeEventListener: (_type: string, listener: unknown): void => {
      removed.push(listener);
    },
    addListener: (): void => {},
    removeListener: (): void => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

  return { listeners, removed, restore: () => { window.matchMedia = original; } };
}

describe("useAutoAdvance", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("advances once per interval", () => {
    const api = stubApi();
    renderHook(() => useAutoAdvance(api, { intervalMs: 15_000 }));

    vi.advanceTimersByTime(14_999);
    expect(api!.scrollNext).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(api!.scrollNext).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(30_000);
    expect(api!.scrollNext).toHaveBeenCalledTimes(3);
  });

  it("starts no timer before the carousel api exists", () => {
    const { rerender } = renderHook(
      ({ api }: { api: ReturnType<typeof stubApi> }) => useAutoAdvance(api, { intervalMs: 15_000 }),
      { initialProps: { api: undefined as ReturnType<typeof stubApi> } },
    );

    expect(() => vi.advanceTimersByTime(60_000)).not.toThrow();

    // Once the api arrives the interval starts, so a late setApi still works.
    const api = stubApi();
    rerender({ api });
    vi.advanceTimersByTime(15_000);
    expect(api!.scrollNext).toHaveBeenCalledTimes(1);
  });

  it("starts no timer when disabled", () => {
    const api = stubApi();
    renderHook(() => useAutoAdvance(api, { intervalMs: 15_000, enabled: false }));

    vi.advanceTimersByTime(60_000);
    expect(api!.scrollNext).not.toHaveBeenCalled();
  });

  it("stops permanently once stop is called, and does not resume", () => {
    const api = stubApi();
    const { result } = renderHook(() => useAutoAdvance(api, { intervalMs: 15_000 }));

    vi.advanceTimersByTime(15_000);
    expect(api!.scrollNext).toHaveBeenCalledTimes(1);

    // act() so the state change flushes and the effect tears the interval down —
    // without it the assertion would pass or fail on render timing, not behaviour.
    act(() => result.current.stop());

    vi.advanceTimersByTime(120_000);
    expect(api!.scrollNext).toHaveBeenCalledTimes(1);
  });

  it("clears the interval on unmount so nothing fires after teardown", () => {
    const api = stubApi();
    const { unmount } = renderHook(() => useAutoAdvance(api, { intervalMs: 15_000 }));

    unmount();

    vi.advanceTimersByTime(60_000);
    expect(api!.scrollNext).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  describe("reduced motion", () => {
    it("never advances when the visitor asked for reduced motion", () => {
      const media = mockReducedMotion(true);
      try {
        const api = stubApi();
        renderHook(() => useAutoAdvance(api, { intervalMs: 15_000 }));

        vi.advanceTimersByTime(120_000);
        expect(api!.scrollNext).not.toHaveBeenCalled();
      } finally {
        media.restore();
      }
    });

    it("advances normally when reduced motion is not requested", () => {
      const media = mockReducedMotion(false);
      try {
        const api = stubApi();
        renderHook(() => useAutoAdvance(api, { intervalMs: 15_000 }));

        vi.advanceTimersByTime(15_000);
        expect(api!.scrollNext).toHaveBeenCalledTimes(1);
      } finally {
        media.restore();
      }
    });

    it("treats a missing matchMedia as motion allowed", () => {
      const original = window.matchMedia;
      // @ts-expect-error deliberately removing the API to prove the guard works
      delete window.matchMedia;
      try {
        const api = stubApi();
        renderHook(() => useAutoAdvance(api, { intervalMs: 15_000 }));

        vi.advanceTimersByTime(15_000);
        expect(api!.scrollNext).toHaveBeenCalledTimes(1);
      } finally {
        window.matchMedia = original;
      }
    });

    it("stops listening to the preference on unmount", () => {
      const media = mockReducedMotion(false);
      try {
        const { unmount } = renderHook(() => useAutoAdvance(stubApi(), { intervalMs: 15_000 }));

        expect(media.listeners).toHaveLength(1);
        unmount();
        expect(media.removed).toEqual(media.listeners);
      } finally {
        media.restore();
      }
    });
  });
});
