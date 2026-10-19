"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioData, Project } from "@/portfolioData";
import { 
  Github, 
  ExternalLink, 
  Image as ImageIcon, 
  X, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown,
  ShieldAlert,
  Terminal,
  Code2,
  ArrowRight
} from "lucide-react";

// Project Screenshots Mapping
const PROJECT_SCREENSHOTS: Record<string, string[]> = {
  "proj-02": [
    "/projects/byteshark/Screenshot 2026-09-07 005249.png",
    "/projects/byteshark/Screenshot 2026-09-07 005258.png",
    "/projects/byteshark/Screenshot 2026-09-07 005304.png",
    "/projects/byteshark/Screenshot 2026-09-07 005314.png",
  ],
  "proj-05": [
    "/projects/hidden bytes/Screenshot 2026-09-04 170724.png",
    "/projects/hidden bytes/Screenshot 2026-09-04 184923.png",
    "/projects/hidden bytes/Screenshot 2026-09-04 185030.png",
    "/projects/hidden bytes/Screenshot 2026-09-04 190350.png",
  ],
};

// Tactical background codes
const PROJECT_THEMES = [
  { gradient: "from-[#1a120b] via-[#0f0e13] to-[#0a0a0c]", accent: "#EA580C", code: "0xPROTO-01" },
  { gradient: "from-[#0d161d] via-[#0f0e13] to-[#0a0a0c]", accent: "#0284C7", code: "0xSHARK-02" },
  { gradient: "from-[#140e1b] via-[#0f0e13] to-[#0a0a0c]", accent: "#9333EA", code: "0xFORENSIC-03" },
  { gradient: "from-[#0b1713] via-[#0f0e13] to-[#0a0a0c]", accent: "#10B981", code: "0xVERI-04" },
  { gradient: "from-[#1a0f12] via-[#0f0e13] to-[#0a0a0c]", accent: "#E11D48", code: "0xSTEGO-05" },
  { gradient: "from-[#19150c] via-[#0f0e13] to-[#0a0a0c]", accent: "#F59E0B", code: "0xPOCKET-06" },
];

