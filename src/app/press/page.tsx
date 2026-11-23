import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { LINKEDIN } from "@/content";

export const metadata: Metadata = {
  title: "Press Kit: Biography, Facts and Photos",
  description:
    "Press kit for Ravinder Goel (RG), Founder and CEO of Little Nap Recliners: a 90-second biography, fact sheet, frequently asked questions and downloadable photographs.",
};

const facts: [string, string][] = [
  ["Full name", "Ravinder Goel"],
  ["Role", "Founder and CEO, Little Nap Designs Pvt. Ltd."],
  ["Founded", "July 2011, with a ₹5 lakh credit card loan and a team of three"],
  ["Headquarters", "New Delhi, India"],
  ["Factories", "2 — IMT Manesar (Haryana) and Dewas (Madhya Pradesh)"],
  ["Showrooms", "18, across North, West, South and Central India"],
  ["Team", "470+ people"],
  ["Cinema", "Recliners in 1,300+ cinema screens"],
  ["La-Z-Boy", "Exclusive partner in India since April 2020"],
  ["Industry role", "Vice President, North India Chapter, AFMT. Elected for a third consecutive term, 2026–2028"],
  ["Group", "Little Nap Designs, La-Z-Boy India, Seating Spectrum (Malaysia), Little Nap Seating Spectrum Private Limited"],
];

const faq: [string, string][] = [
  ["Who is Ravinder Goel?", "Ravinder Goel is the founder and CEO of Little Nap Recliners, an Indian recliner manufacturer. He is also Vice President of the North India Chapter of AFMT, the Association of Furniture Manufacturers & Traders (INDIA)."],
  ["Why is he called RG?", "Colleagues and partners at Little Nap call him RG, from his initials."],
  ["When and how did he start Little Nap?", "In July 2011, with a ₹5 lakh credit card loan, a 600 sq. ft. display area and a team of three."],
  ["How big is Little Nap today?", "Two factories, in IMT Manesar (Haryana) and Dewas (Madhya Pradesh), 18 showrooms across India, a team of more than 470 people, and recliners in more than 1,300 cinema screens."],
  ["What is Little Nap's link with La-Z-Boy?", "In April 2020, La-Z-Boy, the American recliner brand founded in 1927, made Little Nap its exclusive partner in India."],
  ["What does Little Nap believe about comfort?", "Ravinder Goel believes comfort is not a luxury but a fundamental human experience, and Little Nap's vision is to redefine comfort as an experience."],
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const photos = [
  { src: "/images/ravinder-office.jpg", label: "Portrait, office" },
  { src: "/images/ravinder-portrait.jpg", label: "Portrait, studio" },
  { src: "/images/ravinder-cinema-seated.jpg", label: "In a Little Nap cinema" },
  { src: "/images/ravinder-showroom-standing.jpg", label: "In a showroom" },
];

export default function Press() {
  return (
    <main>
      <PageIntro
        title="Press kit"
        lede="The short biography, the facts and the photographs, ready to use."
      />
      <section className="presskit">
        <div className="pk-bio">
          <h2>In 90 seconds</h2>
          <p>
            Ravinder Goel is the founder and CEO of Little Nap Recliners, an Indian recliner
            manufacturer. He grew up in a middle-class family in Khanpur and earned a management
            degree in Mumbai in 2002. In July 2011 he started Little Nap with a ₹5 lakh credit
            card loan, a 600 sq. ft. display area and a team of three.
          </p>
          <p>
            Today Little Nap runs two factories, in IMT Manesar and Dewas, 18 showrooms across
            India and a team of more than 470 people, and its recliners seat audiences in more
            than 1,300 cinema screens. In April 2020, La-Z-Boy, the American recliner brand
            founded in 1927, made Little Nap its exclusive partner in India, citing the
            company's business ethics, core values, team and ten years of growth.
          </p>
        </div>
        <div className="pk-faq">
          <h2>Frequently asked questions</h2>
          {faq.map(([q, a]) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </div>
        <div className="pk-facts">
          <h2>Fact sheet</h2>
          <dl>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="pk-photos">
          <h2>Photographs</h2>
          <ul>
            {photos.map((p) => (
              <li key={p.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={`${p.label} of Ravinder Goel`} loading="lazy" />
                <a className="btn" href={p.src} download>
                  Download: {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="pk-contact">
          <h2>Media and speaking enquiries</h2>
          <p>
            Reach Ravinder on{" "}
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            , or call any showroom from the <a href="/showrooms">showrooms page</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
