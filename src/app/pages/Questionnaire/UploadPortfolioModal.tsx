import { useRef, useState } from "react";

/**
 * Drag-and-drop portfolio picker. The drag-hover flag lives here because it is
 * purely visual and nothing outside the overlay reads it.
 */
export function UploadPortfolioModal({
  onClose,
  onFileChosen,
}: {
  onClose: () => void;
  onFileChosen: (file: File) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileChosen(file);
  }

  function handleChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileChosen(file);
  }

  return (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 9999 }}
          onClick={() => onClose()}
        >
          <div
            className="flex flex-col items-center gap-[24px] p-5 sm:p-12 w-[calc(100%-32px)] sm:w-[520px] max-h-[90vh] overflow-y-auto"
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20,
              fontFamily: "'Montserrat', sans-serif",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <span className="text-white font-semibold text-[18px]">Upload Portfolio</span>
              <button
                onClick={() => onClose()}
                style={{ color: "rgba(255,255,255,0.5)", fontSize: 22, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
              >×</button>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center gap-[16px] w-full"
              style={{
                border: `2px dashed ${dragOver ? "#6FCCDD" : "rgba(255,255,255,0.2)"}`,
                borderRadius: 14,
                padding: "48px 32px",
                background: dragOver ? "rgba(111,204,221,0.06)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="rgba(111,204,221,0.1)" />
                <path d="M24 32V20M24 20L19 25M24 20L29 25" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 34h16" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="text-center">
                <p className="text-white font-semibold text-[15px]">Drag & drop your file here</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 6 }}>or click to browse from your computer</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                PDF · DOCX · PPTX · TXT · PNG · JPG — max 20 MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.pptx,.txt,.md,.png,.jpg,.jpeg"
              style={{ display: "none" }}
              onChange={handleChoose}
            />

            {/* Or divider */}
            <div className="flex items-center gap-[12px] w-full">
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
            </div>

            <button
              className="w-full font-semibold text-[14px]"
              style={{
                background: "#6FCCDD",
                color: "#0b0b0b",
                border: "none",
                borderRadius: 10,
                padding: "14px 0",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File from Computer
            </button>
          </div>
        </div>
  );
}
