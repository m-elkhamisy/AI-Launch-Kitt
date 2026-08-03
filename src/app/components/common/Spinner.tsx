// The teal loading indicator, shared by every waiting state. `animation: spin`
// is still resolved by the @keyframes that GeneratingPage and BuildingPage add
// at runtime — see finding C1 in docs/frontend-review.md, fixed later.
//
// Keep prose in this repo free of bare Tailwind utility names: the v4 scanner
// reads comment text as class candidates, so such a word used in an ordinary
// sentence ships a real (unused) CSS rule.
export function Spinner({ size, borderWidth }: { size: number; borderWidth: number }) {
  return (
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        border: `${borderWidth}px solid rgba(111,204,221,0.2)`,
        borderTop: `${borderWidth}px solid #6fccdd`,
        animation: "spin 1s linear infinite",
      }}
    />
  );
}
