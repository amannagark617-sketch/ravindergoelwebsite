import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Portrait from "@/components/Portrait";
import Beginning from "@/components/Beginning";
import Vision from "@/components/Vision";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Portrait />
        <Beginning />
        <Vision />
        <Writing />
      </main>
      <Footer />
    </>
  );
}
