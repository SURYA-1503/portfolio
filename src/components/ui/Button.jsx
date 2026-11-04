import React from "react";
import { motion } from "motion/react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  download,
  target,
  rel,
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-full tracking-wide";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3 gap-2.5"
  };

  const variantStyles = {
    primary:
      "bg-emerald-500 text-neutral-950 font-semibold hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 active:scale-[0.98]",
    secondary:
      "bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 border border-neutral-700/60 hover:border-neutral-500 backdrop-blur-md active:scale-[0.98]",
    outline:
      "bg-transparent text-neutral-300 border border-neutral-800 hover:border-emerald-500/60 hover:text-emerald-400 active:scale-[0.98]",
    ghost:
      "bg-transparent text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50",
    emeraldSubtle:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60",
    cyanSubtle:
      "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/60"
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        onClick={onClick}
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}

