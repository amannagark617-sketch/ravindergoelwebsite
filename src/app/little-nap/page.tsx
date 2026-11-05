import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import dynamic from "next/dynamic";
import CinemaStrip from "@/components/CinemaStrip";
import GrowthScene from "@/components/GrowthScene";
import CountLine from "@/components/CountLine";
import { littleNap } from "@/content";

const ReclinerJourney = dynamic(() => import("@/components/ReclinerJourney"));

export const metadata: Metadata = {
  title: "Little Nap",
  description: "The company Ravinder Goel founded, and the group around it.",
};

export default function LittleNap() {
  return (
    <>
      <PageIntro title="Little Nap" lede={littleNap.intro} />
      <ReclinerJourney />
      <GrowthScene />
      <CountLine tokens={littleNap.today} />
      <CountLine tokens={littleNap.cinema} />
      <CinemaStrip />
      <div className="split flip">
        <section className="prose-block">
          <h2>{littleNap.placesTitle}</h2>
          <p>{littleNap.places.join(", ")}.</p>
          <p>{littleNap.craft}</p>
        </section>
        <Parallax className="split-photo" src="/images/ravinder-showroom-lean.jpg" />
      </div>
      <section className="group">
        <h2>{littleNap.groupTitle}</h2>
        {littleNap.group.map((g) => (
          <details key={g.name}>
            <summary>
              {"logo" in g && g.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="group-logo" src={g.logo} alt="" />
              ) : null}
              <span className="group-name">{g.name}</span>
            </summary>
            <p>{g.text}</p>
            {g.href ? (
              <Link className="btn" href={g.href}>
                {g.hrefLabel}
              </Link>
            ) : null}
          </details>
        ))}
      </section>
      <section className="vision vision-xl closing">
        <p>{littleNap.outro}</p>
      </section>
    </>
  );
}
