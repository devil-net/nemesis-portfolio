"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioData, CertificationMilestone } from "@/portfolioData";
import { 
  Award, 
  ExternalLink, 
  FileCheck, 
  Copy, 
  Check, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  Eye, 
  X,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { TacticalAudio } from "@/lib/utils";

// PDF Certificate file mapping
const CERT_PDFS: Record<string, string> = {
  "mile-01": "/certificates/delloit simulation.pdf",
  "mile-02": "/certificates/mcp.pdf",
  "mile-03": "/certificates/Introduction to Network Analysis-course.pdf",
  "mile-04": "/certificates/Introduction to OSINT-course.pdf",
  "mile-05": "/certificates/solution architect.pdf",
  "mile-06": "/certificates/pre security.pdf",
  "mile-07": "/certificates/chatgpt.pdf",
};

const CAT_IDLE_MESSAGES = [
  "Meow! Analyzing PCAP traffic...",
  "Clearance Level 5 verified. Proceeding along the Grand Line.",
  "Sniffing packets for covert channels...",
  "Purr... Decrypted waypoint credentials.",
  "Tactical Cat standing by: Nemesis operative online.",
  "Target locked! Scroll to navigate trail.",
];

export default function CertificationsAchievementsPage() {
  const { treasureMapMilestones } = portfolioData;
  const [selectedMilestone, setSelectedMilestone] = useState<CertificationMilestone | null>(null);
  const [activeCertPdf, setActiveCertPdf] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Terminal Cat State
  const [catPos, setCatPos] = useState({ x: 180, y: 150 });
  const [catDirection, setCatDirection] = useState<"forward" | "backward">("forward");
  const [isCatRunning, setIsCatRunning] = useState(false);
  const [catSpeech, setCatSpeech] = useState(CAT_IDLE_MESSAGES[0]);
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("mile-01");

  const trailPathRef = useRef<SVGPathElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  // Scroll Tracking & Cat Movement along SVG Path
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = Math.min(1, Math.max(0, scrollY / (docHeight || 1)));

      // Determine forward or backward
      if (scrollY > lastScrollY.current) {
        setCatDirection("forward");
      } else if (scrollY < lastScrollY.current) {
        setCatDirection("backward");
      }
      lastScrollY.current = scrollY;
      setIsCatRunning(true);

      // Track Cat along the SVG Path
      if (trailPathRef.current) {
        const totalLength = trailPathRef.current.getTotalLength();
        const currentLength = totalLength * scrollPct;
        const pt = trailPathRef.current.getPointAtLength(currentLength);
        setCatPos({ x: pt.x, y: pt.y });

        // Check proximity to milestones
        treasureMapMilestones.forEach((m) => {
          const dist = Math.hypot(m.coordinate.x - pt.x, m.coordinate.y - pt.y);
          if (dist < 80 && activeMilestoneId !== m.id) {
            setActiveMilestoneId(m.id);
            TacticalAudio.playRadarPing();
          }
        });
      }

      // Idle Cat Speech Bubble logic
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsCatRunning(false);
        const randomMsg =
          CAT_IDLE_MESSAGES[Math.floor(Math.random() * CAT_IDLE_MESSAGES.length)];
        setCatSpeech(randomMsg);
      }, 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeMilestoneId, treasureMapMilestones]);

  const copyCredential = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    TacticalAudio.playTerminalBeep(920, 0.04);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#282830] pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-tactical-orange/20 text-tactical-orange border border-tactical-orange/40 uppercase">
              DIRECTORY // certifications-and-achievements/
            </span>
            <span className="text-text-secondary text-xs font-mono">
              7 GRAND LINE WAYPOINTS
            </span>
          </div>
          <h1 className="text-3xl font-sans font-bold text-text-primary">
            TREASURE MAP TRAIL & CERTIFICATES
          </h1>
          <p className="text-xs font-mono text-text-secondary">
            Winding SVG Trail • Accompanied by Nemesis Terminal Cat • Deloitte, Anthropic MCP, Security Blue Team & AWS
          </p>
        </div>

        {/* Tactical Legend */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#121216] border border-[#282830]">
            <span className="w-2.5 h-2.5 rounded-full bg-tactical-orange shadow-orange-glow animate-pulse" />
            <span className="text-tactical-orange font-bold">TERMINAL CAT ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Treasure Map Container */}
      <div className="relative rounded-2xl border border-[#282830] bg-[#101014] p-4 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background Vintage Nautical / Cyber Grid */}
        <div className="absolute inset-0 tactical-blueprint-grid opacity-25 pointer-events-none" />

        {/* Ambient Map Accents: Compass Rose Top Right */}
        <div className="absolute top-6 right-6 opacity-30 pointer-events-none">
          <Compass className="w-24 h-24 text-tactical-orange" />
        </div>

        {/* Interactive SVG Treasure Map Trail */}
        <div className="relative w-full overflow-x-auto no-scrollbar">
          <svg
            viewBox="0 0 800 1420"
            className="w-full min-w-[700px] h-[1420px] select-none"
          >
            <defs>
              <filter id="cat-eye-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="waypoint-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Winding Trail Path (Grand Line Treasure Path) */}
            <path
              ref={trailPathRef}
              d="M 180 150 C 350 200, 520 240, 620 320 C 720 400, 320 420, 220 510 C 120 600, 560 620, 660 690 C 760 760, 360 800, 240 880 C 120 960, 520 980, 600 1060 C 680 1140, 480 1180, 400 1250"
              fill="none"
              stroke="#26262B"
              strokeWidth="4"
              strokeDasharray="8 8"
            />

            {/* Glowing Active Segment overlay */}
            <path
              d="M 180 150 C 350 200, 520 240, 620 320 C 720 400, 320 420, 220 510 C 120 600, 560 620, 660 690 C 760 760, 360 800, 240 880 C 120 960, 520 980, 600 1060 C 680 1140, 480 1180, 400 1250"
              fill="none"
              stroke="#FF5500"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              opacity="0.4"
            />

            {/* 7 MILESTONE NODES ALONG THE TRAIL */}
            {treasureMapMilestones.map((milestone, idx) => {
              const isActive = activeMilestoneId === milestone.id;
              const { x, y } = milestone.coordinate;

              return (
                <g
                  key={milestone.id}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    setSelectedMilestone(milestone);
                    TacticalAudio.playRadarPing();
                  }}
                >
                  {/* Outer Radar Ripple */}
                  {isActive && (
                    <circle
                      r="36"
                      fill="none"
                      stroke="#FF5500"
                      strokeWidth="1.5"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}

                  {/* Node Glow Outer Ring */}
                  <circle
                    r="24"
                    fill={isActive ? "#FF5500" : "#1A1A22"}
                    stroke={isActive ? "#FFAA33" : "#383842"}
                    strokeWidth={isActive ? "3" : "1.5"}
                    filter={isActive ? "url(#waypoint-glow)" : undefined}
                    className="transition-all duration-300 group-hover:scale-110"
                  />

                  {/* Center Number Marker */}
                  <text
                    x="0"
                    y="1"
                    fill={isActive ? "#0E0E10" : "#EDEDEF"}
                    fontSize="13"
                    fontFamily="var(--font-mono), monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    0{idx + 1}
                  </text>

                  {/* Waypoint Text Label (Offset to avoid overlapping path) */}
                  <g transform={`translate(${x > 400 ? -220 : 35}, -12)`}>
                    <rect
                      width="190"
                      height="46"
                      rx="6"
                      fill="#0C0C10"
                      stroke={isActive ? "#FF5500" : "#26262B"}
                      strokeWidth={isActive ? "1.5" : "1"}
                      opacity="0.95"
                    />
                    <text
                      x="10"
                      y="18"
                      fill={isActive ? "#FF5500" : "#EDEDEF"}
                      fontSize="10"
                      fontFamily="var(--font-mono), monospace"
                      fontWeight="bold"
                    >
                      {milestone.title.length > 24
                        ? milestone.title.slice(0, 24) + "..."
                        : milestone.title}
                    </text>
                    <text
                      x="10"
                      y="32"
                      fill="#8E8E98"
                      fontSize="9"
                      fontFamily="var(--font-mono), monospace"
                    >
                      {milestone.issuer} • {milestone.issueDate.split(",")[0]}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* THE ANIMATED TERMINAL CAT SPRITE */}
            <g
              transform={`translate(${catPos.x}, ${catPos.y})`}
              className="transition-transform duration-75 pointer-events-none"
            >
              <g
                transform={`scale(${catDirection === "forward" ? 1 : -1}, 1)`}
                className="transition-transform"
              >
                {/* Cat Shadow */}
                <ellipse cx="0" cy="18" rx="16" ry="6" fill="#000000" opacity="0.6" />

                {/* Cat Tail (Wagging/Twitching) */}
                <path
                  d="M -12 8 Q -24 0, -22 -14"
                  fill="none"
                  stroke="#121215"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className={isCatRunning ? "animate-pulse" : ""}
                />

                {/* Cat Body */}
                <ellipse cx="0" cy="6" rx="15" ry="11" fill="#141418" stroke="#FF5500" strokeWidth="1.2" />

                {/* Cat Head */}
                <circle cx="9" cy="-3" r="10" fill="#141418" stroke="#FF5500" strokeWidth="1.2" />

                {/* Cat Ears */}
                <polygon points="5,-11 9,-18 13,-10" fill="#141418" stroke="#FF5500" strokeWidth="1" />
                <polygon points="12,-10 16,-17 19,-8" fill="#141418" stroke="#FF5500" strokeWidth="1" />

                {/* Glowing Tactical Orange Eyes */}
                <circle cx="8" cy="-3" r="2.2" fill="#FF5500" filter="url(#cat-eye-glow)" />
                <circle cx="13" cy="-3" r="2.2" fill="#FF5500" filter="url(#cat-eye-glow)" />

                {/* Tactical Whiskers */}
                <line x1="14" y1="-1" x2="22" y2="-2" stroke="#FF8800" strokeWidth="0.8" opacity="0.8" />
                <line x1="14" y1="1" x2="22" y2="2" stroke="#FF8800" strokeWidth="0.8" opacity="0.8" />

                {/* Cat Paws (Running cycle) */}
                <circle cx="-6" cy="16" r="3" fill="#FF5500" />
                <circle cx="6" cy="16" r="3" fill="#FF5500" />
              </g>

              {/* Terminal Speech Bubble Above Cat */}
              <g transform="translate(0, -35)">
                <rect
                  x="-110"
                  y="-18"
                  width="220"
                  height="26"
                  rx="4"
                  fill="#0B0B0E"
                  stroke="#FF5500"
                  strokeWidth="1.2"
                />
                <polygon points="-4,8 0,14 4,8" fill="#0B0B0E" />
                <text
                  x="0"
                  y="-2"
                  fill="#EDEDEF"
                  fontSize="9.5"
                  fontFamily="var(--font-mono), monospace"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="bold"
                >
                  {catSpeech}
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Milestones Cards Grid (Direct inspection & PDF viewer trigger) */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm font-mono text-tactical-orange font-bold">
          <Award className="w-4 h-4" />
          <span>ALL 7 VERIFIED MILESTONE DOSSIERS // FULL METRICS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treasureMapMilestones.map((m, idx) => {
            const pdfFile = CERT_PDFS[m.id];
            return (
              <div
                key={m.id}
                className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 border-l-2 border-l-orange-500/40 hover:border-l-orange-500 transition-all space-y-3 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-orange-500/30 text-orange-400 font-bold">
                      WAYPOINT 0{idx + 1}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {m.badgeType}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-text-primary group-hover:text-orange-400 transition-colors">
                    {m.title}
                  </h3>

                  <div className="text-xs font-mono text-text-secondary">
                    {m.issuer} • <span className="text-text-primary">{m.issueDate}</span>
                  </div>

                  <p className="text-xs font-sans text-text-secondary leading-relaxed pt-1">
                    {m.details}
                  </p>
                </div>

                {/* Credential ID Bar */}
                <div className="space-y-2 pt-3 border-t border-white/5 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-text-secondary truncate mr-2">
                      ID: {m.credentialId}
                    </span>
                    <button
                      onClick={() => copyCredential(m.credentialId)}
                      className="text-orange-500 hover:text-orange-400 p-1 rounded hover:bg-white/5 transition-colors"
                      title="Copy Credential ID"
                    >
                      {copiedId === m.credentialId ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {pdfFile && (
                      <a
                        href={pdfFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => TacticalAudio.playRadarPing()}
                        className="flex-1 py-1.5 px-2 rounded bg-tactical-orange/15 hover:bg-tactical-orange hover:text-background border border-tactical-orange/40 text-tactical-orange text-center font-bold text-[11px] transition-all flex items-center justify-center space-x-1"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>VIEW CERTIFICATE PDF</span>
                      </a>
                    )}

                    {m.verifyUrl && (
                      <a
                        href={m.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-surface hover:text-tactical-orange border border-[#282830] text-text-secondary transition-colors"
                        title="Official Verification Link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
