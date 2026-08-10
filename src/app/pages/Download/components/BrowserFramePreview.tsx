import { RotateCw } from "lucide-react";

/**
 * Fake browser chrome around the generated site. The wireframe underneath shows
 * through until the iframe paints, so the panel is never blank.
 */
export function BrowserFramePreview({ previewUrl, webUrl }: {
  previewUrl: string | null;
  webUrl: string | null;
}) {
  return (
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
            {webUrl ?? "Generated website"}
          </span>
        </div>
        <RotateCw size={14} color="rgba(255,255,255,0.3)" strokeWidth={1.3} aria-hidden="true" />
      </div>

      {/* Preview content */}
      <div className="flex-1 flex flex-col relative" style={{ background: "#111" }}>
        {previewUrl && (
          <iframe
            src={previewUrl}
            title="Generated website preview"
            // Matches the mockup preview. Generated pages may need scripts;
            // everything else (top-level navigation, popups, form submission)
            // stays blocked. Verify a real completed build still renders if
            // the generator starts emitting richer output.
            sandbox="allow-scripts"
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
  );
}
