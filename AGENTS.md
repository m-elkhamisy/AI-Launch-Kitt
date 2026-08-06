# AI Launch Kit — Agent Guide

React client for the AI Launch Kit wizard. Originally exported from **Figma Make**, since rebuilt
around a real backend: the API is the source of truth for projects, wizard catalogs, uploads,
mockups, builds, and Vercel deployments.

The review that drove the current structure — with verified findings and what is still outstanding —
is in [`docs/frontend-review.md`](docs/frontend-review.md). The non-negotiable rules this guide
describes are also stated as principles in
[`.specify/memory/constitution.md`](.specify/memory/constitution.md); the two must agree, so amending
one means amending the other in the same change.

## Stack

| Concern     | Choice                                                        |
| ----------- | ------------------------------------------------------------- |
| Build       | Vite 6 (`@vitejs/plugin-react`)                               |
| UI          | React 18.3, TypeScript `strict` (`tsc --noEmit` gate)         |
| Styling     | Tailwind CSS v4 via `@tailwindcss/vite` + inline `style={{}}`  |
| Forms       | `react-hook-form` + `zod` via `@hookform/resolvers`            |
| Icons       | `lucide-react` throughout; only the logo is raw path data      |
| Tests       | Vitest + jsdom + Testing Library                              |
| Components  | shadcn/ui on Radix — **dormant except `carousel`** (see below)  |
| Font        | Montserrat (Google Fonts, `src/styles/fonts.css`)              |
| Platform    | Windows / PowerShell                                           |
| Node        | **≥ 22.12** required to run the tests — see below              |

```bash
npm i
cp .env.example .env.local   # VITE_API_BASE_URL, defaults to http://localhost:8000
npm run dev
```

Start the backend and its worker first, or every API call fails.

**Node 22.12 is a floor for `npm test`, not a preference.** `jsdom` reaches
`html-encoding-sniffer` → `@exodus/bytes`, which is ESM-only, so on Node < 22.12 — where
`require(esm)` is still behind a flag — all 18 test files fail to start a worker with
`ERR_REQUIRE_ESM` and vitest reports `no tests` rather than a failure. Nothing is wrong with the
repo when that happens. CI pins `node-version: "22"`, which resolves to the latest 22.x and is
unaffected.

## Quality gates

```bash
npm test && npm run typecheck && npm run build && npm audit
```

All four pass on `main` and must stay passing — CI (`.github/workflows/ci.yml`) runs exactly these;
Amplify (`amplify.yml`) runs the first three. `VITE_API_BASE_URL` must be set at build time.

**`npm audit` is a publication-sensitive gate.** It fails on any advisory at any severity, including
ones in dev-only transitive packages that never ship — a new advisory turns CI red with no code
change. When that happens, `npm audit fix` and commit the lockfile; only investigate properly if the
package actually reaches the bundle. Worth replacing with `--audit-level=high --omit=dev`, or a
scheduled job rather than a build gate (finding E1).

`npm run check:repo` is a no-op that prints a string; it verifies nothing.

## Layout

```
src/
  main.tsx                      createRoot → <App/>, imports styles/index.css
  assets/showcase/              6 PNGs exported from Figma for the welcome screen
  app/
    App.tsx                     routing + loading gate only (~90 lines)
    launchkit-api.ts            API client: typed views, LaunchKitApiError, SSE build stream
    wizard-validation.ts        all zod schemas + inferred value types
    hooks/
      useProjectSession.ts      wizard state, auth bootstrap, all 12 API commands
    lib/
      navigation.ts             PAGE_ORDER, WIZARD_PAGES, step maths, resume — single source
      storage.ts                session keys, every access guarded
      colors.ts                 palette derivation from a primary colour
      fonts.ts                  loadGoogleFont
    data/google-fonts.ts        the Google Fonts name list
    pages/<Name>/               one folder per page: the page, its page-local
                                components, and any page-local pure logic
      Login/          LoginPage · SignInPanel · ShowcaseCarousel · ShowcaseSlideView
                      ShowcaseIndicators · MockupFrame · PdfViewerMockup
                      BrochureViewerMockup · WebsiteMockup · showcase-slides
                      showcase-motion · useAutoAdvance · usePageCycle
                      usePrefersReducedMotion · useReveal (+ tests)
      Otp/            OtpPage (parked, no importer)
      Projects/       ProjectsPage
      Questionnaire/  QuestionnairePage · UploadPortfolioModal
      CategoryMood/   CategoryMoodPage · CategoryPickerModal · MoodPickerModal
      ColorsFonts/    ColorsFontsPage · CustomPaletteModal · CustomFontModal
                      FontCard · types
      PickPages/      PickPagesPage · SectionRow · page-layout (+ tests)
      Generating/     GeneratingPage
      Preview/        PreviewPage
      Building/       BuildingPage
      Download/       DownloadPage · BrowserFramePreview · DeployTooltip
    components/
      common/                   ScaledPage, TopHeader, SubNav, LogoSvg, ValidationError,
                                ErrorToast, Spinner — used across pages
      ui/                       47 shadcn components — dormant except carousel
                                (+ button, utils, which it imports), leave the rest alone
      figma/                    ImageWithFallback — dormant
    test/                       fixtures.ts (factories), reduced-motion.ts, setup.ts
  styles/                       index.css → fonts.css, tailwind.css, theme.css
```

