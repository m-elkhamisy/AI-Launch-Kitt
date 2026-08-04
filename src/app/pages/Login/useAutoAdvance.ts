import { useCallback, useEffect, useRef, useState } from "react";

import type { CarouselApi } from "../../components/ui/carousel";

/**
 * Advances a carousel on a fixed interval until the visitor takes over.
 *
 * Written rather than pulling embla's autoplay plugin because the plugin is not
 * installed and would not express the two rules that matter here: stopping
 * *permanently* on interaction, and never starting at all when the visitor has
 * asked for reduced motion.
 */
export function useAutoAdvance(
  api: CarouselApi | undefined,
  { intervalMs, enabled = true }: { intervalMs: number; enabled?: boolean },
): { stop: () => void } {
  // Once the visitor steers the carousel it stays where they put it, so this
  // latches true and is never cleared for the life of the screen.
  const [stopped, setStopped] = useState(false);
  const stop = useCallback(() => setStopped(true), []);

  // Read through a ref so a new api identity does not restart the interval
  // mid-cycle, which would make the first slide after a re-render last longer.
  const apiRef = useRef(api);
  apiRef.current = api;

  const running = Boolean(api) && enabled && !stopped;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      apiRef.current?.scrollNext();
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [running, intervalMs]);

  return { stop };
}
