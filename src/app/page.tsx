import Hero from "@/components/Hero";
import Portrait from "@/components/Portrait";
import VideoGallery from "@/components/VideoGallery";
import GalleryStrip from "@/components/GalleryStrip";
import { videos, PLAYLIST_URL } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Portrait />
      <GalleryStrip />
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
