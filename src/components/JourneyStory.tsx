"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/content";

export default function JourneyStory({ images }: { images: (string | null)[] }) {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const n = chapters.length;
  const total = 2 * (n - 1) + 1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        el.classList.add("is-scrubbed");
        const panels = gsap.utils.toArray<HTMLElement>(".story-panel", el);
        const stack = el.querySelector(".story-stack")!;
        const media = gsap.utils.toArray<HTMLElement>(".story-media figure", el);
        const bar = el.querySelector(".story-progress span")!;
        const dots = gsap.utils.toArray<HTMLElement>(".story-nav button", el);

        gsap.set(panels.slice(1), { autoAlpha: 0, y: 28 });
        gsap.set(media.slice(1), { autoAlpha: 0, scale: 1.08 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: `+=${n * 75}%`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const t = self.progress * total;
              const i = Math.max(0, Math.min(n - 1, Math.floor((t + 0.7) / 2)));
              dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
            },
          },
        });
        trigger.current = tl.scrollTrigger!;
        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: total }, 0);
        for (let i = 1; i < n; i++) {
          const t = 2 * i - 1;
          tl.to(panels[i - 1], { autoAlpha: 0, y: -28, duration: 0.6 }, t)
            .to(stack, { yPercent: -(100 / n) * i, duration: 1 }, t)
            .to(panels[i], { autoAlpha: 1, y: 0, duration: 0.6 }, t + 0.4)
            .to(media[i - 1], { autoAlpha: 0, scale: 0.96, duration: 0.7 }, t)
            .to(media[i], { autoAlpha: 1, scale: 1, duration: 0.9 }, t + 0.3);
        }
        tl.to({}, { duration: 1 }, 2 * (n - 1));
        dots[0]?.classList.add("is-on");

        return () => {
          el.classList.remove("is-scrubbed");
          trigger.current = null;
        };
      });
    }, root);
    return () => ctx.revert();
  }, [n, total]);

  const go = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * ((2 * i) / total);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="story" ref={root}>
      <div className="story-pin">
        <div className="story-years" aria-hidden="true">
          <div className="story-stack">
            {chapters.map((c) => (
              <div className="story-year" key={c.title}>
                {c.year}
              </div>
            ))}
          </div>
        </div>
        <div className="story-media" aria-hidden="true">
          {chapters.map((c, i) => (
            <figure key={c.title}>
              {images[i] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[i]!} alt="" loading="lazy" />
              ) : null}
            </figure>
          ))}
        </div>
        <div className="story-panels">
          {chapters.map((c) => (
            <article className="story-panel" key={c.title}>
              {images[chapters.indexOf(c)] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="story-panel-img" src={images[chapters.indexOf(c)]!} alt="" loading="lazy" />
              ) : null}
              <div className="story-panel-year">{c.year}</div>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              {c.facts ? (
                <ul className="story-facts">
                  {c.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              ) : null}
              {c.href ? (
                <Link className="btn" href={c.href}>
                  {c.hrefLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
      <div className="story-nav" role="group" aria-label="Jump to a chapter">
        {chapters.map((c, i) => (
          <button key={c.title} onClick={() => go(i)} aria-label={`${c.year}: ${c.title}`} title={`${c.year}: ${c.title}`} />
        ))}
      </div>
      <div className="story-progress">
        <span />
      </div>
    </section>
  );
}
