import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeGeometries, toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/*
 The real Little Nap chair loads from /public/models/recliner.glb (full detail) and recliner-lite.glb (light, for many chairs).
 If they fail to load, a procedural chair is used instead.
*/

export type Chair = { group: THREE.Group; setRecline: (r: number) => void };

const GARNET = 0x9b1c2e;
const INK = 0x1b2238;

type Shared = {
  leather: THREE.MeshPhysicalMaterial;
  frame: THREE.MeshStandardMaterial;
  chrome: THREE.MeshStandardMaterial;
  shadow: THREE.MeshBasicMaterial;
  shadowGeo: THREE.PlaneGeometry;
  statLeather: THREE.BufferGeometry;
  statInk: THREE.BufferGeometry;
  back: THREE.BufferGeometry;
  foot: THREE.BufferGeometry;
  mech: THREE.BufferGeometry;
};
let shared: Shared | null = null;
type Model = { hi: THREE.BufferGeometry; lite: THREE.BufferGeometry; leather: THREE.MeshPhysicalMaterial };
let model: Model | null = null;
let primed: Promise<void> | null = null;

/** Extrude a side profile drawn in (z, y) across the chair's width, centred on x = 0. */
function side(shape: THREE.Shape, width: number, bevel = 0.04): THREE.BufferGeometry {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: width - bevel * 2,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 4,
    curveSegments: 14,
  });
  g.rotateY(-Math.PI / 2);
  g.computeBoundingBox();
  const b = g.boundingBox!;
  g.translate(-(b.min.x + b.max.x) / 2, 0, 0);
  return g;
}

function rr(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
}

function at(g: THREE.BufferGeometry, x: number, y: number, z: number) {
  g.translate(x, y, z);
  return g;
}

