import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");

  // Outer smooth follower ring with fluid spring physics
  const ringX = useSpring(-100, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(-100, { stiffness: 320, damping: 28, mass: 0.5 });

  // Direct inner dot with instant response
  const dotX = useSpring(-100, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(-100, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      // Check if hovering over clickable or interactive element
      const target = e.target;
      const interactiveEl = target.closest("a, button, [role='button'], canvas, input, textarea, select");
      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute("data-cursor-text") || "";
        setHoverLabel(label);
      } else {
        setIsHovered(false);
        setHoverLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ringX, ringY, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer fluid spring ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.7 : 1,
            borderColor: isHovered ? "rgba(217, 151, 91, 0.85)" : "rgba(255, 255, 255, 0.35)",
            backgroundColor: isHovered ? "rgba(217, 151, 91, 0.15)" : "rgba(255, 255, 255, 0.04)"
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-[0.5px]"
        />

        {/* Hover text pill if provided */}
        {hoverLabel && (
          <span className="absolute left-7 top-0 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-amber-300 whitespace-nowrap shadow-lg">
            {hoverLabel}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isHovered ? "w-1.5 h-1.5 bg-amber-400" : "w-1 h-1 bg-white"
          }`}
        />
      </motion.div>
    </>
  );
}
