"use client";

import dynamic from "next/dynamic";
import React from "react";

const Keyboard3D = dynamic(() => import("@/components/3d/Keyboard3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[380px] rounded-xl border border-[#282830] bg-[#0E0E10]/90 flex items-center justify-center font-mono text-xs text-text-secondary">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-6 border-2 border-tactical-orange border-t-transparent rounded-full animate-spin" />
        <span className="text-tactical-orange">INITIALIZING 3D MECHANICAL KEYBOARD...</span>
      </div>
    </div>
  ),
});

export default function KeyboardWrapper() {
  return <Keyboard3D />;
}
