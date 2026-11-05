import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
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
      <div className="partner-logos" aria-label="La-Z-Boy and Little Nap Recliners">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/la-z-boy.png" alt="La-Z-Boy" />
        <span aria-hidden="true">+</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/little-nap.png" alt="Little Nap Recliners" />
      </div>
      <p className="partner-note">{laZBoy.partnerNote}</p>
      <GlobeJourney stops={laZBoy.stops} ariaLabel="A globe showing La-Z-Boy from Michigan to Thailand, India, Delhi and Little Nap" />
      <div className="split">
        <section className="prose-block">
          <h2>{laZBoy.whyTitle}</h2>
          <p>{laZBoy.why}</p>
        </section>
        <Parallax className="split-photo" src="/images/ravinder-lounge.jpg" />
      </div>
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
        <p className="sources">
          Sources:{" "}
          {laZBoy.sources.map((x, i) => (
            <span key={x.href}>
              {i ? ", " : ""}
              <a href={x.href} target="_blank" rel="noopener noreferrer">
                {x.label}
              </a>
            </span>
          ))}
        </p>
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
