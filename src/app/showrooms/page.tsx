import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ShowroomFinder from "@/components/ShowroomFinder";
import { showrooms } from "@/content";

export const metadata: Metadata = {
  title: "Little Nap Recliner Showrooms in India",
  description:
    "Find a Little Nap Recliners showroom near you. 18 showrooms across North, West, South and Central India, with La-Z-Boy recliners and cinema seating.",
};

export default function Showrooms() {
  return (
    <>
      <PageIntro title="Showrooms" lede="Little Nap Recliners showrooms across India. Find the one nearest you, then sit down and feel the difference." />
      <section className="sf-section">
        <ShowroomFinder items={showrooms} />
      </section>
    </>
  );
}
