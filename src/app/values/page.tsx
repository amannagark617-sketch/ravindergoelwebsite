import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Vision from "@/components/Vision";
import { coreValues, dna } from "@/content";

export const metadata: Metadata = {
  title: "Values",
  description: "The DNA and five core values Little Nap is built on.",
};

export default function Values() {
  return (
    <>
      <PageIntro
        title="Values"
        lede="Little Nap's own words on who it is and what it stands for: its DNA and five core values."
      />
      {dna.map((d) => (
        <Vision key={d.label} label={d.label} text={d.text} size="md" />
      ))}
      <section className="values">
        <h2>Five core values</h2>
        <ol>
          {coreValues.map((v, i) => (
            <li key={v.name}>
              <div className="v-num">{i + 1}</div>
              <div>
                <h3>{v.name}</h3>
                <div className="v-line">{v.line}</div>
                <p>{v.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
