import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BOOKS_CATALOG } from "../../data/booksCatalog";
import { AboutBook } from "./AboutBook";
import { SkillsBook } from "./SkillsBook";
import { ExperienceBook } from "./ExperienceBook";
import { ProjectsBook } from "./ProjectsBook";
import { JourneyBook } from "./JourneyBook";
import { HobbiesBook } from "./HobbiesBook";
import { EducationBook } from "./EducationBook";
import { ResumeBook } from "./ResumeBook";
import { ContactBook } from "./ContactBook";
import { X, ArrowLeft } from "lucide-react";

export function OpenBookContainer({ bookIndex, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const currentBook = bookIndex !== null && bookIndex !== undefined ? BOOKS_CATALOG[bookIndex] : null;

  useEffect(() => {
    if (bookIndex !== null) {
      setIsClosing(false);
      // Small trigger delay to smoothly open the cover like a physical book
      const timer = setTimeout(() => setIsOpen(true), 120);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [bookIndex]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsOpen(false); // Triggers reverse cover swing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 550); // Matches closing animation duration
  };

  // Global Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && bookIndex !== null) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [bookIndex, isClosing]);

  if (!currentBook) return null;

  const renderContent = () => {
    switch (currentBook.id) {
      case "about-me":
        return <AboutBook />;
      case "my-skills":
        return <SkillsBook />;
      case "experience":
        return <ExperienceBook />;
      case "my-projects":
        return <ProjectsBook />;
      case "my-journey":
        return <JourneyBook />;
      case "hobbies-interests":
        return <HobbiesBook />;
      case "education":
        return <EducationBook />;
      case "resume":
        return <ResumeBook />;
      case "contact":
        return <ContactBook />;
      default:
        return <AboutBook />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-5xl my-auto py-2" style={{ perspective: "2600px" }}>
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
                Close Book &amp; Return to Shelf <span className="text-neutral-400 font-normal">[ESC]</span>
              </span>
            </button>

            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: currentBook.color }}
              />
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-200">
                {currentBook.title}
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

          {/* PHYSICAL 3D BOOK WITH REAL ROTATING COVER */}
          <motion.div
            initial={{ scale: 0.82, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.82, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="relative rounded-2xl shadow-[0_35px_100px_-20px_rgba(0,0,0,0.95)] border-4 border-[#241710] bg-[#2a1b14] p-2 sm:p-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Top Red Silk Bookmark Ribbon hanging from spine */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-12 bg-rose-700 shadow-md z-30 rounded-b-sm border-x border-rose-900" />

            {/* Inner Pages Spread (Visible when book is open) */}
            <div className="rounded-xl overflow-hidden bg-[#faf6ee] text-[#1e1b18] shadow-inner relative min-h-[520px] max-h-[80vh] p-6 sm:p-10 overflow-y-auto">
              {/* Central Spine Gutter Shadow fold */}
              <div
                className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-20"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0.18) 100%)"
                }}
              />

              {/* Page Content fades in as the cover opens */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, delay: isOpen ? 0.2 : 0 }}
                className="relative z-10"
              >
                {renderContent()}
              </motion.div>
            </div>

            {/* PHYSICAL FRONT COVER (Rotates around left spine hinge: 0deg -> -180deg) */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: isOpen ? -180 : 0 }}
              transition={{
                duration: 0.65,
                ease: [0.25, 1, 0.5, 1]
              }}
              className="absolute inset-0 z-40 rounded-xl border-2 border-[#1c120c] flex flex-col justify-between p-8 pointer-events-none shadow-2xl"
              style={{
                backgroundColor: currentBook.color,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="flex items-center justify-between border-b border-black/20 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/60">
                  {currentBook.category}
                </span>
                <span className="font-mono text-xs font-bold text-black/60">
                  VOL. {currentBook.index}
                </span>
              </div>

              <div className="text-center my-auto space-y-2">
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black/85 drop-shadow-sm">
                  {currentBook.title}
                </h2>
                <p className="font-mono text-sm text-black/60 font-semibold">
                  {currentBook.subtitle}
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

