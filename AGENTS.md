# AI Launch Kit — Agent Guide

React client for the AI Launch Kit wizard. Originally exported from **Figma Make**, since rebuilt
around a real backend: the API is the source of truth for projects, wizard catalogs, uploads,
mockups, builds, and Vercel deployments.

A full code review with verified findings and a phased cleanup plan lives in
[`docs/frontend-review.md`](docs/frontend-review.md). Read it before any refactor — it records what is
dead, what is broken, and the order in which to touch things.

## Stack

| Concern     | Choice                                                        |
| ----------- | ------------------------------------------------------------- |
| Build       | Vite 6 (`@vitejs/plugin-react`)                               |
| UI          | React 18.3, TypeScript `strict` (`tsc --noEmit` gate)         |
| Styling     | Tailwind CSS v4 via `@tailwindcss/vite` + inline `style={{}}`  |
| Forms       | `react-hook-form` + `zod` via `@hookform/resolvers`            |
| Icons       | `lucide-react` for new UI; Figma `<path>` data on old screens  |
| Tests       | Vitest + jsdom                                                 |
| Components  | shadcn/ui on Radix — present but **dormant, zero importers**   |
| Font        | Montserrat (Google Fonts, `src/styles/fonts.css`)              |
| Platform    | Windows / PowerShell                                           |

```bash
npm i
cp .env.example .env.local   # VITE_API_BASE_URL, defaults to http://localhost:8000
npm run dev
```

Start the backend and its worker first, or every API call fails.

## Quality gates

```bash
npm test && npm run typecheck && npm run build
```

All three pass on `main` and must stay passing. `npm audit` is **currently failing** (3 advisories,
one high from the unused `react-router`) — CI runs it, Amplify does not. See finding E1.

`npm run check:repo` is a no-op that prints a string; it verifies nothing.

CI (`.github/workflows/ci.yml`) and Amplify (`amplify.yml`) both run test → typecheck → build.
`VITE_API_BASE_URL` must be set at build time.

## Layout

```
index.html                 → /src/main.tsx
src/
  main.tsx                 createRoot → <App/>, imports styles/index.css
  app/
    App.tsx                ★ 4.2k lines — every page + chrome + routing + API orchestration
    launchkit-api.ts       API client: typed views, LaunchKitApiError, SSE build stream, idempotency
    wizard-validation.ts   all zod schemas + inferred value types
    *.test.ts              11 tests, covering ONLY the two modules above
    components/
      ui/                  47 shadcn components — dormant
      figma/               ImageWithFallback — dormant
  imports/                 Figma-generated; treat as generated, never hand-edit
    <Screen>/svg-*.ts      SVG path dictionaries — THIS is what App.tsx consumes
    <Screen>/index.tsx     original Figma trees — unreferenced
  styles/
    index.css              entry → fonts.css, tailwind.css, theme.css
    theme.css              shadcn tokens (light palette) — drives nothing in App.tsx
```

`@/*` → `src/*`, resolved by both `vite.config.ts` and `tsconfig.json` `paths`.

### What is actually live

`App.tsx`, `launchkit-api.ts`, `wizard-validation.ts`, the 8 `svg-*.ts` dictionaries, and
`src/styles/*`. Everything else is inert — `components/ui/**`, `components/figma/**`, and every
`imports/*/index.tsx` have zero importers. Of 57 declared dependencies, **4 reach the live app**
(`react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`) plus `react`/`react-dom`.

## Architecture

**`launchkit-api.ts` is the model to refactor towards.** One `request<T>()` centralises auth headers,
`credentials: "include"`, and error-envelope decoding. Every resource has a `*View` type. Errors are
`LaunchKitApiError` with `status`/`code`/`requestId`. Builds stream over SSE with `Last-Event-ID`
resumption; creates carry idempotency keys. Add new endpoints to the `launchKitApi` object — never
`fetch` directly from a component.

**`App()` (bottom of `App.tsx`) owns navigation, auth boot, and all API orchestration:**

- `type Page` — 11-member union. `"otp"` is in the union but has **no render branch** (dead).
- `WIZARD_PAGES` — the 4 breadcrumb steps, index-aligned with `STEPS` (line 208).
- `maxReachedStep` + `completedUpTo` gate forward jumps; `goToStep` only goes backwards.
- `resumePageForProject` picks the resume screen from build/mockup state.
- Session keys: `ailk_accessToken`, `ailk_projectId`, `ailk_operationId`, `ailk_maxReachedStep`.
  (`ailk_page` is written but never read.)
- `perform()` wraps every mutation with busy/error handling and 401 → sign-out.

