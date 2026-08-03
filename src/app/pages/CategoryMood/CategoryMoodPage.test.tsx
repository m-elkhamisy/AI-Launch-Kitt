import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CategoryMoodPage } from "../../App";
import { makeCatalog, makeProject } from "../../test/fixtures";

describe("CategoryMoodPage", () => {
  it("renders the selected category and mood from the catalog", () => {
    render(
      <CategoryMoodPage
        project={makeProject()}
        catalog={makeCatalog()}
        onSave={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Business Category")).toBeInTheDocument();
    expect(screen.getByText("Design Mood")).toBeInTheDocument();
    expect(screen.getByText("Corporate Enterprise")).toBeInTheDocument();
    expect(screen.getByText("Minimalist")).toBeInTheDocument();
  });

  it("renders every animation level from the catalog", () => {
    render(
      <CategoryMoodPage
        project={makeProject()}
        catalog={makeCatalog()}
        onSave={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Animation Level")).toBeInTheDocument();
    expect(screen.getByText("Balanced")).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
  });
});
