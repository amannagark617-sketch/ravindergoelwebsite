"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { webglOk } from "@/lib/chair";

// The vision, flown as a journey: Little Nap's home in Manesar, an Indian legacy across 18 showrooms, then the world.
const BEATS = [
  { line: "To redefine the future of comfort", ring: "Little Nap" },
  { line: "and create an Indian legacy", ring: "India" },
  { line: "that reaches the world.", ring: "The world" },
];

type Pt = [number, number]; // [lat, lon]
const MANESAR: Pt = [28.35, 76.94];
const MICHIGAN: Pt = [41.9, -83.4];
const THAILAND: Pt = [13.36, 101.0];
const MALAYSIA: Pt = [3.14, 101.69];
const SHOWROOMS: Pt[] = [
  [27.18, 78.01], [23.03, 72.58], [12.97, 77.59], [23.26, 77.41], [13.08, 80.27], [11.02, 76.96],
  [28.48, 77.13], [17.38, 78.48], [22.72, 75.86], [26.91, 75.79], [10.96, 78.08], [28.65, 77.15],
  [30.9, 75.86], [19.08, 72.88], [29.39, 76.97], [18.52, 73.86], [21.25, 81.63], [20.37, 72.91],
];

const LABELS = [
  { text: "Manesar, Haryana", at: MANESAR, from: 0.12, to: 0.34 },
  { text: "18 showrooms", at: [20.5, 79] as Pt, from: 0.36, to: 0.66 },
  { text: "Seating Spectrum, Malaysia", at: MALAYSIA, from: 0.7, to: 1.1 },
  { text: "La-Z-Boy Asia, Thailand", at: THAILAND, from: 0.74, to: 1.1 },
  { text: "La-Z-Boy, Michigan", at: MICHIGAN, from: 0.84, to: 1.1 },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const dir = ([lat, lon]: Pt, r = 1) => {
  const φ = (lat * Math.PI) / 180;
  const λ = (lon * Math.PI) / 180;
  return new THREE.Vector3(r * Math.cos(φ) * Math.cos(λ), r * Math.sin(φ), -r * Math.cos(φ) * Math.sin(λ));
};

function arc(a: Pt, b: Pt, lift = 0.22) {
  const A = dir(a);
  const B = dir(b);
  const ang = A.angleTo(B);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const v = A.clone().multiplyScalar(Math.sin((1 - t) * ang)).add(B.clone().multiplyScalar(Math.sin(t * ang))).divideScalar(Math.sin(ang) || 1);
    pts.push(v.normalize().multiplyScalar(1.004 + Math.sin(Math.PI * t) * lift * Math.min(1, ang)));
  }
  return new THREE.CatmullRomCurve3(pts);
}

