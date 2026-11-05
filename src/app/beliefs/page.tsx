import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import { beliefs } from "@/content";

export const metadata: Metadata = {
  title: "Beliefs",
  description: "What Ravinder Goel says about comfort, customers, teams and India.",
};

export default function Beliefs() {
  return (
    <>
      <PageIntro title="Beliefs" lede="In his own words, on comfort, customers, teams and India." />
      {beliefs.map((b) => (
        <Vision key={b.text} label={b.label} text={b.text} size="md" />
      ))}
    </>
  );
}
