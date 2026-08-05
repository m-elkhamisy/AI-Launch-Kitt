import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Walks `0 … count - 1` on a fixed interval and wraps back to the start.
 *
 * Distinct from `useAutoAdvance` in two ways that matter. It drives content
 * *inside* one slide rather than the carousel itself, so it takes an `active`
 * flag instead of an embla api. And it resets to the first page whenever the
 * slide stops being active, so returning to a slide replays the document from
 * page one rather than resuming wherever the timer had got to — a mockup that
 * picks up mid-document reads as stale rather than live.
 *
 * Unlike the carousel's auto-advance this is *not* dismissable: nothing here is
 * interactive, so there is no interaction to defer to.
 */
export function usePageCycle({
  count,
  intervalMs,
  active,
}: {
  count: number;
  intervalMs: number;
  active: boolean;
}): number {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  // A single page has nothing to cycle to, and a visitor who asked for reduced
  // motion gets the first page and no timer at all.
  const running = active && !reducedMotion && count > 1;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [running, count, intervalMs]);

  useEffect(() => {
    if (!active) setIndex(0);
  }, [active]);

  // Guards against `count` shrinking under a held index — the slide set is
  // frozen today, but an out-of-range index would silently blank the sheet.
  return index < count ? index : 0;
}
