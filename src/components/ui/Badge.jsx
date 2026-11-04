import React from "react";

export function Badge({
  children,
  isLearning = false,
  variant = "default",
  size = "md",
  className = "",
  icon: Icon
}) {
  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2"
  };

  if (isLearning) {
    return (
      <span
        className={`inline-flex items-center font-mono-code font-medium rounded-full border border-dashed border-cyan-500/50 bg-cyan-950/20 text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/30 ${sizeStyles[size]} ${className}`}
        title="Currently expanding knowledge in this technology"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
        </span>
        {Icon && <Icon className="w-3 h-3" />}
        <span>{children}</span>
        <span className="text-[9px] uppercase tracking-wider text-cyan-400/80 font-semibold px-1 py-0.2 bg-cyan-500/10 rounded">
          Learning
        </span>
      </span>
    );
  }

  // Active / Proficient Skill
  const variants = {
    default:
      "border border-neutral-800 bg-neutral-900/70 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100",
    emerald:
      "border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:border-emerald-500/70 hover:bg-emerald-900/40",
    cyan:
      "border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-500/70 hover:bg-cyan-900/40",
    subtle:
      "border border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10"
  };

  return (
    <span
      className={`inline-flex items-center font-mono-code font-medium rounded-full transition-all ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      {Icon && <Icon className="w-3 h-3" />}
      <span>{children}</span>
    </span>
  );
}

