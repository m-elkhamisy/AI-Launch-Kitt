import type { ReactNode } from "react";

import { riseIn } from "./showcase-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useReveal } from "./useReveal";

/**
 * A mockup drawn at its Figma size, fitted into whatever the panel leaves.
 *
 * Three jobs, shared by every mockup rather than repeated in each.
 *
 * It holds the design's aspect ratio, so a mockup never distorts as the showcase
 * column narrows between the 1024px and 1440px panel widths.
 *
 * It sets a font-size of exactly one design pixel, from a container query, so
 * everything inside can be measured in `em` using the Figma numbers directly.
 * Percentages would need a different denominator per axis and per nesting level,
 * and a transform scale would need a measured container width from JS.
 *
 * The one rule this buys: **never set `fontSize` on an element that also carries an
 * em length**. `em` resolves against the element's *own* font-size, so a `left:
 * 16em` beside a `fontSize: 7em` lands at 112 design pixels, not 16. Give the text
 * its own child, or express the value some other way — a gap on the parent, or a
 * unitless `lineHeight`. Nothing catches this in a test, because jsdom does no
 * layout; it only shows up in the browser.
 *
 * And it owns the accessible name and the entrance: one image role standing in for
 * the whole composition — the chrome and pages inside are decoration, so a screen
 * reader gets the capability rather than a pile of unlabelled scans — and a rise
 * into place when the slide is selected.
 *
 * `children` is a function because the parts inside need the same motion state the
 * frame computed: passing it down beats each mockup calling `useReveal` again and
 * hoping the two copies settle on the same frame.
 */
export function MockupFrame({
  designWidth,
  designHeight,
  alt,
  active,
  children,
}: {
  designWidth: number;
  designHeight: number;
  /** Describes the capability — the mockup stands in for it as one image. */
  alt: string;
  /** True while this slide is the carousel's selection. */
  active: boolean;
  children: (motion: { settled: boolean; reducedMotion: boolean }) => ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const revealed = useReveal(active);
  const settled = reducedMotion || revealed;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-full max-h-full w-auto max-w-full"
        style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
      >
        <div className="h-full w-full" style={{ containerType: "inline-size" }}>
          <div
            role="img"
            aria-label={alt}
            className="relative flex h-full w-full flex-col overflow-hidden"
            style={{
              fontSize: `calc(100cqw / ${designWidth})`,
              ...riseIn({ settled, reducedMotion, distance: "10em" }),
            }}
          >
            {children({ settled, reducedMotion })}
          </div>
        </div>
      </div>
    </div>
  );
}
