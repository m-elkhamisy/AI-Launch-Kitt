import {
  ChevronDown,
  ChevronUp,
  CornerUpRight,
  Highlighter,
  MessageCircle,
  MoreVertical,
  PenLine,
  Search,
  Star,
  Type,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { MockupFrame } from "./MockupFrame";
import type { ShowcasePage } from "./showcase-slides";
import { usePageCycle } from "./usePageCycle";

// The brochure preview, rebuilt from Figma 249:7818 so it can turn its spreads:
// a 736x472 window, a black title bar, a 518x366 spread, and a floating page rail.
//
// A different window from the portfolio's — that one is a macOS Preview with a
// thumbnail grid, this one is an editor with a toolbar and a side rail — so it is
// its own component rather than a variant. Both share MockupFrame, which is where
// the scaling, the accessible name and the entrance actually live.
//
// Rebuilt rather than overlaid on the flat export because the chrome here is all
// flat fills and vector icons, so reproducing it leaves no seam to match, and the
// rail has to show which spread is open.

const DESIGN_WIDTH = 736;
const DESIGN_HEIGHT = 472;

// Two spreads, so a slower turn than the portfolio's five pages: this shows spread
// one, spread two, then back, across the 15s the carousel leaves the slide.
const PAGE_INTERVAL_MS = 5000;

/** The toolbar's tools, in the design's order. Drawn, not wired. */
const TOOLBAR_ICONS = [
  Search,
  Star,
  CornerUpRight,
  MessageCircle,
  Highlighter,
  Type,
  PenLine,
  MoreVertical,
  X,
];

export function BrochureViewerMockup({
  fileName,
  fileMeta,
  pages,
  alt,
  active,
  eager = false,
}: {
  fileName: string;
  /** The saved-at line under the filename. */
  fileMeta: string;
  pages: readonly ShowcasePage[];
  /** Describes the capability — the viewer stands in for it as one image. */
  alt: string;
  /** True while this slide is the carousel's selection. */
  active: boolean;
  /** The first slide loads immediately; the rest defer so the screen paints sooner. */
  eager?: boolean;
}) {
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
      {({ reducedMotion }) => {
        const ease = (declaration: string) => (reducedMotion ? undefined : declaration);
        return (
          <>
            <div
              className="flex shrink-0 items-center justify-between"
              style={{
                padding: "8.044em 24em",
                background: "#000000",
                borderTopLeftRadius: "12em",
                borderTopRightRadius: "12em",
              }}
            >
              <div className="flex flex-col" style={{ gap: "2.681em" }}>
                <span
                  className="whitespace-nowrap font-semibold text-white"
                  // Unitless: an em line-height would resolve against 9.384px, not 1px.
                  style={{ fontSize: "9.384em", lineHeight: 13.406 / 9.384 }}
                >
                  {fileName}
                </span>
                <span
                  className="whitespace-nowrap font-medium text-white"
                  style={{ fontSize: "8.044em", lineHeight: 13.406 / 8.044, opacity: 0.5 }}
                >
                  {fileMeta}
                </span>
              </div>

              <div className="flex items-center" style={{ gap: "21.45em" }}>
                <div
                  className="flex items-center"
                  style={{
                    gap: "5.362em",
                    padding: "8.044em 10.725em",
                    border: "0.67em solid rgba(255,255,255,0.1)",
                    borderRadius: "67em",
                  }}
                >
                  <PenLine size="10.725em" color="#ffffff" aria-hidden="true" />
                  <span
                    className="whitespace-nowrap font-semibold text-white"
                    style={{ fontSize: "8em", lineHeight: 13.406 / 8 }}
                  >
                    Edit PDF
                  </span>
                  <ChevronDown size="10.725em" color="#ffffff" aria-hidden="true" />
                </div>

                <div className="flex items-center" style={{ gap: "16em" }}>
                  {TOOLBAR_ICONS.map((Icon, index) => (
                    <Icon
                      key={index}
                      size="12em"
                      color="rgba(255,255,255,0.8)"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* The spread, and the rail floating over the body's right margin. */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center"
              style={{
                padding: "12em 72em",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(37em)",
                borderBottomLeftRadius: "12em",
                borderBottomRightRadius: "12em",
              }}
            >
              {/* Both spreads are mounted and stacked, so a turn only changes
                  opacity and transform and never triggers layout. The box carries
                  its own fill so a spread that fails to load still reads as paper. */}
              <div
                className="relative shrink-0 overflow-hidden"
                style={{ width: "518em", height: "366em", background: "#f0fdf4" }}
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
                      // Matches the rail's up/down chevrons: the spread already
                      // passed sits above, the one still to come sits below.
                      transform:
                        index === openPage
                          ? "none"
                          : `translateY(${index < openPage ? "-12em" : "12em"})`,
                      transition: ease(
                        "opacity 560ms ease, transform 660ms cubic-bezier(0.22,0.61,0.36,1)",
                      ),
                    }}
                  />
                ))}
              </div>

              <div
                className="absolute flex flex-col items-stretch"
                style={{
                  left: "651em",
                  top: "114.5em",
                  gap: "10em",
                  padding: "6em",
                  background: "#000000",
                  border: "1em solid rgba(255,255,255,0.1)",
                  borderRadius: "11em",
                }}
              >
                <div className="flex flex-col">
                  {pages.map((page, index) => (
                    <span
                      key={page.src}
                      className="flex items-center justify-center"
                      style={{
                        // Sizes stay on this node: `em` is one design pixel only
                        // while the element has not changed its own font-size.
                        width: "24em",
                        height: "24em",
                        borderRadius: "6em",
                        background:
                          index === openPage ? "rgba(255,255,255,0.1)" : "transparent",
                        transition: ease("background-color 360ms ease"),
                      }}
                    >
                      <span className="font-semibold text-white" style={{ fontSize: "8em" }}>
                        {page.label}
                      </span>
                    </span>
                  ))}
                </div>

                <RailDivider />
                <RailGroup icons={[ChevronUp, ChevronDown]} />
                <RailDivider />
                <RailGroup icons={[ZoomIn, ZoomOut]} />
              </div>
            </div>
          </>
        );
      }}
    </MockupFrame>
  );
}

function RailDivider() {
  return <span style={{ height: "1em", background: "rgba(255,255,255,0.1)" }} />;
}

function RailGroup({ icons }: { icons: readonly typeof ChevronUp[] }) {
  return (
    <div className="flex flex-col">
      {icons.map((Icon, index) => (
        <span
          key={index}
          className="flex items-center justify-center"
          style={{ width: "24em", height: "24em" }}
        >
          <Icon size="16em" color="rgba(255,255,255,0.8)" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}
