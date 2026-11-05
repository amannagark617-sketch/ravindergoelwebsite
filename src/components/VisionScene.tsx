"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createChair, makeLights, primeChairModel, webglOk } from "@/lib/chair";

// Little Nap's vision, drawn as it reads: comfort, then an Indian legacy, then the world.
const BEATS = [
  { line: "To redefine the future of comfort", ring: "Little Nap" },
  { line: "and create an Indian legacy", ring: "India" },
  { line: "that reaches the world.", ring: "The world" },
];
const R = [0.2, 0.31, 0.42];

export default function VisionScene() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const rings = useRef<(SVGCircleElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;
    setLive(true);
    const el = root.current!;
    el.classList.add("is-scrubbed");
    const st = { P: 0, yaw: 0 };

    let alive = true;
    let stop = () => {};
    const draw = () => {
      rings.current.forEach((c, i) => {
        if (!c) return;
        const len = c.getTotalLength();
        const k = Math.min(Math.max(st.P * 3 - i * 0.9, 0), 1);
        c.style.strokeDasharray = `${len}`;
        c.style.strokeDashoffset = `${len * (1 - k)}`;
        c.style.opacity = `${0.25 + 0.75 * k}`;
      });
    };
    draw();

    const trig = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=300%",
      pin: true,
      anticipatePin: 1,
      refreshPriority: 10,
      onUpdate: (self) => {
        st.P = self.progress;
        setActive(Math.min(2, Math.floor(self.progress * 3)));
        draw();
      },
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    // Chair in the middle of the rings (skipped without WebGL)
    primeChairModel().then(() => {
      if (!alive || !webglOk()) return;
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current!, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      makeLights(scene, renderer);
      const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      const chair = createChair("hi");
      scene.add(chair.group);
      const size = () => {
        const b = wrap.current!.getBoundingClientRect();
        renderer.setSize(b.width, b.height, false);
        cam.aspect = b.width / b.height;
        cam.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(size);
      ro.observe(wrap.current!);
      size();
      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        st.yaw += (st.P * Math.PI * 1.6 - 0.5 - st.yaw) * 0.08;
        chair.group.rotation.y = st.yaw;
        const zoom = (5.2 + st.P * 2.4) * 1.3 * (cam.aspect < 1 ? 1.8 : 1);
        cam.position.set(0, 1.5 + st.P * 0.6, zoom);
        cam.lookAt(0, 0.6, 0);
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(loop);
      stop = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        renderer.dispose();
      };
    });

    return () => {
      alive = false;
      stop();
      trig.kill();
      el.classList.remove("is-scrubbed");
    };
  }, []);

  const go = (i: number) => {
    const t = ScrollTrigger.getAll().find((x) => x.trigger === root.current);
    if (!t) return;
    const y = t.start + (t.end - t.start) * ((i + 0.5) / 3);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="vs" ref={root} aria-label="Little Nap's vision">
      <div className="vs-stage" ref={wrap}>
        <svg className="vs-rings" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {R.map((r, i) => (
            <circle key={i} ref={(n) => { rings.current[i] = n; }} cx="0" cy="0" r={r * 100} className="vs-ring" />
          ))}
          {R.map((r, i) => (
            <text key={i} x="0" y={-r * 100 - 1.6} textAnchor="middle" className={"vs-ring-label" + (active >= i ? " is-on" : "")}>
              {BEATS[i].ring}
            </text>
          ))}
          {live
            ? R.map((r, i) => (
                <circle key={"p" + i} r="0.9" className="vs-dot">
                  <animateMotion dur={`${14 + i * 9}s`} repeatCount="indefinite" path={`M ${r * 100} 0 A ${r * 100} ${r * 100} 0 1 ${i % 2} ${-r * 100} 0 A ${r * 100} ${r * 100} 0 1 ${i % 2} ${r * 100} 0`} />
                </circle>
              ))
            : null}
          {live
            ? R.map((r, i) => (
                <circle key={"w" + i} cx="0" cy="0" r={r * 100} className={"vs-wave" + (active >= i ? " is-on" : "")} style={{ animationDelay: `${i * 1.3}s` }} />
              ))
            : null}
        </svg>
        <canvas ref={canvas} aria-hidden="true" />
      </div>
      <ol className="vs-lines">
        {BEATS.map((b, i) => (
          <li key={b.line} className={!live || i === active ? "is-active" : ""}>
            {b.line}
          </li>
        ))}
      </ol>
      <div className="vs-nav" role="group" aria-label="Jump to a part of the vision">
        {BEATS.map((b, i) => (
          <button key={b.line} onClick={() => go(i)} className={i === active ? "is-on" : ""} aria-label={b.ring} />
        ))}
      </div>
    </section>
  );
}
