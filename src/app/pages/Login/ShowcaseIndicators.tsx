/** Colour of a dot the carousel has not reached yet. */
export const UNFILLED_DOT = "rgba(255,255,255,0.2)";

// Progress dots, 8px at 16px centres — the 56px strip in Figma 249:7783.
//
// They fill *cumulatively*: one dot on the first slide, two on the second, three
// on the third, in the current slide's accent. That is how all three frames are
// drawn and was confirmed with the requester, so looping back to the first slide
// legitimately drops from three filled to one.
export function ShowcaseIndicators({
  count,
  selectedIndex,
  accent,
  onSelect,
}: {
  count: number;
  selectedIndex: number;
  accent: string;
  onSelect: (index: number) => void;
}) {
  return (
    <div role="group" aria-label="Choose a slide" className="flex items-center gap-[16px]">
      {Array.from({ length: count }, (_, index) => {
        const filled = index <= selectedIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show slide ${index + 1} of ${count}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            className="rounded-full transition-colors"
            style={{
              width: 8,
              height: 8,
              background: filled ? accent : UNFILLED_DOT,
            }}
          />
        );
      })}
    </div>
  );
}
