import { describe, expect, it } from "vitest";

import { makeCatalog, makeProject } from "../../test/fixtures";
import {
  addSection,
  deleteSection,
  editorPages,
  layoutTotals,
  moveSection,
  togglePage,
  toPageLayout,
  type PageTemplate,
} from "./page-layout";

const catalog = makeCatalog();

function pages(): PageTemplate[] {
  return editorPages(makeProject(), catalog);
}

describe("editorPages", () => {
  it("marks saved pages selected and leaves the rest available", () => {
    const result = pages();
    expect(result.map((p) => [p.id, p.selected])).toEqual([["home", true], ["about", false]]);
  });

  it("seeds unsaved pages from the catalog templates", () => {
    const about = pages().find((p) => p.id === "about")!;
    expect(about.sections.map((s) => s.name)).toEqual(["Navigation", "Hero Section", "Footer"]);
    expect(about.sections.map((s) => s.locked)).toEqual([true, false, true]);
  });
});

describe("togglePage", () => {
  it("flips only the named page", () => {
    const next = togglePage(pages(), "about");
    expect(next.find((p) => p.id === "about")!.selected).toBe(true);
    expect(next.find((p) => p.id === "home")!.selected).toBe(true);
  });
});

describe("section editing", () => {
  it("removes a section", () => {
    const next = deleteSection(pages(), "home", "home:hero:1");
    expect(next.find((p) => p.id === "home")!.sections.map((s) => s.name))
      .toEqual(["Navigation", "Footer"]);
  });

  it("inserts a new section directly above the footer", () => {
    const home = addSection(pages(), "home", "Pricing", "pricing").find((p) => p.id === "home")!;
    expect(home.sections.map((s) => s.name))
      .toEqual(["Navigation", "Hero Section", "Pricing", "Footer"]);
  });

  it("appends when the page has no footer", () => {
    const noFooter = deleteSection(pages(), "home", "home:footer:2");
    const home = addSection(noFooter, "home", "Pricing", "pricing").find((p) => p.id === "home")!;
    expect(home.sections.at(-1)!.name).toBe("Pricing");
  });

});

describe("moveSection", () => {
  it("reorders within a page", () => {
    const start = addSection(pages(), "home", "Pricing", "pricing");
    const moved = moveSection(
      start,
      { pageId: "home", sectionId: "home:hero:1" },
      { pageId: "home", sectionId: start.find((p) => p.id === "home")!.sections[2].id },
    );
    expect(moved.find((p) => p.id === "home")!.sections.map((s) => s.name))
      .toEqual(["Navigation", "Pricing", "Hero Section", "Footer"]);
  });

  it("refuses to move a locked section", () => {
    const start = pages();
    const moved = moveSection(
      start,
      { pageId: "home", sectionId: "home:navigation:0" },
      { pageId: "home", sectionId: "home:hero:1" },
    );
    expect(moved).toEqual(start);
  });

  it("refuses to displace a locked section", () => {
    const start = pages();
    const moved = moveSection(
      start,
      { pageId: "home", sectionId: "home:hero:1" },
      { pageId: "home", sectionId: "home:footer:2" },
    );
    expect(moved).toEqual(start);
  });

  it("relocates across pages, inserting before the target", () => {
    const moved = moveSection(
      pages(),
      { pageId: "home", sectionId: "home:hero:1" },
      { pageId: "about", sectionId: "about:footer:2" },
    );
    expect(moved.find((p) => p.id === "home")!.sections.map((s) => s.name))
      .toEqual(["Navigation", "Footer"]);
    expect(moved.find((p) => p.id === "about")!.sections.map((s) => s.name))
      .toEqual(["Navigation", "Hero Section", "Hero Section", "Footer"]);
  });

  it("is a no-op when the source section is gone", () => {
    const start = pages();
    expect(moveSection(start, { pageId: "home", sectionId: "nope" }, { pageId: "about", sectionId: "about:footer:2" }))
      .toEqual(start);
  });
});

describe("layoutTotals", () => {
  it("counts only selected pages and unlocked sections", () => {
    const totals = layoutTotals(pages());
    expect(totals.selectedPageCount).toBe(1);
    expect(totals.totalContentSections).toBe(1);
    expect(totals.selectedNames).toEqual(["Home"]);
    expect(totals.canGenerate).toBe(true);
    expect(totals.atLimit).toBe(false);
  });

  it("blocks generation when a selected page has no content section", () => {
    const stripped = deleteSection(pages(), "home", "home:hero:1");
    const totals = layoutTotals(stripped);
    expect(totals.hasInvalidPage).toBe(true);
    expect(totals.canGenerate).toBe(false);
  });

  it("blocks generation with nothing selected", () => {
    const totals = layoutTotals(togglePage(pages(), "home"));
    expect(totals.selectedPageCount).toBe(0);
    expect(totals.canGenerate).toBe(false);
  });
});

describe("toPageLayout", () => {
  const unlocked = catalog.sectionTemplates.filter((s) => !s.locked);

  it("emits only selected pages, with API-shaped ids", () => {
    const layout = toPageLayout(pages(), unlocked);
    expect(layout.pages).toHaveLength(1);
    expect(layout.pages[0]).toMatchObject({ id: "page:home", templateId: "home", slug: "home" });
  });

  it("resolves a template id for a saved \"(Copy)\" section by stripping the suffix", () => {
    // Saved projects can still carry names like this from an earlier duplicate action.
    const withCopy = pages().map((page) => ({
      ...page,
      sections: page.sections.map((s) =>
        s.name === "Hero Section" ? { ...s, name: "Hero Section (Copy)", templateId: undefined } : s,
      ),
    }));
    const copy = toPageLayout(withCopy, unlocked).pages[0].sections
      .find((s) => s.name === "Hero Section (Copy)")!;
    expect(copy.templateId).toBe("hero");
  });

  it("falls back to features for an unrecognised section name", () => {
    const layout = toPageLayout(
      pages().map((p) => ({
        ...p,
        sections: p.sections.map((s) =>
          s.name === "Hero Section" ? { ...s, name: "Mystery", templateId: undefined } : s,
        ),
      })),
      unlocked,
    );
    expect(layout.pages[0].sections.find((s) => s.name === "Mystery")!.templateId).toBe("features");
  });
});
