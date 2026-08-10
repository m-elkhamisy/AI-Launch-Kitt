import type { CSSProperties } from "react";

// One easing curve and one pair of durations for every showcase entrance, so the
// badge, the headline, the mockup and the stats all arrive with the same character
// instead of four separately hand-tuned ones.
const EASE_OUT_SOFT = "cubic-bezier(0.22,0.61,0.36,1)";
const FADE_MS = 420;
const RISE_MS = 560;

/**
 * "Rise into place": starts invisible and slightly low, settles to its real
 * position. Pair it with `useReveal`, which supplies `settled`.
 *
 * `distance` is a full CSS length rather than a number because the rebuilt mockup
 * measures itself in em — one em is one design pixel in there — while the panel
 * around it is in px.
 *
 * Returning no `transition` under reduced motion is deliberate: the element is
 * rendered already settled, so there is nothing to ease and no timer to cancel.
 */
export function riseIn({
  settled,
  reducedMotion,
  delayMs = 0,
  distance = "10px",
}: {
  settled: boolean;
  reducedMotion: boolean;
  delayMs?: number;
  distance?: string;
}): CSSProperties {
  return {
    opacity: settled ? 1 : 0,
    transform: settled ? "none" : `translateY(${distance})`,
    transition: reducedMotion
      ? undefined
      : `opacity ${FADE_MS}ms ease-out ${delayMs}ms,` +
        ` transform ${RISE_MS}ms ${EASE_OUT_SOFT} ${delayMs}ms`,
  };
}

/** Stagger step between the thumbnails in the rebuilt page rail. */
export const RAIL_STAGGER_MS = 70;

/** Delay before the rail starts filling, so the window itself lands first. */
export const RAIL_LEAD_MS = 140;
