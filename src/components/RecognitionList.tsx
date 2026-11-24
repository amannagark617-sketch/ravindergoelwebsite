"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { recognition, type Entry } from "@/content";
import { imageSizes } from "@/lib/imageSizes";

const tabs = [
  { id: "awards", label: "Awards" },
  { id: "press", label: "Press" },
  { id: "talks", label: "Conversations" },
] as const;

type TabId = (typeof tabs)[number]["id"];

// YouTube links get their own thumbnail; articles use the picture the publisher chose.
function picture(e: Entry): { src: string; size: [number, number] } | undefined {
  if (e.img) return { src: e.img, size: imageSizes[e.img] ?? [16, 10] };
  const m = e.href?.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? { src: `https://i.ytimg.com/vi/${m[1]}/mqdefault.jpg`, size: [320, 180] } : undefined;
}

// Cards keep the shape of their picture, so portrait certificates stay portrait and wide ones stay wide.
// Each card is given as many 1px grid rows as it needs, which packs them without gaps and keeps left-to-right order.
function Masonry({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  useLayoutEffect(() => {
    const ul = ref.current;
    if (!ul) return;
    const gap = 24;
    const place = (li: HTMLElement) => {
      li.style.gridRowEnd = "auto";
      li.style.gridRowEnd = `span ${Math.ceil(li.getBoundingClientRect().height) + gap}`;
    };
    const items = Array.from(ul.children) as HTMLElement[];
    const ro = new ResizeObserver((entries) => entries.forEach((en) => place(en.target as HTMLElement)));
    items.forEach((li) => {
      place(li);
      ro.observe(li);
    });
    ul.classList.add("is-masonry");
    return () => {
      ro.disconnect();
      ul.classList.remove("is-masonry");
    };
  }, [children]);
  return (
    <ul className="rec-grid" ref={ref}>
      {children}
    </ul>
  );
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
    const pic = picture(e);
    const [w, h] = pic?.size ?? [16, 10];
    // Small originals are shown no larger than about 1.6 times their size, so they stay sharp.
    const cap = w < 500 ? { maxWidth: `${Math.round(w * 1.6)}px` } : undefined;
    const body = (
      <>
        <div className={"rec-pic" + (pic ? "" : " rec-pic-none")}>
          {pic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pic.src}
              width={w}
              height={h}
              style={cap}
              alt={e.full ? `${e.title}, ${e.source}` : ""}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{e.source}</span>
          )}
          {video ? <i className="rec-play" aria-hidden="true" /> : null}
          <b className="rec-year">{e.year}</b>
          {e.full || e.embed ? <em className="rec-zoom">{e.embed ? "Play video" : "View full size"}</em> : null}
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
        {e.full || e.embed ? (
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
          <Masonry key="him">{him.map(card)}</Masonry>
          <h2 className="rec-group">Awarded to Little Nap</h2>
          <Masonry key="company">{company.map(card)}</Masonry>
        </>
      ) : (
        <Masonry key={tab}>{items.map(card)}</Masonry>
      )}

      <dialog ref={dialog} className="rec-dialog" onClose={() => setOpen(null)} onClick={(ev) => { if (ev.target === dialog.current) setOpen(null); }}>
        {open ? (
          <figure>
            <button type="button" className="rec-close" onClick={() => setOpen(null)} aria-label="Close">
              Close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {open.embed ? (
              <iframe className="rec-embed" src={open.embed} title={open.title} width="267" height="476" loading="lazy" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
            ) : (
              <img src={open.full} alt={`${open.title}, ${open.source}`} />
            )}
            <figcaption>
              <strong>
                {open.title} <span>{open.year}</span>
              </strong>
              <span>{open.source}</span>
              {open.note ? <p>{open.note}</p> : null}
              {open.href ? (
                <a href={open.href} target="_blank" rel="noopener noreferrer">
                  {open.hrefLabel ?? "Read at the source"}
                </a>
              ) : null}
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
