import fs from "node:fs";
import path from "node:path";

// Returns the path of a generated image if it has been added to public/images/art.
export function art(name: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `/images/art/${name}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
