"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Token = string | { n: number; prefix?: string; suffix?: string };

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function CountLine({ tokens }: { tokens: Token[] }) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current?.querySelectorAll<HTMLElement>(".num").forEach((el) => {
          const n = Number(el.dataset.n);
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const state = { v: 0 };
          el.textContent = prefix + "0" + suffix;
          gsap.to(state, {
            v: n,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + fmt(Math.round(state.v)) + suffix;
            },
            scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="count" ref={root}>
      <p>
        {tokens.map((t, i) =>
          typeof t === "string" ? (
            <span key={i}>{t}</span>
          ) : (
            <span
              key={i}
              className="num"
              data-n={t.n}
              data-prefix={t.prefix ?? ""}
              data-suffix={t.suffix ?? ""}
            >
              {(t.prefix ?? "") + fmt(t.n) + (t.suffix ?? "")}
            </span>
          )
        )}
      </p>
    </section>
  );
}
