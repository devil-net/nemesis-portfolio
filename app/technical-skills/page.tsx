"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/portfolioData";
import { 
  Network, 
  Sun, 
  Skull, 
  Terminal, 
  Search, 
  Layers, 
  Compass, 
  Cpu, 
  ShieldAlert, 
  Info,
  Sparkles,
  GitBranch
} from "lucide-react";
import gsap from "gsap";
import { TacticalAudio } from "@/lib/utils";

// Tactical skill descriptions and application mapping
const SKILL_APPLICATIONS: Record<string, { role: string; project?: string; level: string }> = {
  "Python": { role: "Forensic scripting, automated PCAP parsing, security tooling", project: "ByteShark", level: "Advanced" },
  "C / C++": { role: "Low-level system programming, binary inspection, memory analysis", project: "Research", level: "Advanced" },
  "JavaScript": { role: "Full-stack application development, Electron, React", project: "ByteShark / Veriscope", level: "Advanced" },
  "Bash": { role: "Linux automation, CTF scripts, environment orchestration", project: "Cyber Pocket Lab", level: "Advanced" },
  "C#": { role: "Desktop GUI development, Windows API integration", project: "CyberForensics Workstation", level: "Proficient" },
  "Linux": { role: "Primary development OS, kernel analysis, server administration", project: "All Projects", level: "Expert" },
  "Kali Linux": { role: "Offensive toolchain, penetration testing, CTF operations", project: "Security Labs", level: "Advanced" },
  "Windows": { role: "Forensic host analysis, WPF workstations, registry inspection", project: "CyberForensics Workstation", level: "Proficient" },
  "React": { role: "Interactive tactical UI, component architecture", project: "Veriscope / ByteShark", level: "Advanced" },
  "Tailwind CSS": { role: "Tactical dark-mode styling, design token systems", project: "Portfolio / Veriscope", level: "Expert" },
  "Electron": { role: "Cross-platform desktop application packaging", project: "ByteShark", level: "Proficient" },
  ".NET 8": { role: "Modern desktop runtime, forensic tool manifest", project: "CyberForensics Workstation", level: "Proficient" },
  "WPF": { role: "Windows Presentation Foundation desktop interface", project: "CyberForensics Workstation", level: "Proficient" },
  "Docker": { role: "Containerized forensic tools, sandbox testing", project: "Infra", level: "Advanced" },
  "Vercel": { role: "Production edge deployment and serverless pipelines", project: "Veriscope / Web", level: "Expert" },
  "Model Context Protocol (MCP)": { role: "Anthropic certified architecture for AI tool integration", project: "Certified (9u9a6y9zzfzy)", level: "Certified" },
  "NLP & Google AI Studio": { role: "Gemini API integration, intelligent security triage", project: "Cyber Pocket Lab", level: "Advanced" },
  "Sliver C2": { role: "Golang-based adversary simulation & implant generation", project: "Red Team Lab", level: "Operational" },
  "Havoc C2": { role: "Modern C2 framework with Demon agents", project: "Red Team Lab", level: "Operational" },
  "Metasploit Framework (msfconsole)": { role: "Exploit execution, payload delivery, auxiliary scanning", project: "TryHackMe / CTFs", level: "Advanced" },
  "Burp Suite": { role: "Web application penetration testing, request tampering", project: "CTFs & Audits", level: "Advanced" },
  "Ghidra": { role: "NSA reverse-engineering suite, decompilation, binary triage", project: "Forensics", level: "Advanced" },
  "Binary Ninja": { role: "Static & dynamic binary analysis, control-flow graphs", project: "Forensics", level: "Proficient" },
  "Autopsy": { role: "Digital forensic investigation, timeline analysis, disk triage", project: "NFSU Academic Labs", level: "Advanced" },
  "The Sleuth Kit (TSK)": { role: "Volume and file system analysis tools", project: "CyberForensics Workstation", level: "Advanced" },
  "PhotoRec": { role: "Carving deleted files and forensic data recovery", project: "CyberForensics Workstation", level: "Advanced" },
  "Steganography": { role: "Extracting hidden payloads in images, audio, and metadata", project: "The Hidden Bytes", level: "Specialist" },
  "Wireshark": { role: "Deep packet inspection, protocol dissection", project: "ByteShark / SBT Cert", level: "Expert" },
  "TCPDump": { role: "Command-line packet capture and network filtering", project: "SBT Network Analysis", level: "Advanced" },
  "PCAP Analysis": { role: "Investigating mock compromised systems & attack vectors", project: "ByteShark", level: "Specialist" },
  "ECDH & AES-256-GCM": { role: "Authenticated encryption, ephemeral key exchange", project: "Universal Share", level: "Architect" },
  "OSINT": { role: "Open-source intelligence gathering and asset discovery", project: "SBT OSINT Certified", level: "Certified" },
};

