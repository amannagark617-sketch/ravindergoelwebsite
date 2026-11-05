import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import Parallax from "@/components/Parallax";
import ValuesWipe from "@/components/ValuesWipe";
import { dna } from "@/content";

export const metadata: Metadata = {
  title: "Values",
  description: "The DNA and five core values Little Nap is built on.",
};

const photos = [
  "/images/ravinder-showroom-smile.jpg",
  "/images/ravinder-portrait.jpg",
  "/images/ravinder-showroom-arms.jpg",
  "/images/ravinder-theatre-hands.jpg",
  "/images/ravinder-showroom-lean.jpg",
];

export default function Values() {
  return (
    <>
      <PageIntro
        title="Values"
        lede="Little Nap's own words on who it is and what it stands for: its DNA and five core values."
      />
      <Parallax className="band" src="/images/ravinder-cinema-grey.jpg" />
      {dna.map((d) => (
        <Vision key={d.label} label={d.label} text={d.text} size="md" />
      ))}
      <ValuesWipe photos={photos} />
    </>
  );
}
