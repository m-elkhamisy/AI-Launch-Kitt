# Feature Specification: Auth screen showcase carousel

**Feature Branch**: `feature/auth-showcase-carousel` *(not yet created — work is on `staging` at time of writing)*

**Created**: 2026-08-04

**Status**: Draft

**Input**: User description: "same page but the slider will change after 15 sec, let's use shadcn carousel for this" — with three Figma frames of the redesigned welcome screen: `249-7740` (Website), `249-7902` (Portfolio), `249-7809` (Brochure) in file `im0GYDRPAvzgat7nzDpnL0`.

## Overview

The first screen a person sees today is a single sign-in card centred on an otherwise empty dark
page. It says nothing about what AI Launch Kit does. The redesigned welcome screen splits into two
columns: sign-in stays on the left, and the right becomes a showcase that cycles through the three
things the product makes — a website, a portfolio, and a brochure — advancing on its own every 15
seconds so a visitor who pauses before signing in learns what they are signing in to.

Sign-in itself does not change. The Figma frames draw an email + one-time-code form in the left
column; that is **out of scope** and the existing Innovation City sign-in stays exactly as it
behaves today (see Out of Scope).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor learns what the product does while deciding to sign in (Priority: P1)

Someone lands on the welcome screen for the first time. Beside the sign-in control they see a
showcase panel presenting one product capability: a labelled badge, a headline, a sentence of
explanation, a realistic mockup of the output, and a strip of supporting numbers. They read it. After
15 seconds the panel changes by itself to the next capability, then to the third, then returns to the
first and keeps going. They never touch anything, and by the time they sign in they have seen all
three.

**Why this priority**: this is the whole point of the change. The auto-advance is what makes the
panel a showcase rather than a static banner, and it is the only behaviour the requester specified
explicitly. Without it there is no feature.

**Independent Test**: load the welcome screen, do not interact, and observe that the panel content
changes three times over 45 seconds and returns to the first capability. Fully testable on its own
and delivers the entire informational value.

**Acceptance Scenarios**:

1. **Given** the welcome screen has just loaded, **When** the visitor does nothing for 15 seconds,
   **Then** the showcase panel replaces the first capability with the second.
2. **Given** the third capability is showing, **When** a further 15 seconds pass without interaction,
   **Then** the panel returns to the first capability and continues cycling indefinitely.
3. **Given** any capability is showing, **When** the visitor reads the panel, **Then** it presents
   that capability's badge label, headline, explanatory sentence, output mockup, and four supporting
   figures, all legible without scrolling the panel.
4. **Given** the panel has advanced, **When** the visitor looks at the sign-in column, **Then** it is
   unchanged and still ready to use — nothing about signing in moved, reset, or became unavailable.

---

### User Story 2 - A visitor tracks and steers which capability is showing (Priority: P2)

The visitor wants to look again at a capability they glimpsed, or to see how many there are in total.
Below the showcase, indicator dots show the sequence: one dot per capability, filling progressively as
the carousel advances so the visitor can see how far through the set they are. The dots take the
colour of the capability currently showing. The visitor can select a dot to jump straight to that
capability, and once they do, the panel stops advancing on its own and stays where they put it.

**Why this priority**: the dots are drawn in all three Figma frames, and self-advancing content that
cannot be paused or steered is both frustrating and an accessibility failure. It is P2 rather than P1
because the showcase already delivers its value without manual control.

**Independent Test**: load the screen, select the third dot, confirm the third capability shows
immediately and that no automatic change happens for at least 45 seconds afterwards.

**Acceptance Scenarios**:

1. **Given** the first capability is showing, **When** the visitor looks at the indicators, **Then**
   one of three dots is filled, in the first capability's accent colour.
2. **Given** the second capability is showing, **When** the visitor looks at the indicators, **Then**
   two of three dots are filled, both in the second capability's accent colour.
3. **Given** the third capability is showing, **When** the visitor looks at the indicators, **Then**
   all three dots are filled, in the third capability's accent colour.
4. **Given** any capability is showing, **When** the visitor selects a different dot, **Then** that
   capability shows and automatic advancing stops for the remainder of the visit.
5. **Given** the visitor is moving through the page by keyboard, **When** they reach the indicators,
   **Then** each is individually focusable, visibly focused, and selectable by keyboard alone.

---

### User Story 3 - Someone who cannot use motion, or is on a small screen, still signs in easily (Priority: P3)

A visitor who has asked their system to reduce motion sees the showcase, but it does not change on
its own — they can still step through it with the dots if they want to. A visitor on a phone gets the
sign-in column filling the screen, with the showcase panel not competing for space; signing in takes
exactly as many taps as before.

**Why this priority**: this protects the screen's actual job — signing in — for the people most
likely to be blocked by a decorative addition. It is last only because it is a constraint on the
first two stories rather than new value.

**Independent Test**: set the operating system to reduce motion, load the screen, confirm no
automatic change occurs over 60 seconds while the dots still work. Separately, load at 360 px wide
and confirm the sign-in control is reachable without horizontal scrolling.

**Acceptance Scenarios**:

