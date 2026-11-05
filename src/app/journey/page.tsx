import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import JourneyStory from "@/components/JourneyStory";
import { chapters } from "@/content";
import { art } from "@/lib/art";

export const metadata: Metadata = {
  title: "Journey",
  description: "From a middle-class family in Khanpur to the founder of Little Nap Recliners.",
};

export default function Journey() {
  const images = chapters.map((c) => (c.art ? art(c.art) : null) ?? c.img ?? null);
  return (
    <>
      <PageIntro
        title="The journey"
        lede="From a middle-class family in Khanpur to a group of companies with 470+ people. Scroll to move through each chapter, or jump to one."
      />
      <Parallax className="band" src="/images/ravinder-relaxed.jpg" position="50% 35%" />
      <JourneyStory images={images} />
    </>
  );
}
