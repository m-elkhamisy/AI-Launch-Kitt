# Implementation Plan: Auth screen showcase carousel

**Branch**: `feature/auth-showcase-carousel` | **Date**: 2026-08-04 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-auth-showcase-carousel/spec.md`

## Summary

Rebuild `LoginPage` as a full-bleed two-column screen. The left column keeps today's Innovation City
OAuth sign-in, restyled flat (no card, no header bar). The right column is a new showcase carousel:
three slides — website, portfolio, brochure — each with its own accent colour, badge, headline,
subcopy, exported mockup image, and a four-cell stats strip, advancing every 15 seconds and looping.

The carousel is built on the repository's existing-but-unused `components/ui/carousel.tsx`, driven by
its `setApi` escape hatch plus a page-local `useAutoAdvance` hook. No new dependency: `embla-carousel-react`
is already installed and the `embla-carousel-autoplay` plugin is deliberately **not** added, because
the hook also has to satisfy reduced-motion and stop-on-interaction requirements the plugin does not
express.

## Technical Context

**Language/Version**: TypeScript 5.8 (`strict`), React 18.3

**Primary Dependencies**: `embla-carousel-react` 8.6.0 (already installed, reached via
`components/ui/carousel.tsx`); `lucide-react` 0.487 for the three badge icons; `clsx` +
`tailwind-merge` via `components/ui/utils.ts`, and `class-variance-authority` via
`components/ui/button.tsx` — both already installed, both pulled in transitively by adopting the
carousel component. **No new packages.**

**Storage**: N/A — showcase content is static module data; nothing is persisted and no session key is
added.

**Testing**: Vitest 4 + jsdom + Testing Library. Requires Node ≥ 22.12 (see `AGENTS.md`).

**Target Platform**: Browser, dark theme, viewports 360 px → 1440 px.

**Project Type**: Single-page React client; no router, no backend change.

**Performance Goals**: No visible content shift after first paint (mockup and background images must
be intrinsically sized); slide transition at 60 fps; auto-advance interval accurate to ±1 s.

**Constraints**: No new dependency. No JS device detection — the narrow-viewport rule is CSS-only.
Timers must clean up on unmount. Text contrast ≥ 4.5:1.

**Scale/Scope**: One screen, three slides, six committed image assets. Estimated ~6 new files,
1 rewritten file, ~4 new test files.

### Design tokens extracted from Figma

Read from nodes `249:7741` (Website panel), `249:7904` (Portfolio top), `249:7811` (Brochure top).

| Token | Value |
| --- | --- |
| Panel size | 832 × 900 of a 1440 × 900 frame → 57.8% width; left column 607 px → 42.2% |
| Panel padding | `48px` horizontal, `32px` vertical; column gap `42px`, centred |
| Panel background | `rgba(255,255,255,0.08)` beneath a per-slide texture image at `opacity: 0.8`, `object-fit: cover` |
| Badge pill | `1px solid rgba(255,255,255,0.1)`, radius `100px`, padding `8px 16px`, gap `12px`, icon `20×20` |
| Badge label | 14 px / 500 / line-height 20, coloured with the slide accent |
| Headline | 24 px / bold / line-height 32, white, centred, `text-transform: capitalize` |
| Subcopy | 14 px / 500 / line-height 20, white at `opacity: 0.6`, centred |
| Mockup frame | 736 × 472 |
| Stats card | `rgba(255,255,255,0.04)`, `1px solid rgba(255,255,255,0.1)`, radius `16px`, padding `26px`, `backdrop-filter: blur(43.5px)`, `justify-content: space-between` |
| Stats item | width `126px`, gap `6px`; value 14 px / 600 white; caption 12 px / 500 at `opacity: 0.5` |
| Stats divider | 1 px vertical rule, height `32px` |
| Star rating | `★★★★★` at 14 px / 600 in the slide accent, followed by `4.9/5 average rating` at 12 px / `opacity: 0.5` |
| Indicators | 8 px dots, 16 px apart (56 px total for three) |

Accent colours and badge icons per slide:

| Slide | Accent | Figma icon | lucide equivalent |
| --- | --- | --- | --- |
| Website | `#e99041` | Monitor Smartphone | `MonitorSmartphone` |
| Portfolio | `#847eda` | Notes | `FileText` |
| Brochure | `#6fc074` | Notebook Minimalistic | `BookOpen` |

