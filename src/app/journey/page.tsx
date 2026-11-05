import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
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
      <section className="sixty">
        <h2>His story in 60 seconds</h2>
        <ol>
          <li>He grew up in a middle-class family in Khanpur.</li>
          <li>He failed several MBA entrance exams, started over, and earned a management degree in Mumbai in 2002.</li>
          <li>In July 2011 he started Little Nap with a ₹5 lakh credit card loan, a 600 sq. ft. display area and a team of three.</li>
          <li>In April 2020, during the lockdown, Little Nap became La-Z-Boy&apos;s exclusive partner in India.</li>
          <li>Today it is a self-funded group of 470+ people with 2 factories and 18 showrooms.</li>
        </ol>
      </section>
      <FilmJourney images={images} />
    </>
  );
}
