"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/content";

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.classList.add("is-scrubbed");

        const n = chapters.length;
        const stack = el.querySelector(".story-years-stack");
        const panels = gsap.utils.toArray<HTMLElement>(".story-panel", el);
        const bar = el.querySelector(".story-progress span");
        const total = 2 * (n - 1) + 1;

        gsap.set(panels, { opacity: 0, y: 28 });
        gsap.set(panels[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: `+=${n * 85}%`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: total }, 0);
        for (let i = 1; i < n; i++) {
          const t = 2 * i - 1;
          tl.to(panels[i - 1], { opacity: 0, y: -28, duration: 0.6 }, t)
            .to(stack, { yPercent: -(100 / n) * i, duration: 1 }, t)
            .to(panels[i], { opacity: 1, y: 0, duration: 0.6 }, t + 0.4);
        }
        tl.to({}, { duration: 1 }, 2 * (n - 1));

        return () => {
          el.classList.remove("is-scrubbed");
        };
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={root}>
      <div className="story-pin">
        <div className="story-years" aria-hidden="true">
          <div className="story-years-stack">
            {chapters.map((c) => (
              <div className="story-year" key={c.year}>
                {c.year}
              </div>
            ))}
          </div>
        </div>
        <div className="story-panels">
          {chapters.map((c) => (
            <article className="story-panel" key={c.year}>
              <div className="story-panel-year">{c.year}</div>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="story-progress" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
