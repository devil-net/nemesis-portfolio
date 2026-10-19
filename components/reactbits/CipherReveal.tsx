"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface CipherRevealProps {
  initialText?: string;
  targetText?: string;
  speed?: number;
  scrambleDuration?: number;
  className?: string;
  cipherClassName?: string;
  triggerOnHover?: boolean;
  autoPlay?: boolean;
}

const CIPHER_CHARS = "ABCDEF0123456789!@#$%&*<>{}[]/\\~";

export default function CipherReveal({
  initialText = "NEMESIS",
  targetText = "DHANUSH",
  speed = 40,
  scrambleDuration = 1200,
  className = "",
  cipherClassName = "text-orange-600 font-mono",
  triggerOnHover = true,
  autoPlay = true,
}: CipherRevealProps) {
  const [displayText, setDisplayText] = useState(initialText);
  const [isDecoding, setIsDecoding] = useState(false);
  const [activeTarget, setActiveTarget] = useState(targetText);

  const startAnimation = () => {
    if (isDecoding) return;
    setIsDecoding(true);

    const fromText = displayText;
    const toText = activeTarget;
    const maxLength = Math.max(fromText.length, toText.length);
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / scrambleDuration);

      // Characters resolved up to index based on progress
      const resolvedCount = Math.floor(progress * maxLength);

      let current = "";
      for (let i = 0; i < maxLength; i++) {
        if (i < resolvedCount) {
          current += toText[i] || "";
        } else if (i < toText.length) {
          current += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }
      }

      setDisplayText(current);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(toText);
        setIsDecoding(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        startAnimation();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  const handleToggle = () => {
    const next = activeTarget === targetText ? initialText : targetText;
    setActiveTarget(next);
    setIsDecoding(true);
    const toText = next;
    const maxLength = Math.max(displayText.length, toText.length);
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / scrambleDuration);
      const resolvedCount = Math.floor(progress * maxLength);

      let current = "";
      for (let i = 0; i < maxLength; i++) {
        if (i < resolvedCount) {
          current += toText[i] || "";
        } else if (i < toText.length) {
          current += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }
      }

      setDisplayText(current);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(toText);
        setIsDecoding(false);
      }
    }, speed);
  };

  return (
    <span
      onClick={handleToggle}
      onMouseEnter={triggerOnHover ? handleToggle : undefined}
      className={cn(
        "inline-block font-sans font-bold cursor-pointer transition-colors select-none tracking-tight",
        className
      )}
      title="Click or hover to re-decode"
    >
      <span className={isDecoding ? cipherClassName : ""}>{displayText}</span>
    </span>
  );
}
