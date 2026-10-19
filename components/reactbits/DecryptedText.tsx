"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?",
  className = "",
  encryptedClassName = "text-tactical-orange opacity-80",
  parentClassName = "",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const getNextChar = (original: string) => {
      if (useOriginalCharsOnly) {
        return text[Math.floor(Math.random() * text.length)];
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    if (isHovering || animateOn === "view") {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, i) => {
              if (char === " " || char === "\n") return char;
              if (revealedIndices.has(i)) return text[i];

              if (sequential) {
                if (i <= Math.floor((currentIteration / maxIterations) * text.length)) {
                  setRevealedIndices((prevIndices) => new Set([...prevIndices, i]));
                  return text[i];
                }
              }

              return getNextChar(char);
            })
            .join("");
        });

        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
    }

    return () => clearInterval(interval);
  }, [isHovering, text, speed, maxIterations, sequential, characters, useOriginalCharsOnly, animateOn, revealedIndices]);

  return (
    <span
      ref={containerRef}
      className={`inline-block font-mono ${parentClassName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={isScrambling ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
}
