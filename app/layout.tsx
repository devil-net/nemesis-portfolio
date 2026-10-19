import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Courier_Prime } from "next/font/google";
import "./globals.css";
import TacticalBranchedNav from "@/components/navigation/TacticalBranchedNav";
import CornerCharacter from "@/components/avatar/CornerCharacter";
import AsciiRipple from "@/components/reactbits/AsciiRipple";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dossier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DHANUSH GURUDU // NEMESIS — Cybersecurity & Software Engineering",
  description:
    "Tactical portfolio of Dhanush Gurudu (Codename: Nemesis) — Cybersecurity Undergraduate at NFSU, Digital Forensics, Security Engineering & Reverse Engineering.",
  keywords: [
    "Dhanush Gurudu",
    "Nemesis",
    "Cybersecurity",
    "Digital Forensics",
    "NFSU",
    "Security Engineer",
    "Reverse Engineering",
    "Network Security",
  ],
  authors: [{ name: "Dhanush Gurudu" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${courierPrime.variable}`}
    >
      <body className="bg-background text-text-primary antialiased font-sans min-h-screen relative selection:bg-tactical-orange selection:text-background overflow-x-hidden">
        {/* SVG feTurbulence Noise Layer */}
        <div className="noise-overlay" aria-hidden="true">
          <svg className="w-full h-full opacity-60">
            <filter id="tactical-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#tactical-noise)" />
          </svg>
        </div>

        {/* Global Tactical Background with Radial Dot Grid & Atmospheric Vignette */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 tactical-dot-grid opacity-50" />
          {/* Universal React Bits Pro ASCII Ripple Background with Watch Dogs Cyber Lore */}
          <AsciiRipple cellSize={15} />
          <div className="absolute inset-0 bg-radial-vignette bg-[radial-gradient(ellipse_at_center,transparent_0%,#0E0E10_88%)] opacity-85" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-tactical-orange/5 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Tactical UI Shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <TacticalBranchedNav />
          <CornerCharacter />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
