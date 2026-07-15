import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearAccessToken,
  hasAccessToken,
  launchKitApi,
  setAccessToken,
} from "./launchkit-api";

describe("Launch Kit API authentication", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("stores and clears the staging access token", () => {
    expect(hasAccessToken()).toBe(false);
    setAccessToken("signed-token");
    expect(hasAccessToken()).toBe(true);
    clearAccessToken();
    expect(hasAccessToken()).toBe(false);
  });

  it("adds the bearer token to protected requests", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "prj_test" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    setAccessToken("signed-token");

    await launchKitApi.getProject("prj_test");

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer signed-token");
  });

  it("verifies the fixed account through the backend auth endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          accessToken: "signed-token",
          tokenType: "bearer",
          expiresInSeconds: 28800,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const session = await launchKitApi.verifyAccessCode(
      "test@innovationcity.com",
      "123456",
    );

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/\/api\/v1\/auth\/verify$/);
    expect(JSON.parse(String(init.body))).toEqual({
      email: "test@innovationcity.com",
      code: "123456",
    });
    expect(session.accessToken).toBe("signed-token");
  });
});
