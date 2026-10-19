"use client";

import React, { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Terminal as TerminalIcon,
  ChevronUp,
  ChevronDown,
  CornerDownLeft,
  X,
  Folder,
} from "lucide-react";
import {
  VALID_DIRECTORIES,
  DIRECTORY_METADATA,
} from "@/lib/terminalEngine";
import { TacticalAudio } from "@/lib/utils";

export default function PersistentCLIBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [outputLog, setOutputLog] = useState<{ text: string; isError?: boolean }[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine current active directory representation for prompt
  const currentDir =
    pathname === "/"
      ? "~"
      : pathname.replace(/^\//, "").endsWith("/")
      ? pathname.replace(/^\//, "")
      : `${pathname.replace(/^\//, "")}/`;

  // No footer/CLI bar on hero section: terminal is the only access point
  if (pathname === "/") {
    return null;
  }

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    TacticalAudio.playTerminalBeep(720, 0.04);
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim();

    if (cmd === "cd") {
      if (!arg || arg === "~" || arg === "/") {
        navigate("/");
        return;
      }
      if (arg === ".." || arg === "../") {
        navigate("/");
        return;
      }
      const target = arg.endsWith("/") ? arg : `${arg}/`;
      const match = VALID_DIRECTORIES.find(
        (d) =>
          d.toLowerCase() === target.toLowerCase() ||
          d.toLowerCase().replace("/", "") === arg.toLowerCase()
      );

      if (match) {
        navigate(DIRECTORY_METADATA[match]?.route || `/${match.replace("/", "")}`);
      } else {
        setOutputLog((prev) => [
          ...prev,
          { text: `cd: no such directory: ${arg}`, isError: true },
        ]);
        setIsOpen(true);
      }
    } else if (cmd === "ls") {
      setOutputLog((prev) => [
        ...prev,
        { text: `DIRECTORIES: ${VALID_DIRECTORIES.join("  ")}` },
      ]);
      setIsOpen(true);
    } else if (cmd === "clear") {
      setOutputLog([]);
    } else if (cmd === "whoami") {
      setOutputLog((prev) => [
        ...prev,
        { text: "DHANUSH GURUDU // NEMESIS [LEVEL 5 CLEARANCE] - NFSU CYBERSECURITY" },
      ]);
      setIsOpen(true);
    } else if (cmd === "help") {
      setOutputLog((prev) => [
        ...prev,
        { text: "COMMANDS: cd <dir> | ls | whoami | clear | contact | help" },
      ]);
      setIsOpen(true);
    } else if (cmd === "contact") {
      navigate("/contact-info");
    } else {
      setOutputLog((prev) => [
        ...prev,
        { text: `command not found: ${trimmed}. Try 'help' or 'ls'`, isError: true },
      ]);
      setIsOpen(true);
    }
  };

  const navigate = (path: string) => {
    setIsNavigating(true);
    TacticalAudio.playRadarPing();
    setOutputLog((prev) => [
      ...prev,
      { text: `[ROUTING] >> Decrypting access credentials for ${path}...` },
    ]);
    setTimeout(() => {
      setIsNavigating(false);
      router.push(path);
      setIsOpen(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = inputVal.trim();
      if (trimmed.startsWith("cd ")) {
        const query = trimmed.slice(3).toLowerCase();
        const match = VALID_DIRECTORIES.find((d) =>
          d.toLowerCase().startsWith(query)
        );
        if (match) {
          setInputVal(`cd ${match}`);
          TacticalAudio.playTerminalBeep(840, 0.03);
        }
      } else if (trimmed === "c" || trimmed === "cd") {
        setInputVal("cd ");
      } else if (trimmed === "l") {
        setInputVal("ls");
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 pb-2 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        {/* Expanded Output Drawer */}
        {isOpen && (
          <div className="bg-[#121216]/95 backdrop-blur-md border border-b-0 border-[#282830] rounded-t-lg p-3 font-mono text-xs max-h-48 overflow-y-auto space-y-1.5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-1 border-b border-[#282830] text-[11px] text-text-secondary">
              <span className="text-tactical-orange font-bold">
                TACTICAL CLI BUFFER // HISTORY
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-tactical-orange"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {outputLog.length === 0 ? (
              <div className="text-text-secondary py-1 italic">
                Buffer clean. Type a command below or select a directory shortcut.
              </div>
            ) : (
              outputLog.map((log, i) => (
                <div
                  key={i}
                  className={log.isError ? "text-red-400" : "text-tactical-orange"}
                >
                  {log.text}
                </div>
              ))
            )}
          </div>
        )}

        {/* Main Minimized Bar */}
        <div className="bg-[#141419]/95 backdrop-blur-md border border-[#282830] hover:border-tactical-orange/50 rounded-lg px-3 py-2 flex items-center justify-between shadow-orange-glow-sm transition-all">
          <div className="flex items-center space-x-2 flex-1 min-w-0 mr-3">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-tactical-orange font-bold shrink-0">
              <TerminalIcon className="w-4 h-4 text-tactical-orange" />
              <span className="hidden sm:inline">nemesis@devil-net:</span>
              <span className="text-glow-orange">{currentDir}#</span>
            </div>

            <div className="relative flex-1 flex items-center min-w-[120px]">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isNavigating}
                spellCheck={false}
                autoComplete="off"
                placeholder={
                  isNavigating
                    ? "Routing..."
                    : "Type command or 'cd <dir>' (Tab to complete)..."
                }
                className="w-full bg-transparent text-xs font-mono text-text-primary focus:outline-none border-none p-0 caret-tactical-orange placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          {/* Quick Shortcuts & Toggle */}
          <div className="flex items-center space-x-1.5 shrink-0">
            {/* Quick Directory Pills (Hidden on very small screens) */}
            <div className="hidden md:flex items-center space-x-1">
              {VALID_DIRECTORIES.slice(0, 3).map((dir) => (
                <button
                  key={dir}
                  onClick={() =>
                    navigate(
                      DIRECTORY_METADATA[dir]?.route || `/${dir.replace("/", "")}`
                    )
                  }
                  className="px-2 py-0.5 rounded bg-surface border border-[#282830] hover:border-tactical-orange hover:text-tactical-orange text-[10px] font-mono text-text-secondary transition-colors"
                >
                  {dir}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                handleCommand(inputVal);
                setInputVal("");
              }}
              className="p-1.5 rounded bg-tactical-orange/20 border border-tactical-orange/40 text-tactical-orange hover:bg-tactical-orange hover:text-background transition-colors"
              title="Execute"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded bg-surface border border-[#282830] text-text-secondary hover:text-tactical-orange transition-colors"
              title={isOpen ? "Minimize CLI" : "Expand CLI"}
            >
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
