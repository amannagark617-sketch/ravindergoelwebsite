"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { articles, isPublished, media, type Article } from "@/journal";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Card({ a, big }: { a: Article; big?: boolean }) {
  const m = media[a.slug];
  return (
    <Link href={`/journal/${a.slug}`} className={"jcard" + (big ? " jcard-big" : "")}>
      <span className="jcard-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/${m.hero.src}`} alt="" loading={big ? "eager" : "lazy"} style={{ objectPosition: m.hero.pos }} />
      </span>
      <span className="jcard-body">
        <span className="j-topic">{a.topic}</span>
        <h2>{a.title}</h2>
        <p>{a.description}</p>
        <span className="j-meta">
          {fmt(a.date)} · {a.minutes} min read
        </span>
      </span>
    </Link>
  );
}

export default function JournalList({ exclude, limit, featured, heading }: { exclude?: string; limit?: number; featured?: boolean; heading?: string }) {
  const pick = (today?: string) =>
    articles
      .filter((a) => a.slug !== exclude && isPublished(a, today))
      .sort((x, y) => (x.date < y.date ? 1 : -1))
      .slice(0, limit ?? 99);
  const [list, setList] = useState<Article[]>(() => pick("2026-11-24"));
  useEffect(() => setList(pick()), []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!list.length) return null;
  const [first, ...rest] = list;
  return (
    <div className="jlist">
      {heading ? <h2 className="jlist-h">{heading}</h2> : null}
      {featured ? <Card a={first} big /> : <Card a={first} />}
      {rest.length > 0 && (
        <div className="jgrid">
          {rest.map((a) => (
            <Card key={a.slug} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}
