"use client";

import { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createChair,
  makeLights,
  primeChairModel,
  webglOk,
  type Chair,
} from "@/lib/chair";
import { recliner } from "@/content";

const COLS = 10;
const S = recliner.length;
const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Slot = { x: number; y: number; z: number; s: number };
const grid = (i: number): Slot => ({
  x: ((i % COLS) - 4.5) * 1.3,
  y: Math.floor(i / COLS) * 0.22,
  z: -Math.floor(i / COLS) * 1.7,
  s: 1,
});
function layout(stage: number, i: number): Slot {
  const hidden: Slot = { ...grid(i), s: 0 };
  if (stage <= 2) return i === 0 ? { x: 0, y: 0, z: 0, s: 1 } : hidden;
  if (stage === 3)
    return i < 2 ? { x: i ? 0.85 : -0.85, y: 0, z: 0, s: 1 } : hidden;
  if (stage === 4)
    return i < 12
      ? { x: (i - 5.5) * 1.3, y: 0, z: -Math.abs(i - 5.5) * 0.12, s: 1 }
      : hidden;
  return grid(i);
}
const CAM: { p: [number, number, number]; t: [number, number, number] }[] = [
  { p: [3.2, 1.9, 4.4], t: [0, 0.6, 0] },
  { p: [-3.6, 1.5, 3.4], t: [0, 0.6, 0] },
  { p: [4.2, 1.3, 1.2], t: [0, 0.6, 0] },
  { p: [0, 1.7, 5.6], t: [0, 0.55, 0] },
  { p: [0, 2.4, 10.8], t: [0, 0.5, -0.5] },
  { p: [0, 6.2, 8.6], t: [0, 0.4, -4.8] },
];
const REC = [0, 0.85, 0.85, 0.85, 0.7, 0.5];

export default function ReclinerJourney() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const trig = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !webglOk()) return;
    const el = root.current!;
    el.classList.add("is-scrubbed");
    let alive = true;
    let off = () => {};
    primeChairModel().then(() => {
      if (alive) off = setup();
    });
    return () => {
      alive = false;
      off();
    };
    function setup() {
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.current!,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      makeLights(scene, renderer);
      const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
      const N = window.innerWidth < 800 ? 30 : 70;
      const chairs: Chair[] = [];
      for (let i = 0; i < N; i++) {
        const c = createChair();
        scene.add(c.group);
        chairs.push(c);
      }

      const state = { P: 0, mx: 0, my: 0, active: 0, mxs: 0, mys: 0 };
      const size = () => {
        const b = wrap.current!.getBoundingClientRect();
        renderer.setSize(b.width, b.height, false);
        cam.aspect = b.width / b.height;
        cam.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(size);
      ro.observe(wrap.current!);
      size();

      const ctx = gsap.context(() => {
        trig.current = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: `+=${S * 85}%`,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 10,
          onUpdate: (self) => {
            state.P = self.progress;
            const a = Math.round(Math.min(self.progress, 1) * (S - 1));
            if (a !== state.active) {
              state.active = a;
              setActive(a);
            }
          },
        });
        // The chairs load after the page, so the pin is created late: re-measure everything below it.
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, el);

      const move = (e: PointerEvent) => {
        state.mx = (e.clientX / window.innerWidth - 0.5) * 2;
        state.my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", move);

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(
        ([e]) => (visible = e.isIntersecting),
      );
      io.observe(el);
      const look = new THREE.Vector3();
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        const u = Math.min(state.P / 0.94, 1) * (S - 1);
        const i = Math.min(Math.floor(u), S - 1);
        const j = Math.min(i + 1, S - 1);
        const e = smooth(Math.min(Math.max((u - i - 0.25) / 0.5, 0), 1));
        const waveAmt = i >= 5 ? 1 : i === 4 ? e : 0;
        const baseRec = lerp(REC[i], REC[j], e);

        for (let k = 0; k < N; k++) {
          const a = layout(i, k);
          const b = layout(j, k);
          const c = chairs[k].group;
          c.position.set(
            lerp(a.x, b.x, e),
            lerp(a.y, b.y, e),
            lerp(a.z, b.z, e),
          );
          const sc = lerp(a.s, b.s, e);
          c.scale.setScalar(Math.max(sc, 0.0001));
          c.visible = sc > 0.01;
          const wave =
            0.5 +
            0.5 *
              Math.sin(
                state.P * 26 + (k % COLS) * 0.7 + Math.floor(k / COLS) * 0.55,
              );
          chairs[k].setRecline(baseRec * (1 - waveAmt) + wave * waveAmt);
          c.rotation.y = i <= 2 ? lerp(0, 0, 0) : 0;
        }
        state.mxs += (state.mx - state.mxs) * 0.05;
        state.mys += (state.my - state.mys) * 0.05;
        // Single chairs sit in the right half on wide screens so the text never covers them.
        const side = cam.aspect > 1.1 ? 1.3 : 0;
        const off = lerp(i <= 3 ? side : 0, j <= 3 ? side : 0, e);
        cam.position.set(
          lerp(CAM[i].p[0], CAM[j].p[0], e) + state.mxs * 0.5 - off,
          lerp(CAM[i].p[1], CAM[j].p[1], e) - state.mys * 0.25,
          lerp(CAM[i].p[2], CAM[j].p[2], e),
        );
        look.set(
          lerp(CAM[i].t[0], CAM[j].t[0], e) - off,
          lerp(CAM[i].t[1], CAM[j].t[1], e),
          lerp(CAM[i].t[2], CAM[j].t[2], e),
        );
        cam.lookAt(look);
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", move);
        ctx.revert();
        renderer.dispose();
        el.classList.remove("is-scrubbed");
      };
    }
  }, []);

  const go = (i: number) => {
    const s = trig.current;
    if (!s) return;
    const y = s.start + (s.end - s.start) * (0.94 * (i / (S - 1)));
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.8 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      className="rj"
      ref={root}
      aria-label="The Little Nap journey"
    >
      <div className="rj-stage" ref={wrap}>
        <canvas ref={canvas} aria-hidden="true" />
      </div>
      <ol className="rj-steps">
        {recliner.map((s, i) => (
          <li key={s.title} className={i === active ? "is-active" : ""}>
            <div className="rj-year">{s.year}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="rj-nav" role="group" aria-label="Jump to a moment">
        {recliner.map((s, i) => (
          <button
            key={s.title}
            onClick={() => go(i)}
            className={i === active ? "is-on" : ""}
            aria-label={`${s.year}: ${s.title}`}
          />
        ))}
      </div>
    </section>
  );
}
