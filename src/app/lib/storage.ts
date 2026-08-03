// The one place browser-session keys are named. The access token is not here:
// launchkit-api.ts owns it behind setAccessToken/clearAccessToken.
//
// Deliberately a thin pass-through for now — the guard for blocked-storage
// browsers (finding C4 in docs/frontend-review.md) lands in its own commit so
// this one stays a pure move.

export const SESSION_KEYS = {
  maxReachedStep: "ailk_maxReachedStep",
  projectId: "ailk_projectId",
  operationId: "ailk_operationId",
} as const;

export type SessionKey = (typeof SESSION_KEYS)[keyof typeof SESSION_KEYS];

export function readSession(key: SessionKey): string | null {
  return localStorage.getItem(key);
}

export function writeSession(key: SessionKey, value: string): void {
  localStorage.setItem(key, value);
}

export function removeSession(key: SessionKey): void {
  localStorage.removeItem(key);
}

/** Drops everything tied to the active project, leaving the sign-in session. */
export function clearProjectSession(): void {
  removeSession(SESSION_KEYS.projectId);
  removeSession(SESSION_KEYS.operationId);
  removeSession(SESSION_KEYS.maxReachedStep);
}
