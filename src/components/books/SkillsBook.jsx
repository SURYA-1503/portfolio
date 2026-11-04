import React from "react";
import { skillsData } from "../../data/portfolioData";

export function SkillsBook() {
  const activeCategories = skillsData.categories.filter((c) =>
    ["languages", "backend", "database", "automation"].includes(c.id)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Active Production Skills) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
            Chapter 02 // Core Competencies
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Active Technologies
          </h3>
          <p className="text-xs text-[#6a5e4e] font-mono mt-0.5">
            Production-ready backend, databases &amp; automation tools
          </p>
        </div>

        <div className="space-y-3">
          {activeCategories.map((cat) => (
            <div key={cat.id} className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#6a5e4e]">
                {cat.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ebd7bd] border border-[#d6c09e] text-[#1f170d] font-mono text-[11px] font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Page (Currently Learning) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-900 font-bold">
            Forward Technical Expansion
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Currently Learning
          </h3>
          <p className="text-xs text-[#6a5e4e] font-mono mt-0.5">
            Expanding knowledge toward full-stack cloud engineering
          </p>
        </div>

        <p className="text-xs leading-relaxed text-[#3a3228]">
          To build end-to-end scalable architectures, I am actively expanding my capabilities across modern frontend interfaces, containerization, and cloud deployment pipelines:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { name: "React.js", domain: "Frontend UI & Component State" },
            { name: "Docker", domain: "Containerization & Workflows" },
            { name: "Google Cloud (GCP)", domain: "Cloud Architecture & Hosting" },
            { name: "CI/CD Pipelines", domain: "Automated Build & Deployment" }
          ].map((item) => (
            <div key={item.name} className="p-3 rounded-lg bg-[#f0e7d7] border border-cyan-800/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1a1612]">{item.name}</span>
                <span className="text-[9px] font-mono text-cyan-800 font-semibold px-1 py-0.2 rounded bg-cyan-100">
                  LEARNING
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#6c5e4e]">{item.domain}</div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-[#ebd7bd] border border-[#d4bf9f] text-[11px] font-mono text-[#4a3f32]">
          💡 <em>Clear Distinction: These emerging technologies represent current technical focus areas, while Java, Python, Spring Boot, FastAPI, MySQL, and Playwright form my solid production foundation.</em>
        </div>
      </div>
    </div>
  );
}

