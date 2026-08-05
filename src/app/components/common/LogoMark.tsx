import { useId } from "react";

import { gradientId, LogoGradient } from "./LogoGradient";
import { LOGO_BAR_FILL, LOGO_MARK } from "./logo-paths";

// The mark without the wordmark, at its native 50×36. Used where the brand needs
// to read as a symbol rather than a lockup — the welcome screen's sign-in column.
export function LogoMark({
  width = 50,
  height = 36,
  title,
}: {
  width?: number;
  height?: number;
  /** Omit to render decoratively; the wordmark beside it usually carries the name. */
  title?: string;
}) {
  const id = gradientId(useId());

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": "true" })}
    >
      <defs>
        <LogoGradient id={id} />
      </defs>
      <path d={LOGO_MARK.p3be92e00} fill={`url(#${id})`} />
      <path d={LOGO_MARK.p2287a280} fill={LOGO_BAR_FILL} />
    </svg>
  );
}
