import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import Concept from "@/components/Concept";
import ValuesWipe from "@/components/ValuesWipe";
import { dna, beliefs } from "@/content";

export const metadata: Metadata = {
  title: "Values and beliefs",
  description: "The DNA and five core values Little Nap is built on.",
};

const beliefSlugs = ["comfort", "design", "home", "customers", "india", "teams", "learning", "values"];

export default function Values() {
  return (
    <>
      <PageIntro
        title="Values and beliefs"
        lede="Little Nap's own words on who it is and what it stands for: its DNA and five core values."
      />
      {dna.map((d) => (
        <Vision key={d.label} label={d.label} text={d.text} size="md" />
      ))}
      <ValuesWipe />
      <h2 className="beliefs-head">In his own words</h2>
      {beliefs.map((b, i) => (
        <div className={"split" + (i % 2 ? " flip" : "")} key={b.text}>
          <Vision label={b.label} text={b.text} size="md" />
          <Concept className="split-photo" slug={beliefSlugs[i]} label={b.label} />
        </div>
      ))}
    </>
  );
}
