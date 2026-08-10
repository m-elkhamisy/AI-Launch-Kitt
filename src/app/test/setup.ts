// Registers the jest-dom matchers (toBeInTheDocument, toHaveAttribute, …) on
// Vitest's expect. Loaded via `setupFiles` in vitest.config.ts.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom implements none of matchMedia, ResizeObserver or IntersectionObserver
// (verified: all three undefined under jsdom 29). Embla — reached through
// components/ui/carousel — calls matchMedia while resolving its breakpoint
// options, observes its container for resize, and tracks which slides are in
// view, so without these any component mounting a carousel throws during the
// effect phase.
//
// All three are guarded so they never shadow a real implementation, and
// matchMedia reports `matches: false`, which is the correct default for the
// queries used here: no breakpoint override, and motion allowed. Tests that care
// about prefers-reduced-motion override it themselves.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof window.ResizeObserver;
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: readonly number[] = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof window.IntersectionObserver;
}

// Testing Library only auto-registers its cleanup when the test framework
// exposes globals. This project runs Vitest with `globals: false` (tests import
// describe/it/expect explicitly), so unmounting has to be wired up by hand —
// without it, renders accumulate across tests in a file and queries match
// leftover nodes from earlier cases.
afterEach(cleanup);
