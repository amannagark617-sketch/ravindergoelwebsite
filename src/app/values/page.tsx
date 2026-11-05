import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import Parallax from "@/components/Parallax";
import ValuesWipe from "@/components/ValuesWipe";
import { dna, beliefs } from "@/content";

export const metadata: Metadata = {
  title: "Values and beliefs",
  description: "The DNA and five core values Little Nap is built on.",
};

const photos = [
  "/images/ravinder-showroom-smile.jpg",
  "/images/ravinder-portrait.jpg",
  "/images/ravinder-showroom-arms.jpg",
  "/images/ravinder-theatre-hands.jpg",
  "/images/ravinder-showroom-lean.jpg",
];

const beliefPhotos = [
  "/images/ravinder-lounge.jpg",
  "/images/ravinder-gesture.jpg",
  "/images/ravinder-red-wall.jpg",
  "/images/ravinder-showroom-standing.jpg",
  "/images/ravinder-studio-point.jpg",
  "/images/ravinder-sofa-seated.jpg",
  "/images/ravinder-cinema-wide.jpg",
  "/images/ravinder-theatre-hands.jpg",
];

export default function Values() {
  return (
    <>
      <PageIntro
        title="Values and beliefs"
        lede="Little Nap's own words on who it is and what it stands for: its DNA and five core values."
      />
      <Parallax className="band" src="/images/ravinder-cinema-grey.jpg" />
      {dna.map((d) => (
        <Vision key={d.label} label={d.label} text={d.text} size="md" />
      ))}
      <ValuesWipe photos={photos} />
      <h2 className="beliefs-head">In his own words</h2>
      {beliefs.map((b, i) => (
        <div className={"split" + (i % 2 ? " flip" : "")} key={b.text}>
          <Vision label={b.label} text={b.text} size="md" />
          <Parallax className="split-photo" src={beliefPhotos[i % beliefPhotos.length]} />
        </div>
      ))}
    </>
  );
}
