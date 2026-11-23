import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { articles } from "@/journal";

export const metadata: Metadata = {
  title: "Journal: Stories by and about Ravinder Goel",
  description:
    "Articles on Ravinder Goel and Little Nap Recliners: the founding story, cinema seating, La-Z-Boy in India, AFMT, leadership and the team. Each one links to its sources.",
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Journal() {
  return (
    <main>
      <PageIntro
        title="Journal"
        lede="Stories about Ravinder Goel and Little Nap, drawn from his own posts, interviews and the press. Every article lists its sources."
      />
      <section className="journal-list">
        <ul>
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/journal/${a.slug}`}>
                <span className="j-topic">{a.topic}</span>
                <h2>{a.title}</h2>
                <p>{a.description}</p>
                <span className="j-meta">
                  {fmt(a.date)}, {a.minutes} min read
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
