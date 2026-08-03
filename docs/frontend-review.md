# AI Launch Kit — Frontend Code Review

**Date:** 2026-08-03 · **Commit reviewed:** `9efe918` · **Scope:** the whole frontend (`src/**`, build
and repo tooling)

Every claim below was verified against the working tree — line numbers, symbol counts, and the
build/test/typecheck/audit results are reproduced from actual runs, not inferred.

---

## 1. Baseline: what is already working

It is worth stating this plainly, because the codebase is in better shape than "everything is in one
file" suggests. The problem is concentrated, not systemic.

| Gate | Result |
| --- | --- |
| `npm run typecheck` | **passes** (`strict: true`) |
| `npm test` | **passes** — 2 files, 11 tests |
| `npm run build` | **passes** — 384 kB JS / 113 kB CSS |
| `npm audit` | **fails, exit 1** — 3 advisories (see E1) |

Genuinely good, and worth protecting during cleanup:

- **`src/app/launchkit-api.ts` (543 lines) is well-factored.** One `request<T>()` helper that centralises
  auth headers, credentials, and error-envelope decoding; a typed `*View` model per resource; a
  `LaunchKitApiError` carrying status/code/requestId; SSE build streaming with `Last-Event-ID`
  resumption and reconnect backoff; idempotency keys on all create endpoints; `AbortSignal` support.
  This file is the model the rest of the app should be refactored *towards*, not away from.
- **`src/app/wizard-validation.ts` (168 lines)** keeps all zod schemas in one place with real
  cross-field rules (`superRefine` for custom palettes, page/slug uniqueness, section limits).
- **Responsiveness is CSS-driven** — `clamp()` and Tailwind breakpoints, no JS device detection.
  `SubNav` renders both layouts and lets a media query choose. This is the right call and the comments
  explain why.
- **Layout comments explain intent**, not mechanics (see `ScaledPage`, lines 116–128).
- CI (`.github/workflows/ci.yml`) and Amplify (`amplify.yml`) both run test → typecheck → build.

---

## 2. The core structural problem

`src/app/App.tsx` is **4,258 lines** and contains, in a single module:

| Lines | Contents |
| --- | --- |
| 55–66 | `Page` union (11 screen ids) |
| 68–85 | `ValidationError`, `firstValidationError` — shared primitives |
| 90–139 | `ScaledPage` — layout shell |
| 142–205 | `LogoSvg`, `TopHeader` — chrome |
| 208–555 | `STEPS` + `SubNav` (348 lines; contains a nested `StepIcon` with 4 inlined icon variants) |
| 558–3703 | **10 page components**, interleaved with 9 module-level data tables |
| 3706–3821 | `LegacyApp` — dead fossil (see B1) |
| 3823–3856 | Session-key constants, `clearProjectSessionState`, `resumePageForProject` |
| 3858–4258 | `App()` — routing, auth boot, and **all 12 API orchestration handlers** |

Concentration metrics for that one file: **51 `useState`**, **12 `useEffect`**, **265 inline
`style={{}}` blocks**, **293 `className=` attributes**, **5 hand-rolled modal overlays**, **7
`as any`**.

Three consequences that matter more than the line count:

1. **No module boundaries.** Page components, shared chrome, static data, navigation logic, and
   network orchestration are peers in one scope. Nothing prevents a page from reaching into anything.
2. **`App()` is doing three unrelated jobs** — route table, auth/session bootstrap, and the API
   command layer (`saveBusiness`, `uploadProfile`, `saveDesign`, `saveColors`, `generateMockups`,
   `startBuild`, `deploy`, `openProject`, `createWebsite`, …). Every one of these is defined inline in
   the component body, so they are re-created on each render and cannot be tested in isolation.
3. **Zero tests reach any of it.** All 11 passing tests target `launchkit-api.ts` and
   `wizard-validation.ts`. The 4,258-line file holding every user-visible behaviour has no test
   coverage at all — which is exactly why the cleanup plan in §4 leads with a safety net.

