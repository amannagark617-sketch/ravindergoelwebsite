import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import RecognitionList from "@/components/RecognitionList";

export const metadata: Metadata = {
  title: "Recognition",
  description: "Awards, press features and conversations about Ravinder Goel.",
};

export default function Recognition() {
  return (
    <>
      <PageIntro title="Recognition" lede="Awards he has received, what the press has written and where he has spoken." />
      <Parallax className="band" src="/images/ravinder-sofa-seated.jpg" />
      <RecognitionList />
    </>
  );
}
