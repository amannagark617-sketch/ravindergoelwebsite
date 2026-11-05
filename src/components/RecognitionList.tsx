"use client";

import { useState } from "react";
import { recognition } from "@/content";

const tabs = [
  { id: "awards", label: "Awards" },
  { id: "press", label: "Press" },
  { id: "talks", label: "Conversations" },
] as const;

export default function RecognitionList() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("awards");
  const items = recognition[tab];

  return (
    <section className="rec">
      <div className="tabs" role="group" aria-label="Type of recognition">
        {tabs.map((t) => (
          <button key={t.id} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label} <span>{recognition[t.id].length}</span>
          </button>
        ))}
      </div>
      <ul className="rec-list">
        {items.map((e) => (
          <li key={e.title} className="rec-item">
            <div className="rec-year">{e.year}</div>
            <div className="rec-main">
              <h3>{e.title}</h3>
              <div className="rec-source">{e.source}</div>
              {e.note ? <p>{e.note}</p> : null}
            </div>
            {e.href ? (
              <a className="btn" href={e.href} target="_blank" rel="noopener noreferrer">
                Open
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
