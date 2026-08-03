import svgPathsNav from "@/imports/nav-paths";

const STEPS = [
  { label: "Business", iconKey: "building" },
  { label: "Design Category & Mood", iconKey: "widget" },
  { label: "Colors & Fonts", iconKey: "palette" },
  { label: "Pick Pages", iconKey: "document" },
];

export function SubNav({
  activeStep,
  completedUpTo: completedUpToProp,
  onBack,
  onNext,
  onStepClick,
  nextLabel = "Next",
}: {
  activeStep: number;
  completedUpTo?: number;
  onBack: () => void;
  onNext?: () => void;
  onStepClick?: (step: number) => void;
  nextLabel?: string;
}) {
  const completedUpTo = completedUpToProp ?? activeStep - 1;
  const n = svgPathsNav;

  // Colours per state matching the Figma design exactly:
  //   done (completed)  → teal check-circle
  //   active (current)  → teal icon  #6FCCDD
  //   future            → dimmed white/grey icon
  function StepIcon({ iconKey, done, active }: { iconKey: string; done: boolean; active: boolean }) {
    if (done) {
      // Teal filled check-circle (same path used across all Figma screens)
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM14.0303 6.96967C14.3232 7.26256 14.3232 7.73744 14.0303 8.03033L9.03033 13.0303C8.73744 13.3232 8.26256 13.3232 7.96967 13.0303L5.96967 11.0303C5.67678 10.7374 5.67678 10.2626 5.96967 9.96967C6.26256 9.67678 6.73744 9.67678 7.03033 9.96967L8.5 11.4393L13.0303 6.96967C13.3232 6.67678 13.7374 6.67678 14.0303 6.96967Z"
            fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd"
          />
        </svg>
      );
    }

    const teal = "#6FCCDD";
    // Active step → full teal; future step → dimmed
    const fill = active ? teal : undefined;
    const opacity = active ? 1 : undefined;

    if (iconKey === "building") {
      // Full building icon with clipPath, matching Figma Frame3 exactly
      const buildingFill = active ? teal : "rgba(111,204,221,0.4)";
      return (
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
          <defs>
            <clipPath id="navBuildingClip">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
          <g clipPath="url(#navBuildingClip)">
            <path d={n.p31acad00} fill={buildingFill} />
            <path d={n.p24d84880} fill={buildingFill} />
            <path d={n.p2f6ca200} fill={buildingFill} />
            <path d={n.p14afe180} fill={buildingFill} />
            <path d={n.p246d7e00} fill={buildingFill} />
            <path d={n.p3ac58200} fill={buildingFill} />
            <path d={n.pf9b2500}  fill={buildingFill} />
            <path d={n.p8f38f00}  fill={buildingFill} />
            <path d={n.pebfc700}  fill={buildingFill} />
            <path d={n.p3a7fa900} fill={buildingFill} />
            <path d={n.p2a40b680} fill={buildingFill} />
            <path d={n.p3a1f8980} fill={buildingFill} />
            <path d={n.p3a795a40} fill={buildingFill} />
          </g>
        </svg>
      );
    }

    if (iconKey === "widget") {
      // Widget 2 icon — Figma Frame5
      const wFill = active ? teal : "rgba(128,128,128,0.55)";
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={n.p2679c280} fill={wFill} fillRule="evenodd" clipRule="evenodd" />
          <path d={n.p35bacd00} fill={wFill} fillRule="evenodd" clipRule="evenodd" />
          <path d={n.p2fcdb978} fill={wFill} />
          <path d={n.p3947a280} fill={wFill} />
        </svg>
      );
    }

    if (iconKey === "palette") {
      // Palette icon — Figma Frame6
      const pFill = active ? teal : "rgba(255,255,255,0.2)";
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={n.p34bed280} fill={pFill} fillRule="evenodd" clipRule="evenodd" />
        </svg>
      );
    }

    if (iconKey === "document") {
      // Document Text icon — Figma Frame8
      const dFill = active ? teal : "rgba(255,255,255,0.2)";
      return (
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path d={n.p33f2580} fill={dFill} fillRule="evenodd" clipRule="evenodd" />
        </svg>
      );
    }

    return null;
  }

  // ── Shared chevron connector ────────────────────────────────────────────
  const Chevron = ({ small }: { small?: boolean }) => (
    <svg
      width={small ? 6 : 8}
      height={small ? 6 : 8}
      viewBox="0 0 4.5 7.5"
      fill="none"
      style={{ flexShrink: 0, opacity: 0.5 }}
    >
      <path d={n.pb873b80} stroke="#6FCCDD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Both layouts render together; Tailwind's `md:` breakpoint (CSS media query, not JS)
  // decides which is visible — no isMobile JS branching.
  return (
    <>
      {/* ── Compact layout (below lg) — two-row strip. The full breadcrumb below
          needs ~700px for its longest label ("Design Category & Mood"), so it only
          switches in once there's room to avoid overlapping the back/next buttons. ── */}
      <div
        className="flex lg:hidden flex-col"
        style={{
          background: "#0b0b0b",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* ── Row 1: back arrow · title · Next button ── */}
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 16,
            paddingRight: 16,
            gap: 8,
          }}
        >
          {/* Left: back arrow */}
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              padding: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={n.p8122280} fill="white" />
            </svg>
          </button>

          {/* Center: page title */}
          <span
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: 16,
              whiteSpace: "nowrap",
              flex: 1,
              marginLeft: 8,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            AI Launch Kit
          </span>

          {/* Right: Next button */}
          <button
            onClick={onNext}
            disabled={!onNext}
            style={{
              flexShrink: 0,
              fontWeight: 600,
              fontSize: 12,
              color: onNext ? "#0b0b0b" : "rgba(255,255,255,0.2)",
              background: onNext ? "#6fccdd" : "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: 6,
              padding: "8px 14px",
              cursor: onNext ? "pointer" : "not-allowed",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {nextLabel}
          </button>
        </div>

        {/* ── Row 2: step strip — icon-only except active step shows icon + label.
            The active label is width-capped with ellipsis so this row always fits without
            ever needing to scroll horizontally, down to a 320px viewport. ── */}
        <div
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
            gap: 6,
            overflowX: "hidden",
            overflowY: "hidden",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {STEPS.map((step, i) => {
            const done = i <= completedUpTo;
            const active = i === activeStep;
            const clickable = done && onStepClick;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                {/* Step chip */}
                <div
                  onClick={() => clickable && onStepClick(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: active ? 6 : 0,
                    padding: active ? "4px 10px 4px 8px" : "4px",
                    borderRadius: 6,
                    background: active ? "rgba(111,204,221,0.10)" : "transparent",
                    border: active ? "1px solid rgba(111,204,221,0.2)" : "1px solid transparent",
                    cursor: clickable ? "pointer" : "default",
                    flexShrink: 0,
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                >
                  <StepIcon iconKey={step.iconKey} done={done && !active} active={active} />
                  {active && (
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: "rgba(255,255,255,1)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "clamp(50px, 20vw, 140px)",
                        lineHeight: 1,
                      }}
                    >
                      {step.label}
                    </span>
                  )}
                </div>

                {/* Chevron connector between steps */}
                {i < STEPS.length - 1 && <Chevron small />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Full layout (lg and up) — breadcrumb + back/next ──────────────── */}
      <div
        className="hidden lg:flex relative items-center"
        style={{
          height: 52,
          background: "#0b0b0b",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
      {/* Left: Back + separator + title */}
      <div className="flex items-center gap-[12px] pl-[24px]">
        <button onClick={onBack} className="flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={n.p8122280} fill="white" />
          </svg>
        </button>
        <div style={{ width: 1, height: 22.5, background: "rgba(255,255,255,0.1)" }} />
        <span className="text-white font-semibold text-[18px]">AI Launch Kit</span>
      </div>

      {/* Center: full step breadcrumb, absolute-centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
        {STEPS.map((step, i) => {
          const done = i <= completedUpTo;
          const active = i === activeStep;
          const clickable = done && onStepClick;
          return (
            <div key={i} className="flex items-center gap-[8px]">
              <div
                onClick={() => clickable && onStepClick(i)}
                className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] transition-colors"
                style={{
                  color: active
                    ? "rgba(255,255,255,1)"
                    : done
                    ? "#6FCCDD"
                    : step.iconKey === "widget"
                    ? "rgba(128,128,128,0.55)"
                    : "rgba(255,255,255,0.4)",
                  background: active ? "rgba(111,204,221,0.08)" : "transparent",
                  cursor: clickable ? "pointer" : "default",
                }}
              >
                <StepIcon iconKey={step.iconKey} done={done && !active} active={active} />
                <span className="font-semibold text-[13px]">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <Chevron />}
            </div>
          );
        })}
      </div>

      {/* Right: Next button */}
      <div className="absolute right-[24px]">
        <button
          onClick={onNext}
          disabled={!onNext}
          className="font-semibold text-[14px] uppercase px-[24px] py-[12px] rounded-[8px]"
          style={{
            background: onNext ? "#6fccdd" : "rgba(255,255,255,0.08)",
            color: onNext ? "#0b0b0b" : "rgba(255,255,255,0.2)",
            cursor: onNext ? "pointer" : "not-allowed",
          }}
        >
          {nextLabel}
        </button>
      </div>
      </div>
    </>
  );
}
