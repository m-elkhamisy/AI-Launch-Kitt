import { useState } from "react";

import type { ShowcaseSlide } from "./showcase-slides";

// One capability panel. Geometry is from Figma 249:7741 — 48/32 padding, a 42px
// column gap, and a 736x472 mockup box.
//
// Named *View so it does not collide with the ShowcaseSlide type.
export function ShowcaseSlideView({
  slide,
  eager = false,
}: {
  slide: ShowcaseSlide;
  /** The first slide loads immediately; the rest defer so the screen paints sooner. */
  eager?: boolean;
}) {
  // A failed mockup must not collapse the panel or leave a broken-image icon —
  // the badge, headline, copy and figures still carry the message on their own.
  const [mockupFailed, setMockupFailed] = useState(false);
  const loading = eager ? "eager" : "lazy";

  // Bottom padding is 82px rather than 32px: the indicator strip is positioned over
  // the panel by ShowcaseCarousel — one set for all slides, rather than the
  // per-panel copy Figma draws — so each slide reserves the 32px panel padding plus
  // the 42px column gap and the 8px dots.
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-[42px] overflow-hidden px-6 pt-8 pb-[82px] lg:px-[48px] lg:pt-[32px]"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      {/* Tinted grid texture, one per capability. Decorative, so it stays out of the a11y tree. */}
      <img
        src={slide.textureSrc}
        alt=""
        aria-hidden="true"
        loading={loading}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.8 }}
      />

      <div className="relative flex w-full flex-col items-center gap-[16px]">
        <div
          className="flex items-center gap-[12px] rounded-full px-[16px] py-[8px]"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <slide.BadgeIcon size={20} color={slide.accent} aria-hidden="true" />
          <span
            className="whitespace-nowrap font-medium"
            style={{ color: slide.accent, fontSize: 14, lineHeight: "20px" }}
          >
            {slide.badgeLabel}
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-[8px] text-center">
          {/* Figma stores sentence case and title-cases it in CSS; keep both so the
              stored copy stays readable and the rendered result matches the design. */}
          <h2
            className="w-full font-bold capitalize text-white"
            style={{ fontSize: 24, lineHeight: "32px" }}
          >
            {slide.headline}
          </h2>
          <p
            className="w-full font-medium text-white"
            style={{ fontSize: 14, lineHeight: "20px", opacity: 0.6 }}
          >
            {slide.subcopy}
          </p>
        </div>
      </div>

      {/* The mockup absorbs the leftover height instead of forcing its design size.
          Figma draws this panel at 900px tall; on a shorter viewport a fixed 472px
          mockup pushed the whole page into a vertical scroll. Flex gives the box a
          definite size before the image loads, so nothing shifts either way, and
          object-contain keeps the aspect ratio at whatever height it ends up with. */}
      <div
        className="relative w-full min-h-0 flex-1"
        style={{ maxWidth: 736, maxHeight: 472 }}
      >
        {!mockupFailed && (
          <img
            src={slide.mockupSrc}
            alt={slide.mockupAlt}
            width={736}
            height={472}
            loading={loading}
            onError={() => setMockupFailed(true)}
            className="h-full w-full object-contain"
          />
        )}
      </div>

      <div
        className="relative flex w-full flex-wrap items-center justify-between gap-y-4 rounded-[16px] p-[26px]"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(43.5px)",
        }}
      >
        {slide.stats.map((stat, index) => (
          <div key={stat.value} className="flex items-center gap-[26px]">
            {index > 0 && (
              <span
                aria-hidden="true"
                style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }}
              />
            )}
            <div className="flex flex-col gap-[6px]">
              <span
                className="font-semibold text-white"
                style={{ fontSize: 14, lineHeight: "20px" }}
              >
                {stat.value}
              </span>
              <span
                className="flex items-center gap-[4px] font-medium text-white"
                style={{ fontSize: 12, lineHeight: "20px" }}
              >
                {stat.rating && (
                  <span
                    aria-hidden="true"
                    className="font-semibold"
                    style={{ color: slide.accent, fontSize: 14 }}
                  >
                    ★★★★★
                  </span>
                )}
                <span style={{ opacity: 0.5 }}>{stat.caption}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
