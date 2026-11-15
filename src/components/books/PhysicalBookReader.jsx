import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BOOK_PAGES_DATA } from "../../data/bookPagesData";
import { BOOKS_CATALOG } from "../../data/booksCatalog";
import { Button } from "../ui/Button";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import confetti from "canvas-confetti";
import { submitContactMessage } from "../../lib/portfolioService";
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
  ShieldCheck,
  Phone,
  Clock,
  Award,
  Code2,
  Briefcase,
  GraduationCap,
  Heart,
  Music,
  Gamepad2,
  Compass
} from "lucide-react";

// Antique Brass Metal Corner Bracket
function BrassCornerBracket({ position }) {
  const isTop = position.includes("top");
  const isLeft = position.includes("left");
  return (
    <div
      className={`absolute ${isTop ? "-top-1" : "-bottom-1"} ${isLeft ? "-left-1" : "-right-1"} w-8 h-8 pointer-events-none z-30 opacity-90`}
      style={{
        transform: `${isTop ? "" : "scaleY(-1)"} ${isLeft ? "" : "scaleX(-1)"}`
      }}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
        <path
          d="M 2 2 L 34 2 C 28 6, 22 12, 18 18 C 12 22, 6 28, 2 34 Z"
          fill="url(#brassGrad)"
          stroke="#422208"
          strokeWidth="1.2"
        />
        <circle cx="8" cy="8" r="1.8" fill="#2d1705" />
        <circle cx="24" cy="6" r="1.2" fill="#2d1705" />
        <circle cx="6" cy="24" r="1.2" fill="#2d1705" />
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3d179" />
            <stop offset="45%" stopColor="#cda142" />
            <stop offset="80%" stopColor="#9b6e22" />
            <stop offset="100%" stopColor="#5f3e12" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Classical Archival Ink Stamp
function ArchivalStamp({ label = "VERIFIED ARCHIVE", subtitle = "CHENNAI // 2026" }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm archival-stamp select-none">
      <div className="w-2 h-2 rounded-full border border-red-800 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-red-800" />
      </div>
      <div className="font-mono text-[9px] font-black uppercase tracking-widest leading-tight">
        <div>{label}</div>
        <div className="text-[7.5px] opacity-75">{subtitle}</div>
      </div>
    </div>
  );
}

// Classical Typographic Fleuron Divider
function FleuronDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-3 text-amber-900/40 select-none">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/25 to-transparent" />
      <span className="font-serif text-sm opacity-75">❦</span>
      <span className="font-serif text-xs opacity-60">✦</span>
      <span className="font-serif text-sm opacity-75">❧</span>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-900/25 to-transparent" />
    </div>
  );
}

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

  // Global Escape & Arrow keys
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      await submitContactMessage(formData);
      setFormSent(true);
      setFormData({ name: "", email: "", message: "" });
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#10b981", "#ffffff", currentBookMeta.color]
        });
      } catch (err) {}
      setTimeout(() => setFormSent(false), 4000);
    } catch (err) {
      console.error("Contact submit error:", err);
      setFormSent(true);
      setTimeout(() => setFormSent(false), 4000);
    }
  };

  // ================= RENDER INDEX PAGE (PAGE 0) =================
  const renderIndexPage = () => (
    <div className="space-y-4 flex flex-col justify-between h-full font-serif-book">
      <div>
        {/* Classical Engraved Headpiece */}
        <div className="border-b-2 border-amber-900/30 pb-3 text-center relative">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#78350f] font-bold">
            EX LIBRIS · VOL. {bookData.indexPage.chapterNum} · {bookData.category}
          </div>
          <h2 className="font-display-book text-2xl sm:text-3xl font-black text-[#1c1208] tracking-tight mt-1">
            TABLE OF CONTENTS
          </h2>
          <div className="text-xs font-mono text-emerald-900/90 font-semibold tracking-wide mt-1">
            {bookData.indexPage.tagline}
          </div>
        </div>

        <FleuronDivider />

        {/* Narrative Summary in Classical Serif Italic */}
        <div className="my-3 px-3 py-2.5 rounded-lg bg-[#f4ecd8] border border-amber-900/15 text-[#2d2216] italic text-xs sm:text-sm leading-relaxed text-center relative">
          &ldquo;{bookData.indexPage.summary}&rdquo;
        </div>

        {/* Contents Directory with Classical Dotted Leaders */}
        <div className="my-3 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-900/70 font-bold mb-1 pl-1">
            Directory of Chapters &amp; Folios:
          </div>
          {bookData.indexPage.sections.map((sec, idx) => (
            <button
              key={sec.label}
              type="button"
              onClick={() => turnToPage(sec.page, "next")}
              className="w-full flex items-center justify-between p-2.5 rounded-md bg-[#faf4e6] hover:bg-[#ffffff] border border-amber-900/20 hover:border-amber-900/50 text-left transition-all cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-[10px] font-bold text-amber-950 px-2 py-0.5 rounded bg-[#ebd7bd] border border-[#d6c19f] shrink-0">
                  {idx === 0 ? "CAPUT I" : "CAPUT II"}
                </span>
                <span className="font-serif-book font-bold text-sm text-[#1a120a] group-hover:text-amber-900 truncate">
                  {sec.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-[#78350f]">
                <span className="hidden sm:inline opacity-40">. . . . . . . .</span>
                <span className="font-bold flex items-center gap-1">
                  Folio 0{sec.page} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Archival Metadata Box */}
        {bookData.indexPage.metadata && (
          <div className="grid grid-cols-3 gap-2 p-2 rounded-md bg-[#ebdcc6]/60 border border-amber-900/15 text-center font-mono text-[10px]">
            {bookData.indexPage.metadata.map((m, i) => (
              <div key={i} className="truncate">
                <span className="text-amber-950/60 block text-[9px] uppercase font-bold">{m.label}</span>
                <span className="font-bold text-[#1c1208]">{m.val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Index Bottom Action Bar */}
      <div className="pt-3 border-t border-amber-900/20 flex items-center justify-between mt-auto">
        <ArchivalStamp label="ARCHIVAL DOSSIER" subtitle="AUTHENTIC DEV RECORD" />
        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          icon={ArrowRight}
          iconPosition="right"
          className="font-mono text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Open Chapter I (Page 1)
        </Button>
      </div>
    </div>
  );

  // ================= RENDER CONTENT PAGE 1/2 =================
  const renderPage1 = () => {
    switch (bookData.id) {
      case "about-me":
        return (
          <div className="space-y-3.5 font-serif-book text-[#2c2014] text-xs sm:text-sm leading-relaxed">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · BIOGRAPHICAL DOSSIER
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-emerald-900 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <p className="drop-cap-classical text-justify">
              {bookData.page1.content[0]}
            </p>
            <p className="text-justify">
              {bookData.page1.content[1]}
            </p>

            <div className="p-3 rounded-lg bg-[#f2e7d3] border-l-4 border-amber-800 border-y border-r border-amber-900/15 space-y-2 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-[#78350f] block tracking-wider">
                CORE TECHNICAL FOUNDATIONS:
              </span>
              {bookData.page1.highlights.map((h, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-amber-900/10 pb-1">
                  <span className="text-amber-950/70 font-serif-book font-semibold">{h.label}:</span>
                  <span className="font-bold text-[#1c1208]">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "my-skills":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-900 block font-bold">
                CHAPTER I · PRODUCTION CAPABILITIES
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <p className="italic text-[#4a3a29] leading-relaxed">
              {bookData.page1.note}
            </p>

            <div className="space-y-2.5">
              {bookData.page1.categories.map((cat) => (
                <div key={cat.id} className="p-2.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1.5 shadow-xs">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#78350f] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                    {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#fcf9f2] border border-amber-900/25 text-[#1a1208] font-mono text-[11px] font-bold shadow-2xs hover:border-amber-900 transition-colors"
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
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs sm:text-sm leading-relaxed">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · CAREER ENGAGEMENT
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-emerald-900 font-bold mt-0.5">
                {bookData.page1.company}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#f4ecd8] border border-amber-900/20 text-xs font-mono space-y-1">
              <div><strong className="text-[#1c1208]">ROLE:</strong> {bookData.page1.role}</div>
              <div><strong className="text-[#1c1208]">LOCATION:</strong> {bookData.page1.location}</div>
              <div><strong className="text-[#1c1208]">DOMAIN:</strong> {bookData.page1.area}</div>
            </div>

            <p className="drop-cap-classical text-justify">
              {bookData.page1.narrative}
            </p>

            <div className="space-y-1.5 text-xs text-[#3a2c1e]">
              {bookData.page1.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-900 font-serif font-bold text-sm">✦</span>
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "my-projects":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · ENGINEERING SYSTEMS 01 &amp; 02
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            {bookData.page1.projects.map((proj, idx) => (
              <div key={proj.id} className="p-3.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-display-book font-bold text-sm text-[#1c1208]">
                    {idx + 1}. {proj.title}
                  </h4>
                  {proj.github ? (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono text-blue-900 font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-200 hover:bg-blue-100 flex items-center gap-1 transition-colors"
                    >
                      Repository <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
                      Enterprise Work
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-[#3e3020] leading-relaxed">{proj.summary}</p>
                <div className="font-mono text-[10px] text-amber-950/80 pt-1 border-t border-amber-900/10">
                  <strong>Stack:</strong> {proj.technologies.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        );

      case "my-journey":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · FOUNDATIONAL CHRONOLOGY
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <div className="space-y-3.5 pl-3.5 border-l-2 border-amber-800/30">
              {bookData.page1.milestones.map((m, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#1c1208] border-2 border-[#faf6ed]" />
                  <span className="font-mono text-[10px] font-bold text-emerald-900">{m.year}</span>
                  <h4 className="font-display-book font-bold text-sm text-[#1c1208]">{m.title}</h4>
                  <div className="font-mono text-[11px] text-[#78350f]">{m.institution}</div>
                  <p className="text-[11.5px] text-[#3e3020] leading-relaxed">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "hobbies-interests":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · PERSONAL PURSUITS
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            {bookData.page1.items.map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-rose-900">
                  {item.tagline}
                </span>
                <h4 className="font-display-book font-bold text-sm text-[#1c1208]">{item.title}</h4>
                <p className="text-[11.5px] text-[#423324] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · FORMAL EDUCATION
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <div className="space-y-2.5">
              {bookData.page1.records.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#78350f]">{edu.period}</span>
                    <span className="font-mono text-[10px] text-emerald-900 font-bold px-1.5 py-0.2 rounded bg-emerald-100">
                      {edu.score}
                    </span>
                  </div>
                  <h4 className="font-display-book font-bold text-sm text-[#1c1208]">{edu.degree}</h4>
                  <div className="font-mono text-[11px] text-[#423324]">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · ATS RECRUITER DOSSIER
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1.5 font-mono text-xs">
              <div><strong className="text-[#1c1208]">NAME:</strong> {bookData.page1.info.name}</div>
              <div><strong className="text-[#1c1208]">ROLE:</strong> {bookData.page1.info.shortBio}</div>
              <div><strong className="text-[#1c1208]">EMAIL:</strong> {bookData.page1.info.email}</div>
              <div><strong className="text-[#1c1208]">LOCATION:</strong> {bookData.page1.info.location}</div>
            </div>

            <p className="text-xs text-[#423324] leading-relaxed italic">
              Generate an ATS-formatted printable curriculum vitae formatted for technical hiring managers.
            </p>

            <Button
              variant="primary"
              size="md"
              icon={Printer}
              onClick={() => window.print()}
              className="w-full font-mono text-xs font-bold shadow-md hover:scale-[1.02] active:scale-98 transition-all"
            >
              Print / Save ATS Formatted PDF
            </Button>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER I · DIRECT CHANNELS
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page1.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page1.subtitle}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold text-[#78350f]">
                <Mail className="w-3.5 h-3.5 text-emerald-900" /> OFFICIAL TRANSMISSION DESK
              </div>
              <div className="font-mono font-bold text-xs text-[#1c1208] truncate">
                {bookData.page1.info.email}
              </div>
              <Button
                variant={copiedEmail ? "primary" : "secondary"}
                size="sm"
                onClick={handleCopyEmail}
                icon={copiedEmail ? Check : Copy}
                className="w-full text-xs font-mono font-bold"
              >
                {copiedEmail ? "Address Copied!" : "Copy Email to Clipboard"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <a
                href={bookData.page1.info.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-md bg-[#f4ecd8] border border-amber-900/25 hover:border-amber-950 text-[#1c1208] flex items-center justify-center gap-1.5 font-bold transition-all shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
              <a
                href={bookData.page1.info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-md bg-[#f4ecd8] border border-amber-900/25 hover:border-amber-950 text-[#1c1208] flex items-center justify-center gap-1.5 font-bold transition-all shadow-xs"
              >
                <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>

            <div className="text-[11px] font-mono text-[#78350f] flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-900" />
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
          <div className="space-y-3.5 font-serif-book text-[#2c2014] text-xs sm:text-sm leading-relaxed">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · FULL-STACK HORIZONS
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <p className="drop-cap-classical text-justify">
              {bookData.page2.content[0]}
            </p>

            <div className="p-3.5 rounded-lg bg-[#ebdcc6] border border-amber-900/25 text-[#1c1208] text-xs font-semibold leading-relaxed shadow-xs">
              ✦ {bookData.page2.callout}
            </div>

            <p className="text-xs text-[#524131] italic leading-relaxed text-justify">
              {bookData.page2.content[2]}
            </p>
          </div>
        );

      case "my-skills":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-900 block font-bold">
                CHAPTER II · EMERGING EXPANSION
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <p className="italic text-[#4a3a29] leading-relaxed">
              {bookData.page2.note}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bookData.page2.items.map((item) => (
                <div key={item.name} className="p-2.5 rounded-lg bg-[#f4ecd8] border border-cyan-900/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display-book font-bold text-xs text-[#1c1208]">{item.name}</span>
                    <span className="text-[9px] font-mono text-cyan-900 font-bold px-1.5 py-0.2 rounded bg-cyan-100">
                      LEARNING
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#6c5d4b] leading-tight">{item.domain}</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-[#ebdcc6] border border-amber-900/20 text-[11px] font-mono text-[#3e3020]">
              🎯 <em>Engineering Objective: Uniting deep backend fundamentals with reactive interfaces, Dockerized services, and automated CI/CD delivery pipelines.</em>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · ENGINEERING LOGBOOK
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <ul className="space-y-2 text-xs text-[#3a2c1e] leading-relaxed">
              {bookData.page2.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-900/70 shrink-0 font-serif">❧</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[#78350f] block mb-1">
                Applied Toolchain:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {bookData.page2.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-[#f4ecd8] border border-amber-900/20 text-[11px] font-mono font-bold text-[#1c1208]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#ebdcc6] border border-amber-900/25 text-[10px] font-mono text-[#4a3824] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-900 shrink-0 mt-0.5" />
              <span>{bookData.page2.confidentialityNote}</span>
            </div>
          </div>
        );

      case "my-projects":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · ENGINEERING SYSTEMS 03 &amp; 04
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            {bookData.page2.projects.map((proj, idx) => (
              <div key={proj.id} className="p-3 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-display-book font-bold text-sm text-[#1c1208]">
                    {idx + 3}. {proj.title}
                  </h4>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono text-blue-900 font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-200 hover:bg-blue-100 flex items-center gap-1 transition-colors"
                    >
                      Repository <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <p className="text-[11.5px] text-[#3e3020] leading-relaxed">{proj.summary}</p>
                <div className="font-mono text-[10px] text-amber-950/80 pt-1 border-t border-amber-900/10">
                  <strong>Stack:</strong> {proj.technologies.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        );

      case "my-journey":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · INDUSTRY EXPANSION
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <div className="space-y-3.5 pl-3.5 border-l-2 border-amber-800/30">
              {bookData.page2.milestones.map((m, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-800 border-2 border-[#faf6ed]" />
                  <span className="font-mono text-[10px] font-bold text-blue-950">{m.year}</span>
                  <h4 className="font-display-book font-bold text-sm text-[#1c1208]">{m.title}</h4>
                  <div className="font-mono text-[11px] text-[#78350f]">{m.institution}</div>
                  <p className="text-[11.5px] text-[#3e3020] leading-relaxed">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "hobbies-interests":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · CURIOSITY &amp; AESTHETICS
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            {bookData.page2.items.map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-purple-900">
                  {item.tagline}
                </span>
                <h4 className="font-display-book font-bold text-sm text-[#1c1208]">{item.title}</h4>
                <p className="text-[11.5px] text-[#423324] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · PROFESSIONAL CREDENTIALS
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <div className="space-y-2.5">
              {bookData.page2.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#f4ecd8] border border-amber-900/20 space-y-1">
                  <span className="font-mono text-[10px] font-bold text-blue-900">{cert.period}</span>
                  <h4 className="font-display-book font-bold text-sm text-[#1c1208]">{cert.title}</h4>
                  <div className="font-mono text-[11px] text-[#423324]">{cert.issuer}</div>
                  <div className="font-mono text-[10px] text-[#78350f]">
                    <strong>Skills:</strong> {cert.skills.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · VERIFIED QUALIFICATIONS
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#3a2c1e]">
              <div className="p-2.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20">
                <strong className="text-[#1c1208] font-display-book block text-xs">Employment History:</strong>
                <span>Junior Software Developer @ Digiclarity Global Solutions (Current)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20">
                <strong className="text-[#1c1208] font-display-book block text-xs">Academic Degree:</strong>
                <span>B.E. Computer Science (CGPA: 8.12 / 10), KSR College of Technology</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f4ecd8] border border-amber-900/20">
                <strong className="text-[#1c1208] font-display-book block text-xs">Production Toolchain:</strong>
                <span className="font-mono text-[11px]">Java, Python, FastAPI, Spring Boot, JDBC, MySQL, PostgreSQL, Playwright</span>
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-3 font-serif-book text-[#2c2014] text-xs">
            <div className="border-b-2 border-amber-900/25 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78350f] block font-bold">
                CHAPTER II · TRANSMISSION DESK
              </span>
              <h3 className="font-display-book text-xl sm:text-2xl font-black text-[#1c1208] tracking-tight mt-0.5">
                {bookData.page2.title}
              </h3>
              <p className="text-xs font-mono text-amber-900/80 font-bold mt-0.5">
                {bookData.page2.subtitle}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-2">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-[#f4ecd8] border border-amber-900/30 text-xs font-serif-book text-[#1c1208] placeholder:text-amber-950/40 focus:outline-none focus:border-amber-900"
              />
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-[#f4ecd8] border border-amber-900/30 text-xs font-serif-book text-[#1c1208] placeholder:text-amber-950/40 focus:outline-none focus:border-amber-900"
              />
              <textarea
                rows={3}
                required
                placeholder="Your message or collaboration inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-[#f4ecd8] border border-amber-900/30 text-xs font-serif-book text-[#1c1208] placeholder:text-amber-950/40 focus:outline-none focus:border-amber-900 resize-none"
              />
              <Button
                variant="primary"
                size="md"
                icon={formSent ? Check : Send}
                className="w-full font-mono text-xs font-bold"
              >
                {formSent ? "Inquiry Delivered!" : "Transmit Inquiry to Surya"}
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
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 overflow-y-auto select-none"
        style={{ background: "rgba(5, 6, 11, 0.90)", backdropFilter: "blur(8px)" }}
      >
        {/* Backdrop Click Closes Book */}
        <div
          className="absolute inset-0"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        />

        {/* 3D Book Stage */}
        <div className="relative w-full max-w-3xl my-auto py-2 z-10" style={{ perspective: "2800px" }}>

          {/* Top Control Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between pb-3 px-1 text-xs font-mono text-neutral-300"
          >
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/95 border border-neutral-700 hover:border-amber-500 text-neutral-100 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider text-[11px]">
                Return Book to Shelf <span className="text-neutral-500 font-normal">[ESC]</span>
              </span>
            </button>

            {/* Folio Indicator Badge */}
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-amber-500/30"
                style={{ backgroundColor: currentBookMeta.color }}
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-900/95 border border-neutral-700 text-neutral-200">
                {currentPage === 0 ? "TABLE OF CONTENTS" : `FOLIO 0${currentPage} / 02`}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 ml-1 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
                aria-label="Close Book"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* PHYSICAL 3D BOOK CASING — Luxury Hand-Bound Leather Style */}
          <motion.div
            initial={{ scale: 0.82, y: 48, opacity: 0, rotateX: 6 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.82, y: 48, opacity: 0, rotateX: 6 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="relative shadow-[0_45px_120px_-15px_rgba(0,0,0,0.98)]"
            style={{
              borderRadius: "14px",
              padding: "12px",
              background: "linear-gradient(135deg, #2b180d 0%, #170d06 50%, #29160c 100%)",
              border: "5px solid #140b05",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.85), 0 35px 80px -15px rgba(0,0,0,0.95)",
              minHeight: "580px",
              maxHeight: "86vh",
              display: "flex",
              flexDirection: "column",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Antique Brass Metal Corner Brackets */}
            <BrassCornerBracket position="top-left" />
            <BrassCornerBracket position="top-right" />
            <BrassCornerBracket position="bottom-left" />
            <BrassCornerBracket position="bottom-right" />

            {/* Silk Hanging Bookmark Ribbon */}
            <div
              className="absolute -top-3 left-12 w-4 h-12 z-40 rounded-b-sm pointer-events-none shadow-lg flex flex-col justify-end"
              style={{
                background: "linear-gradient(to bottom, #9f1239 0%, #be123c 70%, #881337 100%)",
                boxShadow: "2px 4px 8px rgba(0,0,0,0.6)"
              }}
            >
              {/* Metallic Gold Fringe at ribbon tip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 opacity-90" />
            </div>

            {/* Book Paper Stack Edge (Right Side Thickness & Gilded Foil Lines) */}
            <div
              className="absolute -right-2 top-3 bottom-3 w-2.5 rounded-r-sm pointer-events-none shadow-md"
              style={{
                background:
                  "repeating-linear-gradient(0deg, #d8caaf, #d8caaf 1.5px, #ecd9be 1.5px, #ecd9be 3px)",
                borderRight: "1px solid #c4b193"
              }}
            />

            {/* THE READING BED — Authentic Laid Parchment with Spine Gutter Curvature */}
            <div
              className="rounded-lg overflow-hidden text-[#1e1208] relative flex-1 flex flex-col paper-parchment"
              style={{
                border: "2px solid #e0d2b8",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.06)"
              }}
            >
              {/* Left Spine Gutter Curvature Shadow */}
              <div className="absolute inset-y-0 left-0 w-16 spine-gutter-shadow pointer-events-none z-20" />

              {/* Classical Double Fillet Border around the page margin */}
              <div
                className="absolute inset-2.5 pointer-events-none border border-amber-900/15 rounded-md z-10"
                style={{
                  outline: "1px dashed rgba(120, 53, 15, 0.15)",
                  outlineOffset: "-4px"
                }}
              />

              {/* Running Header */}
              <div className="relative z-20 px-6 sm:px-8 py-2.5 border-b border-amber-900/20 flex items-center justify-between bg-amber-900/[0.03]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full ring-1 ring-amber-900/30"
                    style={{ backgroundColor: currentBookMeta.color }}
                  />
                  <span className="font-display-book text-[10.5px] uppercase tracking-[0.2em] text-[#78350f] font-bold">
                    {currentBookMeta.category}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-amber-950/70 tracking-widest">
                  SURYA M. ARCHIVE // {currentBookMeta.title}
                </div>
              </div>

              {/* Scrollable Page Content */}
              <div
                className="relative z-20 flex-1 p-5 sm:p-7 overflow-y-auto"
                style={{ maxHeight: "calc(86vh - 165px)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: flipDirection === "next" ? 18 : -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: flipDirection === "next" ? -18 : 18 }}
                    transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {currentPage === 0 && renderIndexPage()}
                    {currentPage === 1 && renderPage1()}
                    {currentPage === 2 && renderPage2()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Running Footer Navigation */}
              {currentPage > 0 && (
                <div className="relative z-20 px-5 sm:px-7 py-3 border-t border-amber-900/20 flex items-center justify-between bg-amber-900/[0.03]">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isFlipping}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono font-bold text-xs transition-all cursor-pointer disabled:opacity-40 hover:scale-105 active:scale-95 shadow-xs"
                    style={{ background: "#ebd7bd", color: "#2d1b0d", border: "1px solid #d4be9d" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{currentPage === 1 ? "Contents" : "Folio 01"}</span>
                  </button>

                  {/* Classical Folio Indicator */}
                  <div className="flex items-center gap-2 font-display-book text-xs font-bold text-[#78350f]">
                    <span>PAGE {currentPage} OF 2</span>
                    <div className="flex gap-1.5 ml-1">
                      {[1, 2].map((p) => (
                        <button
                          key={p}
                          onClick={() => !isFlipping && p !== currentPage && turnToPage(p, p > currentPage ? "next" : "prev")}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            p === currentPage ? "scale-125 bg-amber-900" : "bg-amber-900/30 hover:bg-amber-900/60"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {currentPage === 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isFlipping}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono font-bold text-xs transition-all cursor-pointer disabled:opacity-40 hover:scale-105 active:scale-95 shadow-xs"
                      style={{ background: "#ebd7bd", color: "#2d1b0d", border: "1px solid #d4be9d" }}
                    >
                      <span>Folio 02</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-mono font-bold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                      style={{ background: "#1c1208", color: "#faf6ed" }}
                    >
                      <span>Close Book ✕</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 3D TURNING LEAF */}
            {isFlipping && (
              <motion.div
                initial={{ rotateY: flipDirection === "next" ? 0 : -180 }}
                animate={{ rotateY: flipDirection === "next" ? -180 : 0 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                className="absolute inset-3 z-30 pointer-events-none rounded-lg shadow-2xl"
              >
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-between rounded-lg paper-parchment border border-amber-900/30"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="font-mono text-[10px] uppercase text-[#78350f]">Turning Page...</div>
                  <div className="text-center font-display-book text-sm text-[#78350f] font-bold">
                    SURYA M. // DEVELOPER ARCHIVE
                  </div>
                </div>
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-between rounded-lg paper-parchment border border-amber-900/30"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <div className="font-mono text-[10px] uppercase text-[#78350f]">Revealing Folio...</div>
                  <div className="text-center font-display-book text-sm text-[#78350f] font-bold">
                    SURYA M. // DEVELOPER ARCHIVE
                  </div>
                </div>
              </motion.div>
            )}

            {/* PHYSICAL HARDCOVER FRONT COVER */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isCoverOpen ? -180 : 0 }}
              transition={{ duration: 0.70, ease: [0.25, 1, 0.5, 1] }}
              style={{
                backgroundColor: currentBookMeta.color,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                borderRadius: "12px",
                border: "3px solid rgba(0,0,0,0.35)",
                padding: "2rem",
                position: "absolute",
                inset: 0,
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pointerEvents: "none",
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.22)"
              }}
            >
              <BrassCornerBracket position="top-left" />
              <BrassCornerBracket position="top-right" />
              <BrassCornerBracket position="bottom-left" />
              <BrassCornerBracket position="bottom-right" />

              {/* Cover Top Bar */}
              <div className="flex items-center justify-between border-b border-black/20 pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">
                  {currentBookMeta.category}
                </span>
                <span className="font-mono text-xs font-bold text-black/60 px-2 py-0.5 rounded border border-black/20">
                  VOL. {currentBookMeta.index}
                </span>
              </div>

              {/* Cover Main Text */}
              <div className="text-center space-y-3 my-auto">
                <div className="inline-block opacity-30 text-xs">❦ · ✦ · ❧</div>
                <h2
                  className="font-display-book font-black uppercase tracking-tight drop-shadow-sm leading-none"
                  style={{ fontSize: "clamp(2.2rem, 8vw, 3.8rem)", color: "rgba(0,0,0,0.85)" }}
                >
                  {currentBookMeta.title}
                </h2>
                <p className="font-mono text-sm text-black/65 font-semibold tracking-wide">
                  {currentBookMeta.subtitle}
                </p>
                <div className="inline-block opacity-30 text-xs">✦ · ❦ · ✦</div>
              </div>

              {/* Cover Footer */}
              <div className="border-t border-black/20 pt-4 flex items-center justify-between font-mono text-xs text-black/55">
                <span>SURYA M.</span>
                <span>DEVELOPER ARCHIVE · 2026</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
