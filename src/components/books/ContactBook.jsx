import React, { useState } from "react";
import { personalInfo } from "../../data/portfolioData";
import { Button } from "../ui/Button";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import confetti from "canvas-confetti";
import { Copy, Check, Send, Mail, MapPin } from "lucide-react";

export function ContactBook() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#10b981", "#d9975b", "#38bdf8"]
      });
    } catch (err) {}
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10b981", "#ffffff", "#d9975b"]
      });
    } catch (err) {}
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
      {/* Left Page (Direct Channels & Social Links) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Chapter 09 // Transmission
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Direct Contact
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Let&apos;s Connect &amp; Collaborate</p>
        </div>

        <div className="p-4 rounded-xl bg-[#f0e7d7] border border-[#ded2bd] space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold text-[#6c5e4e]">
            <Mail className="w-3.5 h-3.5 text-emerald-800" /> EMAIL ADDRESS
          </div>
          <div className="font-mono font-bold text-xs text-[#1a1612] truncate">
            {personalInfo.email}
          </div>
          <Button
            variant={copiedEmail ? "primary" : "secondary"}
            size="sm"
            onClick={handleCopyEmail}
            icon={copiedEmail ? Check : Copy}
            className="w-full text-xs font-mono"
          >
            {copiedEmail ? "Email Copied!" : "Copy Email to Clipboard"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] hover:border-[#1a1612] text-[#1a1612] flex items-center justify-center gap-1.5 font-bold transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" /> GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] hover:border-[#1a1612] text-[#1a1612] flex items-center justify-center gap-1.5 font-bold transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
          </a>
        </div>

        <div className="text-[11px] font-mono text-[#6c5e4e] flex items-center gap-1.5 pt-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-800" />
          <span>{personalInfo.location} ({personalInfo.coordinates})</span>
        </div>
      </div>

      {/* Right Page (Direct Message Form) */}
      <div className="space-y-4 text-xs text-[#2a241e]">
        <div className="border-b border-[#ded3be] pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#7a6b58]">
            Inquiry Desk
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1a1510] tracking-tight">
            Send a Message
          </h3>
          <p className="text-xs text-[#6c5e4e] font-mono mt-0.5">Direct Message to Surya M.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Your Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] text-xs text-[#1a1612] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1612]"
          />
          <input
            type="email"
            required
            placeholder="Your Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] text-xs text-[#1a1612] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1612]"
          />
          <textarea
            rows={3}
            required
            placeholder="Your message or collaboration inquiry..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0e7d7] border border-[#ded2bd] text-xs text-[#1a1612] placeholder:text-[#8c7e6c] focus:outline-none focus:border-[#1a1612] resize-none"
          />
          <Button
            variant="primary"
            size="md"
            icon={sent ? Check : Send}
            className="w-full font-mono text-xs font-bold"
          >
            {sent ? "Message Transmitted!" : "Transmit Inquiry"}
          </Button>
        </form>
      </div>
    </div>
  );
}

