"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { beginning as b } from "@/content";

export default function Beginning() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".num").forEach((el, i) => {
          const to = Number(el.dataset.to);
          const counter = { v: 0 };
          el.textContent = "0";
          gsap.to(counter, {
            v: to,
            duration: 2.2,
            delay: i * 0.25,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
            scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="beginning" ref={root}>
      <p>
        {b.before}
        <span className="num" data-to={b.startLakh}>
          {b.startLakh}
        </span>
        {b.mid1}
        <span className="num" data-to={b.team}>
          {b.team}
        </span>
        {b.mid2}
        <span className="num" data-to={b.sqft}>
          {b.sqft}
        </span>
        {b.mid3}
        <span className="num" data-to={b.people}>
          {b.people}
        </span>
        +{b.after}
      </p>
    </section>
  );
}
