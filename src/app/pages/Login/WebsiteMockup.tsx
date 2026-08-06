import { MockupFrame } from "./MockupFrame";
import { usePageCycle } from "./usePageCycle";

// The website slide's mockup: the flat export of Figma 249:7741, with the desktop
// nav re-rendered on top so its active section can sweep.
//
// Overlaid rather than rebuilt, unlike the two document viewers. Their chrome is
// flat fills and vector icons, so reproducing it leaves nothing to match. This one
// is a photographic composite — a tablet and a phone showing a generated site — and
// rebuilding it would mean reproducing the devices, the page and its photography,
// for the sake of one strip. The nav band happens to sit on a flat #100902 fill
// (verified across the whole strip), so covering just that strip is seamless.
//
// The nav can only change its active *item*: the desktop art is a single viewport
// tall, so there is no second section to scroll or cross-fade to.

/** Natural size of the export, which is what the em measurements below refer to. */
const DESIGN_WIDTH = 742;
const DESIGN_HEIGHT = 476;

// The nav band, measured off the export. The fill is sampled from the band itself,
// so the patch that hides the baked labels is invisible against its surroundings.
const NAV_FILL = "#100902";
const NAV_LEFT = 221;
const NAV_TOP = 26.5;
const NAV_WIDTH = 196;
const NAV_HEIGHT = 18;

/** Inactive labels: the warm off-white the export uses, not pure white. */
const NAV_IDLE = "rgba(245,238,230,0.72)";

// Five sections across the 15s the carousel leaves the slide.
const SECTION_INTERVAL_MS = 2800;

/**
 * The nav items, with each one's centre and width taken from where its baked glyphs
 * actually sit in the export, relative to the band. Keeping the design's uneven
 * rhythm rather than spacing them evenly is what makes the patch invisible.
 *
 * The glyphs occupy rows 30-41 and columns 227-412 of the export, so the band above
 * covers them completely while clearing the nav's own bottom rule at rows 50-51.
 */
const NAV_ITEMS = [
  { label: "Home", centre: 16, width: 21 },
  { label: "About", centre: 55, width: 21 },
  { label: "Portfolio", centre: 98, width: 29 },
  { label: "Blog", centre: 139, width: 15 },
  { label: "Contact", centre: 178.5, width: 26 },
] as const;

export function WebsiteMockup({
  src,
  alt,
  accent,
  active,
  eager = false,
}: {
  src: string;
  /** Describes the capability — the mockup stands in for it as one image. */
  alt: string;
  /** The slide's accent, which the export uses for the active nav item. */
  accent: string;
  /** True while this slide is the carousel's selection. */
  active: boolean;
  eager?: boolean;
}) {
  const openSection = usePageCycle({
    count: NAV_ITEMS.length,
    intervalMs: SECTION_INTERVAL_MS,
    active,
  });
  const current = NAV_ITEMS[openSection] ?? NAV_ITEMS[0];

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
            <img
              src={src}
              alt=""
              aria-hidden="true"
              width={DESIGN_WIDTH}
              height={DESIGN_HEIGHT}
              loading={eager ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div
              className="absolute"
              style={{
                left: `${NAV_LEFT}em`,
                top: `${NAV_TOP}em`,
                width: `${NAV_WIDTH}em`,
                height: `${NAV_HEIGHT}em`,
                background: NAV_FILL,
              }}
            >
              {NAV_ITEMS.map((item, index) => (
                // Two elements on purpose. `em` resolves against an element's own
                // font-size, so `left` and `height` have to sit on a node that has
                // not changed it — putting both here would multiply them by 7.
                <span
                  key={item.label}
                  className="absolute flex items-center justify-center whitespace-nowrap"
                  style={{
                    left: `${item.centre}em`,
                    top: 0,
                    height: "15em",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "7em",
                      fontWeight: index === openSection ? 600 : 500,
                      color: index === openSection ? accent : NAV_IDLE,
                      transition: ease("color 420ms ease"),
                    }}
                  >
                    {item.label}
                  </span>
                </span>
              ))}

              {/* Not in the design, which only ever draws one nav state: at this
                  size a colour change alone is too small to read as movement, so
                  the underline is what actually carries the sweep. */}
              <span
                className="absolute"
                style={{
                  left: `${current.centre - current.width / 2}em`,
                  width: `${current.width}em`,
                  top: "15.5em",
                  height: "1.5em",
                  borderRadius: "1em",
                  background: accent,
                  transition: ease(
                    "left 520ms cubic-bezier(0.22,0.61,0.36,1), width 520ms cubic-bezier(0.22,0.61,0.36,1)",
                  ),
                }}
              />
            </div>
          </>
        );
      }}
    </MockupFrame>
  );
}
