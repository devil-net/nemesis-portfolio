"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StackItem {
  id: string | number;
  content: React.ReactNode;
}

interface StackProps {
  items?: StackItem[];
  children?: React.ReactNode[];
  className?: string;
  cardClassName?: string;
  offset?: number;
  rotationFactor?: number;
  onCardClick?: (index: number) => void;
}

export default function Stack({
  items,
  children,
  className = "",
  cardClassName = "",
  offset = 8,
  rotationFactor = 4,
  onCardClick,
}: StackProps) {
  const elements = items
    ? items.map((item) => item.content)
    : children || [];

  const [cards, setCards] = useState<number[]>(
    elements.map((_, index) => index)
  );

  const sendToBack = (index: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const [removed] = newCards.splice(index, 1);
      newCards.push(removed);
      return newCards;
    });
    if (onCardClick) onCardClick(index);
  };

  return (
    <div className={cn("relative w-full h-[460px] flex items-center justify-center select-none", className)}>
      <AnimatePresence>
        {cards.map((originalIndex, stackIndex) => {
          const isTop = stackIndex === 0;
          const depth = stackIndex;
          const rot = (stackIndex % 2 === 0 ? 1 : -1) * stackIndex * rotationFactor;
          const yOffset = stackIndex * offset;
          const scale = 1 - stackIndex * 0.05;

          return (
            <motion.div
              key={originalIndex}
              layout
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{
                scale,
                y: yOffset,
                rotate: rot,
                opacity: stackIndex > 3 ? 0 : 1 - stackIndex * 0.15,
                zIndex: cards.length - stackIndex,
              }}
              exit={{ scale: 0.6, opacity: 0, y: -100 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: -120, right: 120 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 60) {
                  sendToBack(0);
                }
              }}
              onClick={() => {
                if (isTop) sendToBack(0);
              }}
              className={cn(
                "absolute cursor-pointer transition-shadow",
                isTop ? "cursor-grab active:cursor-grabbing hover:shadow-orange-glow-sm" : "pointer-events-none",
                cardClassName
              )}
            >
              {elements[originalIndex]}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
