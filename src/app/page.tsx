import Hero from "@/components/Hero";
import Portrait from "@/components/Portrait";
import CountLine from "@/components/CountLine";
import Vision from "@/components/Vision";
import GalleryStrip from "@/components/GalleryStrip";
import HomeIndex from "@/components/HomeIndex";
import { origin, vision } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Portrait />
      <CountLine tokens={origin} />
      <Vision label={vision.label} text={vision.text} />
      <GalleryStrip />
      <HomeIndex />
    </>
  );
}
