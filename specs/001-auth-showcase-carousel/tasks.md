---

description: "Task list for the auth screen showcase carousel"
---

# Tasks: Auth screen showcase carousel

**Input**: Design documents from `/specs/001-auth-showcase-carousel/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md),
[data-model.md](data-model.md), [contracts/components.md](contracts/components.md)

**Tests**: Included, and not optional here. The project constitution (Principle IV) requires a smoke
test per page and unit tests for pure logic, and `research.md` D9 fixes the four test files.

**Organization**: Grouped by user story so each is independently testable. US1 alone is a shippable
MVP.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel — different files, no dependency on an incomplete task
- **[Story]**: US1 / US2 / US3, mapping to the user stories in `spec.md`
- Paths are repository-relative

## Path Conventions

Single React client. Source under `src/`, tests colocated beside the code they cover (this project has
no separate `tests/` tree — every page and module keeps its test in its own folder).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: get the six Figma assets on disk before any component references them. Figma MCP asset
URLs expire in about 7 days, so nothing may reference them directly.

- [x] T001 Create the asset directory `src/assets/showcase/`
- [x] T002 Harvest the remaining Figma asset URLs by calling `get_design_context` on nodes `249:7903`
      (Portfolio panel) and `249:7810` (Brochure panel), recording each panel's background-texture
      image URL — the Website panel's URL is already captured in `plan.md`
- [x] T003 [P] Export the three mockup images via `get_screenshot` at `maxDimension: 1472` (2× of the
      736 px frame) and save as `src/assets/showcase/website-mockup.png`, `portfolio-mockup.png`,
      `brochure-mockup.png` (depends on T001)
- [x] T004 [P] Download the three panel textures from the URLs collected in T002 and save as
      `src/assets/showcase/website-texture.png`, `portfolio-texture.png`, `brochure-texture.png`
      (depends on T001, T002)
- [x] T005 Verify every file in `src/assets/showcase/` is a non-empty PNG and that all six are present,
      then confirm `npm run build` still succeeds with the directory added

**Checkpoint**: assets committed. `vite.config.ts`'s dormant `figmaAssetResolver` must stay unused —
assets are imported by ordinary path, not `figma:asset/*`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: the single source of truth for slide content. Every user story reads from it.

**⚠️ CRITICAL**: no user story work can begin until this phase is complete.

- [x] T006 Create `src/app/pages/Login/showcase-slides.ts` defining the `ShowcaseStat` and
      `ShowcaseSlide` types and exporting the frozen three-entry `SHOWCASE_SLIDES` array, per
      [data-model.md](data-model.md) — accents `#e99041`, `#847eda`, `#6fc074`; badge icons
      `MonitorSmartphone`, `FileText`, `BookOpen` from `lucide-react`; headlines stored sentence case;
      the six assets from Phase 1 imported by path
- [x] T007 Create `src/app/pages/Login/showcase-slides.test.ts` asserting: exactly three slides in
      website → portfolio → brochure order; unique ids; unique accents matching `/^#[0-9a-f]{6}$/`;
      exactly four stats per slide with `rating: true` only on the fourth; no empty string field; and
      that every headline, subcopy and stat matches the FR-008 and FR-009 tables verbatim

**Checkpoint**: slide data exists and is pinned by tests. Stories can start.

---

## Phase 3: User Story 1 - A visitor learns what the product does (Priority: P1) 🎯 MVP

**Goal**: the two-column screen with a showcase that advances every 15 seconds and loops, while
sign-in keeps working exactly as it does today.

**Independent Test**: load the screen, touch nothing, and confirm the panel changes three times over
45 seconds and returns to the first capability — with the OAuth button unaffected.

### Tests for User Story 1

> Write these first and confirm they fail before implementing.

- [x] T008 [P] [US1] Create `src/app/pages/Login/useAutoAdvance.test.ts` with fake timers, asserting:
      `api.scrollNext` is called once per `intervalMs`; no timer starts when `api` is undefined; no
      timer starts when `enabled` is false; the interval is cleared on unmount so nothing fires after
      teardown (FR-014)
- [x] T009 [P] [US1] Extend `src/app/pages/Login/LoginPage.test.tsx` to assert the existing sign-in
      behaviour still holds — the OAuth button renders, calls `onNext` when clicked, and shows
      `Redirecting...` while `busy` — plus that all three badge labels are in the document

### Implementation for User Story 1

- [x] T010 [US1] Create `src/app/pages/Login/useAutoAdvance.ts` implementing the contract in
      [contracts/components.md](contracts/components.md): `window.setInterval` calling
      `api.scrollNext()`, a `stop()` that clears it permanently, and cleanup on unmount. Leave the
      reduced-motion branch out — US3 adds it (depends on T008)
- [x] T011 [P] [US1] Create `src/app/pages/Login/ShowcaseSlideView.tsx` rendering one slide: texture
      background at `opacity: 0.8` over `rgba(255,255,255,0.08)`; badge pill (`1px solid
      rgba(255,255,255,0.1)`, radius `100px`, padding `8px 16px`, gap `12px`, 20 px accent icon,
      14 px accent label); headline 24 px bold line-height 32 capitalized; subcopy 14 px at
      `opacity: 0.6`; the 736 × 472 mockup with explicit `width`/`height` and an `onError` that hides
      only the image; and the stats card (`rgba(255,255,255,0.04)`, `1px solid rgba(255,255,255,0.1)`,
      radius `16px`, padding `26px`, `backdrop-filter: blur(43.5px)`) with four 126 px items separated
      by 32 px rules, the fourth carrying `★★★★★` in the accent (depends on T006)
- [x] T012 [P] [US1] Create `src/app/pages/Login/SignInPanel.tsx` — the left column, carrying over
      today's logo glyph, divider, OAuth button and redirect note verbatim in behaviour, restyled flat
      with no card container, and with the heading changed to "Welcome To Launch Kit" while the
      Innovation City subtitle is kept
- [x] T013 [US1] Create `src/app/pages/Login/ShowcaseCarousel.tsx` wrapping `Carousel`,
      `CarouselContent` and `CarouselItem` from `../../components/ui/carousel` with `opts={{ loop:
      true }}` and an `aria-label`; capture the api via `setApi`; track `selectedIndex` from its
      `select` event with cleanup; neutralise the component's `-ml-4`/`pl-4` gutter so the panel is
      full-bleed; and wire `useAutoAdvance` (depends on T010, T011)
- [x] T014 [US1] Rewrite `src/app/pages/Login/LoginPage.tsx` as a full-bleed two-column shell —
      `SignInPanel` at 42% and `ShowcaseCarousel` at 58% at desktop widths, no `ScaledPage`, no header
      bar — keeping the `{ onNext, busy }` signature byte-for-byte so `App.tsx` needs no edit (depends
      on T012, T013)
- [x] T015 [US1] Run `npx vitest run src/app/pages/Login` and confirm T008 and T009 now pass

**Checkpoint**: US1 is shippable. The screen shows three auto-advancing capabilities and sign-in is
untouched.

---

## Phase 4: User Story 2 - A visitor tracks and steers the showcase (Priority: P2)

**Goal**: cumulative indicator dots that report progress, allow jumping, and stop auto-advance on use.

**Independent Test**: select the third dot; the third capability shows at once and nothing advances by
itself for at least 45 seconds afterwards.

### Tests for User Story 2

- [x] T016 [P] [US2] Create `src/app/pages/Login/ShowcaseIndicators.test.tsx` asserting the cumulative
      rule at each index — one filled at index 0, two at index 1, three at index 2 — that filled dots
      use the passed accent and unfilled use `rgba(255,255,255,0.2)`, that each dot is a button with an
      accessible name and `aria-current` only on the selected one, and that clicking dot *n* calls
      `onSelect(n)`

### Implementation for User Story 2

- [x] T017 [US2] Create `src/app/pages/Login/ShowcaseIndicators.tsx` per the contract — 8 px dots
      16 px apart, `role="group"` with an accessible name, one `<button type="button">` per slide,
      `index <= selectedIndex` filled with the accent (depends on T016)
- [x] T018 [US2] Wire `ShowcaseIndicators` into `ShowcaseCarousel`: pass `count`, `selectedIndex` and
      the current slide's accent, and on select call both `api.scrollTo(index)` and the hook's `stop()`
      so auto-advance ends permanently for the visit (FR-012) (depends on T013, T017)
- [x] T019 [US2] Verify by keyboard that focus reaches the sign-in button before the dots, and that
      each dot takes focus with a visible ring and activates on Enter and Space (FR-017, FR-019)

**Checkpoint**: US1 and US2 both work independently.

---

## Phase 5: User Story 3 - Reduced motion and small screens (Priority: P3)

**Goal**: the showcase never blocks or degrades sign-in — no automatic motion when the visitor has
asked for less of it, and no showcase competing for space on a phone.

**Independent Test**: with reduced motion set, nothing advances over 60 seconds while the dots still
work; at 360 px the sign-in control is usable with no horizontal scroll.

### Tests for User Story 3

- [x] T020 [P] [US3] Extend `src/app/pages/Login/useAutoAdvance.test.ts` to assert no timer starts when
      `matchMedia("(prefers-reduced-motion: reduce)")` matches, that the timer starts normally when it
      does not, that a missing `window.matchMedia` is treated as motion-allowed, and that the
      media-query listener is removed on unmount

### Implementation for User Story 3

- [x] T021 [US3] Add the reduced-motion branch to `src/app/pages/Login/useAutoAdvance.ts` —
      `window.matchMedia` guarded for absence, a `change` subscription so toggling mid-visit takes
      effect, and its listener cleaned up (depends on T020)
- [x] T022 [US3] Hide the showcase column below the `lg` breakpoint in
      `src/app/pages/Login/LoginPage.tsx` using a CSS utility only, letting the sign-in column take the
      full width — no `matchMedia`, no width state, no device detection (depends on T014)
- [x] T023 [US3] Resize slowly from 360 px up past the breakpoint **without reloading** and confirm the
      showcase appears correctly positioned. This verifies the embla zero-width risk in `research.md`
      D4; if the panel is blank or mis-scrolled, add an `api.reInit()` on a resize observer in
      `ShowcaseCarousel.tsx` and re-verify

**Checkpoint**: all three stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T024 Run the four gates — `npm test && npm run typecheck && npm run build && npm audit` — and
      confirm all pass, with the pre-existing 80 tests still green and no new dependency in the audit
- [x] T025 [P] Confirm no `as any` was introduced and no Tailwind utility name appears in any prose
      comment in the new files, since the v4 scanner would ship it as real CSS
- [ ] T026 [P] Run an accessibility pass on the screen — contrast on the accent badge label, the accent
      star rating, and the 12 px stat captions at `opacity: 0.5` in particular (FR-021, SC-007)
- [ ] T027 Walk every scenario in [quickstart.md](quickstart.md), including the blocked-image and
      slow-network cases and the post-unmount timer check
- [ ] T028 Walk the full flow from `AGENTS.md` at ~360 px and ~1440 px to confirm the `LoginPage`
      rewrite did not break the transition off the login screen
- [x] T029 Update `docs/frontend-review.md` to note that `components/ui/carousel.tsx` is no longer
      dormant, since that file records the dormant-component state
- [x] T030 Update the dormant-component note in `AGENTS.md` for the same reason, keeping it in step with
      the constitution as the constitution's Governance section requires

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately. Blocks Phase 2, because the slide module
  imports the assets.
- **Foundational (Phase 2)**: depends on Setup. **Blocks all user stories.**
- **User Stories (Phases 3–5)**: all depend on Phase 2. US1 → US2 → US3 in priority order; see below
  for why they are not fully parallel here.
- **Polish (Phase 6)**: depends on every story being complete.

### User Story Dependencies

Each story is independently *testable*, but this feature is one screen, so two real file dependencies
exist and are worth stating rather than pretending otherwise:

- **US1 (P1)**: fully independent once Phase 2 is done. Shippable alone.
- **US2 (P2)**: T018 edits `ShowcaseCarousel.tsx`, created by US1's T013. US2's own component and test
  (T016, T017) are independent and can be written in parallel with US1.
- **US3 (P3)**: T021 edits `useAutoAdvance.ts` from US1's T010, and T022 edits `LoginPage.tsx` from
  US1's T014. Its test (T020) can be written in parallel.

### Parallel Opportunities

- T003 and T004 run together once T001 and T002 are done.
- T008, T009 (US1 tests), T016 (US2 test) and T020 (US3 test) are four different files — all four can
  be written in parallel immediately after Phase 2.
- T011 and T012 are different files with no shared dependency and run together.
- T025 and T026 run together.

### Within Each User Story

Tests are written and confirmed failing before implementation. Data module before components,
components before the page shell, page shell before responsive behaviour.

---

## Parallel Example: after Phase 2

```bash
# All four test files are independent — write them together:
Task: "Create useAutoAdvance.test.ts in src/app/pages/Login/"
Task: "Extend LoginPage.test.tsx in src/app/pages/Login/"
Task: "Create ShowcaseIndicators.test.tsx in src/app/pages/Login/"
Task: "Extend useAutoAdvance.test.ts with reduced-motion cases"

# Then the two independent components:
Task: "Create ShowcaseSlideView.tsx in src/app/pages/Login/"
Task: "Create SignInPanel.tsx in src/app/pages/Login/"
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Phase 1 — assets on disk.
2. Phase 2 — slide data pinned by tests.
3. Phase 3 — the two-column screen with 15-second auto-advance.
4. **Stop and validate**: quickstart Scenarios 1 and 5.
5. Shippable: the screen explains the product and sign-in is untouched.

### Incremental Delivery

1. Setup + Foundational → assets and data ready.
2. US1 → validate Scenarios 1, 5 → demo (MVP).
3. US2 → validate Scenarios 2 → demo.
4. US3 → validate Scenarios 3, 4 → demo.
5. Phase 6 → gates, accessibility, full walk, docs.

### Commit Strategy

The constitution requires one concern per change, so this lands as roughly six commits rather than one:
assets → slide data → auto-advance hook → showcase components → page rewrite → responsive and
reduced-motion. Test files commit with the code they cover.

---

## Execution record (2026-08-04)

27 of 30 tasks done. All four gates pass: 106 tests (up from 80), typecheck, build, `npm audit` clean,
no new dependency.

**What the plan got wrong, found during execution:**

1. **The panel sized itself to the design's 900px height.** At 1280×720 the page scrolled 181px. Two
   causes: the mockup held a fixed 472px, and `CarouselContent`'s scroll-clipping wrapper carries no
   height of its own, so `h-full` on the track resolved against an auto-height parent. Fixed by letting
   the mockup absorb leftover height and giving the wrapper a height by descendant selector, so the
   shadcn component stayed unmodified. Not anticipated anywhere in `plan.md`.
2. **jsdom needed three stubs, not zero.** It defines none of `matchMedia`, `ResizeObserver` or
   `IntersectionObserver`, and embla calls all three while initialising, so every test mounting a
   carousel threw. `research.md` predicted the embla-in-jsdom limitation but not that mounting would
   fail outright.
3. **T003's 2× export was not possible.** `get_screenshot` caps but never upscales, so the mockups are
   1× native (736×472). Separately, the textures arrived at 2880×3346 — 1.5 MB each — and were
   downscaled to 1200px wide, cutting the six assets from 5.4 MB to 1.5 MB.
4. **Two designer inconsistencies in the Figma frames**, resolved toward one source of truth: the
   portfolio star rating is `#837eda` while its badge is `#847eda` (one digit apart — a single accent is
   used), and the brochure stats card is `rgba(255,255,255,0.02)` where the other two are `0.04` (`0.04`
   is used throughout).

**T023's risk did not materialise.** Resizing 360 px → past the breakpoint without reloading leaves the
carousel correctly measured — exactly one slide filling the viewport box. Embla's own `ResizeObserver`
handles 0 → N, so the `api.reInit()` fallback was not needed and is not in the code.

**Verified in a browser** at 1440×900 (reproduces the frame exactly: 57.8% split, 736×472 mockup),
1440×600 (mockup shrinks to 189px, sign-in fully visible), 1280×720 and 360×720 (showcase hidden,
sign-in full width) — no overflow on either axis at any of them. Dot selection moves embla's selected
index and repaints the cumulative dots in the new accent.

**Confirmed live, by accident:** the automation browser reports `prefers-reduced-motion: reduce`, and
auto-advance was correctly suppressed — FR-013 observed in a real browser rather than only under fake
timers.

**Still open — all three need a visible browser, which the automation pane is not:**

- **T026** contrast pass. The 12 px captions at `opacity: 0.5` and the accent star rating are the two
  most likely 4.5:1 failures and have not been measured.
- **T027** the quickstart scenarios that need real time and real paint: the 15-second tick and the loop
  (Scenarios 1–3), and the blocked-image and slow-network cases (Scenario 6). The pane runs with
  `document.hidden`, which freezes `requestAnimationFrame` entirely — embla's slide translation never
  ran, so no visual slide change could be observed here. The timer itself is covered by unit tests.
- **T028** the full sign-in → download walk at 360 px and 1440 px.

## Notes

- `[P]` means a different file with no incomplete dependency.
- `components/ui/carousel.tsx`, `button.tsx` and `utils.ts` are adopted **unmodified**. If a change to
  any of them looks necessary, stop — that is a wider decision about the dormant component library, not
  part of this feature.
- Nothing here touches `launchkit-api.ts`, `useProjectSession.ts`, `lib/navigation.ts`, or any session
  key. If a task seems to require it, the plan is wrong.
- `LoginPage`'s `{ onNext, busy }` signature must not change — `App.tsx` stays untouched.
