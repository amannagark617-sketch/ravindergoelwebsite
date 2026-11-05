import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import VisionScene from "@/components/VisionScene";
import { dna } from "@/content";

export const metadata: Metadata = {
  title: "Vision",
  description: "Little Nap's vision: to redefine the future of comfort and create an Indian legacy that reaches the world.",
};

export default function VisionPage() {
  const [, ...rest] = dna;
  return (
    <>
      <PageIntro title="Vision" lede="Where Little Nap Recliners is going, in its own words." />
      <VisionScene />
      {rest.map((d) => (
        <Vision key={d.label} label={d.label} text={d.text} size="md" />
      ))}
    </>
  );
}
