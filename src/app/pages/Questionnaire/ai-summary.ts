// AI Summary draft built from extraction results; shared by the modal and the
// session hook that applies the draft back onto the project.
import type { AssetView } from "../../launchkit-api";

export const MAX_BRAND_DOCUMENTS = 5;

export type AiSummaryDraft = {
  companyOverview: string;
  targetAudience: string;
  services: string;
  brandTone: string;
  mainCta: string;
};

export type AiSummaryFieldKey = keyof AiSummaryDraft;

export const AI_SUMMARY_FIELDS: Array<{
  key: AiSummaryFieldKey;
  label: string;
  hint: string;
}> = [
  {
    key: "companyOverview",
    label: "Company Overview",
    hint: "Mission, vision, and core description",
  },
  {
    key: "targetAudience",
    label: "Target Audience",
    hint: "Who you serve",
  },
  {
    key: "services",
    label: "Services & Solutions",
    hint: "What you offer",
  },
  {
    key: "brandTone",
    label: "Brand Tone & Messaging",
    hint: "Your communication style",
  },
  {
    key: "mainCta",
    label: "Main Call-to-Action",
    hint: "Primary user action",
  },
];

export function pickExtracted(...values: Array<string | undefined | null>): string {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return "";
}

export function buildAiSummaryDraft(
  extracted: Record<string, string>,
  design?: { tagline: string; cta: string },
  business?: { targetAudience: string; uvp: string; notes: string; industry: string },
): AiSummaryDraft {
  return {
    companyOverview: pickExtracted(
      extracted.description,
      extracted.uvp,
      extracted.purpose,
      extracted.notes,
      business?.uvp,
      business?.notes,
    ),
    targetAudience: pickExtracted(extracted.targetAudience, business?.targetAudience),
    services: pickExtracted(
      extracted.products,
      extracted.businessActivity,
      extracted.services,
      business?.industry,
    ),
    brandTone: pickExtracted(extracted.tone, extracted.aesthetic),
    mainCta: pickExtracted(extracted.cta, design?.cta, extracted.tagline, design?.tagline),
  };
}

export function summaryCoverage(draft: AiSummaryDraft): number {
  const filled = AI_SUMMARY_FIELDS.filter((field) => draft[field.key].trim()).length;
  return Math.round((filled / AI_SUMMARY_FIELDS.length) * 100);
}

export function isLogoAsset(asset: AssetView): boolean {
  return asset.kind === "profile_image" && asset.label.toLowerCase().includes("logo");
}

export function isDocumentAsset(asset: AssetView): boolean {
  return asset.kind === "profile_source";
}
