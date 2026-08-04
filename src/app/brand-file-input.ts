/**
 * Read selected files and clear the input so the same files can be re-chosen.
 * Must snapshot with Array.from — FileList is live and empties when value is cleared.
 */
export function snapshotFileInput(input: HTMLInputElement): File[] {
  const files = input.files ? Array.from(input.files) : [];
  input.value = "";
  return files;
}
