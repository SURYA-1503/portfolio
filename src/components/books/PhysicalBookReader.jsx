import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BOOK_PAGES_DATA } from "../../data/bookPagesData";
import { BOOKS_CATALOG } from "../../data/booksCatalog";
import { Button } from "../ui/Button";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import confetti from "canvas-confetti";
import {
  X,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Printer,
  Copy,
  Check,
  Send,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  FileText,
  MapPin,
  Mail,
  ShieldCheck
} from "lucide-react";

export function PhysicalBookReader({ bookIndex, onClose }) {
  // Page state: 0 = Index Page, 1 = Content Page 1/2, 2 = Content Page 2/2
  const [currentPage, setCurrentPage] = useState(0);
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next"); // 'next' or 'prev'
  const [isClosing, setIsClosing] = useState(false);

  // Form states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const currentBookMeta = bookIndex !== null && bookIndex !== undefined ? BOOKS_CATALOG[bookIndex] : null;
  const bookData = currentBookMeta ? BOOK_PAGES_DATA[currentBookMeta.id] : null;

  // On mount: smoothly animate front cover opening after the book arrives in center
  useEffect(() => {
    if (bookIndex !== null) {
      setCurrentPage(0);
      setIsClosing(false);
      const timer = setTimeout(() => {
        setIsCoverOpen(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsCoverOpen(false);
    }
  }, [bookIndex]);

  // Handle smooth page turning
  const turnToPage = (newPage, direction) => {
    if (isFlipping || newPage === currentPage) return;
    setIsFlipping(true);
    setFlipDirection(direction);

    // After half-way through the 3D flip, update the active page
    setTimeout(() => {
      setCurrentPage(newPage);
    }, 280);

    // Complete the physical flip
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  const handleNext = () => {
    if (currentPage < 2) {
      turnToPage(currentPage + 1, "next");
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      turnToPage(currentPage - 1, "prev");
    }
  };

  // Close sequence: reverse cover rotation and return to cupboard
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsCoverOpen(false); // Cover swings shut (rotateY: -180deg -> 0deg)

    // Wait for the cover to physically close, then trigger shelf return
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 600);
  };

  // Global Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && bookIndex !== null) {
        handleClose();
      } else if (e.key === "ArrowRight" && currentPage < 2) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentPage > 0) {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bookIndex, currentPage, isClosing, isFlipping]);

  if (!bookData || !currentBookMeta) return null;

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("suryasiva1503@gmail.com");
    setCopiedEmail(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: [currentBookMeta.color, "#10b981", "#38bdf8"]
      });
    } catch (err) {}
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10b981", "#ffffff", currentBookMeta.color]
      });
    } catch (err) {}
    setTimeout(() => setFormSent(false), 4000);
  };

  // ================= RENDER INDEX PAGE (PAGE 0) =================
  const renderIndexPage = () => (
    <div className="space-y-6 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Top Chapter Plate */}
        <div className="border-b-2 border-[#1a1510] pb-3 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
              {bookData.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1510] tracking-tight">
              TABLE OF CONTENTS
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-800 px-2 py-0.5 rounded bg-[#ebe1cf] border border-[#d6c7b0]">
            VOL. {bookData.indexPage.chapterNum}
          </span>
        </div>

        <div className="text-xs font-mono text-emerald-900 font-semibold">
          {bookData.indexPage.tagline}
        </div>

        <p className="text-xs sm:text-sm text-[#383026] leading-relaxed italic">
          &ldquo;{bookData.indexPage.summary}&rdquo;
        </p>

        {/* Contents Directory */}
        <div className="p-4 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-2.5">
          <span className="text-[10px] font-mono uppercase font-bold text-[#6c5d4b] block">
            Reading Directory:
          </span>
          {bookData.indexPage.sections.map((sec) => (
            <button
              key={sec.label}
              type="button"
              onClick={() => turnToPage(sec.page, "next")}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-[#faf6ee] hover:bg-[#ffffff] border border-[#d8cabb] text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-neutral-600 px-1.5 py-0.5 rounded bg-[#ebdcc6]">
                  {sec.label}
                </span>
                <span className="text-xs font-bold text-[#1a1510] group-hover:text-amber-900 transition-colors">
                  {sec.title}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#6c5d4b] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Page {sec.page} / 2 <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Index Page Bottom Action */}
      <div className="pt-4 border-t border-[#ded1bb] flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#7c6d5b]">
          SURYA M. // DEVELOPER ARCHIVE
        </span>
        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          icon={ArrowRight}
          iconPosition="right"
          className="font-mono text-xs font-bold shadow-md"
        >
          Begin Reading Chapter (Page 1/2)
        </Button>
      </div>
    </div>
  );

  // ================= RENDER CONTENT PAGE 1/2 =================
  const renderPage1 = () => {
    switch (bookData.id) {
      case "about-me":
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#2c251e] leading-relaxed">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Introduction
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-emerald-800 font-semibold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <p>{bookData.page1.content[0]}</p>
            <p>{bookData.page1.content[1]}</p>

            <div className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1.5 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-[#6c5d4b] block">Core Tenets:</span>
              {bookData.page1.highlights.map((h, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-[#e2d4be] pb-1">
                  <span className="text-[#6c5d4b]">{h.label}:</span>
                  <span className="font-bold text-[#1a1510]">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "my-skills":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 block font-bold">
                Section 1 // Active Production Competencies
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            <p className="text-xs text-[#3c3429]">{bookData.page1.note}</p>

            <div className="space-y-3">
              {bookData.page1.categories.map((cat) => (
                <div key={cat.id} className="p-3 rounded-lg bg-[#f0e7d6] border border-[#ded1bb] space-y-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#6c5d4b]">
                    {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ebd7bd] border border-[#d4bf9f] text-[#1a1510] font-mono text-[11px] font-bold"
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
        );

      case "experience":
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#2c251e] leading-relaxed">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Current Employment
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-emerald-800 font-semibold mt-0.5">
                {bookData.page1.company}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] text-xs font-mono space-y-1">
              <div><strong className="text-[#1a1510]">ROLE:</strong> {bookData.page1.role}</div>
              <div><strong className="text-[#1a1510]">LOCATION:</strong> {bookData.page1.location}</div>
              <div><strong className="text-[#1a1510]">FOCUS:</strong> {bookData.page1.area}</div>
            </div>

            <p>{bookData.page1.narrative}</p>

            <div className="space-y-1.5 text-xs text-[#383026]">
              {bookData.page1.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-800 font-bold">✔</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "my-projects":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Automation &amp; Backend Systems
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            {bookData.page1.projects.map((proj, idx) => (
              <div key={proj.id} className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#1a1510]">
                    {idx + 1}. {proj.title}
                  </h4>
                  {proj.github ? (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-blue-900 font-bold underline flex items-center gap-1 hover:text-blue-700"
                    >
                      GitHub Repo <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-800/15 text-emerald-900 font-semibold">
                      Production Work
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#3c3429] leading-snug">{proj.summary}</p>
                <div className="font-mono text-[10px] text-[#5c5040] pt-1">
                  <strong>Stack:</strong> {proj.technologies.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        );

      case "my-journey":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Foundational Milestones
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-[#d6c2a8]">
              {bookData.page1.milestones.map((m, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#1a1510] border-2 border-[#faf6ee]" />
                  <span className="font-mono text-[10px] font-bold text-emerald-800">{m.year}</span>
                  <h4 className="font-bold text-xs text-[#1a1510]">{m.title}</h4>
                  <div className="font-mono text-[11px] text-[#6c5d4b]">{m.institution}</div>
                  <p className="text-[11px] text-[#3c3429] leading-snug">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "hobbies-interests":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Sound &amp; Strategy
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            {bookData.page1.items.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-rose-800">
                  {item.tagline}
                </span>
                <h4 className="font-bold text-sm text-[#1a1510]">{item.title}</h4>
                <p className="text-[11px] text-[#4a3f33] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Degrees &amp; Schooling
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            <div className="space-y-3">
              {bookData.page1.records.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[#6c5d4b]">{edu.period}</span>
                  <h4 className="font-bold text-xs text-[#1a1510]">{edu.degree}</h4>
                  <div className="font-mono text-[11px] text-[#4a3f33]">{edu.institution}</div>
                  <div className="font-mono text-[11px] text-emerald-900 font-semibold">{edu.score}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Recruiter Format
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1 font-mono text-xs">
              <div><strong className="text-[#1a1510]">NAME:</strong> {bookData.page1.info.name}</div>
              <div><strong className="text-[#1a1510]">ROLE:</strong> {bookData.page1.info.shortBio}</div>
              <div><strong className="text-[#1a1510]">EMAIL:</strong> {bookData.page1.info.email}</div>
              <div><strong className="text-[#1a1510]">BASE:</strong> {bookData.page1.info.location}</div>
            </div>

            <p className="text-xs text-[#3c3429]">
              Click the button below to generate an ATS-formatted printable PDF resume for technical recruiters.
            </p>

            <Button
              variant="primary"
              size="md"
              icon={Printer}
              onClick={() => window.print()}
              className="w-full font-mono text-xs font-bold shadow-md"
            >
              Print / Save PDF Resume
            </Button>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 1 // Direct Channels
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page1.subtitle}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#6c5d4b]">
                <Mail className="w-3.5 h-3.5 text-emerald-800" /> EMAIL TRANSMISSION
              </div>
              <div className="font-mono font-bold text-xs text-[#1a1510] truncate">
                {bookData.page1.info.email}
              </div>
              <Button
                variant={copiedEmail ? "primary" : "secondary"}
                size="sm"
                onClick={handleCopyEmail}
                icon={copiedEmail ? Check : Copy}
                className="w-full text-xs font-mono font-bold"
              >
                {copiedEmail ? "Email Copied!" : "Copy Email to Clipboard"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              <a
                href={bookData.page1.info.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#f0e7d6] border border-[#ded1bb] hover:border-[#1a1510] text-[#1a1510] flex items-center justify-center gap-1.5 font-bold transition-colors shadow-2xs"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href={bookData.page1.info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#f0e7d6] border border-[#ded1bb] hover:border-[#1a1510] text-[#1a1510] flex items-center justify-center gap-1.5 font-bold transition-colors shadow-2xs"
              >
                <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>

            <div className="text-[11px] font-mono text-[#6c5d4b] flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>{bookData.page1.info.location}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ================= RENDER CONTENT PAGE 2/2 =================
  const renderPage2 = () => {
    switch (bookData.id) {
      case "about-me":
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#2c251e] leading-relaxed">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Ambition
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <p>{bookData.page2.content[0]}</p>

            <div className="p-4 rounded-xl bg-[#ebd7bd] border border-[#d4bf9f] text-[#1a1612] text-xs font-semibold leading-relaxed shadow-sm">
              ★ {bookData.page2.callout}
            </div>

            <p className="text-xs text-[#5a4d3e] italic">{bookData.page2.content[2]}</p>
          </div>
        );

      case "my-skills":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-900 block font-bold">
                Section 2 // Continuous Growth
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <p className="text-xs text-[#3c3429]">{bookData.page2.note}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {bookData.page2.items.map((item) => (
                <div key={item.name} className="p-3 rounded-lg bg-[#f0e7d6] border border-cyan-800/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1a1510]">{item.name}</span>
                    <span className="text-[9px] font-mono text-cyan-800 font-semibold px-1 py-0.2 rounded bg-cyan-100">
                      LEARNING
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#6c5d4b]">{item.domain}</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-[#ebd7bd] border border-[#d4bf9f] text-[11px] font-mono text-[#4a3f32]">
              🎯 <em>Long-Term Roadmap: Uniting my established backend foundation with modern frontend workflows, Dockerized environments, and cloud infrastructure.</em>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Responsibilities &amp; Stack
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <ul className="space-y-2 list-disc list-outside ml-4 text-xs text-[#3a3228] leading-relaxed">
              {bookData.page2.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>

            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[#6c5d4b] block mb-1">
                Applied Technologies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {bookData.page2.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-[#f0e7d6] border border-[#ded1bb] text-[11px] font-mono text-[#1a1510]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#ebd7bd] border border-[#d4bf9f] text-[10px] font-mono text-[#5c5040] flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <span>{bookData.page2.confidentialityNote}</span>
            </div>
          </div>
        );

      case "my-projects":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Systems 03 &amp; 04
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            {bookData.page2.projects.map((proj, idx) => (
              <div key={proj.id} className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#1a1510]">
                    {idx + 3}. {proj.title}
                  </h4>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-mono text-blue-900 font-bold underline flex items-center gap-1 hover:text-blue-700"
                    >
                      GitHub Repo <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <p className="text-[11px] text-[#3c3429] leading-snug">{proj.summary}</p>
                <div className="font-mono text-[10px] text-[#5c5040] pt-1">
                  <strong>Stack:</strong> {proj.technologies.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        );

      case "my-journey":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Professional Growth
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-[#d6c2a8]">
              {bookData.page2.milestones.map((m, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-700 border-2 border-[#faf6ee]" />
                  <span className="font-mono text-[10px] font-bold text-blue-900">{m.year}</span>
                  <h4 className="font-bold text-xs text-[#1a1510]">{m.title}</h4>
                  <div className="font-mono text-[11px] text-[#6c5d4b]">{m.institution}</div>
                  <p className="text-[11px] text-[#3c3429] leading-snug">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "hobbies-interests":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Curiosity &amp; Craft
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            {bookData.page2.items.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-800">
                  {item.tagline}
                </span>
                <h4 className="font-bold text-sm text-[#1a1510]">{item.title}</h4>
                <p className="text-[11px] text-[#4a3f33] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Industry Certifications
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <div className="space-y-3">
              {bookData.page2.certifications.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#f0e7d6] border border-[#ded1bb] space-y-1">
                  <span className="font-mono text-[10px] font-bold text-blue-900">{cert.period}</span>
                  <h4 className="font-bold text-xs text-[#1a1510]">{cert.title}</h4>
                  <div className="font-mono text-[11px] text-[#4a3f33]">{cert.issuer}</div>
                  <div className="font-mono text-[10px] text-[#6c5d4b]">
                    <strong>Skills:</strong> {cert.skills.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Verified Qualifications
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <div className="space-y-2.5 text-xs text-[#3a3228]">
              <div className="p-3 rounded-lg bg-[#f0e7d6] border border-[#ded1bb]">
                <strong className="text-[#1a1510] block">Employment History:</strong>
                <span>Junior Software Developer @ Digiclarity Global Solutions</span>
              </div>
              <div className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd]">
                <strong className="text-[#1a1510] block">Academic Credential:</strong>
                <span>B.E. Computer Science (CGPA: 8.12 / 10), KSR College of Technology</span>
              </div>
              <div className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd]">
                <strong className="text-[#1a1510] block">Production Skills:</strong>
                <span>Java, Python, FastAPI, Spring Boot, JDBC, MySQL, PostgreSQL, Playwright</span>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4 text-xs text-[#2c251e]">
            <div className="border-b border-[#ded1bb] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c6d5b] block font-bold">
                Section 2 // Transmission Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-[#6c5d4b] mt-0.5">{bookData.page2.subtitle}</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0e7d6] border border-[#ded1bb] text-xs text-[#1a1510] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1510]"
              />
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0e7d6] border border-[#ded1bb] text-xs text-[#1a1510] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1510]"
              />
              <textarea
                rows={3}
                required
                placeholder="Your message or collaboration inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0e7d6] border border-[#ded1bb] text-xs text-[#1a1510] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1510] resize-none"
              />
              <Button
                variant="primary"
                size="md"
                icon={formSent ? Check : Send}
                className="w-full font-mono text-xs font-bold"
              >
                {formSent ? "Message Transmitted!" : "Transmit Inquiry"}
              </Button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-hidden select-none">
        {/* The 3D Book Stage with realistic perspective */}
        <div className="relative w-full max-w-2xl my-auto py-2" style={{ perspective: "2600px" }}>
          {/* Top Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between pb-3 px-2 text-xs font-mono text-neutral-300"
          >
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 hover:border-neutral-400 text-neutral-100 transition-all cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider text-[11px]">
                Return to Shelf <span className="text-neutral-400 font-normal">[ESC]</span>
              </span>
            </button>

            {/* Page Indicator Pill: "INDEX", "1 / 2", "2 / 2" */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentBookMeta.color }}
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200">
                {currentPage === 0 ? "INDEX PAGE" : `PAGE ${currentPage} / 2`}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 ml-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Book"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* PHYSICAL 3D BOOK WITH REAL ROTATING COVER & 3D PAGE FLIPPING */}
          <motion.div
            initial={{ scale: 0.78, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.78, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative rounded-2xl shadow-[0_35px_100px_-20px_rgba(0,0,0,0.95)] border-4 border-[#241710] bg-[#2a1b14] p-2 sm:p-3 min-h-[560px] max-h-[82vh] flex flex-col justify-between"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Top Silk Red Bookmark Ribbon hanging from spine */}
            <div className="absolute -top-3 left-8 w-4 h-12 bg-rose-700 shadow-md z-30 rounded-b-sm border-x border-rose-900 pointer-events-none" />

            {/* SINGLE PAGE AT A TIME READING BED */}
            <div
              className="rounded-xl overflow-hidden bg-[#faf6ee] text-[#1e1b18] shadow-inner relative flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(255,255,255,0.4) 6%, #faf6ee 12%, #faf6ee 98%, rgba(0,0,0,0.05) 100%)"
              }}
            >
              {/* CURRENT ACTIVE PAGE CONTENT (Fades and animates cleanly) */}
              <div className="relative z-10 flex-1">
                {currentPage === 0 && renderIndexPage()}
                {currentPage === 1 && renderPage1()}
                {currentPage === 2 && renderPage2()}
              </div>

              {/* BOTTOM NAVIGATION FOOTER WITH REALISTIC PAGE CONTROLS */}
              {currentPage > 0 && (
                <div className="pt-4 border-t border-[#ded1bb] flex items-center justify-between text-xs font-mono text-[#6c5d4b] mt-4 relative z-20">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isFlipping}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ebdcc6] hover:bg-[#ded1bb] text-[#1a1510] font-bold transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{currentPage === 1 ? "← Contents (Index)" : "← Page 1 / 2"}</span>
                  </button>

                  <div className="font-bold text-[#1a1510] text-[11px]">
                    {currentPage} / 2
                  </div>

                  {currentPage === 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isFlipping}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ebdcc6] hover:bg-[#ded1bb] text-[#1a1510] font-bold transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                    >
                      <span>Next Page (2 / 2) →</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a1510] text-[#faf6ee] font-bold hover:bg-[#2c241c] transition-all cursor-pointer shadow-md"
                    >
                      <span>Finish &amp; Close ✕</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 3D TURNING LEAF (Simulates realistic physical paper bending and flipping) */}
            {isFlipping && (
              <motion.div
                initial={{ rotateY: flipDirection === "next" ? 0 : -180 }}
                animate={{ rotateY: flipDirection === "next" ? -180 : 0 }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d"
                }}
                className="absolute inset-2 sm:inset-3 z-30 pointer-events-none rounded-xl bg-[#f5efde] border-l-2 border-[#d6c7b0] shadow-2xl"
              >
                {/* Front side of flipping paper */}
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-[10px] font-mono uppercase text-[#7c6d5b]">
                    Turning Page...
                  </div>
                  <div className="text-center font-mono text-xs text-[#8c7e6c]">
                    SURYA M. // DEV ARCHIVE
                  </div>
                </div>

                {/* Reverse side of flipping paper */}
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-between bg-[#f0e8d6]"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden"
                  }}
                >
                  <div className="text-[10px] font-mono uppercase text-[#7c6d5b]">
                    Revealing Section...
                  </div>
                  <div className="text-center font-mono text-xs text-[#8c7e6c]">
                    SURYA M. // DEV ARCHIVE
                  </div>
                </div>
              </motion.div>
            )}

            {/* PHYSICAL HARDCOVER FRONT (Rotates around left spine: 0deg -> -180deg) */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isCoverOpen ? -180 : 0 }}
              transition={{
                duration: 0.65,
                ease: [0.25, 1, 0.5, 1]
              }}
              style={{
                backgroundColor: currentBookMeta.color,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
              className="absolute inset-0 z-40 rounded-xl border-2 border-[#1c120c] flex flex-col justify-between p-8 pointer-events-none shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/20 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">
                  {currentBookMeta.category}
                </span>
                <span className="font-mono text-xs font-bold text-black/60">
                  VOL. {currentBookMeta.index}
                </span>
              </div>

              <div className="text-center my-auto space-y-2">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black/85 drop-shadow-sm">
                  {currentBookMeta.title}
                </h2>
                <p className="font-mono text-sm text-black/60 font-semibold">
                  {currentBookMeta.subtitle}
                </p>
              </div>

              <div className="border-t border-black/20 pt-3 text-center font-mono text-xs text-black/50">
                SURYA M. — DEVELOPER ARCHIVE // 2026
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

