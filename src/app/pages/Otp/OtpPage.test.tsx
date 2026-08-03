import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OtpPage } from "../../App";

describe("OtpPage", () => {
  it("renders six code inputs and the verify action", () => {
    render(<OtpPage onNext={vi.fn()} onBack={vi.fn()} />);

    expect(screen.getByText("Check your email")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByRole("button", { name: /Verify Code/i })).toBeInTheDocument();
  });
});
