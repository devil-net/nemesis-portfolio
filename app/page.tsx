"use client";

import React, { useState, useEffect } from "react";
import TerminalEmulator from "@/components/terminal/TerminalEmulator";
import Keyboard2D from "@/components/keyboard/Keyboard2D";
import CipherReveal from "@/components/reactbits/CipherReveal";
import IntroSequence from "@/components/intro/IntroSequence";
import { Film } from "lucide-react";

export default function HeroPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [virtualKeyInput, setVirtualKeyInput] = useState<{
    code: string;
    char: string;
  } | null>(null);

  useEffect(() => {
    // Check if intro has already run in current tab session
    const introPlayed = sessionStorage.getItem("nemesis_intro_viewed");
    if (introPlayed) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("nemesis_intro_viewed", "true");
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const handleKeyboardPress = (code: string, char: string) => {
    setVirtualKeyInput({ code, char });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 overflow-hidden">
      {/* 1. Cinematic Intro Video Overlay */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      {/* 2. Replay Intro Button in bottom corner */}
      {!showIntro && (
        <button
          onClick={handleReplayIntro}
          className="fixed bottom-5 right-6 z-40 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-orange-500/15 backdrop-blur-md border border-white/10 hover:border-orange-500/40 text-[11px] font-mono text-white/50 hover:text-orange-400 transition-all select-none shadow-xl"
        >
          <Film className="w-3.5 h-3.5" />
          <span>REPLAY INTRO</span>
        </button>
      )}

      {/* 3. Center Content: Floating Terminal & 2D Keyboard */}
      <div
        className={`relative z-10 w-full max-w-5xl flex flex-col items-center space-y-4 sm:space-y-6 transition-all duration-1000 ${
          showIntro ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        {/* Operative CipherReveal Title */}
        <div className="text-center font-mono text-xs sm:text-sm text-[#BEBCB6] select-none flex items-center justify-center space-x-2">
          <span className="text-[#888892]">OPERATIVE:</span>
          <CipherReveal
            initialText="NEMESIS"
            targetText="DHANUSH GURUDU"
            className="text-white hover:text-orange-500 font-bold tracking-wider"
            cipherClassName="text-orange-500"
          />
          <span className="text-[#555]">//</span>
          <span className="text-[#8E8D96] text-xs">CYBER DEFENSE & SOFTWARE ENGINEERING</span>
        </div>

        {/* Central Floating Terminal Window (Sole Access Point to Sections) */}
        <div className="w-full flex justify-center">
          <TerminalEmulator externalKeyInput={virtualKeyInput} />
        </div>

        {/* Central 2D Mechanical Keyboard */}
        <div className="w-full flex justify-center">
          <Keyboard2D onKeyPress={handleKeyboardPress} />
        </div>
      </div>

      {/* 4. Bottom-Left Santoryu Calligraphy (三刀流 — Three Sword Style) */}
      <div className="fixed bottom-6 left-6 z-20 pointer-events-none select-none flex flex-col items-center space-y-1 font-sans font-black text-white/75 text-xl tracking-widest opacity-85">
        <span>三</span>
        <span>刀</span>
        <span>流</span>
        <span className="w-4 h-0.5 bg-orange-500 mt-1" />
      </div>

      {/* 5. Bottom-Right Interests Telemetry */}
      <div className="hidden lg:flex fixed bottom-6 right-36 z-20 pointer-events-none select-none flex-col font-mono text-[9px] text-white/35 space-y-0.5 tracking-widest text-left">
        <div>:: // CODE</div>
        <div>:: // ANIME</div>
        <div>:: // FILM</div>
        <div>:: // COFFEE</div>
        <div>:: // EXPLORE</div>
      </div>
    </div>
  );
}
