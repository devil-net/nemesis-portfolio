"use client";

import React, { useState } from "react";
import { portfolioData } from "@/portfolioData";
import { 
  GitBranch, 
  GitCommit, 
  GitMerge, 
  Terminal, 
  ExternalLink, 
  FileCheck, 
  GraduationCap, 
  Cloud, 
  ShieldCheck, 
  Copy, 
  Check 
} from "lucide-react";
import { TacticalAudio } from "@/lib/utils";

// Certificate PDF mapping
const CERT_MAPPING: Record<string, string> = {
  "e4c19b0": "/certificates/solution architect.pdf",
  "b72d01f": "/certificates/delloit simulation.pdf",
  "a9f84d2": "/certificates/temp resume.pdf",
};

export default function ExperienceEducationPage() {
  const { educationAndExperience } = portfolioData;
  const [selectedCommit, setSelectedCommit] = useState(educationAndExperience[0]);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    TacticalAudio.playTerminalBeep(900, 0.04);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner - Seamless */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/10 text-orange-500 border border-orange-500/30 uppercase tracking-widest">
              DIRECTORY // experience-and-education/
            </span>
            <span className="text-text-secondary text-xs font-mono">
              BRANCH: main [SYNCED WITH REMOTE]
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-text-primary tracking-tight">
            GIT LOG TIMELINE & ACADEMIC REPOSITORY
          </h1>
          <p className="text-xs font-mono text-text-secondary">
            Command execution: <code className="text-orange-500">git log --graph --all --decorate --format=fuller</code>
          </p>
        </div>

        {/* Branch Indicator Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono backdrop-blur-sm">
          <GitBranch className="w-4 h-4 text-orange-500" />
          <span className="text-text-secondary">HEAD -&gt;</span>
          <span className="text-orange-400 font-bold">origin/main</span>
        </div>
      </div>

      {/* Main Grid: Git Log Graph (Left) & Commit Diff Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Seamless git log graph */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md overflow-hidden font-mono text-xs">
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-text-primary font-bold">
                  nemesis@devil-net:~/repo$ git log --graph
                </span>
              </div>
              <span className="text-[10px] text-text-secondary">
                CLICK NODES TO INSPECT DIFF
              </span>
            </div>

            {/* Git Graph Commits List */}
            <div className="p-5 sm:p-6 space-y-4">
              {educationAndExperience.map((item, index) => {
                const isSelected = selectedCommit.commitHash === item.commitHash;
                const isNFSU = item.commitHash === "a9f84d2";
                const isAWS = item.commitHash === "e4c19b0";
                const isDeloitte = item.commitHash === "b72d01f";

                return (
                  <div
                    key={item.commitHash}
                    onClick={() => {
                      setSelectedCommit(item);
                      TacticalAudio.playKeyClick("down");
                    }}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                      isSelected
                        ? "bg-white/[0.04] border-white/10 border-l-2 border-l-orange-500"
                        : "bg-transparent border-white/5 border-l-2 border-l-transparent hover:border-l-orange-500/50 hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Visual Git Graph Line & Node */}
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-orange-600 text-white font-black"
                              : "bg-white/10 text-text-secondary group-hover:bg-orange-500/30 group-hover:text-orange-400"
                          }`}
                        >
                          <GitCommit className="w-3.5 h-3.5" />
                        </div>
                        {index < educationAndExperience.length - 1 && (
                          <div className="w-0.5 h-16 bg-white/10 group-hover:bg-orange-500/30 transition-colors my-1" />
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        {/* Commit Header & Hash */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#26262B] text-glow-orange font-bold text-[11px]">
                              commit {item.commitHash}
                            </span>
                            <span className="text-[10px] text-text-secondary">
                              ({item.period})
                            </span>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            {isNFSU && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                HEAD -&gt; main (Academic Degree)
                              </span>
                            )}
                            {isAWS && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                                feat/aws-cloud-sim
                              </span>
                            )}
                            {isDeloitte && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                feat/deloitte-cyber-sim
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Institution */}
                        <div>
                          <h3 className="text-sm font-sans font-bold text-text-primary group-hover:text-glow-orange transition-colors">
                            {item.title}
                          </h3>
                          <div className="text-xs text-tactical-orange font-medium">
                            {item.institution}
                          </div>
                        </div>

                        {/* Metric Badge */}
                        <div className="inline-block px-2 py-0.5 rounded bg-[#0E0E10] border border-[#282830] text-[11px] text-text-secondary">
                          <span className="text-glow-orange font-bold">METRIC:</span> {item.metric}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div className="px-4 py-2 bg-[#0F0F13] border-t border-[#282830] flex items-center justify-between text-[11px] text-text-secondary">
              <span>3 commits logged | 1 branch ahead of origin</span>
              <span className="text-tactical-orange">ALL SIGNATURES VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Detailed Commit Diff Inspector (Seamless) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md p-6 font-mono text-xs space-y-4 border-l-2 border-l-orange-500 relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <GitMerge className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 font-bold tracking-wider uppercase">
                  COMMIT INSPECTOR // DIFF
                </span>
              </div>
              <button
                onClick={() => copyHash(selectedCommit.commitHash)}
                className="p-1 rounded bg-white/5 hover:text-orange-400 border border-white/10 transition-colors flex items-center space-x-1 text-[10px]"
                title="Copy commit hash"
              >
                {copiedHash === selectedCommit.commitHash ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-text-secondary" />
                )}
                <span>{selectedCommit.commitHash}</span>
              </button>
            </div>

            {/* Metadata Fields */}
            <div className="relative z-10 space-y-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div>
                  <span className="text-text-secondary">Commit:</span>{" "}
                  <span className="text-orange-400 font-bold">
                    {selectedCommit.commitHash}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Author:</span>{" "}
                  <span className="text-text-primary">
                    Dhanush Gurudu (Nemesis) &lt;dhanushgurudu@gmail.com&gt;
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Period:</span>{" "}
                  <span className="text-text-primary">{selectedCommit.period}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Status:</span>{" "}
                  <span className="text-emerald-400 font-bold">
                    {selectedCommit.status}
                  </span>
                </div>
              </div>

              {/* Diff Code View */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
                <div className="text-[10px] text-text-secondary border-b border-white/5 pb-1">
                  diff --git a/{selectedCommit.commitHash} b/{selectedCommit.commitHash}
                </div>
                <div className="text-emerald-400">
                  + Institution: {selectedCommit.institution}
                </div>
                <div className="text-emerald-400">
                  + Milestone: {selectedCommit.title}
                </div>
                <div className="text-orange-400">
                  + Key Metric: {selectedCommit.metric}
                </div>

                {selectedCommit.highlights.map((h, i) => (
                  <div key={i} className="text-emerald-400/90 pl-2">
                    + {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certificate Access Button */}
            {CERT_MAPPING[selectedCommit.commitHash] && (
              <div className="relative z-10 pt-2">
                <a
                  href={CERT_MAPPING[selectedCommit.commitHash]}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => TacticalAudio.playRadarPing()}
                  className="w-full py-2.5 px-3 rounded bg-tactical-orange text-background hover:bg-glow-orange font-bold text-center flex items-center justify-center space-x-2 transition-all shadow-orange-glow-sm"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>VIEW OFFICIALLY VERIFIED CERTIFICATE (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
