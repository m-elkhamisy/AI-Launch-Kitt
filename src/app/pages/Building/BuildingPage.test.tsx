import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BuildingPage } from "./BuildingPage";
import { makeBuild } from "@/app/test/fixtures";

describe("BuildingPage", () => {
  it("shows the current build stage message", () => {
    render(
      <BuildingPage
        build={makeBuild({ status: "running", stage: "generating", message: "Generating pages" })}
        error={null}
        onBack={vi.fn()}
        onProjects={vi.fn()}
      />,
    );

    expect(screen.getByText("Building your website")).toBeInTheDocument();
    expect(screen.getByText("Generating pages")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Return to Designs/i })).not.toBeInTheDocument();
  });

  it("offers a way back when the build reaches a terminal failure", () => {
    render(
      <BuildingPage
        build={makeBuild({ status: "failed", message: "The provider rejected the build." })}
        error={null}
        onBack={vi.fn()}
        onProjects={vi.fn()}
      />,
    );

    expect(screen.getByText("Build needs attention")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Return to Designs/i })).toBeInTheDocument();
  });

  it("renders build warnings", () => {
    render(
      <BuildingPage
        build={makeBuild({ status: "running", warnings: ["Two images could not be optimised."] })}
        error={null}
        onBack={vi.fn()}
        onProjects={vi.fn()}
      />,
    );

    expect(screen.getByText("Two images could not be optimised.")).toBeInTheDocument();
  });
});
