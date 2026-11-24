import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ConnectList from "@/components/ConnectList";

export const metadata: Metadata = {
  title: "Connect with Ravinder Goel and Little Nap",
  description:
    "Ravinder Goel on LinkedIn and the official Little Nap Recliners links: company site, showrooms, franchise enquiries and contact.",
};

export default function Connect() {
  return (
    <>
      <PageIntro title="Connect" lede="Ravinder Goel on LinkedIn, Crunchbase and IMDb, and the official Little Nap links." />
      <ConnectList />
    </>
  );
}
