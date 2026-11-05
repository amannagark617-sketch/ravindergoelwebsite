"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = { label: string; text: string; size?: "xl" | "md" };

export default function Vision({ label, text, size = "xl" }: Props) {
  const root = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".word",
          { color: "#c5cbd8" },
          {
            color: "#1b2238",
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className={"vision vision-" + size} ref={root}>
      <div className="label">{label}</div>
      <p aria-label={text}>
        {words.map((w, i) => (
          <span className="word" aria-hidden="true" key={i}>
            {w}
          </span>
        ))}
      </p>
    </section>
  );
}
