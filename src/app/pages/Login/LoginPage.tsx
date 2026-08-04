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
          any display shorter than the 900px the design assumes. */}
      <div className="hidden lg:flex lg:h-screen lg:w-[57.8%] lg:overflow-hidden">
        <ShowcaseCarousel />
      </div>
    </div>
  );
}
