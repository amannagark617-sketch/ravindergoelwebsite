"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portrait } from "@/content";
import { focus } from "@/focus";

export default function Portrait() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".portrait-frame .photo",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ".portrait-frame",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="portrait" ref={root}>
      <div className="portrait-frame">
        {portrait.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="photo" src={portrait.src} alt={portrait.alt} style={{ objectPosition: focus(portrait.src) }} />
        ) : (
          <div className="empty">Portrait photo</div>
        )}
      </div>
      <div>
        <h2>{portrait.heading}</h2>
        <p>{portrait.body}</p>
      </div>
    </section>
  );
}