`@/*` → `src/*`, resolved by both `vite.config.ts` and `tsconfig.json` `paths`.

### Where code goes

- **A page's own component** (a modal, a card, a row) → beside the page in `pages/<Name>/`.
- **Used by two or more pages** → `components/common/`.
- **Pure logic, no JSX** → `lib/` if shared, `pages/<Name>/` if it serves one page
  (see `PickPages/page-layout.ts`: functions of `(pages, …) → pages`, unit-tested, no React).
- **No overlay markup inline in a page.** Every modal is its own component with an explicit prop
  signature. Five pages used to inline them; none do now.
- **Server calls** → add to the `launchKitApi` object in `launchkit-api.ts`. Never `fetch` from a
  component.
- **Validation** → a zod schema in `wizard-validation.ts`, surfaced through `<ValidationError>`.

## Architecture

**`launchkit-api.ts` is the model to follow.** One `request<T>()` centralises auth headers,
`credentials: "include"`, and error-envelope decoding. Every resource has a `*View` type. Errors are
`LaunchKitApiError` with `status`/`code`/`requestId`. Builds stream over SSE with `Last-Event-ID`
resumption; creates carry idempotency keys.

**`hooks/useProjectSession`** owns wizard state, the OAuth bootstrap, and every API command the pages
trigger. `perform()` wraps each mutation with busy/error handling and 401 → sign-out. Pages stay
presentational: they receive data plus callbacks (`project`, `catalog`, `onSave`, `busy`, `onBack`,
`onStepClick`, `completedUpTo`) and own only local UI state.

**`lib/navigation.ts` is the only place page order lives.** Adding a page means editing the `Page`
union and `PAGE_ORDER` there, adding it to `WIZARD_PAGES` if it is a breadcrumb step (index-aligned
with `STEPS` in `SubNav`), and adding a render branch in `App.tsx`. It is unit-tested — extend
`navigation.test.ts` alongside.

There is no router; `react-router` is not installed. Anything a later page needs must be lifted into
`useProjectSession` first.

Session keys: `ailk_accessToken` (owned by `launchkit-api`), plus `ailk_projectId`,
`ailk_operationId`, `ailk_maxReachedStep` behind `lib/storage`.

## Icons and the logo

**Icons are `lucide-react` components.** There is no `src/imports/` any more — it held 146 raw SVG
path strings from Figma Make, of which only 52 rendered and 40 of 61 distinct keys were duplicated
across files. Use a lucide icon for anything new; don't paste path data.

**The logo is the one exception.** lucide has no Innovation City wordmark, so the 18 brand paths live
in `components/common/logo-paths.ts` as `LOGO_MARK`, `LOGO_WORDMARK` and `LOGO_GLYPH`, beside
`LogoSvg` which draws them. Don't hand-edit the coordinates, and don't try to substitute a stock
glyph. `LogoSvg.test.tsx` asserts all 16 shapes carry real geometry, because a missing key renders
`<path d={undefined} />` without throwing.

A few small inline `<svg>` literals remain in page markup (the address-bar cross, a couple of
wireframe strokes). Those are decoration rather than icons; replace them with lucide only if you are
already editing that block.

## Conventions

- **Styling is mixed** — inline `style={{}}` alongside `className`, often on one node. Match the
  surrounding block; a wholesale conversion is its own change.
- **Icons come from `lucide-react`.** Size with `size`, colour with `color`, and pass
  `aria-hidden="true"` unless the icon is the only label.
- **Colors are hardcoded hex.** Dark app (`#0b0b0b`) with brand teal `#6fccdd` — prefer lowercase.
  `theme.css` tokens are an unused *light* shadcn palette; do not assume they apply.
- **Keep Tailwind utility names out of prose comments.** The v4 scanner reads comment text as class
  candidates, so such a word in a sentence ships a real unused CSS rule.
- Responsive: flexbox/grid + `clamp()` + Tailwind breakpoints. **No JS device detection** — `SubNav`
  renders both layouts and lets `lg:` decide.
- `useEffect` timers use `window.setTimeout` and always return a cleanup; async effects use
  `AbortController` and check `signal.aborted` before `setState`.
