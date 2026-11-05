"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content";

export default function GalleryWall() {
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const step = useCallback((d: number) => {
    setOpen((o) => (o === null ? o : (o + d + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      window.__lenis?.start();
      opener.current?.focus();
    };
  }, [open, step]);

  const g = open === null ? null : gallery[open];

  return (
    <>
      <div className="wall">
        {gallery.map((p, i) => (
          <button
            key={p.src}
            className="wall-item"
            onClick={(e) => {
              opener.current = e.currentTarget;
              setOpen(i);
            }}
            aria-label={`Enlarge photograph ${i + 1}: ${p.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" width={p.w} height={p.h} loading="lazy" />
          </button>
        ))}
      </div>
      {g ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={g.src} alt={g.alt} />
          <div className="lightbox-bar">
            <button onClick={() => step(-1)}>Previous</button>
            <span>
              {open! + 1} of {gallery.length}
            </span>
            <button onClick={() => step(1)}>Next</button>
            <button ref={closeBtn} onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
