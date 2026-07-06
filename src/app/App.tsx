import { useState, useRef, useEffect, useCallback } from "react";
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

// ─── Scaled Page Wrapper ──────────────────────────────────────────────────────
// Uses CSS `zoom` (not transform: scale) so pointer events, input focus, and
// scroll coordinates all stay correctly aligned with the visible layout.
function ScaledPage({
  children,
  designHeight: _designHeight = 900,
  scrollable = false,
}: {
  children: React.ReactNode;
  designHeight?: number;
  scrollable?: boolean;
}) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / 1440));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: scrollable ? "auto" : "hidden",
        minHeight: scrollable ? "100vh" : undefined,
      }}
    >
      <div style={{ width: 1440, zoom: scale }}>
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
      }}
    >
      {/* Logo */}
      <div className="absolute" style={{ left: 32, top: 24 }}>
        <LogoSvg />
      </div>

      {/* Right side actions */}
      <div className="absolute flex items-center gap-[24px]" style={{ right: 32 }}>
        {/* Ask AI */}
        <button className="flex items-center gap-[8px] text-white font-semibold text-[14px]">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d={p.p3e76600} fill="rgba(255,255,255,0.2)" />
          </svg>
          Ask AI
        </button>
        {/* Help */}
        <button className="flex items-center gap-[8px] text-white font-semibold text-[14px]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d={p.pbcad900} fill="rgba(255,255,255,0.2)" />
          </svg>
          Help &amp; Support
        </button>
        {/* Avatar */}
        {showProfile && (
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              background: "#0f766e",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d={p.p61d9400}
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
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
  onNext: () => void;
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

  return (
    <div
      className="relative flex items-center"
      style={{
        height: 52,
        background: "#0b0b0b",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Left: Back + title */}
      <div className="flex items-center gap-[12px] pl-[24px]">
        <button onClick={onBack} className="flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={n.p8122280} fill="white" />
          </svg>
        </button>
        <div style={{ width: 1, height: 22.5, background: "rgba(255,255,255,0.1)" }} />
        <span className="text-white font-semibold text-[18px]">AI Launch Kit</span>
      </div>

      {/* Center: step breadcrumb */}
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
                  // Active: white label. Completed: teal label. Pending: dimmed per Figma.
                  color: active
                    ? "rgba(255,255,255,1)"
                    : done
                    ? "#6FCCDD"
                    : step.iconKey === "widget"
                    ? "rgba(128,128,128,0.55)"   // Design step pending — Figma exact
                    : "rgba(255,255,255,0.4)",    // Colors & Pick Pages pending — Figma exact
                  background: active ? "rgba(111,204,221,0.08)" : "transparent",
                  cursor: clickable ? "pointer" : "default",
                }}
              >
                <StepIcon iconKey={step.iconKey} done={done && !active} active={active} />
                <span className="font-semibold text-[13px]">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <svg width="8" height="8" viewBox="0 0 4.5 7.5" fill="none">
                  <path
                    d={n.pb873b80}
                    stroke="#6FCCDD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: Next button */}
      <div className="absolute right-[24px]">
        <button
          onClick={onNext}
          className="font-semibold text-[14px] text-black uppercase px-[24px] py-[12px] rounded-[8px]"
          style={{ background: "#6fccdd" }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

// ─── PAGE 1: Login ────────────────────────────────────────────────────────────
function LoginPage({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("");
  const p = svgPathsLogin;

  return (
    <ScaledPage designHeight={900}>
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader showProfile={false} />
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            className="flex flex-col gap-[32px]"
            style={{
              width: 480,
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid white",
              borderRadius: 20,
              padding: 48,
            }}
          >
            {/* Logo mark */}
            <div className="flex flex-col gap-[20px]">
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
                <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
                  <path d={p.pdbfe710} fill="#5752A3" />
                  <path d={p.p389a4180} fill="#5752A3" />
                </svg>
              </div>

              <div>
                <h2 className="text-white font-semibold text-[18px] mb-[8px]">Welcome back</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>
                  Enter your email to receive a one-time code
                </p>
              </div>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

            {/* Email field */}
            <div className="flex flex-col gap-[8px]">
              <label
                className="font-semibold uppercase"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}
              >
                Email Address
              </label>
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
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent outline-none font-medium text-[14px] text-white"
                  style={{ color: "white", caretColor: "#6fccdd" }}
                  onKeyDown={(e) => e.key === "Enter" && onNext()}
                />
              </div>
            </div>

            {/* Send Code button */}
            <button
              onClick={onNext}
              className="w-full flex items-center justify-center gap-[8px] font-semibold text-[14px] text-white uppercase"
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

            <p className="text-center font-medium text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              No account?{" "}
              <span className="cursor-pointer font-semibold" style={{ color: "#6fccdd" }}>
                Sign up free
              </span>
            </p>
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Backspace") {
        setOtp((prev) => {
          const next = [...prev];
          if (next[focused]) {
            next[focused] = "";
          } else if (focused > 0) {
            next[focused - 1] = "";
            setFocused((f) => Math.max(0, f - 1));
          }
          return next;
        });
      } else if (/^\d$/.test(e.key)) {
        setOtp((prev) => {
          const next = [...prev];
          next[focused] = e.key;
          return next;
        });
        setFocused((f) => Math.min(5, f + 1));
      } else if (e.key === "ArrowLeft") {
        setFocused((f) => Math.max(0, f - 1));
      } else if (e.key === "ArrowRight") {
        setFocused((f) => Math.min(5, f + 1));
      } else if (e.key === "Enter" && otp.every((d) => d !== "")) {
        onNext();
      }
    },
    [focused, otp, onNext]
  );

  return (
    <ScaledPage designHeight={900}>
      <div
        className="w-full h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader showProfile={false} />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="flex flex-col gap-[32px]"
            style={{
              width: 480,
              background: "#131313",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: 48,
            }}
          >
            <div>
              <h2 className="text-white font-semibold text-[18px] mb-[8px]">Check your email</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>
                We sent a 6-digit code to your email address
              </p>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

            {/* OTP boxes */}
            <div className="flex gap-[10px] justify-center" onClick={() => inputRef.current?.focus()}>
              {otp.map((digit, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-[12px] text-white text-[20px] font-semibold cursor-text"
                  style={{
                    width: 56,
                    height: 56,
                    background: "rgba(255,255,255,0.02)",
                    border:
                      i === focused
                        ? "2px solid #6fccdd"
                        : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: i === focused ? "0 0 12px rgba(14,207,207,0.4)" : "none",
                  }}
                >
                  {digit ? "●" : ""}
                </div>
              ))}
              {/* Hidden real input */}
              <input
                ref={inputRef}
                className="absolute opacity-0 w-0 h-0"
                onKeyDown={handleKeyDown}
                readOnly
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
              />
            </div>

            {/* Verify button */}
            <button
              onClick={onNext}
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

            <div className="flex flex-col items-center gap-[12px]">
              <p className="text-center font-medium text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Didn't receive a code?{" "}
                <span className="cursor-pointer font-semibold" style={{ color: "#6fccdd" }}>
                  Resend
                </span>
              </p>
              <button
                onClick={onBack}
                className="font-medium text-[13px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
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
  const [form, setForm] = useState({
    companyName: "",
    businessCategory: "",
    customers: "",
    tagline: "",
    cta: "",
    anythingElse: "",
  });

  const fields = [
    [
      { key: "companyName", label: "Company / Brand Name", placeholder: "e.g. Acme Corp" },
      { key: "businessCategory", label: "Business Category", placeholder: "e.g. SaaS, Retail..." },
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
    <ScaledPage designHeight={1100} scrollable>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />
        <SubNav activeStep={0} completedUpTo={completedUpTo} onBack={onBack} onNext={onNext} onStepClick={onStepClick} />

        <div className="flex-1 px-[80px] py-[48px] flex flex-col gap-[24px]">
          {/* Upload banner */}
          <div
            className="flex items-center justify-between px-[24px] py-[18px]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid white",
              borderRadius: 12,
            }}
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
                Prefer to upload your portfolio instead?
              </span>
            </div>
            <button
              className="font-semibold text-[14px] underline"
              style={{ color: "#6fccdd" }}
            >
              Upload here →
            </button>
          </div>

          {/* Main form panel */}
          <div
            className="relative flex flex-col gap-[40px] p-[56px]"
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
              <h2 className="text-white font-semibold text-[24px]">Tell us about your brand</h2>
              <div className="w-[8px] h-[8px] rounded-full" style={{ background: "#6fccdd" }} />
            </div>

            {fields.map((row, ri) => (
              <div key={ri} className="grid grid-cols-2 gap-[24px]">
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

            {/* Save button */}
            <button
              onClick={onNext}
              className="w-full font-semibold text-[14px] uppercase"
              style={{
                background: "#6fccdd",
                color: "#0b0b0b",
                borderRadius: 12,
                padding: "16px 0",
              }}
            >
              Save &amp; Continue
            </button>
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
  const [category, setCategory] = useState("Tech / SaaS");
  const [mood, setMood] = useState("Dark & Modern");
  const [themeMode, setThemeMode] = useState("Dark");
  const [animLevel, setAnimLevel] = useState(2);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);

  return (
    <ScaledPage designHeight={1000} scrollable>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />
        <SubNav activeStep={1} completedUpTo={completedUpTo} onBack={onBack} onNext={onNext} onStepClick={onStepClick} />

        <div className="px-[120px] py-[48px] flex flex-col gap-[48px]">

          {/* ── Cards row ─────────────────────────────────────────────────────── */}
          <div className="flex gap-[12px]">
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
                    <h3 className="text-white font-semibold text-[18px] leading-[28px]">{category}</h3>
                    <p className="font-medium text-[14px] leading-[20px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 360 }}>
                      {BUSINESS_CATEGORIES.find((c) => c.label === category)?.desc ?? ""}
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
                  className="flex items-center gap-[8px] font-medium text-[14px] leading-[20px] w-fit"
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
                    <h3 className="text-white font-semibold text-[18px] leading-[28px]">{mood}</h3>
                    <p className="font-medium text-[14px] leading-[20px]" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 360 }}>
                      {DESIGN_MOODS.find((m) => m.label === mood)?.desc ?? ""}
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
                  className="flex items-center gap-[8px] font-medium text-[14px] leading-[20px] w-fit"
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

          {/* ── Theme Mode ────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-[24px]">
            <p className="font-semibold uppercase text-[12px]" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>
              Theme Mode
            </p>
            <div className="flex gap-[0px]">
              {(["Light", "Dark", "Both"] as const).map((mode) => {
                const isSelected = themeMode === mode;
                const label = mode === "Both" ? "Light + Dark Mode" : `${mode} Mode`;
                const isDark = mode === "Dark" || mode === "Both";
                const barBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(11,11,11,0.1)";
                const sidebarBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(11,11,11,0.1)";
                return (
                  <button
                    key={mode}
                    onClick={() => setThemeMode(mode)}
                    className="flex-1 flex flex-col items-center gap-[16px]"
                  >
                    {/* Thumbnail row: mockup + indicator circle side by side */}
                    <div className="flex items-center gap-[16px] w-full justify-center">
                      {/* Browser mockup */}
                      <div
                        className="overflow-hidden relative"
                        style={{
                          width: 248,
                          height: 90,
                          borderRadius: 8,
                          background: mode === "Light" ? "white" : "#050505",
                          border: "1px solid rgba(255,255,255,0.1)",
                          flexShrink: 0,
                        }}
                      >
                        {/* Chrome bar with dots */}
                        <div className="flex items-center gap-[4px] px-[5px]" style={{ height: 14, background: barBg }}>
                          {[["#5752A3",1],["#6FCCDD",1],["white",1]].map(([c], di) => (
                            <div key={di} style={{ width: 5, height: 5, borderRadius: "50%", background: c as string, opacity: 0.8 }} />
                          ))}
                        </div>
                        {/* Content: sidebar + main panel */}
                        <div className="flex" style={{ height: 76 }}>
                          {/* Sidebar */}
                          <div className="flex flex-col gap-[3px] p-[8px]" style={{ width: 45 }}>
                            <div style={{ height: 4, width: 22, borderRadius: 100, background: sidebarBg }} />
                            <div style={{ height: 8, borderRadius: 100, background: sidebarBg }} />
                            <div style={{ height: 3, borderRadius: 100, background: sidebarBg }} />
                            <div style={{ height: 3, borderRadius: 100, background: sidebarBg }} />
                            <div style={{ height: 3, width: 30, borderRadius: 100, background: sidebarBg }} />
                            <div className="flex gap-[2px] mt-[4px]">
                              <div style={{ height: 8, flex: 1, borderRadius: 2, background: "#6fccdd" }} />
                              <div style={{ height: 8, flex: 1, borderRadius: 2, border: `1px solid ${sidebarBg}` }} />
                            </div>
                          </div>
                          {/* Right panel */}
                          <div style={{ flex: 1, background: sidebarBg, borderRadius: 4, margin: "8px 8px 8px 0" }} />
                        </div>
                        {/* Light+Dark: overlay the right portion with white/light */}
                        {mode === "Both" && (
                          <div
                            className="absolute top-0 right-0 h-full overflow-hidden"
                            style={{ width: "45%", background: "white" }}
                          >
                            <div style={{ height: 14, background: "rgba(11,11,11,0.1)" }} />
                            <div style={{ flex: 1, margin: "8px", background: "rgba(11,11,11,0.1)", borderRadius: 4, height: 54 }} />
                          </div>
                        )}
                      </div>
                      {/* Check/circle indicator — to the RIGHT of thumbnail */}
                      {isSelected ? (
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                          <path d={svgPathsCatMood.p1e585400} fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="11" cy="11" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                    {/* Label below */}
                    <p
                      className="font-semibold text-[18px] leading-[28px]"
                      style={{ color: isSelected ? "#6fccdd" : "white" }}
                    >
                      {label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Animation Level ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-[32px]">
            <p className="font-semibold uppercase text-[12px]" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>
              Animation Level
            </p>
            {/*
              Layout: a flex row where each node is [flex spacer] [node column] [flex spacer].
              The node column has: text above, dot below — the dot sits on the track line.
              The track line is drawn as a single absolute line behind the dots.
            */}
            <div className="relative flex items-end">
              {/* Full-width track line, vertically centered on the dots (dots are 24px, so line at bottom+12px) */}
              <div
                className="absolute left-0 right-0"
                style={{ bottom: 11, height: 2, background: "rgba(255,255,255,0.1)" }}
              />
              {ANIMATION_LEVELS.map((lvl, i) => {
                const isActive = i === animLevel;
                return (
                  <button
                    key={lvl.label}
                    onClick={() => setAnimLevel(i)}
                    className="flex-1 flex flex-col items-center gap-[12px] relative z-10"
                  >
                    {/* Label + sub-label above */}
                    <div className="flex flex-col gap-[2px] items-center text-center">
                      <span
                        className="font-semibold text-[16px] leading-[24px]"
                        style={{ color: isActive ? "#6fccdd" : "white" }}
                      >
                        {lvl.label}
                      </span>
                      <span className="font-medium text-[14px] leading-[20px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {lvl.sub}
                      </span>
                    </div>
                    {/* Circle on the track */}
                    {isActive ? (
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                        <path d={svgPathsCatMood.p1e585400} fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
              className="relative flex flex-col gap-[24px] p-[40px]"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                maxWidth: 720,
                width: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-[20px]">Choose Business Category</h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-white font-bold text-[20px] w-[32px] h-[32px] flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 8,
                  }}
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-3 gap-[12px]">
                {BUSINESS_CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => {
                      setCategory(cat.label);
                      setShowCategoryModal(false);
                    }}
                    className="p-[16px] text-left rounded-[12px] transition-all"
                    style={{
                      background: cat.label === category ? "rgba(111,204,221,0.12)" : "rgba(255,255,255,0.04)",
                      border: cat.label === category ? "1px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="font-semibold text-[14px] mb-[4px]" style={{ color: cat.label === category ? "#6fccdd" : "white" }}>{cat.label}</p>
                    <p className="font-medium text-[12px] leading-[16px]" style={{ color: "rgba(255,255,255,0.4)" }}>{cat.desc}</p>
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
              className="relative flex flex-col gap-[24px] p-[40px]"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                maxWidth: 720,
                width: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-[20px]">Choose Design Mood</h3>
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
              <div className="grid grid-cols-2 gap-[12px]">
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
                    <p className="font-semibold text-[15px] mb-[4px]" style={{ color: m.label === mood ? "#6fccdd" : "white" }}>{m.label}</p>
                    <p className="font-medium text-[13px] leading-[18px]" style={{ color: "rgba(255,255,255,0.4)" }}>{m.desc}</p>
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
const PALETTES = [
  ["#293681", "#4274d9", "#95ccdd", "#d0e7e6"],
  ["#659287", "#88bda4", "#b1d3b9", "#e6f2dd"],
  ["#111111", "#cb2957", "#dddddd", "#eeeeee"],
  ["#111844", "#4b5694", "#7288ae", "#eae0cf"],
  ["#7f2020", "#869b7e", "#c9caac", "#f6f3eb"],
  ["#c0e1d2", "#e5eee4", "#f6f4e8", "#dc9b9b"],
  ["#41431b", "#aeb784", "#e3dbbb", "#f8f3e1"],
  ["#eaefef", "#bfc9d1", "#25343f", "#ff9b51"],
];

const FONT_PAIRS = [
  { heading: "Proxima Nova", body: "Inter" },
  { heading: "Urbanist", body: "Poppins" },
  { heading: "Outfit", body: "Sofia Pro" },
  { heading: "Anton", body: "Montserrat" },
  { heading: "Playfair Display", body: "Lato" },
  { heading: "Raleway", body: "Open Sans" },
  { heading: "DM Sans", body: "Nunito" },
  { heading: "Josefin Sans", body: "Source Sans Pro" },
];

function ColorsFontsPage({ onNext, onBack, onStepClick, completedUpTo }: { onNext: () => void; onBack: () => void; onStepClick?: (step: number) => void; completedUpTo?: number }) {
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);

  return (
    <ScaledPage designHeight={1200} scrollable>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />
        <SubNav activeStep={2} completedUpTo={completedUpTo} onBack={onBack} onNext={onNext} onStepClick={onStepClick} />

        <div className="px-[80px] py-[48px] flex flex-col gap-[40px]">
          {/* Palettes section */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span
                className="font-semibold uppercase text-[13px]"
                style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
              >
                Theme Mode
              </span>
              <button
                className="font-semibold text-[13px] flex items-center gap-[6px]"
                style={{ color: "#6FCCDD" }}
                onClick={() => {
                  let next;
                  do { next = Math.floor(Math.random() * PALETTES.length); } while (next === selectedPalette);
                  setSelectedPalette(next);
                }}
              >
                Pick automatically
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-[16px]">
              {PALETTES.map((palette, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPalette(i)}
                  className="relative rounded-[8px] overflow-hidden"
                  style={{
                    height: 80,
                    outline:
                      selectedPalette === i
                        ? "2px solid #6fccdd"
                        : "1px solid rgba(255,255,255,0.1)",
                    outlineOffset: selectedPalette === i ? 2 : 0,
                  }}
                >
                  <div className="flex w-full h-full">
                    {palette.map((color, j) => (
                      <div
                        key={j}
                        className="flex-1 h-full"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  {/* Check indicator */}
                  <div
                    className="absolute top-[8px] right-[8px] flex items-center justify-center rounded-full"
                    style={{
                      width: 20,
                      height: 20,
                      background:
                        selectedPalette === i ? "#6fccdd" : "rgba(255,255,255,0.15)",
                      border:
                        selectedPalette === i
                          ? "none"
                          : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {selectedPalette === i && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5L4 7L8 3"
                          stroke="#0b0b0b"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Pairings section */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span
                className="font-semibold uppercase text-[13px]"
                style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
              >
                Font Pairings
              </span>
              <button
                className="font-semibold text-[13px] flex items-center gap-[6px]"
                style={{ color: "#6FCCDD" }}
                onClick={() => {
                  let next;
                  do { next = Math.floor(Math.random() * FONT_PAIRS.length); } while (next === selectedFont);
                  setSelectedFont(next);
                }}
              >
                Pick automatically
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-[16px]">
              {FONT_PAIRS.slice(0, 4).map((pair, i) => (
                <FontCard
                  key={i}
                  pair={pair}
                  selected={selectedFont === i}
                  onClick={() => setSelectedFont(i)}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-[16px]">
              {FONT_PAIRS.slice(4).map((pair, i) => (
                <FontCard
                  key={i + 4}
                  pair={pair}
                  selected={selectedFont === i + 4}
                  onClick={() => setSelectedFont(i + 4)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}

function FontCard({
  pair,
  selected,
  onClick,
}: {
  pair: { heading: string; body: string };
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-[12px] p-[20px] text-left"
      style={{
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        border: selected ? "1px solid #6fccdd" : "1px solid white",
        background: selected ? "rgba(111,204,221,0.05)" : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-semibold uppercase text-[11px]"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}
        >
          Heading
        </span>
        <span className="font-semibold text-[11px]" style={{ color: "#6fccdd" }}>
          {pair.heading}
        </span>
      </div>
      <p className="text-white font-bold text-[18px] leading-tight">
        The Quick Brown Fox
      </p>
      <div className="flex items-center justify-between">
        <span
          className="font-semibold uppercase text-[11px]"
          style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}
        >
          Body
        </span>
        <span className="font-semibold text-[11px]" style={{ color: "#6fccdd" }}>
          {pair.body}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
        Jumps over the lazy dog. Clear, readable body copy for the web.
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
];

function PickPagesPage({ onNext, onBack, onStepClick, completedUpTo }: { onNext: () => void; onBack: () => void; onStepClick?: (step: number) => void; completedUpTo?: number }) {
  const [pages, setPages] = useState<PageTemplate[]>(() =>
    PAGE_TEMPLATES.map((p) => ({ ...p, sections: p.sections.map((s) => ({ ...s })) }))
  );
  const [openMenu, setOpenMenu] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [addModal, setAddModal] = useState<string | null>(null); // pageId
  const [renaming, setRenaming] = useState<{ pageId: string; sectionId: string; value: string } | null>(null);
  const [drag, setDrag] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [dragOver, setDragOver] = useState<{ pageId: string; sectionId: string } | null>(null);

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
    if (!drag || drag.pageId !== targetPageId) { setDrag(null); setDragOver(null); return; }
    updateSections(targetPageId, (s) => {
      const fromIdx = s.findIndex((sec) => sec.id === drag.sectionId);
      const toIdx = s.findIndex((sec) => sec.id === targetSectionId);
      if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return s;
      const item = s[fromIdx];
      const next = [...s];
      next.splice(fromIdx, 1);
      next.splice(toIdx, 0, item);
      return next;
    });
    setDrag(null);
    setDragOver(null);
  };

  return (
    <ScaledPage designHeight={1200} scrollable>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />
        <SubNav activeStep={3} completedUpTo={completedUpTo} onBack={onBack} onNext={onNext} onStepClick={onStepClick} nextLabel="Review &amp; Generate" />

        {/* Close menus on outside click */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => { setOpenMenu(null); }}
        >
          <div className="px-[80px] py-[48px] flex flex-col gap-[32px]">
            {/* Header */}
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-white font-semibold text-[24px] mb-[8px]">Pick your pages</h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500 }}>
                  Select pages and drag sections to reorder them
                </p>
              </div>
              <span className="font-semibold text-[13px]" style={{ color: "#6fccdd" }}>
                {pages.filter((p) => p.selected).length} of {pages.length} pages selected
              </span>
            </div>

            {/* Page cards grid */}
            <div className="grid grid-cols-3 gap-[20px]">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex flex-col gap-[16px] p-[20px]"
                  onClick={() => togglePage(page.id)}
                  style={{
                    backdropFilter: "blur(12px)",
                    background: page.selected ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                    borderRadius: 16,
                    border: page.selected ? "1px solid white" : "1px solid rgba(255,255,255,0.15)",
                    opacity: page.selected ? 1 : 0.5,
                    transition: "opacity 0.2s, border 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center justify-between pb-[16px]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="text-white font-semibold text-[18px] leading-[28px]">{page.name}</span>
                    {/* stopPropagation: card onClick already handles the toggle */}
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0"
                    >
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

                  {/* Sections list — drag-and-drop */}
                  <div className="flex flex-col gap-[4px]">
                    {page.sections.map((section) => {
                      const isMenuOpen = openMenu?.pageId === page.id && openMenu?.sectionId === section.id;
                      const isDragging = drag?.pageId === page.id && drag?.sectionId === section.id;
                      const isOver = dragOver?.pageId === page.id && dragOver?.sectionId === section.id;
                      const isRenaming = renaming?.pageId === page.id && renaming?.sectionId === section.id;

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
                            background: isOver
                              ? "rgba(111,204,221,0.1)"
                              : "rgba(255,255,255,0.04)",
                            border: isOver
                              ? "1px solid rgba(111,204,221,0.4)"
                              : "1px solid rgba(255,255,255,0.06)",
                            opacity: isDragging ? 0.4 : 1,
                            cursor: section.locked ? "default" : "grab",
                            transition: "background 0.15s, border 0.15s, opacity 0.15s",
                          }}
                        >
                          {/* Drag handle */}
                          {section.locked ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.25, flexShrink: 0 }}>
                              <path d="M4.5 6V4a2.5 2.5 0 015 0v2M2 6h10a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-5A.5.5 0 012 6z" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                              {[2, 6, 10].map((x) => [3, 7, 11].map((y) => (
                                <circle key={`${x}-${y}`} cx={x} cy={y} r={1} fill="white" />
                              )))}
                            </svg>
                          )}

                          {/* Section name — editable inline */}
                          {isRenaming ? (
                            <input
                              autoFocus
                              value={renaming.value}
                              onChange={(e) => setRenaming({ ...renaming, value: e.target.value })}
                              onBlur={commitRename}
                              onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setRenaming(null); }}
                              className="flex-1 bg-transparent outline-none font-medium text-[13px] text-white"
                              style={{ border: "none", padding: 0 }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <span
                              className="flex-1 font-medium text-[13px] truncate"
                              style={{ color: section.locked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)" }}
                            >
                              {section.name}
                            </span>
                          )}

                          {/* Lock badge */}
                          {section.locked && (
                            <span
                              className="font-semibold text-[10px] uppercase"
                              style={{ color: "#6fccdd", letterSpacing: "0.08em", flexShrink: 0 }}
                            >
                              locked
                            </span>
                          )}

                          {/* 3-dot menu */}
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
                                    width: 160,
                                    background: "#1a1a1a",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 10,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {[
                                    {
                                      label: "Rename",
                                      icon: "M11 2L13 4L5 12H3V10L11 2Z",
                                      action: () => { setRenaming({ pageId: page.id, sectionId: section.id, value: section.name }); setOpenMenu(null); },
                                    },
                                    {
                                      label: "Duplicate",
                                      icon: "M6 2H4a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1v-2M8 2h2a1 1 0 011 1v9a1 1 0 01-1 1H8",
                                      action: () => { duplicateSection(page.id, section.id); setOpenMenu(null); },
                                    },
                                    {
                                      label: "Delete",
                                      icon: "M3 4h9M5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M10 7v5M7 7v5M4 4l.6 8.1A1 1 0 005.6 13h3.8a1 1 0 001-.9L11 4",
                                      danger: true,
                                      action: () => { deleteSection(page.id, section.id); setOpenMenu(null); },
                                    },
                                  ].map(({ label, icon, action, danger }) => (
                                    <button
                                      key={label}
                                      onClick={action}
                                      className="flex items-center gap-[10px] px-[14px] py-[10px] font-medium text-[13px] text-left w-full"
                                      style={{
                                        color: danger ? "#f87171" : "rgba(255,255,255,0.8)",
                                        background: "transparent",
                                      }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = danger ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.06)")}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                        <path d={icon} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      {label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add section button */}
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setAddModal(addModal === page.id ? null : page.id); }}
                      className="flex items-center justify-center gap-[8px] py-[10px] rounded-[8px] font-semibold text-[13px] w-full transition-colors"
                      style={{
                        border: "1px dashed rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6fccdd"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(111,204,221,0.4)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Add section
                    </button>

                    {/* Add section dropdown */}
                    {addModal === page.id && (
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
                          {AVAILABLE_SECTIONS.filter(
                            (name) => !page.sections.some((s) => s.name === name)
                          ).map((name) => (
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
                  </div>
                </div>
              ))}
            </div>

            {/* JSON summary strip */}
            <div
              className="flex items-center justify-between px-[20px] py-[14px] rounded-[12px]"
              style={{ background: "rgba(111,204,221,0.05)", border: "1px solid rgba(111,204,221,0.15)" }}
            >
              <div>
                <p className="text-white font-semibold text-[14px]">
                  {pages.filter((p) => p.selected).length} pages · {pages.filter((p) => p.selected).reduce((n, p) => n + p.sections.length, 0)} sections
                </p>
                <p className="font-medium text-[12px] mt-[2px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {pages.filter((p) => p.selected).map((p) => p.name).join(", ")}
                </p>
              </div>
              <button
                onClick={onNext}
                className="font-semibold text-[14px] uppercase px-[24px] py-[12px] rounded-[8px]"
                style={{ background: "#6fccdd", color: "#0b0b0b" }}
              >
                Review &amp; Generate
              </button>
            </div>
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

function GeneratingPage({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onNext, 400);
          return 100;
        }
        setPhaseIndex(Math.floor((next / 100) * PHASES.length));
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <ScaledPage designHeight={900}>
      <div
        className="w-full h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />
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
            <h2 className="text-white font-semibold text-[24px]">Building your website</h2>
            <p
              className="font-medium text-[14px]"
              style={{ color: "rgba(255,255,255,0.5)", minHeight: 20 }}
            >
              {PHASES[Math.min(phaseIndex, PHASES.length - 1)]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col items-center gap-[12px]" style={{ width: 360 }}>
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
  { name: "Version 1 — Classic", subtitle: "Clean and structured" },
  { name: "Version 2 — Modern", subtitle: "Bold and contemporary" },
  { name: "Version 3 — Minimal", subtitle: "Simple and focused" },
];

function PreviewPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState(1);

  return (
    <ScaledPage designHeight={900} scrollable>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />

        {/* Completed steps bar */}
        <div
          className="flex items-center justify-center gap-[16px] px-[32px]"
          style={{
            height: 52,
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

        <div className="flex-1 px-[80px] py-[48px] flex flex-col gap-[32px]">
          <div className="flex flex-col items-center gap-[8px] text-center">
            <h2 className="text-white font-semibold text-[28px]">Choose Your Design</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, fontWeight: 500 }}>
              Select the version that best fits your vision
            </p>
          </div>

          {/* Version cards */}
          <div className="grid grid-cols-3 gap-[20px]">
            {VERSIONS.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="flex flex-col gap-[16px] p-[20px] text-left"
                style={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  border:
                    selected === i ? "1.5px solid #6fccdd" : "1px solid white",
                  height: 520,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-[15px]">{v.name}</div>
                    <div className="text-[12px] font-medium mt-[2px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {v.subtitle}
                    </div>
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
                  }}
                >
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
          <div className="flex justify-center">
            <button
              onClick={onNext}
              className="font-semibold text-[18px]"
              style={{
                background: "#6fccdd",
                color: "#090909",
                borderRadius: 8,
                padding: "16px 0",
                width: 360,
              }}
            >
              Confirm Selection
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

  return (
    <ScaledPage designHeight={1100} scrollable>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <TopHeader />

        <div className="flex-1 flex flex-col items-center px-[80px] py-[48px] gap-[32px]">
          {/* Success state */}
          <div className="flex flex-col items-center gap-[16px]">
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
            <h2 className="text-white font-semibold text-[24px]">Your website is ready!</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500 }}>
              Your AI-generated website is complete and ready to deploy.
            </p>
          </div>

          {/* Website Preview */}
          <div className="flex flex-col gap-[16px] w-full max-w-[680px]">
            <span
              className="font-semibold uppercase text-[12px]"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Website Preview
            </span>
            <div
              className="flex flex-col overflow-hidden"
              style={{
                height: 240,
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
          <div className="flex flex-col gap-[16px] w-full max-w-[680px]">
            <span
              className="font-semibold uppercase text-[12px]"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Next Actions
            </span>
            <div className="grid grid-cols-3 gap-[16px]">
              {/* Download HTML */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px]"
                style={{ background: "rgba(111,204,221,0.13)", border: "1px solid rgba(111,204,221,0.2)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d={p.pdba8e90}
                    stroke="#6fccdd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Download HTML</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Get your complete HTML files
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px]"
                  style={{ background: "#6fccdd", color: "#0b0b0b" }}
                >
                  Download HTML
                </button>
              </div>

              {/* Buy Domain */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d={p.p163a41e0}
                    stroke="#6fccdd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Buy a Domain</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Connect your custom domain
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                >
                  Buy a Domain
                </button>
              </div>

              {/* Deploy */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d={p.p3d0d0400}
                    stroke="#6fccdd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-white font-semibold text-[14px]">Deploy to Domain</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Requires a connected domain
                  </div>
                </div>
                <button
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                >
                  Deploy Now
                </button>
              </div>
            </div>

            <button
              onClick={onBack}
              className="font-medium text-[13px] text-center mt-[8px]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              ← Start over
            </button>
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
    <div style={{ minHeight: "100vh", background: "#0b0b0b" }}>
      {page === "login" && <LoginPage onNext={goNext} />}
      {page === "otp" && <OtpPage onNext={goNext} onBack={goBack} />}
      {page === "questionnaire" && <QuestionnairePage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
      {page === "category-mood" && <CategoryMoodPage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
      {page === "colors" && <ColorsFontsPage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
      {page === "pick-pages" && <PickPagesPage onNext={goNext} onBack={goBack} onStepClick={goToStep} completedUpTo={completedUpTo} />}
      {page === "generating" && <GeneratingPage onNext={goNext} />}
      {page === "preview" && <PreviewPage onNext={goNext} onBack={goBack} />}
      {page === "download" && <DownloadPage onBack={() => go("login")} />}
    </div>
  );
}