Note on headline casing: Figma stores sentence case ("Launch a professional website in minutes") and
renders title case via `text-transform: capitalize`. The implementation stores the same sentence-case
string and applies `capitalize`, so the rendered result matches FR-008 without hardcoding title case.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Checked against [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md) v1.0.0.

| Principle | Verdict | Evidence |
| --- | --- | --- |
| **I. The API is the source of truth** | **Pass, with a recorded exception** | No endpoint supplies marketing copy and this screen renders pre-auth. Principle I governs server-owned domain data — projects, catalogs, builds — not presentation copy. Nothing is added to `launchkit-api.ts` and no component calls `fetch`. Recorded in the spec's Assumptions and in Complexity Tracking below. |
| **II. One source of truth per concern** | **Pass** | All three slides' content, accents, and assets live in exactly one module, `pages/Login/showcase-slides.ts`. No colour, copy, or asset path is repeated in a component. |
| **III. Pages are presentational** | **Pass** | No wizard state is involved, so nothing is added to `useProjectSession`. `LoginPage` keeps its existing `onNext`/`busy` props unchanged. Carousel position is local UI state, which the principle explicitly permits. Every sub-component is its own file with an explicit prop signature — no inlined overlay markup. |
| **IV. Four gates stay green** | **Pass, enforced by tasks** | `npm test && npm run typecheck && npm run build && npm audit` runs before the branch is proposed. No `as any`; `strict` untouched. New tests cover the slide data, the auto-advance hook, the indicators, and the page render. The manual walk is a task, not an assumption. |
| **V. One concern per change** | **Pass** | Sequenced as separate commits: assets → slide data → auto-advance hook → showcase components → page rewrite → tests. No unrelated cleanup rides along. |

Constraint-level checks:

- **Icons are lucide** — three lucide icons, no raw path data. This *deviates from the Figma
  design-to-code skill*, which says to render icons from exported assets. The project constitution
  wins: it forbids adding SVG path data, and the same skill instructs reuse of the target project's
  existing components. The glyphs are close matches (`MonitorSmartphone` is exact). Logged in
  Complexity Tracking.
- **No JS device detection** — the showcase is hidden below the `lg` breakpoint with a CSS utility, in
  the same spirit as `SubNav` rendering both layouts. `matchMedia` **is** used for
  `prefers-reduced-motion`, which is a user preference driving behaviour, not device sniffing.
- **Effects clean up** — the auto-advance timer uses `window.setInterval` and returns a clearing
  cleanup; the hook stops on unmount, satisfying FR-014.
- **Hardcoded lowercase hex** — accents are stored as lowercase hex in the slide module. `theme.css`
  tokens are not used; they describe an unused light palette.
- **No Tailwind utility names in prose comments** — the v4 scanner would ship them as real CSS.
- **Dormant `components/ui/**`** — the constitution permits touching it when "a change is
  specifically about adopting or removing them". This change is exactly that, for
  `carousel.tsx` (plus `utils.ts` and `button.tsx`, which it imports).
- **Smoke test per page** — `LoginPage.test.tsx` exists and is extended rather than replaced.

**Post-Phase-1 re-check**: no gate changed. The design adds no API call, no session key, no shared
state, and no dependency. The one open item — whether `carousel.tsx` behaves when its container starts
at zero width below the breakpoint — is a functional risk tracked in `research.md`, not a constitution
violation.

## Project Structure

### Documentation (this feature)

