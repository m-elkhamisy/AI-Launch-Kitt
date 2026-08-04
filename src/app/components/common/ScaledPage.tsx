import type { ReactNode } from "react";

// Fluid container (w-full, capped at a max design width) — content reflows
// at every viewport size instead of being locked to a fixed-width canvas.
export function ScaledPage({
  children,
  header,
  scrollable = false,
}: {
  children: ReactNode;
  header?: ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: scrollable ? "auto" : "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        alignItems: "stretch",
      }}
    >
      {/* Header/nav renders at native size, full viewport width. */}
      {header && <div className="w-full flex-shrink-0">{header}</div>}
      {/* Body content is a genuinely fluid container — no fixed-width/zoom canvas — so it
          reflows at every viewport width instead of leaving dead space around a locked 1440px design. */}
      <div
        className="w-full mx-auto"
        style={{
          width: "100%",
          maxWidth: 1440,
          padding: "0 clamp(16px, 3vw, 32px)",
          boxSizing: "border-box",
          // Always grow to fill the remaining viewport height — otherwise short pages leave
          // dead space below instead of the content/background filling the screen.
          // minHeight:100vh on the outer wrapper has no cap, so tall content still grows
          // past one viewport and scrolls normally.
          flex: 1,
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