### Related structural issues

- **A2 — Two competing navigation sources of truth.** `WIZARD_PAGES` (3825) and a separate inline
  `order` array (4200) both encode screen sequence; `resumePageForProject` (3837) encodes a third
  view of it. `react-router` is installed but **never imported** anywhere in `src`.
- **A3 — No `pages/` / `components/` / `hooks/` / `lib/` split.** `src/app/` is flat: `App.tsx`,
  `launchkit-api.ts`, `wizard-validation.ts`, and their two test files.
- **A4 — `src/app/components/ui/**` (47 shadcn files) and `components/figma/**` have zero importers**
  outside their own folders — 5,137 lines total. Verified. A full component library is installed,
  transitively pulling 38 dependencies, and renders nothing.
- **A5 — `src/imports/**` (25 files).** Only the 8 `svg-*.ts` path dictionaries are consumed. Every
  `index.tsx` (7,757 lines of Figma-generated component trees) is unreferenced.

---

## 3. Findings

### B. Dead code — all verified as declaration-only or unreachable

| # | Finding | Location | Size |
| --- | --- | --- | --- |
| B1 | **`LegacyApp()`** — pre-API version of the app, never referenced or exported. Contains **all 7 `as any` casts** in the file (3811–3817), which is how it still typechecks against the current page props. | `App.tsx:3709–3821` | 113 lines |
| B2 | **`OtpPage` is unreachable.** `"otp"` appears in the `Page` union (57), the `goBack` order array (4200), and `isAuthPage` (4213) — but `App()` has **no render branch for it**. OAuth replaced the OTP flow. | `App.tsx:663–935` | 273 lines |
| B3 | **9 stale data tables superseded by the server catalog.** Each symbol appears exactly once in the file — its own declaration. The pages now read `catalog.*` from the API, so these are not just dead, they silently *contradict* the backend catalog. | `BUSINESS_CATEGORIES:1239`, `DESIGN_MOODS:1253`, `ANIMATION_LEVELS:1263`, `PALETTES:1632`, `FONT_PAIRS:1643`, `AVAILABLE_SECTIONS:2255`, `PAGE_TEMPLATES:2261`, `PHASES:2871`, `VERSIONS:2933` | ~150 lines |
| B4 | **3 unused imports** — `svgPathsColors`, `svgPathsPages`, `imgLight`. | `App.tsx:50–52` | 3 lines |
| B5 | **Dead auth API + hardcoded staging credentials.** `requestAccessCode` / `verifyAccessCode` are not called from `App.tsx`. `loginSchema` (hardcoding `test@innovationcity.com`) is imported by nothing; `otpSchema` (hardcoding code `123456`) is used only by the unreachable `OtpPage`. Both still ship in the production bundle. | `launchkit-api.ts:279–288`, `wizard-validation.ts:18–34` | — |
| B6 | **Dead props that read as meaningful.** `TopHeader.showProfile` (180) — the actions area is an empty JSX gap (201–202). `ScaledPage.designHeight` (93) is received as `_designHeight` and never used, yet all 10 pages pass a considered value (`900`/`1000`/`1100`/`1200`). | `App.tsx:93, 180` | — |
| B7 | **`ailk_page` is written on every navigation and never read.** `go()` (3878) persists it; the only reader is dead `LegacyApp` (3711). `App()` derives its initial page from `hasAccessToken()` instead. | `App.tsx:3878` | — |

**Total removable with zero behaviour change: ~540 lines of `App.tsx` plus dead exports.**

### C. Correctness bugs

**C1 — Two of the four loading spinners never animate.** ⚠️ *User-visible.*

Four elements use `animation: "spin 1s linear infinite"` (2902, 3195, 3624, 4221), but
`@keyframes spin` is only injected as an inline `<style>` by `GeneratingPage` (2927) and
`BuildingPage` (3215). Verified against the built CSS — the only keyframes present are
`accordion-down`, `accordion-up`, `caret-blink`, `enter`, `exit`, `pulse` (all from
`tw-animate-css`). `spin` is absent, and no `animate-spin` utility is used anywhere.

