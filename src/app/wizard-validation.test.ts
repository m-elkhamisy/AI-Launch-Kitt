import { describe, expect, it } from "vitest";

import { loginSchema, otpSchema, questionnaireSchema } from "./wizard-validation";

describe("restricted staging credentials", () => {
  it("accepts only the enabled staging email", () => {
    expect(loginSchema.safeParse({ email: "test@innovationcity.com" }).success).toBe(true);
    expect(loginSchema.safeParse({ email: "someone@example.com" }).success).toBe(false);
  });

  it("accepts only the six-digit staging access code", () => {
    expect(otpSchema.safeParse({ code: "123456" }).success).toBe(true);
    expect(otpSchema.safeParse({ code: "654321" }).success).toBe(false);
    expect(otpSchema.safeParse({ code: "12345" }).success).toBe(false);
  });
});

describe("brand questionnaire", () => {
  it("requires the five core brand fields", () => {
    expect(questionnaireSchema.safeParse({
      companyName: "",
      uniqueness: "",
      customers: "",
      tagline: "",
      cta: "",
      anythingElse: "",
    }).success).toBe(false);
  });

  it("allows only additional context to be empty", () => {
    const result = questionnaireSchema.safeParse({
      companyName: "Innovation City",
      uniqueness: "A focused launch platform for growing businesses.",
      customers: "Founders and product teams",
      tagline: "Launch with confidence",
      cta: "Start building",
      anythingElse: "",
    });

    expect(result.success).toBe(true);
  });
});
