export function ErrorToast({ message, onDismiss }: { message: string | null; onDismiss: () => void }) {
  if (!message) return null;
  return (
    <div className="fixed top-[96px] left-1/2 -translate-x-1/2 z-[10000] max-w-[calc(100%-32px)] px-4 py-3 rounded-[8px] flex items-center gap-3" style={{ background: "#2b1717", border: "1px solid rgba(248,113,113,0.5)", color: "white", fontFamily: "'Montserrat', sans-serif" }}>
      <span className="text-[13px] font-medium">{message}</span>
      <button onClick={onDismiss} aria-label="Dismiss error" className="text-[18px] leading-none">×</button>
    </div>
  );
}
