import Hero from "@/components/Hero";
import Portrait from "@/components/Portrait";
import CountLine from "@/components/CountLine";
import VideoGallery from "@/components/VideoGallery";
import Vision from "@/components/Vision";
import GalleryStrip from "@/components/GalleryStrip";
import { origin, vision, videos, PLAYLIST_URL } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Portrait />
      <CountLine tokens={origin} />
      <Vision label={vision.label} text={vision.text} />
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