Result: the **app boot loader** (4221) and the **ProjectsPage loader** (3624) render a static,
non-spinning ring on a fresh page load — precisely the two places a user waits longest.

**C2 — Inconsistent iframe sandboxing on generated content.** `PreviewPage` renders mockup HTML with
`sandbox="allow-scripts"` (3104), but `DownloadPage` renders the built site with **no `sandbox`
attribute at all** (3366–3371). Both display backend/AI-generated content; only one is contained.

**C3 — `ACTIVE_BUILD_STATUSES` is defined twice**, as a `Set` in `launchkit-api.ts:378` and an array
in `App.tsx:3826`. The polling loop and the UI gate can drift apart.

**C4 — `localStorage` is accessed unguarded** in `useState` initialisers (3861) and in `go()` (3878).
In Safari private mode or with storage blocked, this throws during render and takes the whole app
down.

**C5 — Effect dependency arrays that don't match their bodies.** The build watcher declares
`[build?.id]` but closes over `build` (3986–4007); `PreviewPage`'s selection effect lists `selected`
while also calling `setSelected` (2956–2961). Both currently behave, but nothing enforces this —
there is no linter (D7).

**C6 — Errors render twice.** The global toast (4230–4235) renders on every page, while
`GeneratingPage` and `BuildingPage` additionally take `error` as a prop and render it inline
(2912, 3202). On a build failure the same message appears in two places.

**C7 — Section id collisions.** `sid()` (2252–2253) is backed by a module-level `_sid` counter
producing `s1`, `s2`, … while `editorPages` mints server-shaped ids (`${template.id}:${templateId}:${index}`,
2353). The counter resets on reload but persisted ids do not.

**C8 — The questionnaire has no `<form>` element.** Six inputs are registered via `react-hook-form`
(1206) but there is no wrapping form, so Enter does not submit.

### D. Practices and consistency

- **D1 — Two styling systems in the same elements.** 265 inline `style={{}}` vs 293 `className`,
  frequently on one node. Colours are hardcoded hex, with the brand teal spelled both ways —
  `#6fccdd` ×59 and `#6FCCDD` ×20. Meanwhile `src/styles/theme.css` defines a full shadcn token set
  (181 lines, light + dark) that **drives nothing** in `App.tsx` and describes a *light* palette for
  an app that is hardcoded dark (`#0b0b0b`).
- **D2 — Colour-derivation logic copy-pasted three times.** The identical `mix`/`toHex`/luminance
  block appears at 1884–1893, 1936–1947, and 1973–1984 in the custom-palette modal.
- **D3 — Five hand-rolled modals** (1067, 1500, 1574, 1860, 2104) with no `role="dialog"`, no focus
  trap, no Escape handler, and no scroll lock. Stacking is ad hoc: `zIndex: 9999`, `z-50`,
  `z-[10000]`. `components/ui/dialog.tsx` — a Radix dialog that solves all of this — sits unused.
- **D4 — Index keys** (`key={i}`) on palette, font, and step lists (1754, 2058, 440, 512).
- **D5 — No error boundary anywhere.** One `console.error` in the entire app (2975); any render throw
  blanks the page.
- **D6 — Hover states via inline JS** (`onMouseEnter`/`onMouseLeave` mutating `style`) at 2711–2712,
  2744–2745, 2778–2779 instead of CSS.
- **D7 — No linter or formatter at all.** No ESLint, no Prettier, no `react-hooks` rules, no
  `jsx-a11y`. Nothing mechanically catches C5, D4, unused imports (B4), or accessibility gaps.
- **D8 — Test coverage is inverted.** The two well-structured modules have 11 tests; the 4,258-line
  file with all the behaviour has none. Worse, B5 means part of the suite covers endpoints the app no
  longer calls, which makes coverage look healthier than it is.

### E. Tooling and repo hygiene

