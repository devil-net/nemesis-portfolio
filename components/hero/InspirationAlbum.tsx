"use client";

import React, { useState } from "react";
import Stack from "@/components/reactbits/Stack";
import TiltedCard from "@/components/reactbits/TiltedCard";
import { portfolioData } from "@/portfolioData";
import { Sparkles, Layers, RefreshCw, Compass, Film, Feather, Swords } from "lucide-react";
import { TacticalAudio } from "@/lib/utils";

const INSPIRATION_CARDS = [
  {
    id: "one-piece",
    title: "Straw Hat Crew",
    franchise: "One Piece",
    tag: "Freedom, Will & Crew Loyalty",
    aesthetic: "Wanted Poster // Gear 5 Aura",
    icon: Compass,
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    quote: "“If you don't take risks, you can't create a future.”",
    bgPattern: "radial-gradient(circle at 50% 20%, rgba(255,170,0,0.18), transparent 70%)",
    accent: "#FFAA00",
    details: [
      "Core ethos of absolute digital freedom, peer trust, and fearless exploration.",
      "Symbol of relentless resilience through every impossible grand line firewall.",
      "Inspiration behind the World Tree architectural design in Nemesis's technical skills.",
    ],
  },
  {
    id: "bleach",
    title: "Ichigo Kurosaki & Gotei 13",
    franchise: "Bleach",
    tag: "Dual Nature // High-Contrast",
    aesthetic: "Bankai Ink Sketch // Black & Orange",
    icon: Swords,
    badgeColor: "bg-orange-600/20 text-tactical-orange border-tactical-orange/40",
    quote: "“The blade that strikes in silence carries the weight of two souls.”",
    bgPattern: "radial-gradient(circle at 80% 80%, rgba(255,85,0,0.22), transparent 70%)",
    accent: "#FF5500",
    details: [
      "The duality of offensive exploitation and defensive forensics.",
      "High-contrast black kimono and orange reiatsu aesthetic mirrored in devil-net's palette.",
      "Focus on master-level precision and weaponized code.",
    ],
  },
  {
    id: "nolan",
    title: "Christopher Nolan Cinema",
    franchise: "Interstellar • Inception • Oppenheimer",
    tag: "Time, Scale & Precision Engineering",
    aesthetic: "IMAX 70mm Grain // Relativistic Physics",
    icon: Film,
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    quote: "“Do not go gentle into that good night. Rage, rage against the dying of the light.”",
    bgPattern: "radial-gradient(circle at 20% 50%, rgba(56,189,248,0.18), transparent 70%)",
    accent: "#38BDF8",
    details: [
      "Architectural obsession with layered reality, recursive execution, and physical precision.",
      "Appreciation for practical effects and deep systems reasoning over surface illusions.",
      "Relentless pursuit of intellectual mastery and technical scale.",
    ],
  },
  {
    id: "sketches",
    title: "Custom Sketches & Anime Art",
    franchise: "Personal Artworks & Cyberpunk",
    tag: "Hand-Drawn Concept Art",
    aesthetic: "Charcoal // Orange Tactical Accents",
    icon: Feather,
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    quote: "“Every blueprint begins as a raw gesture on paper.”",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.18), transparent 70%)",
    accent: "#F43F5E",
    details: [
      "Hand-drawn anime characters, mecha schematics, and tactical UI wireframes.",
      "Bridging right-brain creative visual expression with left-brain low-level reverse engineering.",
      "Original charcoal sketches and digital ink concept illustrations.",
    ],
  },
];

