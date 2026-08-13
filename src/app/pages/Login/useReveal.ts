import { useEffect, useState } from "react";

/**
 * Flips to `true` one paint after `gate` turns on, and straight back to `false`
 * when it turns off.
 *
 * This is what lets a mockup play an entrance with plain CSS transitions instead
 * of keyframes: the element mounts in its pre-entrance state, paints there, and
 * only then is moved to its settled state, so the browser has two values to
 * transition between. Setting both in the same commit would show the settled
 * state immediately and animate nothing.
 *
 * Two nested frames rather than one: the first frame is queued before React has
 * painted the pre-entrance state, so transitioning on it is a race.
 */
export function useReveal(gate: boolean): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!gate) {
      setRevealed(false);
      return;
    }
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setRevealed(true));
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [gate]);

  return revealed;
}
