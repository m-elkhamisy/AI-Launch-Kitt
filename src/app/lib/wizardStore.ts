// ─── Wizard store ─────────────────────────────────────────────────────────────
// Each wizard page keeps its own local state; this module is the shared bag they
// save into (persisted to localStorage) so the Generating step can assemble the
// full submission. Pages hydrate from it on mount, write to it on "next".

export type PaletteChoice = {
  name: string;      // preset name or "Custom"
  primary: string; secondary: string; background: string; text: string;
};
export type FontChoice = { name: string; heading: string; body: string };
export type PageChoice = { name: string; sections: string[] };

export type PreviewVersionSlice = {
  version: number;
  label?: string;
  chatId: string;
  status: string;
  demoUrl: string | null;
};

export type WizardState = {
  // screen 3
  form: {
    companyName: string; uniqueness: string; customers: string;
    tagline: string; cta: string; anythingElse: string;
  };
  // extras that only arrive via PDF extraction (no UI fields for these)
  extracted: {
    industry?: string; description?: string; services?: string[]; tone?: string;
    location?: string; website?: string; contact_email?: string; contact_phone?: string;
  };
  // screen 4
  category: string;
  mood: string;
  themeMode: string;          // "Light" | "Dark" | "Both"
  animLevel: number;          // 0..3 → minimal/low/balanced/high
  // screen 5
  palette: PaletteChoice | null;
  font: FontChoice | null;
  // screen 6
  pages: PageChoice[];
  // pipeline state
  companyId: string | null;
  previews: PreviewVersionSlice[];
  selectedVersion: number | null;   // 1-based
  finalChatId: string | null;
  lastSubmittedData: string | null;  // JSON of the last inputs a pipeline ran with
};

const KEY = "ailk_wizard";

const DEFAULTS: WizardState = {
  form: { companyName: "", uniqueness: "", customers: "", tagline: "", cta: "", anythingElse: "" },
  extracted: {},
  category: "Tech / SaaS",
  mood: "Dark & Modern",
  themeMode: "",   // selector removed in current design; omitted from submission when empty
  animLevel: 2,
  palette: null,
  font: null,
  pages: [],
  companyId: null,
  previews: [],
  selectedVersion: null,
  finalChatId: null,
  lastSubmittedData: null,
};

export function loadWizard(): WizardState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveWizard(patch: Partial<WizardState>): WizardState {
  const next = { ...loadWizard(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full/blocked — keep going in-memory */
  }
  return next;
}

export function resetWizardPipeline(): void {
  saveWizard({ companyId: null, previews: [], selectedVersion: null, finalChatId: null });
}

const ANIM_VALUES = ["minimal", "low", "balanced", "high"] as const;

/** Assemble the exact `data` object POST /submit expects (see API_CONTRACT.md). */
export function buildSubmissionData(): Record<string, any> {
  const w = loadWizard();
  const data: Record<string, any> = {
    name: w.form.companyName,
    unique_selling_point: w.form.uniqueness,
    audience: w.form.customers,
    tagline: w.form.tagline,
    cta_text: w.form.cta,
    extra_context: w.form.anythingElse,
    business_category: w.category,
    design_mood: w.mood,
    animation_level: ANIM_VALUES[Math.max(0, Math.min(3, w.animLevel))],
  };
  if (w.themeMode) {
    data.theme_mode = w.themeMode === "Both" ? "both" : w.themeMode.toLowerCase();
  }
  if (w.palette) {
    data.colorway =
      `${w.palette.name}: primary ${w.palette.primary}, secondary ${w.palette.secondary}, ` +
      `background ${w.palette.background}, text ${w.palette.text}`;
  }
  if (w.font) data.font_pairing = `${w.font.heading} + ${w.font.body}`;
  if (w.pages.length) data.pages = w.pages;

  // PDF-extracted extras (no UI fields — pass through when present)
  const x = w.extracted || {};
  if (x.industry) data.industry = x.industry;
  if (x.description) data.description = x.description;
  if (x.services?.length) data.services = x.services;
  if (x.tone) data.tone = x.tone;
  if (x.location) data.location = x.location;
  if (x.website) data.website = x.website;
  if (x.contact_email) data.email = x.contact_email;
  if (x.contact_phone) data.phone = x.contact_phone;

  return data;
}
