"use client";

import { useState } from "react";
import { recognition, type Entry } from "@/content";

const tabs = [
  { id: "awards", label: "Awards" },
  { id: "press", label: "Press" },
  { id: "talks", label: "Conversations" },
] as const;

// YouTube links get their own thumbnail; articles use the picture the publisher chose.
function picture(e: Entry): string | undefined {
  if (e.img) return e.img;
  const m = e.href?.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/mqdefault.jpg` : undefined;
}

export default function RecognitionList() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("awards");
  const items = recognition[tab];
  const video = tab === "talks";

  return (
    <section className="rec">
      <div className="tabs" role="group" aria-label="Type of recognition">
        {tabs.map((t) => (
          <button key={t.id} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label} <span>{recognition[t.id].length}</span>
          </button>
        ))}
      </div>
      <ul className="rec-grid" key={tab}>
        {items.map((e, i) => {
          const img = picture(e);
          const body = (
            <>
              <div className={"rec-pic" + (img ? "" : " rec-pic-none")}>
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" loading="lazy" referrerPolicy="no-referrer" />
                ) : (
                  <span>{e.source}</span>
                )}
                {video ? <i className="rec-play" aria-hidden="true" /> : null}
                <b className="rec-year">{e.year}</b>
              </div>
              <div className="rec-main">
                <h3>{e.title}</h3>
                <div className="rec-source">{e.source}</div>
                {e.note ? <p>{e.note}</p> : null}
              </div>
            </>
          );
          return (
            <li key={e.title} className="rec-card" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
              {e.href ? (
                <a href={e.href} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                <div className="rec-static">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
