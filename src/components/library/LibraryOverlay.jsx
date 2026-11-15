import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Menu } from "lucide-react";

export function LibraryOverlay({
  onOpenBook,
  isLightOn,
  onToggleLight,
  isAudioPlaying,
  onToggleAudio
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-7 select-none font-sans">
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between w-full">
        {/* Top-Left Navigation Links (matching reference screenshot) */}
        <div className="flex items-center gap-5 sm:gap-7 pointer-events-auto">
          <button
            type="button"
            onClick={() => onOpenBook?.(0)} // Book 01: ABOUT ME
            className="text-xs sm:text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onOpenBook?.(8)} // Book 09: CONTACT
            className="text-xs sm:text-sm font-medium tracking-wide text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </header>

      {/* ── Bottom Bar ──────────────────────────────────────── */}
      <footer className="flex items-end justify-between w-full">
        {/* Bottom-Left Brand Title (matching reference screenshot) */}
        <div className="pointer-events-auto text-left leading-tight">
          <div className="text-sm sm:text-base font-bold text-neutral-200 tracking-tight">
            Surya M.
          </div>
          <div className="text-xs font-mono text-neutral-400 tracking-tight">
            Developer Library
          </div>
        </div>

        {/* Bottom-Right Contextual Hint */}
        <div className="pointer-events-none hidden sm:block">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest opacity-80">
            [PULL LIGHT CORD TIP TO TOGGLE LIGHT · CLICK BOOK TO OPEN]
          </div>
        </div>
      </footer>
    </div>
  );
}
