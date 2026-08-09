import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QuestionnairePage } from "./QuestionnairePage";
import { makeProject } from "../../test/fixtures";

function renderPage(project = makeProject()) {
  return render(
    <QuestionnairePage
      project={project}
      onSave={vi.fn()}
      onUploadLogo={vi.fn()}
      onUploadDocuments={vi.fn()}
      onRemoveAsset={vi.fn()}
      onApplySummary={vi.fn()}
      onRunAiSummary={vi.fn()}
      onBack={vi.fn()}
      busy={false}
    />,
  );
}

describe("QuestionnairePage", () => {
  it("renders the brand form prefilled from the project", () => {
    renderPage();

    expect(screen.getByText("Tell us about your brand")).toBeInTheDocument();
    expect(screen.getByText(/Company \/ Brand Name/)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Northstar")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Build faster, ship smarter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save & Continue/i })).toBeInTheDocument();
  });

  it("shows optional logo and brand-document dropzones", () => {
    renderPage();

    expect(screen.getByText("Start with your brand")).toBeInTheDocument();
    expect(screen.getByText(/Click or drag your logo here/)).toBeInTheDocument();
    expect(screen.getByText(/Click or drag your documents here/)).toBeInTheDocument();
  });

  it("disables AI Summary until a website or documents are provided", () => {
    renderPage();

    expect(screen.getByRole("button", { name: /AI Summary/i })).toBeDisabled();
    expect(screen.queryByRole("button", { name: /AI Discovery/i })).not.toBeInTheDocument();
  });

  it("offers an optional website URL field for combined discovery", () => {
    renderPage();

    expect(screen.getByText(/Already have a website\?/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://your-website.com")).toBeInTheDocument();
  });

  it("lists uploaded assets as removable chips", () => {
    renderPage(
      makeProject({
        uploadedAssets: [
          {
            id: "ast_logo",
            kind: "profile_image",
            label: "Brand logo",
            filename: "logo.png",
            contentType: "image/png",
            size: 2048,
            previewUrl: "/api/v1/assets/ast_logo/content",
          },
          {
            id: "ast_doc",
            kind: "profile_source",
            label: "Brand document",
            filename: "brand-book.pdf",
            contentType: "application/pdf",
            size: 4096,
            previewUrl: "/api/v1/assets/ast_doc/content",
          },
        ],
      }),
    );

    expect(screen.getByText("logo.png")).toBeInTheDocument();
    expect(screen.getByText("brand-book.pdf")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remove logo\.png/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Remove brand-book\.pdf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /AI Summary/i })).toBeEnabled();
  });
});
