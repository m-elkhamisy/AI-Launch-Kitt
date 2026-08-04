# Phase 0 Research: Auth screen showcase carousel

Every decision below was checked against the installed tree, not assumed from documentation.

## D1 — How to auto-advance

**Decision**: drive advancing ourselves. Pass `setApi` to the existing `<Carousel>` to capture the
embla instance, then a page-local `useAutoAdvance(api, { intervalMs: 15000 })` hook calls
`api.scrollNext()` on a `window.setInterval`.

**Rationale**: three requirements have to hold at once — advance every 15 s (FR-010), stop
permanently once the visitor selects an indicator (FR-012), and never advance under reduced motion
(FR-013). A single hook owning one timer expresses all three and is unit-testable with fake timers.
`components/ui/carousel.tsx:22` already exposes `setApi`, so no edit to the dormant component is
needed.

**Alternatives considered**:

- **`embla-carousel-autoplay` plugin** — rejected. Verified **not installed**
  (`node_modules/embla-carousel-autoplay` absent; only `embla-carousel`, `embla-carousel-react`, and
  `embla-carousel-reactive-utils` at 8.6.0). Adding it would be a new dependency for behaviour we
  still have to wrap, since the plugin's `stopOnInteraction` restarts on some events and it has no
  concept of `prefers-reduced-motion`.
- **A `setTimeout` chain keyed on the selected index** — rejected as more state for no gain; a single
  interval cleared on stop is simpler and easier to assert.
- **CSS-only animation** — rejected: cannot satisfy the click-to-jump requirement (FR-012) or expose
  which slide is current to assistive technology.

## D2 — Reduced motion

**Decision**: read `window.matchMedia("(prefers-reduced-motion: reduce)")` inside the hook; when it
matches, never start the interval. Subscribe to `change` so toggling the OS setting mid-visit takes
effect, and clean up the listener.

**Rationale**: FR-013 requires no automatic change under reduced motion while keeping the indicators
working. This is the only correct source for that signal.

**Constitution note**: `AGENTS.md` and the constitution forbid JS device detection. This is not device
detection — it is a user preference that changes behaviour, not layout, and cannot be expressed in CSS
because it must suppress a timer. The narrow-viewport rule (D4) stays CSS-only, as required.

**Guard**: `matchMedia` is absent in some jsdom configurations. The hook must tolerate a missing
`window.matchMedia` and fall back to "motion allowed", so tests do not need a polyfill to exercise the
default path.

## D3 — Cumulative indicator fill

**Decision**: a dot at index `i` renders filled when `i <= selectedIndex`, using the current slide's
accent; unfilled dots use `rgba(255,255,255,0.2)`.

**Rationale**: confirmed with the requester and it is what all three Figma frames draw — one filled dot
on the website slide, two on the portfolio slide, three on the brochure slide, each in that slide's
accent.

**Consequence to be aware of**: because filling is cumulative and the carousel loops, wrapping from
slide 3 back to slide 1 makes the indicators go from three filled to one filled. That is the specified
behaviour, not a bug, but it is the reason FR-016 spells out all three states explicitly and the reason
the checklist flags it for designer confirmation.

**Alternative considered**: single active dot — rejected, the requester confirmed cumulative.

## D4 — Narrow viewports

**Decision**: the showcase column is hidden below the `lg` breakpoint by a CSS utility; the sign-in
column then occupies the full width. No JavaScript is involved in that decision.

**Rationale**: FR-004 requires sign-in never be delayed or pushed behind a scroll on a phone, and the
constitution requires CSS-driven responsiveness with both layouts rendered.

**Known risk — embla in a zero-width container.** When the showcase is display-hidden, its container
has no width; embla computes slide positions from container width. On crossing the breakpoint, stale
measurements could leave the panel blank or mis-scrolled.

**Mitigation**: embla 8 ships a `ResizeObserver` and re-initialises on container resize by default
(`watchResize`), which covers 0 → N. If manual verification at the breakpoint shows a stale panel, the
fallback is an explicit `api.reInit()` on a resize observer in `ShowcaseCarousel`. This is called out
as a verification step in `quickstart.md` rather than pre-emptively coded, to avoid adding an effect
that may be redundant.

