import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ConnectList from "@/components/ConnectList";

export const metadata: Metadata = {
  title: "Connect",
  description: "Ravinder Goel's LinkedIn and the official Little Nap links.",
};

export default function Connect() {
  return (
    <>
      <PageIntro title="Connect" lede="Ravinder Goel on LinkedIn, and the official Little Nap links." />
      <ConnectList />
    </>
  );
}
