"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/content";
import { focus } from "@/focus";

export default function FilmJourney({ images }: { images: (string | null)[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const distRef = useRef(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const tr = track.current!;
        el.classList.add("is-scrubbed");
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
        const marks = gsap.utils.toArray<HTMLElement>(".film-mark", el);
        const fill = el.querySelector<HTMLElement>(".film-fill")!;
        const panels = gsap.utils.toArray<HTMLElement>(".film-panel", el);

        const tween = gsap.to(tr, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => "+=" + dist() * 1.1,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              st.current = self;
              distRef.current = dist();
            },
            onUpdate: (self) => {
              gsap.set(fill, { scaleX: self.progress });
              const x = self.progress * dist();
              let a = 0;
              panels.forEach((p, i) => {
                if (p.offsetLeft <= x + window.innerWidth * 0.35) a = i;
              });
              marks.forEach((m, i) => m.classList.toggle("is-on", i === a));
            },
          },
        });

        panels.forEach((p) => {
          const img = p.querySelector(".film-photo img");
          const year = p.querySelector(".film-year");
          if (img)
            gsap.fromTo(
              img,
              { xPercent: -9, scale: 1.18 },
              { xPercent: 9, scale: 1.18, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }
            );
          if (year)
            gsap.fromTo(
              year,
              { x: "18vw" },
              { x: "-14vw", ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }
            );
        });
        return () => el.classList.remove("is-scrubbed");
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (i: number) => {
    const s = st.current;
    const panel = track.current?.children[i] as HTMLElement | undefined;
    if (!s || !panel || !distRef.current) return;
    const frac = Math.min(panel.offsetLeft / distRef.current, 1);
    const y = s.start + (s.end - s.start) * frac;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.8 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="film" ref={root} aria-label="Chapters of the journey">
      <div className="film-track" ref={track}>
        {chapters.map((c, i) => (
          <article className={"film-panel" + (images[i] ? " has-photo" : "")} key={c.title}>
            <div className="film-year" aria-hidden="true">
              {c.year}
            </div>
            {images[i] ? (
              <div className="film-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={images[i]!} alt="" loading="lazy" style={{ objectPosition: focus(images[i]!) }} />
              </div>
            ) : null}
            <div className="film-text">
              <div className="film-label">{c.year}</div>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              {c.facts ? (
                <ul className="story-facts">
                  {c.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              ) : null}
              {c.href ? (
                <Link className="btn" href={c.href}>
                  {c.hrefLabel}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <div className="film-ruler" role="group" aria-label="Jump to a chapter">
        <div className="film-line">
          <span className="film-fill" />
        </div>
        <div className="film-marks">
          {chapters.map((c, i) => (
            <button key={c.title} className={"film-mark" + (i === 0 ? " is-on" : "")} onClick={() => go(i)} aria-label={`${c.year}: ${c.title}`}>
              <i />
              <span>{c.year}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
