"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { vision } from "@/content";

export default function Vision() {
  const root = useRef<HTMLElement>(null);
  const words = vision.text.split(" ");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".vision .word",
          { color: "#c5cbd8" },
          {
            color: "#1b2238",
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="vision" id="vision" ref={root}>
      <div className="label">{vision.label}</div>
      <p aria-label={vision.text}>
        {words.map((w, i) => (
          <span className="word" aria-hidden="true" key={i}>
            {w}
          </span>
        ))}
      </p>
    </section>
  );
}
