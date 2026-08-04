// The one place browser-session keys are named. The access token is not here:
// launchkit-api.ts owns it behind setAccessToken/clearAccessToken.
//
// Every access is guarded. Accessing localStorage throws outright when storage
// is blocked — Safari private mode, a strict cookie policy, an embedded webview
// — and these run inside useState initialisers, so an unguarded throw took the
// whole app down at first render rather than just losing persistence.

export const SESSION_KEYS = {
  maxReachedStep: "ailk_maxReachedStep",
  projectId: "ailk_projectId",
  operationId: "ailk_operationId",
} as const;

export type SessionKey = (typeof SESSION_KEYS)[keyof typeof SESSION_KEYS];

export function readSession(key: SessionKey): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSession(key: SessionKey, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable or over quota: the session simply will not survive a
    // reload, which is a better outcome than failing the interaction.
  }
}

export function removeSession(key: SessionKey): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to do — if we cannot write, there is nothing persisted to clear.
  }
}

/** Drops everything tied to the active project, leaving the sign-in session. */
export function clearProjectSession(): void {
  removeSession(SESSION_KEYS.projectId);
  removeSession(SESSION_KEYS.operationId);
  removeSession(SESSION_KEYS.maxReachedStep);
}
