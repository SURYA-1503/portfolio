import React from "react";
import { educationData, certificationsData } from "../../data/portfolioData";

export function EducationBook() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Academic Degrees & Schooling) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 07 // Academics
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Academic Background
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Formal Education Records</p>
        </div>

        <div className="space-y-3">
          {educationData.map((edu, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#6c5e4e]">{edu.period}</span>
              <h4 className="font-bold text-xs text-[#1a1612]">{edu.degree}</h4>
              <div className="font-mono text-[11px] text-[#4a3f33]">{edu.institution}</div>
              <div className="font-mono text-[11px] text-emerald-900 font-semibold">{edu.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Page (Professional Certifications) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Professional Credentials
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Certifications &amp; Training
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Industry Recognized Credentials</p>
        </div>

        <div className="space-y-3">
          {certificationsData.map((cert, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1">
              <span className="font-mono text-[10px] font-bold text-blue-900">{cert.period}</span>
              <h4 className="font-bold text-xs text-[#1a1612]">{cert.title}</h4>
              <div className="font-mono text-[11px] text-[#4a3f33]">{cert.issuer}</div>
              <div className="font-mono text-[10px] text-[#6c5e4e]">
                <strong>Skills:</strong> {cert.skills.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

