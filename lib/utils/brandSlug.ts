/**
 * Filename a brand's logo should use, e.g. "L'Oréal Paris" → "loreal-paris".
 *
 * Lives on its own (no Node imports) so both the server logo scanner and
 * client components can use it — importing it from the fs-based module would
 * drag `node:fs` into the browser bundle and break the build.
 */
export function brandSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
