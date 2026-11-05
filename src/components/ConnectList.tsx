"use client";

import { useState } from "react";
import { connect } from "@/content";

export default function ConnectList() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (href: string) => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(href);
      setTimeout(() => setCopied((c) => (c === href ? null : c)), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="connect">
      {connect.map((grp) => (
        <section key={grp.group} className="connect-group">
          <h2>{grp.group}</h2>
          <ul>
            {grp.links.map((l) => (
              <li key={l.href}>
                <a className="connect-main" href={l.href} target="_blank" rel="noopener noreferrer">
                  <span className="connect-label">{l.label}</span>
                  <span className="connect-handle">{l.handle}</span>
                </a>
                <button className="copy" onClick={() => copy(l.href)} aria-label={`Copy link to ${l.label}`}>
                  {copied === l.href ? "Copied" : "Copy link"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
