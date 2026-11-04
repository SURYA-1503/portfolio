import React from "react";
import { personalInfo } from "../../data/portfolioData";
import { Button } from "../ui/Button";
import { Printer } from "lucide-react";

export function ResumeBook() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Resume Overview & PDF Download Action) */}
      <div className="space-y-4 text-xs sm:text-sm text-[#2a241e] leading-relaxed">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 08 // Curriculum Vitae
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            ATS Recruiter Resume
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Verified Career Dossier</p>
        </div>

        <div className="p-4 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-1 text-xs font-mono">
          <div><strong className="text-[#1a1612]">CANDIDATE:</strong> {personalInfo.name}</div>
          <div><strong className="text-[#1a1612]">TITLE:</strong> {personalInfo.shortBio}</div>
          <div><strong className="text-[#1a1612]">EMAIL:</strong> {personalInfo.email}</div>
          <div><strong className="text-[#1a1612]">LOCATION:</strong> {personalInfo.location}</div>
        </div>

        <p className="text-xs text-[#3a3228]">
          This document is strictly formatted to pass Applicant Tracking Systems (ATS) and provide technical recruiters with an authentic summary of skills, experience, and academic background.
        </p>

        <Button
          variant="primary"
          size="md"
          icon={Printer}
          onClick={() => window.print()}
          className="w-full text-xs font-mono"
        >
          Print / Download PDF Resume
        </Button>
      </div>

      {/* Right Page (Qualifications Summary) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Key Competency Sheet
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Verified Credentials
          </h3>
        </div>

        <div className="space-y-2.5 text-xs text-[#3a3228]">
          <div className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd]">
            <span className="font-bold text-[#1a1612] block">Current Employment</span>
            <span>Junior Software Developer @ {personalInfo.currentCompany}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd]">
            <span className="font-bold text-[#1a1612] block">Engineering Focus</span>
            <span>Backend Services, REST APIs, Healthcare Process Automation</span>
          </div>

          <div className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd]">
            <span className="font-bold text-[#1a1612] block">Primary Languages</span>
            <span>Java, Python, SQL, JavaScript</span>
          </div>

          <div className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd]">
            <span className="font-bold text-[#1a1612] block">Degree</span>
            <span>B.E. Computer Science (CGPA: 8.12 / 10), KSR College of Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}

