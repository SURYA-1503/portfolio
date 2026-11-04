import React from "react";
import { projectsData } from "../../data/portfolioData";
import { ExternalLink } from "lucide-react";

export function ProjectsBook() {
  const p1 = projectsData.find((p) => p.id === "proj-automation");
  const p2 = projectsData.find((p) => p.id === "proj-hospital");
  const p3 = projectsData.find((p) => p.id === "proj-bus");
  const p4 = projectsData.find((p) => p.id === "proj-ecommerce");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Projects 1 & 2) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 04 // Showcase
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Key Projects — Part I
          </h3>
        </div>

        {/* Project 1: Healthcare Automation */}
        <div className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#1a1612]">1. Healthcare Automation</h4>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-800/15 text-emerald-900 font-semibold">
              Professional Work
            </span>
          </div>
          <p className="text-[11px] text-[#3c3429] leading-snug">{p1?.summary}</p>
          <div className="font-mono text-[10px] text-[#5c5040] pt-1">
            <strong>Stack:</strong> Python · Playwright · FastAPI · SQL · Automation
          </div>
        </div>

        {/* Project 2: Hospital Management System */}
        <div className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#1a1612]">2. Hospital Management System</h4>
            {p2?.github && (
              <a
                href={p2.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-blue-900 font-bold underline flex items-center gap-1 hover:text-blue-700"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-[11px] text-[#3c3429] leading-snug">{p2?.summary}</p>
          <div className="font-mono text-[10px] text-[#5c5040] pt-1">
            <strong>Stack:</strong> Java · Spring Boot · REST API · MySQL
          </div>
        </div>
      </div>

      {/* Right Page (Projects 3 & 4) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Architectural Implementations
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Key Projects — Part II
          </h3>
        </div>

        {/* Project 3: Bus Reservation System */}
        <div className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#1a1612]">3. Bus Reservation System</h4>
            {p3?.github && (
              <a
                href={p3.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-blue-900 font-bold underline flex items-center gap-1 hover:text-blue-700"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-[11px] text-[#3c3429] leading-snug">{p3?.summary}</p>
          <div className="font-mono text-[10px] text-[#5c5040] pt-1">
            <strong>Stack:</strong> Java · JDBC · MySQL
          </div>
        </div>

        {/* Project 4: Online Shopping Management */}
        <div className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#1a1612]">4. Online Shopping Management</h4>
            {p4?.github && (
              <a
                href={p4.github}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-blue-900 font-bold underline flex items-center gap-1 hover:text-blue-700"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-[11px] text-[#3c3429] leading-snug">{p4?.summary}</p>
          <div className="font-mono text-[10px] text-[#5c5040] pt-1">
            <strong>Stack:</strong> HTML · CSS · JavaScript · DOM · LocalStorage
          </div>
        </div>
      </div>
    </div>
  );
}

