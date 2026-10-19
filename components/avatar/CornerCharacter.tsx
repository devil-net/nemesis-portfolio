"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TacticalAudio } from "@/lib/utils";

export default function CornerCharacter() {
  const pathname = usePathname();
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [mouseLook, setMouseLook] = useState({ x: 0, y: 0 });
  const [isAlerted, setIsAlerted] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);

  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if intro video is actively running on hero page
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const viewed = sessionStorage.getItem("nemesis_intro_viewed");
      if (!viewed) {
        setIntroPlaying(true);
        const interval = setInterval(() => {
          if (sessionStorage.getItem("nemesis_intro_viewed") === "true") {
            setIntroPlaying(false);
            clearInterval(interval);
          }
        }, 400);
        return () => clearInterval(interval);
      } else {
        setIntroPlaying(false);
      }
    } else {
      setIntroPlaying(false);
    }
  }, [pathname]);

  // 1. Natural Idle Blinking Cycle (Every 3 to 5 seconds)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        const nextInterval = Math.random() * 2700 + 2800;
        blinkTimeout = setTimeout(triggerBlink, nextInterval);
      }, 180);
    };

    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // 2. Mouse Tracking: Head & Eye glance subtly towards cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cornerX = window.innerWidth - 100;
      const cornerY = 80;
      const dx = (e.clientX - cornerX) / window.innerWidth;
      const dy = (e.clientY - cornerY) / window.innerHeight;

      setMouseLook({
        x: Math.max(-4, Math.min(4, dx * 10)),
        y: Math.max(-3, Math.min(3, dy * 8)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. Page Navigation reaction
  useEffect(() => {
    setIsAlerted(true);
    const timer = setTimeout(() => setIsAlerted(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  // 4. Click Playful Animation & Speech Bubble
  const handleClick = () => {
    TacticalAudio.playRadarPing();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);

    const quotes = [
      "Same blade, different worlds.",
      "devil-net online. systems nominal.",
      "ctOS perimeter secure.",
      "Target verified: 0xNEMESIS",
      "Always watching the code.",
    ];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    setBubbleText(picked);

    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setBubbleText(null);
    }, 3200);
  };

  if (introPlaying) return null;

  // Slim, compact, sharp-edged pillar dimensions
  const faceWidth = 96;
  const radius = faceWidth / 2; // 48px

  // SIDE 1 & 3: The Face Badge (Compact & Sharp)
  const renderFaceSide = (key: string, transformStyle: string) => (
    <div
      key={key}
      className={`absolute inset-0 rounded-none bg-[#0F0F13]/98 backdrop-blur-md border transition-colors duration-300 shadow-xl flex flex-col justify-between overflow-hidden ${
        isHovered
          ? "border-orange-500/80 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
          : "border-white/20"
      } ${isAlerted ? "ring-1 ring-orange-500" : ""}`}
      style={{
        transform: transformStyle,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Top Tab with NEMESIS and ■ 01 */}
      <div className="flex items-center justify-between px-2 pt-1.5 pb-1 border-b border-white/10 font-mono text-[9px]">
        <span className="font-sans font-black tracking-wider text-white text-[9.5px] uppercase">
          NEMESIS
        </span>
        <div className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-none" />
          <span className="text-[9px] text-white/70 font-bold">01</span>
        </div>
      </div>

      {/* Center Circular Moon Disc with Animated Character */}
      <div className="relative p-1.5 flex justify-center items-center my-auto">
        <div className="relative w-16 h-16 rounded-full bg-white overflow-hidden shadow-inner flex items-center justify-center">
          <img
            src="/images/avatar.jpg"
            alt="Nemesis Operative"
            className="w-full h-full object-cover scale-[1.58] transition-transform duration-200"
            style={{
              transform: `scale(1.58) translate(${mouseLook.x * 0.4}px, ${mouseLook.y * 0.3}px) rotate(${
                isHovered ? "-1deg" : "0deg"
              })`,
            }}
          />

          {/* Eyelid / Blink Animation */}
          <div
            className={`absolute inset-0 bg-white transition-opacity duration-75 pointer-events-none ${
              isBlinking ? "opacity-95" : "opacity-0"
            }`}
            style={{
              clipPath: "ellipse(48% 30% at 38% 46%)",
            }}
          />

          {/* Interactive Eye Glow on Hover */}
          <div
            className={`absolute top-[44%] left-[34%] w-1.5 h-1.5 rounded-full bg-orange-500 transition-all duration-200 pointer-events-none ${
              isHovered || isAlerted ? "opacity-90 scale-125 shadow-[0_0_6px_#EA580C]" : "opacity-0 scale-50"
            }`}
            style={{
              transform: `translate(${mouseLook.x * 0.5}px, ${mouseLook.y * 0.5}px)`,
            }}
          />

          {/* CRT scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_3px] pointer-events-none opacity-20" />
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="px-2 pb-1.5 pt-1 border-t border-white/10 flex items-center justify-between text-[7.5px] font-mono leading-tight text-white/50">
        <div>
          <div>CODE / CREATE</div>
          <div className="text-white/35">EXPLORE / CYBER</div>
        </div>
        <div className="w-3 h-3 border border-white/10 flex items-center justify-center overflow-hidden bg-white/5">
          <div className="w-4 h-4 bg-[repeating-linear-gradient(45deg,#EA580C,#EA580C_2px,transparent_2px,transparent_4px)] opacity-70" />
        </div>
      </div>
    </div>
  );

  // SIDE 2 & 4: Vertical Name, Script & Barcode (Slim & Sharp)
  const renderNameSide = (key: string, transformStyle: string) => (
    <div
      key={key}
      className={`absolute inset-0 rounded-none bg-[#09090C]/98 backdrop-blur-md border transition-colors duration-300 shadow-xl flex flex-col justify-between p-2 overflow-hidden ${
        isHovered ? "border-orange-500/80 shadow-[0_0_20px_rgba(234,88,12,0.3)]" : "border-white/20"
      }`}
      style={{
        transform: transformStyle,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Top Micro-Header */}
      <div className="flex items-center justify-between font-mono text-[8px] text-white/40 border-b border-white/10 pb-1">
        <span className="flex items-center space-x-1 text-orange-400 font-bold">
          <span className="w-1 h-1 bg-orange-500 animate-pulse" />
          <span>ctOS // 01</span>
        </span>
        <span className="text-[7.5px] text-white/30">SEC</span>
      </div>

      {/* Center Section: Parallel Vertical Columns (Vertical NEMESIS + Vertical Script + Barcode) */}
      <div className="my-auto py-1 flex items-center justify-around h-[105px]">
        {/* Column 1: Vertical NEMESIS */}
        <div className="flex flex-col items-center justify-between h-full font-sans font-black text-white text-[12px] tracking-widest uppercase leading-none select-none">
          {"NEMESIS".split("").map((char, i) => (
            <span key={i} className="hover:text-orange-400 transition-colors">
              {char}
            </span>
          ))}
        </div>

        {/* Column 2: Vertical Asian Script (生きろ - Ikiro from ID Card) */}
        <div className="flex flex-col items-center justify-around h-full font-sans font-black text-[#EDEDEF] text-[15px] opacity-90 select-none border-x border-white/10 px-1.5">
          <span className="hover:text-orange-400 transition-colors">生</span>
          <span className="hover:text-orange-400 transition-colors">き</span>
          <span className="hover:text-orange-400 transition-colors">ろ</span>
        </div>

        {/* Column 3: Sleek Vertical Barcode */}
        <div className="flex flex-col justify-center items-center h-full space-y-[2px] opacity-85">
          {[4, 2, 7, 2, 8, 3, 6, 2, 8, 3, 2, 7, 4, 8, 2, 6, 3].map((w, i) => (
            <div
              key={i}
              className="bg-white rounded-none"
              style={{
                height: i % 3 === 0 ? "2px" : i % 2 === 0 ? "1.5px" : "1px",
                width: `${w * 2.2}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Micro Serial */}
      <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[7px] font-mono text-white/40 tracking-wider">
        <span>NFSU-94720</span>
        <span className="text-orange-500 font-bold">ARMED</span>
      </div>
    </div>
  );

  return (
    <aside
      className="fixed top-3 right-3 sm:top-5 sm:right-6 z-40 select-none pointer-events-auto flex items-start space-x-6 sm:space-x-8 transition-transform duration-300"
      aria-label="Animated Corner Character"
    >
      <style jsx global>{`
        /* Pure horizontal revolve without any tilt */
        @keyframes slowPillarRevolve {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        .animate-slow-revolve {
          animation: slowPillarRevolve 16s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Handwritten Label with Curved Arrow - Moved further left to prevent any overlap */}
      <div className="hidden md:flex flex-col items-end pt-1.5 pr-2 pointer-events-none opacity-90 transition-opacity">
        <div className="flex items-center space-x-1.5 text-right font-mono text-[11px] leading-tight text-[#EDEDEF]">
          <span
            style={{
              fontFamily: "'Caveat', 'Architects Daughter', cursive, sans-serif",
              fontSize: "13.5px",
              letterSpacing: "0.5px",
            }}
            className="text-[#E5E5E7] tracking-wider whitespace-nowrap"
          >
            Same Blade.
            <br />
            Different Worlds. <span className="text-orange-400">†</span>
          </span>
        </div>

        {/* Hand-drawn double orange underline */}
        <svg width="85" height="11" viewBox="0 0 85 11" className="mt-0.5 opacity-90">
          <path d="M 4 3 Q 42 7 82 2" stroke="#EA580C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 10 7 Q 46 11 84 6" stroke="#EA580C" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>

        {/* Curved Arrow pointing cleanly towards the pillar */}
        <svg width="46" height="30" viewBox="0 0 46 30" className="mt-0.5 text-white/70 overflow-visible">
          <path
            d="M 4 2 Q 32 3 38 22"
            fill="none"
            stroke="#EDEDEF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          <path
            d="M 33 17 L 38 23 L 43 16"
            fill="none"
            stroke="#EDEDEF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Floating Tactical Speech Bubble on Click */}
      {bubbleText && (
        <div className="absolute -bottom-10 right-0 sm:right-auto sm:-left-44 bg-black/90 backdrop-blur-md border border-orange-500/80 rounded-xl px-3 py-1.5 text-[11px] font-mono text-orange-400 shadow-2xl shadow-orange-950/40 z-50 whitespace-nowrap animate-bounce">
          <span className="text-white/60 mr-1.5">›</span>
          {bubbleText}
        </div>
      )}

      {/* 3D Perspective Viewport */}
      <div
        className="relative group cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          TacticalAudio.playKeyClick("up");
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The 4-Sided Revolving Pillar: Slim, Sharp-Edged, Pure Horizontal Spin */}
        <div
          className={`relative w-[96px] h-[158px] animate-slow-revolve pause-on-hover transition-transform duration-300 ${
            isClicked ? "scale-90" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* ========================================================= */}
          {/* 4 SHARP FACES: FACE (0°), NAME (90°), FACE (180°), NAME (270°) */}
          {/* ========================================================= */}
          
          {/* SIDE 1 (0°): The Face Badge */}
          {renderFaceSide("face-front", `rotateY(0deg) translateZ(${radius}px)`)}

          {/* SIDE 2 (90°): Vertical Name & Script & Barcode */}
          {renderNameSide("name-right", `rotateY(90deg) translateZ(${radius}px)`)}

          {/* SIDE 3 (180°): The Face Badge (Repeated) */}
          {renderFaceSide("face-back", `rotateY(180deg) translateZ(${radius}px)`)}

          {/* SIDE 4 (270°): Vertical Name & Script & Barcode (Repeated) */}
          {renderNameSide("name-left", `rotateY(270deg) translateZ(${radius}px)`)}

          {/* Top Sharp Cap (Flush & Clean) */}
          <div
            className="absolute top-0 left-0 bg-[#161620] border-t border-white/20"
            style={{
              width: `${faceWidth}px`,
              height: `${faceWidth}px`,
              transform: `rotateX(90deg) translateZ(${radius}px)`,
              transformOrigin: "top center",
            }}
          />
          {/* Note: Protruding bottom cap removed to eliminate the floating diamond/tile shadow */}
        </div>

        {/* 4-Point Sparkle Star on Bottom-Left */}
        <div className="absolute -bottom-2 -left-2 text-orange-500 text-xs pointer-events-none animate-pulse">
          ✦
        </div>
      </div>
    </aside>
  );
}
