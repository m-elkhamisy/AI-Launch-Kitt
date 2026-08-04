// Dashed-border upload target used for the logo and brand-document uploads,
// plus the chip that represents an uploaded file.
import { Upload } from "lucide-react";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileChip({
  name,
  size,
  onRemove,
  disabled,
}: {
  name: string;
  size: number;
  onRemove?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-[8px] px-[12px] py-[8px] max-w-full"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M4 2.5h5.5L13 6v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
        />
        <path d="M9.5 2.5V6H13" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      </svg>
      <span className="text-white text-[12px] font-medium truncate" title={name}>
        {name}
      </span>
      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, whiteSpace: "nowrap" }}>
        {formatFileSize(size)}
      </span>
      {onRemove && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${name}`}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.45)",
            cursor: disabled ? "default" : "pointer",
            fontSize: 16,
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

export function UploadDropzone({
  title,
  hint,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  inputRef,
  accept,
  multiple,
  onChange,
  children,
}: {
  title: string;
  hint: string;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  accept: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[12px] min-w-0">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onBrowse}
        className="flex flex-col items-center justify-center gap-[10px] px-[20px] py-[28px] cursor-pointer"
        style={{
          border: `1.5px dashed ${dragOver ? "#6FCCDD" : "rgba(255,255,255,0.22)"}`,
          borderRadius: 14,
          background: dragOver ? "rgba(111,204,221,0.06)" : "rgba(255,255,255,0.02)",
          minHeight: 140,
          transition: "border-color 0.15s ease, background 0.15s ease",
        }}
      >
        <Upload size={28} color="#6FCCDD" strokeWidth={1.8} aria-hidden />
        <p className="text-white font-medium text-[14px] text-center">{title}</p>
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, textAlign: "center" }}>{hint}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {children}
    </div>
  );
}