- **E1 — CI is currently red.** `npm audit` exits **1**: `react-router` (**high** — GHSA-qwww-vcr4-c8h2),
  `postcss` (moderate), `tar` (moderate). `react-router` is one of the never-imported dependencies —
  CI is blocked by an advisory in a package the app does not use. Amplify does not run `audit`, so
  deploys still succeed; the two pipelines disagree.
- **E2 — 57 dependencies; 4 reach the live app.** Verified breakdown:
  - **Never imported anywhere (14):** `@emotion/react`, `@emotion/styled`, `@mui/material`,
    `@mui/icons-material`, `@popperjs/core`, `canvas-confetti`, `date-fns`, `motion`, `react-dnd`,
    `react-dnd-html5-backend`, `react-popper`, `react-responsive-masonry`, `react-router`,
    `react-slick`.
  - **Imported only by dormant `components/ui` (38):** all 26 `@radix-ui/*`, `cmdk`, `recharts`,
    `sonner`, `vaul`, `embla-carousel-react`, `input-otp`, `next-themes`, `react-day-picker`,
    `react-resizable-panels`, `class-variance-authority`, `clsx`, `tailwind-merge`.
  - **Reaching the live app (4):** `@hookform/resolvers`, `react-hook-form`, `zod`, `lucide-react`
    (+ `react`/`react-dom`, and `tw-animate-css` via CSS).
- **E3 — `react` and `react-dom` are optional `peerDependencies`, not `dependencies`** (package.json
  86–96). They resolve today from the lockfile, but this is fragile for any lockfile-less install.
- **E4 — Version pinning is now mixed.** The Figma-export convention was exact pins; recent additions
  use ranges (`@hookform/resolvers ^3.10.0`, `zod ^3.25.76`, `react-router ^7.18.1`, `typescript
  ^5.8.3`, `vite ^6.4.3`, `vitest ^4.1.10`, `jsdom ^29.1.1`, `@types/* ^`).
- **E5 — Conflicting package-manager signals.** `package-lock.json` + CI `npm ci`, alongside
  `pnpm-workspace.yaml` (with `minimumReleaseAge: 10080`) and a `pnpm.overrides` block pinning
  `vite 6.4.3` while devDependencies say `^6.4.3`.
- **E6 — Two contradictory READMEs.** `README.md` is current (backend, `.env.example`, quality gates).
  `README-frontend.md` is stale and tells the reader to `cd ~/Downloads/FINAL/ai-launch` — a personal
  absolute path — and never mentions env configuration.
- **E7 — `check:repo` is still a no-op** that prints `'Repository workflow ready'`.
- **E8 — `vite.config.ts` is not typechecked.** `tsconfig.json` sets `include: ["src"]`, so the
  config's `resolveId(id)` parameter is implicitly `any` despite `strict: true`.
- **E9 — `figmaAssetResolver` is dormant** — it maps `figma:asset/*` to `src/assets/`, which does not
  exist, and no `figma:asset` import exists.
- **E10 — Dead files:** `src/styles/globals.css` (0 bytes, unimported), `guidelines/Guidelines.md`
  (still the unedited Figma template), `default_shadcn_theme.css` (root, not in the build).

---

## 4. Cleanup plan

Ordering principle: **establish verification before changing anything, then work outward from
zero-risk deletions to higher-risk refactors.** No phase changes behaviour, an endpoint, or a flow.
Phases 1–4 are provably behaviour-preserving; Phase 5 is the only one that can alter pixels, so it
comes last and needs visual review.

Every phase ends green on `npm test && npm run typecheck && npm run build`, plus this manual smoke
walk (there is no automated coverage of it yet):

> sign in → projects → create → questionnaire (+ upload) → category & mood → colors & fonts →
> pick pages → generating → preview → building → download → deploy → back → sign out, each at a
> narrow (≈360 px) and wide (≈1440 px) viewport.

### Phase 0 — Guardrails (do this first)

