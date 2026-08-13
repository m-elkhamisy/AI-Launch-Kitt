# Specification Quality Checklist: Auth screen showcase carousel

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-08-04
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Items marked incomplete require spec updates before `/speckit-clarify` or `/speckit-plan`

### Validation iterations

**Iteration 1** — three items initially failed; all three were fixed before this checklist was
finalised.

1. *No implementation details* — **failed then fixed.** The requester's instruction to use the
   existing shadcn carousel component is a HOW, not a WHAT, and had leaked into the requirements.
   Resolved by moving it out of the functional requirements and into Assumptions, labelled explicitly
   as a stated technical constraint to carry into `plan.md`. It is recorded rather than deleted
   because dropping it would lose a real instruction, and because adopting a dormant component is a
   deliberate departure from a project rule the plan has to justify.
2. *Requirements are testable* — **failed then fixed.** "Each slide has its own accent colour" and
   "a four-cell stats strip" were not verifiable without opening Figma. Resolved by transcribing the
   exact badge, headline, explanation (FR-008) and all twelve figures (FR-009) into tables in the
   spec, so acceptance does not depend on design-tool access.
3. *Edge cases identified* — **failed then fixed.** The original description covered only the happy
   path. Added six: image load failure, pre-load sizing, backgrounding and return, leaving the screen
   mid-cycle, short viewports, and 200% zoom.

**Iteration 2** — all items pass. No further changes needed.

### Deliberately recorded, not blocking

Two points are settled for implementation but flagged for design sign-off before release. Both are
documented in the spec's Assumptions with the reasoning and the alternative, so neither blocks
planning:

- **Cumulative indicator fill** (FR-016). Confirmed as intentional by the requester and it is what all
  three frames draw, but it is unconventional for a carousel — a designer should confirm it reads as
  progress rather than as a bug.
- **Narrow-viewport behaviour** (FR-004). The frames only cover 1440 px. The spec assumes the showcase
  is hidden below the breakpoint so sign-in is never behind a scroll; stacking it below sign-in is the
  alternative.

### Scope note

The Figma frames draw an email + one-time-code sign-in form that the shipped product does not use —
OAuth deliberately replaced it. This was raised with the requester before the spec was written and
confirmed out of scope. It is called out in the spec's Out of Scope section rather than left implicit,
because anyone comparing the frames to the result will otherwise read the difference as missing work.
