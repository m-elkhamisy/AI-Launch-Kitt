import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearAccessToken,
  hasAccessToken,
  launchKitApi,
  setAccessToken,
  watchBuild,
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

  it("watches build status through the authenticated SSE stream", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(
          'id: 4\nevent: status\ndata: {"id":4,"status":"completed","stage":"completed","message":"Build completed","createdAt":"2026-07-15T00:00:00Z"}\n\n',
        ));
        controller.close();
      },
    });
    const completedBuild = {
      id: "bld_test",
      projectId: "prj_test",
      provider: "v0",
      status: "completed" as const,
      stage: "completed",
      message: "Build completed",
      warnings: [],
      previewUrl: "https://example.com",
      webUrl: "https://example.com",
      downloadUrl: "/api/v1/builds/bld_test/download",
      retryAfterSeconds: null,
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(stream, { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(completedBuild), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }));
    vi.stubGlobal("fetch", fetchMock);
    setAccessToken("signed-token");
    const updates: string[] = [];

    const result = await watchBuild(
      { ...completedBuild, status: "running", stage: "generating", message: "Generating" },
      (build) => updates.push(build.status),
      new AbortController().signal,
    );

    expect(result.status).toBe("completed");
    expect(updates).toEqual(["completed", "completed"]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [streamUrl, streamInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(streamUrl).toMatch(/\/api\/v1\/builds\/bld_test\/events$/);
    expect(new Headers(streamInit.headers).get("Authorization")).toBe("Bearer signed-token");
  });

  it("loads protected preview assets with the bearer token", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("<html>preview</html>", {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    setAccessToken("signed-token");

    const content = await launchKitApi.getAssetContent(
      "/api/v1/assets/ast_test/content",
    );

    expect(content).toBe("<html>preview</html>");
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/\/api\/v1\/assets\/ast_test\/content$/);
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer signed-token");
  });

  it("downloads the build archive with the bearer token", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": 'attachment; filename="site.zip"',
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    setAccessToken("signed-token");

    const createObjectURL = vi.fn(() => "blob:download");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { ...URL, createObjectURL, revokeObjectURL });
    const click = vi.fn();
    const remove = vi.fn();
    const appendChild = vi
      .spyOn(document.body, "appendChild")
      .mockImplementation((node) => node);
    vi.spyOn(document, "createElement").mockReturnValue({
      click,
      remove,
      set href(_value: string) {},
      get href() {
        return "";
      },
      set download(_value: string) {},
      set rel(_value: string) {},
    } as unknown as HTMLAnchorElement);

    await launchKitApi.downloadBuild("/api/v1/builds/bld_test/download");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/\/api\/v1\/builds\/bld_test\/download$/);
    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer signed-token");
    expect(createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:download");
    appendChild.mockRestore();
  });
});
