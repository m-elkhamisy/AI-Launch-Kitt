import { ValidationError } from "@/app/components/common/ValidationError";
import { derivePaletteFromPrimary, parseHexChannels } from "@/app/lib/colors";
import { customPaletteSchema } from "@/app/wizard-validation";
import type { CustomPalette } from "./types";

/**
 * Four-swatch palette editor. The draft and the "specific colors" toggle stay
 * owned by the page so they survive cancelling and reopening, which is how this
 * behaved while it was inline.
 */
export function CustomPaletteModal({
  draft,
  onDraftChange,
  specificColors,
  onSpecificColorsChange,
  error,
  onError,
  onCancel,
  onApply,
}: {
  draft: CustomPalette;
  onDraftChange: (update: (draft: CustomPalette) => CustomPalette) => void;
  specificColors: boolean;
  onSpecificColorsChange: (next: boolean) => void;
  error?: string;
  onError: (message: string) => void;
  onCancel: () => void;
  onApply: (palette: CustomPalette) => void;
}) {
  return (
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999 }}
            onClick={() => onCancel()}
          >
            <div
              className="flex flex-col gap-[24px] p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[420px] max-h-[90vh] overflow-y-auto"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, fontFamily: "'Montserrat',sans-serif" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-[17px]">Custom Palette</span>
                <button onClick={() => onCancel()} style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-[10px]" style={{ cursor: "pointer" }}>
                <div
                  onClick={() => {
                    const next = !specificColors;
                    onSpecificColorsChange(next);
                    if (!next) {
                      // Regenerate derived colors from current primary
                      const channels = parseHexChannels(draft.primary);
                      if (channels) {
                        const derived = derivePaletteFromPrimary(channels.r, channels.g, channels.b);
                        onDraftChange(d => ({ ...d, ...derived }));
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
                          background: draft[field] || "#333",
                          border: "1px solid rgba(255,255,255,0.15)",
                          cursor: disabled ? "not-allowed" : "pointer",
                        }}
                      />
                      {!disabled && (
                        <input
                          type="color"
                          value={draft[field] || "#333333"}
                          onChange={(e) => {
                            const val = e.target.value;
                            const channels = field === "primary" && !specificColors
                              ? parseHexChannels(val)
                              : null;
                            if (channels) {
                              const derived = derivePaletteFromPrimary(channels.r, channels.g, channels.b);
                              onDraftChange(d => ({ ...d, primary: val, ...derived }));
                            } else {
                              onDraftChange(d => ({ ...d, [field]: val }));
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
                        value={draft[field]}
                        disabled={disabled}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (field === "primary" && !specificColors) {
                            const channels = parseHexChannels(val);
                            if (channels) {
                              const derived = derivePaletteFromPrimary(channels.r, channels.g, channels.b);
                              onDraftChange(d => ({ ...d, primary: val, ...derived }));
                            } else {
                              onDraftChange(d => ({ ...d, primary: val }));
                            }
                          } else {
                            onDraftChange(d => ({ ...d, [field]: val }));
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

              <ValidationError message={error} />
              <div className="flex gap-[12px]">
                <button
                  onClick={() => onCancel()}
                  className="flex-1 font-semibold text-[14px]"
                  style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const validation = customPaletteSchema.safeParse(draft);
                    if (!validation.success) {
                      onError(validation.error.issues[0]?.message ?? "Complete the custom palette.");
                      return;
                    }
                    onApply(validation.data);
                  }}
                  className="flex-1 font-semibold text-[14px]"
                  style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
  );
}
