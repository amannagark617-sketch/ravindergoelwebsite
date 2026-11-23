import type { Metadata } from "next";
import "@fontsource-variable/libre-franklin";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const SITE_URL = "https://www.ravindergoel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ravinder Goel (RG) | Founder and CEO, Little Nap Recliners",
    template: "%s | Ravinder Goel",
  },
  description:
    "Ravinder Goel, known as RG, is the Founder and CEO of Little Nap Recliners, a recliner maker in India and the exclusive La-Z-Boy partner in India. His story, awards and press kit.",
  applicationName: "Ravinder Goel",
  authors: [{ name: "Ravinder Goel", url: SITE_URL }],
  keywords: [
    "Ravinder Goel",
    "RG Little Nap",
    "Ravinder Goel Little Nap",
    "Ravinder Goel founder",
    "recliners India",
    "comfort",
    "Little Nap Recliners founder",
    "La-Z-Boy India",
    "recliner manufacturer India",
    "AFMT North India Chapter",
  ],
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: "Ravinder Goel (RG) | Founder and CEO, Little Nap Recliners",
    description: "Founder and CEO of Little Nap Recliners. Making the Joy of Comfort since 2011.",
    url: SITE_URL,
    siteName: "Ravinder Goel",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/ravinder-office.jpg", width: 1200, height: 1500, alt: "Ravinder Goel, Founder and CEO of Little Nap Recliners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravinder Goel (RG) | Founder and CEO, Little Nap Recliners",
    description: "Founder and CEO of Little Nap Recliners. Making the Joy of Comfort since 2011.",
    images: ["/images/ravinder-office.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ravinder Goel",
      alternateName: ["RG", "Ravinder Goel Little Nap"],
      url: SITE_URL,
      image: `${SITE_URL}/images/ravinder-office.jpg`,
      jobTitle: "Founder and CEO",
      description:
        "Founder and CEO of Little Nap Recliners and Vice President of the North India Chapter of AFMT, the Association of Furniture Manufacturers & Traders (INDIA).",
      worksFor: { "@id": `${SITE_URL}/#org` },
      sameAs: ["https://www.linkedin.com/in/ravindergoel/"],
      knowsAbout: ["Recliners", "Comfort", "Furniture manufacturing", "Cinema seating", "La-Z-Boy India"],
      memberOf: { "@type": "Organization", name: "AFMT, Association of Furniture Manufacturers & Traders (INDIA)" },
      award: "Pride of Welingkar Award, 2023",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Little Nap Recliners",
      legalName: "Little Nap Designs Pvt. Ltd.",
      alternateName: "Little Nap",
      description: "Indian recliner manufacturer with two factories, 18 showrooms and recliners in more than 1,300 cinema screens. Exclusive La-Z-Boy partner in India.",
      url: "https://www.littlenap.in",
      foundingDate: "2011",
      founder: { "@id": `${SITE_URL}/#person` },
      sameAs: ["https://www.linkedin.com/company/little-nap"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ravinder Goel",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <ScrollToTop />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
