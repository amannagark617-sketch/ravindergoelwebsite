// Where his face sits in each photograph, as "x% y%". Used as object-position so crops keep the face.
const faces: Record<string, [number, number]> = {
  "ravinder-cinema-grey": [57, 24],
  "ravinder-cinema-seated": [63, 26],
  "ravinder-cinema-wide": [62, 27],
  "ravinder-gesture": [57, 21],
  "ravinder-lounge": [50, 12],
  "ravinder-portrait": [50, 17],
  "ravinder-red-wall": [36, 19],
  "ravinder-relaxed": [23, 25],
  "ravinder-showroom-arms": [40, 18],
  "ravinder-showroom-lean": [44, 19],
  "ravinder-showroom-smile": [31, 18],
  "ravinder-showroom-standing": [42, 16],
  "ravinder-sofa-seated": [74, 25],
  "ravinder-studio-point": [36, 21],
  "ravinder-theatre-hands": [66, 21],
};

export function focus(src: string): string {
  const key = src.split("/").pop()?.replace(/\.[a-z]+$/, "") ?? "";
  const f = faces[key];
  return f ? `${f[0]}% ${f[1]}%` : "50% 30%";
}
