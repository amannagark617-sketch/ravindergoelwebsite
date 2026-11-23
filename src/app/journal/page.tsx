import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import JournalList from "@/components/JournalList";

export const metadata: Metadata = {
  title: "Journal: Stories by and about Ravinder Goel",
  description:
    "Articles on Ravinder Goel and Little Nap Recliners: the founding story, cinema seating, La-Z-Boy in India, AFMT, leadership and the team. Each one links to its sources.",
};

export default function Journal() {
  return (
    <main>
      <PageIntro
        title="Journal"
        lede="Stories about Ravinder Goel and Little Nap, drawn from his own posts, interviews and the press. Every article lists its sources."
      />
      <section className="journal-wrap">
        <JournalList featured />
      </section>
    </main>
  );
}
