export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000")
  .replace(/\/$/, "");

const API_ROOT = `${API_BASE_URL}/api/v1`;
const AUTH_TOKEN_KEY = "ailk_accessToken";

export type AuthTokenView = {
  accessToken: string;
  tokenType: "bearer";
  expiresInSeconds: number;
};

export type Choice = { id: string; label: string; description: string };
export type PaletteChoice = {
  id: string;
  label: string;
  colors: { primary: string; secondary: string; background: string; text: string } | null;
};
export type FontChoice = {
  id: string;
  label: string;
  fonts: { heading: string; body: string } | null;
};
export type SectionCatalogItem = { id: string; label: string; locked: boolean };
export type PageCatalogItem = {
  id: string;
  label: string;
  slug: string;
  sectionTemplateIds: string[];
  selectedByDefault: boolean;
};
export type WizardCatalog = {
  businessCategories: Choice[];
  designMoods: Choice[];
  animationLevels: Choice[];
  themeModes: Choice[];
  palettes: PaletteChoice[];
  fontPairings: FontChoice[];
  pageTemplates: PageCatalogItem[];
  sectionTemplates: SectionCatalogItem[];
};

export type BusinessDraft = {
  companyName: string;
  industry: string;
  services: string[];
  uvp: string;
  targetAudience: string;
  notes: string;
  categoryId: string;
};
export type DesignDraft = {
  tagline: string;
  cta: string;
  moodId: string;
  animationId: string;
  themeId: string;
  imageSource: string;
  paletteId: string;
  customPalette: { primary: string; secondary: string; background: string; text: string } | null;
  fontPairingId: string;
  customFonts: { heading: string; body: string } | null;
};
export type SectionDraft = {
  id: string;
  templateId: string;
  name: string;
  locked: boolean;
};
export type PageDraft = {
  id: string;
  templateId: string;
  name: string;
  slug: string;
  sections: SectionDraft[];
};
export type PageLayout = { pages: PageDraft[] };
export type AssetView = {
  id: string;
  kind: string;
  filename: string;
  label: string;
  contentType: string;
  size: number;
  previewUrl: string;
};
export type MockupView = {
  id: string;
  generation: number;
  ordinal: number;
  label: string;
  direction: string;
  previewUrl: string;
  createdAt: string;
};
export type ProjectView = {
  id: string;
  status: string;
  business: BusinessDraft;
  design: DesignDraft;
  pageLayout: PageLayout;
  extractedProfileFields: Record<string, string>;
  uploadedAssets: AssetView[];
  mockups: MockupView[];
  selectedMockupId: string | null;
  latestBuildId: string | null;
  latestDeploymentId: string | null;
  createdAt: string;
  updatedAt: string;
};
export type OperationView = {
  id: string;
  projectId: string | null;
  kind: string;
  status: "queued" | "running" | "completed" | "failed";
  result: Record<string, unknown>;
  errorCode: string | null;
  errorMessage: string | null;
};
export type BuildView = {
  id: string;
  projectId: string;
  provider: string;
  status: "queued" | "submitting" | "running" | "processing_result" | "completed" | "failed" | "cancelled" | "timed_out";
  stage: string;
  message: string;
  warnings: string[];
  previewUrl: string | null;
  webUrl: string | null;
  downloadUrl: string | null;
  retryAfterSeconds: number | null;
};
export type DeploymentView = {
  id: string;
  buildId: string;
  status: "queued" | "creating" | "building" | "ready_to_claim" | "completed" | "failed" | "cancelled";
  liveUrl: string | null;
  claimUrl: string | null;
  claimExpiresAt: string | null;
  message: string;
  retryAfterSeconds: number | null;
};

type ApiErrorEnvelope = {
  error?: { code?: string; message?: string; requestId?: string };
};

