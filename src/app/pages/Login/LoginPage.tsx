import { ShowcaseCarousel } from "./ShowcaseCarousel";
import { SignInPanel } from "./SignInPanel";

// The welcome screen: sign-in on the left, a showcase of what the product makes on
// the right, at the 42/58 split of the Figma frames (607px / 832px of 1440px).
//
// ScaledPage is deliberately not used here. It adds clamp() side padding and caps
// width, which would inset the full-bleed showcase panel; App.tsx already caps the
// page at 1440px, so nothing else changes by leaving it out. There is no header
// bar on this screen either — the design has none.
export function LoginPage({
  onNext,
  busy = false,
}: {
  onNext: () => void | Promise<void>;
  busy?: boolean;
}) {
  return (
    <div
      className="flex min-h-screen w-full flex-col lg:flex-row"
      style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="flex w-full items-center lg:w-[42.2%]">
        <SignInPanel onNext={onNext} busy={busy} />
      </div>
      {/* Bounded by the viewport rather than by its content: the showcase is the
          taller column, so letting it size itself would scroll the whole screen on
          any display shorter than the 900px the design assumes.

          Below lg it stacks under the sign-in panel and needs a definite height of
          its own — the carousel and every slide inside are h-full, so an auto-height
          parent collapses them to nothing. svh rather than vh so the panel does not
          resize when a mobile browser hides its URL bar mid-scroll, and shrink-0
          because the column is a flex container: without it the panel is squeezed
          toward the parent's min-h-screen instead of keeping the height set here. */}
      <div className="flex h-[82svh] min-h-[520px] w-full shrink-0 overflow-hidden lg:h-screen lg:min-h-0 lg:w-[57.8%]">
        <ShowcaseCarousel />
      </div>
    </div>
  );
}
