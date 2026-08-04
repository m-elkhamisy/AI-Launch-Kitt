<!--
Sync Impact Report
Version change: none → 1.0.0 (initial ratification)
Modified principles: none (first version)
Added sections:
  - Core Principles I–V
  - Technology and Convention Constraints
  - Development Workflow and Quality Gates
  - Governance
Removed sections: none
Templates requiring review: .specify/templates/plan-template.md,
  .specify/templates/spec-template.md, .specify/templates/tasks-template.md
  (unmodified; they read this file at runtime)
Follow-up TODOs: none
Derived from: AGENTS.md, docs/frontend-review.md, README.md
-->

# AI Launch Kit Frontend Constitution

## Core Principles

### I. The API Is the Source of Truth

The backend owns projects, wizard catalogs, uploads, mockups, builds, and deployments. The client
MUST read them from the API and MUST NOT ship a local copy of any server-owned list. Every server
call MUST be added to the `launchKitApi` object in `src/app/launchkit-api.ts`; components MUST NOT
call `fetch` directly. Every resource MUST have a typed `*View`, and failures MUST surface as a
`LaunchKitApiError` carrying `status`, `code`, and `requestId`.

*Rationale:* nine hardcoded catalog tables once silently contradicted the backend. Centralising the
client is also what makes auth headers, credential mode, idempotency keys, and error decoding
uniform instead of per-call.

### II. One Source of Truth per Concern

Page order lives only in `src/app/lib/navigation.ts`. Session keys live only in `lib/storage.ts`.
Colour derivation lives only in `lib/colors.ts`. Validation lives only in `wizard-validation.ts` as
zod schemas surfaced through `<ValidationError>`. Duplicating any of these MUST be treated as a
defect, not a style preference.

*Rationale:* navigation was encoded three times and drifted; `ACTIVE_BUILD_STATUSES` existed twice
and let the polling loop and the UI gate disagree.

### III. Pages Are Presentational

`hooks/useProjectSession` owns wizard state, the OAuth bootstrap, and every API command. Pages
receive data plus callbacks and MUST own only local UI state. Mutations MUST go through `perform()`
so busy state, error surfacing, and 401 → sign-out stay uniform. A page's own component belongs
beside it in `pages/<Name>/`; anything used by two or more pages belongs in `components/common/`;
pure logic belongs in `lib/` when shared. Overlay markup MUST NOT be inlined in a page — every modal
is its own component with an explicit prop signature.

### IV. Every Change Leaves the Four Gates Green

`npm test`, `npm run typecheck`, `npm run build`, and `npm audit` MUST all pass before a change is
proposed. `tsc` runs in `strict` mode and that MUST NOT be relaxed; `as any` MUST NOT be introduced.
Every page MUST have at least a smoke render test in its own folder, and pure logic modules MUST have
unit tests. Because no test mounts `App` or drives a full flow, any UI change MUST also be walked
manually — sign in → projects → create → questionnaire → category & mood → colors & fonts → pick
pages → generating → preview → building → download — at roughly 360 px and 1440 px.

*Rationale:* `npm audit` is publication-sensitive and can turn red with no code change; the gate is
still non-negotiable because the alternative is shipping known advisories. See the audit policy note
in `AGENTS.md`.

### V. One Concern per Change

Restructuring, converting inline styles to Tailwind, fixing bugs, and adding tooling MUST each be
their own commit. A refactor described as behaviour-preserving MUST NOT change what the user sees or
what an endpoint receives; if it does, that is a separate and explicitly flagged change. Known gaps
documented in `AGENTS.md` MUST NOT be silently "fixed" as a side effect of unrelated work.

## Technology and Convention Constraints

- **Stack:** Vite 6, React 18.3, TypeScript strict, Tailwind CSS v4, `react-hook-form` + `zod`,
  Vitest + jsdom + Testing Library. There is no router; anything a later page needs MUST be lifted
  into `useProjectSession` first.
- **Icons:** `lucide-react` only. Raw SVG path data MUST NOT be added. The Innovation City logo in
  `components/common/logo-paths.ts` is the sole exception and its coordinates MUST NOT be hand-edited.
- **Styling:** inline `style={{}}` and `className` coexist deliberately; new code MUST match the
  surrounding block rather than converting it. Colours are hardcoded hex — dark `#0b0b0b` with brand
  teal `#6fccdd`, lowercase preferred. The `theme.css` tokens are an unused light palette and MUST NOT
  be assumed to apply.
- **Tailwind v4 scanner:** Tailwind utility names MUST NOT appear in prose comments, because the
  scanner reads comment text as class candidates and ships real unused CSS.
- **Responsiveness:** flexbox/grid, `clamp()`, and Tailwind breakpoints. JS device detection MUST NOT
  be introduced; render both layouts and let the media query choose.
- **Effects:** `useEffect` timers MUST use `window.setTimeout` and MUST return a cleanup. Async
  effects MUST use an `AbortController` and check `signal.aborted` before `setState`.
- **Storage:** every `localStorage` access MUST go through `lib/storage`, which guards it — unguarded
  access once killed the app at first render in blocked-storage browsers.
- **Generated content:** any iframe rendering backend or AI-generated HTML MUST carry an explicit
  `sandbox` attribute.
- **Dormant code:** `components/ui/**` (shadcn), `components/figma/**`, and `pages/Otp/` are kept
  deliberately. They MUST be left alone unless a change is specifically about adopting or removing
  them.

## Development Workflow and Quality Gates

- Work happens on a feature branch and lands via PR. Committing directly to `main` is prohibited.
- Commit messages are short imperative sentences.
- CI (`.github/workflows/ci.yml`) runs the four gates; Amplify (`amplify.yml`) runs the first three.
  `VITE_API_BASE_URL` MUST be set at build time. The two pipelines disagreeing on `audit` is a known
  condition, not a licence to skip it locally.
- Comments explain *why* a decision was made. Non-obvious CSS and non-obvious constraints MUST be
  annotated; obvious code MUST NOT be narrated.
- Spec-driven development is the default for new features: `/speckit-specify` → `/speckit-plan` →
  `/speckit-tasks` → `/speckit-implement`, with specs under `specs/<NNN>-<short-name>/`. A change
  small enough to describe in one sentence and verify with one test does not require a spec.

## Governance

This constitution supersedes ad-hoc practice. Where it and `AGENTS.md` overlap, they MUST agree —
amending one requires updating the other in the same change.

Amendments MUST be made as their own commit, MUST state the rationale, and MUST update the version
and `Last Amended` date below. Versioning is semantic: MAJOR for removing or redefining a principle
in a backward-incompatible way, MINOR for adding a principle or materially expanding guidance, PATCH
for clarifications and wording.

Compliance is reviewed at PR time. A PR that violates a principle MUST either be changed or carry an
explicit, written justification for the exception; complexity MUST be justified, never assumed.
Runtime development guidance lives in `AGENTS.md`; the current state of known gaps and outstanding
findings lives in `docs/frontend-review.md`.

**Version**: 1.0.0 | **Ratified**: 2026-08-04 | **Last Amended**: 2026-08-04
