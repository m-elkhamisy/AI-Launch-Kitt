// Parked: the email/access-code sign-in screen.
//
// Sign-in now goes through Innovation City OAuth, so nothing renders this and
// it is deliberately left with no importer. Kept because the backend still
// supports a fixed email/code mode for restricted staging (see README.md) —
// re-enabling it is a routing change, not a rewrite. Its smoke test keeps it
// compiling and rendering.
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LogoSvg } from "../../components/common/LogoSvg";
import { LOGO_GLYPH } from "../../components/common/logo-paths";
import { ScaledPage } from "../../components/common/ScaledPage";
import { ValidationError } from "../../components/common/ValidationError";
import { otpSchema, OtpValues } from "../../wizard-validation";

export function OtpPage({
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
                  <path d={LOGO_GLYPH.pdbfe710} fill="#5752A3" />
                  <path d={LOGO_GLYPH.p389a4180} fill="#5752A3" />
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
