import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LoginPage } from "./LoginPage";
import { SHOWCASE_SLIDES } from "./showcase-slides";

describe("LoginPage", () => {
  it("renders the Innovation City sign-in", () => {
    render(<LoginPage onNext={vi.fn()} />);

    expect(screen.getByText("Welcome To Launch Kit")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue with Innovation City/i })).toBeEnabled();
  });

  it("starts sign-in when the button is pressed", () => {
    const onNext = vi.fn();
    render(<LoginPage onNext={onNext} />);

    screen.getByRole("button", { name: /Continue with Innovation City/i }).click();

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("disables the button and shows progress while redirecting", () => {
    render(<LoginPage onNext={vi.fn()} busy />);

    expect(screen.getByRole("button", { name: /Redirecting/i })).toBeDisabled();
  });

  it("renders every showcase capability beside sign-in", () => {
    render(<LoginPage onNext={vi.fn()} />);

    for (const slide of SHOWCASE_SLIDES) {
      expect(screen.getByText(slide.badgeLabel)).toBeInTheDocument();
      expect(screen.getByText(slide.headline)).toBeInTheDocument();
    }
  });
});
