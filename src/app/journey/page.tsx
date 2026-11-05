import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import JourneyStory from "@/components/JourneyStory";
import GlobeJourney from "@/components/GlobeJourney";
import { chapters, journeyStops } from "@/content";
import { art } from "@/lib/art";

export const metadata: Metadata = {
  title: "Journey",
  description: "From a middle-class family in Khanpur to the founder of Little Nap Recliners.",
};

export default function Journey() {
  const images = chapters.map((c) => (c.art ? art(c.art) : null) ?? c.img ?? null);
  const stops = journeyStops.map((s) => ({ ...s, img: (s.place === "New Delhi" ? art("day-one") : null) ?? s.img }));
  return (
    <>
      <PageIntro
        title="The journey"
        lede="From a middle-class family in Khanpur to a group of companies with 470+ people. Scroll to follow him across the map, from where he started to where he is now."
      />
      <Parallax className="band" src="/images/ravinder-relaxed.jpg" />
      <GlobeJourney stops={stops} ariaLabel="A globe following Ravinder Goel from Khanpur to Mumbai, Bengaluru, Delhi, Dubai, Thailand and Manesar" />
      <PageIntro title="Chapter by chapter" lede="The same journey in detail, from the first setback to today." />
      <JourneyStory images={images} />
    </>
  );
}
