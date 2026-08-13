import { describe, expect, it } from "vitest";

import { loginSchema, otpSchema, questionnaireSchema, websiteUrlSchema } from "./wizard-validation";

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
  it("requires the four core brand fields", () => {
    expect(questionnaireSchema.safeParse({
      companyName: "",
      industry: "",
      customers: "",
      tagline: "",
    }).success).toBe(false);
  });

  it("allows tagline to be empty", () => {
    const result = questionnaireSchema.safeParse({
      companyName: "Innovation City",
      industry: "Technology launch platform",
      customers: "Founders and product teams",
      tagline: "",
    });

    expect(result.success).toBe(true);
  });
});

describe("existing website discovery", () => {
  it("accepts full addresses and adds https to bare domains", () => {
    expect(websiteUrlSchema.parse("https://example.com/menu")).toBe("https://example.com/menu");
    expect(websiteUrlSchema.parse("example.com")).toBe("https://example.com");
  });

  it("rejects empty and non-web addresses", () => {
    expect(websiteUrlSchema.safeParse("").success).toBe(false);
    expect(websiteUrlSchema.safeParse("ftp://example.com").success).toBe(false);
    expect(websiteUrlSchema.safeParse("not a url").success).toBe(false);
    expect(websiteUrlSchema.safeParse("localhost").success).toBe(false);
  });
});
