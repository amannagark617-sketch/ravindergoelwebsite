import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import GalleryWall from "@/components/GalleryWall";

export const metadata: Metadata = {
  title: "Photographs of Ravinder Goel",
  description:
    "Photographs of Ravinder Goel (RG), Founder and CEO of Little Nap Recliners, at showrooms, cinemas, events and in the studio.",
};

export default function Gallery() {
  return (
    <>
      <PageIntro title="Gallery" lede="Select a photograph to see it larger. Use the arrow keys to move between them." />
      <GalleryWall />
    </>
  );
}
