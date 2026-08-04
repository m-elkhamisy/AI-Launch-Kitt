import type { Section } from "./page-layout";

/**
 * One draggable section inside a page card. Locked sections (navigation and
 * footer) render without a drag handle or menu, so they cannot be moved or
 * removed.
 */
export function SectionRow({
  section,
  isMenuOpen,
  isDragging,
  isOver,
  isLastContent,
  onToggleMenu,
  onDelete,
  onDragStart,
  onDragEnter,
  onDrop,
  onDragEnd,
}: {
  section: Section;
  isMenuOpen: boolean;
  isDragging: boolean;
  isOver: boolean;
  isLastContent: boolean;
  onToggleMenu: () => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
}) {
  return (
    <div
      key={section.id}
      draggable={!section.locked}
      onClick={(e) => e.stopPropagation()}
      onDragStart={() => onDragStart()}
      onDragEnter={() => onDragEnter()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop()}
      onDragEnd={() => onDragEnd()}
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
              onToggleMenu();
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
                  onClick={() => { onDelete(); }}
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
}