| Task | Why |
| --- | --- |
| Add ESLint (`@typescript-eslint`, `react-hooks`, `jsx-a11y`, `import`) + Prettier, wired into CI | Nothing currently catches C5, D4, B4, or a11y regressions. This is the tool that makes later phases safe. |
| Add smoke render tests — one per page component, asserting it mounts with representative props | The extraction in Phase 3 is only verifiable if something renders each page. Requires adding `@testing-library/react` + `@testing-library/jest-dom` (new dev deps). |
| Decide the `npm audit` policy — `--audit-level=high` with an allowlist, or a scheduled job instead of a build gate | E1: CI is red right now. Pruning `react-router` in Phase 6 clears the high advisory, but the policy question is independent. |
| Capture before-screenshots of all 11 screens at both viewports | The reference for proving Phase 5 changed nothing visually. |

**Risk:** none to app code. **Note:** Phase 0 will surface many lint errors on the existing 4,258-line
file; land the config with warnings-not-errors for pre-existing violations, then ratchet.

### Phase 1 — Delete verified dead code

Findings B1–B7. Strictly subtractive, one commit per item so each is independently revertable:
`LegacyApp` (+ all 7 `as any`), `OtpPage` and the `"otp"` page state, the 9 stale data tables, the 3
unused imports, the dead `showProfile`/`designHeight` props and their 10 call sites, the `ailk_page`
write, and the dead auth API + hardcoded staging credentials (B5 — decide whether to delete the
endpoint methods and their tests, or keep the methods and mark them intentionally unused).

**Expected: −~540 lines from `App.tsx` (4,258 → ~3,720), 7 → 0 `as any`.**
**Risk:** very low — verified unreachable. **Verify:** typecheck + build + smoke walk.

### Phase 2 — Fix the real bugs

Findings C1–C8, smallest diffs first:

1. **C1** — define `@keyframes spin` once in `src/styles/index.css`; delete both inline `<style>`
   injections. Fixes two non-animating spinners. *(User-visible fix.)*
2. **C2** — add `sandbox` to the `DownloadPage` iframe, matching `PreviewPage`. Confirm the generated
   site still renders under the chosen policy before shipping.
3. **C3** — export `ACTIVE_BUILD_STATUSES` from `launchkit-api.ts`; delete the `App.tsx` copy.
4. **C4** — add a guarded `safeStorage` wrapper (`get`/`set`/`remove` in try/catch) and route all 5
   session keys through it.
5. **C6** — pick one error surface per page; stop double-rendering.
6. **C5, C7, C8** — correct the dep arrays, make section ids collision-proof, wrap the questionnaire
   in a `<form>` with `onSubmit`.

**Risk:** low, but C2 and C8 change observable behaviour slightly (iframe permissions; Enter now
submits). Both are corrections — flag them in the PR.

### Phase 3 — Extract `App.tsx` (mechanical, no logic edits)

Target layout:

```
src/app/
  App.tsx                    → routing + composition only (target: < 200 lines)
  pages/                     → Login, Projects, Questionnaire, CategoryMood,
                               ColorsFonts, PickPages, Generating, Preview,
                               Building, Download  (one file each)
  components/
    layout/                  → ScaledPage, TopHeader, SubNav, LogoSvg
    feedback/                → ValidationError, ErrorToast, Spinner, ErrorBoundary (D5)
  hooks/                     → useProjectSession, useBuildWatcher
  lib/                       → navigation.ts (single ORDER/step source — A2),
                               storage.ts (C4), colors.ts (D2), fonts.ts (loadGoogleFont)
```

Move one page per commit, carrying its local state, helpers, and data tables. **Copy code verbatim —
no renames, no signature changes, no styling edits in this phase.** Run the smoke tests after each
move. Extract shared primitives (`ValidationError`, `firstValidationError`, `ScaledPage`, `SubNav`)
first so pages have something to import.

**Risk:** low per commit, but this is the largest diff. Keeping it purely mechanical is what makes it
reviewable.

