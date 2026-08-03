import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import svgPathsCatMood from "@/imports/category-mood-paths";

import { ScaledPage } from "../../components/common/ScaledPage";
import { SubNav } from "../../components/common/SubNav";
import { TopHeader } from "../../components/common/TopHeader";
import { firstValidationError, ValidationError } from "../../components/common/ValidationError";
import { PageLayout, ProjectView, WizardCatalog } from "../../launchkit-api";
import { pageLayoutSchema, PageLayoutValues } from "../../wizard-validation";

type Section = { id: string; name: string; templateId?: string; locked?: boolean };
type PageTemplate = { id: string; name: string; slug?: string; selected: boolean; sections: Section[] };

let _sid = 0;
const sid = () => `s${++_sid}`;

function editorPages(project: ProjectView, catalog: WizardCatalog): PageTemplate[] {
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

export function PickPagesPage({ project, catalog, onGenerate, onBack, onStepClick, completedUpTo, busy }: {
  project: ProjectView;
  catalog: WizardCatalog;
  onGenerate: (layout: PageLayout) => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const [pages, setPages] = useState<PageTemplate[]>(() => editorPages(project, catalog));
  const [openMenu, setOpenMenu] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [addModal, setAddModal] = useState<string | null>(null); // pageId
  const [renaming, setRenaming] = useState<{ pageId: string; sectionId: string; value: string } | null>(null);
  const [drag, setDrag] = useState<{ pageId: string; sectionId: string } | null>(null);
  const [dragOver, setDragOver] = useState<{ pageId: string; sectionId: string } | null>(null);
  const { setValue, handleSubmit, formState: { errors } } = useForm<PageLayoutValues>({
    resolver: zodResolver(pageLayoutSchema),
    defaultValues: project.pageLayout,
    mode: "onChange",
  });

  const unlockedSections = catalog.sectionTemplates.filter((section) => !section.locked);
  const continueGeneration = () => {
    const layout: PageLayout = {
      pages: pages.filter((page) => page.selected).map((page) => ({
        id: `page:${page.id}`,
        templateId: page.id,
        name: page.name,
        slug: page.slug ?? page.id,
        sections: page.sections.map((section) => ({
          id: section.id,
          templateId: section.templateId ?? unlockedSections.find((item) => item.label === section.name.replace(" (Copy)", ""))?.id ?? "features",
          name: section.name,
          locked: Boolean(section.locked),
        })),
      })),
    };
    setValue("pages", layout.pages, { shouldDirty: true, shouldValidate: true });
    void handleSubmit((values) => onGenerate(values))();
  };

  const selectedPageCount = pages.filter((p) => p.selected).length;
  const totalContentSections = pages.filter((p) => p.selected).reduce((n, p) => n + p.sections.filter((s) => !s.locked).length, 0);
  const atPageLimit = selectedPageCount >= 6;
  const atSectionLimit = totalContentSections >= 24;
  const hasInvalidPage = pages.filter((p) => p.selected).some((p) => !p.sections.some((s) => !s.locked));
  const atLimit = atPageLimit || atSectionLimit;

  const togglePage = (pageId: string) =>
    setPages((prev) => prev.map((p) => p.id === pageId ? { ...p, selected: !p.selected } : p));

  const updateSections = (pageId: string, fn: (s: Section[]) => Section[]) =>
    setPages((prev) => prev.map((p) => p.id === pageId ? { ...p, sections: fn(p.sections) } : p));

  const deleteSection = (pageId: string, sectionId: string) =>
    updateSections(pageId, (s) => s.filter((sec) => sec.id !== sectionId));

  const duplicateSection = (pageId: string, sectionId: string) =>
    updateSections(pageId, (s) => {
      const idx = s.findIndex((sec) => sec.id === sectionId);
      if (idx < 0) return s;
      const copy = { ...s[idx], id: sid(), name: s[idx].name + " (Copy)", locked: false };
      return [...s.slice(0, idx + 1), copy, ...s.slice(idx + 1)];
    });

  const addSection = (pageId: string, name: string) => {
    updateSections(pageId, (s) => {
      const footerIdx = s.findIndex((sec) => sec.locked && sec.name === "Footer");
      const newSec: Section = {
        id: sid(),
        name,
        templateId: unlockedSections.find((item) => item.label === name)?.id,
      };
      if (footerIdx >= 0) return [...s.slice(0, footerIdx), newSec, ...s.slice(footerIdx)];
      return [...s, newSec];
    });
    setAddModal(null);
  };

  const commitRename = () => {
    if (!renaming) return;
    updateSections(renaming.pageId, (s) =>
      s.map((sec) => sec.id === renaming.sectionId ? { ...sec, name: renaming.value } : sec)
    );
    setRenaming(null);
  };

  const onDragStart = (pageId: string, sectionId: string) => setDrag({ pageId, sectionId });

  const onDragEnter = (pageId: string, sectionId: string) => setDragOver({ pageId, sectionId });

  const onDrop = (targetPageId: string, targetSectionId: string) => {
    if (!drag) { setDrag(null); setDragOver(null); return; }
    const isCrossPage = drag.pageId !== targetPageId;
    if (isCrossPage) {
      // Move section from source page to target page, inserting before the drop target
      setPages((prev) => {
        const srcPage = prev.find((p) => p.id === drag.pageId);
        if (!srcPage) return prev;
        const movingSec = srcPage.sections.find((s) => s.id === drag.sectionId);
        if (!movingSec || movingSec.locked) return prev;
        return prev.map((p) => {
          if (p.id === drag.pageId) {
            return { ...p, sections: p.sections.filter((s) => s.id !== drag.sectionId) };
          }
          if (p.id === targetPageId) {
            const toIdx = p.sections.findIndex((s) => s.id === targetSectionId);
            const insertAt = toIdx >= 0 ? toIdx : p.sections.length - 1; // before footer
            const next = [...p.sections];
            next.splice(insertAt, 0, movingSec);
            return { ...p, sections: next };
          }
          return p;
        });
      });
    } else {
      updateSections(targetPageId, (s) => {
        const fromIdx = s.findIndex((sec) => sec.id === drag.sectionId);
        const toIdx = s.findIndex((sec) => sec.id === targetSectionId);
        if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return s;
        // Prevent moving locked sections or dropping onto locked sections
        if (s[fromIdx].locked || s[toIdx].locked) return s;
        const item = s[fromIdx];
        const next = [...s];
        next.splice(fromIdx, 1);
        next.splice(toIdx, 0, item);
        return next;
      });
    }
    setDrag(null);
    setDragOver(null);
  };

  return (
    <ScaledPage
      scrollable
      header={
        <>
          <TopHeader />
          <SubNav
            activeStep={3}
            completedUpTo={completedUpTo}
            onBack={onBack}
            onNext={busy ? undefined : continueGeneration}
            onStepClick={onStepClick}
            nextLabel="Review & Generate"
          />
        </>
      }
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Close menus on outside click */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => { setOpenMenu(null); }}
        >
          <div className="px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(16px,4vw,32px)]">
            {/* Header */}
            <div className="flex flex-col gap-[16px]">
              {atLimit && (
                <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M8 2L1.5 13.5h13L8 2z" stroke="#f87171" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                    <path d="M8 6.5v3" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8" cy="11.5" r="0.75" fill="#f87171"/>
                  </svg>
                  <div>
                    <p style={{ color: "#f87171", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Maximum selection reached</p>
                    <p style={{ color: "rgba(248,113,113,0.7)", fontSize: 12, lineHeight: 1.6 }}>
                      You have reached the maximum of 6 pages and 24 content sections. Remove existing pages or sections before adding more.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-white font-semibold mb-[8px]" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Pick your pages</h2>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500 }}>
                    Select pages and drag sections to reorder them
                  </p>
                </div>
                <span className="font-semibold text-[13px]" style={{ color: "#6fccdd" }}>
                  {pages.filter((p) => p.selected).length} of 6 pages selected
                </span>
              </div>
            </div>

            {/* Page cards grid — 1 col mobile, 2 tablet, 3 desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="flex flex-col gap-[16px] p-[20px]"
                  onClick={() => {
                    const hasContent = page.sections.some((s) => !s.locked);
                    if (!hasContent || (!page.selected && atPageLimit)) return;
                    togglePage(page.id);
                  }}
                  style={{
                    backdropFilter: "blur(12px)",
                    background: page.selected ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                    borderRadius: 16,
                    border: page.selected ? "1px solid white" : "1px solid rgba(255,255,255,0.15)",
                    opacity: page.selected ? 1 : (
                      !page.sections.some((s) => !s.locked) ? 0.4
                      : atPageLimit ? 0.25
                      : 0.5
                    ),
                    transition: "opacity 0.2s, border 0.2s",
                    cursor: (!page.sections.some((s) => !s.locked) || (!page.selected && atPageLimit)) ? "not-allowed" : "pointer",
                  }}
                >
                  {/* Card header */}
                  <div
                    className="flex items-center justify-between pb-[16px]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span className="text-white font-semibold text-[18px] leading-[28px]">{page.name}</span>
                    <button onClick={(e) => e.stopPropagation()} className="shrink-0">
                      {page.selected ? (
                        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                          <path d={svgPathsCatMood.p1e585400} fill="#6FCCDD" fillRule="evenodd" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <circle cx="11" cy="11" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* No-content warning */}
                  {!page.sections.some((s) => !s.locked) && (
                    <p style={{ color: "rgba(248,113,113,0.85)", fontSize: 12, lineHeight: 1.55, marginTop: -4 }}>
                      A page requires at least one content section.
                    </p>
                  )}

                  {/* Sections list — drag-and-drop */}
                  <div className="flex flex-col gap-[4px]">
                    {page.sections.map((section) => {
                      const isMenuOpen = openMenu?.pageId === page.id && openMenu?.sectionId === section.id;
                      const isDragging = drag?.pageId === page.id && drag?.sectionId === section.id;
                      const isOver = dragOver?.pageId === page.id && dragOver?.sectionId === section.id;
                      const isLastContent = !section.locked && page.sections.filter((s) => !s.locked).length <= 1;

                      return (
                        <div
                          key={section.id}
                          draggable={!section.locked}
                          onClick={(e) => e.stopPropagation()}
                          onDragStart={() => !section.locked && onDragStart(page.id, section.id)}
                          onDragEnter={() => onDragEnter(page.id, section.id)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => onDrop(page.id, section.id)}
                          onDragEnd={() => { setDrag(null); setDragOver(null); }}
                          className="flex items-center gap-[10px] px-[12px] py-[10px] rounded-[8px] relative"
                          style={{
                            background: isOver ? "rgba(111,204,221,0.1)" : "rgba(255,255,255,0.04)",
                            border: isOver ? "1px solid rgba(111,204,221,0.4)" : "1px solid rgba(255,255,255,0.06)",
                            opacity: isDragging ? 0.4 : 1,
                            cursor: section.locked ? "default" : "grab",
                            transition: "background 0.15s, border 0.15s, opacity 0.15s",
                          }}
                        >
                          {/* Drag handle — hidden for locked sections */}
                          {!section.locked && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
                              {[2, 6, 10].map((x) => [3, 7, 11].map((y) => (
                                <circle key={`${x}-${y}`} cx={x} cy={y} r={1} fill="white" />
                              )))}
                            </svg>
                          )}

                          {/* Section name */}
                          <span
                            className="flex-1 font-medium text-[12px] sm:text-[13px] truncate"
                            style={{ color: section.locked ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)" }}
                          >
                            {section.name}
                          </span>

                          {/* Lock badge */}
                          {section.locked && (
                            <span
                              className="font-semibold text-[9px] sm:text-[10px] uppercase"
                              style={{ color: "#6fccdd", letterSpacing: "0.08em", flexShrink: 0 }}
                            >
                              locked
                            </span>
                          )}

                          {/* 3-dot menu — content sections only, Delete only */}
                          {!section.locked && (
                            <div className="relative shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenu(isMenuOpen ? null : { pageId: page.id, sectionId: section.id });
                                }}
                                className="flex items-center justify-center rounded"
                                style={{ width: 20, height: 20 }}
                              >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  {[2, 7, 12].map((cy) => (
                                    <circle key={cy} cx={7} cy={cy} r={1.2} fill="rgba(255,255,255,0.5)" />
                                  ))}
                                </svg>
                              </button>

                              {isMenuOpen && (
                                <div
                                  className="absolute right-0 flex flex-col overflow-hidden z-50"
                                  style={{
                                    top: 24,
                                    width: 200,
                                    background: "#1a1a1a",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 10,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {isLastContent ? (
                                    <div style={{ padding: "12px 14px" }}>
                                      <p style={{ color: "rgba(248,113,113,0.85)", fontSize: 12, lineHeight: 1.55 }}>
                                        A page must contain at least one content section. Add another section or remove this page.
                                      </p>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => { deleteSection(page.id, section.id); setOpenMenu(null); }}
                                      className="flex items-center gap-[10px] px-[14px] py-[10px] font-medium text-[13px] text-left w-full"
                                      style={{ color: "#f87171", background: "transparent" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
                                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                    >
                                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 4h9M5 4V3a1 1 0 011-1h3a1 1 0 011 1v1M10 7v5M7 7v5M4 4l.6 8.1A1 1 0 005.6 13h3.8a1 1 0 001-.9L11 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      Delete section
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Add section button — 24 content-section global limit */}
                  {(() => {
                    const totalContent = pages.filter((p) => p.selected).reduce((n, p) => n + p.sections.filter((s) => !s.locked).length, 0);
                    const atContentLimit = totalContent >= 24;
                    return (
                      <div className="relative">
                        <button
                          disabled={atContentLimit}
                          onClick={(e) => { e.stopPropagation(); if (!atContentLimit) setAddModal(addModal === page.id ? null : page.id); }}
                          className="flex items-center justify-center gap-[8px] py-[10px] rounded-[8px] font-semibold text-[13px] w-full transition-colors"
                          style={{
                            border: atContentLimit ? "1px dashed rgba(255,255,255,0.08)" : "1px dashed rgba(255,255,255,0.2)",
                            color: atContentLimit ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.4)",
                            cursor: atContentLimit ? "not-allowed" : "pointer",
                          }}
                          onMouseEnter={(e) => { if (!atContentLimit) { (e.currentTarget as HTMLElement).style.color = "#6fccdd"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(111,204,221,0.4)"; } }}
                          onMouseLeave={(e) => { if (!atContentLimit) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; } }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          Add section
                        </button>

                        {/* Add section dropdown */}
                        {!atContentLimit && addModal === page.id && (
                          <div
                            className="absolute left-0 right-0 z-50 overflow-hidden"
                            style={{
                              bottom: "calc(100% + 8px)",
                              background: "#1a1a1a",
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 12,
                              boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="px-[14px] py-[10px]" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                              <p className="font-semibold text-[11px] uppercase" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                                Add section
                              </p>
                            </div>
                            <div className="flex flex-col max-h-[200px] overflow-y-auto">
                              {unlockedSections.filter((item) => !page.sections.some((s) => s.templateId === item.id)).map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => addSection(page.id, item.label)}
                                  className="flex items-center gap-[10px] px-[14px] py-[9px] font-medium text-[13px] text-left w-full"
                                  style={{ color: "rgba(255,255,255,0.8)", background: "transparent" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(111,204,221,0.08)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 2v8M2 6h8" stroke="#6fccdd" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Section limit tooltip */}
                        {atContentLimit && addModal === page.id && (
                          <div
                            className="absolute left-0 right-0 z-50"
                            style={{
                              bottom: "calc(100% + 8px)",
                              background: "#1a1a1a",
                              border: "1px solid rgba(248,113,113,0.25)",
                              borderRadius: 10,
                              padding: "12px 14px",
                              boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p style={{ color: "rgba(248,113,113,0.85)", fontSize: 12, lineHeight: 1.55 }}>
                              Section limit reached. Remove a section from another page before adding a new one.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>

            {/* JSON summary strip */}
            <div
              className="flex flex-col sm:flex-row sm:items-center items-stretch justify-between gap-3 px-[20px] py-[14px] rounded-[12px]"
              style={{ background: "rgba(111,204,221,0.05)", border: "1px solid rgba(111,204,221,0.15)" }}
            >
              <div>
                <p className="text-white font-semibold text-[14px]">
                  {pages.filter((p) => p.selected).length} pages · {totalContentSections} content sections
                </p>
                <p className="font-medium text-[12px] mt-[2px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {pages.filter((p) => p.selected).map((p) => p.name).join(", ")}
                </p>
              </div>
              <div className="flex flex-col items-stretch sm:items-end gap-[6px]">
                {(() => {
                  const canGenerate = selectedPageCount > 0 && !hasInvalidPage && !atSectionLimit;
                  return (
                    <>
                      <button
                        onClick={!busy ? continueGeneration : undefined}
                        disabled={busy}
                        className="font-semibold text-[14px] uppercase px-[24px] py-[12px] rounded-[8px] w-full sm:w-auto"
                        style={{
                          background: busy ? "rgba(255,255,255,0.08)" : "#6fccdd",
                          color: busy ? "rgba(255,255,255,0.25)" : "#0b0b0b",
                          cursor: busy ? "not-allowed" : "pointer",
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                         {busy ? "Saving..." : "Review & Generate"}
                      </button>
                      {!canGenerate && (
                        <p style={{ color: "rgba(248,113,113,0.8)", fontSize: 11, textAlign: "right", maxWidth: 240 }}>
                          {selectedPageCount === 0
                            ? "Select at least one page to continue."
                            : hasInvalidPage
                            ? "Fix page configuration issues before continuing."
                            : "Remove sections to stay within the 24-section limit."}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
            <ValidationError message={firstValidationError(errors)} />
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}
