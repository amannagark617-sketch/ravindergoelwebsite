import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import GalleryWall from "@/components/GalleryWall";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of Ravinder Goel.",
};

export default function Gallery() {
  return (
    <>
      <PageIntro title="Gallery" lede="Select a photograph to see it larger. Use the arrow keys to move between them." />
      <GalleryWall />
    </>
  );
}
