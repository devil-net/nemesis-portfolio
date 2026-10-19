"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Volume2, VolumeX, Menu, X, FileText } from "lucide-react";
import { TacticalAudio } from "@/lib/utils";
import CipherReveal from "@/components/reactbits/CipherReveal";

const NAV_ROUTES = [
  { path: "/profile", label: "profile/" },
  { path: "/projects", label: "projects/" },
  { path: "/experience-and-education", label: "experience/" },
  { path: "/technical-skills", label: "skills/" },
  { path: "/certifications-and-achievements", label: "certifications/" },
  { path: "/contact-info", label: "contact/" },
];

export default function TopNavBar() {
  const pathname = usePathname();
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    TacticalAudio.enabled = !sfxEnabled;
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled) {
      TacticalAudio.playTerminalBeep(700, 0.05);
    }
  };

  // No header on hero section: only access point is the terminal
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#25242A] bg-[#0E0E10]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 py-2 flex items-center justify-between">
        {/* Brand with CipherReveal decoding between NEMESIS and DHANUSH */}
        <Link
          href="/"
          className="flex items-center space-x-2 group"
          onClick={() => TacticalAudio.playTerminalBeep(520, 0.04)}
        >
          <div className="w-7 h-7 rounded bg-[#18181D] border border-[#302F37] flex items-center justify-center text-orange-500">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center space-x-1.5 font-mono text-sm">
            <CipherReveal
              initialText="NEMESIS"
              targetText="DHANUSH"
              className="text-[#EDEDEF] group-hover:text-orange-500"
              cipherClassName="text-orange-500"
            />
            <span className="text-[#666]">@</span>
            <span className="text-[#8E8D96] text-xs">portfolio</span>
          </div>
        </Link>

        {/* Desktop Directory Links - Minimal & Clean */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_ROUTES.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => TacticalAudio.playTerminalBeep(650, 0.03)}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  isActive
                    ? "text-orange-500 bg-orange-500/10 font-bold"
                    : "text-[#9E9DA6] hover:text-[#EDEDEF] hover:bg-[#18181D]"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Tools: SFX and Resume */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className="p-1.5 rounded bg-[#18181D] border border-[#2B2A32] text-[#8E8D96] hover:text-orange-500 transition-colors"
            title={sfxEnabled ? "Audio: ON" : "Audio: MUTED"}
          >
            {sfxEnabled ? (
              <Volume2 className="w-4 h-4 text-orange-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#8E8D96]" />
            )}
          </button>

          <a
            href="/certificates/temp resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1 px-3 py-1 rounded bg-orange-600 hover:bg-orange-500 text-white text-xs font-mono font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded bg-[#18181D] border border-[#2B2A32] text-[#EDEDEF]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#25242A] bg-[#121215] px-4 py-3 space-y-1 font-mono text-xs">
          {NAV_ROUTES.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded transition-colors ${
                  isActive
                    ? "text-orange-500 bg-orange-500/10 font-bold"
                    : "text-[#9E9DA6] hover:text-[#EDEDEF]"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