### Phase 4 — Consolidate the navigation state machine

Collapse `WIZARD_PAGES` (3825), the inline `order` array (4200), and `resumePageForProject` (3837)
into one `lib/navigation.ts` exporting the page order, the step↔page mapping, and the
`goNext`/`goBack`/`goToStep`/`resume` derivations. Lift the 12 API command handlers out of `App()`
into `hooks/useProjectSession` so they are testable and stop being redefined per render.

Then decide explicitly: **adopt `react-router` or remove it** (E2). Keeping an unused router that
carries a high-severity advisory is the worst of both options.

**Risk:** medium — this is real logic consolidation. Cover `goNext`/`goBack`/`goToStep`/`resume` with
unit tests *before* touching them; they are pure functions of `(page, maxReachedStep)` and easy to
pin down.

### Phase 5 — Styling convergence (visual risk — do last)

1. Replace the unused light-palette tokens in `theme.css` with the actual dark brand tokens
   (`--bg: #0b0b0b`, `--brand: #6fccdd`, …), fixing the `#6fccdd`/`#6FCCDD` split (D1).
2. Extract the duplicated colour maths into `lib/colors.ts` (D2).
3. Replace the 5 hand-rolled modals with the existing `components/ui/dialog.tsx`, gaining focus trap,
   Escape, and `role="dialog"` for free (D3).
4. Convert inline hover handlers to CSS (D6); normalise the z-index scale.
5. Migrate inline `style={{}}` to Tailwind **only where it is mechanical** — do not convert 265 blocks
   as one change.

**Risk:** highest of any phase — every item can shift pixels. Gate each on the Phase 0 screenshots.
Treat this as several PRs, never one.

### Phase 6 — Dependencies and repo hygiene

- Remove the 14 never-imported dependencies (E2). This clears the `react-router` high advisory (E1).
- **Decide on `components/ui/**` and `src/imports/*/index.tsx`** (A4, A5). Two defensible options:
  keep `ui/` as the intended library and adopt it in Phase 5 (recommended — Phase 5 step 3 already
  needs `dialog.tsx`), or delete both and drop 38 dependencies. What is not defensible is leaving
  12,894 lines of unreferenced code in place indefinitely.
- Move `react`/`react-dom` to `dependencies` (E3); settle one pinning policy (E4).
- Resolve the pnpm-vs-npm conflict (E5) — delete `pnpm-workspace.yaml` and the `pnpm.overrides` block,
  or commit to pnpm and drop `package-lock.json`.
- Fold `README-frontend.md` into `README.md` (E6). Remove `check:repo` (E7). Add `vite.config.ts` to
  typechecking (E8). Remove `figmaAssetResolver` or create `src/assets/` (E9). Delete
  `src/styles/globals.css`; fill in or remove `guidelines/Guidelines.md` (E10).

**Risk:** low for pruning (build proves it), medium for the `ui/` decision — that one is a product
call about where the design system is heading, not a cleanup detail.

---

## 5. Suggested sequencing

| Order | Phase | Risk | Behaviour change |
| --- | --- | --- | --- |
| 1 | 0 — Guardrails | none | no |
| 2 | 1 — Delete dead code | very low | no |
| 3 | 2 — Fix bugs | low | yes — 3 intentional corrections |
| 4 | 6 — Dependency pruning *(can run parallel to 3)* | low | no |
| 5 | 3 — Extract `App.tsx` | low per commit, large diff | no |
| 6 | 4 — Navigation consolidation | medium | no |
| 7 | 5 — Styling convergence | high | visual only |

Phases 1 and 2 give the biggest readability win per unit of risk: −540 lines, −7 `as any`, and two
visible bugs fixed, with no flow touched. Phase 3 is where "everything is in one file" actually stops
being true, but it is only safe once Phase 0's smoke tests exist.

**One open decision blocks Phase 6 and shapes Phase 5:** keep and adopt `components/ui/**`, or delete
it. That answer determines whether 38 dependencies stay.
