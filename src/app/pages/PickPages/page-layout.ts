// Pure data logic behind the Pick Pages editor. Every function here takes the
// editor's page array and returns a new one — no React, no state — so the
// component is left holding only presentation and event wiring.
import type { PageLayout, ProjectView, WizardCatalog } from "../../launchkit-api";

export type Section = { id: string; name: string; templateId?: string; locked?: boolean };
export type PageTemplate = {
  id: string;
  name: string;
  slug?: string;
  selected: boolean;
  sections: Section[];
};

export const MAX_PAGES = 6;
export const MAX_CONTENT_SECTIONS = 24;

// Module-level counter for ids of sections added in this session. Server-created
// sections use `template:section:index` ids, so these cannot collide.
let sectionSeq = 0;
export const nextSectionId = () => `s${++sectionSeq}`;

/** Builds the editor's working copy: catalog templates overlaid with saved pages. */
export function editorPages(project: ProjectView, catalog: WizardCatalog): PageTemplate[] {
  const sectionCatalog = new Map(catalog.sectionTemplates.map((item) => [item.id, item]));
  const saved = new Map(project.pageLayout.pages.map((page) => [page.templateId, page]));
  return catalog.pageTemplates.map((template) => {
    const page = saved.get(template.id);
    const sections = page?.sections ?? template.sectionTemplateIds.map((templateId, index) => ({
      id: `${template.id}:${templateId}:${index}`,
      templateId,
      name: sectionCatalog.get(templateId)?.label ?? templateId,
      locked: sectionCatalog.get(templateId)?.locked ?? false,
    }));
    return {
      id: template.id,
      name: page?.name ?? template.label,
      slug: page?.slug ?? template.slug,
      selected: Boolean(page),
      sections: sections.map((section) => ({
        id: section.id,
        name: section.name,
        templateId: section.templateId,
        locked: section.locked,
      })),
    };
  });
}

export function togglePage(pages: PageTemplate[], pageId: string): PageTemplate[] {
  return pages.map((page) => (page.id === pageId ? { ...page, selected: !page.selected } : page));
}

function mapSections(
  pages: PageTemplate[],
  pageId: string,
  transform: (sections: Section[]) => Section[],
): PageTemplate[] {
  return pages.map((page) =>
    page.id === pageId ? { ...page, sections: transform(page.sections) } : page,
  );
}

export function deleteSection(pages: PageTemplate[], pageId: string, sectionId: string): PageTemplate[] {
  return mapSections(pages, pageId, (sections) => sections.filter((s) => s.id !== sectionId));
}

/** Inserts a new section above the locked footer, or at the end if there is none. */
export function addSection(
  pages: PageTemplate[],
  pageId: string,
  name: string,
  templateId: string | undefined,
): PageTemplate[] {
  return mapSections(pages, pageId, (sections) => {
    const footerIndex = sections.findIndex((s) => s.locked && s.name === "Footer");
    const added: Section = { id: nextSectionId(), name, templateId };
    if (footerIndex >= 0) {
      return [...sections.slice(0, footerIndex), added, ...sections.slice(footerIndex)];
    }
    return [...sections, added];
  });
}

/**
 * Moves a section onto a drop target. Within one page this reorders; across
 * pages it relocates, inserting before the target. Locked sections never move
 * and are never displaced.
 */
export function moveSection(
  pages: PageTemplate[],
  from: { pageId: string; sectionId: string },
  to: { pageId: string; sectionId: string },
): PageTemplate[] {
  if (from.pageId === to.pageId) {
    return mapSections(pages, to.pageId, (sections) => {
      const fromIndex = sections.findIndex((s) => s.id === from.sectionId);
      const toIndex = sections.findIndex((s) => s.id === to.sectionId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return sections;
      if (sections[fromIndex].locked || sections[toIndex].locked) return sections;
      const next = [...sections];
      const [moving] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moving);
      return next;
    });
  }

  const source = pages.find((page) => page.id === from.pageId);
  const moving = source?.sections.find((s) => s.id === from.sectionId);
  if (!moving || moving.locked) return pages;

  return pages.map((page) => {
    if (page.id === from.pageId) {
      return { ...page, sections: page.sections.filter((s) => s.id !== from.sectionId) };
    }
    if (page.id === to.pageId) {
      const targetIndex = page.sections.findIndex((s) => s.id === to.sectionId);
      // Fall back to just above the footer when the target is gone.
      const insertAt = targetIndex >= 0 ? targetIndex : page.sections.length - 1;
      const next = [...page.sections];
      next.splice(insertAt, 0, moving);
      return { ...page, sections: next };
    }
    return page;
  });
}

export function contentSections(sections: Section[]): Section[] {
  return sections.filter((section) => !section.locked);
}

/** The counts and limit flags the editor renders its warnings from. */
export function layoutTotals(pages: PageTemplate[]) {
  const selected = pages.filter((page) => page.selected);
  const selectedPageCount = selected.length;
  const totalContentSections = selected.reduce(
    (total, page) => total + contentSections(page.sections).length,
    0,
  );
  const atPageLimit = selectedPageCount >= MAX_PAGES;
  const atSectionLimit = totalContentSections >= MAX_CONTENT_SECTIONS;
  return {
    selectedPageCount,
    totalContentSections,
    atPageLimit,
    atSectionLimit,
    atLimit: atPageLimit || atSectionLimit,
    // A selected page with nothing but locked nav/footer cannot be generated.
    hasInvalidPage: selected.some((page) => contentSections(page.sections).length === 0),
    selectedNames: selected.map((page) => page.name),
    canGenerate:
      selectedPageCount > 0 &&
      !selected.some((page) => contentSections(page.sections).length === 0) &&
      !atSectionLimit,
  };
}

/** Shapes the editor state into the payload the API expects. */
export function toPageLayout(
  pages: PageTemplate[],
  unlockedSections: WizardCatalog["sectionTemplates"],
): PageLayout {
  return {
    pages: pages.filter((page) => page.selected).map((page) => ({
      id: `page:${page.id}`,
      templateId: page.id,
      name: page.name,
      slug: page.slug ?? page.id,
      sections: page.sections.map((section) => ({
        id: section.id,
        templateId:
          section.templateId ??
          unlockedSections.find((item) => item.label === section.name.replace(" (Copy)", ""))?.id ??
          "features",
        name: section.name,
        locked: Boolean(section.locked),
      })),
    })),
  };
}
