// ─── Backend API client ───────────────────────────────────────────────────────
// Implements the frontend↔backend contract (see API_CONTRACT.md).
// Base URL comes from VITE_API_BASE (frontend .env); defaults to local dev.

const BASE: string =
  (import.meta as any).env?.VITE_API_BASE ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  detail: any;
  constructor(status: number, detail: any) {
    super(typeof detail === "string" ? detail : JSON.stringify(detail));
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      credentials: "include",
      ...init,
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server — is the backend running?");
  }
  let body: any = null;
  try {
    body = await res.json();
  } catch {
    /* non-JSON (shouldn't happen on JSON endpoints) */
  }
  if (!res.ok) throw new ApiError(res.status, body?.detail ?? body ?? res.statusText);
  return body as T;
}

// ── Types (contract shapes) ──────────────────────────────────────────────────

export type ExtractedFields = {
  name: string; industry: string; tagline: string; description: string;
  unique_selling_point: string; services: string[]; audience: string; tone: string;
  cta_text: string; location: string; website: string;
  contact_email: string; contact_phone: string; extra_context: string;
};

export type SubmitResponse = {
  id: string;
  accepted: boolean;
  reason: string;
  normalized: Record<string, any>;
  status: string;
};

export type PreviewVersion = {
  version: number;
  label?: string;
  chatId: string;
  status: "pending" | "completed" | "failed";
  demoUrl: string | null;
  webUrl?: string | null;
};

export type PreviewsResponse = {
  id: string;
  status: string;
  versions: PreviewVersion[];
};

export type BuildStatus = {
  status: "pending" | "completed" | "failed";
  webUrl: string | null;
  demoUrl: string | null;
  files: string[];
  note?: string;
};

export type ClaimDeployResponse = {
  status: string;
  chatId: string;
  projectId: string;
  deploymentId: string;
  liveUrl: string | null;
  claimUrl: string;
  claimExpires: string;
  note: string;
};

// ── Endpoints ────────────────────────────────────────────────────────────────

/** Screen 3 — upload a PDF, get pre-filled business fields back. */
export async function extractPdf(file: File): Promise<{ fields: ExtractedFields }> {
  const fd = new FormData();
  fd.append("file", file);
  return request(`/extract`, { method: "POST", body: fd });
}

/** Store the submission (guardrail → raw+normalized). build:false — previews come next. */
export async function submit(data: Record<string, any>): Promise<SubmitResponse> {
  return request(`/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, build: false }),
  });
}

/** Screen 7 phase 1 — kick off the 3 homepage preview builds. */
export async function createPreviews(companyId: string): Promise<PreviewsResponse> {
  return request(`/companies/${encodeURIComponent(companyId)}/previews`, { method: "POST" });
}

/** Screen 7 phase 1 — poll the 3 previews. */
export async function getPreviews(companyId: string): Promise<PreviewsResponse> {
  return request(`/companies/${encodeURIComponent(companyId)}/previews`);
}

/** Screen 7 phase 2 — expand the chosen version into the full site. */
export async function selectVersion(
  companyId: string,
  version: number,
): Promise<{ chatId: string; webUrl: string | null; status: string; poll: string }> {
  return request(`/companies/${encodeURIComponent(companyId)}/select-version`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ version }),
  });
}

/** Poll the full-site build. */
export async function getBuild(chatId: string): Promise<BuildStatus> {
  return request(`/builds/${encodeURIComponent(chatId)}`);
}

/** Screen 8 — direct download URL for the generated source zip (use as href). */
export function downloadUrl(chatId: string): string {
  return `${BASE}/builds/${encodeURIComponent(chatId)}/download`;
}

/** Screen 8 — deploy under the platform account and mint a 24h claim link. */
export async function claimDeploy(chatId: string): Promise<ClaimDeployResponse> {
  return request(`/builds/${encodeURIComponent(chatId)}/claim-deploy`, { method: "POST" });
}

// ── Client documents (brochure / portfolio PDFs) ─────────────────────────────

export type DocumentsStatus = {
  id: string;
  documents: Record<"brochure" | "portfolio", { ready: boolean; path: string }>;
};

/** Generate both PDFs (idempotent — re-calls return the existing set). */
export async function generateDocuments(companyId: string): Promise<{
  id: string; status: string; regenerated: boolean;
  documents: Record<string, string>;
}> {
  return request(`/companies/${encodeURIComponent(companyId)}/documents`, { method: "POST" });
}

/** Direct inline-PDF URL for viewing/downloading one document. */
export function documentUrl(companyId: string, kind: "brochure" | "portfolio"): string {
  return `${BASE}/companies/${encodeURIComponent(companyId)}/documents/${kind}`;
}
