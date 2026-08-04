import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PickPagesPage } from "./PickPagesPage";
import { makeCatalog, makeProject } from "../../test/fixtures";

describe("PickPagesPage", () => {
  it("renders a card per catalog page template with its sections", () => {
    render(
      <PickPagesPage
        project={makeProject()}
        catalog={makeCatalog()}
        onGenerate={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Pick your pages")).toBeInTheDocument();
    // "Home" is both a card title and an entry in the selection summary strip.
    expect(screen.getAllByText("Home")).toHaveLength(2);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getAllByText("Navigation").length).toBeGreaterThan(0);
    expect(screen.getAllByText("locked").length).toBeGreaterThan(0);
  });

  it("summarises the saved selection and offers generation", () => {
    render(
      <PickPagesPage
        project={makeProject()}
        catalog={makeCatalog()}
        onGenerate={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    // Only "home" is persisted in the fixture's pageLayout, so one page is selected.
    expect(screen.getByText("1 of 6 pages selected")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Review & Generate/i }).length).toBeGreaterThan(0);
  });
});
