import { vi } from "vitest";

/**
 * Replaces window.matchMedia for one test. `listeners` collects the change
 * handlers the subject registers so a test can assert they are removed again.
 *
 * Shared because reduced motion now gates three separate behaviours — the
 * carousel's auto-advance, the page cycle inside a rebuilt mockup, and every
 * entrance transition — and each needs to be provable in both states.
 */
export function mockReducedMotion(matches: boolean) {
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

  return {
    listeners,
    removed,
    restore: () => {
      window.matchMedia = original;
    },
  };
}

/**
 * Stubs requestAnimationFrame so `useReveal` settles synchronously.
 *
 * The reveal deliberately waits two frames before moving an element to its
 * settled state, which under fake timers would otherwise never arrive — leaving
 * every entrance stuck at opacity 0 and every assertion about settled markup
 * failing for the wrong reason.
 */
export function runAnimationFramesImmediately() {
  const originalRequest = window.requestAnimationFrame;
  const originalCancel = window.cancelAnimationFrame;

  window.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    callback(0);
    return 0;
  }) as unknown as typeof window.requestAnimationFrame;
  window.cancelAnimationFrame = vi.fn() as unknown as typeof window.cancelAnimationFrame;

  return {
    restore: () => {
      window.requestAnimationFrame = originalRequest;
      window.cancelAnimationFrame = originalCancel;
    },
  };
}
