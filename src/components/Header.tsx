"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, person } from "@/content";
import LiquidButton, { GlassFilter } from "@/components/LiquidButton";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setDrop(null);
    const out = (e: MouseEvent) => !(e.target as HTMLElement).closest(".nav-group") && setDrop(null);
    window.addEventListener("keydown", esc);
    window.addEventListener("click", out);
    return () => {
      window.removeEventListener("keydown", esc);
      window.removeEventListener("click", out);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <GlassFilter />
      <Link className="mark" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mark-logo" src="/images/rg-mark.png" alt="" width={44} height={44} />
        <span className={"mark-text" + (pathname === "/" ? " sr-only" : "")}>
          <span className="mark-name">{person.name}</span>
          {pathname !== "/" && <span className="mark-role">Founder and CEO, Little Nap Recliners</span>}
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main">
        {navGroups.map((g) =>
          "href" in g ? (
            g.href === "/connect" ? (
              <LiquidButton key={g.href} href={g.href} variant="ink" size="sm" aria-current={pathname === g.href ? "page" : undefined}>
                {g.label}
              </LiquidButton>
            ) : (
              <Link key={g.href} href={g.href} aria-current={pathname === g.href ? "page" : undefined}>
                {g.label}
              </Link>
            )
          ) : (
            <div
              key={g.label}
              className={"nav-group" + (drop === g.label ? " is-open" : "") + (g.items.some((i) => i.href === pathname) ? " is-current" : "")}
              onMouseEnter={() => setDrop(g.label)}
              onMouseLeave={() => setDrop(null)}
            >
              <button aria-expanded={drop === g.label} aria-haspopup="true" onClick={() => setDrop(drop === g.label ? null : g.label)}>
                {g.label}
                <i aria-hidden="true" />
              </button>
              <div className="nav-panel" role="menu">
                {g.items.map((i) => (
                  <Link key={i.href} href={i.href} role="menuitem" aria-current={pathname === i.href ? "page" : undefined}>
                    <b>{i.label}</b>
                    <span>{i.note}</span>
                  </Link>
                ))}
              </div>
            </div>
          ),
        )}
      </nav>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="mobile-menu"
        className={"mobile-nav" + (open ? " is-open" : "")}
        aria-label="Main"
        hidden={!open}
      >
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Home
        </Link>
        {navGroups.map((g) =>
          "href" in g ? (
            <Link key={g.href} href={g.href} aria-current={pathname === g.href ? "page" : undefined}>
              {g.label}
            </Link>
          ) : (
            <div key={g.label} className="mobile-group">
              <span>{g.label}</span>
              {g.items.map((i) => (
                <Link key={i.href} href={i.href} aria-current={pathname === i.href ? "page" : undefined}>
                  {i.label}
                </Link>
              ))}
            </div>
          ),
        )}
      </nav>
    </header>
  );
}
