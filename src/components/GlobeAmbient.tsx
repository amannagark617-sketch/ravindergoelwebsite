"use client";

import { useEffect, useRef } from "react";
import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land from "world-atlas/land-110m.json";
import { journeyStops } from "@/content";

const topo = land as unknown as { objects: { land: never } };
const landFeature = feature(topo as never, topo.objects.land);
const graticule = geoGraticule10();
const route = journeyStops.map((s) => [s.lon, s.lat] as [number, number]);

export default function GlobeAmbient() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const g = cv.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const draw = (t: number) => {
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = w * dpr;
      cv.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const lon = 62 + (still ? 0 : (t / 1000) * 7);
      const proj = geoOrthographic()
        .translate([w / 2, h / 2])
        .scale(Math.min(w, h) * 0.47)
        .rotate([-lon, -22])
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
      g.fillStyle = "#d3d8e3";
      g.fill();
      for (let s = 0; s < route.length - 1; s++) {
        const ip = geoInterpolate(route[s], route[s + 1]);
        const pts: [number, number][] = [];
        for (let q = 0; q <= 40; q++) pts.push(ip(q / 40) as [number, number]);
        g.beginPath();
        path({ type: "LineString", coordinates: pts });
        g.strokeStyle = "rgba(155,28,46,0.7)";
        g.lineWidth = 1.6;
        g.stroke();
      }
      const c: [number, number] = [lon, 22];
      route.forEach((p) => {
        if (geoDistance(c, p) > Math.PI / 2) return;
        const xy = proj(p);
        if (!xy) return;
        g.beginPath();
        g.arc(xy[0], xy[1], 3.5, 0, Math.PI * 2);
        g.fillStyle = "#9b1c2e";
        g.fill();
      });
      g.beginPath();
      path({ type: "Sphere" });
      g.strokeStyle = "#c5cbd8";
      g.lineWidth = 1;
      g.stroke();
    };

    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now - start);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      const b = wrap.current!.getBoundingClientRect();
      w = b.width;
      h = b.height;
      draw(performance.now() - start);
    });
    ro.observe(wrap.current!);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrap.current!);
    if (!still) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="hero-globe" ref={wrap} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
