import { describe, expect, it } from "vitest";

import { makeBuild, makeMockups, makeProject } from "../test/fixtures";
import {
  completedUpTo,
  PAGE_ORDER,
  previousPage,
  resumePageForProject,
  stepForPage,
  stepTarget,
  WIZARD_PAGES,
} from "./navigation";

// These pin the behaviour of the pre-consolidation App.tsx, which encoded page
// order in three separate places. Written before the consolidation so they
// describe what shipped, not what the refactor produces.

describe("page order", () => {
  it("runs sign-in, hub, the four wizard steps, then generation", () => {
    expect(PAGE_ORDER).toEqual([
      "login", "projects", "questionnaire", "category-mood", "colors",
      "pick-pages", "generating", "preview", "building", "download",
    ]);
  });

  it("keeps the breadcrumb steps index-aligned with the wizard", () => {
    expect(WIZARD_PAGES).toEqual(["questionnaire", "category-mood", "colors", "pick-pages"]);
    expect(stepForPage("questionnaire")).toBe(0);
    expect(stepForPage("pick-pages")).toBe(3);
  });

  it("reports -1 for pages outside the breadcrumb", () => {
    expect(stepForPage("login")).toBe(-1);
    expect(stepForPage("preview")).toBe(-1);
  });
});

describe("previousPage", () => {
  it("walks back one page at a time", () => {
    expect(previousPage("download")).toBe("building");
    expect(previousPage("colors")).toBe("category-mood");
    expect(previousPage("projects")).toBe("login");
  });

  it("has nowhere to go from the first page", () => {
    expect(previousPage("login")).toBeNull();
  });
});

describe("stepTarget", () => {
  it("allows jumping back to an earlier step", () => {
    expect(stepTarget("colors", 0)).toBe("questionnaire");
    expect(stepTarget("pick-pages", 1)).toBe("category-mood");
  });

  it("refuses to skip forward", () => {
    expect(stepTarget("category-mood", 3)).toBeNull();
    expect(stepTarget("questionnaire", 1)).toBeNull();
  });

  it("treats the current step as reachable", () => {
    expect(stepTarget("colors", 2)).toBe("colors");
  });

  it("refuses step jumps from outside the wizard", () => {
    expect(stepTarget("preview", 0)).toBeNull();
    expect(stepTarget("login", 0)).toBeNull();
  });

  it("ignores out-of-range steps", () => {
    expect(stepTarget("colors", 9)).toBeNull();
    expect(stepTarget("colors", -1)).toBeNull();
  });
});

describe("completedUpTo", () => {
  it("treats every step before the current one as done", () => {
    expect(completedUpTo("colors", -1)).toBe(1);
    expect(completedUpTo("questionnaire", -1)).toBe(-1);
  });

  it("never regresses below the furthest step already reached", () => {
    expect(completedUpTo("questionnaire", 3)).toBe(3);
    expect(completedUpTo("category-mood", 2)).toBe(2);
  });
});

describe("resumePageForProject", () => {
  it("lands on download once the build finished", () => {
    const resume = resumePageForProject(makeProject(), makeBuild({ status: "completed" }), []);
    expect(resume).toEqual({ page: "download", maxReachedStep: 3 });
  });

  it("lands on building while a build is still active", () => {
    const resume = resumePageForProject(makeProject(), makeBuild({ status: "running" }), []);
    expect(resume).toEqual({ page: "building", maxReachedStep: 3 });
  });

  it("lands on preview when mockups exist but no build has started", () => {
    const resume = resumePageForProject(makeProject(), null, makeMockups());
    expect(resume).toEqual({ page: "preview", maxReachedStep: 3 });
  });

  it("lands on preview when a mockup was already chosen", () => {
    const project = makeProject({ selectedMockupId: "mck_one" });
    expect(resumePageForProject(project, null, [])).toEqual({ page: "preview", maxReachedStep: 3 });
  });

  it("starts the wizard fresh when no company name has been saved", () => {
    const project = makeProject();
    project.business.companyName = "   ";
    expect(resumePageForProject(project, null, [])).toEqual({
      page: "questionnaire",
      maxReachedStep: -1,
    });
  });

  it("resumes mid-wizard once the business step has content", () => {
    expect(resumePageForProject(makeProject(), null, [])).toEqual({
      page: "questionnaire",
      maxReachedStep: 0,
    });
  });
});
