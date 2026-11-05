"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery, portrait } from "@/content";

const items = gallery.filter((g) => g.src !== portrait.src).slice(0, 9);

export default function GalleryStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const tr = track.current!;
        el.classList.add("is-scrubbed");
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
        gsap.to(tr, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => el.classList.remove("is-scrubbed");
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery" ref={root} aria-label="Photographs">
      <div className="gallery-track" ref={track}>
        {items.map((g) => (
          <div
            className="gallery-item"
            key={g.src}
            style={{ aspectRatio: `${g.w} / ${g.h}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={g.alt} width={g.w} height={g.h} loading="lazy" />
          </div>
        ))}
        <Link className="gallery-more" href="/gallery">
          See all {items.length + 1} photographs
        </Link>
      </div>
    </section>
  );
}
