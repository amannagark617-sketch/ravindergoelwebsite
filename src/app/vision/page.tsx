import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import VideoPlayer from "@/components/VideoPlayer";
import { VISION_PLAYLIST } from "@/content";

export const metadata: Metadata = {
  title: "Vision",
  description: "The founder's vision playlist from the Little Nap Recliners channel.",
};

export default function Vision() {
  return (
    <>
      <PageIntro
        title="Vision"
        lede="The founder's vision playlist from the Little Nap Recliners channel: nine videos in one player. Press play and use the playlist button in the player to move between them."
      />
      <section className="vp-section">
        <VideoPlayer list={VISION_PLAYLIST.id} title={VISION_PLAYLIST.title} note="9 videos, plays in sequence" />
        <p className="vp-links">
          <a className="btn" href={VISION_PLAYLIST.url} target="_blank" rel="noopener noreferrer">
            Open the playlist on YouTube
          </a>
        </p>
      </section>
    </>
  );
}
