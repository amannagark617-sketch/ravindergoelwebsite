import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JournalList from "@/components/JournalList";
import { articles, bySlug, media, caption } from "@/journal";

const SITE = "https://www.ravindergoel.com";
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.date, url: `${SITE}/journal/${a.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) notFound();
  const m = media[a.slug];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "en-IN",
    mainEntityOfPage: `${SITE}/journal/${a.slug}`,
    image: `${SITE}/images/${m.hero.src}`,
    author: { "@type": "Organization", name: "ravindergoel.com", url: SITE },
    publisher: { "@id": `${SITE}/#person` },
    about: { "@id": `${SITE}/#person` },
    citation: a.sources.map((s) => s.href),
  };

  return (
    <main>
      <article className="article">
        <header className="article-head">
          <p className="j-topic">
            <Link href="/journal">Journal</Link> / {a.topic}
          </p>
          <h1>{a.title}</h1>
          <p className="article-lede">{a.description}</p>
          <p className="j-meta">
            {fmt(a.date)} · {a.minutes} min read
          </p>
        </header>
        <figure className="article-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${m.hero.src}`} alt={caption} style={{ objectPosition: m.hero.pos }} width={1500} height={844} />
        </figure>
        <div className="article-body">
          {a.body.map((b, k) => (
            <section key={k}>
              {b.h ? <h2>{b.h}</h2> : null}
              {b.p.map((t, j) => (
                <p key={j}>{t}</p>
              ))}
              {k === 1 && (
                <figure className="article-fig">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/${m.figure.src}`} alt={caption} loading="lazy" style={{ objectPosition: m.figure.pos }} width={1200} height={800} />
                  <figcaption>{caption}</figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>
        <aside className="article-sources">
          <h2>Sources</h2>
          <ul>
            {a.sources.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <h2>Related on this site</h2>
          <ul>
            {a.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>{r.label}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="article-more">
          <JournalList exclude={a.slug} limit={3} heading="Keep reading" />
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </article>
    </main>
  );
}