```text
specs/001-auth-showcase-carousel/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output — decisions and rejected alternatives
├── data-model.md        # Phase 1 output — the ShowcaseSlide shape
├── quickstart.md        # Phase 1 output — how to validate the feature
├── contracts/
│   └── components.md    # Phase 1 output — component prop contracts
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
src/
├── assets/
│   └── showcase/                     # NEW directory — exported from Figma, committed
│       ├── website-mockup.png        # 736×472 @2x
│       ├── website-texture.png       # panel background
│       ├── portfolio-mockup.png
│       ├── portfolio-texture.png
│       ├── brochure-mockup.png
│       └── brochure-texture.png
└── app/
    ├── components/ui/
    │   ├── carousel.tsx              # UNCHANGED — adopted as-is via setApi
    │   ├── button.tsx                # UNCHANGED — imported by carousel.tsx
    │   └── utils.ts                  # UNCHANGED — imported by carousel.tsx
    └── pages/Login/
        ├── LoginPage.tsx             # REWRITTEN — two-column shell, no ScaledPage
        ├── LoginPage.test.tsx        # EXTENDED
        ├── SignInPanel.tsx           # NEW — left column, OAuth button preserved
        ├── ShowcaseCarousel.tsx      # NEW — owns the embla api and the timer wiring
        ├── ShowcaseSlide.tsx         # NEW — one slide's markup
        ├── ShowcaseIndicators.tsx    # NEW — cumulative dots
        ├── ShowcaseIndicators.test.tsx  # NEW
        ├── showcase-slides.ts        # NEW — the three slides, single source
        ├── showcase-slides.test.ts   # NEW — data integrity
        ├── useAutoAdvance.ts         # NEW — interval, reduced motion, stop-on-interaction
        └── useAutoAdvance.test.ts    # NEW
```

**Structure Decision**: everything new lives in `src/app/pages/Login/`, because only the login screen
uses it — this follows the constitution's "a page's own component belongs beside it" rule. Nothing is
promoted to `components/common/` and nothing is added to `lib/`, since there is no second consumer.
`src/assets/showcase/` is a new top-level asset directory; note that `vite.config.ts`'s dormant
`figmaAssetResolver` maps `figma:asset/*` to `src/assets/`, but assets here are imported by ordinary
path so the resolver stays dormant and unused.

`ScaledPage` is deliberately **not** used by the new `LoginPage`: it caps content at 1440 px and adds
`clamp(16px, 3vw, 32px)` horizontal padding, which would inset the full-bleed showcase panel. The
1440 px cap already exists on the wrapper in `App.tsx`, so dropping `ScaledPage` here changes nothing
about the outer width.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Static slide content instead of API-provided (Principle I) | No endpoint exposes marketing copy, and the screen renders before authentication. Adding one would mean a backend change for three sentences of copy that change at design cadence, not runtime. | Fetching from `/catalogs/wizard` was rejected: that catalog is wizard domain data, and overloading it with login-screen marketing copy would put presentation concerns behind an authenticated domain endpoint. |
| Adopting dormant `components/ui/carousel.tsx` (plus `button.tsx`, `utils.ts`) | The requester specified the shadcn carousel, and it already provides `role="region"`, `aria-roledescription`, arrow-key handling, and the embla `setApi` hook. Writing a slider by hand would duplicate all of it. | Hand-rolling was rejected as reimplementing an installed, tested component. Adding `embla-carousel-autoplay` was rejected because it is not installed, would be a new dependency, and does not express stop-permanently-on-interaction or reduced-motion suppression. |
| lucide icons instead of Figma-exported icon assets | The constitution forbids adding raw SVG path data, and the Figma skill itself directs reuse of the target project's components. `MonitorSmartphone` is an exact glyph match; the other two are close. | Exporting the three icons as committed SVG assets was rejected because it reintroduces exactly the pattern the project spent a commit removing (`src/imports` deletion, 94 unused path strings). |
| Six committed PNG assets | The mockups are photographic renders of generated sites and PDFs — device frames, page thumbnails, real screenshots. They are content, not iconography. | Reproducing them in markup was rejected: the Figma tree for one mockup alone is ~40 nested nodes of device chrome, and the result would be both fragile and heavier than an image. |
