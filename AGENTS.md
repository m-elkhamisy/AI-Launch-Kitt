# AI Launch Kit — Agent Guide

React client for the AI Launch Kit wizard. Originally exported from **Figma Make**, since rebuilt
around a real backend: the API is the source of truth for projects, wizard catalogs, uploads,
mockups, builds, and Vercel deployments.

The review that drove the current structure — with verified findings and what is still outstanding —
is in [`docs/frontend-review.md`](docs/frontend-review.md).

## Stack

| Concern     | Choice                                                        |
| ----------- | ------------------------------------------------------------- |
| Build       | Vite 6 (`@vitejs/plugin-react`)                               |
| UI          | React 18.3, TypeScript `strict` (`tsc --noEmit` gate)         |
| Styling     | Tailwind CSS v4 via `@tailwindcss/vite` + inline `style={{}}`  |
| Forms       | `react-hook-form` + `zod` via `@hookform/resolvers`            |
| Icons       | `lucide-react` for new UI; Figma `<path>` data on old screens  |
| Tests       | Vitest + jsdom + Testing Library                              |
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
npm test && npm run typecheck && npm run build && npm audit
```

All four pass on `main` and must stay passing — CI (`.github/workflows/ci.yml`) runs exactly these;
Amplify (`amplify.yml`) runs the first three. `VITE_API_BASE_URL` must be set at build time.

`npm run check:repo` is a no-op that prints a string; it verifies nothing.

## Layout

```
src/
  main.tsx                      createRoot → <App/>, imports styles/index.css
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
    pages/<Name>/               one folder per page: the page + its page-local components
      Login/  Otp/  Projects/  Questionnaire/  CategoryMood/  ColorsFonts/
      PickPages/  Generating/  Preview/  Building/  Download/
    components/
      common/                   ScaledPage, TopHeader, SubNav, LogoSvg, ValidationError,
                                ErrorToast, Spinner — used across pages
      ui/                       47 shadcn components — dormant, leave alone
      figma/                    ImageWithFallback — dormant
    test/                       fixtures.ts (factories), setup.ts
  imports/                      Figma SVG path dictionaries — see below
  styles/                       index.css → fonts.css, tailwind.css, theme.css
```

`@/*` → `src/*`, resolved by both `vite.config.ts` and `tsconfig.json` `paths`.

### Where code goes

- **A page's own component** (a modal, a card, a row) → beside the page in `pages/<Name>/`.
- **Used by two or more pages** → `components/common/`.
- **Pure logic, no JSX** → `lib/`.
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

## `src/imports/`

Five SVG path dictionaries, flattened and renamed from Figma's generated hashes to `login-paths`,
`category-mood-paths`, `merged-flow-paths`, `download-paths`, `nav-paths`. The original component
trees and unused dictionaries were deleted — nothing imported them, and Tailwind's `@source` glob was
scanning them, shipping every class in ~7,700 lines of dead markup as CSS.

**A Figma re-export writes hash-named files again.** Keep the five clean names and re-apply the
rename, rather than leaving both sets side by side. Never hand-edit the path data itself.

## Conventions

- **Styling is mixed** — inline `style={{}}` alongside `className`, often on one node. Match the
  surrounding block; a wholesale conversion is its own change.
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
2. **Test coverage is smoke-level for UI.** 60 tests cover the API client, the zod schemas, `lib/`,
   and one render per page. No test mounts `App` or exercises a full flow, so after a UI change walk
   it manually: sign in → projects → create → questionnaire → category & mood → colors & fonts →
   pick pages → generating → preview → building → download, at ~360 px and ~1440 px.
3. **`vite.config.ts` is not typechecked** — `tsconfig.json` sets `include: ["src"]`.
4. **`pages/Otp/OtpPage.tsx` is parked** — no importer. Sign-in is IC OAuth, but the backend still
   supports a fixed email/code mode for restricted staging, so it is kept compiling and tested.
   Its `loginSchema`/`otpSchema` still hardcode staging credentials.
5. **The palette and font modals in `ColorsFonts` are still inline** in the page. They close over a
   lot of page state, so lifting them out means designing prop signatures — a refactor, not a move.
6. **Five hand-rolled modal overlays** have no `role="dialog"`, focus trap, or Escape handling.
   `components/ui/dialog.tsx` solves this and is sitting unused.
7. No error boundary anywhere; one `console.error` in the app.
8. Mixed package-manager signals (`package-lock.json` + CI `npm ci`, but also `pnpm-workspace.yaml`
   with `minimumReleaseAge: 10080` and a `pnpm.overrides` vite pin). Mixed version pinning: exact
   pins from the Figma export alongside newer `^` ranges.
9. `react`/`react-dom` are optional `peerDependencies`, not `dependencies` — they resolve from the
   lockfile today.
10. Dormant by design: `figmaAssetResolver` in `vite.config.ts` (maps to a non-existent
    `src/assets/`), `src/styles/globals.css` (empty, unimported), `guidelines/Guidelines.md`
    (unedited Figma template), `README-frontend.md` (stale — `README.md` is current).

## Working agreements

- One concern per change. Restructuring, converting inline styles to Tailwind, fixing bugs, and
  adding tooling are each separate commits.
- Behaviour-preserving refactors must stay behaviour-preserving. If a cleanup changes what the user
  sees or what an endpoint receives, that is a separate, flagged change.
- Comments explain *why* a decision was made (see `ScaledPage`, `lib/navigation.ts`). Keep that
  density: annotate non-obvious CSS and non-obvious constraints, skip narrating obvious code.
