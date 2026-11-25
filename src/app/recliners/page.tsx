import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";

export const metadata: Metadata = {
  title: "Little Nap Recliners: Motorized, Home Theatre and Cinema Recliners",
  description:
    "Little Nap Recliners makes recliner chairs in India: living room recliners, motorized recliners, home theatre and multiplex recliners, loungers and massage chairs. Exclusive La-Z-Boy partner in India.",
  keywords: [
    "Little Nap",
    "Little Nap Recliners",
    "recliner chairs India",
    "motorized recliners India",
    "home theatre recliners",
    "cinema recliners",
    "multiplex recliners",
    "living room recliners",
    "recliner manufacturer India",
    "La-Z-Boy India",
    "La-Z-Boy recliners India",
  ],
};

const SITE = "https://www.littlenap.in";

const range: [string, string, string][] = [
  ["Living room recliners", "Recliner chairs for the home, made to order and customised to the last detail.", `${SITE}/living-room-recliners`],
  ["Home theatre recliners", "Seating for private screening rooms and home theatres.", `${SITE}/home-theater-recliners`],
  ["Multiplex recliners", "Cinema seating. Little Nap seats are in more than 1,300 cinema screens, including PVR INOX, Cinepolis and NY Cinemas.", `${SITE}/multiplex-recliners`],
  ["Lounger recliners", "Loungers for living rooms, studies and lounges.", `${SITE}/lounger`],
  ["Massage chairs", "Massage chairs from the Little Nap range.", `${SITE}/massage-chair`],
  ["La-Z-Boy recliners", "Little Nap is the exclusive La-Z-Boy partner in India.", `${SITE}/lazboy`],
];

const faq: [string, string][] = [
  ["What is Little Nap?", "Little Nap Recliners, from Little Nap Designs Pvt. Ltd., is an Indian recliner company founded by Ravinder Goel in July 2011. It runs 2 factories, in IMT Manesar (Haryana) and Dewas (Madhya Pradesh), and 18 showrooms across India."],
  ["Who makes Little Nap recliners?", "Little Nap makes its recliners in its own factories in IMT Manesar and Dewas, with a monthly capacity of 5,000 recliners. Each seat goes through a 67-point quality inspection."],
  ["Does Little Nap make motorized recliners?", "Yes. In 2026 Little Nap Recliners achieved BIS certification under IS 302 (Part 1):2024 for motorized recliners."],
  ["Is Little Nap the La-Z-Boy partner in India?", "Yes. In April 2020 La-Z-Boy, the American recliner brand founded in 1927, made Little Nap its exclusive partner in India."],
  ["Does Little Nap make cinema and home theatre recliners?", "Yes. Little Nap seats are in more than 1,300 cinema screens, and the company also makes recliners for home theatres, hospitals, clubhouses and luxury buses."],
  ["Where can I see a Little Nap recliner?", "Little Nap has 18 exclusive showrooms across North, West, South and Central India. The showrooms page lists each city."],
  ["Who is the founder of Little Nap?", "Ravinder Goel, known as RG, is the Founder and CEO of Little Nap Recliners."],
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Recliners() {
  return (
    <>
      <PageIntro
        title="Little Nap recliners"
        lede="Recliner chairs made in India since 2011, from living rooms and home theatres to more than 1,300 cinema screens."
      />
      <section className="prose-block">
        <h2>What Little Nap makes</h2>
        <p>
          Little Nap Recliners is one of India&apos;s recliner manufacturers. Founder and CEO Ravinder Goel started it in July 2011
          with a ₹5 lakh credit card loan and a 600 sq. ft. display area. Today it is a self-funded group of 470+ people, with 2
          factories, 18 exclusive showrooms and a monthly capacity of 5,000 recliners.
        </p>
        <p>
          Its recliners combine German engineering, Indian craftsmanship and global design, and every seat passes a 67-point
          quality inspection. In 2026 the company achieved BIS certification under IS 302 (Part 1):2024 for motorized recliners.
        </p>
      </section>
      <section className="prose-block">
        <h2>The range</h2>
        <ul className="range-list">
          {range.map(([name, text, href]) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer">{name}</a>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>
      <div className="split">
        <section className="prose-block">
          <h2>La-Z-Boy in India</h2>
          <p>
            La-Z-Boy invented the recliner in Monroe, Michigan in 1927. In April 2020, during the lockdown, it signed its first
            contract with Little Nap and made it the exclusive partner for India. Little Nap brings La-Z-Boy recliners to Indian
            homes through its showrooms.
          </p>
          <p>
            <Link href="/la-z-boy">Read the La-Z-Boy story</Link> or <Link href="/showrooms">find a showroom</Link>.
          </p>
        </section>
        <Parallax className="split-photo" src="/images/ravinder-theatre-hands.jpg" />
      </div>
      <section className="prose-block">
        <h2>Cinema, home theatre and beyond</h2>
        <p>
          Little Nap began in cinema seating with a first order from PVR and now supplies PVR INOX, Cinepolis and NY Cinemas. It
          also makes recliners for home theatres, hospitals, clubhouses and luxury buses, and runs a joint venture with Seating
          Spectrum of Malaysia.
        </p>
        <p>
          <Link href="/little-nap">More on the company</Link> and <Link href="/journey">the founder&apos;s journey</Link>.
        </p>
      </section>
      <section className="prose-block faq">
        <h2>Questions</h2>
        <dl>
          {faq.map(([q, a]) => (
            <div key={q}>
              <dt>{q}</dt>
              <dd>{a}</dd>
            </div>
          ))}
        </dl>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </section>
    </>
  );
}