1. **Given** the visitor's system requests reduced motion, **When** the welcome screen loads, **Then**
   the showcase shows the first capability and never advances by itself.
2. **Given** the visitor's system requests reduced motion, **When** they select a dot, **Then** the
   panel still changes to that capability.
3. **Given** a viewport around 360 px wide, **When** the welcome screen loads, **Then** the sign-in
   control is visible and usable, and the page does not scroll horizontally.
4. **Given** a viewport around 1440 px wide, **When** the welcome screen loads, **Then** sign-in
   occupies roughly the left 42% and the showcase roughly the right 58%, matching the Figma frames.

---

### Edge Cases

- **A mockup image fails to load.** The capability's badge, headline, explanation, and figures MUST
  still render and remain readable; the panel MUST NOT collapse, stretch, or leave a broken-image
  icon, and the carousel MUST keep advancing.
- **Images have not finished loading when the screen appears.** The panel MUST occupy its final size
  from the first paint, so nothing below it shifts as images arrive.
- **The visitor switches away and returns after several minutes.** On return the screen MUST show a
  valid capability with the indicators matching it — not a blank panel, and not a burst of catch-up
  advances.
- **The visitor signs in mid-cycle.** Advancing MUST stop when the screen is left, and MUST NOT
  continue running invisibly or produce errors after the screen is gone.
- **A very short viewport (e.g. 1440 × 600).** The sign-in control MUST remain reachable; the
  showcase MUST NOT push it off-screen.
- **Text is scaled up (200% browser zoom).** Headlines and figures MUST wrap rather than overlap or
  clip.

## Requirements *(mandatory)*

### Functional Requirements

**Layout**

- **FR-001**: The welcome screen MUST present two columns at desktop widths — sign-in on the left,
  the capability showcase on the right — at approximately a 42/58 split, matching the 607 px / 832 px
  proportions of the 1440 px Figma frames.
- **FR-002**: The showcase column MUST fill the full height of the screen, with no header bar above
  it.
- **FR-003**: The sign-in column MUST present its contents centred vertically, flat against the page
  background, without the bordered card container used today.
- **FR-004**: Below a narrow-viewport threshold the showcase MUST NOT prevent or delay sign-in, and
  the page MUST NOT scroll horizontally at any viewport from 360 px upward.

**Showcase content**

- **FR-005**: The showcase MUST present exactly three capabilities in this order: AI-Powered Design
  Builder, AI Portfolio Builder, AI Brochure Generator.
- **FR-006**: Each capability MUST present five elements: a badge label with an icon, a headline, an
  explanatory sentence, a mockup of the output, and a strip of four supporting figures.
- **FR-007**: Each capability MUST carry its own accent colour — amber for the website builder,
  violet for the portfolio builder, green for the brochure generator — applied to its badge icon,
  its star rating, its background tint, and its indicator dots.
- **FR-008**: The copy for each capability MUST match the Figma frames exactly:

  | # | Badge | Headline | Explanation |
  | --- | --- | --- | --- |
  | 1 | AI-Powered Design Builder | Launch A Professional Website In Minutes | Generate a complete, responsive website tailored to your business, ready to customize and publish. |
  | 2 | AI Portfolio Builder | Professional Portfolio. Instantly Yours. | AI creates a polished PDF portfolio that showcases your services, projects, and expertise in a clear, professional format. |
  | 3 | AI Brochure Generator | Create A Brochure That Sells Your Business | Generate a professional brochure with your services, branding, and contact details, ready to print or share digitally. |

- **FR-009**: The four supporting figures per capability MUST match the Figma frames exactly:

  | # | Figure 1 | Figure 2 | Figure 3 | Figure 4 |
  | --- | --- | --- | --- | --- |
  | 1 | 5 min — Average generation | 50+ — Unique styles | 100% — Responsive & SEO | Trusted by 2,000+ clients — ★★★★★ 4.9/5 average rating |
  | 2 | 50+ — Professional layouts | 100% — Brand matched | 1 click — Export as PDF | Trusted by 2,000+ clients — ★★★★★ 4.9/5 average rating |
  | 3 | 100% — Ready for print | PDF export — Download & share | Your Style — Matches your brand | Trusted by 2,000+ clients — ★★★★★ 4.9/5 average rating |

**Advancing**

- **FR-010**: The showcase MUST advance to the next capability automatically 15 seconds after the
  current one appears.
- **FR-011**: The showcase MUST loop — after the third capability it MUST return to the first and
  continue.
- **FR-012**: Automatic advancing MUST stop permanently for the visit once the visitor selects an
  indicator, and MUST NOT resume after a delay.
- **FR-013**: Automatic advancing MUST NOT occur when the visitor's system requests reduced motion;
  manual selection MUST still work.
- **FR-014**: Advancing MUST stop when the welcome screen is no longer displayed, leaving no timer
  running and producing no state updates afterwards.

**Indicators**

- **FR-015**: The showcase MUST display one indicator dot per capability, three in total.
- **FR-016**: Indicators MUST fill cumulatively — one filled on the first capability, two on the
  second, three on the third — each filled dot taking the current capability's accent colour and
  unfilled dots staying neutral.
