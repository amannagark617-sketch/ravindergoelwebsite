import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import FilmJourney from "@/components/FilmJourney";
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
        lede="From a middle-class family in Khanpur to a group of companies with 470+ people. Keep scrolling and the film moves sideways, chapter by chapter."
      />
      <Parallax className="band" src="/images/ravinder-relaxed.jpg" />
      <FilmJourney images={images} />
    </>
  );
}
