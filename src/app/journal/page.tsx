import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import JournalList from "@/components/JournalList";

export const metadata: Metadata = {
  title: "Blog: Recliner Guides and Stories by Ravinder Goel",
  description:
    "The Little Nap Recliners blog: recliner buying guides, how recliners are made, home theatre and cinema seating, La-Z-Boy in India, and the founder story of Ravinder Goel.",
};

export default function Journal() {
  return (
    <main>
      <PageIntro
        title="Blog"
        lede="Recliner guides, and stories about Ravinder Goel and Little Nap."
      />
      <section className="journal-wrap">
        <JournalList featured />
      </section>
    </main>
  );
}
