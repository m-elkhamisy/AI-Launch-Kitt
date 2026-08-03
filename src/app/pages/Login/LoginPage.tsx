import { ArrowRight } from "lucide-react";

import { LogoSvg } from "../../components/common/LogoSvg";
import { LOGO_GLYPH } from "../../components/common/logo-paths";
import { ScaledPage } from "../../components/common/ScaledPage";

export function LoginPage({
  onNext,
  busy = false,
}: {
  onNext: () => void | Promise<void>;
  busy?: boolean;
}) {

  return (
    <ScaledPage
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
                  <path d={LOGO_GLYPH.pdbfe710} fill="#5752A3" />
                  <path d={LOGO_GLYPH.p389a4180} fill="#5752A3" />
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
              <ArrowRight size={16} color="#0b0b0b" strokeWidth={2} aria-hidden="true" />
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