export default function VisionScene() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current!;
    const st = { P: still ? 1 : 0, lon: -30, lat: 14, dist: 9 };
    let trig: ScrollTrigger | null = null;

    if (!still) {
      setLive(true);
      el.classList.add("is-scrubbed");
      trig = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=400%",
        pin: true,
        anticipatePin: 1,
        refreshPriority: 10,
        onUpdate: (self) => {
          st.P = self.progress;
          setActive(Math.min(2, Math.floor(self.progress * 3)));
        },
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }

    let stop = () => {};
    if (webglOk()) {
      const small = window.innerWidth < 800;
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current!, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 60);

      const light = new THREE.DirectionalLight(0xffffff, 1.6);
      scene.add(light, new THREE.AmbientLight(0xffffff, 1.9));

      // Real satellite imagery (NASA Blue Marble), with relief and an ocean sheen.
      const mat = new THREE.MeshPhongMaterial({ color: 0x24508f, specular: new THREE.Color(0x3a5a96), shininess: 70, bumpScale: 0.9 });
      const tl = new THREE.TextureLoader();
      const load = (u: string, srgb = false) => {
        const t = tl.load(u, () => (mat.needsUpdate = true));
        t.anisotropy = 8;
        if (srgb) t.colorSpace = THREE.SRGBColorSpace;
        return t;
      };
      tl.load(small ? "/textures/earth-2k.jpg" : "/textures/earth-4k.jpg", (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        mat.map = t;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
      });
      mat.bumpMap = load("/textures/earth-bump.png");
      mat.specularMap = load("/textures/earth-spec.png");
      const earth = new THREE.Mesh(new THREE.SphereGeometry(1, small ? 72 : 128, small ? 48 : 96), mat);
      scene.add(earth);

      // soft atmosphere, blue to garnet at the rim
      const air = new THREE.Mesh(
        new THREE.SphereGeometry(1.12, 64, 48),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
          vertexShader: "varying vec3 n; void main(){ n = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} ",
          fragmentShader:
            "varying vec3 n; void main(){ float d = smoothstep(0.0, 0.45, -dot(n, vec3(0.0,0.0,1.0))); float a = pow(d, 2.2) * 0.5; vec3 c = mix(vec3(0.55,0.72,1.0), vec3(0.45,0.62,1.0), d); gl_FragColor = vec4(c, a); }",
        }),
      );
      scene.add(air);

      // orbit rings with satellites
      const sats: { m: THREE.Mesh; g: THREE.Group; r: number; sp: number; ph: number }[] = [];
      [
        { r: 1.5, tilt: 0.5, yaw: 0.2, sp: 0.25 },
        { r: 1.85, tilt: -0.9, yaw: 1.1, sp: -0.17 },
      ].forEach((o, k) => {
        const g = new THREE.Group();
        g.rotation.set(o.tilt, o.yaw, 0);
        const ring = new THREE.Mesh(new THREE.RingGeometry(o.r - 0.0035, o.r + 0.0035, 160), new THREE.MeshBasicMaterial({ color: 0x1b2238, transparent: true, opacity: 0.22, side: THREE.DoubleSide }));
        ring.rotation.x = Math.PI / 2;
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 12), new THREE.MeshBasicMaterial({ color: 0xa81d36 }));
        g.add(ring, m);
        scene.add(g);
        sats.push({ m, g, r: o.r, sp: o.sp, ph: k * 2 });
      });

      const garnet = new THREE.MeshBasicMaterial({ color: 0xa81d36 });
      const tube = (c: THREE.CatmullRomCurve3, r = 0.0045) => {
        const geo = new THREE.TubeGeometry(c, 64, r, 6, false);
        const mesh = new THREE.Mesh(geo, garnet);
        scene.add(mesh);
        const per = 6 * 6;
        const total = geo.index!.count;
        const dot = new THREE.Mesh(new THREE.SphereGeometry(r * 2.6, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        scene.add(dot);
        return {
          set(k: number) {
            const n = Math.floor((clamp(k) * total) / per) * per;
            geo.setDrawRange(0, n);
            mesh.visible = k > 0.001;
            dot.visible = k > 0.001 && k < 0.999;
            dot.position.copy(c.getPoint(clamp(k)));
          },
        };
      };

      const pins: THREE.Mesh[] = [];
      const pin = (p: Pt, size = 0.016) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(size, 14, 10), garnet);
        m.position.copy(dir(p, 1.006));
        scene.add(m);
        pins.push(m);
        return m;
      };
      const pulses: { m: THREE.Mesh; ph: number }[] = [];
      const pulse = (p: Pt, ph = 0) => {
        const m = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.026, 40), new THREE.MeshBasicMaterial({ color: 0xa81d36, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
        m.position.copy(dir(p, 1.008));
        m.lookAt(m.position.clone().multiplyScalar(2));
        scene.add(m);
        pulses.push({ m, ph });
      };

      const home = pin(MANESAR, 0.022);
      pulse(MANESAR, 0);
      pulse(MANESAR, 0.5);
      const room = SHOWROOMS.map((p) => {
        const m = pin(p, 0.011);
        m.scale.setScalar(0);
        return { m, arc: tube(arc(MANESAR, p, 0.09), 0.0028) };
      });
      const far = [
        { a: tube(arc(MANESAR, THAILAND, 0.16)), p: THAILAND, from: 0.68, to: 0.8 },
        { a: tube(arc(MANESAR, MALAYSIA, 0.16)), p: MALAYSIA, from: 0.7, to: 0.82 },
        { a: tube(arc(MICHIGAN, THAILAND, 0.34)), p: MICHIGAN, from: 0.78, to: 0.92 },
        { a: tube(arc(MANESAR, MICHIGAN, 0.3)), p: MICHIGAN, from: 0.82, to: 0.96 },
      ];
      [THAILAND, MALAYSIA, MICHIGAN].forEach((p, i) => {
        const m = pin(p, 0.02);
        m.visible = false;
        far.push({ a: { set() {} }, p, from: 0.7 + i * 0.05, to: 1 });
        (m as THREE.Mesh & { reveal?: number }).reveal = 0.7 + i * 0.05;
      });
      void home;

      const size = () => {
        const b = wrap.current!.getBoundingClientRect();
        renderer.setSize(b.width, b.height, false);
        cam.aspect = b.width / b.height;
        cam.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(size);
      ro.observe(wrap.current!);
      size();

      const target = () => {
        const P = st.P;
        const a = smooth(clamp(P / 0.26));
        const c = smooth(clamp((P - 0.66) / 0.32));
        let lon = -30 + (77 + 30) * a;
        let lat = 14 + 12 * a;
        let dist = 9 - (9 - 3.7) * a;
        dist += smooth(clamp((P - 0.34) / 0.3)) * 0.55;
        lon += c * (-35 - 77); // swing from India across the Atlantic to Michigan
        lat += c * (24 - 26);
        dist += c * 1.9;
        return { lon, lat, dist };
      };

      let raf = 0;
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);
      const t0 = performance.now();
      let last = t0;
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        const t = (now - t0) / 1000;
        const T = target();
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        const k = still ? 1 : 1 - Math.exp(-dt * 4.5);
        st.lon += (T.lon - st.lon) * k;
        st.lat += (T.lat - st.lat) * k;
        st.dist += (T.dist - st.dist) * k;
        const fit = cam.aspect < 1 ? 1 + (1 / cam.aspect - 1) * 1.0 : 1;
        const p = dir([st.lat, st.lon], st.dist * fit);
        cam.position.copy(p);
        cam.lookAt(0, 0, 0);
        light.position.copy(p).add(new THREE.Vector3(2, 3, 1));

        const P = st.P;
        const all = clamp((P - 0.34) / 0.26);
        room.forEach((r, i) => {
          const ki = clamp(all * 1.7 - (0.7 * i) / (room.length - 1));
          r.arc.set(ki);
          r.m.scale.setScalar(ki > 0.95 ? 1 + 0.18 * Math.sin(t * 3 + i) : 0);
        });
        far.forEach((f) => f.a.set(clamp((P - f.from) / (f.to - f.from))));
        pins.forEach((m) => {
          const rv = (m as THREE.Mesh & { reveal?: number }).reveal;
          if (rv !== undefined) m.visible = P > rv;
        });
        pulses.forEach(({ m, ph }) => {
          const u = (t * 0.45 + ph) % 1;
          m.scale.setScalar(1 + u * 5);
          (m.material as THREE.MeshBasicMaterial).opacity = (1 - u) * 0.8;
        });
        sats.forEach((s) => {
          const ang = t * s.sp + s.ph;
          s.m.position.set(Math.cos(ang) * s.r, 0, Math.sin(ang) * s.r);
        });
        earth.rotation.y = 0;
        renderer.render(scene, cam);

        // place the labels
        LABELS.forEach((l, i) => {
          const node = tags.current[i];
          if (!node) return;
          const v = dir(l.at, 1.03);
          const facing = v.clone().normalize().dot(p.clone().normalize());
          const sc = v.clone().project(cam);
          const vis = clamp((P - l.from) / 0.04) * clamp((l.to - P) / 0.04) * clamp((facing - 0.18) / 0.15);
          const b = wrap.current!.getBoundingClientRect();
          node.style.opacity = `${still ? clamp((facing - 0.18) / 0.15) : vis}`;
          node.style.transform = `translate(${(sc.x * 0.5 + 0.5) * b.width}px, ${(-sc.y * 0.5 + 0.5) * b.height}px) translate(14px, -50%)`;
        });
      };
      raf = requestAnimationFrame(loop);
      stop = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        renderer.dispose();
      };
    }

    return () => {
      stop();
      trig?.kill();
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
        <canvas ref={canvas} aria-hidden="true" />
        <div className="vs-tags" aria-hidden="true">
          {LABELS.map((l, i) => (
            <span key={l.text} className="vs-tag" ref={(n) => { tags.current[i] = n; }}>
              {l.text}
            </span>
          ))}
        </div>
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
