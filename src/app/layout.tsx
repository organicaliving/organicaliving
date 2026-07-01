import type { Metadata } from "next";
import { Sora, League_Spartan, Space_Mono, Caveat } from "next/font/google";
import { publicEnv } from "@/lib/env";
import "./globals.css";

// Display / headings
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Body / reading
const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Technical labels
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Signature flourish only
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const SITE_DESCRIPTION =
  "Clinically formulated, plant-based vitamins and supplements — precision-dosed, third-party tested and proudly made in the USA. Nature is our thing.";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: "Organica Living — Nature is our thing",
  description: SITE_DESCRIPTION,
  applicationName: "Organica Living",
  keywords: [
    "Organica Living",
    "vitamins",
    "supplements",
    "vegan supplements",
    "multivitamin",
    "vitamin D3",
    "omega-3",
    "prenatal vitamins",
    "biotin",
    "menopause support",
    "clinically dosed",
    "third-party tested",
    "non-GMO",
    "halal",
    "gluten-free",
    "made in USA",
    "nutrition",
  ],
  authors: [{ name: "Organica Living" }],
  creator: "Organica Living",
  publisher: "Organica Living",
  category: "Health & Wellness",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Organica Living",
    title: "Organica Living — Nature is our thing",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Organica Living — Nature is our thing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organica Living — Nature is our thing",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${leagueSpartan.variable} ${spaceMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
