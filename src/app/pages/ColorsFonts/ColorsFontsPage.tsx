import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ScaledPage } from "../../components/common/ScaledPage";
import { SubNav } from "../../components/common/SubNav";
import { TopHeader } from "../../components/common/TopHeader";
import { firstValidationError, ValidationError } from "../../components/common/ValidationError";
import { GOOGLE_FONTS_LIST } from "../../data/google-fonts";
import { ProjectView, WizardCatalog } from "../../launchkit-api";
import { derivePaletteFromPrimary, parseHexChannels } from "../../lib/colors";
import { loadGoogleFont } from "../../lib/fonts";
import { colorFontSchema, ColorFontValues, customFontsSchema, customPaletteSchema } from "../../wizard-validation";
import { FontCard } from "./FontCard";
import { CustomPalette, FontPair, PaletteEntry } from "./types";

export function ColorsFontsPage({ project, catalog, onSave, onBack, onStepClick, completedUpTo, busy }: {
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
                          const channels = parseHexChannels(customDraft.primary);
                          if (channels) {
                            const derived = derivePaletteFromPrimary(channels.r, channels.g, channels.b);
                            setCustomDraft(d => ({ ...d, ...derived }));
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
                                const channels = field === "primary" && !specificColors
                                  ? parseHexChannels(val)
                                  : null;
                                if (channels) {
                                  const derived = derivePaletteFromPrimary(channels.r, channels.g, channels.b);
                                  setCustomDraft(d => ({ ...d, primary: val, ...derived }));
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
                                const channels = parseHexChannels(val);
                                if (channels) {
                                  const derived = derivePaletteFromPrimary(channels.r, channels.g, channels.b);
                                  setCustomDraft(d => ({ ...d, primary: val, ...derived }));
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
