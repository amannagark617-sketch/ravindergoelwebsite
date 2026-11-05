import Hero from "@/components/Hero";
import Portrait from "@/components/Portrait";
import CountLine from "@/components/CountLine";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";
import Vision from "@/components/Vision";
import GalleryStrip from "@/components/GalleryStrip";
import { origin, vision, VISION_PLAYLIST } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Portrait />
      <CountLine tokens={origin} />
      <Vision label={vision.label} text={vision.text} />
      <GalleryStrip />
      <section className="vp-section">
        <VideoPlayer list={VISION_PLAYLIST.id} title={VISION_PLAYLIST.title} note="Press play. 9 videos." />
        <p className="vp-links">
          <Link className="btn" href="/vision">
            More on the vision page
          </Link>
        </p>
      </section>
    </>
  );
}
