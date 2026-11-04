import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../../data/portfolioData";
import { Sun, Moon, Sparkles, Volume2, VolumeX, Menu } from "lucide-react";

export function LibraryOverlay({
  onOpenBook,
  onToggleIndex,
  isIndexOpen,
  isAudioPlaying,
  onToggleAudio,
  isLightOn,
  onToggleLight,
  hoveredBook
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-7 select-none text-neutral-300 font-sans">
      {/* Top Bar */}
      <header className="flex items-center justify-between w-full">
        {/* Top-Left Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
          <button
            type="button"
            onClick={() => onOpenBook(0)} // Book 01: ABOUT ME
            className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200 hover:text-amber-300 transition-colors cursor-pointer"
          >

          </button>
          <button
            type="button"
            onClick={() => onOpenBook(1)} // Book 02: MY SKILLS
            className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 hover:text-emerald-300 transition-colors cursor-pointer"
          >

          </button>
          <button
            type="button"
            onClick={() => onOpenBook(3)} // Book 04: MY PROJECTS
            className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 hover:text-sky-300 transition-colors cursor-pointer hidden sm:inline-block"
          >

          </button>
          <button
            type="button"
            onClick={() => onOpenBook(7)} // Book 08: RESUME
            className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer hidden sm:inline-block"
          >

          </button>
          <button
            type="button"
            onClick={() => onOpenBook(8)} // Book 09: CONTACT
            className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >

          </button>
        </div>
      </header>

      {/* Bottom Bar */}
      <footer className="flex items-end justify-between w-full">
        {/* Bottom-Left Brand Title */}
        <div className="pointer-events-auto">
          <div className="text-base sm:text-lg font-bold tracking-tight text-neutral-100 leading-tight">
            Surya M.
          </div>
          <div className="text-xs sm:text-sm font-mono text-neutral-400 tracking-tight flex items-center gap-2">
            <span>Developer Library</span>
            <span className="text-neutral-600">•</span>
            <span className="text-[11px] text-emerald-400">Junior Dev @ Digiclarity</span>
          </div>
        </div>

        {/* Bottom-Right Contextual Book Telemetry */}
        <div className="pointer-events-auto font-mono text-[11px] text-neutral-300 hidden sm:flex items-center gap-2">
          <AnimatePresence mode="wait">
            {hoveredBook ? (
              <motion.div
                key={hoveredBook.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 shadow-2xl backdrop-blur-md"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: hoveredBook.color }}
                />
                <span className="font-bold text-neutral-100 uppercase tracking-wide">
                  {hoveredBook.index} // {hoveredBook.title}
                </span>
                <span className="text-neutral-400">— {hoveredBook.subtitle}</span>
                <span className="text-amber-400 font-semibold tracking-wider ml-1">
                  [CLICK TO OPEN BOOK]
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800 text-neutral-400 tracking-wider text-[10px] uppercase font-mono"
              >
                [HOVER A BOOK TO LIFT &amp; TILT • CLICK TO OPEN]
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
    </div>
  );
}
