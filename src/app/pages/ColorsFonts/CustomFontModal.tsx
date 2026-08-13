import { ValidationError } from "@/app/components/common/ValidationError";
import { GOOGLE_FONTS_LIST } from "@/app/data/google-fonts";
import { loadGoogleFont } from "@/app/lib/fonts";
import { customFontsSchema } from "@/app/wizard-validation";

/** Heading/body font picker with a live preview, searching the Google Fonts list. */
export function CustomFontModal({
  draft,
  onDraftChange,
  headingSearch,
  onHeadingSearchChange,
  bodySearch,
  onBodySearchChange,
  error,
  onError,
  onCancel,
  onApply,
}: {
  draft: { heading: string; body: string };
  onDraftChange: (update: (draft: { heading: string; body: string }) => { heading: string; body: string }) => void;
  headingSearch: string;
  onHeadingSearchChange: (value: string) => void;
  bodySearch: string;
  onBodySearchChange: (value: string) => void;
  error?: string;
  onError: (message: string) => void;
  onCancel: () => void;
  onApply: (fonts: { heading: string; body: string }) => void;
}) {
  return (
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999 }}
            onClick={() => onCancel()}
          >
            <div
              className="flex flex-col gap-[24px] p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[480px] max-h-[90vh] overflow-y-auto"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, fontFamily: "'Montserrat',sans-serif" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-[17px]">Custom Font Pairing</span>
                <button onClick={() => onCancel()} style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
              </div>

              {/* Heading font picker */}
              {[
                { label: "Heading Font", searchVal: headingSearch, setSearch: onHeadingSearchChange, field: "heading" as const },
                { label: "Body Font",    searchVal: bodySearch,    setSearch: onBodySearchChange,    field: "body" as const },
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
                            onClick={() => { onDraftChange(d => ({ ...d, [field]: font })); setSearch(font); loadGoogleFont(font); }}
                            style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", background: "none", border: "none", color: draft[field] === font ? "#6FCCDD" : "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer", fontFamily: `'${font}', sans-serif` }}
                          >
                            {font}
                          </button>
                        ))}
                      </div>
                    )}
                    {draft[field] && (
                      <span style={{ fontSize: 11, color: "#6FCCDD", fontWeight: 600 }}>Selected: {draft[field]}</span>
                    )}
                  </div>
                );
              })}

              {/* Live preview */}
              {(draft.heading || draft.body) && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Montserrat',sans-serif" }}>Preview</p>
                  {draft.heading && <p style={{ fontFamily: `'${draft.heading}', serif`, fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>The Quick Brown Fox</p>}
                  {draft.body && <p style={{ fontFamily: `'${draft.body}', sans-serif`, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Jumps over the lazy dog. Clear, readable body copy for the web.</p>}
                </div>
              )}

              <ValidationError message={error} />
              <div className="flex gap-[12px]">
                <button onClick={() => onCancel()} className="flex-1 font-semibold text-[14px]" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer" }}>Cancel</button>
                <button
                  onClick={() => {
                    const validation = customFontsSchema.safeParse(draft);
                    if (!validation.success) {
                      onError(validation.error.issues[0]?.message ?? "Choose both fonts.");
                      return;
                    }
                    onApply(validation.data);
                  }}
                  className="flex-1 font-semibold text-[14px]"
                  style={{ background: "#6FCCDD", color: "#0b0b0b", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", opacity: draft.heading && draft.body ? 1 : 0.5 }}
                >Apply</button>
              </div>
            </div>
          </div>
  );
}
