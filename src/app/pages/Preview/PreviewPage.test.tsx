import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PreviewPage } from "../../App";
import { makeMockups } from "../../test/fixtures";

describe("PreviewPage", () => {
  beforeEach(() => {
    // The page fetches each mockup's HTML on mount; keep it off the network.
    // A fresh Response per call — a single shared one throws "Body has already
    // been read" on the second mockup.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() =>
        Promise.resolve(
          new Response("<html><body>mockup</body></html>", {
            status: 200,
            headers: { "Content-Type": "text/html" },
          }),
        ),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders a card per mockup with its direction", async () => {
    render(
      <PreviewPage
        mockups={makeMockups()}
        selectedMockupId={null}
        onConfirm={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Choose Your Design")).toBeInTheDocument();
    expect(screen.getByText("Version 1")).toBeInTheDocument();
    expect(screen.getByText("Clean and structured")).toBeInTheDocument();
    expect(screen.getByText("Version 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Confirm Selection/i })).toBeInTheDocument();

    // Each mockup's preview HTML lands in a sandboxed iframe.
    await waitFor(() => {
      expect(screen.getByTitle("Version 1 preview")).toBeInTheDocument();
    });
  });

  it("honours a previously selected mockup", () => {
    render(
      <PreviewPage
        mockups={makeMockups()}
        selectedMockupId="mck_two"
        onConfirm={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Version 2")).toBeInTheDocument();
  });
});
