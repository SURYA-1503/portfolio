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

        {/* Top-Right Controls (Audio bars & minimal menu matching reference screenshot) */}
        <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
          {/* Audio toggle button with sound waves */}
          <button
            type="button"
            onClick={onToggleAudio}
            className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={isAudioPlaying ? "Mute ambient audio" : "Play ambient audio"}
          >
            {isAudioPlaying ? (
              <div className="flex items-center gap-0.5 h-3.5">
                <span className="w-0.5 h-3.5 bg-amber-300 animate-pulse" />
                <span className="w-0.5 h-2.5 bg-amber-300 animate-pulse delay-75" />
                <span className="w-0.5 h-3 bg-amber-300 animate-pulse delay-150" />
              </div>
            ) : (
              <div className="flex items-center gap-0.5 h-3.5 opacity-60">
                <span className="w-0.5 h-3 bg-neutral-400" />
                <span className="w-0.5 h-2 bg-neutral-400" />
                <span className="w-0.5 h-3 bg-neutral-400" />
              </div>
            )}
          </button>

          {/* Minimalist Menu icon */}
          <button
            type="button"
            onClick={() => onOpenBook?.(0)}
            className="p-1 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Browse library"
          >
            <Menu className="w-4 h-4" />
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
