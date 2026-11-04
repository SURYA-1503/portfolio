import React from "react";
import { interestsData } from "../../data/portfolioData";

export function HobbiesBook() {
  const hLeft = interestsData.slice(0, 2);
  const hRight = interestsData.slice(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Music & Gaming) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 06 // Beyond Code
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Sound &amp; Strategic Play
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Focus, Flow &amp; Mental Agility</p>
        </div>

        {hLeft.map((item) => (
          <div key={item.id} className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-rose-800">
              {item.tagline}
            </span>
            <h4 className="font-bold text-sm text-[#1a1612]">{item.title}</h4>
            <p className="text-[11px] text-[#4a3f33] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Right Page (Tech Exploration & Creative UI) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Curiosity &amp; Craft
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Exploration &amp; Interfaces
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Continuous Learning &amp; Design</p>
        </div>

        {hRight.map((item) => (
          <div key={item.id} className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-purple-800">
              {item.tagline}
            </span>
            <h4 className="font-bold text-sm text-[#1a1612]">{item.title}</h4>
            <p className="text-[11px] text-[#4a3f33] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