function leatherTexture(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 256;
  const g = cv.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 255 : 0},0.05)`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 3, 2 + Math.random() * 3);
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  return t;
}

function getShared(): Shared {
  if (shared) return shared;

  // Seat: dished, rolled cushion
  const seatS = new THREE.Shape();
  seatS.moveTo(-0.4, 0);
  seatS.lineTo(0.44, 0);
  seatS.quadraticCurveTo(0.52, 0.02, 0.5, 0.12);
  seatS.quadraticCurveTo(0.46, 0.2, 0.3, 0.2);
  seatS.quadraticCurveTo(0, 0.14, -0.2, 0.19);
  seatS.quadraticCurveTo(-0.4, 0.22, -0.42, 0.1);
  seatS.lineTo(-0.4, 0);
  const seat = at(side(seatS, 0.7, 0.05), 0, 0.2, 0);

  // Arms: tall at the back, rolling down toward the front
  const armS = new THREE.Shape();
  armS.moveTo(-0.46, 0);
  armS.lineTo(0.5, 0);
  armS.lineTo(0.5, 0.26);
  armS.quadraticCurveTo(0.5, 0.36, 0.38, 0.36);
  armS.lineTo(-0.1, 0.38);
  armS.quadraticCurveTo(-0.46, 0.4, -0.46, 0.3);
  armS.lineTo(-0.46, 0);
  const armL = at(side(armS, 0.16, 0.035), -0.5, 0.18, 0);
  const armR = at(side(armS, 0.16, 0.035), 0.5, 0.18, 0);

  // Base plinth + wooden feet (ink)
  const base = at(side(rr(0.98, 0.12, 0.05), 0.92, 0.04), 0, 0.12, 0.02);
  const feet: THREE.BufferGeometry[] = [];
  for (const x of [-0.42, 0.42])
    for (const z of [-0.38, 0.4]) feet.push(at(new THREE.CylinderGeometry(0.04, 0.05, 0.08, 10), x, 0.04, z));

  // Back: curved slab with a reclined lumbar and rolled shoulders, pivot at hinge
  const backS = new THREE.Shape();
  backS.moveTo(-0.12, 0);
  backS.lineTo(0.12, 0);
  backS.quadraticCurveTo(0.16, 0.3, 0.12, 0.62);
  backS.quadraticCurveTo(0.14, 0.92, 0.1, 1.12);
  backS.quadraticCurveTo(0.0, 1.2, -0.1, 1.12);
  backS.quadraticCurveTo(-0.18, 0.9, -0.14, 0.6);
  backS.quadraticCurveTo(-0.16, 0.3, -0.12, 0);
  const backG = side(backS, 0.74, 0.06);
  const wingL = at(side(rr(0.06, 0.8, 0.03), 0.1, 0.03), -0.42, 0.7, 0.14);
  const wingR = at(side(rr(0.06, 0.8, 0.03), 0.1, 0.03), 0.42, 0.7, 0.14);
  const head = at(side(rr(0.16, 0.3, 0.07), 0.46, 0.05), 0, 1.0, 0.1);

  // Footrest: padded plate on hinged arms
  const footPlate = at(side(rr(0.46, 0.1, 0.04), 0.66, 0.04), 0, 0, 0.26);

  // Chrome linkage
  const bars: THREE.BufferGeometry[] = [];
  for (const x of [-0.3, 0.3]) {
    const b = new THREE.CylinderGeometry(0.014, 0.014, 0.46, 8);
    b.rotateX(Math.PI / 2);
    bars.push(at(b, x, -0.04, 0.2));
  }

  const tex = leatherTexture();
  shared = {
    leather: new THREE.MeshPhysicalMaterial({
      color: GARNET,
      roughness: 0.52,
      metalness: 0,
      sheen: 0.25,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0xb5505f),
      clearcoat: 0.18,
      clearcoatRoughness: 0.5,
      bumpMap: tex,
      bumpScale: 0.35,
    }),
    frame: new THREE.MeshStandardMaterial({ color: INK, roughness: 0.55, metalness: 0.1 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xdfe3ea, roughness: 0.22, metalness: 1 }),
    shadow: new THREE.MeshBasicMaterial({ map: shadowTex(), transparent: true, depthWrite: false }),
    shadowGeo: new THREE.PlaneGeometry(2.7, 2.7),
    statLeather: mergeGeometries([seat, armL, armR].map((g) => g.toNonIndexed()))!,
    statInk: mergeGeometries([base, ...feet].map((g) => g.toNonIndexed()))!,
    back: mergeGeometries([backG, wingL, wingR, head].map((g) => g.toNonIndexed()))!,
    foot: footPlate,
    mech: mergeGeometries(bars.map((g) => g.toNonIndexed()))!,
  };
  return shared;
}

function shadowTex() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const g = cv.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, "rgba(27,34,56,0.42)");
  grad.addColorStop(1, "rgba(27,34,56,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(cv);
}

function proceduralChair(): Chair {
  const s = getShared();
  const group = new THREE.Group();
  const shadow = new THREE.Mesh(s.shadowGeo, s.shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  group.add(shadow);
  group.add(new THREE.Mesh(s.statInk, s.frame));
  group.add(new THREE.Mesh(s.statLeather, s.leather));

  const back = new THREE.Group();
  back.position.set(0, 0.36, -0.34);
  back.add(new THREE.Mesh(s.back, s.leather));
  group.add(back);

  const foot = new THREE.Group();
  foot.position.set(0, 0.36, 0.42);
  foot.add(new THREE.Mesh(s.foot, s.leather));
  foot.add(new THREE.Mesh(s.mech, s.chrome));
  group.add(foot);

  const setRecline = (r: number) => {
    const t = Math.min(Math.max(r, 0), 1);
    back.rotation.x = -t * 0.62;
    foot.rotation.x = (1 - t) * 1.1 - t * 0.1;
  };
  setRecline(0);
  return { group, setRecline };
}

/* The real Little Nap chair, scanned as one solid piece: it cannot recline, so it turns and lifts instead. */
const STEEL = 0x6f87ad;

function realChair(detail: "hi" | "lite"): Chair {
  const m = model!;
  const group = new THREE.Group();
  const shadow = new THREE.Mesh(getShared().shadowGeo, getShared().shadow);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  group.add(shadow);
  const mesh = new THREE.Mesh(detail === "hi" ? m.hi : m.lite, m.leather);
  group.add(mesh);
  // r (0..1) lifts the chair a touch; the scenes use it as a gentle wave.
  const setRecline = (r: number) => {
    mesh.position.y = Math.min(Math.max(r, 0), 1) * 0.1;
  };
  return { group, setRecline };
}

export function createChair(detail: "hi" | "lite" = "lite"): Chair {
  return model ? realChair(detail) : proceduralChair();
}

function prep(g: THREE.BufferGeometry, crease: number): THREE.BufferGeometry {
  g.deleteAttribute("normal");
  const c = toCreasedNormals(g, crease);
  c.computeBoundingBox();
  const bb = c.boundingBox!;
  c.translate(0, -bb.min.y, 0); // floor at y = 0
  c.scale(0.72, 0.72, 0.72);
  return c;
}

/** Loads the real chair (full detail and light). Falls back to the procedural chair if it fails. */
export function primeChairModel(): Promise<void> {
  if (primed) return primed;
  primed = (async () => {
    try {
      const loader = new GLTFLoader();
      const [hi, lite] = await Promise.all([
        loader.loadAsync("/models/recliner.glb"),
        loader.loadAsync("/models/recliner-lite.glb"),
      ]);
      const geo = (g: { scene: THREE.Object3D }) => (g.scene.children[0] as THREE.Mesh).geometry;
      model = {
        hi: prep(geo(hi), Math.PI / 4),
        lite: prep(geo(lite), Math.PI / 5),
        leather: new THREE.MeshPhysicalMaterial({
          color: STEEL,
          roughness: 0.5,
          metalness: 0,
          sheen: 0.25,
          sheenRoughness: 0.5,
          sheenColor: new THREE.Color(0xa9bbd6),
          clearcoat: 0.15,
          clearcoatRoughness: 0.5,
        }),
      };
    } catch {
      /* use the procedural chair */
    }
  })();
  return primed;
}

export function makeLights(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  pm.dispose();
  scene.environmentIntensity = 0.4;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9dde6, 0.25));
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(4, 8, 6);
  scene.add(sun);
}

export function webglOk(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
