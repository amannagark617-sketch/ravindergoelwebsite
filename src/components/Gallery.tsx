"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/content";

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    const tr = track.current;
    if (!el || !tr) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.classList.add("is-scrubbed");
        const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);

        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Each photo drifts slightly against the strip for depth.
        gsap.utils.toArray<HTMLElement>(".gallery-item img", el).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
              },
            }
          );
        });

        return () => el.classList.remove("is-scrubbed");
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery" ref={root} aria-label="Photographs of Ravinder Goel">
      <div className="gallery-track" ref={track}>
        {gallery.map((p) => (
          <figure
            className="gallery-item"
            key={p.src}
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} width={p.w} height={p.h} alt={p.alt} decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
}
