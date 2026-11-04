import * as THREE from "three";

/**
 * Procedural dark walnut / mahogany wood texture for the bookshelf
 */
export function generateWoodTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Base dark mahogany wood
  ctx.fillStyle = "#2d1b13";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle wood grain lines
  ctx.fillStyle = "rgba(18, 10, 7, 0.4)";
  for (let i = 0; i < 500; i++) {
    const y = Math.random() * canvas.height;
    const h = Math.random() * 3 + 1;
    ctx.fillRect(0, y, canvas.width, h);
  }

  // Soft wood grain swirls
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "rgba(70, 42, 30, 0.2)");
  grad.addColorStop(0.5, "rgba(20, 10, 7, 0.3)");
  grad.addColorStop(1, "rgba(50, 30, 20, 0.2)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural night sky with mountains and full moon for the left window
 */
export function generateWindowNightSkyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Deep indigo night sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGrad.addColorStop(0, "#090b14");
  skyGrad.addColorStop(0.5, "#101426");
  skyGrad.addColorStop(0.8, "#1a1e36");
  skyGrad.addColorStop(1, "#1e223d");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Twinkling stars
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.7);
    const r = Math.random() * 1.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Glowing full moon
  const moonX = canvas.width * 0.65;
  const moonY = canvas.height * 0.22;
  const moonRadius = 32;

  // Moon ambient halo
  const haloGrad = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 4);
  haloGrad.addColorStop(0, "rgba(235, 245, 255, 0.5)");
  haloGrad.addColorStop(0.4, "rgba(200, 225, 255, 0.15)");
  haloGrad.addColorStop(1, "rgba(200, 225, 255, 0)");
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonRadius * 4, 0, Math.PI * 2);
  ctx.fill();

  // Moon body
  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
  ctx.fill();

  // Mountain silhouettes in distance
  ctx.fillStyle = "#0c0e18";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.72);
  ctx.lineTo(canvas.width * 0.35, canvas.height * 0.62);
  ctx.lineTo(canvas.width * 0.75, canvas.height * 0.69);
  ctx.lineTo(canvas.width, canvas.height * 0.64);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();

  // Distant warm city lights / fireflies along base of mountains
  const lightColors = ["#fde047", "#f59e0b", "#fbbf24", "#e2e8f0"];
  for (let i = 0; i < 45; i++) {
    const lx = Math.random() * canvas.width;
    const ly = canvas.height * 0.70 + Math.random() * (canvas.height * 0.26);
    ctx.fillStyle = lightColors[Math.floor(Math.random() * lightColors.length)];
    ctx.globalAlpha = Math.random() * 0.7 + 0.3;
    ctx.beginPath();
    ctx.arc(lx, ly, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural clock face canvas texture
 */
export function generateClockFaceTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // Clock dial background
  ctx.fillStyle = "#f5f0e6";
  ctx.beginPath();
  ctx.arc(128, 128, 120, 0, Math.PI * 2);
  ctx.fill();

  // Outer rim
  ctx.strokeStyle = "#5a3a24";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Minute / Hour tick marks
  ctx.save();
  ctx.translate(128, 128);
  for (let i = 0; i < 12; i++) {
    ctx.strokeStyle = "#2b1c11";
    ctx.lineWidth = i % 3 === 0 ? 4 : 2;
    ctx.beginPath();
    ctx.moveTo(0, -108);
    ctx.lineTo(0, i % 3 === 0 ? -90 : -98);
    ctx.stroke();
    ctx.rotate((Math.PI * 2) / 12);
  }
  ctx.restore();

  // Center pivot
  ctx.fillStyle = "#2b1c11";
  ctx.beginPath();
  ctx.arc(128, 128, 6, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural miniature framed artwork for "Window Seat"
 */
export function generateArtFrameTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 340;
  const ctx = canvas.getContext("2d");

  // White matte border
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Artwork inner box
  ctx.fillStyle = "#0c172e";
  ctx.fillRect(24, 24, canvas.width - 48, 230);

  // Modern abstract geometric art (blue sky, sun, horizon)
  const grad = ctx.createLinearGradient(0, 24, 0, 254);
  grad.addColorStop(0, "#1d4ed8");
  grad.addColorStop(1, "#93c5fd");
  ctx.fillStyle = grad;
  ctx.fillRect(24, 24, canvas.width - 48, 230);

  // Sun
  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 100, 36, 0, Math.PI * 2);
  ctx.fill();

  // Minimalist horizontal beam / bench
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(36, 175, canvas.width - 72, 14);

  // Caption at bottom
  ctx.fillStyle = "#334155";
  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("WINDOW SEAT", canvas.width / 2, 285);
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#64748b";
  ctx.fillText("ARCHIVE // ED. 01", canvas.width / 2, 305);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

