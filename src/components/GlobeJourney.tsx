"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land from "world-atlas/land-110m.json";
import type { Stop } from "@/content";
import { focus } from "@/focus";

const topo = land as unknown as { objects: { land: never } };
const landFeature = feature(topo as never, topo.objects.land);
const graticule = geoGraticule10();
const HOLD = 0.92;
const DWELL = 0.3;

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function planePath(g: CanvasRenderingContext2D) {
  const p: [number, number][] = [
    [0, -12], [2, -5], [11, 1], [11, 3.5], [2, 1.5], [1.6, 8], [5, 10], [5, 11.5], [0, 10.5],
    [-5, 11.5], [-5, 10], [-1.6, 8], [-2, 1.5], [-11, 3.5], [-11, 1], [-2, -5],
  ];
  g.beginPath();
  p.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
}

export default function GlobeJourney({ stops, ariaLabel }: { stops: Stop[]; ariaLabel: string }) {
  const n = stops.length;
  const pt = (i: number): [number, number] => [stops[i].lon, stops[i].lat];
  const frame = (P: number) => {
    const u = Math.min(P / HOLD, 1) * (n - 1);
    const i = Math.min(Math.floor(u), n - 1);
    const f = u - i;
    const tr = i >= n - 1 ? 0 : ease(Math.max(0, (f - DWELL) / (1 - DWELL)));
    const j = Math.min(i + 1, n - 1);
    const center = i === j ? pt(i) : geoInterpolate(pt(i), pt(j))(tr);
    const k = (stops[i].k + (stops[j].k - stops[i].k) * tr) * (1 - 0.3 * Math.sin(Math.PI * tr));
    const active = i >= n - 1 ? n - 1 : tr > 0.5 ? j : i;
    return { i, tr, center, k, active };
  };


  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const last = useRef({ P: 0, still: true, w: 0, h: 0, ripple: 1, active: 0 });
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cv = canvas.current!;
    const g = cv.getContext("2d")!;

    const draw = () => {
      const { P, still, w, h } = last.current;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = w * dpr;
      cv.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);

      const fr = frame(P);
      const center: [number, number] = still ? [40, 22] : fr.center;
      const k = still ? 0.95 : fr.k;
      const r = Math.min(w, h) * 0.46 * k;
      const proj = geoOrthographic()
        .translate([w / 2, h / 2])
        .scale(r)
        .rotate([-center[0], -center[1]])
        .clipAngle(90);
      const path = geoPath(proj, g);

      g.beginPath();
      path({ type: "Sphere" });
      g.fillStyle = "#f3f4f7";
      g.fill();

      g.beginPath();
      path(graticule);
      g.strokeStyle = "#d9dde6";
      g.lineWidth = 0.6;
      g.stroke();

      g.beginPath();
      path(landFeature as never);
      g.fillStyle = "#c5cbd8";
      g.fill();

      g.beginPath();
      path({ type: "Sphere" });
      g.strokeStyle = "#1b2238";
      g.lineWidth = 1.2;
      g.stroke();

      // Planned route, dashed
      g.setLineDash([2, 7]);
      for (let s = 0; s < n - 1; s++) {
        const full: [number, number][] = [];
        const ip = geoInterpolate(pt(s), pt(s + 1));
        for (let q = 0; q <= 60; q++) full.push(ip(q / 60) as [number, number]);
        g.beginPath();
        path({ type: "LineString", coordinates: full });
        g.strokeStyle = "#8a93a8";
        g.lineWidth = 1.5;
        g.stroke();
      }
      g.setLineDash([]);

      // Route arcs
      for (let s = 0; s < n - 1; s++) {
        const frac = still ? 1 : s < fr.i ? 1 : s === fr.i ? fr.tr : 0;
        if (frac <= 0) continue;
        const interp = geoInterpolate(pt(s), pt(s + 1));
        const coords: [number, number][] = [];
        const steps = 60;
        for (let q = 0; q <= steps * frac; q++) coords.push(interp(q / steps) as [number, number]);
        g.beginPath();
        path({ type: "LineString", coordinates: coords });
        g.strokeStyle = "#9b1c2e";
        g.lineWidth = 2.5;
        g.lineCap = "round";
        g.stroke();
      }

      // Aeroplane flying the active arc
      if (!still && fr.i < n - 1 && fr.tr > 0 && fr.tr < 1) {
        const ip = geoInterpolate(pt(fr.i), pt(fr.i + 1));
        const head = ip(fr.tr) as [number, number];
        const ahead = ip(Math.min(fr.tr + 0.012, 1)) as [number, number];
        const hp = proj(head);
        const ap = proj(ahead);
        if (hp && ap && geoDistance(center, head) < Math.PI / 2) {
          const ang = Math.atan2(ap[1] - hp[1], ap[0] - hp[0]) + Math.PI / 2;
          const sc = 1.25 + 0.9 * Math.sin(Math.PI * fr.tr);
          // shadow on the ground
          g.save();
          g.translate(hp[0] + 6, hp[1] + 14 * sc);
          g.rotate(ang);
          g.scale(sc * 0.8, sc * 0.8);
          g.fillStyle = "rgba(27,34,56,0.18)";
          planePath(g);
          g.fill();
          g.restore();
          g.save();
          g.translate(hp[0], hp[1]);
          g.rotate(ang);
          g.scale(sc, sc);
          planePath(g);
          g.fillStyle = "#9b1c2e";
          g.fill();
          g.lineWidth = 1.6 / sc;
          g.strokeStyle = "#ffffff";
          g.stroke();
          g.restore();
        }
      }

      // Stops
      g.font = "600 14px 'Bricolage Grotesque Variable', Arial, sans-serif";
      g.textBaseline = "middle";
      for (let s = 0; s < n; s++) {
        if (!still && s > fr.i + 1) continue;
        if (geoDistance(center, pt(s)) > Math.PI / 2 - 0.02) continue;
        const xy = proj(pt(s));
        if (!xy) continue;
        const on = s === (still ? n - 1 : fr.active);
        g.beginPath();
        g.arc(xy[0], xy[1], on ? 7 : 4.5, 0, Math.PI * 2);
        g.fillStyle = "#9b1c2e";
        g.fill();
        if (on && !still && last.current.ripple < 1) {
          const rp = last.current.ripple;
          g.beginPath();
          g.arc(xy[0], xy[1], 13 + 46 * rp, 0, Math.PI * 2);
          g.strokeStyle = `rgba(155,28,46,${0.6 * (1 - rp)})`;
          g.lineWidth = 2;
          g.stroke();
        }
        if (on) {
          g.beginPath();
          g.arc(xy[0], xy[1], 13, 0, Math.PI * 2);
          g.strokeStyle = "#9b1c2e";
          g.lineWidth = 1.5;
          g.stroke();
        }
        const act = proj(pt(still ? n - 1 : fr.active));
        if (!on && act && Math.hypot(xy[0] - act[0], xy[1] - act[1]) < 110) continue;
        const label = stops[s].label;
        g.lineWidth = 4;
        g.strokeStyle = "#ffffff";
        g.strokeText(label, xy[0] + 16, xy[1] - 14);
        g.fillStyle = "#1b2238";
        g.fillText(label, xy[0] + 16, xy[1] - 14);
      }
    };

    const ro = new ResizeObserver(() => {
      const b = wrap.current!.getBoundingClientRect();
      last.current.w = b.width;
      last.current.h = b.height;
      draw();
    });
    ro.observe(wrap.current!);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        el.classList.add("is-scrubbed");
        last.current.still = false;
        trigger.current = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: `+=${n * 90}%`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            last.current.P = self.progress;
            const act = frame(self.progress).active;
            if (act !== last.current.active) {
              last.current.active = act;
              last.current.ripple = 0;
              const t0 = performance.now();
              const loop = (now: number) => {
                last.current.ripple = Math.min((now - t0) / 1400, 1);
                draw();
                if (last.current.ripple < 1) requestAnimationFrame(loop);
              };
              requestAnimationFrame(loop);
            }
            setActive(act);
            draw();
          },
        });
        const b = wrap.current!.getBoundingClientRect();
        last.current.w = b.width;
        last.current.h = b.height;
        draw();
        return () => {
          el.classList.remove("is-scrubbed");
          last.current.still = true;
          trigger.current = null;
          draw();
        };
      });
    }, root);

    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  const go = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (HOLD * (i / (n - 1)));
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.8 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="globe" ref={root} aria-label={ariaLabel}>
      <div className="globe-canvas" ref={wrap}>
        <div className="globe-year" aria-hidden="true">
          {stops.map((s, i) =>
            s.year ? (
              <span key={s.place} className={i === active ? "is-active" : ""}>
                {s.year}
              </span>
            ) : null
          )}
        </div>
        <canvas ref={canvas} role="img" aria-label={ariaLabel} />
      </div>
      <div className="globe-side">
        <ol className="globe-steps">
          {stops.map((s, i) => (
            <li key={s.place} className={i === active ? "is-active" : ""}>
              {s.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="globe-photo" src={s.img} alt="" loading="lazy" style={{ objectPosition: focus(s.img) }} />
              ) : null}
              <div className="globe-place">{s.year ? `${s.year}, ${s.place}` : s.place}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="globe-nav" role="group" aria-label="Jump to a stop">
          {stops.map((s, i) => (
            <button key={s.place} onClick={() => go(i)} className={i === active ? "is-on" : ""} aria-label={s.place} title={s.place} />
          ))}
        </div>
      </div>
    </section>
  );
}
