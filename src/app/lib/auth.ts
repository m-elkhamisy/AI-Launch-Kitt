/** Azure Entra SSO helpers (tokens live in httpOnly cookies on the API origin). */

const API_BASE: string =
  ((import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE ??
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_API_BASE_URL ??
    "http://localhost:8000").replace(/\/$/, "");

export type AuthUser = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  // Kept optional for older UI bindings.
  fullName?: string | null;
  cognitoUserId?: string | null;
};

export type AuthMeResponse = {
  authenticated: boolean;
  user: AuthUser | null;
};

/** Start Azure SSO — full-page redirect to the backend login endpoint. */
export function startOAuthLogin(): void {
  window.location.assign(`${API_BASE}/auth/login`);
}

export async function fetchAuthMe(): Promise<AuthMeResponse> {
  const response = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return { authenticated: false, user: null };
  }
  const body = (await response.json()) as AuthMeResponse;
  if (body.user) {
    body.user = {
      ...body.user,
      fullName: body.user.name ?? body.user.fullName ?? null,
      cognitoUserId: body.user.id ?? body.user.cognitoUserId ?? null,
    };
  }
  return body;
}

export async function logoutSession(): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

/** Read and clear one-shot OAuth result query params from the current URL. */
export function consumeAuthQueryParams(): {
  status: "success" | "error" | "logged_out" | null;
  reason: string | null;
} {
  const params = new URLSearchParams(window.location.search);
  const auth = params.get("auth");
  const reason = params.get("reason") ?? params.get("error");
  if (!auth && !params.get("error")) {
    return { status: null, reason: null };
  }

  params.delete("auth");
  params.delete("reason");
  params.delete("error");
  const next = params.toString();
  const path = `${window.location.pathname}${next ? `?${next}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", path);

  if (auth === "success" || auth === "error" || auth === "logged_out") {
    return { status: auth, reason };
  }
  if (reason) {
    return { status: "error", reason };
  }
  return { status: null, reason: null };
}
