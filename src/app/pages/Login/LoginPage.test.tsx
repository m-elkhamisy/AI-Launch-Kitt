import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginPage } from "../../App";

describe("LoginPage", () => {
  it("renders the Innovation City sign-in card", () => {
    render(<LoginPage onNext={vi.fn()} />);

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue with Innovation City/i })).toBeEnabled();
  });

  it("disables the button and shows progress while redirecting", () => {
    render(<LoginPage onNext={vi.fn()} busy />);

    expect(screen.getByRole("button", { name: /Redirecting/i })).toBeDisabled();
  });
});
