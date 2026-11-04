import React from "react";
import { learningJourney } from "../../data/portfolioData";

export function JourneyBook() {
  const stepsLeft = learningJourney.slice(0, 2);
  const stepsRight = learningJourney.slice(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Early Foundations & Specialized Training) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 05 // Evolution
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Academic &amp; Training
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Foundational Milestones</p>
        </div>

        <div className="space-y-4 relative pl-4 border-l-2 border-[#d6c2a8]">
          {stepsLeft.map((step, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#1a1510] border-2 border-[#faf6ee]" />
              <div className="font-mono text-[10px] font-bold text-emerald-800">{step.year}</div>
              <h4 className="font-bold text-xs text-[#1a1612]">{step.title}</h4>
              <div className="font-mono text-[11px] text-[#6c5e4e]">{step.institution}</div>
              <p className="text-[11px] text-[#3c3429] leading-snug">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Page (Production Experience & Future Trajectory) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Current &amp; Forward Horizon
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Professional Trajectory
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">The Path to Full-Stack</p>
        </div>

        <div className="space-y-4 relative pl-4 border-l-2 border-[#d6c2a8]">
          {stepsRight.map((step, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-700 border-2 border-[#faf6ee]" />
              <div className="font-mono text-[10px] font-bold text-blue-900">{step.year}</div>
              <h4 className="font-bold text-xs text-[#1a1612]">{step.title}</h4>
              <div className="font-mono text-[11px] text-[#6c5e4e]">{step.institution}</div>
              <p className="text-[11px] text-[#3c3429] leading-snug">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

