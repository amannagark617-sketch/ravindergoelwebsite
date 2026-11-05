import Hero from "@/components/Hero";
import Portrait from "@/components/Portrait";
import CountLine from "@/components/CountLine";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";
import Vision from "@/components/Vision";
import GalleryStrip from "@/components/GalleryStrip";
import { origin, vision, videos } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Portrait />
      <CountLine tokens={origin} />
      <Vision label={vision.label} text={vision.text} />
      <GalleryStrip />
      <section className="vp-section">
        <div className="vp">
          <VideoPlayer id={videos[0].id} title={videos[0].title} />
        </div>
        <p className="vp-links">
          <Link className="btn" href="/vision">
            More videos
          </Link>
        </p>
      </section>
    </>
  );
}
