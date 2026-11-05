import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ShowroomFinder from "@/components/ShowroomFinder";
import { showrooms } from "@/content";

export const metadata: Metadata = {
  title: "Showrooms",
  description: "Little Nap Recliners showrooms across India: find the one nearest you.",
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
