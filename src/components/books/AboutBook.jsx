import React from "react";
import { personalInfo, aboutNarrative } from "../../data/portfolioData";

export function AboutBook() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Page Verso) */}
      <div className="space-y-4 text-xs sm:text-sm text-[#2a241e] leading-relaxed">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 01 // Identity
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            About Surya M.
          </h3>
          <p className="text-xs font-mono text-emerald-800 font-semibold mt-0.5">
            Junior Software Developer @ Digiclarity Global Solutions
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] text-xs font-mono space-y-1">
          <div><strong className="text-[#1a1612]">LOCATION:</strong> {personalInfo.location}</div>
          <div><strong className="text-[#1a1612]">COORDINATES:</strong> {personalInfo.coordinates}</div>
          <div><strong className="text-[#1a1612]">CORE DOMAIN:</strong> Backend Services &amp; Healthcare Automation</div>
        </div>

        <p>{aboutNarrative.intro}</p>
        <p>{aboutNarrative.experienceHighlight}</p>
      </div>

      {/* Right Page (Page Recto) */}
      <div className="space-y-4 text-xs sm:text-sm text-[#2a241e] leading-relaxed">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Career Vision &amp; Growth
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1612] tracking-tight">
            Full-Stack Aspirations
          </h3>
        </div>

        <p>{aboutNarrative.growthMindset}</p>

        <div className="p-4 rounded-xl bg-[#ebd7bd] border border-[#d4bf9f] text-[#1a1612] text-xs font-semibold leading-relaxed shadow-sm">
          ★ <strong>Long-Term Objective:</strong> {aboutNarrative.longTermGoal}
        </div>

        <p className="text-xs text-[#5a4d3e] italic pt-1">
          {aboutNarrative.personalNote}
        </p>

        <div className="pt-2 border-t border-[#ded3be] text-[11px] font-mono text-[#6c5e4e] flex justify-between">
          <span>SURYA M. // DEVELOPER ARCHIVE</span>
          <span>CHENNAI, INDIA</span>
        </div>
      </div>
    </div>
  );
}

