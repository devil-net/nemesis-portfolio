"use client";

import React, { useEffect, useState } from "react";
import { TacticalAudio } from "@/lib/utils";

interface KeyConfig {
  code: string;
  topLabel?: string;
  subLabel?: string;
  width?: string;
  isOrange?: boolean;
  isSpace?: boolean;
}

const KEY_ROWS: KeyConfig[][] = [
  // Row 1
  [
    { code: "Escape", topLabel: "Esc", width: "w-10 sm:w-13 md:w-14", isOrange: true },
    { code: "Digit1", topLabel: "!", subLabel: "1" },
    { code: "Digit2", topLabel: "@", subLabel: "2" },
    { code: "Digit3", topLabel: "#", subLabel: "3" },
    { code: "Digit4", topLabel: "$", subLabel: "4" },
    { code: "Digit5", topLabel: "%", subLabel: "5" },
    { code: "Digit6", topLabel: "^", subLabel: "6" },
    { code: "Digit7", topLabel: "&", subLabel: "7" },
    { code: "Digit8", topLabel: "*", subLabel: "8" },
    { code: "Digit9", topLabel: "(", subLabel: "9" },
    { code: "Digit0", topLabel: ")", subLabel: "0" },
    { code: "Minus", topLabel: "_", subLabel: "-" },
    { code: "Equal", topLabel: "+", subLabel: "=" },
    { code: "Backspace", topLabel: "←", width: "w-12 sm:w-15 md:w-16" },
  ],
  // Row 2
  [
    { code: "Tab", topLabel: "Tab", width: "w-12 sm:w-16 md:w-18" },
    { code: "KeyQ", topLabel: "Q" },
    { code: "KeyW", topLabel: "W" },
    { code: "KeyE", topLabel: "E" },
    { code: "KeyR", topLabel: "R" },
    { code: "KeyT", topLabel: "T" },
    { code: "KeyY", topLabel: "Y" },
    { code: "KeyU", topLabel: "U" },
    { code: "KeyI", topLabel: "I" },
    { code: "KeyO", topLabel: "O" },
    { code: "KeyP", topLabel: "P" },
    { code: "BracketLeft", topLabel: "{", subLabel: "[" },
    { code: "BracketRight", topLabel: "}", subLabel: "]" },
    { code: "Backslash", topLabel: "|", subLabel: "\\", width: "w-11 sm:w-14 md:w-16" },
  ],
  // Row 3
  [
    { code: "CapsLock", topLabel: "Caps", width: "w-13 sm:w-18 md:w-20" },
    { code: "KeyA", topLabel: "A" },
    { code: "KeyS", topLabel: "S" },
    { code: "KeyD", topLabel: "D" },
    { code: "KeyF", topLabel: "F" },
    { code: "KeyG", topLabel: "G" },
    { code: "KeyH", topLabel: "H" },
    { code: "KeyJ", topLabel: "J" },
    { code: "KeyK", topLabel: "K" },
    { code: "KeyL", topLabel: "L" },
    { code: "Semicolon", topLabel: ":", subLabel: ";" },
    { code: "Quote", topLabel: '"', subLabel: "'" },
    { code: "Enter", topLabel: "Enter", width: "w-15 sm:w-21 md:w-24", isOrange: true },
  ],
  // Row 4
  [
    { code: "ShiftLeft", topLabel: "Shift", width: "w-15 sm:w-21 md:w-24" },
    { code: "KeyZ", topLabel: "Z" },
    { code: "KeyX", topLabel: "X" },
    { code: "KeyC", topLabel: "C" },
    { code: "KeyV", topLabel: "V" },
    { code: "KeyB", topLabel: "B" },
    { code: "KeyN", topLabel: "N" },
    { code: "KeyM", topLabel: "M" },
    { code: "Comma", topLabel: "<", subLabel: "," },
    { code: "Period", topLabel: ">", subLabel: "." },
    { code: "Slash", topLabel: "?", subLabel: "/" },
    { code: "ShiftRight", topLabel: "Shift", width: "w-15 sm:w-21 md:w-24" },
  ],
  // Row 5
  [
    { code: "ControlLeft", topLabel: "Ctrl", width: "w-11 sm:w-14 md:w-16" },
    { code: "AltLeft", topLabel: "Alt", width: "w-11 sm:w-14 md:w-16" },
    { code: "Space", isSpace: true, width: "flex-1 max-w-[300px] sm:max-w-[420px] md:max-w-[480px]" },
    { code: "AltRight", topLabel: "Alt", width: "w-11 sm:w-14 md:w-16" },
    { code: "Fn", topLabel: "Fn", width: "w-10 sm:w-12 md:w-14" },
    { code: "ControlRight", topLabel: "Ctrl", width: "w-11 sm:w-14 md:w-16" },
  ],
];

