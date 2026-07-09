import { OnboardingFormData } from "./form";
import { DesignPrefs } from "./design";

/** The three generation modes — this is the single choice that replaced the
 * old "Haseeb engine vs Karim engine" split. It now applies uniformly to
 * one multi-page pipeline instead of picking between two different apps. */
export type GenerationProvider = "v0" | "claude" | "both";

export interface PlannedPageImage {
  section: string;
  desc: string;
}

/** One page in the plan. Names/count/sections are chosen by the model per
 * business (a bakery gets "Menu"; a law firm gets "Practice Areas") instead
 * of a hardcoded 7-page list. */
export interface PlannedPage {
  name: string;
  slug: string;
  isHome: boolean;
  purpose: string;
  sections: string[];
  images: PlannedPageImage[];
}

export interface SitePlan {
  pages: PlannedPage[];
  /** Human-readable rendering used by PlanReview and fed back in as context
   * when the user asks for revisions. */
  raw: string;
}

/** How many design mockups to generate for the customer to pick from.
 * Reduced from 5 to 3: three visually-distinct directions still give a real
 * choice, while cutting mockup-step latency, token spend, and the size of
 * the parallel burst that was the most 429-prone moment of the pipeline.
 * Lives here (not in the server pipeline) so the wizard button copy and the
 * server-side generation count can never drift apart. */
export const MOCKUP_COUNT = 3;

export interface MockupDesign {
  id: number;
  label: string;
  direction: string;
  html: string;
}

export interface SiteCopy {
  headline: string;
  subheadline: string;
  sections: { heading: string; body: string }[];
  callToAction: string;
}

export interface BuiltPage {
  name: string;
  slug: string;
  filename: string;
  html: string;
}

export interface V0Result {
  chatId: string;
  webUrl: string;
  demoUrl: string | null;
  status: "pending" | "completed" | "failed";
  fileCount: number;
}

export interface PipelineResult {
  provider: GenerationProvider;
  /** Empty when provider === "v0" (v0 owns its own file structure). */
  pages: BuiltPage[];
  siteCopy: SiteCopy | null;
  v0: V0Result | null;
  warnings: string[];
}

// ---------------------------------------------------------------------------
// Company-profile upload (PDF / DOCX / TXT / MD -> prefilled brief + photos)
// ---------------------------------------------------------------------------

export interface ExtractedImage {
  filename: string;
  label: string;
  /** base64 data: URI — embedded directly into generated HTML/JSX, no
   * separate file hosting needed. */
  dataUrl: string;
}

export interface ProfileExtractionResult {
  fields: Partial<OnboardingFormData>;
  designHints: Partial<Pick<DesignPrefs, "tagline" | "cta">>;
  images: ExtractedImage[];
  sourceFilename: string;
  warnings: string[];
}

// ---------------------------------------------------------------------------
// Wizard steps
// ---------------------------------------------------------------------------

export type WizardStep =
  | "intake"
  | "design"
  | "mockups"
  | "plan"
  | "building"
  | "results";

export const STEP_ORDER: WizardStep[] = [
  "intake",
  "design",
  "mockups",
  "plan",
  "building",
  "results",
];

// ---------------------------------------------------------------------------
// API request / response bodies
// ---------------------------------------------------------------------------

export interface MockupsRequestBody {
  form: OnboardingFormData;
  design: DesignPrefs;
}
export interface MockupsResponseBody {
  mockups: MockupDesign[];
}

export interface PlanRequestBody {
  form: OnboardingFormData;
  design: DesignPrefs;
  chosenMockupHtml: string;
  feedback?: string;
  previousPlan?: SitePlan;
}
export interface PlanResponseBody {
  plan: SitePlan;
}

export interface BuildRequestBody {
  form: OnboardingFormData;
  design: DesignPrefs;
  provider: GenerationProvider;
  chosenMockupHtml: string;
  plan: SitePlan;
  uploadedImages: ExtractedImage[];
}
export type BuildResponseBody = PipelineResult;

export interface ZipRequestBody {
  companyName: string;
  pages: BuiltPage[];
}
