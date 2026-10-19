"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, SkipForward, Play } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<"playing" | "flash-white" | "fade-orange" | "done">("playing");
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Attempt auto-play
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser blocked autoplay
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleTriggerFade();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);

    // If video is within 0.4s of end, initiate fade transition
    if (duration > 0 && current >= duration - 0.4 && phase === "playing") {
      handleTriggerFade();
    }
  };

  const handleTriggerFade = () => {
    if (phase !== "playing") return;
    // Step 1: Flash to high-contrast white/monochrome CRT scanline burst
    setPhase("flash-white");

    setTimeout(() => {
      // Step 2: Transition from B&W to tactical deep Black & Orange
      setPhase("fade-orange");

      setTimeout(() => {
        // Step 3: Complete transition to reveal terminal
        setPhase("done");
        onComplete();
      }, 1000);
    }, 450);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden transition-all duration-1000 select-none ${
        phase === "fade-orange"
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* 1. Cinematic Video Layer */}
      <video
        ref={videoRef}
        src="/video/intro.mp4"
        autoPlay
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTriggerFade}
        className={`w-full h-full object-cover transition-all duration-700 ${
          phase === "flash-white"
            ? "brightness-200 contrast-200 invert"
            : phase === "fade-orange"
            ? "opacity-0 filter blur-sm"
            : "opacity-100"
        }`}
      />

      {/* 2. White CRT Flash Wash (White to Black Shift) */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 pointer-events-none ${
          phase === "flash-white" ? "opacity-95" : "opacity-0"
        }`}
      />

      {/* 3. Tactical Black & Orange Wave Transition Overlay */}
      <div
        className={`absolute inset-0 bg-[#0E0E10] transition-opacity duration-700 pointer-events-none ${
          phase === "fade-orange" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/30 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-orange-500 text-sm tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span>NEMESIS INITIALIZING // TERMINAL ENGAGED</span>
          </div>
        </div>
      </div>

      {/* 4. Film Grain / CRT Scanlines on Video */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-40" />

      {/* 5. Minimal HUD Controls on Video */}
      {phase === "playing" && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 z-20">
          {/* Top Bar: Operative Header & Skip */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3 text-xs font-mono text-white/70">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="tracking-widest uppercase">CLASSIFIED TRANSMISSION // NEMESIS</span>
            </div>

            <div className="flex items-center space-x-3 pointer-events-auto">
              <button
                onClick={toggleAudio}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-mono text-white transition-colors"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/70" /> : <Volume2 className="w-3.5 h-3.5 text-orange-400" />}
                <span className="text-[11px]">{isMuted ? "UNMUTE" : "AUDIO ON"}</span>
              </button>

              <button
                onClick={handleTriggerFade}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-mono text-white hover:text-orange-400 transition-colors"
              >
                <span>SKIP</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Bar: Timeline & Hint */}
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-white/50 tracking-wider">
              <span>PRESS [ESC] OR CLICK TO ACCESS TERMINAL</span>
              <span>{Math.round(progress)}%</span>
            </div>
            {/* Smooth Progress Line */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
