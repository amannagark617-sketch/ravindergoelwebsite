import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import dynamic from "next/dynamic";
import CinemaStrip from "@/components/CinemaStrip";
import GrowthScene from "@/components/GrowthScene";
import CountLine from "@/components/CountLine";
import { littleNap } from "@/content";
import { abReviews } from "@/abReviews";

const ReclinerJourney = dynamic(() => import("@/components/ReclinerJourney"));

export const metadata: Metadata = {
  title: "Little Nap Recliners: Company, Factories and Showrooms",
  description:
    "Little Nap Recliners, founded by Ravinder Goel in 2011: two factories, 18 showrooms, 470+ people, recliners in 1,300+ cinema screens, and the companies in the group.",
};

const AB = "https://www.ambitionbox.com/overview/little-nap-recliners-overview?utm_source=employer-dashboard&utm_campaign=little-nap-recliners&utm_medium=badges";

const five = abReviews.filter((r) => !r.stars);
const four = abReviews.filter((r) => r.stars);
const mixed = five.flatMap((r, i) => (i % 6 === 5 && four[Math.floor(i / 6)] ? [r, four[Math.floor(i / 6)]] : [r]));
const rows = [mixed];

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
      <p className="partner-note">
        See the full <Link href="/recliners">Little Nap recliner range</Link>, including motorized, home theatre and cinema recliners, and the <Link href="/la-z-boy">La-Z-Boy partnership</Link>.
      </p>
      <section className="people-say">
        <h2>What our people say</h2>
        <p>Employees rate Little Nap Recliners 4.7 out of 5 on AmbitionBox.</p>
        <div className="badges">
          <a href={AB} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://employer.ambitionbox.com/api/next/badge/796785?badge-type=employee-ratings2" alt="Little Nap Recliners employee rating on AmbitionBox" />
          </a>
          <a href={AB} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://employer.ambitionbox.com/api/next/badge/796785?badge-type=ratings-detailed" alt="Little Nap Recliners detailed ratings on AmbitionBox" />
          </a>
        </div>
        <div className="ab-rows" aria-label="Employee reviews from AmbitionBox">
          {rows.map((row, ri) => (
            <div className="ab-marquee" key={ri}>
              <div className={"ab-track" + (ri % 2 ? " rev" : "")} style={{ animationDuration: `${row.length * 5}s` }}>
                {[0, 1].map((n) => (
                  <ul key={n} aria-hidden={n === 1 ? true : undefined}>
                    {row.map((r) => (
                      <li key={r.role + r.date + r.likes.slice(0, 12)}>
                        <article className="ab-card">
                          <div className="ab-head">
                            <b className={"ab-star" + (r.stars === 4 ? " s4" : "")}>&#9733; {r.stars ?? 5}.0</b>
                            <span>{r.role} · {r.date}</span>
                          </div>
                          <p className="ab-text">{r.likes}</p>
                        </article>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a className="btn" href="https://www.ambitionbox.com/reviews/little-nap-recliners-reviews?sort_by=latest" target="_blank" rel="noopener noreferrer">
          Read more reviews on AmbitionBox
        </a>
      </section>
      <section className="vision vision-xl closing">
        <p>{littleNap.outro}</p>
      </section>
    </>
  );
}