interface Keyboard2DProps {
  onKeyPress?: (code: string, char: string) => void;
  className?: string;
}

export default function Keyboard2D({ onKeyPress, className = "" }: Keyboard2DProps) {
  const [activeCodes, setActiveCodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveCodes((prev) => new Set([...prev, e.code]));
      TacticalAudio.playKeyClick("down");
      if (onKeyPress) onKeyPress(e.code, e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveCodes((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
      TacticalAudio.playKeyClick("up");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onKeyPress]);

  const handleVirtualClick = (key: KeyConfig) => {
    setActiveCodes((prev) => new Set([...prev, key.code]));
    TacticalAudio.playKeyClick("down");
    if (onKeyPress) {
      const char = key.isSpace ? " " : key.topLabel?.toLowerCase() || "";
      onKeyPress(key.code, char);
    }

    setTimeout(() => {
      setActiveCodes((prev) => {
        const next = new Set(prev);
        next.delete(key.code);
        return next;
      });
      TacticalAudio.playKeyClick("up");
    }, 120);
  };

  return (
    <div
      className={`relative p-3 sm:p-4 rounded-2xl bg-[#161518]/95 border border-[#2b2a2e] shadow-2xl backdrop-blur-md max-w-[780px] md:max-w-[860px] mx-auto w-full select-none ${className}`}
    >
      <div className="space-y-1.5 sm:space-y-2">
        {KEY_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center items-center gap-1 sm:gap-1.5 md:gap-2">
            {row.map((k) => {
              const isPressed =
                activeCodes.has(k.code) ||
                activeCodes.has(k.code.toLowerCase()) ||
                (k.code.startsWith("Digit") &&
                  activeCodes.has(k.code.replace("Digit", ""))) ||
                (k.code.startsWith("Key") &&
                  activeCodes.has(k.code.replace("Key", "").toLowerCase()));

              const widthClass = k.width || "w-8 sm:w-10 md:w-11";

              if (k.isSpace) {
                return (
                  <button
                    key={k.code}
                    type="button"
                    onClick={() => handleVirtualClick(k)}
                    className={`h-8 sm:h-10 md:h-11 ${widthClass} rounded-md transition-all duration-75 relative flex items-center justify-center ${
                      isPressed
                        ? "bg-[#D8D4C8] translate-y-0.5 shadow-inner"
                        : "bg-[#EDE8DC] border-b-2 border-[#C5BFB0] shadow-sm hover:bg-[#F3EFE6]"
                    }`}
                  >
                    {/* Orange accent line in middle of spacebar like in reference image */}
                    <span className="w-10 sm:w-16 h-1 rounded-full bg-orange-600 opacity-90" />
                  </button>
                );
              }

              if (k.isOrange) {
                return (
                  <button
                    key={k.code}
                    type="button"
                    onClick={() => handleVirtualClick(k)}
                    className={`h-8 sm:h-10 md:h-11 ${widthClass} rounded-md text-[11px] sm:text-xs md:text-sm font-mono font-bold transition-all duration-75 flex items-center justify-center text-white ${
                      isPressed
                        ? "bg-orange-700 translate-y-0.5 shadow-inner"
                        : "bg-orange-600 border-b-2 border-orange-800 shadow-sm hover:bg-orange-500"
                    }`}
                  >
                    {k.topLabel}
                  </button>
                );
              }

              return (
                <button
                  key={k.code}
                  type="button"
                  onClick={() => handleVirtualClick(k)}
                  className={`h-8 sm:h-10 md:h-11 ${widthClass} rounded-md text-[10px] sm:text-xs md:text-sm font-mono transition-all duration-75 flex flex-col items-center justify-center leading-none text-[#222226] font-semibold ${
                    isPressed
                      ? "bg-[#D8D4C8] translate-y-0.5 shadow-inner"
                      : "bg-[#EDE8DC] border-b-2 border-[#C5BFB0] shadow-sm hover:bg-[#F3EFE6]"
                  }`}
                >
                  {k.subLabel ? (
                    <div className="flex flex-col items-center justify-center -space-y-0.5">
                      <span className="text-[9px] sm:text-[10px] text-[#555]">{k.topLabel}</span>
                      <span className="text-[11px] sm:text-xs font-bold">{k.subLabel}</span>
                    </div>
                  ) : (
                    <span>{k.topLabel}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
