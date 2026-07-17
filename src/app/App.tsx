import { useState, useRef, useEffect, useCallback } from "react";

import * as api from "@/app/lib/api";
import { loadWizard, saveWizard, resetWizardPipeline, buildSubmissionData } from "@/app/lib/wizardStore";
import svgPathsLogin from "@/imports/AiLaunchKitLoginPage/svg-8vlpvs8i0v";
import svgPathsDl from "@/imports/AiLaunchKitDownloadingGeneratedWebsitesPage/svg-7argp47g3q";
import svgPathsMerged from "@/imports/AiLaunchKitMainPageMergedFlow/svg-9l4sd51871";
import svgPathsCatMood from "@/imports/AiLaunchKitDesignCategoryMood/svg-aiiheluzwm";
import svgPathsColors from "@/imports/AiLaunchKitColorsFonts/svg-f4nnorilyc";
import svgPathsPages from "@/imports/AiLaunchKitPickPages/svg-w96mex1cgs";
import { imgLight } from "@/imports/AiLaunchKitDesignCategoryMood/svg-x4lhq";
import svgPathsNav from "@/imports/Frame1410068676/svg-96pcbqyjjo";

type Page =
  | "login"
  | "otp"
  | "questionnaire"
  | "category-mood"
  | "colors"
  | "pick-pages"
  | "generating"
  | "preview"
  | "download";

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
// Fluid container (w-full, capped at a max design width) — content reflows
// at every viewport size instead of being locked to a fixed-width canvas.
function ScaledPage({
  children,
  header,
  designHeight: _designHeight = 900,
  scrollable = false,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  designHeight?: number;
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

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
function LogoSvg() {
  const p = svgPathsLogin;
  const whiteLetters = [
    p.p2fa07e00, p.p2f3d3c70, p.pe78e200, p.p27836100, p.p2fc8e300,
    p.p3941f000, p.p26151d0, p.p1ca86300, p.p9dbcb00, p.p244d5780,
    p.p1b270770, p.p26b86d00, p.p30825a00, p.p13646200,
  ];
  return (
    <svg
      width="165"
      height="36"
      viewBox="0 0 165 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#85D2DB" />
          <stop offset="0.09" stopColor="#83CCD8" />
          <stop offset="0.2" stopColor="#81BCD2" />
          <stop offset="0.32" stopColor="#7CA2C7" />
          <stop offset="0.45" stopColor="#757EB7" />
          <stop offset="0.53" stopColor="#7165AD" />
          <stop offset="0.64" stopColor="#645CA8" />
          <stop offset="0.81" stopColor="#5A54A4" />
          <stop offset="1" stopColor="#5752A3" />
        </linearGradient>
      </defs>
      <path d={p.p3be92e00} fill="url(#logoGrad)" />
      <path d={p.p2287a280} fill="#5752A3" />
      {whiteLetters.map((d, i) => (
        <path key={i} d={d} fill="white" />
      ))}
    </svg>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────
function TopHeader({ showProfile = true }: { showProfile?: boolean }) {
  const p = svgPathsLogin;
  return (
    <div
      className="relative flex items-center"
      style={{
        height: 84,
        background: "#0b0b0b",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Montserrat', sans-serif",
        padding: "0 clamp(16px, 4vw, 32px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <LogoSvg />
      </div>

      {/* Right side actions */}
      
    </div>
  );
}

// ─── Sub-Nav Bar ──────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Business", iconKey: "building" },
  { label: "Design Category & Mood", iconKey: "widget" },
  { label: "Colors & Fonts", iconKey: "palette" },
  { label: "Pick Pages", iconKey: "document" },
];

function SubNav({
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
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "none";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
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
            onMouseEnter={(e) => {
              if (!onNext) return;
              (e.currentTarget as HTMLButtonElement).style.background = "#8fe3eb";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              if (!onNext) return;
              (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
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
        <button
          onClick={onBack}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
          className="flex items-center justify-center"
          style={{ borderRadius: 6 }}
        >
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
          onMouseEnter={(e) => {
            if (!onNext) return;
            (e.currentTarget as HTMLButtonElement).style.background = "#8fe3eb";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            if (!onNext) return;
            (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
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

// ─── PAGE 1: Login ────────────────────────────────────────────────────────────
function LoginPage({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const p = svgPathsLogin;

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleNext = () => {
    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setNotice({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setNotice(null);
    onNext();
  };

  return (
    <ScaledPage
      designHeight={900}
      header={
        <div
          className="flex items-center px-4 sm:px-[40px]"
          style={{
            height: 84,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            background: "#0b0b0b",
          }}
        >
          {/* Innovation City logo mark + wordmark */}
          <LogoSvg />
        </div>
      }
    >
      <div
        className="w-full flex flex-col flex-1"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif", minHeight: "100%" }}
      >
        {/* Page body — card centered */}
        <div className="flex flex-1 items-center justify-center p-5 sm:p-6">
          <div
            className="flex flex-col items-center gap-[28px] w-full max-w-[480px] p-6 sm:p-12"
            style={{
              background: "#131313",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
            }}
          >
            {/* Card header — logo mark + text centered */}
            <div className="flex flex-col items-center gap-[16px] w-full">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                }}
              >
                <svg width="28" height="28" viewBox="10 14 32 24" fill="none">
                  <path d={p.pdbfe710} fill="#5752A3" />
                  <path d={p.p389a4180} fill="#5752A3" />
                </svg>
              </div>
              <div className="text-center">
                <h2 className="text-white font-semibold text-[18px] mb-[8px]">Welcome back</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>
                  Enter your email to receive a one-time code
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", width: "100%" }} />

            {/* Form */}
            <div className="flex flex-col gap-[20px] w-full">
              {/* Email field */}
              <div className="flex flex-col gap-[8px]">
                <label
                  className="font-semibold uppercase"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}
                >
                  Email Address
                </label>
                {notice && (
                  <div
                    className="rounded-[12px] border px-[14px] py-[12px]"
                    style={{
                      background: "rgba(248,113,113,0.1)",
                      borderColor: "rgba(248,113,113,0.3)",
                      color: "#fecaca",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {notice.message}
                  </div>
                )}
                <div
                  className="flex items-center gap-[12px]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "14px 16px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d={p.pd3d5900}
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 bg-transparent outline-none font-medium text-[14px]"
                    style={{ color: "white", caretColor: "#6fccdd" }}
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                  />
                </div>
              </div>

              {/* Send Code button */}
              <button
                onClick={handleNext}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#8fe3eb";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
                className="w-full flex items-center justify-center gap-[8px] font-semibold text-[14px] uppercase"
                style={{
                  background: "#6fccdd",
                  color: "#0b0b0b",
                  borderRadius: 12,
                  padding: "16px 0",
                }}
              >
                Send Code
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d={p.p3bfa7a00}
                    stroke="#0b0b0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 2: OTP ──────────────────────────────────────────────────────────────
function OtpPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focused, setFocused] = useState(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocused(index + 1);
    }

    if (updated.every((digit) => digit !== "")) {
      onNext();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updated = [...otp];
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFocused(index - 1);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocused(index - 1);
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocused(index + 1);
    }
  };

  return (
    <ScaledPage
      designHeight={900}
      header={
        <div
          className="flex items-center px-4 sm:px-[40px]"
          style={{
            height: 84,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            background: "#0b0b0b",
          }}
        >
          <LogoSvg />
        </div>
      }
    >
      <div
        className="w-full flex flex-col flex-1"
        style={{
          background: "#0b0b0b",
          fontFamily: "'Montserrat', sans-serif",
          minHeight: "100%",
        }}
      >

        {/* Body */}
        <div
          className="flex flex-1 items-center justify-center p-5 sm:p-6"
        >

          {/* Card */}
          <div
            className="flex flex-col items-center gap-[28px] w-full max-w-[480px] p-5 sm:p-12"
            style={{
              background: "#131313",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              boxSizing: "border-box",
            }}
          >

            {/* Header */}
            <div className="flex flex-col items-center gap-[16px] w-full">

              <div
                className="flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                }}
              >
                <svg width="28" height="28" viewBox="10 14 32 24" fill="none">
                  <path d={svgPathsLogin.pdbfe710} fill="#5752A3" />
                  <path d={svgPathsLogin.p389a4180} fill="#5752A3" />
                </svg>
              </div>


              <div className="text-center">
                <h2 className="text-white font-semibold text-[18px] mb-[8px]">
                  Check your email
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Enter the 6-digit code we sent to your email
                </p>
              </div>

            </div>


            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.1)",
                width: "100%",
              }}
            />


            {/* OTP Boxes */}
            <div
              className="flex justify-center items-center w-full"
              style={{
                gap: "clamp(5px, 2vw, 10px)",
              }}
            >

              {otp.map((digit, index) => (

                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={digit}
                  maxLength={1}
                  inputMode="numeric"
                  onFocus={() => setFocused(index)}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="text-center text-white font-semibold outline-none"
                  style={{
                    width: "clamp(34px, 9vw, 56px)",
                    height: "clamp(44px, 12vw, 56px)",
                    fontSize: "clamp(16px, 4vw, 20px)",

                    background: "rgba(255,255,255,0.02)",

                    border:
                      focused === index
                        ? "2px solid #6fccdd"
                        : "1px solid rgba(255,255,255,0.1)",

                    borderRadius: 10,

                    boxShadow:
                      focused === index
                        ? "0 0 12px rgba(111,204,221,0.35)"
                        : "none",

                    flexShrink: 1,
                  }}
                />

              ))}

            </div>


            {/* Verify Button */}
            <button
              onClick={onNext}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#8fe3eb";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
              className="w-full font-semibold text-[14px] uppercase"
              style={{
                background: "#6fccdd",
                color: "#0b0b0b",
                borderRadius: 12,
                padding: "16px 0",
              }}
            >
              Verify Code
            </button>


            {/* Bottom Actions */}
            <div className="flex flex-col items-center gap-[12px]">

              <p
                className="text-center font-medium text-[13px]"
                style={{
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Didn't receive a code?{" "}
                <span
                  className="cursor-pointer font-semibold"
                  style={{
                    color: "#6fccdd",
                  }}
                >
                  Resend
                </span>
              </p>


              <button
                onClick={onBack}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
                className="font-medium text-[13px]"
                style={{
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                ← Back to email
              </button>

            </div>

          </div>

        </div>

      </div>
    </ScaledPage>
  );
}
// ─── PAGE 3: Questionnaire ────────────────────────────────────────────────────
function QuestionnairePage({ onNext, onBack, onStepClick, completedUpTo }: { onNext: () => void; onBack: () => void; onStepClick?: (step: number) => void; completedUpTo?: number }) {
  const p = svgPathsMerged;
  const [uploadOpen, setUploadOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload → POST /extract → pre-fill the form from the PDF
  async function extractFromPdf(file: File) {
    setUploadedFile(file);
    setExtracting(true);
    try {
      const { fields } = await api.extractPdf(file);
      setForm((f) => ({
        companyName: fields.name || f.companyName,
        uniqueness: fields.unique_selling_point || f.uniqueness,
        customers: fields.audience || f.customers,
        tagline: fields.tagline || f.tagline,
        cta: fields.cta_text || f.cta,
        anythingElse: fields.extra_context || f.anythingElse,
      }));
      saveWizard({
        extracted: {
          industry: fields.industry || undefined,
          description: fields.description || undefined,
          services: fields.services?.length ? fields.services : undefined,
          tone: fields.tone || undefined,
          location: fields.location || undefined,
          website: fields.website || undefined,
          contact_email: fields.contact_email || undefined,
          contact_phone: fields.contact_phone || undefined,
        },
      });
      setUploadOpen(false);
      setNotice({ type: "success", message: "Details extracted from your document — review and continue." });
    } catch (err: any) {
      const d = err?.detail;
      setNotice({
        type: "error",
        message:
          (typeof d === "object" && d?.reason) ||
          (typeof d === "string" && d) ||
          "Could not read that PDF — please fill the form manually.",
      });
    } finally {
      setExtracting(false);
    }
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) extractFromPdf(file);
  }
  function handleFileChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) extractFromPdf(file);
  }

  const [form, setForm] = useState(() => loadWizard().form);
  const [extracting, setExtracting] = useState(false);
  const [notice, setNotice] = useState<{ type: "error" | "success"; message: string } | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleNext = () => {
    const hasEmptyFields = Object.values(form).some((value) => String(value).trim() === "");
    if (hasEmptyFields) {
      setNotice({ type: "error", message: "Please fill in all fields before continuing." });
      return;
    }
    setNotice(null);
    saveWizard({ form });
    onNext();
  };

  const fields = [
    [
      { key: "companyName", label: "Company / Brand Name", placeholder: "e.g. Acme Corp" },
      { key: "uniqueness", label: "What makes your business unique?", placeholder: "e.g. 10 years of expertise, eco-friendly..." },
    ],
    [
      { key: "customers", label: "Who Are Your Customers?", placeholder: "e.g. Small business owners..." },
      { key: "tagline", label: "Tagline / Hero Message", placeholder: "e.g. Build faster, ship smarter" },
    ],
    [
      { key: "cta", label: "Main Call to Action", placeholder: "e.g. Get Started Free" },
      { key: "anythingElse", label: "Anything Else?", placeholder: "Additional context..." },
    ],
  ];

  return (
    <ScaledPage
      designHeight={1100}
      scrollable
      header={<><TopHeader /><SubNav activeStep={0} completedUpTo={completedUpTo} onBack={onBack} onNext={handleNext} onStepClick={onStepClick} /></>}
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(12px,3vw,24px)]">
          {/* Upload banner */}
          <div
            className="flex items-center justify-between px-[24px] py-[18px]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid white",
              borderRadius: 12,
              cursor: "pointer",
            }}
            onClick={() => setUploadOpen(true)}
          >
            <div className="flex items-center gap-[12px]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d={p.p2c12f480}
                  stroke="#6FCCDD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-semibold text-[14px]">
                {uploadedFile ? `Uploaded: ${uploadedFile.name}` : "Prefer to upload your portfolio instead?"}
              </span>
            </div>
            <button
              className="font-semibold text-[14px] underline"
              style={{ color: "#6fccdd" }}
              onClick={(e) => { e.stopPropagation(); setUploadOpen(true); }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#8fe3eb";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {uploadedFile ? "Change file →" : "Upload here →"}
            </button>
          </div>

          {/* Upload overlay */}
          {uploadOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 9999 }}
              onClick={() => setUploadOpen(false)}
            >
              <div
                className="flex flex-col items-center gap-[24px] p-5 sm:p-12 w-[calc(100%-32px)] sm:w-[520px] max-h-[90vh] overflow-y-auto"
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  fontFamily: "'Montserrat', sans-serif",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-white font-semibold text-[18px]">Upload Portfolio{extracting ? " — reading your document…" : ""}</span>
                  <button
                    onClick={() => setUploadOpen(false)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.color = "white";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "none";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }}
                    style={{ color: "rgba(255,255,255,0.5)", fontSize: 22, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
                  >×</button>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  className="flex flex-col items-center justify-center gap-[16px] w-full"
                  style={{
                    border: `2px dashed ${dragOver ? "#6FCCDD" : "rgba(255,255,255,0.2)"}`,
                    borderRadius: 14,
                    padding: "48px 32px",
                    background: dragOver ? "rgba(111,204,221,0.06)" : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(111,204,221,0.1)" />
                    <path d="M24 32V20M24 20L19 25M24 20L29 25" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 34h16" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="text-center">
                    <p className="text-white font-semibold text-[15px]">Drag & drop your file here</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 6 }}>or click to browse from your computer</p>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                    PDF · DOCX · PPTX · TXT · PNG · JPG — max 20 MB
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg"
                  style={{ display: "none" }}
                  onChange={handleFileChoose}
                />

                {/* Or divider */}
                <div className="flex items-center gap-[12px] w-full">
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>or</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                </div>

                <button
                  className="w-full font-semibold text-[14px]"
                  style={{
                    background: "#6FCCDD",
                    color: "#0b0b0b",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 0",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#8fe3eb";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#6FCCDD";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  Choose File from Computer
                </button>
              </div>
            </div>
          )}

          {/* Main form panel */}
          <div
            className="relative flex flex-col gap-[clamp(20px,4vw,40px)] p-[clamp(20px,6vw,56px)]"
            style={{
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)",
            }}
          >
            {/* Grid background */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.04, pointerEvents: "none" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div className="flex items-center gap-[10px] relative">
              <h2 className="text-white font-semibold" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Tell us about your brand</h2>
              <div className="w-[8px] h-[8px] rounded-full" style={{ background: "#6fccdd" }} />
            </div>

            {notice && (
              <div
                className="rounded-[12px] border px-[14px] py-[12px]"
                style={{
                  background: notice.type === "error" ? "rgba(248,113,113,0.1)" : "rgba(111,204,221,0.1)",
                  borderColor: notice.type === "error" ? "rgba(248,113,113,0.3)" : "rgba(111,204,221,0.25)",
                  color: notice.type === "error" ? "#fecaca" : "#bdeff3",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {notice.message}
              </div>
            )}

            {fields.map((row, ri) => (
              <div key={ri} className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                {row.map(({ key, label, placeholder }) => (
                  <div key={key} className="flex flex-col gap-[8px]">
                    <label
                      className="font-semibold uppercase"
                      style={{ fontSize: 12, color: "#6fccdd", letterSpacing: "0.08em" }}
                    >
                      {label}
                    </label>
                    <div
                      className="flex items-center"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        height: 48,
                        padding: "0 16px",
                      }}
                    >
                      <input
                        className="w-full bg-transparent outline-none font-medium text-[14px]"
                        style={{ color: "white", caretColor: "#6fccdd" }}
                        placeholder={placeholder}
                        value={(form as Record<string, string>)[key]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}

          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 4: Category & Mood ──────────────────────────────────────────────────
const BUSINESS_CATEGORIES = [
  { label: "Corporate Enterprise", desc: "Ideal for established businesses that need a professional online presence to build trust and attract clients." },
  { label: "Bookshop", desc: "Independent or chain bookstore selling physical or digital books to avid readers." },
  { label: "Coffee Shop", desc: "Café or coffeehouse with a warm, inviting atmosphere and specialty drinks." },
  { label: "Education", desc: "Schools, tutors, online courses or academic institutions delivering learning experiences." },
  { label: "Healthcare", desc: "Clinics, practices or health & wellness providers serving patients and communities." },
  { label: "Restaurant", desc: "Dining establishments, takeaway or food delivery services for food lovers." },
  { label: "Retail / E-commerce", desc: "Online or physical stores selling products directly to consumers." },
  { label: "Tech / SaaS", desc: "Software products, apps and technology companies solving modern problems." },
  { label: "Creative Agency", desc: "Design, marketing, branding and creative studios delivering bold ideas." },
  { label: "Fitness / Wellness", desc: "Gyms, studios, personal trainers and wellness coaches helping people thrive." },
  { label: "Real Estate", desc: "Property listings, agents or real estate developers connecting people with homes." },
  { label: "Non-Profit", desc: "Charities, foundations and community organizations making a difference." },
];
const DESIGN_MOODS = [
  { label: "Minimalist", desc: "Clean, airy and uncluttered. Let the content breathe and speak for itself." },
  { label: "Elegant", desc: "Refined typography, subtle luxury and understated sophistication throughout." },
  { label: "Bold", desc: "High contrast, strong typography and striking visuals that demand attention." },
  { label: "Playful", desc: "Fun colors, friendly shapes and an approachable, energetic vibe." },
  { label: "Professional & Trustworthy", desc: "Clean and credible design focused on building confidence, strengthening reputation, and driving engagement." },
  { label: "Dark & Modern", desc: "Deep backgrounds, neon accents and a futuristic, high-tech feel." },
  { label: "Warm & Inviting", desc: "Earth tones, cozy textures and a welcoming atmosphere that feels like home." },
  { label: "Editorial", desc: "Magazine-style layouts with strong typographic hierarchy and bold imagery." },
];
const ANIMATION_LEVELS = [
  { label: "Minimal", sub: "Subtle & clean" },
  { label: "Low", sub: "Light movements" },
  { label: "Balanced", sub: "Recommended" },
  { label: "High", sub: "More dynamic" },
];

function CategoryMoodPage({ onNext, onBack, onStepClick, completedUpTo }: { onNext: () => void; onBack: () => void; onStepClick?: (step: number) => void; completedUpTo?: number }) {
  const [category, setCategory] = useState(() => loadWizard().category || "");
  const [mood, setMood] = useState(() => loadWizard().mood || "");
  const [animLevel, setAnimLevel] = useState(() => loadWizard().animLevel);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [notice, setNotice] = useState<{ type: "error" | "success"; message: string } | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleNext = () => {
    if (!category.trim() || !mood.trim()) {
      setNotice({ type: "error", message: "Please choose both a business category and a design mood before continuing." });
      return;
    }
    setNotice(null);
    saveWizard({ category, mood, animLevel });
    onNext();
  };

  return (
    <ScaledPage
      designHeight={1000}
      scrollable
      header={<><TopHeader /><SubNav activeStep={1} completedUpTo={completedUpTo} onBack={onBack} onNext={handleNext} onStepClick={onStepClick} /></>}
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="px-[clamp(16px,7vw,120px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(24px,5vw,48px)]">

          {notice && (
            <div
              className="rounded-[12px] border px-[14px] py-[12px]"
              style={{
                background: "rgba(248,113,113,0.1)",
                borderColor: "rgba(248,113,113,0.3)",
                color: "#fecaca",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {notice.message}
            </div>
          )}

          {/* ── Cards row ─────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Business Category card */}
            <div
              className="flex-1 flex flex-col gap-[20px] p-[26px]"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16 }}
            >
              <div className="flex items-start justify-between gap-[16px]">
                {/* Text */}
                <div className="flex flex-col gap-[12px]">
                  <p className="font-semibold uppercase text-[12px]" style={{ color: "#6fccdd", letterSpacing: "0.1em" }}>
                    Business Category
                  </p>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="text-white font-semibold text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px]">{category || "Click here to select a category"}</h3>
                    <p className="font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 360 }}>
                      {BUSINESS_CATEGORIES.find((c) => c.label === category)?.desc ?? "Choose your business category to continue."}
                    </p>
                  </div>
                </div>
                {/* Icon chip — notched bottom-left corner */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 56, height: 56, background: "rgba(255,255,255,0.06)", borderRadius: "16px 16px 0 16px" }}
                >
                  <svg width="24" height="24" viewBox="0 0 20 19.83" fill="none">
                    <path d={svgPathsCatMood.p19985800} fill="#85D2DB" fillRule="evenodd" clipRule="evenodd" />
                    <path d={svgPathsCatMood.p3370aa80} fill="#85D2DB" />
                    <path d={svgPathsCatMood.p16ca8900} fill="#85D2DB" />
                    <path d={svgPathsCatMood.p148cf200} fill="#85D2DB" />
                  </svg>
                </div>
              </div>
              {/* Divider + link */}
              <div className="flex flex-col gap-[0px]">
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12 }} />
                <button
                  onClick={() => setShowCategoryModal(true)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#8fe3eb";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  className="flex items-center gap-[8px] font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] w-fit"
                  style={{ color: "#6fccdd" }}
                >
                  Click here to select a category
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.33 8H12.67M9.33 5L12.67 8L9.33 11" stroke="#6fccdd" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Design Mood card */}
            <div
              className="flex-1 flex flex-col gap-[20px] p-[26px]"
              style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16 }}
            >
              <div className="flex items-start justify-between gap-[16px]">
                <div className="flex flex-col gap-[12px]">
                  <p className="font-semibold uppercase text-[12px]" style={{ color: "#6fccdd", letterSpacing: "0.1em" }}>
                    Design Mood
                  </p>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="text-white font-semibold text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px]">{mood || "Click here to select a design mood"}</h3>
                    <p className="font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 360 }}>
                      {DESIGN_MOODS.find((m) => m.label === mood)?.desc ?? "Choose a design mood to continue."}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 56, height: 56, background: "rgba(255,255,255,0.06)", borderRadius: "16px 16px 0 16px" }}
                >
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d={svgPathsCatMood.p2c9a4a00} fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12 }} />
                <button
                  onClick={() => setShowMoodModal(true)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#8fe3eb";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  className="flex items-center gap-[8px] font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] w-fit"
                  style={{ color: "#6fccdd" }}
                >
                  Click here to select a design mood
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3.33 8H12.67M9.33 5L12.67 8L9.33 11" stroke="#6fccdd" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Animation Level ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-[32px] w-full">
            <p className="font-semibold uppercase text-[12px]" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>
              Animation Level
            </p>
            <div className="relative flex items-end w-full overflow-x-hidden">
              {/* Track line — vertically centered on dots, spans the full row */}
              <div
                className="absolute left-0 right-0 w-full"
                style={{ bottom: "clamp(8px, 2vw, 11px)", height: 2, background: "rgba(255,255,255,0.1)" }}
              />
              {ANIMATION_LEVELS.map((lvl, i) => {
                const isActive = i === animLevel;
                const dotSize = "clamp(18px, 4vw, 24px)";
                return (
                  <button
                    key={lvl.label}
                    onClick={() => setAnimLevel(i)}
                    className="flex-1 flex flex-col items-center relative z-10"
                    style={{ gap: "clamp(5px, 2vw, 12px)", minWidth: 0, padding: "0 2px" }}
                  >
                    {/* Label + sub-label above — clamp() sizing + wrapping so text never gets clipped */}
                    <div className="flex flex-col gap-[2px] items-center text-center" style={{ width: "100%" }}>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "clamp(10px, 3vw, 16px)",
                          lineHeight: 1.3,
                          color: isActive ? "#6fccdd" : "white",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          maxWidth: "100%",
                          display: "block",
                        }}
                      >
                        {lvl.label}
                      </span>
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: "clamp(8px, 2.4vw, 14px)",
                          lineHeight: 1.3,
                          color: "rgba(255,255,255,0.6)",
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          maxWidth: "100%",
                          display: "block",
                        }}
                      >
                        {lvl.sub}
                      </span>
                    </div>
                    {/* Circle on the track */}
                    {isActive ? (
                      <svg width={dotSize} height={dotSize} viewBox="0 0 20 20" fill="none">
                        <path d={svgPathsCatMood.p1e585400} fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg width={dotSize} height={dotSize} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" fill="rgba(255,255,255,0.2)" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Popup */}
        {showCategoryModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowCategoryModal(false)}
          >
            <div
              className="relative flex flex-col w-[calc(100%-32px)] sm:w-[90vw] max-w-[720px] gap-5 sm:gap-6 p-5 sm:p-10"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                maxHeight: "85vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between" style={{ flexShrink: 0 }}>
                <h3 className="text-white font-semibold" style={{ fontSize: "clamp(17px, 4vw, 20px)" }}>
                  Choose Business Category
                </h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  className="text-white font-bold flex items-center justify-center"
                  style={{
                    fontSize: 20,
                    width: 32,
                    height: 32,
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Category grid — 1 col mobile, 3 cols tablet/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUSINESS_CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => {
                      setCategory(cat.label);
                      setShowCategoryModal(false);
                    }}
                    className="text-left rounded-[12px] transition-all flex flex-col gap-[6px] p-4"
                    style={{
                      background: cat.label === category ? "rgba(111,204,221,0.12)" : "rgba(255,255,255,0.04)",
                      border: cat.label === category ? "1px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p
                      className="font-semibold leading-[18px]"
                      style={{ fontSize: "clamp(12px, 2.4vw, 13px)", color: cat.label === category ? "#6fccdd" : "white" }}
                    >
                      {cat.label}
                    </p>
                    <p
                      className="font-medium leading-[17px]"
                      style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "rgba(255,255,255,0.45)" }}
                    >
                      {cat.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mood Popup */}
        {showMoodModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowMoodModal(false)}
          >
            <div
              className="relative flex flex-col gap-5 sm:gap-6 p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[90vw] max-w-[720px]"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold" style={{ fontSize: "clamp(17px, 4vw, 20px)" }}>Choose Design Mood</h3>
                <button
                  onClick={() => setShowMoodModal(false)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  className="text-white font-bold text-[20px] w-[32px] h-[32px] flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 8,
                  }}
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                {DESIGN_MOODS.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => {
                      setMood(m.label);
                      setShowMoodModal(false);
                    }}
                    className="p-[20px] text-left rounded-[12px] transition-all"
                    style={{
                      background: m.label === mood ? "rgba(111,204,221,0.12)" : "rgba(255,255,255,0.04)",
                      border: m.label === mood ? "1px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="font-semibold text-[13px] sm:text-[15px] mb-[4px]" style={{ color: m.label === mood ? "#6fccdd" : "white" }}>{m.label}</p>
                    <p className="font-medium text-[11px] sm:text-[13px] leading-[16px] sm:leading-[18px]" style={{ color: "rgba(255,255,255,0.4)" }}>{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 5: Colors & Fonts ───────────────────────────────────────────────────
type PaletteEntry = { name: string; primary: string; secondary: string; background: string; text: string };
const PALETTES: PaletteEntry[] = [
  { name: "Modern Blue",    primary: "#2563EB", secondary: "#60A5FA", background: "#F8FAFC", text: "#1E293B" },
  { name: "Nature Green",   primary: "#16A34A", secondary: "#86EFAC", background: "#F0FDF4", text: "#14532D" },
  { name: "Elegant Purple", primary: "#7C3AED", secondary: "#C4B5FD", background: "#FAF5FF", text: "#312E81" },
  { name: "Warm Orange",    primary: "#EA580C", secondary: "#FDBA74", background: "#FFF7ED", text: "#7C2D12" },
  { name: "Minimal",        primary: "#111827", secondary: "#6B7280", background: "#FFFFFF", text: "#111827" },
  { name: "Luxury Gold",    primary: "#D4AF37", secondary: "#F5D76E", background: "#1C1C1C", text: "#F9FAFB" },
  { name: "Soft Pink",      primary: "#EC4899", secondary: "#F9A8D4", background: "#FDF2F8", text: "#831843" },
];

type FontPair = { name: string; heading: string; body: string };
const FONT_PAIRS: FontPair[] = [
  { name: "Modern Startup",    heading: "Poppins",           body: "Inter" },
  { name: "Elegant Editorial", heading: "Playfair Display",  body: "Source Sans 3" },
  { name: "Corporate",         heading: "Montserrat",        body: "Open Sans" },
  { name: "Professional Blog", heading: "Merriweather",      body: "Lato" },
  { name: "Tech & SaaS",       heading: "Space Grotesk",     body: "Inter" },
  { name: "Luxury Brand",      heading: "DM Serif Display",  body: "Manrope" },
  { name: "Creative Studio",   heading: "Bebas Neue",        body: "Nunito Sans" },
];

// Top-200 Google Fonts for the custom font search
const GOOGLE_FONTS_LIST = [
  "ABeeZee","Abel","Abhaya Libre","Abril Fatface","Aclonica","Acme","Actor","Adamina","Advent Pro","Aguafina Script","Akronim","Aladin","Aldrich","Alef","Alegreya","Alegreya SC","Alegreya Sans","Alegreya Sans SC","Aleo","Alex Brush","Alfa Slab One","Alice","Alike","Alike Angular","Allan","Allerta","Allerta Stencil","Allura","Almarai","Almendra","Almendra Display","Almendra SC","Amatic SC","Amethysta","Amiko","Amiri","Amita","Anaheim","Andada Pro","Andika","Angkor","Annie Use Your Telescope","Anonymous Pro","Antic","Antic Didone","Antic Slab","Anton","Arbutus","Arbutus Slab","Architects Daughter","Archivo","Archivo Black","Archivo Narrow","Aref Ruqaa","Arima Madurai","Arimo","Arizonia","Armata","Arsenal","Arvo","Arya","Asap","Asap Condensed","Asset","Assistant","Astloch","Asul","Athiti","Atma","Atomic Age","Aubrey","Audiowide","Autour One","Average","Average Sans","Averia Gruesa Libre","Averia Libre","Averia Sans Libre","Averia Serif Libre","B612","B612 Mono","Bad Script","Bahiana","Bahianita","Baloo 2","Baloo Bhai 2","Baloo Bhaijaan 2","Baloo Bhaina 2","Baloo Chettan 2","Baloo Da 2","Baloo Paaji 2","Baloo Tamma 2","Baloo Tammudu 2","Baloo Thambi 2","Balsamiq Sans","Balthazar","Bangers","Barlow","Barlow Condensed","Barlow Semi Condensed","Barriecito","Barrio","Basic","Baskervville","Battambang","Baumans","Bayon","Be Vietnam Pro","Bebas Neue","Belgrano","Bellefair","Belleza","Bellota","Bellota Text","BenchNine","Benne","Bentham","Berkshire Swash","Beth Ellen","Bevan","Big Shoulders Display","Big Shoulders Inline Display","Big Shoulders Inline Text","Big Shoulders Stencil Display","Big Shoulders Stencil Text","Big Shoulders Text","Bigelow Rules","Bigshot One","Bilbo","Bilbo Swash Caps","BioRhyme","BioRhyme Expanded","Birthstone","Birthstone Bounce","Biryani","Bitter","Black And White Picture","Black Han Sans","Black Ops One","Blinker","Bonbon","Boogaloo","Bowlby One","Bowlby One SC","Brawler","Bree Serif","Brygada 1918","Bubblegum Sans","Bubbler One","Buenard","Bungee","Bungee Hairline","Bungee Inline","Bungee Outline","Bungee Shade","Butcherman","Butterfly Kids","Cabin","Cabin Condensed","Cabin Sketch","Caesar Dressing","Cagliostro","Cairo","Cairo Play","Caladea","Calistoga","Calligraffitti","Cambay","Cambo","Candal","Cantarell","Cantata One","Cantora One","Capriola","Caramel","Carattere","Cardo","Carme","Carrois Gothic","Carrois Gothic SC","Carter One","Castoro","Catamaran","Caudex","Caveat","Caveat Brush","Cedarville Cursive","Ceviche One","Chakra Petch","Changa","Changa One","Chango","Charm","Charmonman","Chathura","Chau Philomene One","Chela One","Chelsea Market","Chenla","Cherry Cream Soda","Cherry Swash","Chewy","Chicle","Chilanka","Chivo","Chivo Mono","Chonburi","Cinzel","Cinzel Decorative","Clicker Script","Coda","Coda Caption","Codystar","Coiny","Combo","Comfortaa","Comforter","Comforter Brush","Comic Neue","Coming Soon","Commissioner","Concert One","Condiment","Content","Contrail One","Convergence","Cookie","Copse","Corben","Corinthia","Cormorant","Cormorant Garamond","Cormorant Infant","Cormorant SC","Cormorant Unicase","Cormorant Upright","Courgette","Courier Prime","Cousine","Coustard","Covered By Your Grace","Crafty Girls","Creepster","Crete Round","Crimson Pro","Crimson Text","Croissant One","Crushed","Cuprum","Cute Font","Cutive","Cutive Mono","DM Mono","DM Sans","DM Serif Display","DM Serif Text","Damion","Dancing Script","Dangrek","Darker Grotesque","David Libre","Dawning of a New Day","Days One","Dekko","Dela Gothic One","Delius","Delius Swash Caps","Delius Unicase","Della Respira","Denk One","Devonshire","Dhurjati","Didact Gothic","Diplomata","Diplomata SC","Do Hyeon","Dokdo","Domine","Donegal One","Dongle","Doppio One","Dorsa","Dosis","DotGothic16","Duru Sans","Dynalight","EB Garamond","Eagle Lake","East Sea Dokdo","Eater","Economica","Eczar","El Messiri","Electrolize","Elsie","Elsie Swash Caps","Emblema One","Emilys Candy","Encode Sans","Encode Sans Condensed","Encode Sans Expanded","Encode Sans SC","Encode Sans Semi Condensed","Encode Sans Semi Expanded","Engagement","Englebert","Enriqueta","Ephesis","Epilogue","Erica One","Esteban","Estonia","Euphoria Script","Ewert","Exo","Exo 2","Expletus Sans","Explora","Fahkwang","Familjen Grotesk","Fanwood Text","Farro","Farsan","Fascinate","Fascinate Inline","Faster One","Fasthand","Fauna One","Faustina","Federant","Federo","Felipa","Fenix","Festive","Figtree","Finger Paint","Finlandica","Fira Code","Fira Mono","Fira Sans","Fira Sans Condensed","Fira Sans Extra Condensed","Fjalla One","Fjord One","Flamenco","Flavors","Fleur De Leah","Flow Block","Flow Circular","Flow Rounded","Fondamento","Fontdiner Swanky","Forum","Fragment Mono","Francois One","Frank Ruhl Libre","Fraunces","Freckle Face","Fredericka the Great","Fredoka","Freehand","Fresca","Frijole","Fruktur","Fugaz One","Fuggles","Fuzzy Bubbles","GFS Didot","GFS Neohellenic","Gabriela","Gaegu","Gafata","Galada","Galdeano","Galindo","Gamja Flower","Gantari","Gayathri","Gelasio","Gemunu Libre","Genos","Gentium Book Plus","Gentium Plus","Geo","Georama","Geostar","Geostar Fill","Germania One","Gideon Roman","Gidugu","Gilda Display","Girassol","Give You Glory","Glass Antiqua","Glegoo","Gloock","Gloria Hallelujah","Gluten","Goblin One","Gochi Hand","Goldman","Gorditas","Gothic A1","Gotu","Goudy Bookletter 1911","Goudy Starved","Graduate","Grand Hotel","Grandstander","Gravitas One","Great Vibes","Grechen Fuemen","Grenze","Grenze Gotisch","Grey Qo","Griffy","Gruppo","Gudea","Gugi","Gulzar","Gupter","Gurajada","Gwendolyn","Habibi","Hachi Maru Pop","Hahmlet","Halant","Hammersmith One","Hanalei","Hanalei Fill","Handlee","Hanuman","Happy Monkey","Harmattan","Headland One","Heebo","Henny Penny","Hepta Slab","Herr Von Muellerhoff","Hi Melody","Hiragino Sans","Holtwood One SC","Homemade Apple","Homenaje","Hubballi","Hurricane","IBM Plex Mono","IBM Plex Sans","IBM Plex Sans Arabic","IBM Plex Sans Condensed","IBM Plex Sans Devanagari","IBM Plex Sans Hebrew","IBM Plex Sans KR","IBM Plex Sans Thai","IBM Plex Sans Thai Looped","IBM Plex Serif","IM Fell Double Pica","IM Fell DW Pica","IM Fell English","IM Fell English SC","IM Fell French Canon","IM Fell French Canon SC","IM Fell Great Primer","IM Fell Great Primer SC","Ibarra Real Nova","Iceberg","Iceland","Imbue","Imperial Script","Imprima","Inconsolata","Inder","Indie Flower","Ingrid Darling","Inika","Inknut Antiqua","Inria Sans","Inria Serif","Inspiration","Inter","Inter Tight","Irish Grover","Island Moments","Istok Web","Italiana","Italianno","Itim","Jacques Francois","Jacques Francois Shadow","Jaldi","JetBrains Mono","Jim Nightshade","Joan","Josefin Sans","Josefin Slab","Jost","Joti One","Jua","Judson","Julee","Julius Sans One","Junge","Jura","Just Another Hand","Just Me Again Down Here","K2D","Kaisei Decol","Kaisei HarunoUmi","Kaisei Opti","Kaisei Tokumin","Kalam","Karla","Karma","Katibeh","Kaushan Script","Kavivanar","Kavoon","Kdam Thmor Pro","Keania One","Kelly Slab","Kenia","Khand","Khmer","Khula","Kings","Kirang Haerang","Kite One","Kiwi Maru","Klee One","Knewave","KoHo","Kodchasan","Koh Santepheap","Kolker Brush","Konkhmer Sleokchher","Kosugi","Kosugi Maru","Kotta One","Koulen","Kranky","Kreon","Kristi","Krona One","Krub","Kufam","Kulim Park","Kumar One","Kumar One Outline","Kumbh Sans","Kurale","La Belle Aurore","Lacquer","Laila","Lakki Reddy","Lalezar","Lancelot","Langar","Lateef","Lato","League Gothic","League Script","League Spartan","Leckerli One","Ledger","Lekton","Lemon","Lemonada","Lexend","Lexend Deca","Lexend Exa","Lexend Giga","Lexend Mega","Lexend Peta","Lexend Tera","Lexend Zetta","Libre Baskerville","Libre Bodoni","Libre Caslon Display","Libre Caslon Text","Libre Franklin","Licorice","Life Savers","Lilita One","Lily Script One","Limelight","Linden Hill","Lithograph","Literata","Liu Jian Mao Cao","Livvic","Lobster","Lobster Two","Londrina Outline","Londrina Shadow","Londrina Sketch","Londrina Solid","Long Cang","Lora","Love Light","Love Ya Like A Sister","Loved by the King","Lovers Quarrel","Luckiest Guy","Lusitana","Lustria","Luxurious Roman","Luxurious Script","M PLUS 1","M PLUS 1 Code","M PLUS 1p","M PLUS 2","M PLUS Code Latin","M PLUS Rounded 1c","Ma Shan Zheng","Macondo","Macondo Swash Caps","Mada","Magra","Maiden Orange","Maitree","Major Mono Display","Mako","Mali","Mallanna","Mandali","Manjari","Manrope","Mansalva","Manuale","Marcellus","Marcellus SC","Marck Script","Margarine","Marhey","Markazi Text","Marko One","Marmelad","Martel","Martel Sans","Marvel","Mate","Mate SC","Maven Pro","McLaren","Mea Culpa","Meddon","MedievalSharp","Medula One","Meera Inimai","Megrim","Meie Script","Meow Script","Merienda","Merriweather","Merriweather Sans","Metal","Metal Mania","Metamorphous","Metrophobic","Michroma","Milonga","Miltonian","Miltonian Tattoo","Mina","Mingzat","Miniver","Miriam Libre","Mirza","Miss Fajardose","Mitr","Mochiy Pop One","Mochiy Pop P One","Modak","Modern Antiqua","Mogra","Mohave","Molengo","Molle","Monda","Monofett","Monomaniac One","Monoton","Monsieur La Doulaise","Montaga","Montagu Slab","MonteCarlo","Montez","Montserrat","Montserrat Alternates","Montserrat Subrayada","Moo Lah Lah","Moon Dance","Moul","Moulpali","Mountains of Christmas","Mouse Memoirs","Mr Bedfort","Mr Dafoe","Mr De Haviland","Mrs Saint Delafield","Mrs Sheppards","Ms Madi","Mukta","Mukta Mahee","Mukta Malar","Mukta Vaani","Mulish","Murecho","MuseoModerno","Mystery Quest","NTR","Nanum Brush Script","Nanum Gothic","Nanum Gothic Coding","Nanum Myeongjo","Nanum Pen Script","Neonderthaw","Nerko One","Neucha","Neuton","New Rocker","New Tegomin","News Cycle","Newsreader","Niconne","Niramit","Nixie One","Nobile","Nokora","Norican","Nosifer","Notable","Nothing You Could Do","Noticia Text","Noto Color Emoji","Noto Emoji","Noto Kufi Arabic","Noto Music","Noto Naskh Arabic","Noto Nastaliq Urdu","Noto Rashi Hebrew","Noto Sans","Noto Serif","Nova Cut","Nova Flat","Nova Mono","Nova Oval","Nova Round","Nova Script","Nova Slim","Nova Square","Numans","Nunito","Nunito Sans","Odibee Sans","Odor Mean Chey","Offside","Oi","Ojuju","Old Standard TT","Oldenburg","Ole","Oleo Script","Oleo Script Swash Caps","Onest","Open Sans","Oranienbaum","Orbit","Orbitron","Oregano","Orienta","Original Surfer","Oswald","Outfit","Over the Rainbow","Overlock","Overlock SC","Overpass","Overpass Mono","Ovo","Oxanium","Oxygen","Oxygen Mono","PT Mono","PT Sans","PT Sans Caption","PT Sans Narrow","PT Serif","PT Serif Caption","Pacifico","Padauk","Padyakke Expanded One","Palanquin","Palanquin Dark","Palette Mosaic","Pangolin","Paprika","Parisienne","Passero One","Passion One","Passions Conflict","Pathway Extreme","Pathway Gothic One","Patrick Hand","Patrick Hand SC","Pattaya","Patua One","Pavanam","Paytone One","Peddana","Peralta","Permanent Marker","Petemoss","Petit Formal Script","Petrona","Phetsarath OT","Philosopher","Piazzolla","Piedra","Pinyon Script","Pirata One","Plaster","Play","Playball","Playfair Display","Playfair Display SC","Playfair Display","Plus Jakarta Sans","Podkova","Poiret One","Poller One","Poltawski Nowy","Poly","Pompiere","Pontano Sans","Poor Story","Poppins","Potta One","Pragati Narrow","Praise","Prata","Preahvihear","Press Start 2P","Pridi","Princess Sofia","Prociono","Prompt","Prosto One","Proza Libre","Public Sans","Puppies Play","Puritan","Purple Purse","Qahiri","Quando","Quantico","Quattrocento","Quattrocento Sans","Questrial","Quicksand","Quintessential","Qwigley","Qwitcher Grypen","Racing Sans One","Radio Canada","Radley","Rajdhani","Rakkas","Raleway","Raleway Dots","Ramabhadra","Ramaraja","Rambla","Rammetto One","Rampart One","Rancho","Ranga","Rasa","Rationale","Ravi Prakash","Readex Pro","Recursive","Red Hat Display","Red Hat Mono","Red Hat Text","Red Rose","Redacted","Redacted Script","Reenie Beanie","Reggae One","Revalia","Rhodium Libre","Ribeye","Ribeye Marrow","Righteous","Risque","Road Rage","Roboto","Roboto Condensed","Roboto Flex","Roboto Mono","Roboto Serif","Roboto Slab","Rochester","Rock 3D","Rock Salt","RocknRoll One","Rokkitt","Romanesco","Ropa Sans","Rosario","Rosarivo","Rouge Script","Rowdies","Rozha One","Rubik","Rubik 80s Fade","Rubik Beastly","Rubik Bubbles","Rubik Burned","Rubik Dirt","Rubik Distressed","Rubik Gemstones","Rubik Glitch","Rubik Iso","Rubik Marker Hatch","Rubik Maze","Rubik Microbe","Rubik Mono One","Rubik Moonrocks","Rubik One","Rubik Pixels","Rubik Puddles","Rubik Scribble","Rubik Spray Paint","Rubik Storm","Rubik Vinyl","Rubik Wet Paint","Ruda","Rufina","Ruge Boogie","Ruluko","Rum Raisin","Ruslan Display","Russo One","Ruthie","Rye","STIX Two Text","Sacramento","Sahitya","Sail","Saira","Saira Condensed","Saira Extra Condensed","Saira Semi Condensed","Saira Stencil One","Salsa","Sanchez","Sancreek","Sansita","Sansita Swashed","Sarabun","Sarala","Sarina","Sarpanch","Sassy Frass","Satisfy","Sawarabi Gothic","Sawarabi Mincho","Scada","Scheherazade New","Schibsted Grotesk","Schoolbell","Scope One","Seaweed Script","Secular One","Sedgwick Ave","Sedgwick Ave Display","Sen","Sevillana","Seymour One","Shadows Into Light","Shadows Into Light Two","Shalimar","Shantell Sans","Shanti","Share","Share Tech","Share Tech Mono","Shippori Antique","Shippori Antique B1","Shippori Mincho","Shippori Mincho B1","Shizuru","Shojumaru","Short Stack","Shrikhand","Siemreap","Sigmar","Sigmar One","Signika","Signika Negative","Simonetta","Single Day","Sintony","Sirin Stencil","Six Caps","Skranji","Slabo 13px","Slabo 27px","Slackey","Sloshy","Smythe","Sniglet","Snippet","Snowburst One","Sofadi One","Sofia","Sofia Sans","Sofia Sans Condensed","Sofia Sans Extra Condensed","Sofia Sans Semi Condensed","Solway","Song Myung","Sono","Sonsie One","Sora","Sorts Mill Goudy","Source Code Pro","Source Sans 3","Source Serif 4","Space Grotesk","Space Mono","Special Elite","Spectral","Spectral SC","Spicy Rice","Spinnaker","Spirax","Splash","Spline Sans","Spline Sans Mono","Squada One","Square Peg","Sree Krushnadevaraya","Sriracha","Srisakdi","Staatliches","Stalemate","Stalinist One","Stardos Stencil","Stick","Stick No Bills","Stint Ultra Condensed","Stint Ultra Expanded","Stoke","Strait","Style Script","Stylish","Sue Ellen Francisco","Suez One","Sulphur Point","Sumana","Sunflower","Sunshiney","Supermercado One","Sura","Suranna","Suravaram","Suwannaphum","Swanky and Moo Moo","Syncopate","Syne","Syne Mono","Syne Tactile","Tai Heritage Pro","Tajawal","Tangerine","Tapestry","Taprom","Tauri","Taviraj","Teko","Tektur","Tenali Ramakrishna","Tenor Sans","Text Me One","Thasadith","The Girl Next Door","The Nautigal","Tienne","Tillana","Tilt Neon","Tilt Prism","Tilt Warp","Timmana","Tinos","Tiro Bangla","Tiro Devanagari Hindi","Tiro Devanagari Marathi","Tiro Devanagari Sanskrit","Tiro Gurmukhi","Tiro Kannada","Tiro Tamil","Tiro Telugu","Titan One","Titillium Web","Tomorrow","Tourney","Trade Winds","Train One","Trirong","Trocchi","Trochut","Truculenta","Tsukimi Rounded","Tulpen One","Turret Road","Twinkle Star","Ubuntu","Ubuntu Condensed","Ubuntu Mono","Uchen","Ultra","Unbounded","Uncial Antiqua","Underdog","Unica One","UnifrakturCook","UnifrakturMaguntia","Unkempt","Unlock","Unna","Updock","Urbanist","Varta","Vesper Libre","Viaoda Libre","Vibes","Vibur","Victor Mono","Vidaloka","Viga","Vujahday Script","Vollkorn","Vollkorn SC","Voltaire","Vonique","Waiting for the Sunrise","Wallpoet","Walter Turncoat","Warnes","Water Brush","Waterfall","Wavefont","Wellfleet","Wendy One","Whisper","WindSong","Wire One","Wix Madefor Display","Wix Madefor Text","Work Sans","Xanh Mono","Yaldevi","Yanone Kaffeesatz","Yantramanav","Yatra One","Yellowtail","Yeon Sung","Yeseva One","Yesteryear","Yomogi","Young Serif","Yrsa","Yuji Boku","Yuji Mai","Yuji Syuku","Yusei Magic","ZCOOL KuaiLe","ZCOOL QingKe HuangYou","ZCOOL XiaoWei","Zen Antique","Zen Antique Soft","Zen Dots","Zen Kaku Gothic Antique","Zen Kaku Gothic New","Zen Kurenaido","Zen Loop","Zen Maru Gothic","Zen Old Mincho","Zen Tokyo Zoo","Zeyada","Zhi Mang Xing","Zilla Slab","Zilla Slab Highlight",
];

type CustomPalette = { primary: string; secondary: string; background: string; text: string };
function ColorsFontsPage({ onNext, onBack, onStepClick, completedUpTo }: { onNext: () => void; onBack: () => void; onStepClick?: (step: number) => void; completedUpTo?: number }) {
  const [selectedPalette, setSelectedPalette] = useState(() => {
    const saved = loadWizard().palette;
    if (!saved) return 0;
    const i = PALETTES.findIndex((p) => p.name === saved.name);
    return i >= 0 ? i : PALETTES.length;
  });
  const [selectedFont, setSelectedFont] = useState(() => {
    const saved = loadWizard().font;
    if (!saved) return 0;
    const i = FONT_PAIRS.findIndex((f) => f.name === saved.name);
    return i >= 0 ? i : FONT_PAIRS.length;
  });
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [specificColors, setSpecificColors] = useState(false);
  const [customPalette, setCustomPalette] = useState<CustomPalette | null>(() => {
    const saved = loadWizard().palette;
    return saved && saved.name === "Custom"
      ? { primary: saved.primary, secondary: saved.secondary, background: saved.background, text: saved.text }
      : null;
  });
  const [customDraft, setCustomDraft] = useState<CustomPalette>({ primary: "", secondary: "", background: "", text: "" });
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [customFont, setCustomFont] = useState<FontPair | null>(() => {
    const saved = loadWizard().font;
    return saved && saved.name === "Custom" ? { ...saved } : null;
  });
  const [fontDraft, setFontDraft] = useState<{ heading: string; body: string }>({ heading: "", body: "" });
  const [headingSearch, setHeadingSearch] = useState("");
  const [bodySearch, setBodySearch] = useState("");

  const handleNext = () => {
    const palette =
      selectedPalette < PALETTES.length
        ? { ...PALETTES[selectedPalette] }
        : customPalette
          ? { name: "Custom", ...customPalette }
          : null;
    const font =
      selectedFont < FONT_PAIRS.length
        ? { ...FONT_PAIRS[selectedFont] }
        : customFont
          ? { name: "Custom", heading: customFont.heading, body: customFont.body }
          : null;
    saveWizard({ palette, font });
    onNext();
  };

  return (
    <ScaledPage
      designHeight={1200}
      scrollable
      header={<><TopHeader /><SubNav activeStep={2} completedUpTo={completedUpTo} onBack={onBack} onNext={handleNext} onStepClick={onStepClick} /></>}
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(20px,4vw,40px)]">
          {/* Palettes section */}
          <div className="flex flex-col gap-[20px]">
            <span
              className="font-semibold uppercase text-[13px]"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
            >
              Theme Mode
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 7 preset palette cards */}
              {PALETTES.map((palette, i) => {
                const colors = [palette.primary, palette.secondary, palette.background, palette.text];
                const selected = selectedPalette === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedPalette(i)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                    className="relative flex flex-col rounded-[8px] overflow-hidden"
                    style={{
                      height: 80,
                      outline: selected ? "2px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                      outlineOffset: selected ? 2 : 0,
                    }}
                  >
                    <div className="flex w-full" style={{ height: 58 }}>
                      {colors.map((color, j) => (
                        <div key={j} className="flex-1 h-full" style={{ background: color }} />
                      ))}
                    </div>
                    <div
                      className="flex items-center justify-center w-full"
                      style={{ height: 22, background: "#1a1a1a", fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, letterSpacing: "0.03em" }}
                    >
                      {palette.name}
                    </div>
                    <div
                      className="absolute top-[6px] right-[6px] flex items-center justify-center rounded-full"
                      style={{
                        width: 18,
                        height: 18,
                        background: selected ? "#6fccdd" : "rgba(0,0,0,0.3)",
                        border: selected ? "none" : "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      {selected && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Custom palette card */}
              {(() => {
                const CUSTOM_IDX = PALETTES.length;
                const selected = selectedPalette === CUSTOM_IDX;
                return (
                  <button
                    onClick={() => { if (customPalette) setCustomDraft({ ...customPalette }); setCustomModalOpen(true); }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                    className="relative flex flex-col rounded-[8px] overflow-hidden"
                    style={{
                      height: 80,
                      outline: selected ? "2px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                      outlineOffset: selected ? 2 : 0,
                      background: customPalette
                        ? undefined
                        : "rgba(255,255,255,0.03)",
                    }}
                  >
                    {customPalette ? (
                      <div className="flex w-full" style={{ height: 58 }}>
                        {[customPalette.primary, customPalette.secondary, customPalette.background, customPalette.text].map((c, j) => (
                          <div key={j} className="flex-1 h-full" style={{ background: c }} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full" style={{ height: 58, gap: 4 }}>
                        {/* Paint palette icon */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <circle cx="8.5" cy="9" r="1.5" fill="#6FCCDD" />
                          <circle cx="12" cy="6.5" r="1.5" fill="#EC4899" />
                          <circle cx="15.5" cy="9" r="1.5" fill="#F5D76E" />
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10 1.104 0 2-.896 2-2a1.99 1.99 0 00-.512-1.342c-.13-.149-.247-.31-.347-.48a2 2 0 011.73-3.178h1.943C19.379 15 22 12.379 22 9.129 22 5.195 17.522 2 12 2z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    <div
                      className="flex items-center justify-center w-full"
                      style={{ height: 22, background: "#1a1a1a", fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, letterSpacing: "0.03em" }}
                    >
                      Custom
                    </div>
                    <div
                      className="absolute top-[6px] right-[6px] flex items-center justify-center rounded-full"
                      style={{
                        width: 18,
                        height: 18,
                        background: selected ? "#6fccdd" : "rgba(0,0,0,0.3)",
                        border: selected ? "none" : "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      {selected && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })()}
            </div>

            {/* Custom palette modal */}
            {customModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999 }}
                onClick={() => setCustomModalOpen(false)}
              >
                <div
                  className="flex flex-col gap-[24px] p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[420px] max-h-[90vh] overflow-y-auto"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, fontFamily: "'Montserrat',sans-serif" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-[17px]">Custom Palette</span>
                    <button onClick={() => setCustomModalOpen(false)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-center gap-[10px]" style={{ cursor: "pointer" }}>
                    <div
                      onClick={() => {
                        const next = !specificColors;
                        setSpecificColors(next);
                        if (!next) {
                          // Regenerate derived colors from current primary
                          const hex = customDraft.primary.replace("#", "");
                          if (hex.length === 6) {
                            const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
                            const mix = (c: number, w: number) => Math.round(c+(255-c)*w);
                            const toHex = (r: number,g: number,b: number) => "#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
                            setCustomDraft(d => ({
                              ...d,
                              secondary: toHex(mix(r,.5),mix(g,.5),mix(b,.5)),
                              background: toHex(mix(r,.88),mix(g,.88),mix(b,.88)),
                              text: (0.299*r+0.587*g+0.114*b)/255 > 0.45
                                ? toHex(Math.round(r*.15),Math.round(g*.15),Math.round(b*.15))
                                : toHex(mix(r,.92),mix(g,.92),mix(b,.92)),
                            }));
                          }
                        }
                      }}
                      style={{
                        width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                        background: specificColors ? "#6FCCDD" : "rgba(255,255,255,0.08)",
                        border: `1.5px solid ${specificColors ? "#6FCCDD" : "rgba(255,255,255,0.25)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {specificColors && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#0b0b0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Enter more specific colors</span>
                  </label>

                  {(["primary","secondary","background","text"] as const).map((field) => {
                    const labels: Record<string, string> = { primary: "Primary", secondary: "Secondary", background: "Background", text: "Text" };
                    const disabled = field !== "primary" && !specificColors;
                    return (
                      <div key={field} className="flex items-center gap-[16px]" style={{ opacity: disabled ? 0.35 : 1, transition: "opacity 0.2s" }}>
                        <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
                          <div
                            style={{
                              width: 36, height: 36, borderRadius: 8,
                              background: customDraft[field] || "#333",
                              border: "1px solid rgba(255,255,255,0.15)",
                              cursor: disabled ? "not-allowed" : "pointer",
                            }}
                          />
                          {!disabled && (
                            <input
                              type="color"
                              value={customDraft[field] || "#333333"}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (field === "primary" && !specificColors) {
                                  const hex = val.replace("#","");
                                  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
                                  const mix = (c: number, w: number) => Math.round(c+(255-c)*w);
                                  const toHex = (r: number,g: number,b: number) => "#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
                                  setCustomDraft(d => ({
                                    ...d,
                                    primary: val,
                                    secondary: toHex(mix(r,.5),mix(g,.5),mix(b,.5)),
                                    background: toHex(mix(r,.88),mix(g,.88),mix(b,.88)),
                                    text: (0.299*r+0.587*g+0.114*b)/255 > 0.45
                                      ? toHex(Math.round(r*.15),Math.round(g*.15),Math.round(b*.15))
                                      : toHex(mix(r,.92),mix(g,.92),mix(b,.92)),
                                  }));
                                } else {
                                  setCustomDraft(d => ({ ...d, [field]: val }));
                                }
                              }}
                              style={{
                                position: "absolute", inset: 0, width: "100%", height: "100%",
                                opacity: 0, cursor: "pointer", border: "none", padding: 0,
                              }}
                              title="Pick a color"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-[4px] flex-1">
                          <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            {labels[field]}
                          </label>
                          <input
                            type="text"
                            value={customDraft[field]}
                            disabled={disabled}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (field === "primary" && !specificColors) {
                                const hex = val.replace("#","");
                                if (hex.length === 6) {
                                  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
                                  const mix = (c: number, w: number) => Math.round(c+(255-c)*w);
                                  const toHex = (r: number,g: number,b: number) => "#"+[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("");
                                  setCustomDraft(d => ({
                                    ...d,
                                    primary: val,
                                    secondary: toHex(mix(r,.5),mix(g,.5),mix(b,.5)),
                                    background: toHex(mix(r,.88),mix(g,.88),mix(b,.88)),
                                    text: (0.299*r+0.587*g+0.114*b)/255 > 0.45
                                      ? toHex(Math.round(r*.15),Math.round(g*.15),Math.round(b*.15))
                                      : toHex(mix(r,.92),mix(g,.92),mix(b,.92)),
                                  }));
                                } else {
                                  setCustomDraft(d => ({ ...d, primary: val }));
                                }
                              } else {
                                setCustomDraft(d => ({ ...d, [field]: val }));
                              }
                            }}
                            placeholder="#000000"
                            maxLength={7}
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              borderRadius: 8,
                              color: "white",
                              fontSize: 14,
                              fontFamily: "'Montserrat',sans-serif",
                              fontWeight: 600,
                              padding: "8px 12px",
                              outline: "none",
                              width: "100%",
                              cursor: disabled ? "not-allowed" : "text",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex gap-[12px]">
                    <button
                      onClick={() => setCustomModalOpen(false)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      }}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setCustomPalette({ ...customDraft });
                        setSelectedPalette(PALETTES.length);
                        setCustomModalOpen(false);
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#8fe3eb";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#6FCCDD";
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      }}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Font Pairings section */}
          <div className="flex flex-col gap-[20px]">
            <span
              className="font-semibold uppercase text-[13px]"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
            >
              Font Pairings
            </span>

            {/* Unified responsive grid — 2 cols mobile, 3 tablet, 4 desktop. CSS decides the
                column count (Tailwind breakpoints), not JS device detection. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {FONT_PAIRS.map((pair, i) => (
                <FontCard key={i} pair={pair} selected={selectedFont === i} onClick={() => setSelectedFont(i)} />
              ))}
              {/* Custom font card */}
              {(() => {
                const CUSTOM_FONT_IDX = FONT_PAIRS.length;
                const selected = selectedFont === CUSTOM_FONT_IDX;
                return (
                  <button
                    onClick={() => {
                      if (customFont) { setFontDraft({ heading: customFont.heading, body: customFont.body }); setHeadingSearch(customFont.heading); setBodySearch(customFont.body); }
                      else { setFontDraft({ heading: "", body: "" }); setHeadingSearch(""); setBodySearch(""); }
                      setFontModalOpen(true);
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                    className="flex flex-col gap-[10px] p-[16px] text-left"
                    style={{
                      backdropFilter: "blur(12px)",
                      borderRadius: 16,
                      border: selected ? "1px solid #6fccdd" : "1px solid white",
                      background: selected ? "rgba(111,204,221,0.05)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <span className="font-semibold uppercase text-[9px] sm:text-[10px]" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>Custom</span>
                    {customFont ? (
                      <>
                        <p className="text-white font-bold text-[14px] sm:text-[16px] leading-tight" style={{ fontFamily: `'${customFont.heading}', serif` }}>{customFont.heading}</p>
                        <p className="text-[11px] sm:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: `'${customFont.body}', sans-serif` }}>{customFont.body} — body text</p>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center flex-1 gap-[8px]" style={{ minHeight: 60 }}>
                        {/* Typography icon */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M4 7V4h16v3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 4v16M9 20h6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Choose fonts</span>
                      </div>
                    )}
                  </button>
                );
              })()}
            </div>

            {/* Custom font modal */}
            {fontModalOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999 }}
                onClick={() => setFontModalOpen(false)}
              >
                <div
                  className="flex flex-col gap-[24px] p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[480px] max-h-[90vh] overflow-y-auto"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, fontFamily: "'Montserrat',sans-serif" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-[17px]">Custom Font Pairing</span>
                    <button onClick={() => setFontModalOpen(false)} style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
                  </div>

                  {/* Heading font picker */}
                  {[
                    { label: "Heading Font", searchVal: headingSearch, setSearch: setHeadingSearch, field: "heading" as const },
                    { label: "Body Font",    searchVal: bodySearch,    setSearch: setBodySearch,    field: "body" as const },
                  ].map(({ label, searchVal, setSearch, field }) => {
                    const filtered = GOOGLE_FONTS_LIST.filter(f => f.toLowerCase().includes(searchVal.toLowerCase())).slice(0, 30);
                    return (
                      <div key={field} className="flex flex-col gap-[8px]">
                        <label style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>
                        <input
                          type="text"
                          value={searchVal}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Type a font name (e.g. Montserrat)"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", fontSize: 14, fontFamily: "'Montserrat',sans-serif", padding: "10px 12px", outline: "none", width: "100%" }}
                        />
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                          Type a font name to see Google Fonts suggestions in the dropdown below.
                        </p>
                        {searchVal && (
                          <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, maxHeight: 180, overflowY: "auto" }}>
                            {filtered.length === 0 ? (
                              <div style={{ padding: "10px 12px", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>No results</div>
                            ) : filtered.map((font) => (
                              <button
                                key={font}
                                onClick={() => { setFontDraft(d => ({ ...d, [field]: font })); setSearch(font); loadGoogleFont(font); }}
                                style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", background: "none", border: "none", color: fontDraft[field] === font ? "#6FCCDD" : "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer", fontFamily: `'${font}', sans-serif` }}
                              >
                                {font}
                              </button>
                            ))}
                          </div>
                        )}
                        {fontDraft[field] && (
                          <span style={{ fontSize: 11, color: "#6FCCDD", fontWeight: 600 }}>Selected: {fontDraft[field]}</span>
                        )}
                      </div>
                    );
                  })}

                  {/* Live preview */}
                  {(fontDraft.heading || fontDraft.body) && (
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Montserrat',sans-serif" }}>Preview</p>
                      {fontDraft.heading && <p style={{ fontFamily: `'${fontDraft.heading}', serif`, fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>The Quick Brown Fox</p>}
                      {fontDraft.body && <p style={{ fontFamily: `'${fontDraft.body}', sans-serif`, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Jumps over the lazy dog. Clear, readable body copy for the web.</p>}
                    </div>
                  )}

                  <div className="flex gap-[12px]">
                    <button onClick={() => setFontModalOpen(false)} className="flex-1 font-semibold text-[14px]" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}>Cancel</button>
                    <button
                      onClick={() => {
                        if (fontDraft.heading && fontDraft.body) {
                          const pair: FontPair = { name: "Custom", heading: fontDraft.heading, body: fontDraft.body };
                          setCustomFont(pair);
                          setSelectedFont(FONT_PAIRS.length);
                          setFontModalOpen(false);
                        }
                      }}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", opacity: fontDraft.heading && fontDraft.body ? 1 : 0.5 }}
                    >Apply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

function loadGoogleFont(family: string) {
  const id = `gf-${family.replace(/\s+/g, "-")}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }
}

function FontCard({
  pair,
  selected,
  onClick,
}: {
  pair: FontPair;
  selected: boolean;
  onClick: () => void;
}) {
  useEffect(() => {
    loadGoogleFont(pair.heading);
    loadGoogleFont(pair.body);
  }, [pair.heading, pair.body]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
      }}
      className="flex flex-col gap-[10px] p-[16px] text-left"
      style={{
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        border: selected ? "1px solid #6fccdd" : "1px solid white",
        background: selected ? "rgba(111,204,221,0.05)" : "rgba(255,255,255,0.02)",
      }}
    >
      <span
        className="font-semibold uppercase text-[10px]"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}
      >
        {pair.name}
      </span>
      <p className="text-white font-bold text-[14px] sm:text-[16px] leading-tight" style={{ fontFamily: `'${pair.heading}', serif` }}>
        {pair.heading}
      </p>
      <p className="text-[11px] sm:text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: `'${pair.body}', sans-serif` }}>
        {pair.body} — body text
      </p>
    </button>
  );
}

// ─── PAGE 6: Pick Pages ───────────────────────────────────────────────────────
type Section = { id: string; name: string; locked?: boolean };
type PageTemplate = { id: string; name: string; selected: boolean; sections: Section[] };

let _sid = 0;
const sid = () => `s${++_sid}`;

const AVAILABLE_SECTIONS = [
  "Hero Section", "Features", "Testimonials", "Pricing", "FAQ",
  "Gallery", "CTA", "Team", "Stats", "Blog Posts", "Partners",
  "Newsletter", "Map / Location", "Contact Form", "Video",
];

const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: "home", name: "Home", selected: true,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Hero Section" },
      { id: sid(), name: "Features" },
      { id: sid(), name: "Testimonials" },
      { id: sid(), name: "Call To Action" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "about", name: "About Us", selected: true,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "About Hero" },
      { id: sid(), name: "Our Story" },
      { id: sid(), name: "Team Members" },
      { id: sid(), name: "Values" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "services", name: "Services", selected: false,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Services Hero" },
      { id: sid(), name: "Service Cards" },
      { id: sid(), name: "Pricing" },
      { id: sid(), name: "FAQ" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "portfolio", name: "Portfolio", selected: false,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Portfolio Hero" },
      { id: sid(), name: "Gallery" },
      { id: sid(), name: "Case Studies" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "blog", name: "Blog", selected: false,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Blog Hero" },
      { id: sid(), name: "Blog Posts" },
      { id: sid(), name: "Newsletter" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "contact", name: "Contact", selected: true,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Contact Hero" },
      { id: sid(), name: "Contact Form" },
      { id: sid(), name: "Map / Location" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "landing", name: "Landing Page", selected: false,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Hero Section" },
      { id: sid(), name: "Features" },
      { id: sid(), name: "CTA" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
  {
    id: "pricing", name: "Pricing", selected: false,
    sections: [
      { id: sid(), name: "Navigation", locked: true },
      { id: sid(), name: "Pricing Hero" },
      { id: sid(), name: "Pricing" },
      { id: sid(), name: "FAQ" },
      { id: sid(), name: "Footer", locked: true },
    ],
  },
];

function PickPagesPage({ onNext, onBack, onStepClick, completedUpTo }: { onNext: () => void; onBack: () => void; onStepClick?: (step: number) => void; completedUpTo?: number }) {
  const [pages, setPages] = useState<PageTemplate[]>(() => {
    const base = PAGE_TEMPLATES.map((p) => ({ ...p, sections: p.sections.map((s) => ({ ...s })) }));
    const saved = loadWizard().pages;
    if (!saved.length) return base;
    return base.map((tpl) => {
      const match = saved.find((s) => s.name === tpl.name);
      if (!match) return { ...tpl, selected: false };
      return {
        ...tpl,
        selected: true,
        sections: [
          { id: sid(), name: "Navigation", locked: true },
          ...match.sections.map((name) => ({ id: sid(), name })),
          { id: sid(), name: "Footer", locked: true },
        ],
      };
    });
  });

  const handleNext = () => {
    const chosen = pages
      .filter((p) => p.selected)
      .map((p) => ({
        name: p.name,
        sections: p.sections.filter((s) => !s.locked).map((s) => s.name),
      }));
    saveWizard({ pages: chosen });
    onNext();
  };
  const [openMenu, setOpenMenu] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [addModal, setAddModal] = useState<string | null>(null); // pageId
  const [renaming, setRenaming] = useState<{ pageId: string; sectionId: string; value: string } | null>(null);
  const [drag, setDrag] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [dragOver, setDragOver] = useState<{ pageId: string; sectionId: string } | null>(null);

  const selectedPageCount = pages.filter((p) => p.selected).length;
  const totalContentSections = pages.filter((p) => p.selected).reduce((n, p) => n + p.sections.filter((s) => !s.locked).length, 0);
  const atPageLimit = selectedPageCount >= 6;
  const atSectionLimit = totalContentSections >= 24;
  const hasInvalidPage = pages.filter((p) => p.selected).some((p) => !p.sections.some((s) => !s.locked));
  const atLimit = atPageLimit || atSectionLimit;

  const togglePage = (pageId: string) =>
    setPages((prev) => prev.map((p) => p.id === pageId ? { ...p, selected: !p.selected } : p));

  const updateSections = (pageId: string, fn: (s: Section[]) => Section[]) =>
    setPages((prev) => prev.map((p) => p.id === pageId ? { ...p, sections: fn(p.sections) } : p));

  const deleteSection = (pageId: string, sectionId: string) =>
    updateSections(pageId, (s) => s.filter((sec) => sec.id !== sectionId));

  const duplicateSection = (pageId: string, sectionId: string) =>
    updateSections(pageId, (s) => {
      const idx = s.findIndex((sec) => sec.id === sectionId);
      if (idx < 0) return s;
      const copy = { ...s[idx], id: sid(), name: s[idx].name + " (Copy)", locked: false };
      return [...s.slice(0, idx + 1), copy, ...s.slice(idx + 1)];
    });

  const addSection = (pageId: string, name: string) => {
    updateSections(pageId, (s) => {
      const footerIdx = s.findIndex((sec) => sec.locked && sec.name === "Footer");
      const newSec: Section = { id: sid(), name };
      if (footerIdx >= 0) return [...s.slice(0, footerIdx), newSec, ...s.slice(footerIdx)];
      return [...s, newSec];
    });
    setAddModal(null);
  };

  const commitRename = () => {
    if (!renaming) return;
    updateSections(renaming.pageId, (s) =>
      s.map((sec) => sec.id === renaming.sectionId ? { ...sec, name: renaming.value } : sec)
    );
    setRenaming(null);
  };

  const onDragStart = (pageId: string, sectionId: string) => setDrag({ pageId, sectionId });

  const onDragEnter = (pageId: string, sectionId: string) => setDragOver({ pageId, sectionId });

  const onDrop = (targetPageId: string, targetSectionId: string) => {
    if (!drag) { setDrag(null); setDragOver(null); return; }
    const isCrossPage = drag.pageId !== targetPageId;
    if (isCrossPage) {
      // Move section from source page to target page, inserting before the drop target
      setPages((prev) => {
        const srcPage = prev.find((p) => p.id === drag.pageId);
        if (!srcPage) return prev;
        const movingSec = srcPage.sections.find((s) => s.id === drag.sectionId);
        if (!movingSec || movingSec.locked) return prev;
        return prev.map((p) => {
          if (p.id === drag.pageId) {
            return { ...p, sections: p.sections.filter((s) => s.id !== drag.sectionId) };
          }
          if (p.id === targetPageId) {
            const toIdx = p.sections.findIndex((s) => s.id === targetSectionId);
            const insertAt = toIdx >= 0 ? toIdx : p.sections.length - 1; // before footer
            const next = [...p.sections];
            next.splice(insertAt, 0, movingSec);
            return { ...p, sections: next };
          }
          return p;
        });
      });
    } else {
      updateSections(targetPageId, (s) => {
        const fromIdx = s.findIndex((sec) => sec.id === drag.sectionId);
        const toIdx = s.findIndex((sec) => sec.id === targetSectionId);
        if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return s;
        // Prevent moving locked sections or dropping onto locked sections
        if (s[fromIdx].locked || s[toIdx].locked) return s;
        const item = s[fromIdx];
        const next = [...s];
        next.splice(fromIdx, 1);
        next.splice(toIdx, 0, item);
        return next;
      });
    }
    setDrag(null);
    setDragOver(null);
  };

  return (
    <ScaledPage
      designHeight={1200}
      scrollable
      header={
        <>
          <TopHeader />
          <SubNav
            activeStep={3}
            completedUpTo={completedUpTo}
            onBack={onBack}
            onNext={selectedPageCount > 0 && !hasInvalidPage && !atSectionLimit ? handleNext : undefined}
            onStepClick={onStepClick}
            nextLabel="Review &amp; Generate"
          />
        </>
      }
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Close menus on outside click */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => { setOpenMenu(null); }}
        >
          <div className="px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(16px,4vw,32px)]">
            {/* Header */}
            <div className="flex flex-col gap-[16px]">
              {atLimit && (
                <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M8 2L1.5 13.5h13L8 2z" stroke="#f87171" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                    <path d="M8 6.5v3" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8" cy="11.5" r="0.75" fill="#f87171"/>
                  </svg>
                  <div>
                    <p style={{ color: "#f87171", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Maximum selection reached</p>
                    <p style={{ color: "rgba(248,113,113,0.7)", fontSize: 12, lineHeight: 1.6 }}>
                      You have reached the maximum of 6 pages and 24 content sections. Remove existing pages or sections before adding more.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-white font-semibold mb-[8px]" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Pick your pages</h2>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500 }}>
                    Select pages and drag sections to reorder them
                  </p>
                </div>
                <span className="font-semibold text-[13px]" style={{ color: "#6fccdd" }}>
                  {pages.filter((p) => p.selected).length} of 6 pages selected
                </span>
              </div>
            </div>

            {/* Selection summary strip */}
            <div className="flex flex-col sm:flex-row sm:items-center items-stretch justify-between gap-3 px-[20px] py-[14px] rounded-[12px]" style={{ background: "rgba(111,204,221,0.05)", border: "1px solid rgba(111,204,221,0.15)" }}>
              <div>
                <p className="text-white font-semibold text-[14px]">
                  {pages.filter((p) => p.selected).length} pages · {totalContentSections} content sections
                </p>
                <p className="font-medium text-[12px] mt-[2px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {pages.filter((p) => p.selected).map((p) => p.name).join(", ")}
                </p>
              </div>
            </div>

            {/* Page cards grid — 1 col mobile, 2 tablet, 3 desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex flex-col gap-[16px] p-[20px]"
                  onClick={() => {
                    const hasContent = page.sections.some((s) => !s.locked);
                    if (!hasContent || (!page.selected && atPageLimit)) return;
                    togglePage(page.id);
                  }}
                  style={{
                    backdropFilter: "blur(12px)",
                    background: page.selected ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                    borderRadius: 16,
                    border: page.selected ? "1px solid white" : "1px solid rgba(255,255,255,0.15)",
                    opacity: page.selected ? 1 : (
                      !page.sections.some((s) => !s.locked) ? 0.4
                      : atPageLimit ? 0.25
                      : 0.5
                    ),
                    transition: "opacity 0.2s, border 0.2s",
                    cursor: (!page.sections.some((s) => !s.locked) || (!page.selected && atPageLimit)) ? "not-allowed" : "pointer",
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center justify-between pb-[16px]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="text-white font-semibold text-[18px] leading-[28px]">{page.name}</span>
                    <button onClick={(e) => e.stopPropagation()} onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    }} onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    }} className="shrink-0">
                      {page.selected ? (
                        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                          <path d={svgPathsCatMood.p1e585400} fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <circle cx="11" cy="11" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* No-content warning */}
                  {!page.sections.some((s) => !s.locked) && (
                    <p style={{ color: "rgba(248,113,113,0.85)", fontSize: 12, lineHeight: 1.55, marginTop: -4 }}>
                      A page requires at least one content section.
                    </p>
                  )}

                  {/* Sections list — drag-and-drop */}
                  <div className="flex flex-col gap-[4px]">
                    {page.sections.map((section) => {
                      const isMenuOpen = openMenu?.pageId === page.id && openMenu?.sectionId === section.id;
                      const isDragging = drag?.pageId === page.id && drag?.sectionId === section.id;
                      const isOver = dragOver?.pageId === page.id && dragOver?.sectionId === section.id;
                      const isLastContent = !section.locked && page.sections.filter((s) => !s.locked).length <= 1;

                      return (
                        <div
                          key={section.id}
                          draggable={!section.locked}
                          onClick={(e) => e.stopPropagation()}
                          onDragStart={() => !section.locked && onDragStart(page.id, section.id)}
                          onDragEnter={() => onDragEnter(page.id, section.id)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => onDrop(page.id, section.id)}
                          onDragEnd={() => { setDrag(null); setDragOver(null); }}
                          className="flex items-center gap-[10px] px-[12px] py-[10px] rounded-[8px] relative"
                          style={{
                            background: isOver ? "rgba(111,204,221,0.1)" : "rgba(255,255,255,0.04)",
                            border: isOver ? "1px solid rgba(111,204,221,0.4)" : "1px solid rgba(255,255,255,0.06)",
                            opacity: isDragging ? 0.4 : 1,
                            cursor: section.locked ? "default" : "grab",
                            transition: "background 0.15s, border 0.15s, opacity 0.15s",
                          }}
                        >
                          {/* Drag handle — hidden for locked sections */}
                          {!section.locked && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                              {[2, 6, 10].map((x) => [3, 7, 11].map((y) => (
                                <circle key={`${x}-${y}`} cx={x} cy={y} r={1} fill="white" />
                              )))}
                            </svg>
                          )}

                          {/* Section name */}
                          <span
                            className="flex-1 font-medium text-[12px] sm:text-[13px] truncate"
                            style={{ color: section.locked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)" }}
                          >
                            {section.name}
                          </span>

                          {/* Lock badge */}
                          {section.locked && (
                            <span
                              className="font-semibold text-[9px] sm:text-[10px] uppercase"
                              style={{ color: "#6fccdd", letterSpacing: "0.08em", flexShrink: 0 }}
                            >
                              locked
                            </span>
                          )}

                          {/* 3-dot menu — content sections only, Delete only */}
                          {!section.locked && (
                            <div className="relative shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenu(isMenuOpen ? null : { pageId: page.id, sectionId: section.id });
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                                }}
                                className="flex items-center justify-center rounded"
                                style={{ width: 20, height: 20 }}
                              >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  {[2, 7, 12].map((cy) => (
                                    <circle key={cy} cx={7} cy={cy} r={1.2} fill="rgba(255,255,255,0.5)" />
                                  ))}
                                </svg>
                              </button>

                              {isMenuOpen && (
                                <div
                                  className="absolute right-0 flex flex-col overflow-hidden z-50"
                                  style={{
                                    top: 24,
                                    width: 200,
                                    background: "#1a1a1a",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 10,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {isLastContent ? (
                                    <div style={{ padding: "12px 14px" }}>
                                      <p style={{ color: "rgba(248,113,113,0.85)", fontSize: 12, lineHeight: 1.55 }}>
                                        A page must contain at least one content section. Add another section or remove this page.
                                      </p>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => { deleteSection(page.id, section.id); setOpenMenu(null); }}
                                      className="flex items-center gap-[10px] px-[14px] py-[10px] font-medium text-[13px] text-left w-full"
                                      style={{ color: "#f87171", background: "transparent" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 4h9M5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M10 7v5M7 7v5M4 4l.6 8.1A1 1 0 005.6 13h3.8a1 1 0 001-.9L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      Delete section
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add section button — 24 content-section global limit */}
                  {(() => {
                    const totalContent = pages.filter((p) => p.selected).reduce((n, p) => n + p.sections.filter((s) => !s.locked).length, 0);
                    const atContentLimit = totalContent >= 24;
                    return (
                      <div className="relative">
                        <button
                          disabled={atContentLimit}
                          onClick={(e) => { e.stopPropagation(); if (!atContentLimit) setAddModal(addModal === page.id ? null : page.id); }}
                          className="flex items-center justify-center gap-[8px] py-[10px] rounded-[8px] font-semibold text-[13px] w-full transition-colors"
                          style={{
                            border: atContentLimit ? "1px dashed rgba(255,255,255,0.08)" : "1px dashed rgba(255,255,255,0.2)",
                            color: atContentLimit ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.4)",
                            cursor: atContentLimit ? "not-allowed" : "pointer",
                          }}
                          onMouseEnter={(e) => { if (!atContentLimit) { (e.currentTarget as HTMLElement).style.color = "#6fccdd"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(111,204,221,0.4)"; } }}
                          onMouseLeave={(e) => { if (!atContentLimit) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; } }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          Add section
                        </button>

                        {/* Add section dropdown */}
                        {!atContentLimit && addModal === page.id && (
                          <div
                            className="absolute left-0 right-0 z-50 overflow-hidden"
                            style={{
                              bottom: "calc(100% + 8px)",
                              background: "#1a1a1a",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 12,
                              boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="px-[14px] py-[10px]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                              <p className="font-semibold text-[11px] uppercase" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                                Add section
                              </p>
                            </div>
                            <div className="flex flex-col max-h-[200px] overflow-y-auto">
                              {AVAILABLE_SECTIONS.filter((name) => !page.sections.some((s) => s.name === name)).map((name) => (
                                <button
                                  key={name}
                                  onClick={() => addSection(page.id, name)}
                                  className="flex items-center gap-[10px] px-[14px] py-[9px] font-medium text-[13px] text-left w-full"
                                  style={{ color: "rgba(255,255,255,0.8)", background: "transparent" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(111,204,221,0.08)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2v8M2 6h8" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                  {name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Section limit tooltip */}
                        {atContentLimit && addModal === page.id && (
                          <div
                            className="absolute left-0 right-0 z-50"
                            style={{
                              bottom: "calc(100% + 8px)",
                              background: "#1a1a1a",
                              border: "1px solid rgba(248,113,113,0.25)",
                              borderRadius: 10,
                              padding: "12px 14px",
                              boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p style={{ color: "rgba(248,113,113,0.85)", fontSize: 12, lineHeight: 1.55 }}>
                              Section limit reached. Remove a section from another page before adding a new one.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 7: Generating ───────────────────────────────────────────────────────
const PHASES = [
  "Reviewing and saving your brand details...",
  "Tailoring three design directions to your brand...",
  "Designing your three homepage mockups...",
  "Designs ready!",
];

function GeneratingPage({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let poller: ReturnType<typeof setInterval> | null = null;

    async function run() {
      setError(null);
      setProgress(4);
      setPhaseIndex(0);
      try {
        // Reset only when inputs actually changed since the last run — identical
        // inputs resume the existing pipeline (idempotent, zero v0 cost).
        const dataStr = JSON.stringify(buildSubmissionData());
        const prior = loadWizard();
        if (prior.lastSubmittedData && prior.lastSubmittedData !== dataStr) {
          resetWizardPipeline();
        }
        saveWizard({ lastSubmittedData: dataStr });

        let companyId = loadWizard().companyId;
        if (!companyId) {
          const sub = await api.submit(buildSubmissionData());
          if (cancelled) return;
          companyId = sub.id;
          saveWizard({ companyId });
        }
        setProgress(15);
        setPhaseIndex(1);

        const created = await api.createPreviews(companyId);
        if (cancelled) return;
        saveWizard({
          previews: created.versions.map((v) => ({
            version: v.version, label: v.label, chatId: v.chatId,
            status: v.status, demoUrl: v.demoUrl ?? null,
          })),
        });
        setProgress(30);
        setPhaseIndex(2);

        poller = setInterval(async () => {
          try {
            const p = await api.getPreviews(companyId!);
            if (cancelled) return;
            saveWizard({
              previews: p.versions.map((v) => ({
                version: v.version, label: v.label, chatId: v.chatId,
                status: v.status, demoUrl: v.demoUrl ?? null,
              })),
            });
            const done = p.versions.filter((v) => v.status !== "pending").length;
            setProgress((cur) => Math.min(95, Math.max(cur + 2, 30 + done * 20)));
            if (done === p.versions.length) {
              const ok = p.versions.some((v) => v.status === "completed");
              if (poller) clearInterval(poller);
              if (!ok) {
                setError("All three preview builds failed. Please try again.");
                return;
              }
              setProgress(100);
              setPhaseIndex(PHASES.length - 1);
              setTimeout(() => { if (!cancelled) onNext(); }, 400);
            }
          } catch { /* transient poll error — keep polling */ }
        }, 5000);
      } catch (err: any) {
        if (cancelled) return;
        const d = err?.detail;
        if (d && typeof d === "object" && (d.rejected || d.flagged)) {
          setError(d.reason || "Your submission couldn't be accepted.");
        } else {
          setError(typeof d === "string" ? d : "Something went wrong while starting the build.");
        }
      }
    }

    run();
    return () => {
      cancelled = true;
      if (poller) clearInterval(poller);
    };
  }, [onNext, attempt]);

  if (error) {
    return (
      <ScaledPage designHeight={900} header={<TopHeader />}>
        <div
          className="w-full flex flex-col flex-1 items-center justify-center gap-[24px] text-center"
          style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif", minHeight: "100%", padding: "0 24px" }}
        >
          <div className="flex items-center justify-center rounded-full"
               style={{ width: 56, height: 56, background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.4)" }}>
            <span style={{ color: "#f87171", fontSize: 26, fontWeight: 700 }}>!</span>
          </div>
          <h2 className="text-white font-semibold text-[22px]">We couldn't generate your website</h2>
          <p className="font-medium text-[14px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 560 }}>{error}</p>
          <div className="flex gap-[16px] flex-wrap justify-center">
            {onBack && (
              <button
                onClick={onBack}
                className="font-semibold text-[14px] uppercase px-[24px] py-[12px] rounded-[8px]"
                style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "white", background: "transparent" }}
              >
                Edit my answers
              </button>
            )}
            <button
              onClick={() => setAttempt((a) => a + 1)}
              className="font-semibold text-[14px] uppercase px-[24px] py-[12px] rounded-[8px]"
              style={{ background: "#6fccdd", color: "#0b0b0b" }}
            >
              Try again
            </button>
          </div>
        </div>
      </ScaledPage>
    );
  }

  return (
    <ScaledPage designHeight={900} header={<TopHeader />}>
      <div
        className="w-full flex flex-col flex-1"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif", minHeight: "100%" }}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-[32px]">
          {/* Spinner */}
          <div
            className="rounded-full"
            style={{
              width: 72,
              height: 72,
              border: "4px solid rgba(111,204,221,0.2)",
              borderTop: "4px solid #6fccdd",
              animation: "spin 1s linear infinite",
            }}
          />

          <div className="flex flex-col items-center gap-[12px]">
            <h2 className="text-white font-semibold" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Building your website</h2>
            <p
              className="font-medium text-[14px]"
              style={{ color: "rgba(255,255,255,0.5)", minHeight: 20 }}
            >
              {PHASES[Math.min(phaseIndex, PHASES.length - 1)]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col items-center gap-[12px]" style={{ width: "min(100%, 360px)" }}>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 6, background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "#6fccdd",
                  transition: "width 0.04s linear",
                }}
              />
            </div>
            <span className="font-semibold text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              {progress}%
            </span>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </ScaledPage>
  );
}

// ─── PAGE 8: Preview ──────────────────────────────────────────────────────────
const VERSIONS = [
  { name: "Version 1", subtitle: "Clean and structured" },
  { name: "Version 2", subtitle: "Bold and contemporary" },
  { name: "Version 3", subtitle: "Simple and focused" },
];

function PreviewPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [previews] = useState(() => loadWizard().previews);
  const [selected, setSelected] = useState(() => {
    const i = loadWizard().previews.findIndex((v) => v.status === "completed");
    return i >= 0 ? i : 0;
  });
  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleConfirm = async () => {
    const companyId = loadWizard().companyId;
    const chosen = previews[selected];
    if (!companyId || !chosen || chosen.status !== "completed") return;
    setConfirming(true);
    setConfirmError(null);
    try {
      const res = await api.selectVersion(companyId, chosen.version);
      saveWizard({ selectedVersion: chosen.version, finalChatId: res.chatId });
      onNext();
    } catch (err: any) {
      const d = err?.detail;
      setConfirmError(typeof d === "string" ? d : "Could not start the full build — please try again.");
      setConfirming(false);
    }
  };

  return (
    <ScaledPage
      designHeight={900}
      scrollable
      header={
        <>
          <TopHeader />
          {/* Completed steps bar — full-bleed border, stepper content stays centered with its own padding */}
          <div
            className="w-full flex flex-wrap items-center justify-center gap-x-[clamp(8px,2vw,16px)] gap-y-2 px-[clamp(12px,4vw,32px)] py-2"
            style={{
              minHeight: 52,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              background: "#0b0b0b",
            }}
          >
            {["Business", "Design Category", "Colors & Fonts", "Pick Pages"].map((step) => (
              <div key={step} className="flex items-center gap-[8px]">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 18, height: 18, background: "#6fccdd" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="#0b0b0b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-[12px]" style={{ color: "#6fccdd" }}>
                  {step}
                </span>
                {step !== "Pick Pages" && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d={svgPathsMerged.pb873b80}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </>
      }
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(16px,4vw,32px)]">
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h2 className="text-white font-semibold" style={{ fontSize: "clamp(20px, 5.5vw, 28px)" }}>Choose Your Design</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: 500 }}>
              Select the version that best fits your vision
            </p>
          </div>

          {/* Version cards — live previews open in a new tab (v0 demos block iframe embedding) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
            {VERSIONS.map((v, i) => {
              const pv = previews[i];
              const ok = pv?.status === "completed" && !!pv.demoUrl;
              const failed = pv && pv.status !== "completed";
              return (
                <button
                  key={i}
                  onClick={() => ok && setSelected(i)}
                  disabled={!ok}
                  className="flex flex-col gap-[16px] p-[20px] text-left"
                  style={{
                    backdropFilter: "blur(12px)",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 8,
                    border: selected === i ? "1.5px solid #6fccdd" : "1px solid rgba(255,255,255,0.35)",
                    minHeight: "clamp(300px, 45vh, 420px)",
                    opacity: ok ? 1 : 0.55,
                    cursor: ok ? "pointer" : "not-allowed",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-[13px] sm:text-[15px]">{v.name}</div>
                      {pv?.label && (
                        <div className="font-medium text-[11px] mt-[2px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {pv.label}
                        </div>
                      )}
                    </div>
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 20,
                        height: 20,
                        border: selected === i ? "none" : "1.5px solid rgba(255,255,255,0.3)",
                        background: selected === i ? "#6fccdd" : "transparent",
                      }}
                    >
                      {selected === i && (
                        <div className="rounded-full" style={{ width: 8, height: 8, background: "#0b0b0b" }} />
                      )}
                    </div>
                  </div>

                  <div
                    className="flex-1 rounded-[8px] overflow-hidden flex flex-col items-center justify-center gap-[14px]"
                    style={{
                      position: "relative",
                      background: "linear-gradient(150deg, #0a1a22 0%, #0d2430 55%, #0a1a1a 100%)",
                      border: selected === i ? "1.5px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {ok ? (
                      <>
                        {/* live scaled mockup — served by our backend, so embedding works */}
                        <div style={{ position: "relative", width: "100%", aspectRatio: "1200 / 700", overflow: "hidden", background: "#fff" }}>
                          <iframe
                            src={pv.demoUrl as string}
                            title={`Design ${i + 1}`}
                            scrolling="no"
                            style={{
                              width: "400%", height: "400%",
                              border: "none",
                              transform: "scale(0.25)",
                              transformOrigin: "top left",
                              pointerEvents: "none",
                              background: "white",
                            }}
                          />
                        </div>
                        <a
                          href={pv.demoUrl as string}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-semibold text-[11px] uppercase"
                          style={{
                            position: "absolute", right: 10, bottom: 10,
                            padding: "8px 14px", borderRadius: 8,
                            background: "rgba(0,0,0,0.7)", color: "#6fccdd",
                            border: "1px solid rgba(111,204,221,0.4)",
                          }}
                        >
                          Open Full ↗
                        </a>
                      </>
                    ) : (
                      <span className="font-semibold text-[13px]" style={{ color: failed ? "#f87171" : "rgba(255,255,255,0.5)" }}>
                        {failed ? "This preview failed to build" : "Preview not available"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {confirmError && (
            <div className="text-center font-medium text-[13px]" style={{ color: "#f87171" }}>
              {confirmError}
            </div>
          )}

          {/* Confirm button */}
          <div className="flex justify-center w-full">
            <button
              onClick={handleConfirm}
              disabled={confirming || previews[selected]?.status !== "completed"}
              className="font-semibold text-[18px] w-full sm:w-auto sm:min-w-[360px]"
              style={{
                background: "#6fccdd",
                color: "#090909",
                borderRadius: 8,
                padding: "16px 24px",
                opacity: confirming ? 0.6 : 1,
              }}
            >
              {confirming ? "Starting your full build…" : "Confirm Selection"}
            </button>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 9: Download ─────────────────────────────────────────────────────────
function DownloadPage({ onBack }: { onBack: () => void }) {
  const p = svgPathsDl;
  const chatId = loadWizard().finalChatId;
  const companyId = loadWizard().companyId;
  const [downloadNotice, setDownloadNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [build, setBuild] = useState<{ status: string; demoUrl: string | null }>({ status: "pending", demoUrl: null });
  const [buildError, setBuildError] = useState<string | null>(null);
  const [claim, setClaim] = useState<{ loading: boolean; url: string | null }>({ loading: false, url: null });
  const [docBusy, setDocBusy] = useState<"brochure" | "portfolio" | null>(null);

  useEffect(() => {
    if (!downloadNotice) return;
    const timer = window.setTimeout(() => setDownloadNotice(null), 6000);
    return () => window.clearTimeout(timer);
  }, [downloadNotice]);

  // Poll the full-site build until it's genuinely live
  useEffect(() => {
    if (!chatId) { setBuildError("No build in progress — please start from the beginning."); return; }
    let cancelled = false;
    const tick = async () => {
      try {
        const b = await api.getBuild(chatId);
        if (cancelled) return;
        setBuild({ status: b.status, demoUrl: b.demoUrl ?? null });
        if (b.status === "failed") setBuildError("The website build failed. Please go back and try again.");
        if (b.status === "completed" || b.status === "failed") clearInterval(timer);
      } catch { /* transient — keep polling */ }
    };
    const timer = setInterval(tick, 5000);
    tick();
    return () => { cancelled = true; clearInterval(timer); };
  }, [chatId]);

  const ready = build.status === "completed";

  const handleZipDownload = () => {
    if (!ready || !chatId) {
      setDownloadNotice({ type: "error", message: "The website is still building — the source code will be available when it's ready." });
      return;
    }
    window.location.href = api.downloadUrl(chatId);
  };

  // Brochure / portfolio: generate once (idempotent), then open the PDF
  const handleDocDownload = async (kind: "brochure" | "portfolio") => {
    if (!companyId) {
      setDownloadNotice({ type: "error", message: "No company data found — please start from the beginning." });
      return;
    }
    if (docBusy) return;
    setDocBusy(kind);
    try {
      await api.generateDocuments(companyId);
      window.open(api.documentUrl(companyId, kind), "_blank", "noopener");
      setDownloadNotice({ type: "success", message: `Your ${kind} opened in a new tab.` });
    } catch (err: any) {
      const d = err?.detail;
      setDownloadNotice({
        type: "error",
        message: (typeof d === "object" && d?.reason) || (typeof d === "string" && d) || `Could not generate the ${kind} — please try again.`,
      });
    } finally {
      setDocBusy(null);
    }
  };

  const handleClaim = async () => {
    if (!ready || !chatId || claim.loading) {
      if (!ready) setDownloadNotice({ type: "error", message: "The website is still building — claiming unlocks when it's ready." });
      return;
    }
    if (claim.url) {
      // a code already exists — reopen it; minting another would invalidate it
      window.open(claim.url, "_blank", "noopener");
      return;
    }
    setClaim({ loading: true, url: null });
    try {
      const res = await api.claimDeploy(chatId);
      setClaim({ loading: false, url: res.claimUrl });
      window.open(res.claimUrl, "_blank", "noopener");
      setDownloadNotice({ type: "success", message: "Claim link opened in a new tab (valid 24 hours). Sign in to Vercel there and click Transfer." });
    } catch (err: any) {
      const d = err?.detail;
      setClaim({ loading: false, url: null });
      setDownloadNotice({ type: "error", message: typeof d === "string" ? d : "Could not create the claim link — try again." });
    }
  };

  return (
    <ScaledPage designHeight={1100} scrollable header={<TopHeader />}>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 flex flex-col items-center px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] gap-[clamp(16px,4vw,32px)]">
          {/* Success state */}
          <div className="flex flex-col items-center gap-[16px] w-full text-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "#6fccdd" }}
            >
              <svg width="24" height="24" viewBox="0 0 28 24" fill="none">
                <path
                  d={p.pf2a7e00}
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-white font-semibold px-2" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>{buildError ? "Something went wrong" : ready ? "Your website is ready!" : "Building your full website…"}</h2>
            <p className="px-2 max-w-[420px]" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 500, lineHeight: 1.6 }}>
              {buildError ? buildError : ready ? "Your AI-generated website is complete and ready to deploy." : "All pages are being generated — this usually takes a few minutes."}
            </p>
          </div>

          {/* Website Preview */}
          <div className="flex flex-col gap-[16px] w-full max-w-[680px] mx-auto items-center sm:items-stretch">
            <span
              className="font-semibold uppercase text-[12px] text-center sm:text-left"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Website Preview
            </span>
            <div
              className="flex flex-col overflow-hidden w-full"
              style={{
                height: "clamp(220px, 34vw, 240px)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-[10px] px-[12px]"
                style={{
                  height: 36,
                  background: "#1a1a1a",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}
              >
                {/* Window dots */}
                {["#6fccdd", "#6fccdd", "#6fccdd"].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{ width: 10, height: 10, background: c, opacity: 0.7 }}
                  />
                ))}
                {/* Address bar */}
                <div
                  className="flex-1 flex items-center gap-[6px] px-[10px] rounded-[6px]"
                  style={{ height: 22, background: "rgba(255,255,255,0.06)", marginLeft: 8 }}
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1L7 13M1 7h12"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    yourwebsite.com
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d={p.p10b47de0}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Preview content */}
              <div className="flex-1 flex flex-col" style={{ background: "#111" }}>
                <div
                  className="flex-1 flex flex-col items-center justify-center gap-[14px]"
                  style={{ background: "linear-gradient(135deg, #0a1628 0%, #0a1a1a 50%, #111 100%)" }}
                >
                  {ready && build.demoUrl ? (
                    <>
                      <div className="flex items-center justify-center rounded-full"
                           style={{ width: 44, height: 44, background: "rgba(111,204,221,0.15)", border: "1px solid rgba(111,204,221,0.5)" }}>
                        <span style={{ color: "#6fccdd", fontSize: 20, fontWeight: 700 }}>✓</span>
                      </div>
                      <span className="font-semibold text-[15px]" style={{ color: "white" }}>
                        Your website is live
                      </span>
                      <a
                        href={build.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-[13px] uppercase"
                        style={{ padding: "12px 22px", borderRadius: 8, background: "#6fccdd", color: "#0b0b0b" }}
                      >
                        Open Your Website ↗
                      </a>
                    </>
                  ) : (
                    <>
                      {!buildError && (
                        <div
                          className="rounded-full"
                          style={{
                            width: 32, height: 32,
                            border: "3px solid rgba(111,204,221,0.2)",
                            borderTop: "3px solid #6fccdd",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                      )}
                      <span className="font-medium text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {buildError ? "No preview available" : "Your live preview will appear here when the build finishes"}
                      </span>
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next Actions */}
          <div className="flex flex-col gap-[16px] w-full max-w-[900px] mx-auto items-center">
            {downloadNotice && (
              <div
                className="w-full rounded-[12px] border px-[14px] py-[12px] text-center"
                style={{
                  background: downloadNotice.type === "success" ? "rgba(111,204,221,0.12)" : "rgba(248,113,113,0.12)",
                  borderColor: downloadNotice.type === "success" ? "rgba(111,204,221,0.3)" : "rgba(248,113,113,0.3)",
                  color: downloadNotice.type === "success" ? "#bdeff3" : "#fecaca",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {downloadNotice.message}
              </div>
            )}
            <span
              className="font-semibold uppercase text-[12px] text-center"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Next Actions
            </span>

            <div
              className="w-full rounded-[14px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-[16px] py-[12px] sm:px-[20px]"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              <div className="flex items-start gap-[10px]">
                <div className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6fccdd]/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M12 19l-5-5m5 5 5-5" stroke="#6fccdd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[12px] sm:text-[13px] leading-[1.6]">
                  Claiming your website uses Vercel. Clicking "Claim Now" opens a Vercel page where you sign in (or create a free account) and click Transfer — the whole project moves into your own Vercel account. The link is valid for 24 hours.
                </div>
              </div>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2">
              
              {/* Download HTML */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full min-h-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d={p.pdba8e90} stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Download Source Code</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {ready ? "Complete Next.js project as a ZIP" : "Available when the build finishes"}
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase transition-all duration-200"
                  style={{
                     border: "1.5px solid #6fccdd",
                     color: "#6fccdd",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                   (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
                   (e.currentTarget as HTMLButtonElement).style.color = "#0b0b0b";
                   (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                   (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                   (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                   (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  onClick={handleZipDownload}
                >
                  {ready ? "Download ZIP" : "Building…"}
                </button>
              </div>

              {/* Download Brochure */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full min-h-full"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 4v4h4" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 13h6M9 16h4" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Download Brochure</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Share your website story in a polished PDF
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase transition-all duration-200"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.color = "#0b0b0b";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  onClick={() => handleDocDownload("brochure")}
                >
                  {docBusy === "brochure" ? "Generating…" : "Download Brochure"}
                </button>
              </div>

              {/* Download Portfolio */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full min-h-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 13h6M9 16h4" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Download Portfolio</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Export a polished portfolio package
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase transition-all duration-200"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.color = "#0b0b0b";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  onClick={() => handleDocDownload("portfolio")}
                >
                  {docBusy === "portfolio" ? "Generating…" : "Download Portfolio"}
                </button>
              </div>

              {/* Deploy */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full min-h-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d={p.p3d0d0400} stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Claim Your Website</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Goes live, then transfers to your own Vercel account
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase transition-all duration-200"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.color = "#0b0b0b";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#6fccdd";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                  onClick={handleClaim}
                >
                  {claim.loading ? "Preparing…" : claim.url ? "Claim link ready ↗" : ready ? "Claim Now" : "Building…"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
const LS_STEP_KEY = "ailk_maxReachedStep";
const LS_PAGE_KEY = "ailk_page";

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const saved = localStorage.getItem(LS_PAGE_KEY) as Page | null;
    // Restore any page except the auth screens. Generating resumes its pipeline
    // idempotently (no duplicate paid builds); preview/download read persisted state.
    const restorable: Page[] = ["questionnaire", "category-mood", "colors", "pick-pages", "generating", "preview", "download"];
    return saved && restorable.includes(saved) ? saved : "login";
  });

  const [maxReachedStep, setMaxReachedStep] = useState<number>(() => {
    const saved = localStorage.getItem(LS_STEP_KEY);
    return saved !== null ? parseInt(saved, 10) : -1;
  });

  const go = (p: Page) => {
    setPage(p);
    localStorage.setItem(LS_PAGE_KEY, p);
  };

  // Persist maxReachedStep whenever it changes
  useEffect(() => {
    localStorage.setItem(LS_STEP_KEY, String(maxReachedStep));
  }, [maxReachedStep]);

  const ORDER: Page[] = [
    "login",
    "otp",
    "questionnaire",
    "category-mood",
    "colors",
    "pick-pages",
    "generating",
    "preview",
    "download",
  ];

  // Step index → page mapping (the 4 wizard steps in the breadcrumb)
  const STEP_PAGES: Page[] = ["questionnaire", "category-mood", "colors", "pick-pages"];

  const goNext = () => {
    const i = ORDER.indexOf(page);
    if (i < ORDER.length - 1) {
      const nextPage = ORDER[i + 1];
      setPage(nextPage);
      // Update maxReachedStep when advancing to a new step page
      const nextStep = STEP_PAGES.indexOf(nextPage);
      if (nextStep > maxReachedStep) setMaxReachedStep(nextStep);
      // When leaving a step page, mark that step as completed
      const currentStep = STEP_PAGES.indexOf(page);
      if (currentStep >= 0 && currentStep > maxReachedStep) setMaxReachedStep(currentStep);
    }
  };

  const goBack = () => {
    const i = ORDER.indexOf(page);
    if (i > 0) {
      // Mark current step complete before going back
      const currentStep = STEP_PAGES.indexOf(page);
      if (currentStep > maxReachedStep) setMaxReachedStep(currentStep);
      setPage(ORDER[i - 1]);
    }
  };

  // Only allow navigating to a step that the user has already reached (no skipping forward)
  const goToStep = (step: number) => {
    const target = STEP_PAGES[step];
    if (!target) return;
    const currentIndex = ORDER.indexOf(page);
    const targetIndex = ORDER.indexOf(target);
    if (targetIndex < currentIndex) {
      const currentStep = STEP_PAGES.indexOf(page);
      if (currentStep > maxReachedStep) setMaxReachedStep(currentStep);
      setPage(target);
    }
  };

  // completedUpTo: the highest step index the user has fully passed through
  const currentStep = STEP_PAGES.indexOf(page);
  const completedUpTo = Math.max(maxReachedStep, currentStep - 1);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0b0b0b",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1440,
          minHeight: "100vh",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {page === "login" && <LoginPage onNext={goNext} />}
        {page === "otp" && <OtpPage onNext={goNext} onBack={goBack} />}
        {page === "questionnaire" && <QuestionnairePage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "category-mood" && <CategoryMoodPage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "colors" && <ColorsFontsPage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "pick-pages" && <PickPagesPage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "generating" && <GeneratingPage onNext={goNext} onBack={goBack} />}
        {page === "preview" && <PreviewPage onNext={goNext} onBack={goBack} />}
        {page === "download" && <DownloadPage onBack={() => go("login")} />}
      </div>
    </div>
  );
}
