"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AsciiRippleProps {
  className?: string;
  cellSize?: number;
  rippleSpeed?: number;
  damping?: number;
  maxRipples?: number;
  color?: string;
  accentColor?: string;
  highlightColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  amplitude: number;
  speed: number;
}

// Watch Dogs & Cyber Security Text Corpus about Dhanush Gurudu (Nemesis)
const CYBER_STRINGS: string[] = [
  "DHANUSH GURUDU // CODENAME: NEMESIS // B.TECH COMPUTER SCIENCE & CYBER FORENSICS // NFSU // CGPA: 8.36 //",
  "ctOS OVERRIDE DETECTED // DEDSEC NETWORK PROTOCOL // PACKET INJECTION // REVERSE ENGINEERING // 0xDEADBEEF //",
  "IDENTITY: DHANUSH GURUDU // ALIAS: NEMESIS // DEVIL-NET TACTICAL WORKSTATION // BYTESHARK PRO PACKET ANALYZER //",
  "SYSTEM ROOT GRANTED // ASLR CANARY INTACT // BUFFER OVERFLOW DEFENSE // KALI LINUX // WIRESHARK // GHIDRA //",
  "ctOS SURVEILLANCE BACKDOOR // VOLATILITY 3 MEMORY EXTRACTION // UNIVERSAL SHARE AES-256-GCM CRYPTOSYSTEM //",
  "OPERATIVE STATUS: ACTIVE // NATIONAL FORENSIC SCIENCES UNIVERSITY // DIGITAL EVIDENCE & INCIDENT RECON //",
  "WATCH_DOGS SIGNAL INTERCEPT // CELLULAR MITM RELAY // THE HIDDEN BYTES STEGANOGRAPHY SUITE // CIPHER 0x89504E47 //",
  "DEVIL-NET SECURE COMM // THREAT RECONNAISSANCE // ZERO-DAY VULNERABILITY AUDIT // ROOT SHELL 127.0.0.1:9050 //",
  "DEDSEC TRANSMISSION: 'WE ARE WATCHING' // KERNEL HOOK MONITOR // BINARY PATCHING // SHA-256 VERIFIED //",
  "NEMESIS SYSTEM READY // SOC DEFENSE AUTOMATION // CYBER POCKET LAB // VERISCOPE AUDITOR // ACCESS: LEVEL 5 //",
  "MEMORY MAPPING: 0x7FFF5FBFFD04 -> 0x8800 // EXPLOIT CHAIN MITIGATED // NETWORK FORENSICS // DEVIL-NET //",
  "ctOS THREAT LEVEL: MAXIMUM // AIRCRACK-NG PROTOCOL // PACKET CRAFTING SCAPY // METASPLOIT PAYLOAD MITIGATED //"
];

const CIPHER_GLYPHS = "0101XYZØ§#%Δ▲Ωλ0x";

