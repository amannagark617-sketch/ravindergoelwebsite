import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import Parallax from "@/components/Parallax";
import { beliefs } from "@/content";

export const metadata: Metadata = {
  title: "Beliefs",
  description: "What Ravinder Goel says about comfort, customers, teams and India.",
};

const photos = [
  "/images/ravinder-lounge.jpg",
  "/images/ravinder-gesture.jpg",
  "/images/ravinder-showroom-standing.jpg",
  "/images/ravinder-theatre-hands.jpg",
  "/images/ravinder-showroom-lean.jpg",
  "/images/ravinder-showroom-smile.jpg",
  "/images/ravinder-red-wall.jpg",
  "/images/ravinder-showroom-arms.jpg",
];

export default function Beliefs() {
  return (
    <>
      <PageIntro title="Beliefs" lede="In his own words, on comfort, customers, teams and India." />
      {beliefs.map((b, i) => (
        <div className={"split" + (i % 2 ? " flip" : "")} key={b.text}>
          <Vision label={b.label} text={b.text} size="md" />
          <Parallax className="split-photo" src={photos[i % photos.length]} />
        </div>
      ))}
    </>
  );
}
