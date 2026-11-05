import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/newsreader";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ravindergoel.com"),
  title: {
    default: "Ravinder Goel | Founder, Little Nap Recliners",
    template: "%s | Ravinder Goel",
  },
  description:
    "The story of Ravinder Goel, who founded Little Nap Recliners in 2011 and has spent his career making the Joy of Comfort.",
  openGraph: {
    title: "Ravinder Goel",
    description: "Founder of Little Nap Recliners. Making the Joy of Comfort since 2011.",
    url: "https://ravindergoel.com",
    type: "website",
    images: ["/images/ravinder-portrait.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
