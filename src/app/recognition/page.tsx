import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import RecognitionList from "@/components/RecognitionList";

export const metadata: Metadata = {
  title: "Awards, Press and Interviews",
  description:
    "Awards, press features and interviews of Ravinder Goel, Founder and CEO of Little Nap Recliners, including the Pride of Welingkar Award 2023.",
};

export default function Recognition() {
  return (
    <>
      <PageIntro title="Recognition" lede="Awards he has received, what the press has written and where he has spoken." />
      <RecognitionList />
    </>
  );
}
