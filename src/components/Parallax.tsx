"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { focus } from "@/focus";

type Props = { src: string; alt?: string; position?: string; className?: string; caption?: string };

export default function Parallax({ src, alt = "", position, className = "", caption }: Props) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "img",
          { yPercent: -4, scale: 1.1 },
          {
            yPercent: 4,
            scale: 1.1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <figure className={"plx " + className} ref={root}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" style={{ objectPosition: position ?? focus(src) }} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
