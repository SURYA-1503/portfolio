import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data/portfolioData";
import { StatusWidget } from "../components/ui/StatusWidget";
import { Button } from "../components/ui/Button";
import { GithubIcon, LinkedinIcon } from "../components/ui/Icons";
import confetti from "canvas-confetti";
import {
  ArrowDown,
  FileText,
  Mail,
  Copy,
  Check,
  Code2,
  Terminal,
  Sparkles,
  Layers
} from "lucide-react";

export function Hero({ onOpenResume }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Rotating roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.titles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#10b981", "#38bdf8", "#f3f4f6"]
      });
    } catch (err) {
      // Graceful fallback
    }

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-center overflow-hidden border-b border-neutral-800/60"
    >
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Top Specimen Coordinates inspired by library.jjangik.kr */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-neutral-800/60 font-mono-code text-[11px] text-neutral-400 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-neutral-300 font-semibold">PORTFOLIO ARCHIVE // 2025–2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">LOC: {personalInfo.coordinates}</span>
            <span className="text-emerald-400/90 font-medium">INDEX.REF #01</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Typographic Hero */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Status Beacon Pill */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Junior Software Developer @ Digiclarity Global Solutions</span>
            </motion.div>

            {/* Creative Typographic Name Header */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-100 uppercase"
              >
                SURYA M<span className="text-emerald-400">.</span>
              </motion.h1>

              {/* Animated Role Text Switcher */}
              <div className="h-9 sm:h-11 mt-2 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex items-center gap-2 text-lg sm:text-2xl font-mono-code font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-neutral-200"
                  >
                    <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{personalInfo.titles[roleIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Professional Summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-xl"
            >
              Junior Software Developer at{" "}
              <span className="text-neutral-200 font-medium">Digiclarity Global Solutions</span>,
              specializing in backend development, scalable REST APIs, and healthcare automation
              workflows. Dedicated to clean architecture and actively expanding toward becoming a
              well-rounded Full-Stack Developer with React, Docker, and GCP.
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Button
                variant="primary"
                size="md"
                href="#projects"
                icon={Layers}
                data-cursor-text="PROJECTS"
              >
                Explore Projects
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={FileText}
                onClick={onOpenResume}
                data-cursor-text="RESUME"
              >
                View ATS Resume
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={handleCopyEmail}
                icon={copiedEmail ? Check : Copy}
                data-cursor-text="COPY"
                className={copiedEmail ? "border-emerald-500 text-emerald-400" : ""}
              >
                {copiedEmail ? "Email Copied!" : "Copy Email"}
              </Button>
            </motion.div>

            {/* Social Connectivity & Verification Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-4 pt-4 border-t border-neutral-800/60 text-xs font-mono-code text-neutral-400"
            >
              <span className="text-neutral-500">PROFILES:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition-colors"
                data-cursor-text="GITHUB"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-neutral-700">/</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400 transition-colors"
                data-cursor-text="LINKEDIN"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-neutral-700">/</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition-colors"
                data-cursor-text="MAIL"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Developer Status Telemetry Widget */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <StatusWidget />

            {/* Quick Tech Highlights Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-2xl p-4 sm:p-5 border border-neutral-800/80 font-mono-code text-xs text-neutral-400 space-y-2.5"
            >
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-neutral-800/60">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  CORE ARCHITECTURE STACK
                </span>
                <span className="text-emerald-400">PROD-READY</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Python", "FastAPI", "Java", "Spring Boot", "MySQL", "Playwright", "REST APIs"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-emerald-500/40 transition-colors"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Currently adding: React.js · Docker · GCP · CI/CD</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-6 flex items-center justify-between font-mono-code text-[11px] text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
            <span>SCROLL TO EXPLORE ARCHIVE</span>
          </div>
          <span className="text-neutral-400">STATUS: READY // 200 OK</span>
        </motion.div>
      </div>
    </section>
  );
}
