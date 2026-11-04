import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Sun, Moon, BookOpen } from "lucide-react";

function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="font-mono text-xs tracking-widest text-neutral-400 select-none">
      <span className="text-neutral-300 font-bold">{h}</span>
      <span className="text-neutral-500 animate-pulse">:</span>
      <span className="text-neutral-300 font-bold">{m}</span>
      <span className="text-neutral-500 animate-pulse">:</span>
      <span className="text-neutral-400">{s}</span>
    </div>
  );
}

export function LibraryOverlay({
  isLightOn,
  onToggleLight,
  isAudioPlaying,
  onToggleAudio
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 select-none font-sans">

      {/* ── Top Bar ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between w-full">

        {/* Top-Left Brand */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400/80" />
            <span className="text-sm font-bold tracking-tight text-neutral-200">
              Developer Library
            </span>
          </div>
          <div className="text-[11px] font-mono text-neutral-500 mt-0.5 pl-6">
            Surya M. — Junior Dev @ Digiclarity
          </div>
        </div>

        {/* Top-Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">

          {/* Live Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/70 border border-neutral-800/60 backdrop-blur-sm">
            <LiveClock />
          </div>

          {/* Audio Toggle */}
          <motion.button
            type="button"
            onClick={onToggleAudio}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isAudioPlaying ? "Mute ambient audio" : "Play ambient audio"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/70 border border-neutral-800/60 backdrop-blur-sm text-neutral-400 hover:text-neutral-200 hover:border-neutral-600 transition-all cursor-pointer"
          >
            {isAudioPlaying
              ? <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              : <VolumeX className="w-3.5 h-3.5" />
            }
            <span className="text-[11px] font-mono hidden sm:inline">
              {isAudioPlaying ? "AMBIENT ON" : "AMBIENT"}
            </span>
          </motion.button>

          {/* Light Toggle */}
          <motion.button
            type="button"
            onClick={onToggleLight}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isLightOn ? "Turn lights off" : "Turn lights on"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-sm transition-all cursor-pointer ${
              isLightOn
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30"
                : "bg-neutral-900/70 border-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-600"
            }`}
          >
            <AnimatePresence mode="wait">
              {isLightOn ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-3.5 h-3.5" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-3.5 h-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="text-[11px] font-mono hidden sm:inline">
              {isLightOn ? "LIGHTS ON" : "LIGHTS OFF"}
            </span>
          </motion.button>

        </div>
      </header>

      {/* ── Bottom Bar ──────────────────────────────────────── */}
      <footer className="flex items-end justify-between w-full">

        {/* Bottom-Left hint */}
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-[11px] font-mono text-neutral-600 leading-relaxed"
          >
            <span className="text-neutral-500">Hover</span> a book to lift it
            <span className="mx-1.5 text-neutral-700">•</span>
            <span className="text-neutral-500">Click</span> to open
            <span className="mx-1.5 text-neutral-700">•</span>
            <span className="text-neutral-500">ESC</span> to close
          </motion.div>
        </div>

        {/* Bottom-Right: decorative */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-none">
          <div className="text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
            {isLightOn ? "☀ Warm Library Mode" : "🌙 Night Reading Mode"}
          </div>
        </div>

      </footer>
    </div>
  );
}