export default function ProjectsPage() {
  const projects = portfolioData.projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const turnAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastScrollTime = useRef<number>(0);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize Audio Assets (Scraped from huyml.co)
  useEffect(() => {
    hoverAudioRef.current = new Audio("/sounds/page-hover.mp3");
    turnAudioRef.current = new Audio("/sounds/page-turn.mp3");

    if (hoverAudioRef.current) hoverAudioRef.current.volume = 0.35;
    if (turnAudioRef.current) turnAudioRef.current.volume = 0.45;
  }, []);

  const playHoverSound = () => {
    if (!audioEnabled || !hoverAudioRef.current) return;
    try {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(() => {});
    } catch {}
  };

  const playTurnSound = () => {
    if (!audioEnabled || !turnAudioRef.current) return;
    try {
      turnAudioRef.current.currentTime = 0;
      turnAudioRef.current.play().catch(() => {});
    } catch {}
  };

  const changeProject = (newIndex: number) => {
    if (newIndex === activeIndex || newIndex < 0 || newIndex >= projects.length) return;
    playTurnSound();
    setActiveIndex(newIndex);
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        changeProject((activeIndex + 1) % projects.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        changeProject((activeIndex - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Mouse wheel listener on center card deck with 400ms debounce
  const handleWheelOnDeck = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 420) return;

    if (e.deltaY > 20) {
      // Scroll Down -> Next project
      if (activeIndex < projects.length - 1) {
        lastScrollTime.current = now;
        changeProject(activeIndex + 1);
      }
    } else if (e.deltaY < -20) {
      // Scroll Up -> Prev project
      if (activeIndex > 0) {
        lastScrollTime.current = now;
        changeProject(activeIndex - 1);
      }
    }
  };

  // Scroll active list item into view when activeIndex changes
  useEffect(() => {
    if (listContainerRef.current) {
      const activeEl = listContainerRef.current.querySelector(`[data-project-idx="${activeIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeIndex]);

  const activeProject = projects[activeIndex];
  const activeTheme = PROJECT_THEMES[activeIndex % PROJECT_THEMES.length];
  const screenshots = PROJECT_SCREENSHOTS[activeProject.id] || [];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 py-6 overflow-hidden select-none">
      {/* 1. Header Bar: Minimal Editorial Header matching huyml.co */}
      <header className="relative z-20 flex items-center justify-between border-b border-white/5 pb-4">
        {/* Left: Tactical Brand / Codename */}
        <div className="flex items-center space-x-3">
          <span className="font-sans font-black text-xs sm:text-sm tracking-wider text-white">
            NEMESIS®
          </span>
          <span className="text-[10px] font-mono text-white/40 uppercase hidden sm:inline">
            ARCHIVE 2026 // CYBERSECURITY & SYSTEMS
          </span>
        </div>

        {/* Center: Instruction indicator */}
        <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>SCROLL CENTER CARD OR CLICK DIAGONAL PAGES TO FLIP</span>
        </div>

        {/* Right: Working Audio Toggle */}
        <button
          onClick={() => {
            setAudioEnabled(!audioEnabled);
            playTurnSound();
          }}
          className="flex items-center space-x-2 text-xs font-mono text-white/80 hover:text-orange-400 transition-colors py-1 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-orange-400" />
              <span>Audio On —</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
              <span>Audio Off —</span>
            </>
          )}
        </button>
      </header>

      {/* 2. Main 3-Column Work Layout */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center py-6">
        
        {/* LEFT COLUMN (3.5 cols): Dynamic Project Details (Synced to Active Card) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6 text-left">
          {/* Metadata Specs */}
          <div className="space-y-5">
            {/* Category Tag */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 block mb-1">
                Classification
              </span>
              <p className="text-sm font-sans font-bold text-white tracking-wide">
                {activeProject.category}
              </p>
            </div>

            {/* Subtitle / Focus */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-1">
                Objective
              </span>
              <p className="text-sm font-mono text-[#D4D4D8] leading-relaxed">
                {activeProject.subtitle}
              </p>
            </div>

            {/* Key Capabilities */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-1.5">
                Execution
              </span>
              <ul className="space-y-1.5 text-xs font-mono text-white/70">
                {activeProject.highlights.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-orange-500 mt-0.5">›</span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-1.5">
                Toolchain
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Forensic Artifacts Trigger (if available) */}
            {screenshots.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 block mb-1.5">
                  Evidence Artifacts
                </span>
                <div className="flex gap-2">
                  {screenshots.slice(0, 3).map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveModalImage(imgSrc)}
                      className="group relative w-16 h-12 rounded-lg overflow-hidden border border-white/20 hover:border-orange-500 transition-all bg-black"
                    >
                      <img
                        src={imgSrc}
                        alt="Evidence Capture"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left: Huge Huyml-Style Editorial Counter */}
          <div className="pt-4 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/40 block pb-1 font-mono">
              Selected Work
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-6xl sm:text-7xl font-sans font-black tracking-tight text-white">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xl font-mono text-white/30">
                /{String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER STAGE (5 cols): DIAGONAL BOOK SPREAD CARD DECK */}
        <div
          onWheel={handleWheelOnDeck}
          className="lg:col-span-5 relative w-full h-[520px] flex items-center justify-center perspective-[1400px] cursor-grab active:cursor-grabbing"
        >
          {projects.map((proj, idx) => {
            const isCenter = idx === activeIndex;
            const isUpcoming = idx > activeIndex;
            const isCompleted = idx < activeIndex;

            // Compute diagonal book offsets
            let transformStyle = "";
            let zIndex = 10;
            let opacity = 1;
            let pointerEvents: "auto" | "none" = "none";

            if (isCenter) {
              // Active Center Card
              transformStyle = "translate3d(0px, 0px, 40px) rotate(0deg) scale(1)";
              zIndex = 40;
              opacity = 1;
              pointerEvents = "auto";
            } else if (isUpcoming) {
              // Upcoming Cards: Fan up and to the right diagonally!
              const diff = idx - activeIndex;
              const offsetX = Math.min(diff * 42, 140);
              const offsetY = -Math.min(diff * 42, 140);
              const rotateDeg = Math.min(diff * 5, 16);
              const scale = Math.max(0.68, 1 - diff * 0.08);

              transformStyle = `translate3d(${offsetX}px, ${offsetY}px, ${-diff * 35}px) rotate(${rotateDeg}deg) scale(${scale})`;
              zIndex = 30 - diff;
              opacity = Math.max(0.2, 0.85 - diff * 0.22);
              pointerEvents = diff <= 2 ? "auto" : "none";
            } else if (isCompleted) {
              // Completed Cards: Fan down and to the left diagonally!
              const diff = activeIndex - idx;
              const offsetX = -Math.min(diff * 46, 150);
              const offsetY = Math.min(diff * 46, 150);
              const rotateDeg = -Math.min(diff * 6, 18);
              const scale = Math.max(0.68, 1 - diff * 0.08);

              transformStyle = `translate3d(${offsetX}px, ${offsetY}px, ${-diff * 35}px) rotate(${rotateDeg}deg) scale(${scale})`;
              zIndex = 20 - diff;
              opacity = Math.max(0.2, 0.8 - diff * 0.25);
              pointerEvents = diff <= 2 ? "auto" : "none";
            }

            const theme = PROJECT_THEMES[idx % PROJECT_THEMES.length];

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (!isCenter) changeProject(idx);
                }}
                className={`absolute w-full max-w-[420px] aspect-[4/5] rounded-3xl p-7 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] border ${
                  isCenter
                    ? "border-white/20 shadow-2xl ring-1 ring-orange-500/20"
                    : "border-white/10 shadow-xl hover:border-orange-500/50 cursor-pointer"
                }`}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity,
                  pointerEvents,
                  background: "linear-gradient(145deg, #16151B 0%, #0D0D11 60%, #08080A 100%)",
                  boxShadow: isCenter
                    ? "0 35px 70px -15px rgba(0, 0, 0, 0.9), 0 0 45px -10px rgba(234, 88, 12, 0.2)"
                    : "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Corner Crosshairs */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-white/20 select-none">+</div>
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/20 select-none">+</div>
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/20 select-none">+</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/20 select-none">+</div>

                {/* Subtle Card Header */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-orange-400 font-bold text-[10px] tracking-wider">
                    {theme.code}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    {isCenter ? "ACTIVE DOSSIER" : isUpcoming ? "UPCOMING PAGE" : "COMPLETED ARCHIVE"}
                  </span>
                </div>

                {/* Center Content: Bold Project Title */}
                <div className="relative z-10 my-auto py-4 space-y-4 text-center">
                  <div className="inline-block px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-[10px] font-mono text-orange-400 tracking-widest uppercase">
                    {proj.category}
                  </div>

                  {/* Prominent Bold Title */}
                  <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white leading-tight uppercase">
                    {proj.title}
                  </h2>

                  <p className="text-xs font-mono text-orange-500/90 font-medium max-w-xs mx-auto">
                    {proj.subtitle}
                  </p>

                  {/* Graphical Matrix Scanline Indicator */}
                  <div className="pt-2 flex justify-center space-x-1.5 opacity-60">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="w-8 h-1.5 rounded-full bg-white/20" />
                    <span className="w-12 h-1.5 rounded-full bg-orange-500/40" />
                    <span className="w-4 h-1.5 rounded-full bg-white/20" />
                  </div>
                </div>

                {/* Card Bottom Links */}
                <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playHoverSound();
                    }}
                    className="flex items-center space-x-1.5 text-white/70 hover:text-orange-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>SOURCE REPO</span>
                  </a>

                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-orange-400 hover:text-orange-300 font-bold"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                      NFSU VERIFIED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN (3.5 cols): Vertical Editorial Project List (huyml.co style) */}
        <div
          ref={listContainerRef}
          className="lg:col-span-3 flex flex-col space-y-4 max-h-[550px] overflow-y-auto pr-2 no-scrollbar"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={project.id}
                data-project-idx={idx}
                onMouseEnter={() => playHoverSound()}
                onClick={() => changeProject(idx)}
                className={`cursor-pointer transition-all duration-300 py-3 px-3 rounded-xl text-left group ${
                  isActive
                    ? "bg-white/5 border-l-2 border-orange-500 opacity-100 translate-x-1"
                    : "opacity-35 hover:opacity-85 translate-x-0 hover:bg-white/[0.02]"
                }`}
              >
                {/* Category & Index */}
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1 flex items-center justify-between">
                  <span>0{idx + 1} // {project.category}</span>
                  {isActive && <ArrowRight className="w-3 h-3 text-orange-500 animate-pulse" />}
                </div>

                {/* Project Title */}
                <h3 className={`text-base font-sans font-bold uppercase tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                }`}>
                  {project.title}
                </h3>

                {/* Subtitle brief */}
                <p className="text-[11px] font-mono text-white/40 line-clamp-1 mt-0.5">
                  {project.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3. Footer Hint */}
      <footer className="relative z-20 flex items-center justify-between border-t border-white/5 pt-4 text-[10px] font-mono text-white/40">
        <div className="flex items-center space-x-2">
          <span>USE ARROW KEYS [↑ / ↓] OR WHEEL TO FLIP PAGES</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>TOTAL MISSIONS: {projects.length}</span>
          <span className="text-orange-500 font-bold">ALL SYSTEMS SECURE</span>
        </div>
      </footer>

      {/* 4. Fullscreen Screenshot Lightbox Modal */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#141418] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
              <span className="text-xs font-mono text-orange-400 font-bold tracking-wider">
                FORENSIC EVIDENCE CAPTURE // {activeProject.title}
              </span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex justify-center items-center bg-black/60 max-h-[75vh] overflow-auto">
              <img
                src={activeModalImage}
                alt="Evidence Detail"
                className="max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
