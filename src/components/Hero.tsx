"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINKEDIN, person } from "@/content";
import dynamic from "next/dynamic";

const ChairHero = dynamic(() => import("@/components/ChairHero"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One orchestrated moment on load: the name rises into place.
        gsap.from(".hero-name .line-inner", {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.14,
          ease: "power4.out",
        });
        gsap.from(".hero-sub, .hero-links, .hero-cue", {
          opacity: 0,
          y: 14,
          duration: 1,
          delay: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        });

        // On scroll the name leans back, the way a recliner does.
        gsap.to(".hero-name", {
          rotateX: 48,
          yPercent: -6,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=85%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
        gsap.to(".hero-sub, .hero-links, .hero-cue", {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=30%",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <ChairHero />
      <h1 className="hero-name" aria-label={person.name}>
        <span className="line" aria-hidden="true">
          <span className="line-inner">{person.first}</span>
        </span>
        <span className="line" aria-hidden="true">
          <span className="line-inner">{person.last}</span>
        </span>
      </h1>
      <p className="hero-sub">{person.intro}</p>
      <div className="hero-links">
        <Link className="btn btn-solid" href="/journey">
          Read the journey
        </Link>
        <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <div className="hero-cue">Scroll</div>
    </section>
  );
}
