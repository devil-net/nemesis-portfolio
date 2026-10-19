"use client";

import React, { useState } from "react";
import { portfolioData } from "@/portfolioData";
import LanyardWrapper from "@/components/3d/LanyardWrapper";
import DecryptedText from "@/components/reactbits/DecryptedText";
import { 
  Fingerprint, 
  FileText, 
  Download, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Eye, 
  Key,
  ShieldCheck,
  Cpu,
  Terminal,
  Activity
} from "lucide-react";
import { TacticalAudio } from "@/lib/utils";

export default function ProfilePage() {
  const { operative } = portfolioData;
  const [unredacted, setUnredacted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header - Seamless Borderless Minimal Tactical Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/10 text-orange-500 border border-orange-500/30 uppercase tracking-widest">
              DIRECTORY // profile/
            </span>
            <span className="text-text-secondary text-xs font-mono">
              ctOS_CLEARANCE_LVL5_GRANTED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-text-primary tracking-tight">
            CLASSIFIED RAW OPERATIVE DOSSIER
          </h1>
          <p className="text-xs font-mono text-text-secondary">
            Intelligence Agency Personnel File • ctOS Breached • Cyber Warfare & Forensic Defense
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setUnredacted(!unredacted);
              TacticalAudio.playRadarPing();
            }}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-orange-500/40 hover:border-orange-500 text-orange-500 text-xs font-mono flex items-center space-x-1.5 transition-all backdrop-blur-sm"
          >
            {unredacted ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{unredacted ? "RE-REDACT DOSSIER" : "HOVER / DECRYPT CIPHER"}</span>
          </button>

          <a
            href="/certificates/temp resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => TacticalAudio.playTerminalBeep(880, 0.05)}
            className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors shadow-lg shadow-orange-900/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD RAW RESUME</span>
          </a>
        </div>
      </div>

      {/* Main 2-Column Layout: Seamless Dossier & 3D Lanyard ID Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Seamless Intelligence File */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 p-6 sm:p-8 font-dossier overflow-hidden">
            {/* Subtle corner crosshairs for tactical HUD feel */}
            <div className="absolute top-2 left-2 text-orange-500/40 font-mono text-[10px] pointer-events-none">+</div>
            <div className="absolute top-2 right-2 text-orange-500/40 font-mono text-[10px] pointer-events-none">+</div>
            <div className="absolute bottom-2 left-2 text-orange-500/40 font-mono text-[10px] pointer-events-none">+</div>
            <div className="absolute bottom-2 right-2 text-orange-500/40 font-mono text-[10px] pointer-events-none">+</div>

            {/* Rotated Red-Orange Classified Rubber Stamp */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 pointer-events-none transform rotate-[-8deg] select-none opacity-90">
              <div className="border border-orange-600 px-3 py-1 rounded font-mono font-bold text-xs text-orange-600 tracking-wider text-center uppercase bg-orange-950/20">
                [CLASSIFIED // RAW DOSSIER]
                <div className="text-[9px] tracking-normal text-orange-400">
                  DEDSEC // SPECIAL OPERATIONS
                </div>
              </div>
            </div>

            {/* File Reference Bar */}
            <div className="relative z-10 border-b border-white/5 pb-4 mb-6 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
                <span className="flex items-center space-x-1.5">
                  <Fingerprint className="w-4 h-4 text-orange-500" />
                  <span>DOSSIER SERIAL: RAW-IND-2024-NEMESIS-007</span>
                </span>
                <span className="text-orange-500 font-bold uppercase tracking-wider">
                  CLEARANCE: LEVEL 5
                </span>
              </div>
              <div className="text-[11px] font-mono text-text-secondary/60">
                HOST: DEVIL-NET // ctOS TARGET: CONFIRMED // ARCHIVE STATUS: ACTIVE
              </div>
            </div>

            {/* Operative Header Info: Seamless Open Layout without Clunky Boxes */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-6">
              <div className="border-l-2 border-l-orange-500/70 pl-3 py-1">
                <div className="text-text-secondary text-[10px] uppercase tracking-wider">LEGAL IDENTITY</div>
                <div className="text-text-primary text-base font-bold font-sans">
                  {operative.legalName}
                </div>
              </div>

              <div className="border-l-2 border-l-orange-500/70 pl-3 py-1">
                <div className="text-text-secondary text-[10px] uppercase tracking-wider">TACTICAL CODENAME</div>
                <div className="text-orange-500 text-base font-bold font-mono">
                  {operative.codename}
                </div>
              </div>

              <div className="border-l-2 border-l-white/20 pl-3 py-1">
                <div className="text-text-secondary text-[10px] uppercase tracking-wider">OPERATIONAL ROLE</div>
                <div className="text-text-primary font-bold">
                  {operative.role}
                </div>
              </div>

              <div className="border-l-2 border-l-white/20 pl-3 py-1">
                <div className="text-text-secondary text-[10px] uppercase tracking-wider">LOCATION BASE</div>
                <div className="text-text-primary font-bold">
                  {operative.location} • <span className="text-orange-500">ACTIVE SHELL</span>
                </div>
              </div>
            </div>

            {/* Classified Biography with Watch Dogs Decrypted Flow */}
            <div className="relative z-10 space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-orange-500 font-bold border-b border-white/5 pb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>OPERATIVE EXECUTIVE SUMMARY</span>
              </div>

              <div className="text-xs sm:text-sm font-sans leading-relaxed text-text-primary space-y-3">
                <p>
                  <DecryptedText
                    text="Dhanush Gurudu is an elite Computer Science and Cyber Security engineer pursuing B.Tech at the National Forensic Sciences University (NFSU), maintaining a top-tier academic score of CGPA 8.36 / 10."
                    animateOn="view"
                    speed={20}
                    className="text-text-primary font-medium"
                    encryptedClassName="text-orange-500 font-mono"
                  />
                </p>

                <p className="text-text-secondary font-dossier leading-relaxed">
                  Operative specializes in digital forensics, offensive vulnerability research, and systems engineering. Conducts active research into{" "}
                  <span
                    className={`font-mono transition-all duration-200 ${
                      unredacted
                        ? "bg-orange-500/20 text-orange-400 px-1 rounded"
                        : "bg-black text-transparent hover:bg-orange-500/20 hover:text-orange-400 px-1 rounded cursor-pointer selection:bg-orange-600"
                    }`}
                    title="Hover to decrypt redacted payload data"
                  >
                    [ctOS PROTOCOL INJECTION & KERNEL MEMORY HOOKS]
                  </span>
                  , binary analysis with Ghidra, PCAP reconstruction in ByteShark, and steganography toolchains in The Hidden Bytes.
                </p>

                <p className="text-text-secondary font-dossier leading-relaxed">
                  Field exercises focus on zero-trust peer-to-peer data transport (
                  <span
                    className={`font-mono transition-all duration-200 ${
                      unredacted
                        ? "bg-orange-500/20 text-orange-400 px-1 rounded"
                        : "bg-black text-transparent hover:bg-orange-500/20 hover:text-orange-400 px-1 rounded cursor-pointer"
                    }`}
                  >
                    [CURVE25519 KEY-EXCHANGE & AES-256-GCM ZERO-KNOWLEDGE STREAM]
                  </span>
                  ), memory forensics with Volatility 3, and automated threat triage models with Google AI Studio.
                </p>
              </div>
            </div>

            {/* Research & Tactical Vectors - Seamless Flow */}
            <div className="relative z-10 space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-orange-500 font-bold border-b border-white/5 pb-1">
                <Eye className="w-3.5 h-3.5" />
                <span>PRIMARY RESEARCH & ENGINEERING VECTORS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {operative.researchInterests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-l border-white/10 hover:border-l-orange-500 transition-colors flex items-center space-x-2"
                  >
                    <span className="text-orange-500 text-[10px] font-mono">[{String(idx + 1).padStart(2, '0')}]</span>
                    <span className="text-text-primary hover:text-orange-400 transition-colors">
                      {interest}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Credentials Verification - Seamless Banner */}
            <div className="relative z-10 p-4 rounded-xl bg-white/[0.02] border-l-2 border-l-orange-500 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-orange-500 font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>NATIONAL FORENSIC SCIENCES UNIVERSITY (NFSU)</span>
                </span>
                <span className="text-orange-400 font-bold">CGPA: 8.36 / 10</span>
              </div>
              <div className="text-[11px] font-mono text-text-secondary leading-relaxed">
                Bachelor of Technology in Computer Science & Cyber Security (2024 – 2029) • Specialization in Network Defense, Applied Cryptography, Hardware Forensics, and Incident Response.
              </div>
            </div>

            {/* Dossier Footer Checksum */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-text-secondary gap-2">
              <div className="flex items-center space-x-2">
                <Key className="w-3.5 h-3.5 text-orange-500" />
                <span>CHECKSUM: 0xDEADBEEF // SHA256: 9E7A...B41D</span>
              </div>
              <div className="text-orange-500 font-bold">
                OPERATIVE DOSSIER VERIFIED // LEVEL 5
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): React Bits 3D Lanyard ID Badge (Floating Seamlessly) */}
        <div className="lg:col-span-5 flex justify-center">
          <LanyardWrapper />
        </div>
      </div>
    </div>
  );
}
