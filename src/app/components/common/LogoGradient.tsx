import { LOGO_MARK_GRADIENT } from "./logo-paths";

// The mark's gradient, shared by the full lockup (LogoSvg) and the mark on its
// own (LogoMark). One renderer rather than two copies of nine stops, because a
// drifting stop list is invisible until someone compares the two side by side.
//
// gradientUnits is explicit: see the note on LOGO_MARK_GRADIENT for why the SVG
// default silently produces the wrong ramp.
export function LogoGradient({ id }: { id: string }) {
  return (
    <linearGradient
      id={id}
      x1={LOGO_MARK_GRADIENT.x1}
      y1={LOGO_MARK_GRADIENT.y1}
      x2={LOGO_MARK_GRADIENT.x2}
      y2={LOGO_MARK_GRADIENT.y2}
      gradientUnits="userSpaceOnUse"
    >
      {LOGO_MARK_GRADIENT.stops.map((stop) => (
        <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
      ))}
    </linearGradient>
  );
}

/**
 * A gradient id that is unique per component instance.
 *
 * Two logos on one page would otherwise both define `#logoGrad`, and the browser
 * resolves a duplicate id to whichever came first. React's useId is the source,
 * with its colons stripped — they are legal in an id but not in the `url(#…)`
 * fragment reference that consumes it.
 */
export function gradientId(reactId: string): string {
  return `logoGrad${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
}
