"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import BranchedMenu, { BranchedMenuItem } from "@/components/reactbits/BranchedMenu";
import { 
  Terminal, 
  Fingerprint, 
  FolderGit2, 
  Cpu, 
  GitBranch, 
  Award, 
  Radio, 
  ChevronRight, 
  ChevronLeft,
  Shield,
  Layers,
  Menu,
  X
} from "lucide-react";
import { TacticalAudio } from "@/lib/utils";

const MENU_ITEMS: BranchedMenuItem[] = [
  {
    label: "01 // SYSTEM ROOT",
    children: [
      { value: "/", label: "~/ terminal-root", icon: Terminal },
    ],
  },
  {
    label: "02 // OPERATIVE FILE",
    children: [
      { value: "/profile", label: "profile/ dossier", icon: Fingerprint },
    ],
  },
  {
    label: "03 // CYBER ARSENAL",
    children: [
      { value: "/projects", label: "projects/ prototypes", icon: FolderGit2 },
    ],
  },
  {
    label: "04 // TELEMETRY & LOGS",
    children: [
      { value: "/technical-skills", label: "skills/ matrix", icon: Cpu },
      { value: "/experience-and-education", label: "experience/ git-log", icon: GitBranch },
    ],
  },
  {
    label: "05 // COMMS & AUDIT",
    children: [
      { value: "/certifications-and-achievements", label: "credentials/ verify", icon: Award },
      { value: "/contact-info", label: "comms/ socket", icon: Radio },
    ],
  },
];

export default function TacticalBranchedNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Hidden on hero section: only access point is the terminal
  if (pathname === "/") {
    return null;
  }

  const handleSelect = (value: string) => {
    TacticalAudio.playTerminalBeep(700, 0.04);
    if (value && value !== pathname) {
      router.push(value);
    }
  };

  return (
    <>
      {/* 1. Docked Minimal Toggle Pill when Collapsed (Clean & Completely Unobtrusive) */}
      {isCollapsed && (
        <button
          onClick={() => {
            setIsCollapsed(false);
            TacticalAudio.playKeyClick("down");
          }}
          className="fixed top-4 left-4 z-40 flex items-center space-x-2 px-3 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 hover:border-orange-500 text-xs font-mono text-white/80 hover:text-orange-400 transition-all shadow-2xl group animate-fadeIn"
          title="Open ctOS Navigation Rail"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:animate-ping" />
          <span className="font-bold text-[11px] tracking-wider">MENU</span>
          <ChevronRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* 2. Full Tactical Branched Navigation Panel */}
      <aside
        className={`fixed top-4 left-4 z-40 transition-all duration-300 ease-out pointer-events-auto select-none ${
          isCollapsed ? "-translate-x-[calc(100%+32px)] opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        }`}
      >
        <div className="bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 border-l-2 border-l-orange-500/80 p-3 shadow-2xl min-w-[245px]">
          {/* Header indicator & Collapse trigger */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 font-mono text-[10px]">
            <div className="flex items-center space-x-1.5 text-orange-500 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>ctOS NAV // RAIL</span>
            </div>

            <button
              onClick={() => {
                setIsCollapsed(true);
                TacticalAudio.playKeyClick("up");
              }}
              className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-white/5 hover:bg-orange-500/20 text-white/60 hover:text-orange-400 transition-colors"
              title="Close Navigation Rail"
            >
              <ChevronLeft className="w-3 h-3" />
              <span className="text-[9px]">CLOSE</span>
            </button>
          </div>

          {/* React Bits BranchedMenu */}
          <BranchedMenu
            items={MENU_ITEMS}
            defaultOpen={[0, 1, 2, 3, 4]}
            defaultActive={pathname}
            onSelect={handleSelect}
            color="#EDEDEF"
            accentColor="#EA580C"
            lineColor="#2E2E36"
            width={220}
            rowHeight={32}
            indent={30}
            trunk={12}
            radius={8}
            lineWidth={1.5}
            fontSize={12}
          />
        </div>
      </aside>
    </>
  );
}
