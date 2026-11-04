import React from "react";
import { workExperience } from "../../data/portfolioData";

export function ExperienceBook() {
  const exp = workExperience[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Page Verso) */}
      <div className="space-y-4 text-xs sm:text-sm text-[#2a241e] leading-relaxed">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 03 // Career Logbook
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Professional Experience
          </h3>
          <p className="text-xs font-mono text-[#6c5e4e] mt-0.5">
            Digiclarity Global Solutions
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1 text-xs font-mono">
          <div className="font-bold text-sm text-[#1a1612]">{exp.role}</div>
          <div className="text-emerald-800 font-semibold">{exp.company}</div>
          <div className="text-[#6c5e4e]">{exp.location} | Current Employment</div>
          <div className="text-[11px] text-[#4a3f32] pt-1">
            <strong>AREA:</strong> {exp.area}
          </div>
        </div>

        <p>
          Currently engaged as a Junior Software Developer at Digiclarity Global Solutions,
          specializing in backend development, scalable web services, and healthcare-related automation workflows.
        </p>

        <p className="text-xs text-[#5c5040] italic">
          Focused on writing clean, modular code, exploring frontend integration, and enhancing DevOps knowledge with containerization and cloud infrastructure.
        </p>
      </div>

      {/* Right Page (Page Recto) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Responsibilities &amp; Scope
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Key Engineering Tasks
          </h3>
        </div>

        <ul className="space-y-2.5 list-disc list-outside ml-4 text-xs text-[#3a3228] leading-relaxed">
          {exp.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>

        <div className="pt-2">
          <span className="text-[10px] font-mono uppercase font-bold text-[#6c5e4e] block mb-1.5">
            Technologies Applied:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[#f0e7d7] border border-[#ded2bd] text-[11px] font-mono text-[#2c2419]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#ebd7bd] border border-[#d4bf9f] text-[10px] font-mono text-[#5c5040]">
          🔒 Confidentiality Guard: All sensitive healthcare client credentials, private URLs, and protected data are strictly omitted in compliance with HIPAA and corporate data standards.
        </div>
      </div>
    </div>
  );
}

