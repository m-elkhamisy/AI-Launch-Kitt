# Phase 1 Contracts: component interfaces

This project exposes no public API, no CLI, and no new endpoint. Its interface surface for this feature
is the prop signature of each new component. Per the constitution, every one is its own file with an
explicit signature — no inlined markup, no implicit context.

## `LoginPage` — unchanged public contract

```ts
function LoginPage(props: {
  onNext: () => void | Promise<void>;
  busy?: boolean;
}): JSX.Element
```

**Unchanged on purpose.** `App.tsx` renders `<LoginPage onNext={signIn} busy={busy} />` and must keep
compiling untouched. The rewrite is internal: it swaps `ScaledPage` for a full-bleed two-column shell
and composes `SignInPanel` and `ShowcaseCarousel`.

## `SignInPanel`

```ts
function SignInPanel(props: {
  onNext: () => void | Promise<void>;
  busy: boolean;
}): JSX.Element
```

Left column. Owns the logo glyph, the "Welcome To Launch Kit" heading, the Innovation City subtitle,
the divider, the OAuth button, and the redirect note. Behaviour is carried over verbatim from today's
`LoginPage`: the button is disabled while `busy`, its label becomes `Redirecting...`, and it calls
`onNext()`. Restyled flat — no card container.

## `ShowcaseCarousel`

```ts
function ShowcaseCarousel(props: {
  slides?: readonly ShowcaseSlide[];   // defaults to SHOWCASE_SLIDES
  intervalMs?: number;                 // defaults to 15_000
}): JSX.Element
```

Right column. Wraps `Carousel` / `CarouselContent` / `CarouselItem` from `components/ui/carousel`,
captures the embla api through `setApi`, tracks `selectedIndex` from the api's `select` event, and wires
`useAutoAdvance`. Renders one `ShowcaseSlide` per entry and one `ShowcaseIndicators` beneath.

Both props exist for testability — a test can pass a single slide or a 50 ms interval — and neither is
supplied by `LoginPage`, which takes the defaults.

Sets `aria-label` on the carousel region and `loop: true` in the embla options (FR-011).

## `ShowcaseSlideView`

```ts
function ShowcaseSlideView(props: { slide: ShowcaseSlide }): JSX.Element
```

One slide's markup: texture background, badge pill, headline, subcopy, mockup image, stats strip. Pure
presentation — no state, no timer, no knowledge of its position in the set.

Named `ShowcaseSlideView` rather than `ShowcaseSlide` so it does not collide with the `ShowcaseSlide`
type from the data module.

The mockup `<img>` carries explicit `width`/`height` so the panel reserves its space before the image
loads, and `onError` hides the image while leaving text intact — the two image edge cases in the spec.

## `ShowcaseIndicators`

```ts
function ShowcaseIndicators(props: {
  count: number;
  selectedIndex: number;
  accent: string;
  onSelect: (index: number) => void;
}): JSX.Element
```

The cumulative dots. Renders `count` buttons; a dot at `index <= selectedIndex` is filled with
`accent`, the rest with `rgba(255,255,255,0.2)`.

Accessibility contract:

- Each dot is a real `<button type="button">`, so it is focusable and keyboard-operable for free
  (FR-017).
- Each carries `aria-label={`Show slide ${index + 1} of ${count}`}` and
  `aria-current={index === selectedIndex}`.
- The group is wrapped in an element with `role="group"` and an accessible name.
- Calling `onSelect` is what stops auto-advance permanently — the indicator component itself holds no
  timer state, it just reports the interaction upward (FR-012).

## `useAutoAdvance`

```ts
function useAutoAdvance(
  api: CarouselApi | undefined,
  options: { intervalMs: number; enabled?: boolean },
): { stop: () => void }
```

**Contract:**

| Condition | Behaviour |
| --- | --- |
| `api` undefined | No timer starts; returns a no-op `stop`. |
| `prefers-reduced-motion: reduce` matches | No timer starts, ever (FR-013). Re-evaluated if the preference changes. |
| `enabled === false` | No timer starts. |
| Normal | `window.setInterval` calls `api.scrollNext()` every `intervalMs`. |
| `stop()` called | Interval cleared and never restarted for the life of the component (FR-012). |
| Unmount | Interval cleared and the media-query listener removed (FR-014). |

`window.matchMedia` being absent is tolerated and treated as "motion allowed", so tests exercise the
default path without a polyfill.

## Data module

```ts
type ShowcaseStat = { value: string; caption: string; rating?: boolean };

type ShowcaseSlide = {
  id: string;
  accent: string;
  badgeLabel: string;
  BadgeIcon: LucideIcon;
  headline: string;
  subcopy: string;
  mockupSrc: string;
  mockupAlt: string;
  textureSrc: string;
  stats: readonly ShowcaseStat[];
};

const SHOWCASE_SLIDES: readonly ShowcaseSlide[];
```

The single source of truth for slide content (Principle II). See [data-model.md](../data-model.md) for
field rules.
