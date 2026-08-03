import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QuestionnairePage } from "./QuestionnairePage";
import { makeProject } from "../../test/fixtures";

describe("QuestionnairePage", () => {
  it("renders the brand form prefilled from the project", () => {
    render(
      <QuestionnairePage
        project={makeProject()}
        onSave={vi.fn()}
        onUpload={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Tell us about your brand")).toBeInTheDocument();
    expect(screen.getByText(/Company \/ Brand Name/)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Northstar")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Build faster, ship smarter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save & Continue/i })).toBeInTheDocument();
  });

  it("shows the upload affordance", () => {
    render(
      <QuestionnairePage
        project={makeProject()}
        onSave={vi.fn()}
        onUpload={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText(/Prefer to upload your portfolio instead\?/)).toBeInTheDocument();
  });
});
