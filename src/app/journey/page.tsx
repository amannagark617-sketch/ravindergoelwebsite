import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import FilmJourney from "@/components/FilmJourney";
import { chapters } from "@/content";
import { art } from "@/lib/art";

export const metadata: Metadata = {
  title: "Journey: From Khanpur to Founder of Little Nap",
  description:
    "How Ravinder Goel, known as RG, went from a middle-class family in Khanpur to founding Little Nap Recliners in 2011 with a ₹5 lakh credit card loan.",
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
      <section className="afmt">
        <h2>About AFMT</h2>
        <p>
          The Association of Furniture Manufacturers &amp; Traders (INDIA), AFMT, was founded in 2008.
          It is India&apos;s largest furniture association, recognised by the Government of India,
          and it represents manufacturers, traders, importers and allied sectors across the country.
        </p>
        <dl className="afmt-stats">
          <div><dt>715</dt><dd>AFMT members across India (July 2026)</dd></div>
          <div><dt>162</dt><dd>members in the North India Chapter, up from 43 at its launch on 11 March 2023</dd></div>
          <div><dt>23%</dt><dd>of AFMT&apos;s national membership sits in the North India Chapter</dd></div>
        </dl>
        <p>
          Ravinder Goel has been Vice President of the North India Chapter since it began. Members
          re-elected him, and in 2026 he was elected for a third consecutive term, which runs 2026
          to 2028. He also chaired and presented one of the chapter&apos;s Annual General Meetings.
          His view: the industry&apos;s greatest strength lies in collaboration.
        </p>
      </section>
    </>
  );
}
