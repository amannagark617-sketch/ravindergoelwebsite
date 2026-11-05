"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.current!.style.transform = `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    update();
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}
