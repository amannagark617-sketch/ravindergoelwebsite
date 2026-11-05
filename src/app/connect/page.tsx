import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import Parallax from "@/components/Parallax";
import ConnectList from "@/components/ConnectList";

export const metadata: Metadata = {
  title: "Connect",
  description: "Ravinder Goel's LinkedIn and every Little Nap and La-Z-Boy India social handle.",
};

export default function Connect() {
  return (
    <>
      <PageIntro title="Connect" lede="His LinkedIn, and every Little Nap and product link in one place." />
      <Parallax className="band" src="/images/ravinder-cinema-seated.jpg" position="50% 45%" />
      <ConnectList />
    </>
  );
}
