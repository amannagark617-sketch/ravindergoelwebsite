"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createChair, makeLights, primeChairModel, webglOk, type Chair } from "@/lib/chair";

// Rows of cinema recliners. The camera glides along the rows as the page scrolls past.
export default function CinemaStrip() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!webglOk()) return;
    gsap.registerPlugin(ScrollTrigger);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current!, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      makeLights(scene, renderer);
      const cam = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
      const small = window.innerWidth < 800;
      const cols = small ? 6 : 10;
      const rows = small ? 3 : 4;
      const chairs: Chair[] = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const ch = createChair("lite");
          ch.group.position.set((c - (cols - 1) / 2) * 1.12, r * 0.2, -r * 1.9);
          scene.add(ch.group);
          chairs.push(ch);
        }

      const size = () => {
        const b = wrap.current!.getBoundingClientRect();
        renderer.setSize(b.width, b.height, false);
        cam.aspect = b.width / b.height;
        cam.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(size);
      ro.observe(wrap.current!);
      size();

      const st = { p: still ? 0.5 : 0 };
      const trig = still
        ? null
        : ScrollTrigger.create({
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => (st.p = self.progress),
          });

      let raf = 0;
      let visible = false;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(wrap.current!);
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) return;
        const t = performance.now() / 1000;
        chairs.forEach((c, k) => {
          const col = k % cols;
          const row = Math.floor(k / cols);
          c.setRecline(still ? 0 : 0.5 + 0.5 * Math.sin(t * 1.6 + col * 0.6 + row * 0.5));
        });
        const x = (st.p - 0.5) * (small ? 2.4 : 5);
        cam.position.set(x, 2.1, 6.8 - st.p * 1.2);
        cam.lookAt(x * 0.4, 0.55, -3.2);
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        trig?.kill();
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="cinema-strip" ref={wrap} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
