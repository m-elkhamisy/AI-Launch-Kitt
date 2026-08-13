// The single source of truth for where the wizard can go.
//
// Page order used to be encoded three times — the Page union, WIZARD_PAGES, and
// an `order` array inlined in goBack — which meant adding a screen required
// three edits in lockstep or navigation silently dead-ended.

import { ACTIVE_BUILD_STATUSES, BuildView, MockupView, ProjectView } from "../launchkit-api";

export type Page =
  | "login"
  | "projects"
  | "questionnaire"
  | "category-mood"
  | "colors"
  | "pick-pages"
  | "generating"
  | "preview"
  | "building"
  | "download";

/** The four pages that appear in the SubNav breadcrumb, in step order. */
export const WIZARD_PAGES: Page[] = ["questionnaire", "category-mood", "colors", "pick-pages"];

/** Every page in linear order; drives back navigation. */
export const PAGE_ORDER: Page[] = [
  "login",
  "projects",
  ...WIZARD_PAGES,
  "generating",
  "preview",
  "building",
  "download",
];

/** Breadcrumb index of a page, or -1 when it is not a wizard step. */
export function stepForPage(page: Page): number {
  return WIZARD_PAGES.indexOf(page);
}

/** The page one back in the linear order, or null at the very start. */
export function previousPage(page: Page): Page | null {
  const index = PAGE_ORDER.indexOf(page);
  return index > 0 ? PAGE_ORDER[index - 1] : null;
}

/**
 * The page a breadcrumb click should land on, or null if the jump is not
 * allowed. Only backwards (or same-step) moves are permitted, and only from
 * inside the wizard — stepForPage returns -1 elsewhere, which blocks the jump.
 */
export function stepTarget(page: Page, step: number): Page | null {
  const target = WIZARD_PAGES[step];
  if (!target) return null;
  return stepForPage(target) <= stepForPage(page) ? target : null;
}

/** Highest step the user has fully passed through. */
export function completedUpTo(page: Page, maxReachedStep: number): number {
  return Math.max(maxReachedStep, stepForPage(page) - 1);
}

/** Where to drop the user when reopening a project, based on its progress. */
export function resumePageForProject(
  project: ProjectView,
  build: BuildView | null,
  mockups: MockupView[],
): { page: Page; maxReachedStep: number } {
  if (build?.status === "completed") {
    return { page: "download", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  if (build && ACTIVE_BUILD_STATUSES.has(build.status)) {
    return { page: "building", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  if (mockups.length > 0 || project.selectedMockupId) {
    return { page: "preview", maxReachedStep: WIZARD_PAGES.length - 1 };
  }
  const hasCompany = Boolean(project.business.companyName.trim());
  if (!hasCompany) {
    return { page: "questionnaire", maxReachedStep: -1 };
  }
  return { page: "questionnaire", maxReachedStep: 0 };
}
