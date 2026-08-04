import { useState, useRef, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelp, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  absoluteApiUrl,
  AssetView,
  beginInnovationCityLogin,
  BuildView,
  clearAccessToken,
  createIdempotencyKey,
  DeploymentView,
  fetchInnovationCityApiToken,
  hasAccessToken,
  innovationCityLogout,
  launchKitApi,
  LaunchKitApiError,
  MockupView,
  OperationView,
  PageLayout,
  ProjectSummaryView,
  ProjectView,
  setAccessToken,
  waitForDeployment,
  waitForOperation,
  watchBuild,
  WizardCatalog,
} from "./launchkit-api";
import {
  colorFontSchema,
  ColorFontValues,
  customFontsSchema,
  customPaletteSchema,
  designSelectionSchema,
  DesignSelectionValues,
  brandDocumentFileSchema,
  logoFileSchema,
  mockupSelectionSchema,
  MockupSelectionValues,
  otpSchema,
  OtpValues,
  pageLayoutSchema,
  PageLayoutValues,
  questionnaireSchema,
  QuestionnaireValues,
} from "./wizard-validation";
import { snapshotFileInput } from "./brand-file-input";

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
  | "projects"
  | "questionnaire"
  | "category-mood"
  | "colors"
  | "pick-pages"
  | "generating"
  | "preview"
  | "building"
  | "download";

function ValidationError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="font-medium text-[12px]" style={{ color: "#fca5a5", lineHeight: 1.5 }}>
      {message}
    </p>
  );
}

function firstValidationError(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  if ("message" in value && typeof value.message === "string") return value.message;
  for (const child of Object.values(value)) {
    const message = firstValidationError(child);
    if (message) return message;
  }
  return undefined;
}

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

// ─── PAGE 1: Login ────────────────────────────────────────────────────────────
function LoginPage({
  onNext,
  busy = false,
}: {
  onNext: () => void | Promise<void>;
  busy?: boolean;
}) {
  const p = svgPathsLogin;

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
                  Sign in with your Innovation City account to continue
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", width: "100%" }} />

            {/* Continue with Innovation City */}
            <button
              type="button"
              disabled={busy}
              onClick={() => void onNext()}
              className="w-full flex items-center justify-center gap-[8px] font-semibold text-[14px] uppercase"
              style={{
                background: "#6fccdd",
                color: "#0b0b0b",
                borderRadius: 12,
                padding: "16px 0",
              }}
            >
              {busy ? "Redirecting..." : "Continue with Innovation City"}
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

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500, textAlign: "center" }}>
              You will be redirected to the secure Innovation City login.
            </p>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 2: OTP ──────────────────────────────────────────────────────────────
