import "server-only";
import fs from "node:fs";
import path from "node:path";

/* ============================================================
   Which brands actually have a logo file in /public/brands?

   SERVER-ONLY (it reads the filesystem). The resolved map is handed to the
   client as a plain object — without this the browser would blindly probe
   png → svg → webp → jpg for every brand and flood the console with 404s.

   Drop a file named after the brand's slug (see public/brands/README.txt)
   and it is picked up automatically on the next build / dev reload.

   NOTE: client components must import `brandSlug` from "@/lib/utils/brandSlug",
   never from here, or `node:fs` ends up in the browser bundle.
   ============================================================ */

/** Preferred order when a brand has more than one file. */
const EXT_ORDER = [".svg", ".png", ".webp", ".jpg", ".jpeg"];

let cache: Record<string, string> | null = null;

/** Scan a folder under /public and map "slug" → "/<folder>/<file>". */
function scan(folder: string): Record<string, string> {
  const dir = path.join(process.cwd(), "public", folder);
  const map: Record<string, string> = {};

  try {
    for (const file of fs.readdirSync(dir)) {
      const ext = path.extname(file).toLowerCase();
      const rank = EXT_ORDER.indexOf(ext);
      if (rank === -1) continue; // README.txt and friends

      const slug = path.basename(file, path.extname(file)).toLowerCase();
      const current = map[slug];
      const currentRank = current
        ? EXT_ORDER.indexOf(path.extname(current).toLowerCase())
        : Number.MAX_SAFE_INTEGER;

      if (rank < currentRank) map[slug] = `/${folder}/${file}`;
    }
  } catch {
    // Folder not there yet — callers fall back gracefully.
  }

  return map;
}

/** slug → "/brands/<file>" for every logo present. Empty if none added yet. */
export function brandLogoMap(): Record<string, string> {
  if (cache) return cache;
  cache = scan("brands");
  return cache;
}

let spotCache: Record<string, string> | null = null;

/**
 * slug → "/spotlight/<file>" — the hero shot for a featured house.
 * Drop e.g. `public/spotlight/dove.jpg` (see that folder's README).
 */
export function spotlightImageMap(): Record<string, string> {
  if (spotCache) return spotCache;
  spotCache = scan("spotlight");
  return spotCache;
}
