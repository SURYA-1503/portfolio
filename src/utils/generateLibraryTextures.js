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
 * Procedural landscape sky with mountain ranges for the left window
 * Matches the reference library aesthetic (daylight / dusk mountain view)
 */
export function generateWindowNightSkyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // 1. Clean daylight / dusk sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGrad.addColorStop(0, "#48719d"); // crisp blue at top
  skyGrad.addColorStop(0.35, "#5d87b3");
  skyGrad.addColorStop(0.65, "#93b3d1");
  skyGrad.addColorStop(0.82, "#c9d8e5"); // pale soft horizon
  skyGrad.addColorStop(1, "#dce6ef");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Distant mountain silhouette (farthest, pale blue-grey)
  ctx.fillStyle = "#5c7996";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.72);
  ctx.bezierCurveTo(
    canvas.width * 0.25, canvas.height * 0.64,
    canvas.width * 0.45, canvas.height * 0.69,
    canvas.width * 0.70, canvas.height * 0.61
  );
  ctx.bezierCurveTo(
    canvas.width * 0.85, canvas.height * 0.58,
    canvas.width * 0.95, canvas.height * 0.64,
    canvas.width, canvas.height * 0.63
  );
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();

  // 3. Middle mountain silhouette (mid-distance, deeper blue-slate)
  ctx.fillStyle = "#3c5870";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.79);
  ctx.bezierCurveTo(
    canvas.width * 0.20, canvas.height * 0.72,
    canvas.width * 0.40, canvas.height * 0.76,
    canvas.width * 0.60, canvas.height * 0.69
  );
  ctx.bezierCurveTo(
    canvas.width * 0.78, canvas.height * 0.66,
    canvas.width * 0.90, canvas.height * 0.74,
    canvas.width, canvas.height * 0.72
  );
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();

  // 4. Foreground ridge (closest mountain, dark slate-blue)
  ctx.fillStyle = "#253b4c";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.86);
  ctx.bezierCurveTo(
    canvas.width * 0.22, canvas.height * 0.81,
    canvas.width * 0.38, canvas.height * 0.84,
    canvas.width * 0.55, canvas.height * 0.78
  );
  ctx.bezierCurveTo(
    canvas.width * 0.75, canvas.height * 0.75,
    canvas.width * 0.88, canvas.height * 0.82,
    canvas.width, canvas.height * 0.80
  );
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();

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

