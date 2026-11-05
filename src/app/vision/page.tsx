import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import VideoGallery from "@/components/VideoGallery";
import { videos, PLAYLIST_URL } from "@/content";

export const metadata: Metadata = {
  title: "Vision",
  description: "Ravinder Goel on the story and vision of Little Nap Recliners, in video.",
};

export default function Vision() {
  return (
    <>
      <PageIntro title="Vision" lede="Ravinder Goel on the story and vision of Little Nap, in video." />
      <section className="vp-section">
        <VideoGallery videos={videos} />
        <p className="vp-links">
          <a className="btn" href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
            More on YouTube
          </a>
        </p>
      </section>
    </>
  );
}
