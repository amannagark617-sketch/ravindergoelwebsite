"use client";

import { useState } from "react";
import Link from "next/link";
import { homeIndex } from "@/content";

export default function HomeIndex() {
  const [active, setActive] = useState(0);

  return (
    <section className="home-index" aria-label="Explore the site">
      <ul>
        {homeIndex.map((h, i) => (
          <li key={h.href} className={i === active ? "is-active" : ""}>
            <Link
              href={h.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="hi-title">{h.title}</span>
              <span className="hi-note">{h.note}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hi-preview" aria-hidden="true">
        {homeIndex.map((h, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={h.img} src={h.img} alt="" className={i === active ? "is-active" : ""} />
        ))}
      </div>
    </section>
  );
}
