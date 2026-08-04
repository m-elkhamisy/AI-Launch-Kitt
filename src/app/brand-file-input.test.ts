import { describe, expect, it } from "vitest";

import { snapshotFileInput } from "./brand-file-input";
import { brandDocumentFileSchema, logoFileSchema } from "./wizard-validation";

/** Minimal live FileList: empties when the owning input is cleared. */
function createLiveFileList(files: File[]) {
  let current = files.slice();
  return {
    get length() {
      return current.length;
    },
    item(index: number) {
      return current[index] ?? null;
    },
    *[Symbol.iterator]() {
      yield* current;
    },
    clear() {
      current = [];
    },
  };
}

function fileInputWith(...files: File[]): HTMLInputElement {
  const live = createLiveFileList(files);
  let value = files.length ? `C:\\fakepath\\${files[0].name}` : "";
  const input = {
    get files() {
      return live as unknown as FileList;
    },
    get value() {
      return value;
    },
    set value(next: string) {
      value = next;
      if (next === "") live.clear();
    },
  };
  return input as HTMLInputElement;
}

describe("snapshotFileInput", () => {
  it("keeps all selected files after the input is cleared (live FileList fix)", () => {
    const docA = new File(["brief"], "brand-brief.pdf", { type: "application/pdf" });
    const docB = new File(["deck"], "deck.pptx", {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    });
    const input = fileInputWith(docA, docB);

    // Buggy pattern: hold a live FileList, then clear the input.
    const liveRef = input.files;
    expect(liveRef).toHaveLength(2);
    input.value = "";
    expect(liveRef).toHaveLength(0);
    expect(Array.from(liveRef as unknown as Iterable<File>)).toHaveLength(0);

    // Fixed pattern: snapshot first, then clear.
    const restored = fileInputWith(docA, docB);
    const snapped = snapshotFileInput(restored);
    expect(snapped).toHaveLength(2);
    expect(snapped.map((file) => file.name)).toEqual(["brand-brief.pdf", "deck.pptx"]);
    expect(restored.files).toHaveLength(0);
    expect(restored.value).toBe("");
  });

  it("returns an empty list when nothing is selected", () => {
    const input = fileInputWith();
    expect(snapshotFileInput(input)).toEqual([]);
  });
});

describe("brand document validation used by document dropzone", () => {
  it("accepts multiple allowed document types under the size limit", () => {
    const files = [
      new File(["x".repeat(100)], "notes.txt", { type: "text/plain" }),
      new File(["%PDF-1.4"], "brief.pdf", { type: "application/pdf" }),
      new File([new Uint8Array([137, 80, 78, 71])], "mood.png", { type: "image/png" }),
    ];
    for (const file of files) {
      expect(brandDocumentFileSchema.safeParse(file).success, file.name).toBe(true);
    }
  });

  it("rejects oversized or unsupported document files", () => {
    const tooBig = new File([new Uint8Array(1.6 * 1024 * 1024)], "huge.pdf", {
      type: "application/pdf",
    });
    const badType = new File(["x"], "photo.webp", { type: "image/webp" });
    expect(brandDocumentFileSchema.safeParse(tooBig).success).toBe(false);
    expect(brandDocumentFileSchema.safeParse(badType).success).toBe(false);
  });

  it("still accepts logo files for the logo dropzone path", () => {
    const logo = new File([new Uint8Array([137, 80, 78, 71])], "logo.png", {
      type: "image/png",
    });
    // Logo handler reads File[0] (not live FileList), so it was never broken.
    expect(logoFileSchema.safeParse(logo).success).toBe(true);
  });
});