## D5 — Where the showcase content lives

**Decision**: one module, `pages/Login/showcase-slides.ts`, exporting a frozen array of three
`ShowcaseSlide` objects — id, accent, badge label, badge icon component, headline, subcopy, mockup
asset, texture asset, and four stats.

**Rationale**: Principle II. Today's failure mode in this repository was catalog data duplicated across
files until it contradicted the backend; one module with one export prevents a colour or a headline
being restated in a component.

**Rejected**: inlining the three slides in `ShowcaseCarousel.tsx` — the review that shaped this
codebase specifically called out module-level data tables interleaved with components as the thing to
stop doing.

## D6 — Assets

**Decision**: export two PNGs per slide from Figma — the mockup (736 × 472 at 2× for retina) and the
panel texture — and commit all six under `src/assets/showcase/`. Import them by ordinary path so Vite
fingerprints them.

**Rationale**: the mockups are photographic renders — device frames, iPhone status bars, PDF page
thumbnails, real website screenshots. The Figma tree for the website mockup alone is roughly 40 nested
nodes of device chrome. As markup it would be fragile, heavier than the image, and meaningless to a
screen reader.

**Asset URL expiry**: the Figma MCP asset URLs live ~7 days. They must be downloaded and committed, not
referenced. Verified before writing any component.

**Rejected**: rendering the mockups as markup (fragility, weight); exporting the entire panel as one
flat image (destroys real text, breaking FR-006, FR-008, FR-021 contrast and alternative-text
requirements).

## D7 — Icons

**Decision**: three `lucide-react` icons — `MonitorSmartphone` (website), `FileText` (portfolio),
`BookOpen` (brochure).

**Rationale**: the constitution forbids adding raw SVG path data, and the Figma design-to-code skill
itself directs reuse of the target project's existing components and tokens. Figma's own component
name for the website badge is "Monitor Smartphone", which lucide matches exactly.

**Deviation acknowledged**: that same skill prefers exported assets for icons on the grounds that
hand-drawn vectors are wrong. That concern does not apply here — these are not hand-drawn, they are an
installed icon set. Committing three SVGs would reintroduce the pattern this repository deliberately
removed when it deleted `src/imports` and 94 unused path strings.

**Open to correction**: `FileText` and `BookOpen` are close rather than exact matches for Figma's
"Notes" and "Notebook Minimalistic". If a designer objects, the fix is a one-line swap in
`showcase-slides.ts` — which is precisely why the icon is a field of the slide data rather than
hardcoded in markup.

## D8 — Typography

**Decision**: render the headline in Montserrat at 24 px / bold / line-height 32.

**Rationale**: Figma specifies `Proxima Nova Bold` for headings. The project ships exactly one family,
Montserrat, loaded in `src/styles/fonts.css`. Adding a licensed font for one headline is out of
proportion to this change and would need a licensing decision.

**Flagged for design sign-off** alongside the two items already in the spec's Assumptions.

## D9 — Testing approach

**Decision**: four test files.

| File | Covers |
| --- | --- |
| `showcase-slides.test.ts` | three slides, unique ids and accents, lowercase hex, every field non-empty, copy matches FR-008/FR-009 |
| `useAutoAdvance.test.ts` | advances at 15 s with fake timers; stops permanently after `stop()`; never starts under reduced motion; clears on unmount |
| `ShowcaseIndicators.test.tsx` | cumulative fill at each index; accessible names; selection callback |
| `LoginPage.test.tsx` | existing smoke assertions still pass; the OAuth button still calls `onNext`; all three slides are in the document |

**Rationale**: the project's stated gap is that UI coverage is smoke-level with no full-flow test. The
timer and the cumulative-fill rule are the two pieces of real logic here, so they get real unit tests;
the page keeps a smoke test, matching the existing convention rather than inventing a new one.

**Not attempted**: asserting embla's scroll position in jsdom. Embla measures real layout, which jsdom
does not provide. The hook is tested against a stubbed api object (`scrollNext` as a spy), and actual
scrolling is verified in the manual walk in `quickstart.md`.
