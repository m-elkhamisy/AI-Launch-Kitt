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
  it("allows every field to be left empty", () => {
    expect(questionnaireSchema.safeParse({
      companyName: "",
      uniqueness: "",
      customers: "",
      tagline: "",
      cta: "",
      anythingElse: "",
    }).success).toBe(true);
  });

  it("validates minimum lengths only when a value is provided", () => {
    const result = questionnaireSchema.safeParse({
      companyName: "A",
      uniqueness: "",
      customers: "",
      tagline: "",
      cta: "",
      anythingElse: "",
    });

    expect(result.success).toBe(false);
  });
});
