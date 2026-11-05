"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createChair, makeLights, primeChairModel, webglOk } from "@/lib/chair";

// A 3D recliner beside the name. It reclines as the page is scrolled, like the name leaning back.
export default function ChairHero() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!webglOk()) return;
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
      gsap.registerPlugin(ScrollTrigger);
      const still = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas.current!,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const scene = new THREE.Scene();
      makeLights(scene, renderer);
      const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      cam.position.set(3.4, 2.2, 4.6);
      cam.lookAt(0, 0.65, 0);
      scene.add(new THREE.Group());
      const chair = createChair("hi");
      scene.add(chair.group);

      const st = { recline: still ? 0.7 : 0, mx: 0, my: 0, yaw: -0.5 };
      const size = () => {
        const b = wrap.current!.getBoundingClientRect();
        renderer.setSize(b.width, b.height, false);
        cam.aspect = b.width / b.height;
        cam.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(size);
      ro.observe(wrap.current!);
      size();

      const trig = still
        ? null
        : ScrollTrigger.create({
            trigger: "#top",
            start: "top top",
            end: "+=85%",
            onUpdate: (self) =>
              (st.recline = Math.min(1, self.progress * 1.15)),
          });
      const move = (e: PointerEvent) => {
        st.mx = (e.clientX / window.innerWidth - 0.5) * 2;
        st.my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", move);

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(
        ([e]) => (visible = e.isIntersecting),
      );
      io.observe(wrap.current!);
      const t0 = performance.now();
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const t = (now - t0) / 1000;
        const targetYaw =
          -0.5 + st.mx * 0.5 + st.recline * 1.6 + (still ? 0 : Math.sin(t * 0.5) * 0.12);
        st.yaw += (targetYaw - st.yaw) * 0.06;
        chair.group.rotation.y = st.yaw;
        chair.group.position.y = Math.sin(t * 1.2) * 0.02;
        chair.setRecline(st.recline);
        cam.position.y = 2.2 - st.my * 0.25;
        cam.lookAt(0, 0.65, 0);
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        trig?.kill();
        window.removeEventListener("pointermove", move);
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="hero-chair" ref={wrap} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
