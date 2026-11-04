import React, { useState, useCallback, useEffect } from "react";
import { LibraryScene } from "./components/canvas/LibraryScene";
import { LibraryOverlay } from "./components/library/LibraryOverlay";
import { PhysicalBookReader } from "./components/books/PhysicalBookReader";

// ★ Determine initial light state from local time:
//    6am–9pm = lights ON, otherwise lights OFF for night atmosphere
function getInitialLightState() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 21;
}

function App() {
  const [activeBookIndex, setActiveBookIndex] = useState(null);
  const [isLightOn, setIsLightOn] = useState(false); // Start OFF for atmosphere
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Stable callbacks — never trigger LibraryScene re-render
  const handleSelectBook = useCallback((idx) => {
    setActiveBookIndex(idx);
  }, []);

  const handleCloseBook = useCallback(() => {
    setActiveBookIndex(null);
  }, []);

  const handleToggleLight = useCallback(() => {
    setIsLightOn((prev) => !prev);
  }, []);

  const handleToggleAudio = useCallback(() => {
    setIsAudioPlaying((prev) => !prev);
  }, []);

  // Web Audio ambient library ambience
  useEffect(() => {
    if (!isAudioPlaying) return;

    let audioCtx = null;
    let osc1 = null, osc2 = null, gainNode = null;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.028, audioCtx.currentTime);

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
      console.warn("Web Audio:", err);
    }

    return () => {
      try { osc1?.stop(); } catch {}
      try { osc2?.stop(); } catch {}
      try { audioCtx?.close(); } catch {}
    };
  }, [isAudioPlaying]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#06070c] text-[#f3f4f6] select-none">
      {/* 1. Full-Viewport 3D Bookshelf (Three.js — decoupled from React render cycle) */}
      <LibraryScene
        activeBookIndex={activeBookIndex}
        isLightOn={isLightOn}
        onToggleLight={handleToggleLight}
        onSelectBook={handleSelectBook}
      />

      {/* 2. UI Overlay — book telemetry + light + audio controls */}
      <LibraryOverlay
        isLightOn={isLightOn}
        onToggleLight={handleToggleLight}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* 3. Physical Book Reader — appears when a book is selected */}
      <PhysicalBookReader
        bookIndex={activeBookIndex}
        onClose={handleCloseBook}
      />
    </div>
  );
}

export default App;