Page components are plain functions taking data + callbacks (`project`, `catalog`, `onSave`, `busy`,
`onBack`, `onStepClick`, `completedUpTo`). There is no store and no router — `react-router` is
installed but never imported. **Anything a later page needs must be lifted into `App()` first.**

Adding a page means editing the `Page` union, the `order` array in `goBack` (~4200), `WIZARD_PAGES`,
`STEPS`, and the render block **in lockstep** — miss one and navigation silently dead-ends. If you
are adding a page, prefer doing Phase 4 of the review first (single navigation source of truth).

## Conventions

- **Extract before you grow.** `App.tsx` is at 4.2k lines. New page work goes in
  `src/app/pages/<Page>.tsx` with its state and helpers, not appended here. See Phase 3 of the review
  for the target layout.
- **Styling is mixed** — 265 inline `style={{}}` vs 293 `className`, often on one node. Match the
  surrounding block; a wholesale conversion is its own change.
- **Colors are hardcoded hex.** Dark app (`#0b0b0b`) with brand teal `#6fccdd` — prefer lowercase, it
  outnumbers `#6FCCDD` ~3:1. `theme.css` tokens are an unused *light* shadcn palette; do not assume
  they apply.
- **Never hand-edit `src/imports/`.** Re-exporting from Figma overwrites it. Import the `svg-*.ts`
  dictionary in `App.tsx` instead.
- Validation belongs in `wizard-validation.ts` as a zod schema, surfaced via `<ValidationError>`.
- Responsive: flexbox/grid + `clamp()` + Tailwind breakpoints. **No JS device detection** — `SubNav`
  renders both layouts and lets `lg:` decide.
- `useEffect` timers use `window.setTimeout` and always return a cleanup; async effects use
  `AbortController` and check `signal.aborted` before `setState`.
- Commits are short imperative sentences. Work on a feature branch, PR into `main`; never commit to
  `main` directly.

## Gaps to know about (don't be surprised, don't silently "fix")

1. **No linter or formatter.** No ESLint, no Prettier, no `react-hooks` or `jsx-a11y` rules. Nothing
   mechanically catches wrong effect deps, unused imports, or a11y regressions. Phase 0 of the review
   addresses this.
2. **Tests cover the API and schemas only.** The 4.2k-line file holding every user-visible behaviour
   has no coverage. After a UI change, walk the flow manually: sign in → projects → create →
   questionnaire → category & mood → colors & fonts → pick pages → generating → preview → building →
   download, at ~360 px and ~1440 px.
3. **`vite.config.ts` is not typechecked** — `tsconfig.json` sets `include: ["src"]`.
4. **`localStorage` is read unguarded** in `useState` initialisers; throws in blocked-storage
   browsers. Wrap it if you touch that code.
5. **Two spinners never animate** — `@keyframes spin` is missing from the built CSS and only injected
   inline by `GeneratingPage`/`BuildingPage`. Finding C1.
6. **Dead code that looks live:** `LegacyApp` (~113 lines, holds all 7 `as any`), `OtpPage`
   (unreachable), and 9 stale data tables superseded by the server catalog (`BUSINESS_CATEGORIES`,
   `PALETTES`, `PAGE_TEMPLATES`, …). Findings B1–B3.
7. **Dead props:** `TopHeader.showProfile` and `ScaledPage.designHeight` (received as
   `_designHeight`) — both still passed by all 10 pages.
8. Mixed package-manager signals (`package-lock.json` + CI `npm ci`, but also `pnpm-workspace.yaml`
   with `minimumReleaseAge: 10080` and a `pnpm.overrides` vite pin). Mixed version pinning: exact pins
   from the Figma export alongside newer `^` ranges.
9. `react`/`react-dom` are optional `peerDependencies`, not `dependencies` — they resolve from the
   lockfile today.
10. Dormant by design: `figmaAssetResolver` (maps to a non-existent `src/assets/`),
    `src/styles/globals.css` (empty, unimported), `guidelines/Guidelines.md` (unedited Figma
    template), `README-frontend.md` (stale — `README.md` is current).

## Working agreements

- One concern per change. Restructuring, converting inline styles to Tailwind, fixing bugs, and adding
  tooling are each separate commits.
- Keep shared data tables as module-level constants above their consumer — that's the existing shape.
- Comments explain *why* a layout decision was made (see `ScaledPage`). Keep that density: annotate
  non-obvious CSS, skip narrating obvious code.
- Behaviour-preserving refactors must stay behaviour-preserving. If a cleanup changes what the user
  sees or what an endpoint receives, that is a separate, flagged change.
