import * as THREE from "three";

/**
 * Generates an ultra-crisp, high-resolution canvas texture for book spines.
 * Big, bold, expressive typography readable directly from the shelf.
 */
export function generateBookSpineTexture({
  index = "01",
  title = "ABOUT ME",
  subtitle = "Surya M. Story",
  bgColor = "#d9975b",
  textColor = "#1f1408",
  accentColor = "rgba(0,0,0,0.22)"
}) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  // 1. Rich base color with realistic leather/cloth matte texture
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. 3D Spine Cylindrical Shading (highlights down the center, shadows on edges)
  const gradH = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradH.addColorStop(0, "rgba(0,0,0,0.40)");
  gradH.addColorStop(0.10, "rgba(0,0,0,0.06)");
  gradH.addColorStop(0.48, "rgba(255,255,255,0.18)");
  gradH.addColorStop(0.52, "rgba(255,255,255,0.18)");
  gradH.addColorStop(0.90, "rgba(0,0,0,0.06)");
  gradH.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = gradH;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 3. Top Decorative Embossed Gold/Dark Ribs
  ctx.fillStyle = accentColor;
  ctx.fillRect(40, 100, canvas.width - 80, 6);
  ctx.fillRect(40, 114, canvas.width - 80, 3);

  // 4. Index Badge (e.g. "01")
  ctx.save();
  ctx.fillStyle = textColor;
  ctx.font = "bold 64px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Rounded pill border for index
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 4;
  const pillW = 160;
  const pillH = 88;
  const pillX = (canvas.width - pillW) / 2;
  const pillY = 160;
  ctx.strokeRect(pillX, pillY, pillW, pillH);
  ctx.fillText(index, canvas.width / 2, pillY + pillH / 2 + 3);
  ctx.restore();

  // 5. Main Title (MASSIVE, BOLD, HIGH-CONTRAST vertical text)
  ctx.save();
  ctx.translate(canvas.width / 2, 1080);
  ctx.rotate(Math.PI / 2); // 90 degree rotation for vertical spine reading

  // Subtle embossed drop shadow for spine text
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = textColor;
  ctx.font = "900 112px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "4px";
  ctx.fillText(title.toUpperCase(), 0, -12);

  // Subtitle
  ctx.shadowColor = "transparent";
  ctx.font = "600 44px 'JetBrains Mono', monospace";
  ctx.fillStyle = textColor === "#f9fafb" ? "rgba(249,250,251,0.8)" : "rgba(0,0,0,0.65)";
  ctx.fillText(subtitle, 0, 72);
  ctx.restore();

  // 6. Bottom Embossed Ribs & Metadata
  ctx.fillStyle = accentColor;
  ctx.fillRect(40, canvas.height - 220, canvas.width - 80, 3);
  ctx.fillRect(40, canvas.height - 208, canvas.width - 80, 6);

  ctx.save();
  ctx.font = "bold 32px 'JetBrains Mono', monospace";
  ctx.fillStyle = textColor === "#f9fafb" ? "rgba(249,250,251,0.7)" : "rgba(0,0,0,0.6)";
  ctx.textAlign = "center";
  ctx.fillText("SURYA M.", canvas.width / 2, canvas.height - 130);
  ctx.font = "500 22px 'JetBrains Mono', monospace";
  ctx.fillText("LIBRARY ED. 2026", canvas.width / 2, canvas.height - 85);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Generates front/back cover texture for the book with elegant border framing
 */
export function generateBookCoverTexture(bgColor = "#d9975b", title = "BOOK") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");

  // Base cover
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle paper grain
  ctx.fillStyle = "rgba(0,0,0,0.03)";
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillRect(x, y, 3, 3);
  }

  // Crease near the spine
  const grad = ctx.createLinearGradient(0, 0, 80, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.45)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 80, canvas.height);

  // Gold / debossed frame line around the cover
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(90, 80, canvas.width - 170, canvas.height - 160);
  ctx.strokeRect(104, 94, canvas.width - 198, canvas.height - 188);

  // Cover typography
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.font = "bold 56px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title.toUpperCase(), canvas.width / 2, 480);

  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillText("SURYA M. — DEVELOPER ARCHIVE", canvas.width / 2, 540);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Generates book pages edge texture with textured page lines
 */
export function generatePagesTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#faf5ea";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Page lines
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.fillRect(0, y, canvas.width, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
