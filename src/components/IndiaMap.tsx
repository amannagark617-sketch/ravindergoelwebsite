"use client";

import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import india from "@/lib/india.json";
import type { Showroom } from "@/content";

// [lon, lat]
export const COORDS: Record<string, [number, number]> = {
  Agra: [78.01, 27.18], Ahmedabad: [72.58, 23.03], Bangalore: [77.59, 12.97], Bhopal: [77.41, 23.26],
  Chennai: [80.27, 13.08], Coimbatore: [76.96, 11.02], Ghitorni: [77.13, 28.48], Hyderabad: [78.48, 17.38],
  Indore: [75.86, 22.72], Jaipur: [75.79, 26.91], Karur: [78.08, 10.96], "Kirti Nagar": [77.15, 28.65],
  Ludhiana: [75.86, 30.9], Mumbai: [72.88, 19.08], Panipat: [76.97, 29.39], Pune: [73.86, 18.52],
  Raipur: [81.63, 21.25], Vapi: [72.91, 20.37],
};

export type Factory = { id: string; name: string; lonlat: [number, number]; href: string };
export const FACTORIES: Factory[] = [
  { id: "manesar", name: "Manesar factory", lonlat: [76.936, 28.358], href: "https://share.google/TFxN6Z4BUtV6xBU8z" },
  { id: "indore", name: "Indore factory (Dewas)", lonlat: [76.027, 22.919], href: "https://maps.app.goo.gl/BMGUcGypghzn3CnD8" },
];

const W = 600;
const H = 680;

export default function IndiaMap({
  items,
  region,
  active,
  onActive,
}: {
  items: Showroom[];
  region: string;
  active: string | null;
  onActive: (id: string | null) => void;
}) {
  const { d, pt, spots } = useMemo(() => {
    const proj = geoMercator().fitExtent(
      [
        [12, 12],
        [W - 12, H - 12],
      ],
      india as never,
    );
    const pt = (c: [number, number]) => proj(c) as [number, number];
    // Nudge markers apart so no two ever sit on top of each other; a hairline keeps each tied to its true spot.
    const nodes = [
      ...FACTORIES.map((f) => ({ k: f.id, home: pt(f.lonlat), fixed: true })),
      ...Object.keys(COORDS).map((k) => ({ k, home: pt(COORDS[k]), fixed: false })),
    ].map((n) => ({ ...n, p: [n.home[0], n.home[1]] as [number, number] }));
    const MIN = 26;
    for (let it = 0; it < 120; it++) {
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.p[0] - a.p[0];
          let dy = b.p[1] - a.p[1];
          let dd = Math.hypot(dx, dy);
          if (dd >= MIN) continue;
          if (dd < 0.01) {
            dx = 1;
            dy = 0.3;
            dd = 1;
          }
          const push = (MIN - dd) / 2 + 0.1;
          const wa = a.fixed ? 0 : b.fixed ? 1 : 0.5;
          const wb = b.fixed ? 0 : a.fixed ? 1 : 0.5;
          a.p[0] -= (dx / dd) * push * 2 * wa;
          a.p[1] -= (dy / dd) * push * 2 * wa;
          b.p[0] += (dx / dd) * push * 2 * wb;
          b.p[1] += (dy / dd) * push * 2 * wb;
        }
    }
    const spots: Record<string, { p: [number, number]; home: [number, number] }> = {};
    nodes.forEach((n) => (spots[n.k] = { p: n.p, home: n.home as [number, number] }));
    return { d: geoPath(proj)(india as never) || "", pt, spots };
  }, []);

  return (
    <svg className="im" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of India with Little Nap showrooms and the two factories" onMouseLeave={() => onActive(null)}>
      <defs>
        <linearGradient id="im-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f6fb" />
          <stop offset="1" stopColor="#dfe5f1" />
        </linearGradient>
      </defs>
      <path d={d} className="im-land" />
      {items.map((s, i) => {
        const c = COORDS[s.city];
        if (!c) return null;
        const { p: [x, y], home } = spots[s.city];
        const on = region === "All" || s.region === region;
        const hot = active === s.city;
        return (
          <g key={s.city}>
          <line x1={home[0]} y1={home[1]} x2={x} y2={y} className="im-leash" />
          <g
            className={"im-pin" + (on ? "" : " is-dim") + (hot ? " is-hot" : "")}
            transform={`translate(${x} ${y})`}
            onMouseEnter={() => onActive(s.city)}
            onFocus={() => onActive(s.city)}
            onClick={() => onActive(s.city)}
            tabIndex={on ? 0 : -1}
            role="button"
            aria-label={`${s.city}, ${s.state}`}
          >
            <g className="im-in" style={{ animationDelay: `${0.2 + i * 0.07}s` }}>
            <circle r="9" className="im-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
            <circle r="5.5" className="im-dot" />
            {hot ? (
              <text y="-12" textAnchor="middle" className="im-tag">
                {s.city}
              </text>
            ) : null}
            </g>
          </g>
          </g>
        );
      })}
      {FACTORIES.map((f, i) => {
        const [x, y] = spots[f.id].p;
        const left = false;
        return (
          <a key={f.id} href={f.href} target="_blank" rel="noopener noreferrer" aria-label={f.name}>
            <g transform={`translate(${x} ${y})`} className="im-fac">
              <g className="im-in" style={{ animationDelay: `${1.6 + i * 0.2}s` }}>
              <rect x="-8" y="-8" width="16" height="16" className="im-sq" />
              <text x={left ? -14 : 14} y={f.id === "indore" ? 26 : -14} textAnchor={left ? "end" : "start"} className="im-fac-label">
                {f.name}
              </text>
              </g>
            </g>
          </a>
        );
      })}
    </svg>
  );
}