export default function TechnicalSkillsPage() {
  const { worldTreeSkills } = portfolioData;
  const [selectedNode, setSelectedNode] = useState<string>("Python");
  const [activeTab, setActiveTab] = useState<"tree" | "matrix">("tree");
  const [searchQuery, setSearchQuery] = useState("");
  const treeSvgRef = useRef<SVGSVGElement>(null);

  // GSAP Growth Animation on mount
  useEffect(() => {
    if (activeTab !== "tree" || !treeSvgRef.current) return;

    const ctx = gsap.context(() => {
      // Animate branch paths with stroke-dashoffset
      const paths = treeSvgRef.current?.querySelectorAll(".animated-tree-branch");
      if (paths && paths.length > 0) {
        paths.forEach((path) => {
          const el = path as SVGPathElement;
          const length = el.getTotalLength ? el.getTotalLength() : 400;
          gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.out",
            stagger: 0.1,
          });
        });
      }

      // Animate nodes popping in
      gsap.fromTo(
        ".tree-node-group",
        { scale: 0, transformOrigin: "center center", opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.03, ease: "back.out(1.7)", delay: 0.4 }
      );
    }, treeSvgRef);

    return () => ctx.revert();
  }, [activeTab]);

  const activeApp = SKILL_APPLICATIONS[selectedNode] || {
    role: "Core engineering and security vector",
    project: "Nemesis Architecture",
    level: "Advanced",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#282830] pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-tactical-orange/20 text-tactical-orange border border-tactical-orange/40 uppercase">
              DIRECTORY // technical-skills/
            </span>
            <span className="text-text-secondary text-xs font-mono">
              THE WORLD TREE ARCHITECTURE
            </span>
          </div>
          <h1 className="text-3xl font-sans font-bold text-text-primary">
            THE WORLD TREE // SKILL BLUEPRINT
          </h1>
          <p className="text-xs font-mono text-text-secondary">
            Inspired by One Piece • Upper Canopy (Radiant Web & Cloud) vs Underground Roots (Offensive & Forensics)
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-surface border border-[#282830] p-1 rounded-lg font-mono text-xs">
          <button
            onClick={() => {
              setActiveTab("tree");
              TacticalAudio.playTerminalBeep(700, 0.03);
            }}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-all ${
              activeTab === "tree"
                ? "bg-tactical-orange text-background font-bold shadow-orange-glow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>WORLD TREE SVG</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("matrix");
              TacticalAudio.playTerminalBeep(700, 0.03);
            }}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 transition-all ${
              activeTab === "matrix"
                ? "bg-tactical-orange text-background font-bold shadow-orange-glow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>TACTICAL MATRIX</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      {activeTab === "tree" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Interactive World Tree SVG */}
          <div className="lg:col-span-8 rounded-xl border border-[#282830] bg-[#101014] p-4 relative overflow-hidden shadow-2xl">
            {/* SVG Background Grid & Realm Labels */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-xs font-mono">
              <Sun className="w-4 h-4 text-glow-orange" />
              <span className="text-glow-orange font-bold uppercase">
                UPPER CANOPY (THE GOOD SIDE — WEB, CLOUD & AI)
              </span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-2 text-xs font-mono">
              <Skull className="w-4 h-4 text-crimson-ember" />
              <span className="text-crimson-ember font-bold uppercase">
                UNDERGROUND ROOTS (THE DARK SIDE — CYBER & FORENSICS)
              </span>
            </div>

            {/* Tree SVG Visualization */}
            <div className="w-full h-[680px] flex items-center justify-center">
              <svg
                ref={treeSvgRef}
                viewBox="0 0 1000 1100"
                className="w-full h-full select-none"
              >
                <defs>
                  {/* Glow Filters */}
                  <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="crimson-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Trunk Gradients */}
                  <linearGradient id="trunk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF8800" />
                    <stop offset="50%" stopColor="#FF5500" />
                    <stop offset="100%" stopColor="#CC1100" />
                  </linearGradient>

                  <linearGradient id="canopy-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FF5500" />
                    <stop offset="50%" stopColor="#FF8800" />
                    <stop offset="100%" stopColor="#FFAA33" />
                  </linearGradient>

                  <linearGradient id="root-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF3300" />
                    <stop offset="50%" stopColor="#E61900" />
                    <stop offset="100%" stopColor="#880000" />
                  </linearGradient>
                </defs>

                {/* Subterranean Grid Lines */}
                <g opacity="0.15">
                  {[720, 780, 840, 900, 960, 1020].map((y) => (
                    <line key={y} x1="50" y1={y} x2="950" y2={y} stroke="#FF2200" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                </g>

                {/* 1. UPPER CANOPY BRANCHES (Glowing upward #FF8800 to #FFAA33) */}
                <g>
                  {/* Left Canopy Major Branch (Web / Desktop) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 480 C 420 400, 260 380, 220 240 C 200 170, 150 140, 120 100"
                    fill="none"
                    stroke="url(#canopy-grad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#orange-glow)"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 330 360 C 280 320, 290 260, 280 200"
                    fill="none"
                    stroke="#FF8800"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 230 250 C 260 190, 360 170, 390 120"
                    fill="none"
                    stroke="#FF8800"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Center Canopy Major Branch (Cloud & AI) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 480 C 500 360, 500 240, 500 100"
                    fill="none"
                    stroke="#FFAA33"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    filter="url(#orange-glow)"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 500 320 C 440 260, 430 180, 460 120"
                    fill="none"
                    stroke="#FFAA33"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 500 280 C 560 230, 570 170, 550 120"
                    fill="none"
                    stroke="#FFAA33"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Right Canopy Major Branch (Expandable Hobbies) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 480 C 580 400, 740 380, 780 240 C 800 170, 850 140, 880 100"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    filter="url(#orange-glow)"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 670 360 C 720 320, 710 260, 720 200"
                    fill="none"
                    stroke="#F4F4F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>

                {/* Flowing Data Particles in Upper Branches */}
                <circle r="4" fill="#FFFFFF" filter="url(#orange-glow)">
                  <animateMotion
                    path="M 500 480 C 420 400, 260 380, 220 240 C 200 170, 150 140, 120 100"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="4" fill="#FFAA33" filter="url(#orange-glow)">
                  <animateMotion
                    path="M 500 480 C 500 360, 500 240, 500 100"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="4" fill="#FF8800" filter="url(#orange-glow)">
                  <animateMotion
                    path="M 500 480 C 580 400, 740 380, 780 240 C 800 170, 850 140, 880 100"
                    dur="3.6s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 2. CENTER TRUNK: Core Systems & Languages */}
                <g>
                  {/* Central Trunk Base Column */}
                  <path
                    d="M 470 480 Q 500 580 460 680 L 540 680 Q 500 580 530 480 Z"
                    fill="url(#trunk-grad)"
                    opacity="0.3"
                  />
                  <line
                    x1="500"
                    y1="480"
                    x2="500"
                    y2="680"
                    stroke="#FF5500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#orange-glow)"
                  />
                  <line
                    x1="480"
                    y1="510"
                    x2="480"
                    y2="650"
                    stroke="#FF7700"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <line
                    x1="520"
                    y1="510"
                    x2="520"
                    y2="650"
                    stroke="#FF7700"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                </g>

                {/* 3. UNDERGROUND ROOTS (Deep Crimson & Ember #FF2200 to #880000) */}
                <g>
                  {/* Root 1: Far Left (Red-Team C2) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 680 C 440 760, 280 780, 220 860 C 180 920, 150 980, 130 1050"
                    fill="none"
                    stroke="url(#root-grad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#crimson-glow)"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 330 800 C 270 850, 270 910, 250 980"
                    fill="none"
                    stroke="#E61900"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Root 2: Mid Left (Reverse Engineering) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 680 C 460 760, 420 840, 390 920 C 370 980, 360 1020, 360 1060"
                    fill="none"
                    stroke="#FF2200"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />

                  {/* Root 3: Mid Right (Digital Forensics) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 680 C 540 760, 580 840, 610 920 C 630 980, 640 1020, 640 1060"
                    fill="none"
                    stroke="#CC1100"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />

                  {/* Root 4: Far Right (Network Forensics & OSINT) */}
                  <path
                    className="animated-tree-branch"
                    d="M 500 680 C 560 760, 720 780, 780 860 C 820 920, 850 980, 870 1050"
                    fill="none"
                    stroke="url(#root-grad)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    filter="url(#crimson-glow)"
                  />
                  <path
                    className="animated-tree-branch"
                    d="M 670 800 C 730 850, 730 910, 750 980"
                    fill="none"
                    stroke="#E61900"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>

                {/* Subterranean Flowing Particles */}
                <circle r="4" fill="#FF2200" filter="url(#crimson-glow)">
                  <animateMotion
                    path="M 500 680 C 440 760, 280 780, 220 860 C 180 920, 150 980, 130 1050"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="4" fill="#E61900" filter="url(#crimson-glow)">
                  <animateMotion
                    path="M 500 680 C 560 760, 720 780, 780 860 C 820 920, 850 980, 870 1050"
                    dur="3.1s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 4. TREE NODES (Upper Canopy, Center Trunk, and Underground Roots) */}

                {/* UPPER CANOPY NODES */}
                {/* Web & Desktop (Left) */}
                {[
                  { name: "React", x: 120, y: 100 },
                  { name: "Vite", x: 220, y: 130 },
                  { name: "Electron", x: 280, y: 190 },
                  { name: ".NET 8", x: 170, y: 190 },
                  { name: "WPF", x: 120, y: 240 },
                  { name: "Tailwind CSS", x: 280, y: 250 },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#FF8800"
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* Cloud & AI (Center) */}
                {[
                  { name: "Docker", x: 440, y: 90 },
                  { name: "Vercel", x: 550, y: 90 },
                  { name: "Model Context Protocol (MCP)", x: 500, y: 160, isPill: true },
                  { name: "NLP & Google AI Studio", x: 500, y: 230, isPill: true },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#FFAA33"
                    isPill={node.isPill}
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* Hobbies & Inspirations (Right) */}
                {[
                  { name: "Anime Sketching", x: 880, y: 100 },
                  { name: "Nolan Film Analysis", x: 780, y: 140 },
                  { name: "CTF Challenge Design", x: 740, y: 200 },
                  { name: "Strategy Gaming", x: 840, y: 230 },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#FFFFFF"
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* CENTER TRUNK NODES (Core Languages & OS) */}
                {[
                  { name: "Python", x: 430, y: 510 },
                  { name: "Linux", x: 570, y: 510 },
                  { name: "C / C++", x: 430, y: 560 },
                  { name: "Kali Linux", x: 570, y: 560 },
                  { name: "JavaScript", x: 430, y: 610 },
                  { name: "Bash", x: 570, y: 610 },
                  { name: "C#", x: 440, y: 660 },
                  { name: "Windows", x: 560, y: 660 },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#FF5500"
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* UNDERGROUND ROOTS NODES (Offensive & Forensics) */}
                {/* Red Team / C2 (Far Left) */}
                {[
                  { name: "Sliver C2", x: 130, y: 1050 },
                  { name: "Havoc C2", x: 170, y: 970 },
                  { name: "Metasploit Framework (msfconsole)", x: 230, y: 900, isPill: true },
                  { name: "Burp Suite", x: 260, y: 830 },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#FF2200"
                    isPill={node.isPill}
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* Reverse Engineering (Mid Left) */}
                {[
                  { name: "Ghidra", x: 360, y: 1060 },
                  { name: "Binary Ninja", x: 370, y: 960 },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#E61900"
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* Digital Forensics (Mid Right) */}
                {[
                  { name: "Autopsy", x: 640, y: 1060 },
                  { name: "The Sleuth Kit (TSK)", x: 620, y: 960 },
                  { name: "PhotoRec", x: 570, y: 860 },
                  { name: "Steganography", x: 660, y: 880 },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#CC1100"
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}

                {/* Network Forensics & OSINT (Far Right) */}
                {[
                  { name: "OSINT", x: 870, y: 1050 },
                  { name: "Wireshark", x: 830, y: 970 },
                  { name: "TCPDump", x: 760, y: 920 },
                  { name: "PCAP Analysis", x: 770, y: 840 },
                  { name: "ECDH & AES-256-GCM", x: 690, y: 770, isPill: true },
                ].map((node) => (
                  <TreeNode
                    key={node.name}
                    name={node.name}
                    x={node.x}
                    y={node.y}
                    color="#FF4400"
                    isPill={node.isPill}
                    isSelected={selectedNode === node.name}
                    onClick={() => {
                      setSelectedNode(node.name);
                      TacticalAudio.playKeyClick("down");
                    }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Right Column (4 cols): Selected Node Inspector Card */}
          {/* Right Column: Node Details Panel (Seamless) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md p-6 font-mono text-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-500 font-bold uppercase tracking-wider">
                    NODE INSPECTION // HUD
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-orange-500/40 text-orange-400 text-[10px] font-bold">
                  {activeApp.level}
                </span>
              </div>

              {/* Node Title & Identity */}
              <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-l-orange-500 space-y-1.5">
                <div className="text-[10px] text-text-secondary uppercase">
                  ACTIVE SKILL VECTOR
                </div>
                <h3 className="text-xl font-sans font-bold text-text-primary">
                  {selectedNode}
                </h3>
                <div className="text-xs text-orange-400">
                  Realm:{" "}
                  {selectedNode in { Python: 1, Linux: 1, "C / C++": 1, "Kali Linux": 1, JavaScript: 1, Bash: 1, "C#": 1, Windows: 1 }
                    ? "Center Trunk (Core Systems & OS)"
                    : ["React", "Vite", "Electron", ".NET 8", "WPF", "Tailwind CSS", "Docker", "Vercel", "Model Context Protocol (MCP)", "NLP & Google AI Studio"].includes(selectedNode)
                    ? "Upper Canopy (Radiant Web & Cloud)"
                    : "Underground Roots (Offensive & Forensics)"}
                </div>
              </div>

              {/* Tactical Usage Details */}
              <div className="space-y-3">
                <div className="border-l border-white/10 pl-3 py-1 space-y-1">
                  <div className="text-[10px] text-text-secondary uppercase">
                    TACTICAL ROLE & PURPOSE
                  </div>
                  <div className="text-text-primary font-sans leading-relaxed">
                    {activeApp.role}
                  </div>
                </div>

                {activeApp.project && (
                  <div className="border-l border-orange-500/50 pl-3 py-1 space-y-1">
                    <div className="text-[10px] text-text-secondary uppercase">
                      APPLIED PROJECT / VERIFICATION
                    </div>
                    <div className="text-orange-400 font-bold">
                      {activeApp.project}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="pt-2 border-t border-white/5 text-[11px] text-text-secondary">
                <span>Click any node in the canopy, trunk, or roots to inspect its engineering blueprint.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tactical Matrix Grid View (Seamless) */
        <div className="space-y-8 font-mono">
          {/* Trunk */}
          <div className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md p-6 space-y-4 border-l-2 border-l-orange-500">
            <div className="flex items-center space-x-2 text-orange-500 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>CORE SYSTEMS & LANGUAGES (CENTER TRUNK)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {worldTreeSkills.trunk.nodes.map((skill) => (
                <div
                  key={skill}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-orange-500/50 transition-colors"
                >
                  <div className="text-text-primary font-bold">{skill}</div>
                  <div className="text-[10px] text-text-secondary">Core Foundation</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upper Canopy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
              <Sun className="w-4 h-4" />
              <span>UPPER CANOPY (THE GOOD SIDE — WEB, CLOUD & AI)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {worldTreeSkills.branches.map((branch) => (
                <div
                  key={branch.category}
                  className="p-5 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md space-y-3 border-l-2 border-l-orange-400/40"
                >
                  <h4 className="text-xs font-bold text-orange-400">
                    {branch.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-xs text-text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Underground Roots */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
              <Skull className="w-4 h-4" />
              <span>UNDERGROUND ROOTS (THE DARK SIDE — OFFENSIVE & FORENSICS)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {worldTreeSkills.roots.map((root) => (
                <div
                  key={root.category}
                  className="p-5 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md space-y-3 border-l-2 border-l-red-500/40"
                >
                  <h4 className="text-xs font-bold text-red-400">
                    {root.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {root.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-xs text-text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for individual interactive nodes on the World Tree
function TreeNode({
  name,
  x,
  y,
  color,
  isSelected,
  onClick,
  isPill,
}: {
  name: string;
  x: number;
  y: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  isPill?: boolean;
}) {
  const width = isPill ? name.length * 7 + 22 : name.length * 7.5 + 18;
  const height = 24;

  return (
    <g
      className="tree-node-group cursor-pointer transition-all duration-200"
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
    >
      {/* Node Backing Pill */}
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        rx={height / 2}
        fill={isSelected ? color : "#0E0E12"}
        stroke={color}
        strokeWidth={isSelected ? 2.5 : 1.2}
        className="transition-all"
        filter={isSelected ? "url(#orange-glow)" : undefined}
      />

      {/* Node Text Label */}
      <text
        x="0"
        y="1"
        fill={isSelected ? (color === "#FFFFFF" ? "#0E0E12" : "#0E0E12") : "#EDEDEF"}
        fontSize={isPill ? "10" : "11"}
        fontFamily="var(--font-mono), monospace"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none select-none"
      >
        {name}
      </text>
    </g>
  );
}
