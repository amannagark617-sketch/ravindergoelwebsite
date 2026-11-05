"use client";

import { useMemo, useState } from "react";
import type { Showroom } from "@/content";
import IndiaMap from "@/components/IndiaMap";

const REGIONS = ["All", "North", "West", "South", "Central"] as const;

export default function ShowroomFinder({ items }: { items: Showroom[] }) {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const picked = items.find((s) => s.city === active) || null;
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter(
      (s) => (region === "All" || s.region === region) && (!n || (s.city + " " + s.state).toLowerCase().includes(n))
    );
  }, [items, region, q]);
  const count = (r: string) => (r === "All" ? items.length : items.filter((s) => s.region === r).length);

  return (
    <div className="sf">
      <div className="sf-bar">
        <div className="tabs" role="tablist" aria-label="Region">
          {REGIONS.map((r) => (
            <button key={r} role="tab" aria-selected={region === r} className={region === r ? "is-on" : ""} onClick={() => setRegion(r)}>
              {r} <span className="sf-n">{count(r)}</span>
            </button>
          ))}
        </div>
        <label className="sf-search">
          <span className="sr-only">Search by city or state</span>
          <input type="search" placeholder="Search city or state" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <div className="sf-mapwrap">
        <IndiaMap items={items} region={region} active={active} onActive={setActive} />
        <aside className="sf-side" aria-live="polite">
          {picked ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={picked.img} alt={`Little Nap showroom in ${picked.city}`} />
              <h3>{picked.city}</h3>
              <p>
                {picked.state}, {picked.region} India
              </p>
              <div className="sf-actions">
                <a className="btn" href={picked.map} target="_blank" rel="noopener noreferrer">
                  Directions
                </a>
                <a className="btn" href={`tel:${picked.phone.replace(/\s/g, "")}`}>
                  Call
                </a>
              </div>
            </>
          ) : (
            <>
              <h3>Across India</h3>
              <ul className="sf-key">
                <li>
                  <i className="k-dot" /> {items.length} showrooms
                </li>
                <li>
                  <i className="k-sq" /> 2 factories: Manesar and Indore (Dewas)
                </li>
              </ul>
              <p>Hover or tap a city on the map to see its showroom.</p>
            </>
          )}
        </aside>
      </div>
      <p className="sf-count" aria-live="polite">
        {list.length} {list.length === 1 ? "showroom" : "showrooms"}
      </p>
      {list.length ? (
        <ul className="sf-grid">
          {list.map((s, i) => (
            <li className={"sf-card" + (active === s.city ? " is-hot" : "")} onMouseEnter={() => setActive(s.city)} onMouseLeave={() => setActive(null)} key={s.city} style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={`Little Nap showroom in ${s.city}`} loading="lazy" />
              <div className="sf-body">
                <h3>{s.city}</h3>
                <p>
                  {s.state}, {s.region} India
                </p>
                <div className="sf-actions">
                  <a className="btn" href={s.map} target="_blank" rel="noopener noreferrer">
                    Directions
                  </a>
                  <a className="btn" href={`tel:${s.phone.replace(/\s/g, "")}`}>
                    Call {s.phone}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sf-empty">No showroom matches that search. Try a different city or clear the filter.</p>
      )}
    </div>
  );
}
