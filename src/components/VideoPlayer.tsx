"use client";

import { useState } from "react";

// Click-to-play facade: only the thumbnail loads until the visitor presses play (fast on phones).
export default function VideoPlayer({ id, title, autoplay = false }: { id: string; title: string; autoplay?: boolean }) {
  const [on, setOn] = useState(autoplay);
  return (
    <div className="vp-frame">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button className="vp-poster" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="vp-play" aria-hidden="true" />
          <span className="vp-title">{title}</span>
        </button>
      )}
    </div>
  );
}
