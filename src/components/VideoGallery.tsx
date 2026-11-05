"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

type V = { id: string; title: string };

// One large player plus a shelf of videos. Choosing a video plays it straight away.
export default function VideoGallery({ videos }: { videos: V[] }) {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const v = videos[i];
  return (
    <div className="vg">
      <VideoPlayer key={v.id + started} id={v.id} title={v.title} autoplay={started} />
      <ul className="vg-shelf">
        {videos.map((x, k) => (
          <li key={x.id}>
            <button
              className={"vg-card" + (k === i ? " is-on" : "")}
              onClick={() => {
                setI(k);
                setStarted(true);
              }}
              aria-label={`Play: ${x.title}`}
              aria-current={k === i}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${x.id}/mqdefault.jpg`} alt="" loading="lazy" />
              <span>{x.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
