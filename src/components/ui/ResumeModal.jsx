import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, Code } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { personalInfo, aboutNarrative, workExperience, skillsData, educationData, certificationsData, projectsData } from "../../data/portfolioData";
import { Button } from "./Button";

export function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-b border-neutral-800 text-neutral-300 font-mono-code text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-neutral-200">SURYA_M_RESUME_ATS.PDF</span>
              <span className="text-neutral-500 hidden sm:inline-block">| Clean Recruiter Format</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                icon={Printer}
                onClick={handlePrint}
                className="text-xs"
              >
                Print / Save PDF
              </Button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content (Strict ATS Layout) */}
          <div className="overflow-y-auto p-6 sm:p-10 bg-white text-neutral-900 font-sans print:p-0 print:m-0 text-sm leading-relaxed" id="resume-document">
            {/* Candidate Header */}
            <header className="border-b-2 border-neutral-900 pb-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 uppercase">
                {personalInfo.name}
              </h1>
              <p className="text-base font-semibold text-neutral-800 mt-1">
                {personalInfo.shortBio}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-700 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-600" /> {personalInfo.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-600" /> {personalInfo.phone}
                </span>
                <span>•</span>
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-blue-700 hover:underline">
                  <Mail className="w-3.5 h-3.5" /> {personalInfo.email}
                </a>
                <span>•</span>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-700 hover:underline">
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
                <span>•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-700 hover:underline">
                  <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
                Professional Summary
              </h2>
              <p className="text-xs text-neutral-800 text-justify leading-relaxed">
                {aboutNarrative.intro} {aboutNarrative.experienceHighlight} {aboutNarrative.growthMindset} Dedicated to building scalable, maintainable architectures and delivering reliable automation pipelines.
              </p>
            </section>

            {/* Professional Experience */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
                Professional Experience
              </h2>
              {workExperience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-baseline font-bold text-xs text-neutral-950">
                    <span>{exp.role} — <span className="font-semibold text-neutral-800">{exp.company}</span></span>
                    <span className="text-neutral-600 font-mono text-[11px]">Current Employment | {exp.location}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-700 italic mb-1.5">
                    Domain: {exp.area}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-xs text-neutral-800 space-y-1">
                    {exp.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                  <div className="mt-1.5 text-[11px] text-neutral-700 font-mono">
                    <span className="font-bold">Technologies:</span> {exp.technologies.join(", ")}
                  </div>
                </div>
              ))}
            </section>

            {/* Technical Skills */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
                Technical Skills
              </h2>
              <div className="space-y-1 text-xs text-neutral-800">
                {skillsData.categories.map((cat) => (
                  <div key={cat.id} className="flex flex-wrap items-baseline gap-1">
                    <span className="font-bold w-44 shrink-0 text-neutral-900">{cat.title}:</span>
                    <span className="text-neutral-800">
                      {cat.skills
                        .map((s) => (s.isLearning ? `${s.name} (Learning)` : s.name))
                        .join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
                Key Projects
              </h2>
              <div className="space-y-3">
                {projectsData.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-neutral-950">
                      <span>
                        {proj.title}
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" className="text-blue-700 font-mono font-normal ml-2 hover:underline">
                            [GitHub Repo]
                          </a>
                        )}
                      </span>
                      <span className="text-neutral-600 font-mono text-[11px]">{proj.type}</span>
                    </div>
                    <p className="text-neutral-700 text-xs mt-0.5">{proj.summary}</p>
                    <div className="text-[11px] text-neutral-600 font-mono mt-0.5">
                      <span className="font-semibold text-neutral-800">Tech Stack:</span> {proj.technologies.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-neutral-950">{edu.degree}</span> — {edu.institution}
                    </div>
                    <div className="text-neutral-600 font-mono text-[11px] shrink-0 text-right">
                      {edu.score} | {edu.period}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
                Certifications & Training
              </h2>
              <div className="space-y-1.5 text-xs text-neutral-800">
                {certificationsData.map((cert, idx) => (
                  <div key={idx} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold text-neutral-950">{cert.title}</span> — {cert.issuer}
                    </div>
                    <span className="text-neutral-600 font-mono text-[11px]">{cert.period}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
