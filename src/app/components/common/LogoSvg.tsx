import { useId } from "react";

import { gradientId, LogoGradient } from "./LogoGradient";
import { LOGO_BAR_FILL, LOGO_MARK, LOGO_WORDMARK } from "./logo-paths";

// The full lockup: gradient mark, purple bar, and the "AI LAUNCH KIT" wordmark.
export function LogoSvg() {
  const id = gradientId(useId());

  return (
    <svg
      width="165"
      height="36"
      viewBox="0 0 165 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AI Launch Kit"
    >
      <defs>
        <LogoGradient id={id} />
      </defs>
      <path d={LOGO_MARK.p3be92e00} fill={`url(#${id})`} />
      <path d={LOGO_MARK.p2287a280} fill={LOGO_BAR_FILL} />
      {LOGO_WORDMARK.map((d, i) => (
        <path key={i} d={d} fill="white" />
      ))}
    </svg>
  );
}