- **FR-017**: Each indicator MUST be individually operable by pointer and by keyboard, MUST show a
  visible focus state, and MUST convey to assistive technology which capability it selects and which
  is current.

**Sign-in (unchanged behaviour)**

- **FR-018**: The sign-in control MUST continue to start the existing Innovation City sign-in and
  MUST continue to show its in-progress state while redirecting.
- **FR-019**: The showcase MUST NOT interfere with sign-in: no capability change may move, disable,
  reset, or obscure the sign-in control, and the sign-in control MUST be reachable by keyboard before
  the showcase indicators.

**Accessibility**

- **FR-020**: The showcase MUST be announced to assistive technology as a supplementary region, and
  automatic changes MUST NOT steal focus or interrupt a screen reader mid-announcement.
- **FR-021**: All showcase text MUST meet a contrast ratio of at least 4.5:1 against its background;
  mockup images MUST carry text alternatives describing the capability, not the picture.

### Key Entities

- **Capability slide**: one of the three things the product makes. Attributes: order position, badge
  label, badge icon, headline, explanatory sentence, output mockup, accent colour, and four
  supporting figures (each a value and a caption). The set is fixed at three and is presentation
  content, not user or account data — see Assumptions on why it is not server-provided.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Left to itself, the showcase changes capability every 15 seconds ±1 second, and a
  visitor who waits 45 seconds has seen all three capabilities.
- **SC-002**: After the third capability, the next change returns to the first — the cycle repeats
  indefinitely with no dead end and no blank state.
- **SC-003**: Selecting an indicator changes the capability within 1 second, and no automatic change
  occurs for at least 45 seconds afterwards.
- **SC-004**: With reduced motion requested, zero automatic changes occur over 60 seconds, while
  every indicator still works.
- **SC-005**: Signing in takes the same number of interactions as before the change (one), at every
  viewport from 360 px to 1440 px.
- **SC-006**: No horizontal scrollbar appears, and no visible content shifts position after first
  paint, at 360 px, 768 px, and 1440 px.
- **SC-007**: All showcase text passes a 4.5:1 contrast check, and the screen is fully operable by
  keyboard alone.
- **SC-008**: A visitor shown the screen for 45 seconds can name all three things the product makes.

## Out of Scope

- **Replacing sign-in with the email + one-time-code form drawn in the Figma left column.** The
  frames show an email field, a `SEND CODE` action, and a "Need to use a different account? Log in"
  link. Sign-in is Innovation City OAuth and stays that way; reviving the code-based path is a
  separate decision with its own backend and security questions.
- Making the showcase content editable, translatable, or server-provided.
- Changing any screen after sign-in.
- Adding swipe, drag, or arrow controls beyond the indicator dots.

## Assumptions

- **Sign-in mechanism is unchanged.** Confirmed with the requester: the showcase panel and the
  two-column layout are in scope; the Figma left column's email/one-time-code form is not.
- **Cumulative indicator fill is intentional.** Confirmed with the requester: the dots fill up as the
  carousel advances rather than marking a single active slide, matching how all three Figma frames are
  drawn. This is unusual for a carousel and is worth a designer's confirmation before release, but it
  is what the frames show and what was asked for.
- **The sign-in column adopts the design's heading.** The frames read "Welcome To Launch Kit", which
  is independent of how someone signs in, so it replaces today's "Welcome back". The frames' subtitle
  ("Enter your email to receive a one-time code") describes the out-of-scope flow and is therefore
  **not** adopted; the existing Innovation City wording stays.
- **Narrow viewports hide the showcase rather than stacking it.** The Figma frames only cover 1440 px.
  Below the breakpoint the sign-in column takes the full width and the showcase is not shown, so
  signing in on a phone is never behind a scroll. Stacking it below sign-in is the alternative; this
  choice needs design sign-off but does not block implementation.
- **Showcase content lives with the screen, not behind an endpoint.** No API supplies marketing copy,
  and this screen renders before anyone is signed in. The project's rule that the API is the source of
  truth covers server-owned domain data — projects, catalogs, builds — not presentation copy on an
  unauthenticated screen. Recording this here so the plan's constitution check has a stated answer.
- **Mockup imagery comes from the Figma frames as exported assets.** The three mockups are detailed
  product renders, not reproducible markup. The repository has no asset directory today, so
  establishing one is part of the work.
- **Stated technical constraint from the requester**: build the carousel on the shadcn carousel
  component already present but unused in the repository, rather than a new dependency or a
  hand-rolled slider. This is a HOW rather than a WHAT and belongs in the plan; it is recorded here so
  it is not lost, and because adopting a currently-dormant component is a deliberate departure from
  the project's "leave the dormant component library alone" rule that the plan must acknowledge.

## Dependencies

- The three Figma frames remain available for asset export and visual review:
  `249-7740`, `249-7902`, `249-7809` in file `im0GYDRPAvzgat7nzDpnL0`.
- Designer availability to confirm the two open design points above (cumulative dots, narrow-viewport
  behaviour) before release.
- No backend change, no new endpoint, and no change to the sign-in redirect.
