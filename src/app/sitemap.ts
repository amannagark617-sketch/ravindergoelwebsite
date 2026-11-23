import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes: [string, number][] = [
  ["", 1],
  ["/journey", 0.9],
  ["/little-nap", 0.9],
  ["/la-z-boy", 0.8],
  ["/press", 0.8],
  ["/recognition", 0.8],
  ["/vision", 0.7],
  ["/values", 0.7],
  ["/showrooms", 0.7],
  ["/gallery", 0.5],
  ["/connect", 0.6],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(([r, priority]) => ({ url: `https://www.ravindergoel.com${r}`, lastModified, priority }));
}
