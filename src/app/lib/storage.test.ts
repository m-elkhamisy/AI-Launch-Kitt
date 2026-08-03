import { afterEach, describe, expect, it, vi } from "vitest";

import { clearProjectSession, readSession, removeSession, SESSION_KEYS, writeSession } from "./storage";

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("session storage", () => {
  it("round-trips a value", () => {
    writeSession(SESSION_KEYS.projectId, "prj_test");
    expect(readSession(SESSION_KEYS.projectId)).toBe("prj_test");
    removeSession(SESSION_KEYS.projectId);
    expect(readSession(SESSION_KEYS.projectId)).toBeNull();
  });

  it("clears the project keys and leaves others alone", () => {
    writeSession(SESSION_KEYS.projectId, "prj_test");
    writeSession(SESSION_KEYS.operationId, "op_test");
    writeSession(SESSION_KEYS.maxReachedStep, "2");
    localStorage.setItem("ailk_accessToken", "signed-token");

    clearProjectSession();

    expect(readSession(SESSION_KEYS.projectId)).toBeNull();
    expect(readSession(SESSION_KEYS.operationId)).toBeNull();
    expect(readSession(SESSION_KEYS.maxReachedStep)).toBeNull();
    // The sign-in session is owned by launchkit-api and must survive.
    expect(localStorage.getItem("ailk_accessToken")).toBe("signed-token");
  });

  it("degrades quietly when storage is blocked", () => {
    // Safari private mode and strict cookie policies throw on access rather
    // than returning null; these run inside useState initialisers.
    vi.stubGlobal("localStorage", {
      getItem: () => { throw new DOMException("denied", "SecurityError"); },
      setItem: () => { throw new DOMException("denied", "SecurityError"); },
      removeItem: () => { throw new DOMException("denied", "SecurityError"); },
    });

    expect(() => writeSession(SESSION_KEYS.projectId, "prj_test")).not.toThrow();
    expect(readSession(SESSION_KEYS.projectId)).toBeNull();
    expect(() => removeSession(SESSION_KEYS.projectId)).not.toThrow();
    expect(() => clearProjectSession()).not.toThrow();
  });
});