export default function InspirationAlbum() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleCardSwitch = (index: number) => {
    setActiveCardIndex((index + 1) % INSPIRATION_CARDS.length);
    TacticalAudio.playTerminalBeep(580, 0.04);
  };

  return (
    <div className="relative w-full rounded-xl border border-[#282830] bg-surface/90 backdrop-blur-md p-5 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Tactical Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#282830] z-20">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-tactical-orange" />
          <span className="font-mono font-bold text-xs text-text-primary tracking-wider uppercase">
            CHARACTER TRAITS & INSPIRATION ALBUM
          </span>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[11px] text-text-secondary">
          <span className="text-tactical-orange font-bold">
            0{activeCardIndex + 1} / 0{INSPIRATION_CARDS.length}
          </span>
          <span className="text-[#3B3B45]">|</span>
          <span className="text-[10px] hidden sm:inline text-text-secondary">
            SWIPE OR CLICK TO CYCLE
          </span>
        </div>
      </div>

      {/* Stacked Polaroids & Cards */}
      <div className="my-2 py-2 flex items-center justify-center">
        <Stack
          offset={10}
          rotationFactor={3.5}
          onCardClick={handleCardSwitch}
          className="w-full max-w-[360px] h-[380px]"
        >
          {INSPIRATION_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <TiltedCard
                key={card.id}
                maxAngle={14}
                scale={1.03}
                className="w-[330px] sm:w-[350px] rounded-xl border border-[#353540] bg-[#141419] p-5 shadow-2xl overflow-hidden relative"
              >
                {/* Background Dynamic Ambient Radial Highlight */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{ background: card.bgPattern }}
                />

                {/* Polaroids Header & Badge */}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <div
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${card.badgeColor}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{card.franchise}</span>
                  </div>
                  <span className="font-mono text-[10px] text-text-secondary tracking-widest uppercase">
                    FILE #{idx + 1}
                  </span>
                </div>

                {/* Card Main Title */}
                <div className="relative z-10 space-y-1 mb-3">
                  <h3 className="font-sans font-bold text-lg text-text-primary tracking-wide">
                    {card.title}
                  </h3>
                  <div className="font-mono text-xs text-tactical-orange font-medium flex items-center space-x-1.5">
                    <Sparkles className="w-3 h-3 text-tactical-orange" />
                    <span>{card.tag}</span>
                  </div>
                </div>

                {/* Aesthetic Banner Bar */}
                <div className="relative z-10 p-2.5 rounded bg-[#0A0A0C] border border-[#26262D] font-mono text-[11px] text-[#A0A0AD] mb-3">
                  <div className="text-[9px] uppercase tracking-wider text-text-secondary">
                    VISUAL AESTHETIC //
                  </div>
                  <div className="text-text-primary font-semibold">
                    {card.aesthetic}
                  </div>
                </div>

                {/* Quote Block */}
                <div className="relative z-10 border-l-2 border-tactical-orange pl-3 py-1 my-3 italic font-mono text-[11px] text-text-secondary">
                  {card.quote}
                </div>

                {/* Bullet Points */}
                <ul className="relative z-10 space-y-1 text-[11px] font-sans text-text-secondary">
                  {card.details.slice(0, 2).map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-1.5">
                      <span className="text-tactical-orange font-bold font-mono">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Polaroid Footer */}
                <div className="relative z-10 mt-4 pt-3 border-t border-[#26262D] flex items-center justify-between text-[10px] font-mono text-[#666673]">
                  <span>ARCHIVE // NEMESIS_TRAITS</span>
                  <span className="text-tactical-orange font-bold">CLICK TO FLIP ❯</span>
                </div>
              </TiltedCard>
            );
          })}
        </Stack>
      </div>

      {/* Album Control Bar */}
      <div className="relative z-20 pt-2 border-t border-[#282830] flex items-center justify-between text-xs font-mono">
        <div className="text-text-secondary text-[11px]">
          Active:{" "}
          <span className="text-text-primary font-semibold">
            {INSPIRATION_CARDS[activeCardIndex].title}
          </span>
        </div>
        <button
          onClick={() => handleCardSwitch(activeCardIndex)}
          className="flex items-center space-x-1 text-tactical-orange hover:text-glow-orange px-2 py-1 rounded bg-surface border border-tactical-orange/30 hover:border-tactical-orange transition-all"
        >
          <RefreshCw className="w-3 h-3" />
          <span>NEXT CARD</span>
        </button>
      </div>
    </div>
  );
}
