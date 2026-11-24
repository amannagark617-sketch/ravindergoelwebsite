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
  title: "Little Nap Recliners and the Little Nap Group",
  description:
    "Little Nap Recliners, founded by Ravinder Goel in 2011: two factories, 18 showrooms, 470+ people, recliners in 1,300+ cinema screens, and the companies in the group.",
};

const AB = "https://www.ambitionbox.com/overview/little-nap-recliners-overview?utm_source=employer-dashboard&utm_campaign=little-nap-recliners&utm_medium=badges";

const rows = [0, 1, 2].map((i) => abReviews.filter((_, n) => n % 3 === i));

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
      <section className="people-say">
        <h2>What our people say</h2>
        <p>Our team rates us 4.7 out of 5 on AmbitionBox. Here is what they wrote.</p>
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
        <div className="ab-rows" aria-label="5-star employee reviews from AmbitionBox">
          {rows.map((row, ri) => (
            <div className="ab-marquee" key={ri}>
              <div className={"ab-track" + (ri % 2 ? " rev" : "")} style={{ animationDuration: `${row.length * 9}s` }}>
                {[0, 1].map((n) => (
                  <ul key={n} aria-hidden={n === 1 ? true : undefined}>
                    {row.map((r) => (
                      <li key={r.likes.slice(0, 30)}>
                        <article className="ab-card">
                          <div className="ab-head">
                            <b className="ab-star">&#9733; 5.0</b>
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
        <p className="reviews-note">Latest 5-star reviews, copied as posted.</p>
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
