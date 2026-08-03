// The teal ring used by every loading state. `animation: spin` is still
// resolved by the @keyframes that GeneratingPage/BuildingPage inject inline —
// see finding C1 in docs/frontend-review.md, fixed in a later commit.
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