export default function AsciiRipple({
  className = "",
  cellSize = 15,
  rippleSpeed = 4.2,
  damping = 0.965,
  maxRipples = 8,
  color = "rgba(160, 165, 185, 0.22)",
  accentColor = "rgba(234, 88, 12, 0.9)",
  highlightColor = "rgba(244, 244, 246, 0.95)",
}: AsciiRippleProps) {
  const pathname = usePathname();
  const isHero = pathname === "/";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let ripples: Ripple[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Preload pristine sword ASCII art
    let swordImg: HTMLImageElement | null = null;
    let swordImgLoaded = false;

    if (isHero) {
      swordImg = new Image();
      swordImg.src = "/images/swords-art-clean.png";
      swordImg.onload = () => {
        swordImgLoaded = true;
      };
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const addRipple = (x: number, y: number) => {
      if (ripples.length >= maxRipples) {
        ripples.shift();
      }
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.5,
        amplitude: 1.0,
        speed: rippleSpeed,
      });
    };

    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime > 35) {
        lastMoveTime = now;
        addRipple(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
      setTimeout(() => addRipple(e.clientX, e.clientY), 80);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Initial ambient ripple on load
    addRipple(width * 0.35, height * 0.55);

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // 1. Update active water ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.amplitude *= damping;

        if (r.amplitude < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      ctx.font = `${Math.floor(cellSize * 0.78)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const waveBandWidth = 85;

      // 2. Render background Watch Dogs cyber text matrix with liquid ripple wave physics
      for (let row = 0; row < rows; row++) {
        const line = CYBER_STRINGS[row % CYBER_STRINGS.length];
        const lineLen = line.length;

        for (let col = 0; col < cols; col++) {
          const baseX = col * cellSize + cellSize / 2;
          const baseY = row * cellSize + cellSize / 2;

          let totalWave = 0;
          let dispX = 0;
          let dispY = 0;

          for (const r of ripples) {
            const dx = baseX - r.x;
            const dy = baseY - r.y;
            const dist = Math.hypot(dx, dy);
            const waveDist = dist - r.radius;

            if (Math.abs(waveDist) < waveBandWidth) {
              const phase = (waveDist / waveBandWidth) * Math.PI;
              const wave = Math.cos(phase) * r.amplitude;
              totalWave += wave;

              if (dist > 0) {
                const factor = (wave * 9) / dist;
                dispX += dx * factor;
                dispY += dy * factor;
              }
            }
          }

          let char = line[col % lineLen];

          if (totalWave > 0.65 && Math.random() > 0.4) {
            char = CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
          }

          if (totalWave > 0.5) {
            ctx.fillStyle = highlightColor;
          } else if (totalWave > 0.15) {
            ctx.fillStyle = accentColor;
          } else if (totalWave < -0.2) {
            ctx.fillStyle = "rgba(100, 105, 120, 0.15)";
          } else {
            ctx.fillStyle = color;
          }

          ctx.fillText(char, baseX + dispX, baseY + dispY);
        }
      }

      // 3. Render High-Density Katana Swords ASCII Art with Liquid Ripple Physics (Only on Hero '/')
      if (isHero && swordImg && swordImgLoaded) {
        // Position swords in lower-left quadrant extending towards center-right
        const swordW = Math.min(width * 0.95, 1180);
        const swordH = swordW * (519 / 1024);
        const swordX = 0;
        const swordY = height - swordH;

        // Displace the swords across grid blocks with water ripple wave dynamics
        const blockSize = 14;
        const colsS = Math.ceil(swordW / blockSize);
        const rowsS = Math.ceil(swordH / blockSize);

        for (let r = 0; r < rowsS; r++) {
          const sy = r * blockSize;
          const targetY = swordY + sy;

          for (let c = 0; c < colsS; c++) {
            const sx = c * blockSize;
            const targetX = swordX + sx;

            let dispX = 0;
            let dispY = 0;

            for (const rip of ripples) {
              const dx = targetX - rip.x;
              const dy = targetY - rip.y;
              const dist = Math.hypot(dx, dy);
              const waveDist = dist - rip.radius;

              if (Math.abs(waveDist) < waveBandWidth) {
                const phase = (waveDist / waveBandWidth) * Math.PI;
                const wave = Math.cos(phase) * rip.amplitude;
                if (dist > 0) {
                  const factor = (wave * 12) / dist;
                  dispX += dx * factor;
                  dispY += dy * factor;
                }
              }
            }

            // Map block coordinates to source 1024x519 sword art
            const srcX = (sx / swordW) * 1024;
            const srcY = (sy / swordH) * 519;
            const srcW = (blockSize / swordW) * 1024;
            const srcH = (blockSize / swordH) * 519;

            ctx.drawImage(
              swordImg,
              srcX,
              srcY,
              srcW,
              srcH,
              targetX + dispX,
              targetY + dispY,
              blockSize,
              blockSize
            );
          }
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isHero, cellSize, rippleSpeed, damping, maxRipples, color, accentColor, highlightColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 w-full h-full ${className}`}
    />
  );
}
