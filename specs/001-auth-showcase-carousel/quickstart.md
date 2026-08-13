# Quickstart: validating the auth screen showcase carousel

## Prerequisites

- **Node ≥ 22.12.** Below it, jsdom's ESM-only encoding dependency makes every test file fail to start
  a worker and vitest reports `no tests` instead of an error. See `AGENTS.md`.
- `npm i` has been run.
- A backend is **not** required. The login screen renders before any API call succeeds, so the whole
  feature can be validated with the backend down.

```bash
npm i
```

## Automated gates

All four must pass before the branch is proposed (constitution Principle IV):

```bash
npm test && npm run typecheck && npm run build && npm audit
```

Expected: the pre-existing 80 tests still pass, plus the new tests for the slide data, the auto-advance
hook, the indicators, and the extended page smoke test. `npm audit` reports 0 vulnerabilities — no
dependency is added by this feature.

To run only this feature's tests:

```bash
npx vitest run src/app/pages/Login
```

## Manual validation

Start the dev server. The login screen is the first thing rendered when no access token is present, so
no navigation is needed.

```bash
npm run dev
```

If a previous session left a token behind, clear it from the browser console before reloading:

```js
localStorage.removeItem("ailk_accessToken")
```

### Scenario 1 — auto-advance and loop (FR-010, FR-011 · SC-001, SC-002)

1. Load the screen at a desktop width and start a stopwatch. Do not interact.
2. At ~15 s the panel becomes **AI Portfolio Builder** (violet). At ~30 s it becomes **AI Brochure
   Generator** (green). At ~45 s it returns to **AI-Powered Design Builder** (amber).
3. Leave it running for a further two cycles and confirm it never blanks or stalls.

### Scenario 2 — cumulative indicators (FR-016 · SC-003)

1. On the amber slide, one of three dots is filled, in amber.
2. On the violet slide, two dots are filled, in violet.
3. On the green slide, all three are filled, in green.
4. Click the first dot. The amber slide shows immediately, and **no automatic change happens for at
   least 45 s** — auto-advance is stopped for the rest of the visit.
5. Reload, then Tab to the dots. Each takes focus individually with a visible ring and activates on
   Enter and Space.

### Scenario 3 — reduced motion (FR-013 · SC-004)

Windows: Settings → Accessibility → Visual effects → turn **Animation effects** off. Or in Chrome
DevTools: Rendering panel → *Emulate CSS media feature prefers-reduced-motion* → `reduce`.

1. Reload. The amber slide shows and **never changes on its own** over 60 s.
2. The dots still work — clicking the third dot shows the green slide.

### Scenario 4 — the breakpoint, and the embla zero-width risk (FR-004 · SC-005, SC-006)

This is the one step that verifies a known risk from `research.md` (D4) — a carousel that starts inside
a display-hidden container can hold stale measurements.

1. Load at 1440 px. Sign-in occupies roughly the left 42%, the showcase the right 58%.
2. Load at 360 px. The showcase is not rendered; sign-in fills the width; **no horizontal scrollbar**.
3. **Now resize slowly from 360 px up past the breakpoint without reloading.** When the showcase
   appears it must show a correctly positioned slide — not blank, not half-scrolled, not two slides side
   by side. If it is wrong, apply the `api.reInit()` fallback described in `research.md` D4.
4. Resize back down and up again to confirm it stays correct.
5. Check 768 px as an intermediate width.

### Scenario 5 — sign-in is untouched (FR-018, FR-019 · SC-005)

1. Click **Continue with Innovation City**. It disables, reads `Redirecting...`, and starts the OAuth
   redirect exactly as before.
2. Let the carousel advance mid-click and confirm the button never moves, resets, or loses focus.
3. Tab from the top of the page: focus reaches the sign-in button **before** the showcase dots.

### Scenario 6 — image edge cases

1. In DevTools → Network, block `src/assets/showcase/*`, then reload. Badge, headline, subcopy, and
   stats still render and stay readable; no broken-image icon; the carousel keeps advancing.
2. Throttle to Slow 3G and reload. The panel occupies its final size from first paint — nothing below
   the mockup shifts as it arrives.

### Scenario 7 — leaving the screen (FR-014)

1. Sign in successfully so the app moves to the projects screen.
2. Watch the console for 60 s. No React state-update warning, and no error from a timer firing after
   the login screen unmounted.

### Scenario 8 — accessibility (FR-020, FR-021 · SC-007)

1. Run an axe or Lighthouse accessibility pass on the screen. No contrast failures — check the badge
   label, the accent star rating, and the 12 px stat captions at `opacity: 0.5` in particular.
2. With a screen reader, confirm the showcase is announced as a carousel region and that an automatic
   slide change does not interrupt an in-progress announcement or move focus.
3. Zoom the browser to 200%. Headlines and stat cells wrap rather than overlap or clip.

## Full-flow walk

The project has no automated test that mounts `App` or drives a full flow, so any UI change requires
the manual walk from `AGENTS.md`, at ~360 px and ~1440 px:

> sign in → projects → create → questionnaire → category & mood → colors & fonts → pick pages →
> generating → preview → building → download

This feature touches only the first screen, but the walk confirms the `LoginPage` rewrite did not break
the transition out of it.
