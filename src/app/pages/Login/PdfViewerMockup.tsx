import { History, Minus, MoreVertical, PanelRight, Plus, Search } from "lucide-react";

import { MockupFrame } from "./MockupFrame";
import { RAIL_LEAD_MS, RAIL_STAGGER_MS, riseIn } from "./showcase-motion";
import type { ShowcasePage } from "./showcase-slides";
import { usePageCycle } from "./usePageCycle";

// The document preview shown on the portfolio slide, rebuilt from its pages so it
// can turn them. Geometry is Figma 249:7911: a 686x472 window, a 28px title bar,
// a 298x420 open sheet, and a 79x110 thumbnail rail two columns wide.
//
// It replaces a flat export of the same frame. Rebuilt rather than animated over
// the top because a page turn has to change what the sheet *shows*, which a single
// baked image cannot do — and the five page exports together come to less than the
// one flat PNG did, so the swap costs nothing in payload.

// The design's own frame. MockupFrame makes 1em one of its pixels, so every
// measurement below is the Figma number.
const DESIGN_WIDTH = 686;
const DESIGN_HEIGHT = 472;

/** The design rings the open page in brand teal, not in the slide's accent. */
const ACTIVE_RING = "#6fccdd";

// Five pages at this interval walk the whole document in 12s, inside the 15s the
// carousel leaves each slide, so a visitor who waits sees every page exactly once
// and the sheet is back on page one as the slide changes.
const PAGE_INTERVAL_MS = 2400;

/** macOS window buttons, in their fixed order. */
const WINDOW_BUTTONS = ["#f55951", "#fac21c", "#25c136"];

export function PdfViewerMockup({
  fileName,
  pages,
  alt,
  active,
  eager = false,
}: {
  fileName: string;
  pages: readonly ShowcasePage[];
  /** Describes the capability — the viewer stands in for it as one image. */
  alt: string;
  /** True while this slide is the carousel's selection. */
  active: boolean;
  /** The first slide loads immediately; the rest defer so the screen paints sooner. */
  eager?: boolean;
}) {
  // Under reduced motion this holds page one and starts no timer, so the viewer is
  // simply a still of the open document.
  const openPage = usePageCycle({
    count: pages.length,
    intervalMs: PAGE_INTERVAL_MS,
    active,
  });

  return (
    <MockupFrame
      designWidth={DESIGN_WIDTH}
      designHeight={DESIGN_HEIGHT}
      alt={alt}
      active={active}
    >
      {({ settled, reducedMotion }) => {
        const ease = (declaration: string) => (reducedMotion ? undefined : declaration);
        return (
          <>
            <TitleBar fileName={fileName} />

            <div
              className="flex min-h-0 flex-1 items-center justify-center"
              style={{
                gap: "24em",
                padding: "12em 72em",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(37em)",
                borderBottomLeftRadius: "12em",
                borderBottomRightRadius: "12em",
              }}
            >
              {/* The open sheet. All pages are mounted and stacked; only opacity and
                  transform change on a turn, so a turn never triggers layout. The
                  sheet carries its own fill so a page that fails to load still reads
                  as a sheet rather than as a hole in the window. */}
              <div
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: "298em",
                  height: "420em",
                  border: "1em solid rgba(255,255,255,0.2)",
                  background: "#131a2a",
                }}
              >
                {pages.map((page, index) => (
                  <img
                    key={page.src}
                    src={page.src}
                    alt=""
                    aria-hidden="true"
                    loading={eager && index === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      opacity: index === openPage ? 1 : 0,
                      // Pages already passed sit above and pages still to come sit
                      // below, so a turn reads as scrolling down through the
                      // document rather than as a plain cross-fade.
                      transform:
                        index === openPage
                          ? "none"
                          : `translateY(${index < openPage ? "-10em" : "10em"})`,
                      transition: ease(
                        "opacity 540ms ease, transform 620ms cubic-bezier(0.22,0.61,0.36,1)",
                      ),
                    }}
                  />
                ))}
              </div>

              {/* Thumbnail rail: three rows filled top-to-bottom then across, which
                  is how the design orders 1-2-3 down the first column and 4-5 down
                  the second. Column flow keeps DOM order the same as page order. */}
              <div
                className="grid shrink-0"
                style={{
                  gridTemplateRows: "repeat(3, auto)",
                  gridAutoFlow: "column",
                  gap: "12em",
                }}
              >
                {pages.map((page, index) => (
                  <div
                    key={page.src}
                    className="flex flex-col items-center"
                    style={{
                      gap: "10em",
                      // Staggered so the rail fills in as though the pages were
                      // being generated one after another.
                      ...riseIn({
                        settled,
                        reducedMotion,
                        delayMs: RAIL_LEAD_MS + index * RAIL_STAGGER_MS,
                        distance: "8em",
                      }),
                    }}
                  >
                    <div
                      className="relative"
                      style={{
                        width: "79em",
                        height: "110em",
                        // outline rather than border: it is drawn outside the box, so
                        // the ring can appear and travel without shifting the rail.
                        outline: `1.5em solid ${index === openPage ? ACTIVE_RING : "transparent"}`,
                        outlineOffset: "2em",
                        transition: ease("outline-color 360ms ease"),
                      }}
                    >
                      <img
                        src={page.src}
                        alt=""
                        aria-hidden="true"
                        loading={eager && index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span
                      className="font-semibold text-white"
                      style={{ fontSize: "11em", lineHeight: 1 }}
                    >
                      {page.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      }}
    </MockupFrame>
  );
}

// The window's chrome. Static decoration — the controls are drawn, not wired, so
// none of them is a button.
function TitleBar({ fileName }: { fileName: string }) {
  return (
    <div
      className="flex shrink-0 items-center"
      style={{
        height: "28em",
        padding: "0 12em",
        background: "#1a1e26",
        borderTopLeftRadius: "12em",
        borderTopRightRadius: "12em",
      }}
    >
      {/* The 40px offset is a gap on this row rather than a margin on the filename:
          beside a font-size, an em margin would resolve against 8px, not 1px. */}
      <div className="flex items-center" style={{ gap: "40em" }}>
        <div className="flex items-center" style={{ gap: "4.5em" }}>
          {WINDOW_BUTTONS.map((colour) => (
            <span
              key={colour}
              className="rounded-full"
              style={{ width: "7em", height: "7em", background: colour }}
            />
          ))}
        </div>

        <span
          className="whitespace-nowrap font-semibold text-white"
          style={{ fontSize: "8em" }}
        >
          {fileName}
        </span>
      </div>

      <span className="flex-1" />

      {/* Zoom cluster, then the window's own tools, at the spacing the design uses. */}
      <div className="flex items-center" style={{ gap: "65em" }}>
        <div className="flex items-center" style={{ gap: "10em" }}>
          <Minus size="7em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
          <span
            className="whitespace-nowrap font-medium text-white"
            style={{ fontSize: "8em" }}
          >
            100%
          </span>
          <Plus size="7em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
          <span
            style={{
              width: "1em",
              height: "10em",
              margin: "0 8em",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <PanelRight size="7em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
          <History size="7em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
        </div>
        <div className="flex items-center" style={{ gap: "12em" }}>
          <Search size="7em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
          <MoreVertical size="7em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
