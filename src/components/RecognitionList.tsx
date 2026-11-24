"use client";

import { useEffect, useRef, useState } from "react";
import { recognition, type Entry } from "@/content";

const tabs = [
  { id: "awards", label: "Awards" },
  { id: "press", label: "Press" },
  { id: "talks", label: "Conversations" },
] as const;

type TabId = (typeof tabs)[number]["id"];

// YouTube links get their own thumbnail; articles use the picture the publisher chose.
function picture(e: Entry): string | undefined {
  if (e.img) return e.img;
  const m = e.href?.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/mqdefault.jpg` : undefined;
}

export default function RecognitionList() {
  const [tab, setTab] = useState<TabId>("awards");
  const [open, setOpen] = useState<Entry | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // A link such as /recognition#talks opens that tab.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#", "") as TabId;
      if (tabs.some((t) => t.id === id)) setTab(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const video = tab === "talks";

  function card(e: Entry, i: number) {
    const img = picture(e);
    const body = (
      <>
        <div className={"rec-pic" + (img ? "" : " rec-pic-none")}>
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={e.full ? `${e.title}, ${e.source}` : ""} loading="lazy" referrerPolicy="no-referrer" />
          ) : (
            <span>{e.source}</span>
          )}
          {video ? <i className="rec-play" aria-hidden="true" /> : null}
          <b className="rec-year">{e.year}</b>
          {e.full ? <em className="rec-zoom">View full size</em> : null}
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
        {e.full ? (
          <button type="button" className="rec-open" onClick={() => setOpen(e)} aria-haspopup="dialog">
            {body}
          </button>
        ) : e.href ? (
          <a href={e.href} target="_blank" rel="noopener noreferrer">
            {body}
          </a>
        ) : (
          <div className="rec-static">{body}</div>
        )}
      </li>
    );
  }

  const items = recognition[tab];
  const him = items.filter((e) => e.who === "him");
  const company = items.filter((e) => e.who === "company");

  return (
    <section className="rec">
      <div className="tabs" role="group" aria-label="Type of recognition">
        {tabs.map((t) => (
          <button key={t.id} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label} <span>{recognition[t.id].length}</span>
          </button>
        ))}
      </div>

      {tab === "awards" ? (
        <>
          <h2 className="rec-group">Awarded to Ravinder Goel</h2>
          <ul className="rec-grid" key="him">
            {him.map(card)}
          </ul>
          <h2 className="rec-group">Awarded to Little Nap</h2>
          <ul className="rec-grid" key="company">
            {company.map(card)}
          </ul>
        </>
      ) : (
        <ul className="rec-grid" key={tab}>
          {items.map(card)}
        </ul>
      )}

      <dialog ref={dialog} className="rec-dialog" onClose={() => setOpen(null)} onClick={(ev) => { if (ev.target === dialog.current) setOpen(null); }}>
        {open ? (
          <figure>
            <button type="button" className="rec-close" onClick={() => setOpen(null)} aria-label="Close">
              Close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.full} alt={`${open.title}, ${open.source}`} />
            <figcaption>
              <strong>
                {open.title} <span>{open.year}</span>
              </strong>
              <span>{open.source}</span>
              {open.note ? <p>{open.note}</p> : null}
              {open.href ? (
                <a href={open.href} target="_blank" rel="noopener noreferrer">
                  Read at the source
                </a>
              ) : null}
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