- Every page has a smoke test in its folder. Add one for a new page.
- Commits are short imperative sentences. Work on a feature branch, PR into `main`; never commit to
  `main` directly.

## Gaps to know about (don't be surprised, don't silently "fix")

1. **No linter or formatter.** No ESLint, no Prettier, no `react-hooks` or `jsx-a11y` rules. Nothing
   mechanically catches wrong effect deps, unused imports (`noUnusedLocals` is off, so `tsc` misses
   them too), or a11y regressions. This is the most valuable thing still missing.
2. **Test coverage is smoke-level for UI.** 80 tests cover the API client, the zod schemas, `lib/`,
   the Pick Pages layout logic,
   and one render per page. No test mounts `App` or exercises a full flow, so after a UI change walk
   it manually: sign in → projects → create → questionnaire → category & mood → colors & fonts →
   pick pages → generating → preview → building → download, at ~360 px and ~1440 px.
3. **`vite.config.ts` is not typechecked** — `tsconfig.json` sets `include: ["src"]`.
4. **`pages/Otp/OtpPage.tsx` is parked** — no importer. Sign-in is IC OAuth, but the backend still
   supports a fixed email/code mode for restricted staging, so it is kept compiling and tested.
   Its `loginSchema`/`otpSchema` still hardcode staging credentials.
5. **Three files stay large on purpose, and are cohesive rather than mixed:**
   `launchkit-api.ts` (544 — one client plus the 25 resource types it returns; splitting the types
   out would be cosmetic), `hooks/useProjectSession.ts` (418 — the commands share too much state to
   separate without inventing coupling), and `components/common/SubNav.tsx` (283 — two responsive
   layouts of the same breadcrumb, deliberately both rendered so CSS picks).
6. **The five modal components** still have no `role="dialog"`, focus trap, or Escape handling. They
   are now separate files, so fixing that is a contained change — `components/ui/dialog.tsx` solves
   it and is sitting unused.
7. No error boundary anywhere; one `console.error` in the app.
8. Mixed package-manager signals (`package-lock.json` + CI `npm ci`, but also `pnpm-workspace.yaml`
   with `minimumReleaseAge: 10080` and a `pnpm.overrides` vite pin). Mixed version pinning: exact
   pins from the Figma export alongside newer `^` ranges.
9. `react`/`react-dom` are optional `peerDependencies`, not `dependencies` — they resolve from the
   lockfile today.
10. **`brochure-spread-2-placeholder.webp` is a stand-in.** The Figma file holds only the
    brochure's first spread, but its viewer shows a two-page rail, so the second spread is a
    generated wireframe in the brochure's palette. Drop the real export in beside it and point
    `showcase-slides.ts` at the new file — nothing else changes. The portfolio's five pages and
    the first brochure spread are all real.
11. **Inside a mockup, `1em` is one design pixel** (see `MockupFrame`). The trap: `em` resolves
    against an element's *own* font-size, so `left: 16em` beside `fontSize: 7em` lands at 112
    design pixels. jsdom does no layout, so no test catches it — check the browser after touching
    mockup geometry.
12. Dormant by design: `figmaAssetResolver` in `vite.config.ts` (maps to a non-existent
    `src/assets/`), `src/styles/globals.css` (empty, unimported), `guidelines/Guidelines.md`
    (unedited Figma template), `README-frontend.md` (stale — `README.md` is current).

## Spec-driven development

New features go through [GitHub Spec Kit](https://github.com/github/spec-kit) rather than starting
from a prompt and a diff:

```
/speckit-specify   → specs/<NNN>-<short-name>/spec.md   (what and why, no tech)
/speckit-clarify   → optional; resolves ambiguity before planning
/speckit-plan      → plan.md, checked against the constitution
/speckit-tasks     → tasks.md, dependency-ordered
/speckit-analyze   → optional; cross-artifact consistency check
/speckit-implement → executes tasks.md
```

A change small enough to describe in one sentence and verify with one test does not need a spec.

`.specify/` and `specs/` are **committed** — the constitution, templates, and specs are reviewed
artifacts, and Spec Kit's upgrade path assumes they are in version control. Only local state is
ignored (see `.gitignore`). The scripts are PowerShell (`--script ps`), matching the platform.

Re-run the CLI through `uvx` rather than installing it globally:

```bash
uvx --from git+https://github.com/github/spec-kit.git specify check
```

## Working agreements

- One concern per change. Restructuring, converting inline styles to Tailwind, fixing bugs, and
  adding tooling are each separate commits.
- Behaviour-preserving refactors must stay behaviour-preserving. If a cleanup changes what the user
  sees or what an endpoint receives, that is a separate, flagged change.
- Comments explain *why* a decision was made (see `ScaledPage`, `lib/navigation.ts`). Keep that
  density: annotate non-obvious CSS and non-obvious constraints, skip narrating obvious code.
