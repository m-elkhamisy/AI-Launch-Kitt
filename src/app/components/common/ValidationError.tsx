export function ValidationError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="font-medium text-[12px]" style={{ color: "#fca5a5", lineHeight: 1.5 }}>
      {message}
    </p>
  );
}

export function firstValidationError(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  if ("message" in value && typeof value.message === "string") return value.message;
  for (const child of Object.values(value)) {
    const message = firstValidationError(child);
    if (message) return message;
  }
  return undefined;
}
