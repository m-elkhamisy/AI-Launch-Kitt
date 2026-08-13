import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GeneratingPage } from "./GeneratingPage";
import { makeOperation } from "@/app/test/fixtures";

describe("GeneratingPage", () => {
  it("reports progress while the operation runs", () => {
    render(<GeneratingPage operation={makeOperation()} error={null} onRetry={vi.fn()} />);

    expect(screen.getByText("Building your website")).toBeInTheDocument();
    expect(screen.getByText("Creating three design directions...")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Try Again/i })).not.toBeInTheDocument();
  });

  it("surfaces an error with a retry action", () => {
    render(
      <GeneratingPage
        operation={makeOperation({ status: "failed" })}
        error="The provider is unavailable."
        onRetry={vi.fn()}
      />,
    );

    expect(screen.getByText("The provider is unavailable.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
  });
});
