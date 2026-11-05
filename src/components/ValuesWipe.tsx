"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coreValues } from "@/content";
import { focus } from "@/focus";

export default function ValuesWipe({ photos }: { photos: string[] }) {
  const root = useRef<HTMLElement>(null);
  const n = coreValues.length;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        el.classList.add("is-scrubbed");
        const figs = gsap.utils.toArray<HTMLElement>(".vw-fig", el);
        const texts = gsap.utils.toArray<HTMLElement>(".vw-text", el);
        const stack = el.querySelector(".vw-nums-stack")!;
        const bar = el.querySelector(".vw-bar span")!;
        gsap.set(figs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 30 });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top top", end: `+=${n * 80}%`, pin: true, scrub: true, anticipatePin: 1 },
        });
        const total = 2 * (n - 1) + 1;
        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: total }, 0);
        for (let i = 1; i < n; i++) {
          const t = 2 * i - 1;
          tl.to(figs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, t)
            .to(figs[i - 1], { scale: 1.12, duration: 1.2 }, t)
            .to(texts[i - 1], { autoAlpha: 0, y: -30, duration: 0.5 }, t)
            .to(stack, { yPercent: -(100 / n) * i, duration: 1 }, t)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.6 }, t + 0.5);
        }
        tl.to({}, { duration: 1 }, 2 * (n - 1));
        return () => el.classList.remove("is-scrubbed");
      });
    }, root);
    return () => ctx.revert();
  }, [n]);

  return (
    <section className="vw" ref={root} aria-label="Five core values">
      <div className="vw-figs">
        {coreValues.map((v, i) => (
          <figure className="vw-fig" key={v.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[i]} alt="" loading="lazy" style={{ objectPosition: focus(photos[i]) }} />
          </figure>
        ))}
      </div>
      <div className="vw-body">
        <div className="vw-nums" aria-hidden="true">
          <div className="vw-nums-stack">
            {coreValues.map((v, i) => (
              <div key={v.name}>{i + 1}</div>
            ))}
          </div>
        </div>
        <div className="vw-texts">
          {coreValues.map((v, i) => (
            <div className="vw-text" key={v.name}>
              <div className="vw-static-num">{i + 1}</div>
              <h3>{v.name}</h3>
              <div className="v-line">{v.line}</div>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="vw-bar">
        <span />
      </div>
    </section>
  );
}
