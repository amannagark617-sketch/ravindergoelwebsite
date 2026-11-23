import Link from "next/link";
import { LINKEDIN, person } from "@/content";

const facts = [
  { n: "2011", l: "Founded" },
  { n: "2", l: "Factories" },
  { n: "18", l: "Showrooms" },
  { n: "1,300+", l: "Cinema screens" },
  { n: "La-Z-Boy", l: "Exclusive partner in India" },
  { n: "AFMT", l: "Vice President, North India Chapter" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1 className="hero-name">{person.name}</h1>
        <p className="hero-role">Founder and CEO, Little Nap Recliners</p>
        <p className="hero-sub">He believes comfort is not a luxury but a fundamental human experience.</p>
        <div className="hero-links">
          <Link className="btn btn-solid" href="/journey">
            Read the journey
          </Link>
          <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="hero-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ravinder-portrait.jpg"
          alt="Ravinder Goel, Founder and CEO of Little Nap Recliners"
          width={1333}
          height={2000}
          style={{ objectPosition: "50% 22%" }}
        />
      </div>
      <ul className="hero-facts">
        {facts.map((f) => (
          <li key={f.l}>
            <strong>{f.n}</strong>
            <span>{f.l}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
