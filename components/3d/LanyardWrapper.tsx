"use client";

import dynamic from "next/dynamic";
import React from "react";

const Lanyard = dynamic(() => import("@/components/reactbits/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center font-mono text-xs text-text-secondary">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-orange-500">INITIALIZING 3D LANYARD...</span>
      </div>
    </div>
  ),
});

export default function LanyardWrapper() {
  return (
    // Free-floating container with no enclosing boxes or borders
    <div className="relative w-full h-[620px] pointer-events-auto select-none">
      {/* Floating Tactical HUD Tag */}
      <div className="absolute top-2 left-0 right-0 z-10 flex items-center justify-between px-2 text-xs font-mono pointer-events-none select-none opacity-80">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
          <span className="text-orange-500 font-bold tracking-wider">
            OPERATIVE ID // NEMESIS
          </span>
        </div>
        <span className="text-[10px] text-white/40 font-mono">
          DRAG TO TILT • CLICK TO FLIP
        </span>
      </div>

      <Lanyard
        frontImage="/images/nemesis-card.png"
        backImage="/images/nemesis-card.png"
        cardColor="#0E0E12"
        strapColor="#EA580C"
        finish="matte" // Matte finish: NO rainbow foil shine
        size={0.65}
        metal="silver"
        interactive={true}
        breeze={0.25}
        className="w-full h-full"
      />
    </div>
  );
}
