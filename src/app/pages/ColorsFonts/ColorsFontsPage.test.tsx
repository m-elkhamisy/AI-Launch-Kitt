import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ColorsFontsPage } from "../../App";
import { makeCatalog, makeProject } from "../../test/fixtures";

describe("ColorsFontsPage", () => {
  it("renders palette and font-pairing grids from the catalog", () => {
    render(
      <ColorsFontsPage
        project={makeProject()}
        catalog={makeCatalog()}
        onSave={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Theme Mode")).toBeInTheDocument();
    expect(screen.getByText("Font Pairings")).toBeInTheDocument();
    expect(screen.getByText("Modern Blue")).toBeInTheDocument();
    expect(screen.getByText("Nature Green")).toBeInTheDocument();
    expect(screen.getByText("Modern Startup")).toBeInTheDocument();
  });

  it("offers custom palette and custom font entry points", () => {
    render(
      <ColorsFontsPage
        project={makeProject()}
        catalog={makeCatalog()}
        onSave={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    // "Custom" labels two cards: the custom palette and the custom font pairing.
    expect(screen.getAllByText("Custom")).toHaveLength(2);
    expect(screen.getByText("Choose fonts")).toBeInTheDocument();
  });
});
