import type { Choice } from "../../launchkit-api";

/** Overlay grid for picking one catalog choice. Selection closes it. */
export function CategoryPickerModal({
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
            className="relative flex flex-col w-[calc(100%-32px)] sm:w-[90vw] max-w-[720px] gap-5 sm:gap-6 p-5 sm:p-10"
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              maxHeight: "85vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between" style={{ flexShrink: 0 }}>
              <h3 className="text-white font-semibold" style={{ fontSize: "clamp(17px, 4vw, 20px)" }}>
                Choose Business Category
              </h3>
              <button
                onClick={() => onClose()}
                className="text-white font-bold flex items-center justify-center"
                style={{
                  fontSize: 20,
                  width: 32,
                  height: 32,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            {/* Category grid — 1 col mobile, 3 cols tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {choices.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    onSelect(cat);
                  }}
                  className="text-left rounded-[12px] transition-all flex flex-col gap-[6px] p-4"
                  style={{
                    background: cat.label === selectedLabel ? "rgba(111,204,221,0.12)" : "rgba(255,255,255,0.04)",
                    border: cat.label === selectedLabel ? "1px solid #6fccdd" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p
                    className="font-semibold leading-[18px]"
                    style={{ fontSize: "clamp(12px, 2.4vw, 13px)", color: cat.label === selectedLabel ? "#6fccdd" : "white" }}
                  >
                    {cat.label}
                  </p>
                  <p
                    className="font-medium leading-[17px]"
                    style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "rgba(255,255,255,0.45)" }}
                  >
                      {cat.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
  );
}
