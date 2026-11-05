import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import GlobeJourney from "@/components/GlobeJourney";
import { laZBoy } from "@/content";

export const metadata: Metadata = {
  title: "La-Z-Boy in India",
  description: "How La-Z-Boy came to India through Little Nap.",
};

export default function LaZBoy() {
  return (
    <>
      <PageIntro title="La-Z-Boy" lede={laZBoy.intro} />
      <GlobeJourney />
      <section className="prose-block">
        <h2>{laZBoy.whyTitle}</h2>
        <p>{laZBoy.why}</p>
      </section>
      <section className="timeline">
        <h2>Timeline</h2>
        <ol>
          {laZBoy.timeline.map((t) => (
            <li key={t.date}>
              <div className="tl-date">{t.date}</div>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
        <div className="link-row">
          {laZBoy.links.map((l) => (
            <a className="btn" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
