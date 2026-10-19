"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxAngle?: number;
  scale?: number;
  glareEffect?: boolean;
}

export default function TiltedCard({
  children,
  className = "",
  containerClassName = "",
  maxAngle = 12,
  scale = 1.02,
  glareEffect = true,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { damping: 20, stiffness: 150 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 150 });
  const cardScale = useSpring(1, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    rotateX.set(-yPct * maxAngle);
    rotateY.set(xPct * maxAngle);

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cardScale.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
  };

  return (
    <div
      className={cn("perspective-1000", containerClassName)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative overflow-hidden transition-shadow duration-300",
          className
        )}
      >
        {children}

        {/* Dynamic Specular Glare Reflection */}
        {glareEffect && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-inherit"
            style={{
              opacity: isHovered ? 0.25 : 0,
              background: `radial-gradient(circle 250px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8), transparent 80%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
