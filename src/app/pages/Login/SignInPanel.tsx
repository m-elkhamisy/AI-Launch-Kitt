import { ArrowRight } from "lucide-react";

import { LogoMark } from "@/app/components/common/LogoMark";

// The left column of the welcome screen. Behaviour is carried over unchanged from
// the previous single-card LoginPage: one button, disabled while redirecting.
//
// Figma draws an email plus one-time-code form here. That is deliberately not
// built — sign-in is Innovation City OAuth (see spec.md, Out of Scope).
export function SignInPanel({
  onNext,
  busy,
}: {
  onNext: () => void | Promise<void>;
  busy: boolean;
}) {
  return (
    <div className="flex w-full flex-1 items-center justify-center px-5 py-10 sm:px-6">
      <div className="flex w-full max-w-[407px] flex-col items-center gap-[28px]">
        <div className="flex w-full flex-col items-center gap-[16px]">
          <LogoMark />
          <div className="text-center">
            <h1 className="mb-[8px] font-semibold text-white" style={{ fontSize: 28, lineHeight: "40px" }}>
              Welcome To Launch Kit
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>
              Sign in with your Innovation City account to continue
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", width: "100%" }} />

        <button
          type="button"
          disabled={busy}
          onClick={() => void onNext()}
          className="flex w-full items-center justify-center gap-[8px] text-[14px] font-semibold uppercase"
          style={{
            background: "#6fccdd",
            color: "#0b0b0b",
            borderRadius: 12,
            padding: "16px 0",
          }}
        >
          {busy ? "Redirecting..." : "Continue with Innovation City"}
          <ArrowRight size={16} color="#0b0b0b" strokeWidth={2} aria-hidden="true" />
        </button>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500, textAlign: "center" }}>
          You will be redirected to the secure Innovation City login.
        </p>
      </div>
    </div>
  );
}
