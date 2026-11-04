import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BOOKS_CATALOG } from "../../data/booksCatalog";
import {
  personalInfo,
  aboutNarrative,
  workExperience,
  skillsData,
  projectsData,
  educationData,
  certificationsData,
  interestsData,
  learningJourney
} from "../../data/portfolioData";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import confetti from "canvas-confetti";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  BookOpen,
  Send,
  Terminal,
  Server,
  Layers,
  Sparkles,
  Cpu,
  GraduationCap
} from "lucide-react";

export function PhysicalBookViewer({ bookIndex, onClose, onNavigate }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  if (bookIndex === null || bookIndex === undefined) return null;

  const currentBook = BOOKS_CATALOG[bookIndex];
  if (!currentBook) return null;

  const totalBooks = BOOKS_CATALOG.length;
  const prevIndex = (bookIndex - 1 + totalBooks) % totalBooks;
  const nextIndex = (bookIndex + 1) % totalBooks;

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#d9975b", "#10b981", "#38bdf8"]
      });
    } catch (err) {}
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#10b981", "#ffffff", "#38bdf8"]
      });
    } catch (err) {}
    setTimeout(() => setMessageSent(false), 3800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Outer 3D Book Stage with Perspective */}
        <div className="relative w-full max-w-5xl my-auto py-4" style={{ perspective: "2500px" }}>
          {/* Top Control Bar */}
          <div className="flex items-center justify-between pb-3 px-2 text-xs font-mono text-neutral-300">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 hover:border-neutral-400 text-neutral-200 transition-all cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                Close Book &amp; Return to Shelf <span className="text-neutral-500">[ESC]</span>
              </span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-neutral-400 hidden sm:inline-block">
                BOOK {currentBook.index} OF {totalBooks}:
              </span>
              <span
                className="font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[11px]"
                style={{
                  backgroundColor: `${currentBook.color}25`,
                  color: currentBook.color === "#f9fafb" ? "#ffffff" : currentBook.color
                }}
              >
                {currentBook.title}
              </span>

              <div className="flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => onNavigate(prevIndex)}
                  className="p-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 text-neutral-300 transition-colors cursor-pointer"
                  title="Previous Book"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(nextIndex)}
                  className="p-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 text-neutral-300 transition-colors cursor-pointer"
                  title="Next Book"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 ml-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* THE REAL 3D OPEN PHYSICAL BOOK CONTAINER */}
          <motion.div
            key={currentBook.id}
            initial={{ rotateX: 10, scale: 0.94, opacity: 0 }}
            animate={{ rotateX: 0, scale: 1, opacity: 1 }}
            exit={{ rotateX: 10, scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative rounded-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] border-4 border-[#231710] bg-[#2a1b14] p-2 sm:p-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Top Red Silk Bookmark Ribbon hanging from the spine */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-12 bg-rose-700 shadow-md z-30 rounded-b-sm border-x border-rose-900" />

            {/* Left & Right Page Spread Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden bg-[#faf6ee] text-[#1e1b18] shadow-inner relative min-h-[580px] max-h-[80vh]">
              {/* Central Spine Gutter Shadow (Creates realistic 3D book fold curvature) */}
              <div
                className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-20"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 40%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0.18) 100%)"
                }}
              />

              {/* ================= LEFT PAGE (PAGE VERSO) ================= */}
              <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-b md:border-b-0 md:border-r border-[#e8dfcf] relative">
                {/* Header telemetry on left page */}
                <div className="flex items-center justify-between pb-3 border-b border-[#ded4c0] text-[11px] font-mono text-[#786c5a] uppercase tracking-wider mb-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: currentBook.color }}
                    />
                    <span className="font-bold text-[#3c3429]">SURYA M. // ARCHIVE</span>
                  </div>
                  <span>VOL. {currentBook.index}</span>
                </div>

                {/* Left Page Core Content */}
                <div className="space-y-4">
                  {/* Book Title & Chapter */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8c7e6c]">
                      {currentBook.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a1612]">
                      {currentBook.title}
                    </h2>
                    <p className="text-xs font-mono text-[#6c6050] mt-0.5">
                      — {currentBook.subtitle}
                    </p>
                  </div>

                  {/* 01 – ABOUT ME (Left Page) */}
                  {currentBook.id === "about-me" && (
                    <div className="space-y-3.5 text-sm leading-relaxed text-[#2c2620]">
                      <div className="p-3.5 rounded-lg bg-[#f0e8d9] border border-[#ded3be] text-xs font-mono space-y-1">
                        <div><strong className="text-[#1a1612]">NAME:</strong> {personalInfo.name}</div>
                        <div><strong className="text-[#1a1612]">POSITION:</strong> {personalInfo.currentRole}</div>
                        <div><strong className="text-[#1a1612]">COMPANY:</strong> {personalInfo.currentCompany}</div>
                        <div><strong className="text-[#1a1612]">BASE:</strong> {personalInfo.location}</div>
                      </div>
                      <p>{aboutNarrative.intro}</p>
                      <p>{aboutNarrative.experienceHighlight}</p>
                      <p className="italic text-xs text-[#5c5040]">{aboutNarrative.personalNote}</p>
                    </div>
                  )}

                  {/* 02 – MY SKILLS (Left Page: Active Competencies) */}
                  {currentBook.id === "my-skills" && (
                    <div className="space-y-3.5 text-xs">
                      <div className="p-2.5 rounded bg-emerald-900/10 border border-emerald-700/30 text-emerald-900 font-mono text-[11px] font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shadow-sm" />
                        ACTIVE PRODUCTION COMPETENCIES
                      </div>
                      <p className="text-[#3a3228] text-xs">
                        Technologies and tools I work with to build robust services, manage databases, and automate workflows:
                      </p>
                      <div className="space-y-2.5">
                        {skillsData.categories
                          .filter((c) => ["languages", "backend", "database", "automation"].includes(c.id))
                          .map((cat) => (
                            <div key={cat.id} className="space-y-1">
                              <span className="font-mono text-[10px] uppercase font-bold text-[#6a5e4e]">
                                {cat.title}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {cat.skills.map((s) => (
                                  <span
                                    key={s.name}
                                    className="px-2 py-0.5 rounded bg-[#ebd8c0] border border-[#d6c2a8] text-[#2c2419] font-mono text-[11px] font-medium"
                                  >
                                    {s.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 03 – EXPERIENCE (Left Page) */}
                  {currentBook.id === "experience" && (
                    <div className="space-y-3.5 text-xs text-[#2c2620]">
                      <div className="p-3.5 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8]">
                        <div className="font-bold text-sm text-[#1a1612]">{workExperience[0].role}</div>
                        <div className="font-mono text-emerald-800 font-semibold text-xs mt-0.5">
                          {workExperience[0].company}
                        </div>
                        <div className="font-mono text-[11px] text-[#6c5e4e] mt-1">
                          Current Employment | {workExperience[0].location}
                        </div>
                      </div>
                      <p className="leading-relaxed text-sm">
                        Working in backend development with a dedicated focus on building scalable web services, REST APIs, and healthcare-related automation workflows.
                      </p>
                      <div className="p-3 rounded bg-[#f2eadd] border border-[#ded3be] text-[11px] font-mono text-[#5c5040]">
                        <strong>WORK AREA:</strong> {workExperience[0].area}
                      </div>
                    </div>
                  )}

                  {/* 04 – MY PROJECTS (Left Page) */}
                  {currentBook.id === "my-projects" && (
                    <div className="space-y-3 text-xs">
                      {/* Project 1 */}
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1a1612]">1. Healthcare Automation</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-800/10 text-emerald-900 font-semibold">
                            Professional Scope
                          </span>
                        </div>
                        <p className="text-[11px] text-[#3c3429] leading-snug">
                          Production automation workflow with Playwright headless browser orchestration, FastAPI, and SQL task validation.
                        </p>
                        <div className="font-mono text-[10px] text-[#5c5040]">
                          Python · Playwright · FastAPI · SQL
                        </div>
                      </div>

                      {/* Project 2 */}
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1a1612]">2. Hospital Management</span>
                          <a
                            href="https://github.com/SURYA-1503/Hospital-Management"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono text-blue-900 underline font-semibold flex items-center gap-0.5"
                          >
                            [GitHub] <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                        <p className="text-[11px] text-[#3c3429] leading-snug">
                          Backend system for doctor appointments, medicine dosage, branch info, and layered Spring Boot CRUD architecture.
                        </p>
                        <div className="font-mono text-[10px] text-[#5c5040]">
                          Java · Spring Boot · REST API · MySQL
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 05 – MY JOURNEY (Left Page) */}
                  {currentBook.id === "my-journey" && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] font-bold text-emerald-900">2020 – 2024</span>
                        <h4 className="font-bold text-xs text-[#1a1612]">B.E. Computer Science and Engineering</h4>
                        <div className="font-mono text-[11px] text-[#5c5040]">K.S. Rangasamy College of Technology</div>
                        <div className="font-mono text-[10px] text-emerald-800 font-semibold">CGPA: 8.12 / 10</div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] font-bold text-blue-900">2024</span>
                        <h4 className="font-bold text-xs text-[#1a1612]">Java Full Stack Development Training</h4>
                        <div className="font-mono text-[11px] text-[#5c5040]">QSpiders, Velachery, Chennai</div>
                        <p className="text-[11px] text-[#3c3429]">
                          Intensive hands-on training across enterprise Java, Spring Boot, JDBC, and SQL.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 06 – HOBBIES (Left Page) */}
                  {currentBook.id === "hobbies-interests" && (
                    <div className="space-y-3 text-xs text-[#2c2620]">
                      <div className="p-3.5 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] uppercase font-bold text-rose-900">SOUND &amp; FOCUS</span>
                        <h4 className="font-bold text-sm text-[#1a1612]">Listening to Music</h4>
                        <p className="text-[11px] text-[#4a4034] leading-relaxed">
                          Curating focus soundtracks, ambient lo-fi, and instrumental music while architecting clean backend systems and automation pipelines.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] uppercase font-bold text-purple-900">TACTICAL SHARPNESS</span>
                        <h4 className="font-bold text-sm text-[#1a1612]">Playing Video Games</h4>
                        <p className="text-[11px] text-[#4a4034] leading-relaxed">
                          Competitive multiplayer and tactical story-driven games that enhance rapid strategic thinking and decision-making under pressure.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 07 – EDUCATION (Left Page) */}
                  {currentBook.id === "education" && (
                    <div className="space-y-3 text-xs">
                      {educationData.map((edu, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-0.5">
                          <span className="font-mono text-[10px] font-bold text-[#6c5e4e]">{edu.period}</span>
                          <h4 className="font-bold text-xs text-[#1a1612]">{edu.degree}</h4>
                          <div className="font-mono text-[11px] text-[#4a4034]">{edu.institution}</div>
                          <div className="font-mono text-[10px] text-emerald-900 font-semibold">{edu.score}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 08 – RESUME (Left Page) */}
                  {currentBook.id === "resume" && (
                    <div className="space-y-3.5 text-xs text-[#2c2620]">
                      <div className="p-3.5 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <h4 className="font-bold text-sm text-[#1a1612]">Curriculum Vitae (ATS Compliant)</h4>
                        <p className="text-[11px] text-[#4a4034]">
                          Clean, structured resume containing verified education, professional Digiclarity experience, projects, and skills.
                        </p>
                      </div>
                      <Button
                        variant="primary"
                        size="md"
                        icon={Printer}
                        onClick={() => window.print()}
                        className="w-full text-xs font-mono"
                      >
                        Print / Download PDF Resume
                      </Button>
                      <p className="text-[11px] text-[#6c5e4e] italic text-center">
                        Formatted strictly for technical recruiters and Applicant Tracking Systems.
                      </p>
                    </div>
                  )}

                  {/* 09 – CONTACT (Left Page) */}
                  {currentBook.id === "contact" && (
                    <div className="space-y-3.5 text-xs text-[#2c2620]">
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#6c5e4e]">DIRECT EMAIL</span>
                        <div className="font-mono font-bold text-xs text-[#1a1612] truncate">{personalInfo.email}</div>
                        <Button
                          variant={copiedEmail ? "primary" : "secondary"}
                          size="sm"
                          onClick={handleCopyEmail}
                          icon={copiedEmail ? Check : Copy}
                          className="w-full text-[11px] font-mono mt-1"
                        >
                          {copiedEmail ? "Email Copied to Clipboard!" : "Copy Email Address"}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        <a
                          href={personalInfo.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded bg-[#f0e8d9] border border-[#ded3be] hover:border-[#1a1612] text-[#1a1612] flex items-center justify-center gap-1.5 font-semibold transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> GitHub
                        </a>
                        <a
                          href={personalInfo.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded bg-[#f0e8d9] border border-[#ded3be] hover:border-[#1a1612] text-[#1a1612] flex items-center justify-center gap-1.5 font-semibold transition-colors"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Left Page Footer page numbering */}
                <div className="pt-3 border-t border-[#ded4c0] text-[10px] font-mono text-[#8c7e6c] flex justify-between">
                  <span>CHAPTER {currentBook.index}</span>
                  <span>PAGE {Number(currentBook.index) * 2 - 1}</span>
                </div>
              </div>

              {/* ================= RIGHT PAGE (PAGE RECTO) ================= */}
              <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative">
                {/* Header telemetry on right page */}
                <div className="flex items-center justify-between pb-3 border-b border-[#ded4c0] text-[11px] font-mono text-[#786c5a] uppercase tracking-wider mb-5">
                  <span>DIGITAL SPECIMEN // SURYA M.</span>
                  <span>PAGE {Number(currentBook.index) * 2}</span>
                </div>

                {/* Right Page Core Content */}
                <div className="space-y-4">
                  {/* 01 – ABOUT ME (Right Page: Growth & Goals) */}
                  {currentBook.id === "about-me" && (
                    <div className="space-y-3.5 text-xs text-[#2c2620] leading-relaxed">
                      <h4 className="font-mono text-xs uppercase font-bold text-[#5c5040]">
                        Long-Term Career Direction
                      </h4>
                      <p className="text-sm">{aboutNarrative.growthMindset}</p>
                      <div className="p-4 rounded-xl bg-[#ebd8c0] border border-[#d6c2a8] text-[#1a1612] text-xs font-semibold">
                        ★ {aboutNarrative.longTermGoal}
                      </div>
                      <div className="pt-2 flex flex-col gap-2">
                        <Button variant="primary" size="sm" onClick={() => onNavigate(1)} className="font-mono text-xs">
                          Turn to Chapter 02: My Skills →
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* 02 – MY SKILLS (Right Page: Currently Learning / Expansion) */}
                  {currentBook.id === "my-skills" && (
                    <div className="space-y-3.5 text-xs">
                      <div className="p-2.5 rounded bg-cyan-950/10 border border-cyan-700/30 text-cyan-900 font-mono text-[11px] font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full border border-dashed border-cyan-600 bg-cyan-200" />
                        CURRENTLY LEARNING &amp; EXPANDING
                      </div>
                      <p className="text-[#3a3228] text-xs leading-relaxed">
                        To fulfill my vision of becoming a versatile Full-Stack Developer, I am actively expanding my knowledge across these technologies:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "React.js", field: "Frontend UI & State" },
                          { name: "Docker", field: "Containerization" },
                          { name: "Google Cloud Platform", field: "Cloud Architecture" },
                          { name: "CI/CD Pipelines", field: "Automated Deployments" }
                        ].map((t) => (
                          <div key={t.name} className="p-2.5 rounded bg-[#f0e8d9] border border-cyan-800/20 space-y-0.5">
                            <div className="font-bold text-[#1a1612] text-xs flex items-center justify-between">
                              <span>{t.name}</span>
                              <span className="text-[9px] font-mono text-cyan-800 font-semibold px-1 rounded bg-cyan-100">
                                LEARNING
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-[#6c5e4e]">{t.field}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 03 – EXPERIENCE (Right Page: Engineering Log) */}
                  {currentBook.id === "experience" && (
                    <div className="space-y-3 text-xs text-[#2c2620]">
                      <h4 className="font-mono text-xs uppercase font-bold text-[#5c5040]">
                        Key Engineering Scope &amp; Responsibilities
                      </h4>
                      <ul className="space-y-2 list-disc list-outside ml-4 text-[11px] text-[#3a3228]">
                        {workExperience[0].points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                      <div className="p-3 rounded bg-[#f2eadd] border border-[#ded3be] text-[10px] font-mono text-[#6c5e4e]">
                        Confidentiality Guarantee: Specific client records, internal URLs, and patient health information are strictly protected.
                      </div>
                    </div>
                  )}

                  {/* 04 – MY PROJECTS (Right Page: Projects 3 & 4) */}
                  {currentBook.id === "my-projects" && (
                    <div className="space-y-3 text-xs">
                      {/* Project 3 */}
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1a1612]">3. Bus Reservation System</span>
                          <a
                            href="https://github.com/SURYA-1503/BusReservation"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono text-blue-900 underline font-semibold flex items-center gap-0.5"
                          >
                            [GitHub] <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                        <p className="text-[11px] text-[#3c3429] leading-snug">
                          Java application for bus ticket bookings, seat preference tracking, cancellation logic, and direct JDBC database transactions.
                        </p>
                        <div className="font-mono text-[10px] text-[#5c5040]">
                          Java · JDBC · MySQL
                        </div>
                      </div>

                      {/* Project 4 */}
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1a1612]">4. Online Shopping Management</span>
                          <a
                            href="https://github.com/SURYA-1503/Online-Shopping-Management"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono text-blue-900 underline font-semibold flex items-center gap-0.5"
                          >
                            [GitHub] <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                        <p className="text-[11px] text-[#3c3429] leading-snug">
                          Interactive shopping web app with dynamic product listing, cart state, DOM manipulation, and LocalStorage persistence.
                        </p>
                        <div className="font-mono text-[10px] text-[#5c5040]">
                          HTML · CSS · JavaScript · LocalStorage
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 05 – MY JOURNEY (Right Page: Current & Forward) */}
                  {currentBook.id === "my-journey" && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] font-bold text-amber-900">CURRENT ROLE</span>
                        <h4 className="font-bold text-xs text-[#1a1612]">Junior Software Developer</h4>
                        <div className="font-mono text-[11px] text-[#5c5040]">Digiclarity Global Solutions</div>
                        <p className="text-[11px] text-[#3c3429]">
                          Engineering backend services and healthcare automation workflows with Python &amp; Playwright.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] font-bold text-purple-900">FORWARD EXPANSION</span>
                        <h4 className="font-bold text-xs text-[#1a1612]">Full-Stack Engineering &amp; Cloud</h4>
                        <p className="text-[11px] text-[#3c3429]">
                          Deepening competencies across React, Dockerization, Google Cloud Platform (GCP), and automated CI/CD deployment pipelines.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 06 – HOBBIES (Right Page) */}
                  {currentBook.id === "hobbies-interests" && (
                    <div className="space-y-3 text-xs text-[#2c2620]">
                      <div className="p-3.5 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] uppercase font-bold text-cyan-900">CURIOSITY &amp; RADAR</span>
                        <h4 className="font-bold text-sm text-[#1a1612]">Exploring New Technologies</h4>
                        <p className="text-[11px] text-[#4a4034] leading-relaxed">
                          Experimenting with emerging cloud-native tools, distributed services, and learning new developer workflows that broaden technical perspective.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#ebd8c0] border border-[#d6c2a8] space-y-1">
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-900">AESTHETICS &amp; INTERFACES</span>
                        <h4 className="font-bold text-sm text-[#1a1612]">Creative UI &amp; Web Design</h4>
                        <p className="text-[11px] text-[#4a4034] leading-relaxed">
                          Studying experimental interaction design, tactile 3D interfaces, and fluid micro-interactions inspired by world-class creative engineering.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 07 – EDUCATION (Right Page: Certifications) */}
                  {currentBook.id === "education" && (
                    <div className="space-y-3 text-xs">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#6c5e4e]">
                        Professional Certifications
                      </span>
                      {certificationsData.map((cert, idx) => (
                        <div key={idx} className="p-2.5 rounded bg-[#ebd8c0] border border-[#d6c2a8] space-y-0.5">
                          <h4 className="font-bold text-xs text-[#1a1612]">{cert.title}</h4>
                          <div className="font-mono text-[11px] text-[#4a4034]">{cert.issuer}</div>
                          <div className="font-mono text-[10px] text-emerald-900">{cert.period}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 08 – RESUME (Right Page: Detailed Highlights) */}
                  {currentBook.id === "resume" && (
                    <div className="space-y-3 text-xs text-[#2c2620]">
                      <h4 className="font-mono text-xs uppercase font-bold text-[#5c5040]">
                        Core Qualifications Summary
                      </h4>
                      <ul className="space-y-1.5 list-disc ml-4 text-[11px] text-[#3c3429]">
                        <li><strong>Education:</strong> B.E. CSE (CGPA 8.12/10), KSR College of Technology.</li>
                        <li><strong>Current Role:</strong> Junior Software Developer @ Digiclarity Global Solutions.</li>
                        <li><strong>Primary Languages:</strong> Java, Python.</li>
                        <li><strong>Backend:</strong> FastAPI, Spring Boot, JDBC, REST APIs, SQL.</li>
                        <li><strong>Databases:</strong> MySQL, PostgreSQL.</li>
                        <li><strong>Automation:</strong> Playwright, Python Automation.</li>
                        <li><strong>Actively Learning:</strong> React.js, Docker, GCP, CI/CD.</li>
                      </ul>
                      <div className="p-3 rounded bg-[#ebd8c0] border border-[#d6c2a8] font-mono text-[10px] text-[#5c5040]">
                        Click the &quot;Print / Download PDF Resume&quot; button on the left page to open the formatted recruiter print sheet.
                      </div>
                    </div>
                  )}

                  {/* 09 – CONTACT (Right Page: Inquiry Form) */}
                  {currentBook.id === "contact" && (
                    <form onSubmit={handleContactSubmit} className="space-y-2.5 text-xs">
                      <h4 className="font-mono text-xs uppercase font-bold text-[#5c5040]">
                        Send a Message to Surya M.
                      </h4>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#f0e8d9] border border-[#ded3be] text-xs text-[#1a1612] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1612]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#f0e8d9] border border-[#ded3be] text-xs text-[#1a1612] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1612]"
                      />
                      <textarea
                        rows={3}
                        required
                        placeholder="Your inquiry or collaboration note..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#f0e8d9] border border-[#ded3be] text-xs text-[#1a1612] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1612] resize-none"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        icon={messageSent ? Check : Send}
                        className="w-full font-mono text-xs"
                      >
                        {messageSent ? "Message Transmitted!" : "Transmit Inquiry"}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Right Page Footer */}
                <div className="pt-3 border-t border-[#ded4c0] text-[10px] font-mono text-[#8c7e6c] flex justify-between items-center">
                  <span>SURYA M. // DEVELOPER ARCHIVE</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate(prevIndex)}
                      className="hover:text-[#1a1612] underline cursor-pointer"
                    >
                      ← Prev Chapter
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => onNavigate(nextIndex)}
                      className="hover:text-[#1a1612] underline cursor-pointer"
                    >
                      Next Chapter →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

