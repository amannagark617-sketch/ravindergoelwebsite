import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// A stylised Little Nap recliner built from rounded boxes. Faces +z.
// setRecline(0) is upright with the footrest down; setRecline(1) is fully reclined.

export type Chair = {
  group: THREE.Group;
  setRecline: (r: number) => void;
};

const rb = (w: number, h: number, d: number, r = 0.08) => new RoundedBoxGeometry(w, h, d, 4, r);

let shared: {
  geo: Record<string, THREE.BufferGeometry>;
  leather: THREE.Material;
  frame: THREE.Material;
  shadow: THREE.Material;
  shadowGeo: THREE.BufferGeometry;
} | null = null;

function getShared() {
  if (shared) return shared;
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const g = cv.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, "rgba(27,34,56,0.38)");
  grad.addColorStop(1, "rgba(27,34,56,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(cv);
  shared = {
    geo: {
      base: rb(0.92, 0.16, 0.95, 0.05),
      seat: rb(0.78, 0.24, 0.82, 0.1),
      back: rb(0.78, 1.0, 0.24, 0.12),
      head: rb(0.5, 0.26, 0.16, 0.08),
      arm: rb(0.17, 0.42, 0.9, 0.08),
      foot: rb(0.74, 0.14, 0.56, 0.06),
    },
    leather: new THREE.MeshStandardMaterial({ color: 0x9b1c2e, roughness: 0.5, metalness: 0.04 }),
    frame: new THREE.MeshStandardMaterial({ color: 0x1b2238, roughness: 0.6, metalness: 0.15 }),
    shadow: new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
    shadowGeo: new THREE.PlaneGeometry(2.6, 2.6),
  };
  return shared;
}

export function createChair(): Chair {
  const s = getShared();
  const group = new THREE.Group();

  const shadow = new THREE.Mesh(s.shadowGeo, s.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  group.add(shadow);

  const base = new THREE.Mesh(s.geo.base, s.frame);
  base.position.y = 0.08;
  group.add(base);

  const seat = new THREE.Mesh(s.geo.seat, s.leather);
  seat.position.set(0, 0.28, 0.02);
  group.add(seat);

  for (const x of [-0.5, 0.5]) {
    const arm = new THREE.Mesh(s.geo.arm, s.leather);
    arm.position.set(x, 0.37, 0);
    group.add(arm);
  }

  const back = new THREE.Group();
  back.position.set(0, 0.34, -0.36);
  const backMesh = new THREE.Mesh(s.geo.back, s.leather);
  backMesh.position.set(0, 0.5, 0);
  back.add(backMesh);
  const head = new THREE.Mesh(s.geo.head, s.leather);
  head.position.set(0, 1.05, 0.08);
  back.add(head);
  group.add(back);

  const foot = new THREE.Group();
  foot.position.set(0, 0.36, 0.42);
  const footMesh = new THREE.Mesh(s.geo.foot, s.leather);
  footMesh.position.set(0, 0, 0.2);
  foot.add(footMesh);
  group.add(foot);

  const setRecline = (r: number) => {
    const t = Math.min(Math.max(r, 0), 1);
    back.rotation.x = -t * 0.62;
    foot.rotation.x = (1 - t) * 1.3 - t * 0.1;
  };
  setRecline(0);
  return { group, setRecline };
}

export function makeLights(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dde6, 1.25));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(4, 8, 6);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xdfe6ff, 0.5);
  fill.position.set(-5, 3, -2);
  scene.add(fill);
}

export function webglOk(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
