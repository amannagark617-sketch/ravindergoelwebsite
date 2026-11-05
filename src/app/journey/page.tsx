import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import JourneyStory from "@/components/JourneyStory";

export const metadata: Metadata = {
  title: "Journey",
  description: "From a middle-class family in Khanpur to the founder of Little Nap Recliners.",
};

export default function Journey() {
  return (
    <>
      <PageIntro
        title="The journey"
        lede="From a middle-class family in Khanpur to a group of companies with 470+ people. Scroll to move through each chapter, or jump to one."
      />
      <JourneyStory />
    </>
  );
}
