import type { Choice } from "../../launchkit-api";

/** Overlay grid for picking one catalog choice. Selection closes it. */
export function MoodPickerModal({
  choices,
  selectedLabel,
  onSelect,
  onClose,
}: {
  choices: Choice[];
  selectedLabel: string;
  onSelect: (choice: Choice) => void;
  onClose: () => void;
}) {
  return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => onClose()}
        >
          <div
            className="relative flex flex-col gap-5 sm:gap-6 p-5 sm:p-10 w-[calc(100%-32px)] sm:w-[90vw] max-w-[720px]"
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold" style={{ fontSize: "clamp(17px, 4vw, 20px)" }}>Choose Design Mood</h3>
              <button
                onClick={() => onClose()}
                className="text-white font-bold text-[20px] w-[32px] h-[32px] flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 8,
                }}
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
              {choices.map((m) => (
                <button
                  key={m.label}
                  onClick={() => {
                    onSelect(m);
                  }}
                  className="p-[20px] text-left rounded-[12px] transition-all"
                  style={{
                    background: m.label === selectedLabel ? "rgba(111,204,221,0.12)" : "rgba(255,255,255,0.04)",
                    border: m.label === selectedLabel ? "1px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p className="font-semibold text-[13px] sm:text-[15px] mb-[4px]" style={{ color: m.label === selectedLabel ? "#6fccdd" : "white" }}>{m.label}</p>
                  <p className="font-medium text-[11px] sm:text-[13px] leading-[16px] sm:leading-[18px]" style={{ color: "rgba(255,255,255,0.4)" }}>{m.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
  );
}
