import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travel-trucks-gray-nine.vercel.app"),
  title: "TravelTrucks",
  description:
    "Campers of your dreams. You can find everything you want in our catalog.",
  openGraph: {
    title: "TravelTrucks",
    description:
      "Campers of your dreams. You can find everything you want in our catalog.",
    url: "https://travel-trucks-gray-nine.vercel.app/hero-image-1x.webp",
    siteName: "TravelTrucks",
    images: [
      {
        url: "https://travel-trucks-gray-nine.vercel.app/hero-image-1x.webp",
        width: 1200,
        height: 630,
        alt: "TravelTrucks",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelTrucks",
    description:
      "Campers of your dreams. You can find everything you want in our catalog.",
    images: ["https://travel-trucks-gray-nine.vercel.app/hero-image-1x.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <TanStackProvider>
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
