# Phase 1 Data Model: Auth screen showcase carousel

No server data, no persistence, no session key. The only structure is the static shape of a showcase
slide, defined once in `src/app/pages/Login/showcase-slides.ts`.

## ShowcaseSlide

| Field | Type | Rule |
| --- | --- | --- |
| `id` | `string` | Stable, unique across the set. Used as the React key and in indicator accessible names. Values: `website`, `portfolio`, `brochure`. |
| `accent` | `string` | Lowercase hex. Tints the badge label, badge icon, star rating, and filled indicators. Unique per slide. |
| `badgeLabel` | `string` | Non-empty. Exact copy from FR-008. |
| `BadgeIcon` | `LucideIcon` | A `lucide-react` component, not path data (constitution). Rendered at 20 × 20 with `aria-hidden`. |
| `headline` | `string` | Non-empty. Stored sentence case; rendered with `text-transform: capitalize` so the result matches FR-008. |
| `subcopy` | `string` | Non-empty. Exact copy from FR-008. |
| `mockupSrc` | `string` | Imported asset URL for the 736 × 472 product mockup. |
| `mockupAlt` | `string` | Describes the capability, not the picture (FR-021). |
| `textureSrc` | `string` | Imported asset URL for the panel background texture. |
| `stats` | `ShowcaseStat[]` | Exactly 4 entries, in order, matching FR-009. |

## ShowcaseStat

| Field | Type | Rule |
| --- | --- | --- |
| `value` | `string` | Non-empty. The large line — e.g. `5 min`, `100%`, `PDF export`. |
| `caption` | `string` | Non-empty. The small line beneath — e.g. `Average generation`. |
| `rating` | `boolean \| undefined` | Set only on the fourth stat. When true the caption is preceded by `★★★★★` in the slide accent. |

## Validation rules

Enforced by TypeScript where the type system can, and by `showcase-slides.test.ts` where it cannot:

- The array has exactly three entries, in the order website → portfolio → brochure (FR-005).
- `id` values are unique.
- `accent` values are unique, match `/^#[0-9a-f]{6}$/` (lowercase, per the constitution's colour
  convention), and equal the Figma-extracted values `#e99041`, `#847eda`, `#6fc074`.
- Every slide has exactly four stats, and exactly the last one has `rating: true`.
- No string field is empty or whitespace-only.
- Every `mockupAlt` mentions the capability, so the alternative text is not the filename.

## Derived state (not stored)

| Value | Derivation |
| --- | --- |
| `selectedIndex` | Read from the embla api via its `select` event; local component state, seeded to `0`. |
| Indicator fill | `index <= selectedIndex` — the cumulative rule from FR-016 and research D3. |
| Current accent | `SHOWCASE_SLIDES[selectedIndex].accent`. |
| Auto-advance active | `!reducedMotion && !stoppedByInteraction`. Once `stoppedByInteraction` is true it never returns to false for the life of the screen (FR-012). |

## Lifecycle

The set is frozen module data, created at import time and never mutated. There are no state
transitions beyond the carousel's own selected index, and nothing survives a page reload.
