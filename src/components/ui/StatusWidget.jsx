import React from "react";
import { motion } from "motion/react";
import { MapPin, Briefcase, Sparkles, Compass, Terminal } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

export function StatusWidget({ className = "" }) {
  const { status, location, coordinates } = personalInfo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`glass-panel rounded-2xl p-4 sm:p-5 border border-neutral-800/80 shadow-2xl relative overflow-hidden group ${className}`}
    >
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-cyan-500/0" />

      {/* Header telemetry */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/60 font-mono-code text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-semibold tracking-wider uppercase">
            Live Dev Telemetry
          </span>
        </div>
        <span className="text-neutral-500 tracking-wider">SYS.STATUS // OK</span>
      </div>

      {/* Status Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Current Role / Work */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/50">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-mono-code text-neutral-400 tracking-wider font-medium">
              Currently Working
            </div>
            <div className="text-neutral-200 font-medium truncate mt-0.5" title={status.currentlyWorking}>
              {status.currentlyWorking}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/50">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-mono-code text-neutral-400 tracking-wider font-medium">
              Location
            </div>
            <div className="text-neutral-200 font-medium truncate mt-0.5">
              {location}
            </div>
            <div className="text-[10px] font-mono-code text-neutral-500">
              {coordinates}
            </div>
          </div>
        </div>

        {/* Currently Learning */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/50">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-mono-code text-cyan-400/90 tracking-wider font-medium">
              Currently Learning
            </div>
            <div className="text-neutral-200 font-medium truncate mt-0.5" title={status.currentlyLearning}>
              {status.currentlyLearning}
            </div>
          </div>
        </div>

        {/* Exploring */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/50">
          <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 shrink-0 mt-0.5">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-mono-code text-violet-400/90 tracking-wider font-medium">
              Exploring Next
            </div>
            <div className="text-neutral-200 font-medium truncate mt-0.5" title={status.exploring}>
              {status.exploring}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

