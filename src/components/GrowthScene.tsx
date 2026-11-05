"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PEOPLE = 470;
const ROOMS = 18;
const stages = [
  { at: 0, year: "2011", text: "₹5 lakh, a 600 sq. ft. display area and a team of three." },
  { at: 0.38, year: "2022", text: "12 showrooms and 75,000 sq. ft. of production units." },
  { at: 0.78, year: "2026", text: "2 factories, 18 showrooms and a team of 470+." },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.min(Math.max(t, 0), 1);

export default function GrowthScene() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        el.classList.add("is-scrubbed");
        const people = gsap.utils.toArray<HTMLElement>(".gs-person", el);
        const rooms = gsap.utils.toArray<HTMLElement>(".gs-room", el);
        const pc = el.querySelector<HTMLElement>(".gs-people-count")!;
        const rc = el.querySelector<HTMLElement>(".gs-rooms-count")!;
        const yr = gsap.utils.toArray<HTMLElement>(".gs-stage", el);
        const bar = el.querySelector<HTMLElement>(".gs-bar span")!;
        let lastP = -1;
        let lastR = -1;
        let lastS = -1;

        const render = (P: number) => {
          const np = Math.round(lerp(3, PEOPLE, Math.pow(P, 1.6) * 1.0));
          const nr = Math.round(P < 0.55 ? lerp(1, 12, P / 0.55) : lerp(12, ROOMS, (P - 0.55) / 0.4));
          if (np !== lastP) {
            people.forEach((d, i) => d.classList.toggle("on", i < np));
            pc.textContent = String(np) + (P > 0.97 ? "+" : "");
            lastP = np;
          }
          if (nr !== lastR) {
            rooms.forEach((d, i) => d.classList.toggle("on", i < nr));
            rc.textContent = String(nr);
            lastR = nr;
          }
          let s = 0;
          stages.forEach((g, i) => {
            if (P >= g.at) s = i;
          });
          if (s !== lastS) {
            yr.forEach((y, i) => y.classList.toggle("is-active", i === s));
            lastS = s;
          }
          gsap.set(bar, { scaleX: P });
        };
        render(0);

        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=320%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
          onUpdate: (self) => render(self.progress),
        });
        return () => {
          el.classList.remove("is-scrubbed");
          people.forEach((d) => d.classList.add("on"));
          rooms.forEach((d) => d.classList.add("on"));
        };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="growth" ref={root} aria-label="How Little Nap grew">
      <div className="gs-stages">
        {stages.map((s, i) => (
          <div className={"gs-stage" + (i === 0 ? " is-active" : "")} key={s.year}>
            <div className="gs-year">{s.year}</div>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
      <div className="gs-board">
        <div className="gs-block">
          <div className="gs-count">
            <span className="gs-rooms-count">{ROOMS}</span>
            <small>showrooms</small>
          </div>
          <div className="gs-rooms" aria-hidden="true">
            {Array.from({ length: ROOMS }, (_, i) => (
              <i className="gs-room on" key={i} />
            ))}
          </div>
        </div>
        <div className="gs-block">
          <div className="gs-count">
            <span className="gs-people-count">{PEOPLE}+</span>
            <small>people</small>
          </div>
          <div className="gs-people" aria-hidden="true">
            {Array.from({ length: PEOPLE }, (_, i) => (
              <i className="gs-person on" key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="gs-bar">
        <span />
      </div>
    </section>
  );
}
