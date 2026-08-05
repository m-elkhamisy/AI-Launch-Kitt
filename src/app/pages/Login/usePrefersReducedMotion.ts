import { useEffect, useState } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the visitor's reduced-motion preference.
 *
 * matchMedia rather than a CSS media query because the callers suppress *timers*
 * — a carousel that advances itself, a document that turns its own pages — and a
 * stylesheet cannot stop a `setInterval`. Subscribed rather than read once so
 * toggling the system setting mid-visit takes effect immediately.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia?.(REDUCED_MOTION);
    if (!query) return;
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

// A browser without matchMedia has expressed no preference, so motion is allowed.
function prefersReducedMotion(): boolean {
  return window.matchMedia?.(REDUCED_MOTION).matches ?? false;
}
