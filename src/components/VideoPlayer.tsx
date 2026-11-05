"use client";

import { useState } from "react";

// Click-to-play facade. Nothing from YouTube loads until the visitor presses play,
// so the page stays fast on mobile. Uses the privacy-enhanced domain.
export default function VideoPlayer({ list, title, note }: { list: string; title: string; note?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="vp">
      <div className="vp-frame">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${list}&autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button className="vp-poster" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
            <span className="vp-play" aria-hidden="true" />
            <span className="vp-title">{title}</span>
            {note ? <span className="vp-note">{note}</span> : null}
          </button>
        )}
      </div>
    </div>
  );
}