function OtpPage({
  onNext,
  onBack,
  busy = false,
}: {
  onNext: (code: string) => void | Promise<void>;
  onBack: () => void;
  busy?: boolean;
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focused, setFocused] = useState(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { setValue, handleSubmit, formState: { errors } } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    setValue("code", updated.join(""), { shouldDirty: true, shouldValidate: true });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocused(index + 1);
    }

    if (updated.every((digit) => digit !== "")) {
      void handleSubmit(({ code }) => void onNext(code))();
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
        setValue("code", updated.join(""), { shouldDirty: true, shouldValidate: true });
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

            <ValidationError id="otp-error" message={errors.code?.message} />


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
                  disabled={busy}
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
              onClick={() => void handleSubmit(({ code }) => void onNext(code))()}
              disabled={busy}
              className="w-full font-semibold text-[14px] uppercase"
              style={{
                background: "#6fccdd",
                color: "#0b0b0b",
                borderRadius: 12,
                padding: "16px 0",
              }}
            >
              {busy ? "Verifying..." : "Verify Code"}
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
type QuestionnaireForm = QuestionnaireValues;

const MAX_BRAND_DOCUMENTS = 5;

type AiSummaryDraft = {
  companyOverview: string;
  targetAudience: string;
  services: string;
  brandTone: string;
  mainCta: string;
};

type AiSummaryFieldKey = keyof AiSummaryDraft;

const AI_SUMMARY_FIELDS: Array<{
  key: AiSummaryFieldKey;
  label: string;
  hint: string;
}> = [
  {
    key: "companyOverview",
    label: "Company Overview",
    hint: "Mission, vision, and core description",
  },
  {
    key: "targetAudience",
    label: "Target Audience",
    hint: "Who you serve",
  },
  {
    key: "services",
    label: "Services & Solutions",
    hint: "What you offer",
  },
  {
    key: "brandTone",
    label: "Brand Tone & Messaging",
    hint: "Your communication style",
  },
  {
    key: "mainCta",
    label: "Main Call-to-Action",
    hint: "Primary user action",
  },
];

function pickExtracted(...values: Array<string | undefined | null>): string {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return "";
}

function buildAiSummaryDraft(
  extracted: Record<string, string>,
  design?: { tagline: string; cta: string },
  business?: { targetAudience: string; uvp: string; notes: string; industry: string },
): AiSummaryDraft {
  return {
    companyOverview: pickExtracted(
      extracted.description,
      extracted.uvp,
      extracted.purpose,
      extracted.notes,
      business?.uvp,
      business?.notes,
    ),
    targetAudience: pickExtracted(extracted.targetAudience, business?.targetAudience),
    services: pickExtracted(
      extracted.products,
      extracted.businessActivity,
      extracted.services,
      business?.industry,
    ),
    brandTone: pickExtracted(extracted.tone, extracted.aesthetic),
    mainCta: pickExtracted(extracted.cta, design?.cta, extracted.tagline, design?.tagline),
  };
}

function summaryCoverage(draft: AiSummaryDraft): number {
  const filled = AI_SUMMARY_FIELDS.filter((field) => draft[field.key].trim()).length;
  return Math.round((filled / AI_SUMMARY_FIELDS.length) * 100);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isLogoAsset(asset: AssetView): boolean {
  return asset.kind === "profile_image" && asset.label.toLowerCase().includes("logo");
}

function isDocumentAsset(asset: AssetView): boolean {
  return asset.kind === "profile_source";
}

function FileChip({
  name,
  size,
  onRemove,
  disabled,
}: {
  name: string;
  size: number;
  onRemove?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-[8px] px-[12px] py-[8px] max-w-full"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M4 2.5h5.5L13 6v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
        />
        <path d="M9.5 2.5V6H13" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      </svg>
      <span className="text-white text-[12px] font-medium truncate" title={name}>
        {name}
      </span>
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, whiteSpace: "nowrap" }}>
        {formatFileSize(size)}
      </span>
      {onRemove && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${name}`}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.45)",
            cursor: disabled ? "default" : "pointer",
            fontSize: 16,
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

function AiSummaryModal({
  draft,
  busy,
  onChange,
  onCancel,
  onApply,
}: {
  draft: AiSummaryDraft;
  busy: boolean;
  onChange: (next: AiSummaryDraft) => void;
  onCancel: () => void;
  onApply: () => void;
}) {
  const coverage = summaryCoverage(draft);
  const hasAny = coverage > 0;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", zIndex: 9999 }}
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="flex flex-col w-full max-w-[760px] max-h-[min(90vh,880px)]"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          fontFamily: "'Montserrat', sans-serif",
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-summary-title"
      >
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-7 pb-2">
          <div className="flex flex-col gap-2 min-w-0">
            <h2 id="ai-summary-title" className="text-white font-semibold text-[22px] sm:text-[26px] leading-tight">
              AI Summary
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.5, maxWidth: 520 }}>
              Here&apos;s what we extracted from your uploaded files. Review and edit anything before
              applying it to your form.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close AI Summary"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 26,
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 flex flex-col gap-4">
          {busy && !hasAny ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16">
              <div
                className="rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  border: "3px solid rgba(111,204,221,0.2)",
                  borderTop: "3px solid #6fccdd",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>
                Reading your documents and extracting brand details…
              </p>
            </div>
          ) : !hasAny ? (
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "24px 0" }}>
              No brand details could be extracted from the uploaded files. Try a clearer brand book,
              portfolio, or profile document, then run AI Summary again.
            </p>
          ) : (
            AI_SUMMARY_FIELDS.map(({ key, label, hint }) => (
              <div
                key={key}
                className="grid grid-cols-1 sm:grid-cols-[minmax(140px,180px)_1fr] gap-3 sm:gap-5 items-start"
              >
                <div className="pt-1">
                  <div className="text-white font-semibold text-[13px]">{label}</div>
                  <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>
                    {hint}
                  </div>
                </div>
                <div
                  className="relative"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    minHeight: 56,
                  }}
                >
                  <textarea
                    value={draft[key]}
                    onChange={(e) => onChange({ ...draft, [key]: e.target.value })}
                    rows={key === "mainCta" ? 2 : 3}
                    className="w-full bg-transparent outline-none resize-y text-[13px] leading-relaxed font-medium"
                    style={{
                      color: "white",
                      caretColor: "#6fccdd",
                      padding: "14px 40px 14px 16px",
                      minHeight: key === "mainCta" ? 52 : 72,
                    }}
                    placeholder="Not found in documents — add or leave blank"
                    disabled={busy}
                  />
                  <span
                    aria-hidden
                    className="absolute top-[14px] right-[14px] pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M11.5 2.5l2 2L5.5 12.5H3.5v-2L11.5 2.5z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-6 sm:px-8 py-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 500 }}>
              Auto-fill Coverage
            </span>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5"
              style={{
                background: "rgba(111,204,221,0.08)",
                border: "1px solid rgba(111,204,221,0.35)",
                borderRadius: 999,
              }}
            >
              <span className="font-semibold text-[13px]" style={{ color: "#6FCCDD" }}>
                {coverage}%
              </span>
              <div
                style={{
                  width: 48,
                  height: 4,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.12)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${coverage}%`,
                    height: "100%",
                    background: "#6FCCDD",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={busy}
              className="font-semibold text-[12px] uppercase tracking-wide px-[20px] py-[12px]"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onApply}
              disabled={busy || !hasAny}
              className="font-semibold text-[12px] uppercase tracking-wide px-[20px] py-[12px]"
              style={{
                background: hasAny ? "#6FCCDD" : "rgba(111,204,221,0.25)",
                color: "#0b0b0b",
                border: "none",
                borderRadius: 10,
                cursor: hasAny && !busy ? "pointer" : "not-allowed",
                opacity: busy ? 0.75 : 1,
              }}
            >
              {busy ? "Applying..." : "Save & Apply to Form"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadDropzone({
  title,
  hint,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  inputRef,
  accept,
  multiple,
  onChange,
  children,
}: {
  title: string;
  hint: string;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  accept: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[12px] min-w-0">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onBrowse}
        className="flex flex-col items-center justify-center gap-[10px] px-[20px] py-[28px] cursor-pointer"
        style={{
          border: `1.5px dashed ${dragOver ? "#6FCCDD" : "rgba(255,255,255,0.22)"}`,
          borderRadius: 14,
          background: dragOver ? "rgba(111,204,221,0.06)" : "rgba(255,255,255,0.02)",
          minHeight: 140,
          transition: "border-color 0.15s ease, background 0.15s ease",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M14 18V8M14 8l-4 4M14 8l4 4"
            stroke="#6FCCDD"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 20v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1"
            stroke="#6FCCDD"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-white font-medium text-[14px] text-center">{title}</p>
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, textAlign: "center" }}>{hint}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {children}
    </div>
  );
}

function QuestionnairePage({
  project,
  onSave,
  onUploadLogo,
  onUploadDocuments,
  onRemoveAsset,
  onApplySummary,
  onRunAiSummary,
  onBack,
  onStepClick,
  completedUpTo,
  busy,
}: {
  project: ProjectView;
  onSave: (form: QuestionnaireForm) => Promise<void>;
  onUploadLogo: (file: File) => Promise<void>;
  onUploadDocuments: (files: File[]) => Promise<void>;
  onRemoveAsset: (assetId: string) => Promise<void>;
  onApplySummary: (summary: AiSummaryDraft) => Promise<void>;
  onRunAiSummary: () => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const [logoDrag, setLogoDrag] = useState(false);
  const [docDrag, setDocDrag] = useState(false);
  const [uploadError, setUploadError] = useState<string>();
  const [logoError, setLogoError] = useState<string>();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryDraft, setSummaryDraft] = useState<AiSummaryDraft | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const logoAsset = project.uploadedAssets.find(isLogoAsset) ?? null;
  const documentAssets = project.uploadedAssets.filter(isDocumentAsset);
  const extracted = project.extractedProfileFields ?? {};
  const hasExtracted = Object.values(extracted).some((value) => String(value ?? "").trim())
    || Boolean(project.design.cta?.trim() || project.business.targetAudience?.trim());

  const builtSummary = buildAiSummaryDraft(
    extracted,
    project.design,
    project.business,
  );
  const pageCoverage = summaryCoverage(builtSummary);

  const { register, reset, handleSubmit, formState: { errors } } = useForm<QuestionnaireForm>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      companyName: project.business.companyName,
      industry: project.business.industry,
      customers: project.business.targetAudience,
      tagline: project.design.tagline,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    reset({
      companyName: project.business.companyName,
      industry: project.business.industry,
      customers: project.business.targetAudience,
      tagline: project.design.tagline,
    });
  }, [project.id, project.updatedAt, project.business, project.design, reset]);

  const openSummaryModal = (source: AiSummaryDraft = builtSummary) => {
    setSummaryDraft(source);
    setSummaryOpen(true);
  };

  const closeSummaryModal = () => {
    setSummaryOpen(false);
    setSummaryDraft(null);
  };

  const continueQuestionnaire = () => {
    if (!logoAsset) {
      setLogoError("Upload your logo to continue.");
      return;
    }
    setLogoError(undefined);
    void handleSubmit(onSave)();
  };

  async function acceptLogo(file: File) {
    const validation = logoFileSchema.safeParse(file);
    if (!validation.success) {
      setUploadError(validation.error.issues[0]?.message ?? "Choose a valid logo file.");
      return;
    }
    setUploadError(undefined);
    setLogoError(undefined);
    await onUploadLogo(file);
  }

  async function acceptDocuments(files: FileList | File[]) {
    const list = Array.from(files);
    if (!list.length) return;
    const remaining = MAX_BRAND_DOCUMENTS - documentAssets.length;
    if (remaining <= 0) {
      setUploadError(`Upload at most ${MAX_BRAND_DOCUMENTS} brand documents.`);
      return;
    }
    const accepted: File[] = [];
    for (const file of list.slice(0, remaining)) {
      const validation = brandDocumentFileSchema.safeParse(file);
      if (!validation.success) {
        setUploadError(validation.error.issues[0]?.message ?? "Choose a valid document.");
        return;
      }
      accepted.push(file);
    }
    setUploadError(undefined);
    await onUploadDocuments(accepted);
  }

  const handleRunAiSummary = async () => {
    await onRunAiSummary();
    // Parent refreshes project; read after microtask so state has updated via re-render.
    // Local recompute uses latest project props after await + React commit on next open.
  };

  // After extraction completes, load the latest summary into the open modal.
  // Skip while busy so a blank "extracting" state is not overwritten mid-request.
  // Do not depend on object identity of draft inputs — only project.updatedAt after refresh.
  useEffect(() => {
    if (!summaryOpen || busy) return;
    setSummaryDraft(
      buildAiSummaryDraft(
        project.extractedProfileFields ?? {},
        project.design,
        project.business,
      ),
    );
  }, [summaryOpen, busy, project.updatedAt]);

  const fields: Array<{ key: keyof QuestionnaireForm; label: string; placeholder: string }> = [
    { key: "companyName", label: "Company / Brand Name", placeholder: "e.g. Innovation City" },
    { key: "industry", label: "Business category", placeholder: "One line description" },
    { key: "customers", label: "Who are the customers?", placeholder: "Target audience or market" },
    { key: "tagline", label: "Tagline or hero message", placeholder: "Leave blank if none" },
  ];

  return (
    <ScaledPage
      designHeight={1100}
      scrollable
      header={
        <>
          <TopHeader />
          <SubNav
            activeStep={0}
            completedUpTo={completedUpTo}
            onBack={onBack}
            onNext={busy ? undefined : continueQuestionnaire}
            onStepClick={onStepClick}
          />
        </>
      }
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(16px,3vw,28px)]">
          {/* Start with your logo */}
          <div
            className="relative flex flex-col gap-[20px] p-[clamp(20px,4vw,40px)]"
            style={{
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[16px]">
              <div className="flex flex-col gap-[10px] max-w-[720px]">
                <div className="flex items-center gap-[10px]">
                  <h2 className="text-white font-semibold" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>
                    Start with your logo
                  </h2>
                  <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ background: "#6fccdd" }} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.55 }}>
                  Upload your logo to continue — this is required. Adding brand documents helps the AI
                  auto-fill your business details below.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-[10px] shrink-0">
                <button
                  type="button"
                  disabled={busy || !hasExtracted}
                  onClick={() => openSummaryModal()}
                  className="font-semibold text-[12px] uppercase tracking-wide px-[18px] py-[11px]"
                  style={{
                    background: hasExtracted ? "#6FCCDD" : "rgba(111,204,221,0.25)",
                    color: "#0b0b0b",
                    border: "none",
                    borderRadius: 10,
                    cursor: hasExtracted && !busy ? "pointer" : "not-allowed",
                    opacity: busy ? 0.7 : 1,
                  }}
                >
                  Apply to form
                  {hasExtracted && pageCoverage > 0 ? ` · ${pageCoverage}%` : ""}
                </button>
                <button
                  type="button"
                  disabled={busy || documentAssets.length === 0}
                  onClick={() => {
                    void (async () => {
                      openSummaryModal({
                        companyOverview: "",
                        targetAudience: "",
                        services: "",
                        brandTone: "",
                        mainCta: "",
                      });
                      await handleRunAiSummary();
                    })();
                  }}
                  className="font-semibold text-[12px] uppercase tracking-wide px-[18px] py-[11px]"
                  style={{
                    background: "transparent",
                    color: "#6FCCDD",
                    border: "1px solid #6FCCDD",
                    borderRadius: 10,
                    cursor: documentAssets.length && !busy ? "pointer" : "not-allowed",
                    opacity: documentAssets.length && !busy ? 1 : 0.45,
                  }}
                >
                  {busy && summaryOpen ? "Extracting..." : "AI Summary"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              <UploadDropzone
                title="Click or drag your logo here"
                hint="PNG, SVG, JPG · 1 file · Max 1.5 MB"
                dragOver={logoDrag}
                onDragOver={(e) => {
                  e.preventDefault();
                  setLogoDrag(true);
                }}
                onDragLeave={() => setLogoDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setLogoDrag(false);
                  const file = e.dataTransfer.files[0];
                  if (file) void acceptLogo(file);
                }}
                onBrowse={() => logoInputRef.current?.click()}
                inputRef={logoInputRef}
                accept=".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) void acceptLogo(file);
                }}
              >
                {logoAsset && (
                  <FileChip
                    name={logoAsset.filename}
                    size={logoAsset.size}
                    disabled={busy}
                    onRemove={() => void onRemoveAsset(logoAsset.id)}
                  />
                )}
              </UploadDropzone>

              <UploadDropzone
                title="Click or drag your documents here"
                hint="Multiple formats · Up to 5 files · Max 1.5 MB each"
                dragOver={docDrag}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDocDrag(true);
                }}
                onDragLeave={() => setDocDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDocDrag(false);
                  void acceptDocuments(e.dataTransfer.files);
                }}
                onBrowse={() => docInputRef.current?.click()}
                inputRef={docInputRef}
                accept=".pdf,.docx,.pptx,.txt,.md,.png,.jpg,.jpeg"
                multiple
                onChange={(e) => {
                  const files = snapshotFileInput(e.target);
                  if (files.length) void acceptDocuments(files);
                }}
              >
                {documentAssets.length > 0 && (
                  <div className="flex flex-col gap-[8px]">
                    {documentAssets.map((asset) => (
                      <FileChip
                        key={asset.id}
                        name={asset.filename}
                        size={asset.size}
                        disabled={busy}
                        onRemove={() => void onRemoveAsset(asset.id)}
                      />
                    ))}
                  </div>
                )}
              </UploadDropzone>
            </div>

            <ValidationError message={uploadError || logoError} />
          </div>

          {/* Tell us about your brand */}
          <div
            className="relative flex flex-col gap-[clamp(20px,4vw,40px)] p-[clamp(20px,6vw,56px)]"
            style={{
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)",
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.04, pointerEvents: "none" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid-brand" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-brand)" />
            </svg>

            <div className="flex items-center gap-[10px] relative">
              <h2 className="text-white font-semibold" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>
                Tell us about your brand
              </h2>
              <div className="w-[8px] h-[8px] rounded-full" style={{ background: "#6fccdd" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] relative">
              {fields.map(({ key, label, placeholder }) => (
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
                      border: errors[key]
                        ? "1px solid rgba(248,113,113,0.8)"
                        : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      height: 48,
                      padding: "0 16px",
                    }}
                  >
                    <input
                      className="w-full bg-transparent outline-none font-medium text-[14px]"
                      style={{ color: "white", caretColor: "#6fccdd" }}
                      placeholder={placeholder}
                      {...register(key)}
                      aria-invalid={Boolean(errors[key])}
                      aria-describedby={errors[key] ? `${key}-error` : undefined}
                    />
                  </div>
                  <ValidationError id={`${key}-error`} message={errors[key]?.message} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={continueQuestionnaire}
              disabled={busy}
              className="w-full font-semibold text-[14px] uppercase relative"
              style={{
                background: "#6fccdd",
                color: "#0b0b0b",
                borderRadius: 12,
                padding: "16px 0",
              }}
            >
              {busy ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>

      {summaryOpen && summaryDraft && (
        <AiSummaryModal
          draft={summaryDraft}
          busy={busy}
          onChange={setSummaryDraft}
          onCancel={closeSummaryModal}
          onApply={() => {
            void onApplySummary(summaryDraft).then(() => closeSummaryModal());
          }}
        />
      )}
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

function CategoryMoodPage({ project, catalog, onSave, onBack, onStepClick, completedUpTo, busy }: {
  project: ProjectView;
  catalog: WizardCatalog;
  onSave: (categoryId: string, moodId: string, animationId: string) => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const categories = catalog.businessCategories;
  const moods = catalog.designMoods;
  const animationLevels = catalog.animationLevels;
  const [category, setCategory] = useState(
    categories.find((item) => item.id === project.business.categoryId)?.label ?? categories[0]?.label ?? "",
  );
  const [mood, setMood] = useState(
    moods.find((item) => item.id === project.design.moodId)?.label ?? moods[0]?.label ?? "",
  );
  const [animLevel, setAnimLevel] = useState(
    Math.max(0, animationLevels.findIndex((item) => item.id === project.design.animationId)),
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const { reset, setValue, handleSubmit, formState: { errors } } = useForm<DesignSelectionValues>({
    resolver: zodResolver(designSelectionSchema),
    defaultValues: {
      categoryId: categories.find((item) => item.id === project.business.categoryId)?.id ?? categories[0]?.id ?? "",
      moodId: moods.find((item) => item.id === project.design.moodId)?.id ?? moods[0]?.id ?? "",
      animationId: animationLevels.find((item) => item.id === project.design.animationId)?.id ?? animationLevels[0]?.id ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const categoryChoice = categories.find((item) => item.id === project.business.categoryId) ?? categories[0];
    const moodChoice = moods.find((item) => item.id === project.design.moodId) ?? moods[0];
    const animationIndex = Math.max(0, animationLevels.findIndex((item) => item.id === project.design.animationId));
    setCategory(categoryChoice?.label ?? "");
    setMood(moodChoice?.label ?? "");
    setAnimLevel(animationIndex);
    reset({
      categoryId: categoryChoice?.id ?? "",
      moodId: moodChoice?.id ?? "",
      animationId: animationLevels[animationIndex]?.id ?? "",
    });
  }, [project.updatedAt, catalog, categories, moods, animationLevels, reset]);

  const continueDesign = () => {
    void handleSubmit(({ categoryId, moodId, animationId }) => onSave(categoryId, moodId, animationId))();
  };

  return (
    <ScaledPage
      designHeight={1000}
      scrollable
      header={<><TopHeader /><SubNav activeStep={1} completedUpTo={completedUpTo} onBack={onBack} onNext={busy ? undefined : continueDesign} onStepClick={onStepClick} /></>}
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="px-[clamp(16px,7vw,120px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(24px,5vw,48px)]">

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
                    <h3 className="text-white font-semibold text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px]">{category}</h3>
                    <p className="font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 360 }}>
                      {categories.find((c) => c.label === category)?.description ?? ""}
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
                  className="flex items-center gap-[8px] font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] w-fit"
                  style={{ color: "#6fccdd" }}
                >
                  Choose a different category
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
                    <h3 className="text-white font-semibold text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px]">{mood}</h3>
                    <p className="font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 360 }}>
                      {moods.find((m) => m.label === mood)?.description ?? ""}
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
                  className="flex items-center gap-[8px] font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] w-fit"
                  style={{ color: "#6fccdd" }}
                >
                  Choose a different category
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
                {animationLevels.map((lvl, i) => {
                const isActive = i === animLevel;
                const dotSize = "clamp(18px, 4vw, 24px)";
                return (
                  <button
                    key={lvl.label}
                    onClick={() => {
                      setAnimLevel(i);
                      setValue("animationId", lvl.id, { shouldDirty: true, shouldValidate: true });
                    }}
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
                        {lvl.description}
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
          <ValidationError message={firstValidationError(errors)} />
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
                  {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => {
                      setCategory(cat.label);
                      setValue("categoryId", cat.id, { shouldDirty: true, shouldValidate: true });
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
                        {cat.description}
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
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => {
                      setMood(m.label);
                      setValue("moodId", m.id, { shouldDirty: true, shouldValidate: true });
                      setShowMoodModal(false);
                    }}
                    className="p-[20px] text-left rounded-[12px] transition-all"
                    style={{
                      background: m.label === mood ? "rgba(111,204,221,0.12)" : "rgba(255,255,255,0.04)",
                      border: m.label === mood ? "1px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="font-semibold text-[13px] sm:text-[15px] mb-[4px]" style={{ color: m.label === mood ? "#6fccdd" : "white" }}>{m.label}</p>
                    <p className="font-medium text-[11px] sm:text-[13px] leading-[16px] sm:leading-[18px]" style={{ color: "rgba(255,255,255,0.4)" }}>{m.description}</p>
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
type PaletteEntry = { id?: string; name: string; primary: string; secondary: string; background: string; text: string };
const PALETTES: PaletteEntry[] = [
  { name: "Modern Blue",    primary: "#2563EB", secondary: "#60A5FA", background: "#F8FAFC", text: "#1E293B" },
  { name: "Nature Green",   primary: "#16A34A", secondary: "#86EFAC", background: "#F0FDF4", text: "#14532D" },
  { name: "Elegant Purple", primary: "#7C3AED", secondary: "#C4B5FD", background: "#FAF5FF", text: "#312E81" },
  { name: "Warm Orange",    primary: "#EA580C", secondary: "#FDBA74", background: "#FFF7ED", text: "#7C2D12" },
  { name: "Minimal",        primary: "#111827", secondary: "#6B7280", background: "#FFFFFF", text: "#111827" },
  { name: "Luxury Gold",    primary: "#D4AF37", secondary: "#F5D76E", background: "#1C1C1C", text: "#F9FAFB" },
  { name: "Soft Pink",      primary: "#EC4899", secondary: "#F9A8D4", background: "#FDF2F8", text: "#831843" },
];

type FontPair = { id?: string; name: string; heading: string; body: string };
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
function ColorsFontsPage({ project, catalog, onSave, onBack, onStepClick, completedUpTo, busy }: {
  project: ProjectView;
  catalog: WizardCatalog;
  onSave: (paletteId: string, customPalette: CustomPalette | null, fontId: string, customFonts: { heading: string; body: string } | null) => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const palettes: PaletteEntry[] = catalog.palettes
    .filter((item) => item.colors)
    .map((item) => ({ id: item.id, name: item.label, ...item.colors! }));
  const fontPairs: FontPair[] = catalog.fontPairings
    .filter((item) => item.fonts)
    .map((item) => ({ id: item.id, name: item.label, ...item.fonts! }));
  const [selectedPalette, setSelectedPalette] = useState(
    project.design.paletteId === "custom"
      ? palettes.length
      : Math.max(0, palettes.findIndex((item) => item.id === project.design.paletteId)),
  );
  const [selectedFont, setSelectedFont] = useState(
    project.design.fontPairingId === "custom"
      ? fontPairs.length
      : Math.max(0, fontPairs.findIndex((item) => item.id === project.design.fontPairingId)),
  );
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customPaletteError, setCustomPaletteError] = useState<string>();
  const [specificColors, setSpecificColors] = useState(false);
  const [customPalette, setCustomPalette] = useState<CustomPalette | null>(project.design.customPalette);
  const [customDraft, setCustomDraft] = useState<CustomPalette>({ primary: "", secondary: "", background: "", text: "" });
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [customFontError, setCustomFontError] = useState<string>();
  const [customFont, setCustomFont] = useState<FontPair | null>(
    project.design.customFonts
      ? { name: "Custom", ...project.design.customFonts }
      : null,
  );
  const [fontDraft, setFontDraft] = useState<{ heading: string; body: string }>({ heading: "", body: "" });
  const [headingSearch, setHeadingSearch] = useState("");
  const [bodySearch, setBodySearch] = useState("");
  const { setValue, handleSubmit, formState: { errors } } = useForm<ColorFontValues>({
    resolver: zodResolver(colorFontSchema),
    defaultValues: {
      paletteId: project.design.paletteId || palettes[0]?.id || "",
      customPalette: project.design.customPalette,
      fontPairingId: project.design.fontPairingId || fontPairs[0]?.id || "",
      customFonts: project.design.customFonts,
    },
    mode: "onChange",
  });

  const continueColors = () => {
    const paletteId = selectedPalette === palettes.length ? "custom" : palettes[selectedPalette]?.id;
    const fontId = selectedFont === fontPairs.length ? "custom" : fontPairs[selectedFont]?.id;
    const customFonts = fontId === "custom" && customFont
      ? { heading: customFont.heading, body: customFont.body }
      : null;
    setValue("paletteId", paletteId ?? "", { shouldDirty: true, shouldValidate: true });
    setValue("customPalette", paletteId === "custom" ? customPalette : null, { shouldDirty: true, shouldValidate: true });
    setValue("fontPairingId", fontId ?? "", { shouldDirty: true, shouldValidate: true });
    setValue("customFonts", customFonts, { shouldDirty: true, shouldValidate: true });
    void handleSubmit((values) => onSave(
      values.paletteId,
      values.customPalette,
      values.fontPairingId,
      values.customFonts,
    ))();
  };

  return (
    <ScaledPage
      designHeight={1200}
      scrollable
      header={<><TopHeader /><SubNav activeStep={2} completedUpTo={completedUpTo} onBack={onBack} onNext={busy ? undefined : continueColors} onStepClick={onStepClick} /></>}
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
              {palettes.map((palette, i) => {
                const colors = [palette.primary, palette.secondary, palette.background, palette.text];
                const selected = selectedPalette === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedPalette(i)}
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
                const CUSTOM_IDX = palettes.length;
                const selected = selectedPalette === CUSTOM_IDX;
                return (
                  <button
                    onClick={() => {
                      setCustomPaletteError(undefined);
                      if (customPalette) setCustomDraft({ ...customPalette });
                      setCustomModalOpen(true);
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

                  <ValidationError message={customPaletteError} />
                  <div className="flex gap-[12px]">
                    <button
                      onClick={() => setCustomModalOpen(false)}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const validation = customPaletteSchema.safeParse(customDraft);
                        if (!validation.success) {
                          setCustomPaletteError(validation.error.issues[0]?.message ?? "Complete the custom palette.");
                          return;
                        }
                        setCustomPaletteError(undefined);
                        setCustomPalette(validation.data);
                        setSelectedPalette(palettes.length);
                        setCustomModalOpen(false);
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
              {fontPairs.map((pair, i) => (
                <FontCard key={i} pair={pair} selected={selectedFont === i} onClick={() => setSelectedFont(i)} />
              ))}
              {/* Custom font card */}
              {(() => {
                const CUSTOM_FONT_IDX = fontPairs.length;
                const selected = selectedFont === CUSTOM_FONT_IDX;
                return (
                  <button
                    onClick={() => {
                      setCustomFontError(undefined);
                      if (customFont) { setFontDraft({ heading: customFont.heading, body: customFont.body }); setHeadingSearch(customFont.heading); setBodySearch(customFont.body); }
                      else { setFontDraft({ heading: "", body: "" }); setHeadingSearch(""); setBodySearch(""); }
                      setFontModalOpen(true);
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
                          placeholder="Search fonts…"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "white", fontSize: 14, fontFamily: "'Montserrat',sans-serif", padding: "10px 12px", outline: "none", width: "100%" }}
                        />
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

                  <ValidationError message={customFontError} />
                  <div className="flex gap-[12px]">
                    <button onClick={() => setFontModalOpen(false)} className="flex-1 font-semibold text-[14px]" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}>Cancel</button>
                    <button
                      onClick={() => {
                        const validation = customFontsSchema.safeParse(fontDraft);
                        if (!validation.success) {
                          setCustomFontError(validation.error.issues[0]?.message ?? "Choose both fonts.");
                          return;
                        }
                        setCustomFontError(undefined);
                        const pair: FontPair = { name: "Custom", ...validation.data };
                        setCustomFont(pair);
                        setSelectedFont(fontPairs.length);
                        setFontModalOpen(false);
                      }}
                      className="flex-1 font-semibold text-[14px]"
                      style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", opacity: fontDraft.heading && fontDraft.body ? 1 : 0.5 }}
                    >Apply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ValidationError message={firstValidationError(errors)} />
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
type Section = { id: string; name: string; templateId?: string; locked?: boolean };
type PageTemplate = { id: string; name: string; slug?: string; selected: boolean; sections: Section[] };

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

function editorPages(project: ProjectView, catalog: WizardCatalog): PageTemplate[] {
  const sectionCatalog = new Map(catalog.sectionTemplates.map((item) => [item.id, item]));
  const saved = new Map(project.pageLayout.pages.map((page) => [page.templateId, page]));
  return catalog.pageTemplates.map((template) => {
    const page = saved.get(template.id);
    const sections = page?.sections ?? template.sectionTemplateIds.map((templateId, index) => ({
      id: `${template.id}:${templateId}:${index}`,
      templateId,
      name: sectionCatalog.get(templateId)?.label ?? templateId,
      locked: sectionCatalog.get(templateId)?.locked ?? false,
    }));
    return {
      id: template.id,
      name: page?.name ?? template.label,
      slug: page?.slug ?? template.slug,
      selected: Boolean(page),
      sections: sections.map((section) => ({
        id: section.id,
        name: section.name,
        templateId: section.templateId,
        locked: section.locked,
      })),
    };
  });
}

function PickPagesPage({ project, catalog, onGenerate, onBack, onStepClick, completedUpTo, busy }: {
  project: ProjectView;
  catalog: WizardCatalog;
  onGenerate: (layout: PageLayout) => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const [pages, setPages] = useState<PageTemplate[]>(() => editorPages(project, catalog));
  const [openMenu, setOpenMenu] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [addModal, setAddModal] = useState<string | null>(null); // pageId
  const [renaming, setRenaming] = useState<{ pageId: string; sectionId: string; value: string } | null>(null);
  const [drag, setDrag] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [dragOver, setDragOver] = useState<{ pageId: string; sectionId: string } | null>(null);
  const { setValue, handleSubmit, formState: { errors } } = useForm<PageLayoutValues>({
    resolver: zodResolver(pageLayoutSchema),
    defaultValues: project.pageLayout,
    mode: "onChange",
  });

  const unlockedSections = catalog.sectionTemplates.filter((section) => !section.locked);
  const continueGeneration = () => {
    const layout: PageLayout = {
      pages: pages.filter((page) => page.selected).map((page) => ({
        id: `page:${page.id}`,
        templateId: page.id,
        name: page.name,
        slug: page.slug ?? page.id,
        sections: page.sections.map((section) => ({
          id: section.id,
          templateId: section.templateId ?? unlockedSections.find((item) => item.label === section.name.replace(" (Copy)", ""))?.id ?? "features",
          name: section.name,
          locked: Boolean(section.locked),
        })),
      })),
    };
    setValue("pages", layout.pages, { shouldDirty: true, shouldValidate: true });
    void handleSubmit((values) => onGenerate(values))();
  };

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
      const newSec: Section = {
        id: sid(),
        name,
        templateId: unlockedSections.find((item) => item.label === name)?.id,
      };
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
            onNext={busy ? undefined : continueGeneration}
            onStepClick={onStepClick}
            nextLabel="Review & Generate"
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
                    <button onClick={(e) => e.stopPropagation()} className="shrink-0">
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
                              {unlockedSections.filter((item) => !page.sections.some((s) => s.templateId === item.id)).map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => addSection(page.id, item.label)}
                                  className="flex items-center gap-[10px] px-[14px] py-[9px] font-medium text-[13px] text-left w-full"
                                  style={{ color: "rgba(255,255,255,0.8)", background: "transparent" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(111,204,221,0.08)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2v8M2 6h8" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                  {item.label}
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

            {/* JSON summary strip */}
            <div
              className="flex flex-col sm:flex-row sm:items-center items-stretch justify-between gap-3 px-[20px] py-[14px] rounded-[12px]"
              style={{ background: "rgba(111,204,221,0.05)", border: "1px solid rgba(111,204,221,0.15)" }}
            >
              <div>
                <p className="text-white font-semibold text-[14px]">
                  {pages.filter((p) => p.selected).length} pages · {totalContentSections} content sections
                </p>
                <p className="font-medium text-[12px] mt-[2px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {pages.filter((p) => p.selected).map((p) => p.name).join(", ")}
                </p>
              </div>
              <div className="flex flex-col items-stretch sm:items-end gap-[6px]">
                {(() => {
                  const canGenerate = selectedPageCount > 0 && !hasInvalidPage && !atSectionLimit;
                  return (
                    <>
                      <button
                        onClick={!busy ? continueGeneration : undefined}
                        disabled={busy}
                        className="font-semibold text-[14px] uppercase px-[24px] py-[12px] rounded-[8px] w-full sm:w-auto"
                        style={{
                          background: busy ? "rgba(255,255,255,0.08)" : "#6fccdd",
                          color: busy ? "rgba(255,255,255,0.25)" : "#0b0b0b",
                          cursor: busy ? "not-allowed" : "pointer",
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                         {busy ? "Saving..." : "Review & Generate"}
                      </button>
                      {!canGenerate && (
                        <p style={{ color: "rgba(248,113,113,0.8)", fontSize: 11, textAlign: "right", maxWidth: 240 }}>
                          {selectedPageCount === 0
                            ? "Select at least one page to continue."
                            : hasInvalidPage
                            ? "Fix page configuration issues before continuing."
                            : "Remove sections to stay within the 24-section limit."}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
            <ValidationError message={firstValidationError(errors)} />
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 7: Generating ───────────────────────────────────────────────────────
const PHASES = [
  "Analyzing your brand inputs...",
  "Designing page layouts...",
  "Generating color themes...",
  "Composing your website...",
];

function GeneratingPage({ operation, error, onRetry }: {
  operation: OperationView | null;
  error: string | null;
  onRetry: () => void;
}) {
  const message = operation?.status === "running"
    ? "Creating three design directions..."
    : "Preparing your persisted project...";

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
              {error ?? message}
            </p>
          </div>

          {error && (
            <button
              onClick={onRetry}
              className="font-semibold text-[14px] px-[24px] py-[12px] rounded-[8px]"
              style={{ background: "#6fccdd", color: "#0b0b0b" }}
            >
              Try Again
            </button>
          )}
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

function PreviewPage({ mockups, selectedMockupId, onConfirm, onBack, busy }: {
  mockups: MockupView[];
  selectedMockupId: string | null;
  onConfirm: (mockupId: string) => Promise<void>;
  onBack: () => void;
  busy: boolean;
}) {
  const [selected, setSelected] = useState(
    selectedMockupId ?? mockups[0]?.id ?? "",
  );
  const [previewHtml, setPreviewHtml] = useState<Record<string, string>>({});
  const { setValue, handleSubmit, formState: { errors } } = useForm<MockupSelectionValues>({
    resolver: zodResolver(mockupSelectionSchema),
    defaultValues: { mockupId: selectedMockupId ?? mockups[0]?.id ?? "" },
    mode: "onChange",
  });

  useEffect(() => {
    const nextSelection = selectedMockupId
      ?? (mockups.some((mockup) => mockup.id === selected) ? selected : mockups[0]?.id ?? "");
    setSelected(nextSelection);
    setValue("mockupId", nextSelection, { shouldValidate: true });
  }, [mockups, selectedMockupId, selected, setValue]);

  useEffect(() => {
    const controller = new AbortController();
    setPreviewHtml({});

    for (const mockup of mockups) {
      void launchKitApi.getAssetContent(mockup.previewUrl, controller.signal)
        .then((content) => {
          if (controller.signal.aborted) return;
          setPreviewHtml((current) => ({ ...current, [mockup.id]: content }));
        })
        .catch((cause) => {
          if (!controller.signal.aborted) {
            console.error("Mockup preview could not be loaded", cause);
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [mockups]);

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

          {/* Version cards — 1 column on mobile (full width, scroll to reach all), 3 on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
            {mockups.map((v, i) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelected(v.id);
                  setValue("mockupId", v.id, { shouldDirty: true, shouldValidate: true });
                }}
                className="flex flex-col gap-[16px] p-[20px] text-left"
                style={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  border:
                    selected === v.id ? "1.5px solid #6fccdd" : "1px solid white",
                  minHeight: "clamp(360px, 55vh, 520px)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-[13px] sm:text-[15px]">{v.label}</div>
                    <div className="font-medium text-[11px] mt-[4px]" style={{ color: "rgba(255,255,255,0.45)" }}>{v.direction}</div>

                  </div>
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 20,
                      height: 20,
                      border: selected === v.id ? "none" : "1.5px solid rgba(255,255,255,0.3)",
                      background: selected === v.id ? "#6fccdd" : "transparent",
                    }}
                  >
                    {selected === v.id && (
                      <div
                        className="rounded-full"
                        style={{ width: 8, height: 8, background: "#0b0b0b" }}
                      />
                    )}
                  </div>
                </div>

                {/* Preview wireframe */}
                <div
                  className="flex-1 rounded-[8px] overflow-hidden flex flex-col"
                  style={{
                    background: i === 1 ? "#0a1a1a" : "#111",
                    border: i === 1 ? "1.5px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                    position: "relative",
                  }}
                >
                  {previewHtml[v.id] && (
                    <iframe
                      srcDoc={previewHtml[v.id]}
                      title={`${v.label} preview`}
                      sandbox="allow-scripts"
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ background: "white", zIndex: 2 }}
                    />
                  )}
                  {/* Nav bar */}
                  <div
                    className="flex items-center gap-[8px] px-[12px]"
                    style={{ height: 28, background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div style={{ width: 32, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
                    <div className="flex-1" />
                    {[1, 2, 3].map((j) => (
                      <div key={j} style={{ width: 20, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
                    ))}
                  </div>
                  {/* Content */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div
                      style={{ width: 60, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
                      className="flex flex-col gap-[6px] p-[8px]"
                    >
                      {[1, 2, 3, 4].map((k) => (
                        <div key={k} style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
                      ))}
                    </div>
                    {/* Main area */}
                    <div className="flex-1 p-[12px] flex flex-col gap-[10px]">
                      <div
                        className="w-full rounded-[6px] flex flex-col items-center justify-center gap-[6px]"
                        style={{ height: 100, background: i === 1 ? "rgba(111,204,221,0.08)" : "rgba(255,255,255,0.04)" }}
                      >
                        <div style={{ width: 80, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.2)" }} />
                        <div style={{ width: 60, height: 7, borderRadius: 3, background: "rgba(255,255,255,0.1)" }} />
                      </div>
                      <div className="grid grid-cols-3 gap-[6px]">
                        {[1, 2, 3].map((k) => (
                          <div
                            key={k}
                            style={{
                              height: 48,
                              borderRadius: 4,
                              background: i === 1 ? "rgba(111,204,221,0.05)" : "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Confirm button */}
          <div className="flex justify-center w-full">
            <button
              onClick={() => void handleSubmit(({ mockupId }) => onConfirm(mockupId))()}
              disabled={busy}
              className="font-semibold text-[18px] w-full sm:w-auto sm:min-w-[360px]"
              style={{
                background: "#6fccdd",
                color: "#090909",
                borderRadius: 8,
                padding: "16px 24px",
              }}
            >
              {busy ? "Starting Build..." : "Confirm Selection"}
            </button>
          </div>
          <ValidationError message={errors.mockupId?.message} />
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── PAGE 9: Download ─────────────────────────────────────────────────────────
function BuildingPage({ build, error, onBack }: {
  build: BuildView | null;
  error: string | null;
  onBack: () => void;
}) {
  const terminalError = build && ["failed", "cancelled", "timed_out"].includes(build.status);
  return (
    <ScaledPage designHeight={900} header={<TopHeader />}>
      <div className="w-full flex flex-col flex-1" style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}>
        <div className="flex-1 flex flex-col items-center justify-center gap-[28px] px-4 text-center">
          {!terminalError && !error && (
            <div className="rounded-full" style={{ width: 72, height: 72, border: "4px solid rgba(111,204,221,0.2)", borderTop: "4px solid #6fccdd", animation: "spin 1s linear infinite" }} />
          )}
          <div className="flex flex-col items-center gap-[10px] max-w-[560px]">
            <h2 className="text-white font-semibold" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>
              {terminalError || error ? "Build needs attention" : "Building your website"}
            </h2>
            <p className="font-medium text-[14px]" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              {error ?? build?.message ?? "Queuing the final build..."}
            </p>
            {build?.warnings.map((warning) => (
              <p key={warning} className="font-medium text-[12px]" style={{ color: "rgba(248,180,113,0.9)", lineHeight: 1.5 }}>{warning}</p>
            ))}
          </div>
          {(terminalError || error) && (
            <button onClick={onBack} className="font-semibold text-[14px] px-[24px] py-[12px] rounded-[8px]" style={{ background: "#6fccdd", color: "#0b0b0b" }}>
              Return to Designs
            </button>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </ScaledPage>
  );
}

function DownloadPage({ build, deployment, onDeploy, onBack, busy }: {
  build: BuildView;
  deployment: DeploymentView | null;
  onDeploy: () => Promise<void>;
  onBack: () => void;
  busy: boolean;
}) {
  const p = svgPathsDl;
  const [tip, setTip] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const websiteUrl = absoluteApiUrl(build.webUrl ?? build.previewUrl);

  const handleDownload = async () => {
    if (!build.downloadUrl || downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await launchKitApi.downloadBuild(build.downloadUrl);
    } catch (error) {
      setDownloadError(
        error instanceof LaunchKitApiError
          ? error.message
          : "The build archive could not be downloaded.",
      );
    } finally {
      setDownloading(false);
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
            <h2 className="text-white font-semibold px-2" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Your website is ready!</h2>
            <p className="px-2 max-w-[420px]" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 500, lineHeight: 1.6 }}>
              Your AI-generated website is complete and ready to deploy.
            </p>
          </div>

          {/* Website Preview */}
          <div className="flex flex-col gap-[16px] w-full max-w-[680px] mx-auto items-center sm:items-stretch">
            <div className="flex items-center justify-between w-full">
              <span
                className="font-semibold uppercase text-[12px] text-left"
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
              >
                Website Preview
              </span>
              <button
                type="button"
                onClick={() => websiteUrl && window.open(websiteUrl, "_blank", "noopener,noreferrer")}
                disabled={!websiteUrl}
                aria-label="Open website preview in a new tab"
                title="Open website preview in a new tab"
                className="flex items-center justify-center rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  width: 28,
                  height: 28,
                  color: "#6fccdd",
                  background: "rgba(111,204,221,0.1)",
                  border: "1px solid rgba(111,204,221,0.25)",
                }}
              >
                <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
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
                    {build.webUrl ?? "Generated website"}
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
              <div className="flex-1 flex flex-col relative" style={{ background: "#111" }}>
                {build.previewUrl && (
                  <iframe
                    src={build.previewUrl}
                    title="Generated website preview"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ background: "white", zIndex: 2 }}
                  />
                )}
                {/* Hero gradient */}
                <div
                  className="flex-1 flex flex-col items-center justify-center gap-[8px]"
                  style={{
                    background: "linear-gradient(135deg, #0a1628 0%, #0a1a1a 50%, #111 100%)",
                  }}
                >
                  <div
                    style={{ width: 120, height: 12, borderRadius: 6, background: "rgba(111,204,221,0.5)" }}
                  />
                  <div
                    style={{ width: 200, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.15)" }}
                  />
                  <div
                    className="flex gap-[8px] mt-[8px]"
                  >
                    <div
                      style={{ width: 64, height: 20, borderRadius: 4, background: "#6fccdd" }}
                    />
                    <div
                      style={{
                        width: 64,
                        height: 20,
                        borderRadius: 4,
                        border: "1px solid rgba(111,204,221,0.4)",
                      }}
                    />
                  </div>
                </div>
                {/* Features grid */}
                <div
                  className="grid grid-cols-3 gap-[8px] px-[12px] py-[10px]"
                  style={{ background: "#0d0d0d" }}
                >
                  {[1, 2, 3].map((k) => (
                    <div
                      key={k}
                      style={{
                        height: 32,
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Actions */}
          <div className="flex flex-col gap-[16px] w-full max-w-[680px] mx-auto items-center">
            <span
              className="font-semibold uppercase text-[12px] text-center"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Next Actions
            </span>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full items-stretch">
              {/* Download */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full sm:w-[280px] mx-auto"
                style={{ background: "rgba(111,204,221,0.13)", border: "1px solid rgba(111,204,221,0.2)", minHeight: "100%" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d={p.pdba8e90} stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Download</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Get your complete HTML files
                  </div>
                </div>
                <button
                  onClick={() => { void handleDownload(); }}
                  disabled={!build.downloadUrl || downloading || busy}
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] disabled:opacity-50"
                  style={{ background: "#6fccdd", color: "#0b0b0b" }}
                >
                  {downloading ? "Downloading…" : "Download"}
                </button>
                {downloadError && (
                  <div className="font-medium text-[12px]" style={{ color: "#f87171" }}>
                    {downloadError}
                  </div>
                )}
              </div>

              {/* Deploy */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full sm:w-[280px] mx-auto"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", minHeight: "100%" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d={p.p3d0d0400} stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-white font-semibold text-[14px]">Deploy to Domain</span>

                        <div style={{ position: "relative", display: "inline-flex" }}>
                          <button
                            onMouseEnter={() => setTip(true)}
                            onMouseLeave={() => setTip(false)}
                            onClick={() => setTip(v => !v)}
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", width: 16, height: 16, fontSize: 0 }}
                            aria-label="Vercel deployment information"
                          >
                            ⓘ
                          </button>
                          <CircleHelp size={16} aria-hidden="true" style={{ position: "absolute", inset: 0, color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
                          {tip && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "calc(100% + 8px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 240,
                                background: "#1e1e1e",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 12,
                                padding: "12px 14px",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                fontSize: 12,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.7)",
                                lineHeight: 1.6,
                                zIndex: 100,
                                pointerEvents: "none",
                              }}
                            >
                              Deploying your website uses Vercel. Clicking 'Deploy Now' will redirect you to Vercel, where you can sign in with your email or create a new account to publish your website.
                              <div style={{
                                position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
                                width: 10, height: 10, background: "#1e1e1e",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderTop: "none", borderLeft: "none",
                                rotate: "45deg",
                              }} />
                            </div>
                          )}
                        </div>

                  </div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Requires a connected domain
                  </div>
                </div>
                <button
                  onClick={() => void onDeploy()}
                  disabled={busy}
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                >
                  {busy
                    ? deployment?.message ?? "Deploying..."
                    : deployment?.status === "ready_to_claim"
                    ? "Open Vercel Claim"
                    : deployment?.status === "failed" || deployment?.status === "cancelled"
                    ? "Try Deployment Again"
                    : "Deploy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

function formatProjectUpdatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ProjectsPage({
  projects,
  loading,
  busy,
  onCreate,
  onOpen,
  onRefresh,
  onSignOut,
}: {
  projects: ProjectSummaryView[];
  loading: boolean;
  busy: boolean;
  onCreate: () => Promise<void>;
  onOpen: (projectId: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onSignOut: () => void;
}) {
  return (
    <ScaledPage designHeight={900} scrollable header={<TopHeader showProfile={false} />}>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 flex flex-col px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] gap-[24px] max-w-[880px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <h1 className="text-white font-semibold" style={{ fontSize: "clamp(22px, 5vw, 28px)" }}>
                Your websites
              </h1>
              <p className="font-medium text-[14px]" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Open a previous generation or create a new website.
              </p>
            </div>
            <div className="flex flex-wrap gap-[10px]">
              <button
                type="button"
                onClick={() => { void onRefresh(); }}
                disabled={busy || loading}
                className="font-semibold text-[13px] px-[14px] py-[10px] rounded-[8px] disabled:opacity-50"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => { void onCreate(); }}
                disabled={busy || loading}
                className="font-semibold text-[13px] px-[16px] py-[10px] rounded-[8px] disabled:opacity-50"
                style={{ background: "#6fccdd", color: "#0b0b0b" }}
              >
                {busy ? "Working…" : "Create new website"}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-[64px]">
              <div
                className="rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  border: "3px solid rgba(111,204,221,0.2)",
                  borderTop: "3px solid #6fccdd",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          ) : projects.length === 0 ? (
            <div
              className="rounded-[16px] px-[24px] py-[40px] text-center"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-white font-semibold text-[15px]">No websites yet</p>
              <p className="font-medium text-[13px] mt-[8px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                Create your first site to start the wizard.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-[12px]">
              {projects.map((item) => {
                const title = item.companyName.trim() || "Untitled website";
                const buildLabel = item.latestBuildStatus
                  ? `Build: ${item.latestBuildStatus}`
                  : "No build yet";
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-[16px] p-[20px] rounded-[16px]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                      <div className="text-white font-semibold text-[15px] truncate">{title}</div>
                      <div className="font-medium text-[12px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                        Project: {item.status} · {buildLabel} · Updated {formatProjectUpdatedAt(item.updatedAt)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[8px] shrink-0">
                      {item.previewUrl && (
                        <button
                          type="button"
                          onClick={() => window.open(item.previewUrl!, "_blank", "noopener,noreferrer")}
                          className="font-semibold text-[12px] px-[12px] py-[8px] rounded-[8px]"
                          style={{
                            background: "rgba(111,204,221,0.12)",
                            color: "#6fccdd",
                            border: "1px solid rgba(111,204,221,0.25)",
                          }}
                        >
                          Preview
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => { void onOpen(item.id); }}
                        disabled={busy}
                        className="font-semibold text-[12px] px-[14px] py-[8px] rounded-[8px] disabled:opacity-50"
                        style={{ background: "#6fccdd", color: "#0b0b0b" }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={onSignOut}
            className="self-start font-medium text-[12px] mt-[8px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Sign out
          </button>
        </div>
      </div>
    </ScaledPage>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
const LS_STEP_KEY = "ailk_maxReachedStep";
const LS_PAGE_KEY = "ailk_page";

function LegacyApp() {
  const [page, setPage] = useState<Page>(() => {
    const saved = localStorage.getItem(LS_PAGE_KEY) as Page | null;
    // Only restore wizard pages — not login/otp/generating
    const restorable: Page[] = ["questionnaire", "category-mood", "colors", "pick-pages"];
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
        {page === "questionnaire" && <QuestionnairePage {...({ onNext: goNext, onBack: goBack, onStepClick: goToStep, completedUpTo } as any)} />}
        {page === "category-mood" && <CategoryMoodPage {...({ onNext: goNext, onBack: goBack, onStepClick: goToStep, completedUpTo } as any)} />}
        {page === "colors" && <ColorsFontsPage {...({ onNext: goNext, onBack: goBack, onStepClick: goToStep, completedUpTo } as any)} />}
        {page === "pick-pages" && <PickPagesPage {...({ onNext: goNext, onBack: goBack, onStepClick: goToStep, completedUpTo } as any)} />}
        {page === "generating" && <GeneratingPage {...({ onNext: goNext } as any)} />}
        {page === "preview" && <PreviewPage {...({ onNext: goNext, onBack: goBack } as any)} />}
        {page === "download" && <DownloadPage {...({ onBack: () => go("login") } as any)} />}
      </div>
    </div>
  );
}

const LS_PROJECT_KEY = "ailk_projectId";
const LS_OPERATION_KEY = "ailk_operationId";
const WIZARD_PAGES: Page[] = ["questionnaire", "category-mood", "colors", "pick-pages"];
const ACTIVE_BUILD_STATUSES: BuildView["status"][] = [
  "queued",
  "submitting",
  "running",
  "processing_result",
];

function clearProjectSessionState() {
  [LS_PROJECT_KEY, LS_OPERATION_KEY, LS_STEP_KEY].forEach((key) => localStorage.removeItem(key));
}

function resumePageForProject(
  project: ProjectView,
  build: BuildView | null,
  mockups: MockupView[],
): { page: Page; maxReachedStep: number } {
  if (build?.status === "completed") {
    return { page: "download", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  if (build && ACTIVE_BUILD_STATUSES.includes(build.status)) {
    return { page: "building", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  if (mockups.length > 0 || project.selectedMockupId) {
    return { page: "preview", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  const hasCompany = Boolean(project.business.companyName.trim());
  if (!hasCompany) {
    return { page: "questionnaire", maxReachedStep: -1 };
  }
  return { page: "questionnaire", maxReachedStep: 0 };
}

export default function App() {
  const [page, setPage] = useState<Page>(() => (hasAccessToken() ? "projects" : "login"));
  const [maxReachedStep, setMaxReachedStep] = useState(() => {
    const saved = localStorage.getItem(LS_STEP_KEY);
    return saved === null ? -1 : Number.parseInt(saved, 10);
  });
  const [catalog, setCatalog] = useState<WizardCatalog | null>(null);
  const [project, setProject] = useState<ProjectView | null>(null);
  const [projects, setProjects] = useState<ProjectSummaryView[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [operation, setOperation] = useState<OperationView | null>(null);
  const [mockups, setMockups] = useState<MockupView[]>([]);
  const [build, setBuild] = useState<BuildView | null>(null);
  const [deployment, setDeployment] = useState<DeploymentView | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  const go = useCallback((next: Page) => {
    setPage(next);
    localStorage.setItem(LS_PAGE_KEY, next);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_STEP_KEY, String(maxReachedStep));
  }, [maxReachedStep]);

  const refreshProject = async (projectId: string) => {
    const refreshed = await launchKitApi.getProject(projectId);
    setProject(refreshed);
    return refreshed;
  };

  const refreshProjects = async () => {
    setProjectsLoading(true);
    try {
      setProjects(await launchKitApi.listProjects());
    } finally {
      setProjectsLoading(false);
    }
  };

  const clearActiveProject = () => {
    clearProjectSessionState();
    setProject(null);
    setOperation(null);
    setMockups([]);
    setBuild(null);
    setDeployment(null);
    setMaxReachedStep(-1);
  };

  useEffect(() => {
    let cancelled = false;
    const boot = async () => {
      // Returning from the Innovation City OAuth redirect (?auth=success/error).
      const params = new URLSearchParams(window.location.search);
      const authStatus = params.get("auth");
      if (authStatus) {
        const reason = params.get("reason");
        params.delete("auth");
        params.delete("reason");
        const query = params.toString();
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}${query ? `?${query}` : ""}`,
        );
        if (authStatus === "success") {
          try {
            const session = await fetchInnovationCityApiToken();
            setAccessToken(session.accessToken);
          } catch {
            if (!cancelled) setError("Sign-in could not be completed. Please try again.");
          }
        } else if (authStatus === "error") {
          if (!cancelled) {
            setError(reason ? `Sign-in failed: ${reason}` : "Sign-in failed. Please try again.");
          }
        }
      }

      if (!hasAccessToken()) {
        // Cookie-only IC session: mint/store Bearer so /api/v1 works after refresh.
        try {
          const session = await fetchInnovationCityApiToken();
          if (cancelled) return;
          setAccessToken(session.accessToken);
        } catch {
          setPage("login");
          if (!cancelled) setBooting(false);
          try {
            const loadedCatalog = await launchKitApi.getCatalog();
            if (!cancelled) setCatalog(loadedCatalog);
          } catch {
            // Catalog is only required after sign-in; login still works without it.
          }
          return;
        }
      }

      try {
        const loadedCatalog = await launchKitApi.getCatalog();
        if (cancelled) return;
        setCatalog(loadedCatalog);
        go("projects");
        setProjects(await launchKitApi.listProjects());
      } catch (cause) {
        if (cause instanceof LaunchKitApiError && cause.status === 401) {
          clearAccessToken();
          setPage("login");
          setError("Your staging session expired. Sign in again to continue.");
          return;
        }
        setError(cause instanceof Error ? cause.message : "Could not load your projects.");
        go("projects");
      } finally {
        if (!cancelled) setBooting(false);
      }
    };
    void boot();
    return () => { cancelled = true; };
  }, [go]);

  useEffect(() => {
    if (build?.status === "completed" && page === "building") go("download");
  }, [build?.status, page, go]);

  useEffect(() => {
    if (!build || !ACTIVE_BUILD_STATUSES.includes(build.status)) return;

    const controller = new AbortController();
    void watchBuild(
      build,
      (next) => {
        if (controller.signal.aborted) return;
        setBuild(next);
        setError(null);
      },
      controller.signal,
    ).catch((cause) => {
      if (controller.signal.aborted) return;
      if (cause instanceof LaunchKitApiError && cause.status === 401) {
        clearAccessToken();
        setPage("login");
      }
      setError(cause instanceof Error ? cause.message : "Build status could not be refreshed.");
    });
    return () => controller.abort();
  }, [build?.id]);

  const perform = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (cause) {
      if (cause instanceof LaunchKitApiError && cause.status === 401) {
        clearAccessToken();
        setPage("login");
      }
      setError(cause instanceof Error ? cause.message : "The request could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  const ensureProject = async () => {
    if (project) return project;
    const savedProjectId = localStorage.getItem(LS_PROJECT_KEY);
    if (savedProjectId) {
      try {
        const savedProject = await launchKitApi.getProject(savedProjectId);
        setProject(savedProject);
        return savedProject;
      } catch (cause) {
        if (!(cause instanceof LaunchKitApiError) || cause.status !== 404) throw cause;
        localStorage.removeItem(LS_PROJECT_KEY);
      }
    }
    throw new LaunchKitApiError(
      "Create or open a website from your projects list first.",
      400,
      "project_required",
    );
  };

  const signIn = () => {
    beginInnovationCityLogin();
  };

  const createWebsite = () => perform(async () => {
    clearActiveProject();
    try {
      const created = await launchKitApi.createProject();
      localStorage.setItem(LS_PROJECT_KEY, created.id);
      setProject(created);
      setMaxReachedStep(-1);
      go("questionnaire");
    } catch (cause) {
      if (cause instanceof LaunchKitApiError && cause.code === "generation_quota_exceeded") {
        setError(cause.message);
        await refreshProjects();
        go("projects");
        return;
      }
      throw cause;
    }
  });

  const openProject = (projectId: string) => perform(async () => {
    const loadedProject = await launchKitApi.getProject(projectId);
    localStorage.setItem(LS_PROJECT_KEY, loadedProject.id);
    localStorage.removeItem(LS_OPERATION_KEY);
    setProject(loadedProject);
    setOperation(null);
    const loadedMockups = await launchKitApi.getMockups(projectId);
    setMockups(loadedMockups);
    let loadedBuild: BuildView | null = null;
    if (loadedProject.latestBuildId) {
      loadedBuild = await launchKitApi.getBuild(loadedProject.latestBuildId);
      setBuild(loadedBuild);
    } else {
      setBuild(null);
    }
    if (loadedProject.latestDeploymentId) {
      setDeployment(await launchKitApi.getDeployment(loadedProject.latestDeploymentId));
    } else {
      setDeployment(null);
    }
    const resume = resumePageForProject(loadedProject, loadedBuild, loadedMockups);
    setMaxReachedStep(resume.maxReachedStep);
    go(resume.page);
  });

  const returnToProjects = () => perform(async () => {
    clearActiveProject();
    await refreshProjects();
    go("projects");
  });

  const signOut = () => {
    void innovationCityLogout();
    clearAccessToken();
    clearActiveProject();
    setProjects([]);
    setError(null);
    go("login");
  };

  const saveBusiness = (form: QuestionnaireForm) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, {
      business: {
        companyName: form.companyName,
        industry: form.industry,
        targetAudience: form.customers,
      },
      design: {
        tagline: form.tagline,
        cta: current.design.cta?.trim() || "Get Started",
      },
    });
    setProject(updated);
    setMaxReachedStep(Math.max(1, maxReachedStep));
    go("category-mood");
  });

  const uploadLogo = (file: File) => perform(async () => {
    const current = await ensureProject();
    await launchKitApi.uploadAsset(current.id, file, "logo");
    await refreshProject(current.id);
  });

  const uploadDocuments = (files: File[]) => perform(async () => {
    const current = await ensureProject();
    for (const file of files) {
      await launchKitApi.uploadAsset(current.id, file, "document");
    }
    await refreshProject(current.id);
  });

  const removeAsset = (assetId: string) => perform(async () => {
    const current = await ensureProject();
    await launchKitApi.deleteAsset(current.id, assetId);
    await refreshProject(current.id);
  });

  const applySummary = (summary: AiSummaryDraft) => perform(async () => {
    const current = await ensureProject();
    const extracted = current.extractedProfileFields ?? {};
    const notesParts = [summary.services, summary.brandTone].map((part) => part.trim()).filter(Boolean);
    const updated = await launchKitApi.patchProject(current.id, {
      business: {
        companyName:
          pickExtracted(extracted.companyName, current.business.companyName) ||
          current.business.companyName,
        industry:
          pickExtracted(extracted.industry, current.business.industry) ||
          current.business.industry,
        targetAudience:
          summary.targetAudience.trim() || current.business.targetAudience,
        uvp: summary.companyOverview.trim() || current.business.uvp,
        notes: notesParts.join("\n\n") || current.business.notes,
      },
      design: {
        tagline:
          pickExtracted(extracted.tagline, current.design.tagline) ||
          current.design.tagline,
        cta: summary.mainCta.trim() || current.design.cta || "Get Started",
      },
    });
    setProject(updated);
  });

  const runAiSummary = () => perform(async () => {
    const current = await ensureProject();
    const documents = current.uploadedAssets.filter((asset) => asset.kind === "profile_source");
    if (!documents.length) return;
    // Backend merges every brand document on the project; anchor on any PDF when available.
    const anchor =
      [...documents].reverse().find((asset) => asset.filename.toLowerCase().endsWith(".pdf"))
      ?? documents.at(-1);
    if (!anchor) return;
    const queued = await launchKitApi.extractFromAsset(current.id, anchor.id);
    setOperation(queued);
    await waitForOperation(queued.id, setOperation);
    await refreshProject(current.id);
  });

  const saveDesign = (categoryId: string, moodId: string, animationId: string) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, {
      business: { categoryId },
      design: { moodId, animationId },
    });
    setProject(updated);
    setMaxReachedStep(Math.max(2, maxReachedStep));
    go("colors");
  });

  const saveColors = (
    paletteId: string,
    customPalette: CustomPalette | null,
    fontPairingId: string,
    customFonts: { heading: string; body: string } | null,
  ) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, {
      design: { paletteId, customPalette, fontPairingId, customFonts },
    });
    setProject(updated);
    setMaxReachedStep(Math.max(3, maxReachedStep));
    go("pick-pages");
  });

  const generateMockups = (layout: PageLayout) => perform(async () => {
    const current = await ensureProject();
    const updated = await launchKitApi.patchProject(current.id, { pageLayout: layout });
    setProject(updated);
    go("generating");
    const queued = await launchKitApi.createMockups(current.id, createIdempotencyKey("mockups"));
    localStorage.setItem(LS_OPERATION_KEY, queued.id);
    setOperation(queued);
    await waitForOperation(queued.id, setOperation);
    localStorage.removeItem(LS_OPERATION_KEY);
    setMockups(await launchKitApi.getMockups(current.id));
    await refreshProject(current.id);
    go("preview");
  });

  const startBuild = (mockupId: string) => perform(async () => {
    const current = await ensureProject();
    await launchKitApi.selectMockup(current.id, mockupId);
    const queued = await launchKitApi.createBuild(current.id, createIdempotencyKey("build"));
    setProject({ ...current, selectedMockupId: mockupId, latestBuildId: queued.id });
    setBuild(queued);
    go("building");
  });

  const deploy = async () => {
    if (!build) return;
    if (deployment?.status === "ready_to_claim" && deployment.claimUrl) {
      window.open(deployment.claimUrl, "_blank", "noopener,noreferrer");
      return;
    }
    await perform(async () => {
      const queued = await launchKitApi.createDeployment(build.id, createIdempotencyKey("deployment"));
      setDeployment(queued);
      await waitForDeployment(queued.id, setDeployment);
    });
  };

  const goBack = () => {
    if (page === "questionnaire") {
      void returnToProjects();
      return;
    }
    const order: Page[] = ["login", "otp", "projects", ...WIZARD_PAGES, "generating", "preview", "building", "download"];
    const index = order.indexOf(page);
    if (index > 0) go(order[index - 1]);
  };

  const goToStep = (step: number) => {
    const target = WIZARD_PAGES[step];
    if (!target) return;
    if (WIZARD_PAGES.indexOf(target) <= WIZARD_PAGES.indexOf(page)) go(target);
  };

  const currentStep = WIZARD_PAGES.indexOf(page);
  const completedUpTo = Math.max(maxReachedStep, currentStep - 1);
  const isAuthPage = page === "login" || page === "otp";
  const isHubPage = page === "projects";
  const needsProject = !isAuthPage && !isHubPage;
  const needsCatalog = needsProject;

  if (!isAuthPage && !isHubPage && (booting || (needsCatalog && !catalog) || (needsProject && !project))) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#0b0b0b" }}>
        <div className="rounded-full" style={{ width: 48, height: 48, border: "3px solid rgba(111,204,221,0.2)", borderTop: "3px solid #6fccdd", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#0b0b0b", display: "flex", justifyContent: "center", alignItems: "stretch" }}>
      <div style={{ width: "100%", maxWidth: 1440, minHeight: "100vh", margin: "0 auto", display: "flex", flexDirection: "column" }}>
        {page === "login" && <LoginPage onNext={signIn} busy={busy} />}
        {error && (
          <div className="fixed top-[96px] left-1/2 -translate-x-1/2 z-[10000] max-w-[calc(100%-32px)] px-4 py-3 rounded-[8px] flex items-center gap-3" style={{ background: "#2b1717", border: "1px solid rgba(248,113,113,0.5)", color: "white", fontFamily: "'Montserrat', sans-serif" }}>
            <span className="text-[13px] font-medium">{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss error" className="text-[18px] leading-none">×</button>
          </div>
        )}
        {page === "projects" && (
          <ProjectsPage
            projects={projects}
            loading={projectsLoading || booting}
            busy={busy}
            onCreate={createWebsite}
            onOpen={openProject}
            onRefresh={refreshProjects}
            onSignOut={signOut}
          />
        )}
        {page === "questionnaire" && project && (
          <QuestionnairePage
            project={project}
            onSave={saveBusiness}
            onUploadLogo={uploadLogo}
            onUploadDocuments={uploadDocuments}
            onRemoveAsset={removeAsset}
            onApplySummary={applySummary}
            onRunAiSummary={runAiSummary}
            busy={busy}
            onBack={goBack}
            onStepClick={goToStep}
            completedUpTo={completedUpTo}
          />
        )}
        {page === "category-mood" && project && catalog && <CategoryMoodPage project={project} catalog={catalog} onSave={saveDesign} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "colors" && project && catalog && <ColorsFontsPage project={project} catalog={catalog} onSave={saveColors} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "pick-pages" && project && catalog && <PickPagesPage project={project} catalog={catalog} onGenerate={generateMockups} busy={busy} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
        {page === "generating" && <GeneratingPage operation={operation} error={error} onRetry={() => project && void generateMockups(project.pageLayout)} />}
        {page === "preview" && project && <PreviewPage mockups={mockups} selectedMockupId={project.selectedMockupId} onConfirm={startBuild} busy={busy} onBack={() => go("pick-pages")} />}
        {page === "building" && <BuildingPage build={build} error={error} onBack={() => go("preview")} />}
        {page === "download" && build?.status === "completed" && <DownloadPage build={build} deployment={deployment} onDeploy={deploy} busy={busy} onBack={() => { void returnToProjects(); }} />}
      </div>
    </div>
  );
}
