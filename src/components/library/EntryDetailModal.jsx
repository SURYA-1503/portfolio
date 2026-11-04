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
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import confetti from "canvas-confetti";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  Send,
  Database,
  Server,
  Workflow
} from "lucide-react";

export function EntryDetailModal({ bookIndex, onClose, onNavigate }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactFormSent, setContactFormSent] = useState(false);
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
        colors: ["#10b981", "#38bdf8", "#f3f4f6"]
      });
    } catch (err) {}
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactFormSent(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10b981", "#38bdf8", "#ffffff"]
      });
    } catch (err) {}
    setTimeout(() => setContactFormSent(false), 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          key={currentBook.id}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl bg-[#0d0f17] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto text-neutral-200"
        >
          {/* Top Editorial Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-neutral-950/90 border-b border-neutral-800 text-xs font-mono">
            {/* Return / Close button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Return to Library <span className="text-neutral-500">[ESC]</span>
                </span>
              </button>

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-neutral-800">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: currentBook.color }}
                />
                <span className="text-neutral-400 font-semibold uppercase">
                  {currentBook.index} // {currentBook.category}
                </span>
              </div>
            </div>

            {/* Next / Previous Navigator */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate(prevIndex)}
                className="p-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
                title="Previous Book"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-neutral-500 text-[11px] px-1 font-semibold">
                {currentBook.index} / {totalBooks}
              </span>
              <button
                type="button"
                onClick={() => onNavigate(nextIndex)}
                className="p-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
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

          {/* Book Banner Bar with Spine Color Accent */}
          <div
            className="px-6 py-4 flex items-center justify-between border-b border-neutral-800/80"
            style={{
              backgroundColor: `${currentBook.color}15`,
              borderLeft: `4px solid ${currentBook.color}`
            }}
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                {currentBook.category}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 flex items-center gap-2">
                <span>{currentBook.title}</span>
                <span className="text-sm font-normal text-neutral-400">— {currentBook.subtitle}</span>
              </h1>
            </div>
            <div className="hidden sm:block text-right font-mono text-[11px] text-neutral-400">
              <div>{currentBook.tagline}</div>
              <div className="text-neutral-500">REF: SM.{currentBook.index}</div>
            </div>
          </div>

          {/* Scrollable Entry Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
            {/* 01 – ABOUT ME */}
            {currentBook.id === "about-me" && (
              <div className="space-y-6 max-w-3xl">
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 font-mono text-xs flex flex-wrap gap-4 text-neutral-300">
                  <div><span className="text-neutral-500">DEVELOPER:</span> {personalInfo.name}</div>
                  <div><span className="text-neutral-500">ROLE:</span> {personalInfo.currentRole}</div>
                  <div><span className="text-neutral-500">LOCATION:</span> {personalInfo.location}</div>
                  <div><span className="text-neutral-500">GPS:</span> {personalInfo.coordinates}</div>
                </div>

                <div className="space-y-4 text-neutral-300 text-base leading-relaxed">
                  <p>{aboutNarrative.intro}</p>
                  <p>{aboutNarrative.experienceHighlight}</p>
                  <p>{aboutNarrative.growthMindset}</p>
                  <p className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-sm">
                    <strong>Career Target:</strong> {aboutNarrative.longTermGoal}
                  </p>
                  <p className="text-neutral-400 italic text-sm">{aboutNarrative.personalNote}</p>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-3">
                  <Button variant="primary" size="sm" onClick={() => onNavigate(1)}>
                    View Professional Experience →
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onNavigate(3)}>
                    Explore Skills Matrix →
                  </Button>
                </div>
              </div>
            )}

            {/* 02 – PROFESSIONAL EXPERIENCE */}
            {currentBook.id === "experience" && (
              <div className="space-y-6 max-w-3xl">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-neutral-800">
                      <div>
                        <h2 className="text-lg font-bold text-neutral-100">{exp.role}</h2>
                        <div className="text-emerald-400 font-medium font-mono text-xs">{exp.company}</div>
                      </div>
                      <div className="text-xs font-mono text-neutral-400">
                        Current Employment | {exp.location}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      Work Focus: <span className="text-neutral-200">{exp.area}</span>
                    </div>

                    <ul className="space-y-2.5 text-neutral-300 text-sm list-disc list-outside ml-4">
                      {exp.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-neutral-800/60">
                      <div className="text-xs font-mono text-neutral-400 mb-2">Technologies Used:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 font-mono text-xs text-neutral-400">
                  🔒 <em>Note: Specific internal client URLs, protected patient data, and private API credentials are strictly maintained in adherence to professional confidentiality.</em>
                </div>
              </div>
            )}

            {/* 03 – BACKEND DEVELOPMENT */}
            {currentBook.id === "backend-dev" && (
              <div className="space-y-6 max-w-3xl">
                <p className="text-neutral-300">
                  Backend development is my primary focus. I specialize in designing robust REST APIs,
                  managing relational schemas, and developing reliable services using <strong>Python (FastAPI)</strong> and <strong>Java (Spring Boot, JDBC)</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono text-xs uppercase">
                      <Server className="w-4 h-4" /> Python &amp; FastAPI Stack
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Async endpoints, Pydantic type validation, high-performance microservices, and database task management for automation workflows.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold font-mono text-xs uppercase">
                      <Cpu className="w-4 h-4" /> Java &amp; Spring Boot Stack
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Layered enterprise architecture, Spring Data/JDBC, dependency injection, and relational transactional integrity.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-violet-400 font-semibold font-mono text-xs uppercase">
                      <Database className="w-4 h-4" /> Relational Databases
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Relational schema design in MySQL and PostgreSQL, complex SQL joins, indexing, and transactional isolation.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold font-mono text-xs uppercase">
                      <Workflow className="w-4 h-4" /> Automation Architecture
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Browser orchestration with Playwright, asynchronous batch queues, and reliable error-recovery state machines.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 04 – TECHNICAL SKILLS MATRIX */}
            {currentBook.id === "technical-skills" && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-neutral-200 font-medium">Active Production Competency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full border border-dashed border-cyan-400 bg-cyan-950/40" />
                    <span className="text-cyan-300 font-medium">Currently Learning / In Progress</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {skillsData.categories.map((cat) => (
                    <div key={cat.id} className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 space-y-2.5">
                      <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                        {cat.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <Badge key={skill.name} isLearning={skill.isLearning}>
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 05 – HEALTHCARE AUTOMATION */}
            {currentBook.id === "healthcare-automation" && (
              <div className="space-y-6 max-w-3xl">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                  ★ Professional Scope @ Digiclarity Global Solutions
                </div>

                <p className="text-neutral-300 leading-relaxed text-base">
                  {projectsData.find((p) => p.id === "proj-automation")?.summary}
                </p>

                <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Core Engineering Highlights
                  </h2>
                  <ul className="space-y-2 text-sm text-neutral-300 list-disc list-outside ml-4">
                    {projectsData.find((p) => p.id === "proj-automation")?.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60 font-mono text-xs text-neutral-500">
                  Compliance Safeguard: Real credentials, patient identities, and internal healthcare systems are omitted to maintain strict operational integrity and HIPAA/data confidentiality.
                </div>
              </div>
            )}

            {/* 06, 07, 08 – PROJECT SHOWCASES */}
            {["hospital-ms", "bus-transit", "online-shopping"].includes(currentBook.id) && (() => {
              const projMap = {
                "hospital-ms": projectsData.find((p) => p.id === "proj-hospital"),
                "bus-transit": projectsData.find((p) => p.id === "proj-bus"),
                "online-shopping": projectsData.find((p) => p.id === "proj-ecommerce")
              };
              const proj = projMap[currentBook.id];
              if (!proj) return null;

              return (
                <div className="space-y-6 max-w-3xl">
                  <p className="text-neutral-300 text-base leading-relaxed">{proj.summary}</p>

                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                      Key Technical Features
                    </h2>
                    <ul className="space-y-2 text-sm text-neutral-300 list-disc list-outside ml-4">
                      {proj.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2 font-mono text-xs">
                    <span className="text-neutral-400 font-semibold">TECH STACK:</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.technologies.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {proj.github && (
                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="md"
                        href={proj.github}
                        target="_blank"
                        icon={GithubIcon}
                      >
                        Inspect Code on GitHub
                      </Button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 09 – LEARNING JOURNEY */}
            {currentBook.id === "learning-journey" && (
              <div className="space-y-6 max-w-3xl">
                <div className="relative pl-6 space-y-6 border-l-2 border-neutral-800">
                  {learningJourney.map((step, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-neutral-950 border-2 border-emerald-400" />
                      <div className="text-xs font-mono text-emerald-400 font-semibold">{step.year}</div>
                      <h3 className="text-base font-bold text-neutral-100">{step.title}</h3>
                      <div className="text-xs font-mono text-neutral-400 mt-0.5">{step.institution}</div>
                      <p className="text-sm text-neutral-300 mt-2 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-neutral-800">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 font-semibold">
                    Academic Background &amp; Certifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    {educationData.map((edu, i) => (
                      <div key={i} className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                        <div className="font-bold text-neutral-200">{edu.degree}</div>
                        <div className="text-neutral-400 text-[11px]">{edu.institution}</div>
                        <div className="text-emerald-400 text-[10px] mt-1">{edu.score} | {edu.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10 – BEYOND THE CODE */}
            {currentBook.id === "beyond-code" && (
              <div className="space-y-6 max-w-3xl">
                <p className="text-neutral-300 text-base">
                  When I step away from code editors, I find balance, creative inspiration, and mental clarity through these pursuits:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interestsData.map((item) => (
                    <div key={item.id} className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                      <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                        {item.tagline}
                      </div>
                      <h3 className="text-base font-bold text-neutral-100">{item.title}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11 – ATS RESUME */}
            {currentBook.id === "resume-ats" && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div>
                    <div className="font-bold text-neutral-100 text-sm">Clean ATS Printable Resume</div>
                    <div className="text-xs text-neutral-400 font-mono">Standard Recruiter &amp; HR Compliant Format</div>
                  </div>
                  <Button variant="primary" size="sm" icon={Printer} onClick={() => window.print()}>
                    Print / Save PDF
                  </Button>
                </div>

                <div className="p-6 rounded-xl bg-white text-neutral-900 font-sans text-xs space-y-4 print:p-0">
                  <div className="border-b-2 border-neutral-900 pb-3">
                    <h2 className="text-2xl font-bold uppercase">{personalInfo.name}</h2>
                    <p className="font-semibold text-neutral-800">{personalInfo.shortBio}</p>
                    <div className="text-neutral-600 font-mono text-[11px] mt-1">
                      {personalInfo.location} | {personalInfo.phone} | {personalInfo.email}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-[11px] font-mono border-b pb-1 mb-1">
                      Current Work Experience
                    </h3>
                    <div className="font-bold text-neutral-900">
                      Junior Software Developer — {personalInfo.currentCompany}
                    </div>
                    <div className="text-neutral-600 italic mb-1 text-[11px]">Domain: Healthcare Automation &amp; Backend</div>
                    <ul className="list-disc ml-4 space-y-1 text-neutral-800">
                      {workExperience[0].points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-[11px] font-mono border-b pb-1 mb-1">
                      Technical Skills
                    </h3>
                    <p className="text-neutral-800">
                      <strong>Languages:</strong> Java, Python | <strong>Backend:</strong> FastAPI, Spring Boot, JDBC, REST APIs | <strong>Databases:</strong> MySQL, PostgreSQL, SQL | <strong>Automation:</strong> Playwright, Python Automation | <strong>Frontend (Learning):</strong> HTML, CSS, JavaScript, React | <strong>Tools &amp; Cloud:</strong> Git, GitHub, Docker (Learning), GCP (Learning), CI/CD (Learning)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-[11px] font-mono border-b pb-1 mb-1">
                      Education
                    </h3>
                    <div><strong>B.E. Computer Science and Engineering</strong> — K.S. Rangasamy College of Technology (CGPA: 8.12/10, 2020–2024)</div>
                  </div>
                </div>
              </div>
            )}

            {/* 12 – CONTACT & TRANSMISSION */}
            {currentBook.id === "contact" && (
              <div className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" /> EMAIL
                    </div>
                    <div className="text-xs font-semibold text-neutral-200 truncate">{personalInfo.email}</div>
                    <Button
                      variant={copiedEmail ? "primary" : "secondary"}
                      size="sm"
                      onClick={handleCopyEmail}
                      icon={copiedEmail ? Check : Copy}
                      className="w-full text-xs"
                    >
                      {copiedEmail ? "Copied!" : "Copy Email"}
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <GithubIcon className="w-3.5 h-3.5 text-emerald-400" /> GITHUB
                    </div>
                    <div className="text-xs font-semibold text-neutral-200">@SURYA-1503</div>
                    <Button
                      variant="secondary"
                      size="sm"
                      href={personalInfo.github}
                      target="_blank"
                      className="w-full text-xs"
                    >
                      Visit Profile
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                      <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" /> LINKEDIN
                    </div>
                    <div className="text-xs font-semibold text-neutral-200">Surya M.</div>
                    <Button
                      variant="secondary"
                      size="sm"
                      href={personalInfo.linkedin}
                      target="_blank"
                      className="w-full text-xs"
                    >
                      Connect
                    </Button>
                  </div>
                </div>

                {/* Direct Message Form */}
                <form onSubmit={handleContactSubmit} className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                    Send a Direct Message
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your message or collaboration inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500">
                      Direct transmission to {personalInfo.email}
                    </span>
                    <Button variant="primary" size="md" icon={contactFormSent ? Check : Send}>
                      {contactFormSent ? "Message Recorded!" : "Transmit Message"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

