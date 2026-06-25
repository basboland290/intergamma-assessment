import type { Metadata } from "next";
import { Overpass } from "next/font/google";

import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/Header";

import "./globals.css";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-overpass",
});

export const metadata: Metadata = {
  title: "GAMMA | Boormachine kopen? Allerlei elektrische boormachines",
  description:
    "Een boormachine kopen? GAMMA heeft een ruime keuze aan goede, elektrische accuboormachines. Nu altijd laag geprijsd. Bestel online of bezoek een van onze bouwmarkten.",
  icons: {
    icon: [
      {
        url: "https://static.gamma.nl/icons/favicon-16x16.1b0dd0a7.png",
        sizes: "16x16",
      },
      {
        url: "https://static.gamma.nl/icons/favicon-32x32.9100bd1b.png",
        sizes: "32x32",
      },
    ],
    apple: "https://static.gamma.nl/icons/apple-touch-icon.d7c46717.png",
    shortcut: "https://static.gamma.nl/icons/favicon.6ae1786a.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${overpass.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <WishlistProvider>
          <Header />
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
