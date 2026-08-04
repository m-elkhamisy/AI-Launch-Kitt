import { useState } from "react";
import { CircleHelp } from "lucide-react";

/** Explains what "Deploy to Domain" does. Opens on hover and on click, for touch. */
export function DeployTooltip() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", width: 16, height: 16, fontSize: 0 }}
        aria-label="Vercel deployment information"
      >
        ⓘ
      </button>
      <CircleHelp size={16} aria-hidden="true" style={{ position: "absolute", inset: 0, color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
      {open && (
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
  );
}
