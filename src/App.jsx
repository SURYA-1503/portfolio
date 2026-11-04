import React, { useState, useEffect, useCallback } from "react";
import { LibraryScene } from "./components/canvas/LibraryScene";
import { LibraryOverlay } from "./components/library/LibraryOverlay";
import { PhysicalBookReader } from "./components/books/PhysicalBookReader";
import { CustomCursor } from "./components/ui/CustomCursor";

function App() {
  const [activeBookIndex, setActiveBookIndex] = useState(null);
  const [isLightOn, setIsLightOn] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Global Escape key listener to close opened book
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveBookIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Stable callbacks so child components never cause unnecessary re-renders
  const handleSelectBook = useCallback((idx) => {
    setActiveBookIndex(idx);
  }, []);

  const handleToggleLight = useCallback(() => {
    setIsLightOn((prev) => !prev);
  }, []);

  const handleToggleAudio = useCallback(() => {
    setIsAudioPlaying((prev) => !prev);
  }, []);

  // Web Audio ambient drone generator
  useEffect(() => {
    let audioCtx = null;
    let osc1 = null;
    let osc2 = null;
    let gainNode = null;

    if (isAudioPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.035, audioCtx.currentTime);

        osc1 = audioCtx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(110, audioCtx.currentTime);

        osc2 = audioCtx.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(164.81, audioCtx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc1.start();
        osc2.start();
      } catch (err) {
        console.warn("Web Audio gesture requirement", err);
      }
    }

    return () => {
      if (osc1) {
        try { osc1.stop(); } catch (e) {}
      }
      if (osc2) {
        try { osc2.stop(); } catch (e) {}
      }
      if (audioCtx) {
        try { audioCtx.close(); } catch (e) {}
      }
    };
  }, [isAudioPlaying]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07080d] text-[#f3f4f6] select-none">
      {/* 1. Ultra-Smooth 120fps GPU Custom Cursor */}
      <CustomCursor />

      {/* 2. Full-Viewport 3D Bookshelf Scene (Decoupled from React render cycle) */}
      <LibraryScene
        activeBookIndex={activeBookIndex}
        isLightOn={isLightOn}
        onToggleLight={handleToggleLight}
        onSelectBook={handleSelectBook}
      />

      {/* 3. Minimalist Overlay (NO top nav links, only light & audio switches) */}
      <LibraryOverlay
        isLightOn={isLightOn}
        onToggleLight={handleToggleLight}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* 4. Physical 3D Book Reader — single-page layout with cover opening & page flip */}
      <PhysicalBookReader
        bookIndex={activeBookIndex}
        onClose={() => setActiveBookIndex(null)}
      />
    </div>
  );
}

export default App;
