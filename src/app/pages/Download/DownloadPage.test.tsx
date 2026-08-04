import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DownloadPage } from "./DownloadPage";
import { makeBuild, makeDeployment } from "../../test/fixtures";

describe("DownloadPage", () => {
  it("renders the success state with download and deploy actions", () => {
    render(
      <DownloadPage
        build={makeBuild()}
        deployment={null}
        onDeploy={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByText("Your website is ready!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download" })).toBeEnabled();
    expect(screen.getByRole("button", { name: /Deploy Now/i })).toBeInTheDocument();
    expect(screen.getByTitle("Generated website preview")).toBeInTheDocument();
  });

  it("disables download when the build has no archive", () => {
    render(
      <DownloadPage
        build={makeBuild({ downloadUrl: null })}
        deployment={null}
        onDeploy={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByRole("button", { name: "Download" })).toBeDisabled();
  });

  it("switches the deploy action once the deployment is claimable", () => {
    render(
      <DownloadPage
        build={makeBuild()}
        deployment={makeDeployment({ status: "ready_to_claim", claimUrl: "https://vercel.com/claim" })}
        onDeploy={vi.fn()}
        onBack={vi.fn()}
        busy={false}
      />,
    );

    expect(screen.getByRole("button", { name: /Open Vercel Claim/i })).toBeInTheDocument();
  });
});
