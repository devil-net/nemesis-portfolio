"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  VALID_DIRECTORIES,
  DIRECTORY_METADATA,
  TerminalLine,
} from "@/lib/terminalEngine";
import { TacticalAudio } from "@/lib/utils";

interface TerminalEmulatorProps {
  className?: string;
  externalKeyInput?: { code: string; char: string } | null;
}

export default function TerminalEmulator({
  className = "",
  externalKeyInput,
}: TerminalEmulatorProps) {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isNavigating, setIsNavigating] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  // Initial execution of help command matching the exact reference screenshot
  useEffect(() => {
    setLines([
      {
        id: "init-cmd",
        type: "command",
        text: "help",
      },
      {
        id: "init-help",
        type: "output",
        elements: (
          <div className="space-y-1 text-xs text-[#E1DFDB] font-mono leading-relaxed">
            <div className="text-[#888892] pb-0.5">Available commands:</div>
            <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-1 pl-2">
              <div>
                <span className="text-orange-500 font-bold">ls</span>
              </div>
              <div className="text-[#BEBCB6]">- List all directories</div>

              <div>
                <span className="text-orange-500 font-bold">cd &lt;dir&gt;</span>
              </div>
              <div className="text-[#BEBCB6]">- Open a section</div>

              <div>
                <span className="text-orange-500 font-bold">cat &lt;file&gt;</span>
              </div>
              <div className="text-[#BEBCB6]">- View details</div>

              <div>
                <span className="text-orange-500 font-bold">help</span>
              </div>
              <div className="text-[#BEBCB6]">- Show this help message</div>

              <div>
                <span className="text-orange-500 font-bold">clear</span>
              </div>
              <div className="text-[#BEBCB6]">- Clear terminal</div>

              <div>
                <span className="text-orange-500 font-bold">exit</span>
              </div>
              <div className="text-[#BEBCB6]">- Leave (but why would you?)</div>
            </div>
          </div>
        ),
      },
    ]);
  }, []);

  // Sync virtual 2D keyboard clicks to terminal input
  useEffect(() => {
    if (!externalKeyInput) return;
    const { code, char } = externalKeyInput;

    if (code === "Enter") {
      handleExecuteCommand(inputVal);
      setInputVal("");
    } else if (code === "Backspace") {
      setInputVal((prev) => prev.slice(0, -1));
    } else if (code === "Space") {
      setInputVal((prev) => prev + " ");
    } else if (char && char.length === 1) {
      setInputVal((prev) => prev + char);
    }
    inputRef.current?.focus();
  }, [externalKeyInput]);

  const handleExecuteCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    setLines((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        type: "command",
        text: trimmed,
      },
    ]);

    TacticalAudio.playTerminalBeep(700, 0.04);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim();

    switch (cmd) {
      case "help":
        setLines((prev) => [
          ...prev,
          {
            id: `help-${Date.now()}`,
            type: "output",
            elements: (
              <div className="space-y-1 text-xs text-[#E1DFDB] font-mono leading-relaxed">
                <div className="text-[#888892] pb-0.5">Available commands:</div>
                <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-1 pl-2">
                  <div>
                    <span className="text-orange-500 font-bold">ls</span>
                  </div>
                  <div className="text-[#BEBCB6]">- List all directories</div>

                  <div>
                    <span className="text-orange-500 font-bold">cd &lt;dir&gt;</span>
                  </div>
                  <div className="text-[#BEBCB6]">- Open a section</div>

                  <div>
                    <span className="text-orange-500 font-bold">cat &lt;file&gt;</span>
                  </div>
                  <div className="text-[#BEBCB6]">- View details</div>

                  <div>
                    <span className="text-orange-500 font-bold">help</span>
                  </div>
                  <div className="text-[#BEBCB6]">- Show this help message</div>

                  <div>
                    <span className="text-orange-500 font-bold">clear</span>
                  </div>
                  <div className="text-[#BEBCB6]">- Clear terminal</div>

                  <div>
                    <span className="text-orange-500 font-bold">intro</span>
                  </div>
                  <div className="text-[#BEBCB6]">- Replay cinematic video transmission</div>

                  <div>
                    <span className="text-orange-500 font-bold">exit</span>
                  </div>
                  <div className="text-[#BEBCB6]">- Leave (but why would you?)</div>
                </div>
              </div>
            ),
          },
        ]);
        break;

      case "ls":
        setLines((prev) => [
          ...prev,
          {
            id: `ls-${Date.now()}`,
            type: "directory-list",
            elements: (
              <div className="py-1.5 space-y-1.5 font-mono text-xs">
                <div className="text-[#7E7D86] text-[11px] uppercase tracking-wider">
                  DIRECTORIES //
                </div>
                <div className="flex flex-wrap gap-2">
                  {VALID_DIRECTORIES.map((dir) => (
                    <button
                      key={dir}
                      onClick={() => triggerRouteNavigation(dir)}
                      className="px-2.5 py-1 rounded bg-[#18181D] hover:bg-orange-600/20 border border-[#2B2A32] hover:border-orange-500 text-orange-500 font-bold transition-all text-xs"
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>
            ),
          },
        ]);
        break;

      case "cd":
        if (!arg || arg === "~" || arg === "/") {
          triggerRouteNavigation("/", "home");
          break;
        }

        const normalizedArg = arg.endsWith("/") ? arg : `${arg}/`;
        const matchedDir = VALID_DIRECTORIES.find(
          (d) =>
            d.toLowerCase() === normalizedArg.toLowerCase() ||
            d.toLowerCase().replace("/", "") === arg.toLowerCase()
        );

        if (matchedDir) {
          triggerRouteNavigation(matchedDir);
        } else {
          setLines((prev) => [
            ...prev,
            {
              id: `err-${Date.now()}`,
              type: "error",
              text: `bash: cd: ${arg}: No such directory. Type 'ls' to list valid target directories.`,
            },
          ]);
        }
        break;

      case "cat":
        if (arg.toLowerCase().includes("resume") || arg.toLowerCase().includes("dossier")) {
          router.push("/profile");
        } else {
          setLines((prev) => [
            ...prev,
            {
              id: `cat-${Date.now()}`,
              type: "output",
              elements: (
                <div className="text-xs text-[#BEBCB6] space-y-1">
                  <div>Operative: Dhanush Gurudu (Nemesis)</div>
                  <div>Status: National Forensic Sciences University (CGPA 8.36/10)</div>
                  <div>Run &apos;cd profile/&apos; or &apos;cd projects/&apos; to view complete files.</div>
                </div>
              ),
            },
          ]);
        }
        break;

      case "whoami":
        setLines((prev) => [
          ...prev,
          {
            id: `who-${Date.now()}`,
            type: "output",
            elements: (
              <div className="text-xs text-[#BEBCB6]">
                DHANUSH GURUDU // NEMESIS [LEVEL 5 CLEARANCE - NFSU CYBERSECURITY]
              </div>
            ),
          },
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "intro":
      case "video":
        setLines((prev) => [
          ...prev,
          {
            id: `intro-${Date.now()}`,
            type: "output",
            text: "INITIALIZING TRANSMISSION SEQUENCE // PLAYING INTRO...",
          },
        ]);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("nemesis_intro_viewed");
          setTimeout(() => {
            window.location.href = "/";
          }, 300);
        }
        break;

      case "exit":
        setLines((prev) => [
          ...prev,
          {
            id: `exit-${Date.now()}`,
            type: "output",
            text: "Session active. There is no escape from devil-net.",
          },
        ]);
        break;

      default:
        setLines((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            type: "error",
            text: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
          },
        ]);
        break;
    }
  };

  const triggerRouteNavigation = (targetDir: string, fallbackSlug?: string) => {
    setIsNavigating(true);
    TacticalAudio.playRadarPing();

    const route =
      fallbackSlug === "home"
        ? "/"
        : DIRECTORY_METADATA[targetDir]?.route || `/${targetDir.replace("/", "")}`;

    const progressId = `progress-${Date.now()}`;
    setLines((prev) => [
      ...prev,
      {
        id: progressId,
        type: "progress",
        text: `DECRYPTING ROUTE [▓▓▓▓▓▓▓▓▓▓] 100% -> ${targetDir}`,
      },
    ]);

    setTimeout(() => {
      setIsNavigating(false);
      router.push(route);
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNavigating) return;

    if (e.key === "Enter") {
      handleExecuteCommand(inputVal);
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
          TacticalAudio.playTerminalBeep(880, 0.03);
        }
      } else if (trimmed === "c" || trimmed === "cd") {
        setInputVal("cd ");
      } else if (trimmed === "h") {
        setInputVal("help");
      } else if (trimmed === "l") {
        setInputVal("ls");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl border border-[#2b2a2e] bg-[#101012]/95 backdrop-blur-md overflow-hidden shadow-2xl max-w-[780px] md:max-w-[860px] mx-auto w-full min-h-[380px] max-h-[460px] ${className}`}
    >
      {/* Title Bar matching user image */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#17161A] border-b border-[#25242A]">
        {/* Traffic Light Dots on Left */}
        <div className="flex items-center space-x-2">
          <span
            onClick={() => setLines([])}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] cursor-pointer hover:opacity-80"
          />
          <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] cursor-pointer hover:opacity-80" />
          <span
            onClick={() => handleExecuteCommand("help")}
            className="w-3.5 h-3.5 rounded-full bg-[#27C93F] cursor-pointer hover:opacity-80"
          />
        </div>

        {/* Tab / Title on Right */}
        <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-[#8E8D96]">
          <span>~/portfolio</span>
          <span className="text-[#555]">+</span>
        </div>
      </div>

      {/* Terminal Stream */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-5 overflow-y-auto font-mono text-xs sm:text-sm text-[#EDEDEF] space-y-2 cursor-text"
      >
        {lines.map((line) => {
          if (line.type === "command") {
            return (
              <div key={line.id} className="flex items-center space-x-1.5">
                <span className="text-orange-500 font-bold">nemesis@portfolio:~$</span>
                <span className="text-[#EDEDEF] font-bold">{line.text}</span>
              </div>
            );
          }
          if (line.type === "error") {
            return (
              <div key={line.id} className="text-red-400 font-mono py-0.5">
                {line.text}
              </div>
            );
          }
          if (line.type === "progress") {
            return (
              <div key={line.id} className="text-orange-500 font-bold font-mono py-0.5 animate-pulse">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="leading-relaxed">
              {line.elements ? line.elements : line.text}
            </div>
          );
        })}

        {/* Active Input Line */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-orange-500 font-bold shrink-0">
            nemesis@portfolio:~$
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isNavigating}
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent text-[#EDEDEF] font-mono text-xs sm:text-sm focus:outline-none border-none p-0 caret-transparent"
              placeholder=""
              autoFocus
            />
            {/* Blinking block cursor */}
            <span
              className="absolute text-white font-bold animate-blink pointer-events-none"
              style={{
                left: `${inputVal.length * 8.4}px`,
              }}
            >
              █
            </span>
          </div>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
