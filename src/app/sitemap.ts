import type { MetadataRoute } from "next";

const routes = ["", "/journey", "/la-z-boy", "/values", "/beliefs", "/recognition", "/gallery", "/little-nap", "/connect"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `https://ravindergoel.com${r}` }));
}
