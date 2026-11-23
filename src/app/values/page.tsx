import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import Concept from "@/components/Concept";
import { conceptPath } from "@/lib/concepts";
import ValuesWipe from "@/components/ValuesWipe";
import { dna, beliefs } from "@/content";

export const metadata: Metadata = {
  title: "Little Nap Values: DNA and Core Values",
  description:
    "The DNA and five core values behind Little Nap Recliners, the comfort company founded by Ravinder Goel.",
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
      <ValuesWipe photos={["customer-first", "integrity", "ownership", "learning", "one-team"].map(conceptPath)} />
      <h2 className="beliefs-head">In his own words</h2>
      {beliefs.map((b, i) => (
        <div className={"split" + (i % 2 ? " flip" : "")} key={b.text}>
          <Vision label={b.label} text={b.text} size="md" />
          <Concept className="split-photo" src={conceptPath(beliefSlugs[i])} label={b.label} />
        </div>
      ))}
    </>
  );
}
