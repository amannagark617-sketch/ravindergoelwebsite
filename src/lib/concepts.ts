import fs from "node:fs";
import path from "node:path";

// Build-time check: the concept image's path when the file exists, otherwise null.
export function conceptPath(slug: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `/images/concepts/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