export class LaunchKitApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code = "request_failed",
    readonly requestId?: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (init?.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${API_ROOT}${path}`, { ...init, headers });
  if (!response.ok) {
    let envelope: ApiErrorEnvelope = {};
    try {
      envelope = await response.json() as ApiErrorEnvelope;
    } catch {
      // The public fallback deliberately omits raw response content.
    }
    throw new LaunchKitApiError(
      envelope.error?.message ?? "The request could not be completed.",
      response.status,
      envelope.error?.code,
      envelope.error?.requestId,
    );
  }
  return await response.json() as T;
}

export function absoluteApiUrl(path: string | null): string | null {
  if (!path) return null;
  return /^https?:\/\//.test(path) ? path : `${API_BASE_URL}${path}`;
}

export function createIdempotencyKey(scope: string): string {
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  return `${scope}-${id}`;
}

export function hasAccessToken(): boolean {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
}

export function setAccessToken(accessToken: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
}

export function clearAccessToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export const launchKitApi = {
  requestAccessCode: (email: string) =>
    request<{ status: string }>("/auth/request-code", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  verifyAccessCode: (email: string, code: string) =>
    request<AuthTokenView>("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }),
  getCatalog: () => request<WizardCatalog>("/catalogs/wizard"),
  createProject: () => request<ProjectView>("/projects", { method: "POST", body: "{}" }),
  getProject: (projectId: string) => request<ProjectView>(`/projects/${projectId}`),
  patchProject: (projectId: string, patch: Record<string, unknown>) =>
    request<ProjectView>(`/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  uploadProfile: (projectId: string, file: File) => {
    const body = new FormData();
    body.append("profile", file);
    return request<OperationView>(`/projects/${projectId}/profile-extractions`, {
      method: "POST",
      body,
    });
  },
  getOperation: (operationId: string) => request<OperationView>(`/operations/${operationId}`),
  createMockups: (projectId: string, idempotencyKey: string) =>
    request<OperationView>(`/projects/${projectId}/mockups`, {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey },
      body: "{}",
    }),
  getMockups: (projectId: string) =>
    request<MockupView[]>(`/projects/${projectId}/mockups`),
  selectMockup: (projectId: string, mockupId: string) =>
    request<MockupView>(`/projects/${projectId}/selected-mockup`, {
      method: "PUT",
      body: JSON.stringify({ mockupId }),
    }),
  createBuild: (projectId: string, idempotencyKey: string) =>
    request<BuildView>(`/projects/${projectId}/builds`, {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey },
      body: "{}",
    }),
  getBuild: (buildId: string) => request<BuildView>(`/builds/${buildId}`),
  createDeployment: (buildId: string, idempotencyKey: string) =>
    request<DeploymentView>(`/builds/${buildId}/deployments`, {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey },
      body: "{}",
    }),
  getDeployment: (deploymentId: string) =>
    request<DeploymentView>(`/deployments/${deploymentId}`),
};

export async function waitForOperation(
  operationId: string,
  onUpdate: (operation: OperationView) => void,
): Promise<OperationView> {
  for (;;) {
    const operation = await launchKitApi.getOperation(operationId);
    onUpdate(operation);
    if (operation.status === "completed") return operation;
    if (operation.status === "failed") {
      throw new LaunchKitApiError(
        operation.errorMessage ?? "The background operation failed.",
        409,
        operation.errorCode ?? "operation_failed",
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
}

export async function waitForDeployment(
  deploymentId: string,
  onUpdate: (deployment: DeploymentView) => void,
): Promise<DeploymentView> {
  for (;;) {
    const deployment = await launchKitApi.getDeployment(deploymentId);
    onUpdate(deployment);
    if (["ready_to_claim", "completed"].includes(deployment.status)) return deployment;
    if (["failed", "cancelled"].includes(deployment.status)) {
      throw new LaunchKitApiError(deployment.message, 409, "deployment_failed");
    }
    await new Promise((resolve) =>
      setTimeout(resolve, (deployment.retryAfterSeconds ?? 2) * 1000),
    );
  }
}
