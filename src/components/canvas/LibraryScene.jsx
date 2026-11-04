import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { BOOKS_CATALOG } from "../../data/booksCatalog";
import {
  generateWoodTexture,
  generateWindowNightSkyTexture,
  generateClockFaceTexture,
  generateArtFrameTexture
} from "../../utils/generateLibraryTextures";
import {
  generateBookSpineTexture,
  generateBookCoverTexture,
  generatePagesTexture
} from "../../utils/generateBookTexture";

export function LibraryScene({
  activeBookIndex,
  onSelectBook,
  isLightOn = false,
  onToggleLight
}) {
  const mountRef = useRef(null);

  const onSelectBookRef = useRef(onSelectBook);
  onSelectBookRef.current = onSelectBook;

  const onToggleLightRef = useRef(onToggleLight);
  onToggleLightRef.current = onToggleLight;

  const isLightOnRef = useRef(isLightOn);
  isLightOnRef.current = isLightOn;

  const activeBookIndexRef = useRef(activeBookIndex);
  activeBookIndexRef.current = activeBookIndex;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // ─── 1. Scene, Camera, Renderer ───────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#06070c");

    const camera = new THREE.PerspectiveCamera(37, width / height, 0.1, 50);
    camera.position.set(0.08, 0.32, 4.45);
    camera.lookAt(0.08, 0.12, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.80; // Start dim (lights OFF)
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ─── 2. Shared Textures & Materials ───────────────────────────────────
    const woodTexture = generateWoodTexture();
    const woodMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.62,
      metalness: 0.08,
      color: 0x42271a
    });

    const pagesTexture = generatePagesTexture();
    const pagesMaterial = new THREE.MeshStandardMaterial({
      map: pagesTexture,
      roughness: 0.88,
      metalness: 0.02
    });

    // ─── 3. Lighting — initial state: lights OFF (nighttime atmosphere) ───
    const ambientLight = new THREE.AmbientLight(0x1a2340, 0.75);
    scene.add(ambientLight);

    const lampX = 0.48;
    const lampY = 1.45;
    const lampZ = 0.58;

    const lampLight = new THREE.PointLight(0xffe2b0, 0.3, 6.0, 1.2);
    lampLight.position.set(lampX, lampY, lampZ);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 1024;
    lampLight.shadow.mapSize.height = 1024;
    lampLight.shadow.bias = -0.001;
    scene.add(lampLight);

    const lampSpot = new THREE.SpotLight(0xffe2b0, 0.4, 6.0, Math.PI / 3.0, 0.55, 1.2);
    lampSpot.position.set(lampX, lampY, lampZ);
    lampSpot.target.position.set(lampX, -0.35, 0);
    scene.add(lampSpot);
    scene.add(lampSpot.target);

    // Always-on subtle moonlight (keeps scene readable when lights off)
    const windowMoonLight = new THREE.DirectionalLight(0xa5cbf5, 1.4);
    windowMoonLight.position.set(-3.2, 1.5, -0.2);
    windowMoonLight.target.position.set(0, 0, 0);
    scene.add(windowMoonLight);
    scene.add(windowMoonLight.target);

    // Rim light for books (always on, slightly dim — ensures titles readable)
    const rimLight = new THREE.DirectionalLight(0xc8d8ff, 0.55);
    rimLight.position.set(0, 0.5, 2.5);
    rimLight.target.position.set(0, 0, 0);
    scene.add(rimLight);
    scene.add(rimLight.target);

    const fillLight = new THREE.PointLight(0x5a3520, 0.3, 4.5);
    fillLight.position.set(0, -1.2, 1.2);
    scene.add(fillLight);

    // ─── 4. Left Window (Night Sky, Moon & Mountains) ─────────────────────
    const windowGroup = new THREE.Group();
    windowGroup.position.set(-2.65, 0.5, -0.45);

    const skyTexture = generateWindowNightSkyTexture();
    const skyGeo = new THREE.PlaneGeometry(1.6, 2.7);
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTexture });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.z = -0.05;
    windowGroup.add(skyMesh);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 0.8 });
    const winLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.75, 0.12), frameMat);
    winLeft.position.x = -0.8;
    const winRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.75, 0.12), frameMat);
    winRight.position.x = 0.8;
    const winTop = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.12), frameMat);
    winTop.position.y = 1.35;
    const winBottom = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.12, 0.22), frameMat);
    winBottom.position.y = -1.35;
    winBottom.position.z = 0.05;
    const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.035, 2.7, 0.05), frameMat);
    const mullionH1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.035, 0.05), frameMat);
    mullionH1.position.y = 0.45;
    const mullionH2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.035, 0.05), frameMat);
    mullionH2.position.y = -0.45;

    windowGroup.add(winLeft, winRight, winTop, winBottom, mullionV, mullionH1, mullionH2);
    scene.add(windowGroup);

    // ─── 5. Wooden Bookshelf Structure ────────────────────────────────────
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(0.52, 0.15, 0);

    const backGeo = new THREE.BoxGeometry(4.35, 2.75, 0.04);
    const backMesh = new THREE.Mesh(backGeo, woodMaterial);
    backMesh.position.z = -0.38;
    backMesh.receiveShadow = true;
    shelfGroup.add(backMesh);

    const crownGeo = new THREE.BoxGeometry(4.55, 0.14, 0.88);
    const crownMesh = new THREE.Mesh(crownGeo, woodMaterial);
    crownMesh.position.y = 1.38;
    crownMesh.castShadow = true;
    shelfGroup.add(crownMesh);

    const wallGeo = new THREE.BoxGeometry(0.12, 2.75, 0.82);
    const leftWall = new THREE.Mesh(wallGeo, woodMaterial);
    leftWall.position.x = -2.15;
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;

    const rightWall = new THREE.Mesh(wallGeo, woodMaterial);
    rightWall.position.x = 2.15;
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    shelfGroup.add(leftWall, rightWall);

    const dividerMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.75, 0.8), woodMaterial);
    dividerMesh.position.x = 0.95;
    dividerMesh.castShadow = true;
    dividerMesh.receiveShadow = true;
    shelfGroup.add(dividerMesh);

    const midShelf = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.08, 0.8), woodMaterial);
    midShelf.position.y = -0.42;
    midShelf.receiveShadow = true;
    midShelf.castShadow = true;

    const botShelf = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.08, 0.8), woodMaterial);
    botShelf.position.y = -1.35;
    botShelf.receiveShadow = true;

    shelfGroup.add(midShelf, botShelf);
    scene.add(shelfGroup);

    // ─── 6. The 9 Interactive Books — Natural realistic arrangement ────────
    const bookMeshes = [];
    const hitboxMeshes = [];

    const bookWidth  = 0.195;
    const bookHeight = 0.94;
    const bookDepth  = 0.54;

    // Realistic natural tilts: each book has a slight rotation
    // Some lean left, some right, some perfectly upright — like a real shelf
    const naturalTilts = [
      0.00,   // 01 upright
      0.02,   // 02 tiny lean right
     -0.03,   // 03 lean left
      0.00,   // 04 upright
      0.025,  // 05 lean right
     -0.015,  // 06 lean left
      0.01,   // 07 upright
      0.03,   // 08 lean right
      0.00    // 09 upright
    ];

    // Gap between books — reduced to 0.008 for tight library packing
    const bookGap = 0.008;
    const startX = -1.90;

    BOOKS_CATALOG.forEach((book, i) => {
      const spineTex = generateBookSpineTexture({
        index: book.index,
        title: book.title,
        subtitle: book.subtitle,
        bgColor: book.color,
        textColor: book.textColor
      });

      const coverTex = generateBookCoverTexture(book.color, book.title);

      // ★ FIX: Use separate materials per face.
      // The spine face gets spineMat; front/back/top/bottom get coverMat.
      // No dark overlay, no opacity reduction — pure colors as designed.
      const coverMat = new THREE.MeshStandardMaterial({
        map: coverTex,
        roughness: 0.72,
        metalness: 0.04
      });
      const spineMat = new THREE.MeshStandardMaterial({
        map: spineTex,
        roughness: 0.65,
        metalness: 0.06
      });

      // THREE.BoxGeometry face order: +X, -X, +Y, -Y, +Z(front), -Z(back/spine)
      // Book spine faces the camera (+Z) = index 4
      const materials = [
        coverMat,     // right face (+X)
        spineMat,     // left face = spine facing camera (-X? depends on orientation)
        pagesMaterial,// top
        pagesMaterial,// bottom
        spineMat,     // front (+Z) — spine visible from viewer
        coverMat      // back (-Z)
      ];

      const hVariation = bookHeight + Math.sin(i * 1.7) * 0.035;
      const geo = new THREE.BoxGeometry(bookWidth, hVariation, bookDepth);
      const mesh = new THREE.Mesh(geo, materials);

      const posX = startX + i * (bookWidth + bookGap);
      const posY = -0.42 + hVariation / 2 + 0.04;
      const posZ = 0.0;

      mesh.position.set(posX, posY, posZ);
      mesh.rotation.z = naturalTilts[i] || 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.userData = {
        index: i,
        bookData: book,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        baseRotZ: naturalTilts[i] || 0,
        targetY: posY,
        targetZ: posZ,
        targetRotX: 0,
        targetRotY: 0,
        targetRotZ: naturalTilts[i] || 0
      };

      shelfGroup.add(mesh);
      bookMeshes.push(mesh);

      // Static invisible raycast hitbox — prevents hover chatter
      const hitGeo = new THREE.BoxGeometry(bookWidth + 0.024, hVariation + 0.08, bookDepth * 1.4);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(posX, posY, posZ + 0.1);
      hitMesh.userData = { index: i };
      shelfGroup.add(hitMesh);
      hitboxMeshes.push(hitMesh);
    });

    // ─── 7. Right Side Middle Shelf Accessories ────────────────────────────
    const artTex = generateArtFrameTexture();
    const artFrameGeo = new THREE.BoxGeometry(0.38, 0.48, 0.03);
    const artFrameMat = [
      woodMaterial, woodMaterial, woodMaterial, woodMaterial,
      new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.38 }),
      woodMaterial
    ];
    const artMesh = new THREE.Mesh(artFrameGeo, artFrameMat);
    artMesh.position.set(1.4, -0.15, -0.1);
    artMesh.rotation.y = -0.12;
    artMesh.castShadow = true;
    shelfGroup.add(artMesh);

    const sphereGeo = new THREE.SphereGeometry(0.09, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.15,
      metalness: 0.1
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(1.72, -0.32, 0.1);
    sphereMesh.castShadow = true;
    shelfGroup.add(sphereMesh);

    const stackColors = ["#43302b", "#222c3c", "#3d3228"];
    stackColors.forEach((col, idx) => {
      const sGeo = new THREE.BoxGeometry(0.48, 0.065, 0.38);
      const sMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.8 });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.position.set(1.75, -0.38 + idx * 0.07, -0.05);
      sMesh.rotation.y = (idx - 1) * 0.04;
      sMesh.castShadow = true;
      shelfGroup.add(sMesh);
    });

    // ─── 8. Top Shelf — Analog Clock & Ceramic Vase ───────────────────────
    const clockGroup = new THREE.Group();
    clockGroup.position.set(1.85, 1.75, -0.1);

    const clockTex = generateClockFaceTexture();
    const clockRimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 32);
    clockRimGeo.rotateX(Math.PI / 2);
    const clockMat = new THREE.MeshStandardMaterial({
      map: clockTex,
      roughness: 0.5,
      metalness: 0.1
    });
    const clockBody = new THREE.Mesh(clockRimGeo, clockMat);
    clockBody.castShadow = true;
    clockGroup.add(clockBody);

    // Clock frame rim
    const clockFrameGeo = new THREE.TorusGeometry(0.24, 0.025, 8, 32);
    const clockFrameMat = new THREE.MeshStandardMaterial({ color: 0x5a3a24, roughness: 0.4, metalness: 0.3 });
    const clockFrame = new THREE.Mesh(clockFrameGeo, clockFrameMat);
    clockFrame.rotation.x = Math.PI / 2;
    clockGroup.add(clockFrame);

    const handMat = new THREE.MeshBasicMaterial({ color: 0x1f1914 });
    const secMat = new THREE.MeshBasicMaterial({ color: 0xb91c1c });

    const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.11, 0.005), handMat);
    hourHand.position.z = 0.035;
    const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.16, 0.005), handMat);
    minHand.position.z = 0.037;
    const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.18, 0.005), secMat);
    secHand.position.z = 0.039;

    // Center pivot dot
    const pivotGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.01, 16);
    pivotGeo.rotateX(Math.PI / 2);
    const pivotMesh = new THREE.Mesh(pivotGeo, new THREE.MeshBasicMaterial({ color: 0x1f1914 }));
    pivotMesh.position.z = 0.042;

    clockGroup.add(hourHand, minHand, secHand, pivotMesh);
    shelfGroup.add(clockGroup);

    // Vase with dried branches
    const vaseGroup = new THREE.Group();
    vaseGroup.position.set(1.25, 1.55, -0.15);
    const vaseGeo = new THREE.CylinderGeometry(0.06, 0.1, 0.32, 16);
    const vaseMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.35 });
    const vaseMesh = new THREE.Mesh(vaseGeo, vaseMat);
    vaseMesh.castShadow = true;
    vaseGroup.add(vaseMesh);

    const branchMat = new THREE.MeshBasicMaterial({ color: 0x5a4632 });
    for (let b = 0; b < 5; b++) {
      const bGeo = new THREE.CylinderGeometry(0.004, 0.006, 0.45 + b * 0.05);
      const bMesh = new THREE.Mesh(bGeo, branchMat);
      bMesh.position.set(0, 0.24, 0);
      bMesh.rotation.z = (b - 2) * 0.12;
      bMesh.rotation.x = (b % 2 - 0.5) * 0.1;
      vaseGroup.add(bMesh);
    }
    shelfGroup.add(vaseGroup);

    // ─── 9. Light Switch on the left wall of bookshelf ────────────────────
    // A small physical toggle switch that the user can click to toggle lighting
    const switchPanelGeo = new THREE.BoxGeometry(0.11, 0.17, 0.025);
    const switchPanelMat = new THREE.MeshStandardMaterial({ color: 0xd4c8b4, roughness: 0.5, metalness: 0.0 });
    const switchPanel = new THREE.Mesh(switchPanelGeo, switchPanelMat);
    switchPanel.position.set(-2.42, 0.78, 0.22);
    scene.add(switchPanel);

    const switchToggleGeo = new THREE.BoxGeometry(0.045, 0.072, 0.03);
    const switchToggleMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e4, roughness: 0.3, metalness: 0.1 });
    const switchToggle = new THREE.Mesh(switchToggleGeo, switchToggleMat);
    switchToggle.position.set(-2.42, 0.785, 0.24);
    switchToggle.userData = { isLampSwitch: true };
    scene.add(switchToggle);

    // Small label above the switch
    const switchLabelGeo = new THREE.BoxGeometry(0.08, 0.02, 0.005);
    const switchLabelMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const switchLabel = new THREE.Mesh(switchLabelGeo, switchLabelMat);
    switchLabel.position.set(-2.42, 0.86, 0.23);
    scene.add(switchLabel);

    // ─── 10. Ceiling: Hanging Lamp & Mobile ───────────────────────────────
    const lampCordGeo = new THREE.CylinderGeometry(0.004, 0.004, 1.2, 8);
    const lampCordMat = new THREE.MeshBasicMaterial({ color: 0x1f1f1f });
    const lampCord = new THREE.Mesh(lampCordGeo, lampCordMat);
    lampCord.position.set(lampX, 2.05, lampZ);

    const shadeGeo = new THREE.CylinderGeometry(0.04, 0.16, 0.16, 24, 1, true);
    const shadeMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.5,
      metalness: 0.4,
      side: THREE.DoubleSide
    });
    const shadeMesh = new THREE.Mesh(shadeGeo, shadeMat);
    shadeMesh.position.set(lampX, 1.48, lampZ);

    const stringGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.45);
    const pullString = new THREE.Mesh(stringGeo, lampCordMat);
    pullString.position.set(lampX + 0.08, 1.25, lampZ);

    const beadGeo = new THREE.SphereGeometry(0.022, 16, 16);
    const beadMat = new THREE.MeshStandardMaterial({ color: 0xd4a045, metalness: 0.8, roughness: 0.2 });
    const beadMesh = new THREE.Mesh(beadGeo, beadMat);
    beadMesh.position.set(lampX + 0.08, 1.02, lampZ);
    beadMesh.userData = { isLampSwitch: true };

    scene.add(lampCord, shadeMesh, pullString, beadMesh);

    // ─── 11. Hanging Mobile ───────────────────────────────────────────────
    const mobileGroup = new THREE.Group();
    mobileGroup.position.set(-0.35, 2.1, 0.2);

    const mobileWire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.55), lampCordMat);
    mobileWire1.rotation.z = Math.PI / 2;
    mobileGroup.add(mobileWire1);

    const discOrange = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.01, 24),
      new THREE.MeshBasicMaterial({ color: 0xe06642 })
    );
    discOrange.position.set(-0.25, -0.15, 0);
    discOrange.rotation.x = Math.PI / 2;

    const discWhite = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.01, 24),
      new THREE.MeshBasicMaterial({ color: 0xf5f5f5 })
    );
    discWhite.position.set(0.05, -0.22, 0);
    discWhite.rotation.x = Math.PI / 2;

    const discDark = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.01, 24),
      new THREE.MeshBasicMaterial({ color: 0x334155 })
    );
    discDark.position.set(0.24, -0.12, 0);
    discDark.rotation.x = Math.PI / 2;

    mobileGroup.add(discOrange, discWhite, discDark);
    scene.add(mobileGroup);

    // ─── 12. Bottom Shelf Vintage Leather Books ────────────────────────────
    const leatherColors = [0x221c17, 0x1b2326, 0x2b1e16, 0x18201a, 0x281919, 0x1f1b29];
    for (let b = 0; b < 18; b++) {
      const lbH = 0.72 + Math.sin(b * 1.8) * 0.06;
      const lbW = 0.14 + Math.cos(b * 2.1) * 0.03;
      const lbGeo = new THREE.BoxGeometry(lbW, lbH, 0.48);
      const lbMat = new THREE.MeshStandardMaterial({
        color: leatherColors[b % leatherColors.length],
        roughness: 0.85
      });
      const lbMesh = new THREE.Mesh(lbGeo, lbMat);
      lbMesh.position.set(-1.8 + b * 0.175, -1.35 + lbH / 2 + 0.04, 0.0);
      lbMesh.rotation.z = (Math.sin(b * 2.3) * 0.025); // subtle natural lean
      shelfGroup.add(lbMesh);
    }

    // ─── 13. Raycasting & Pointer ─────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-100, -100);
    let targetCameraX = 0.08;
    let targetCameraY = 0.32;

    const handlePointerMove = (e) => {
      pointer.x = (e.clientX / width) * 2 - 1;
      pointer.y = -(e.clientY / height) * 2 + 1;
      targetCameraX = 0.08 + pointer.x * 0.14;
      targetCameraY = 0.32 + pointer.y * 0.07;
    };

    // Transition manager (book extraction / return)
    let currentTransition = null;
    let lastActiveIndex = null;

    const handleClick = () => {
      if (currentTransition || (activeBookIndexRef.current != null)) return;

      raycaster.setFromCamera(pointer, camera);
      const allTargets = [...hitboxMeshes, beadMesh, switchToggle];
      const intersects = raycaster.intersectObjects(allTargets);

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object;
        if (clickedObj.userData.isLampSwitch) {
          onToggleLightRef.current?.();
        } else if (clickedObj.userData.index !== undefined) {
          const idx = clickedObj.userData.index;
          currentTransition = {
            type: "extracting",
            index: idx,
            startTime: null, // set in animate loop
            duration: 0.72
          };
        }
      }
    };

    // Cursor change for interactable objects
    const handlePointerDown = () => {};

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick);

    // ─── 14. Animation Loop ───────────────────────────────────────────────
    const clock = new THREE.Clock();
    // Track cursor hover for DOM cursor style
    let lastHoverIdx = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lighting lerp — smooth ON/OFF transition
      const lit = isLightOnRef.current;
      const targetLampInt  = lit ? 4.4 : 0.3;
      const targetSpotInt  = lit ? 5.4 : 0.4;
      const targetAmbInt   = lit ? 1.6 : 0.75;
      const targetExposure = lit ? 1.25 : 0.80;
      const targetBg       = lit ? new THREE.Color("#0f121b") : new THREE.Color("#06070c");

      lampLight.intensity  += (targetLampInt  - lampLight.intensity)  * 0.09;
      lampSpot.intensity   += (targetSpotInt  - lampSpot.intensity)   * 0.09;
      ambientLight.intensity += (targetAmbInt - ambientLight.intensity) * 0.09;
      renderer.toneMappingExposure += (targetExposure - renderer.toneMappingExposure) * 0.09;
      scene.background.lerp(targetBg, 0.09);

      // Animate light switch toggle visual
      const switchTargetY = lit ? 0.80 : 0.775;
      switchToggle.position.y += (switchTargetY - switchToggle.position.y) * 0.14;

      // Camera parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.055;
      camera.position.y += (targetCameraY - camera.position.y) * 0.055;
      camera.lookAt(0.08, 0.12, 0);

      // Detect book close (user closed the reader)
      const currentActive = activeBookIndexRef.current;
      if (lastActiveIndex !== null && currentActive == null && !currentTransition) {
        const idx = lastActiveIndex;
        const mesh = bookMeshes[idx];
        if (mesh) {
          mesh.visible = true;
          const targetCenterZ = camera.position.z - 1.75;
          mesh.position.set(-0.44, -0.03, targetCenterZ);
          mesh.rotation.set(0, -Math.PI / 2, 0);
          currentTransition = {
            type: "returning",
            index: idx,
            startTime: elapsedTime,
            duration: 0.65
          };
        }
      }
      lastActiveIndex = currentActive;

      // If transition just created by click handler, set startTime now
      if (currentTransition && currentTransition.startTime === null) {
        currentTransition.startTime = elapsedTime;
      }

      // Execute transition
      if (currentTransition && currentTransition.startTime !== null) {
        const elapsed = elapsedTime - currentTransition.startTime;
        const rawT = Math.min(Math.max(elapsed / currentTransition.duration, 0), 1);
        const idx = currentTransition.index;
        const mesh = bookMeshes[idx];

        if (mesh) {
          const targetCenterX = -0.44;
          const targetCenterY = -0.03;
          const targetCenterZ = camera.position.z - 1.75;
          const targetRotY    = -Math.PI / 2;

          if (currentTransition.type === "extracting") {
            const ease = rawT < 0.5
              ? 4 * rawT * rawT * rawT
              : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

            const pullZ = rawT < 0.35
              ? mesh.userData.baseZ + (rawT / 0.35) * 1.5
              : (mesh.userData.baseZ + 1.5) + ((rawT - 0.35) / 0.65) * (targetCenterZ - (mesh.userData.baseZ + 1.5));

            const liftY = mesh.userData.baseY + Math.sin(rawT * Math.PI) * 0.18 + (targetCenterY - mesh.userData.baseY) * ease;
            const moveX = mesh.userData.baseX + (targetCenterX - mesh.userData.baseX) * ease;
            const rotY  = targetRotY * ease;
            const rotX  = Math.sin(rawT * Math.PI) * 0.14;
            const rotZ  = -Math.sin(rawT * Math.PI) * 0.05;

            mesh.position.set(moveX, liftY, pullZ);
            mesh.rotation.set(rotX, rotY, rotZ);

            if (rawT >= 1) {
              mesh.visible = false;
              currentTransition = null;
              onSelectBookRef.current?.(idx);
            }
          } else if (currentTransition.type === "returning") {
            const returnEase = 1 - Math.pow(1 - rawT, 3);

            const moveX = targetCenterX + (mesh.userData.baseX - targetCenterX) * returnEase;
            const moveY = targetCenterY + (mesh.userData.baseY - targetCenterY) * returnEase
              + Math.sin((1 - rawT) * Math.PI) * 0.10;
            const moveZ = targetCenterZ + (mesh.userData.baseZ - targetCenterZ) * returnEase;
            const rotY  = targetRotY * (1 - returnEase);
            const rotX  = Math.sin((1 - rawT) * Math.PI) * 0.08;
            const rotZ  = mesh.userData.baseRotZ * returnEase + (-Math.sin((1 - rawT) * Math.PI) * 0.04) * (1 - returnEase);

            mesh.position.set(moveX, moveY, moveZ);
            mesh.rotation.set(rotX, rotY, rotZ);

            if (rawT >= 1) {
              mesh.position.set(mesh.userData.baseX, mesh.userData.baseY, mesh.userData.baseZ);
              mesh.rotation.set(0, 0, mesh.userData.baseRotZ);
              mesh.userData.targetZ    = mesh.userData.baseZ;
              mesh.userData.targetY    = mesh.userData.baseY;
              mesh.userData.targetRotX = 0;
              mesh.userData.targetRotY = 0;
              mesh.userData.targetRotZ = mesh.userData.baseRotZ;
              currentTransition = null;
            }
          }
        }
      }

      // ★ Hover detection — against static hitboxes only
      let activeHoverIdx = null;
      if (!currentTransition && activeBookIndexRef.current == null) {
        raycaster.setFromCamera(pointer, camera);
        // Also check if hovering the lamp bead or switch toggle for cursor
        const switchTargets = [beadMesh, switchToggle];
        const switchHit = raycaster.intersectObjects(switchTargets);
        const hitIntersects = raycaster.intersectObjects(hitboxMeshes);

        if (hitIntersects.length > 0) {
          activeHoverIdx = hitIntersects[0].object.userData.index;
        }

        // Update DOM cursor
        const isHoveringInteractable = switchHit.length > 0 || hitIntersects.length > 0;
        renderer.domElement.style.cursor = isHoveringInteractable ? "pointer" : "default";
      } else {
        renderer.domElement.style.cursor = "default";
      }

      // ★ Smooth Book Hover — no dark overlays, only lift + subtle tilt
      bookMeshes.forEach((mesh) => {
        if (currentTransition && mesh.userData.index === currentTransition.index) return;
        if (currentTransition || activeBookIndexRef.current != null) {
          // All books: gently return to rest
          mesh.position.z += (mesh.userData.baseZ - mesh.position.z) * 0.14;
          mesh.position.y += (mesh.userData.baseY - mesh.position.y) * 0.14;
          mesh.rotation.x += (0 - mesh.rotation.x) * 0.14;
          mesh.rotation.y += (0 - mesh.rotation.y) * 0.14;
          mesh.rotation.z += (mesh.userData.baseRotZ - mesh.rotation.z) * 0.14;
          return;
        }

        const isHovered = mesh.userData.index === activeHoverIdx;

        if (isHovered) {
          // Lift forward (z), slight up (y), gentle 3D tilt based on mouse position
          mesh.userData.targetZ = 0.34;
          mesh.userData.targetY = mesh.userData.baseY + 0.042;

          // Tilt relative to this book's x position (not global pointer)
          const bookScreenX = mesh.userData.baseX / 2.2;
          const tiltFactorY = (pointer.x - bookScreenX) * 0.08;
          const tiltFactorX = -(pointer.y) * 0.05;
          mesh.userData.targetRotY = tiltFactorY;
          mesh.userData.targetRotX = tiltFactorX;
          mesh.userData.targetRotZ = mesh.userData.baseRotZ;
        } else {
          mesh.userData.targetZ    = mesh.userData.baseZ;
          mesh.userData.targetY    = mesh.userData.baseY;
          mesh.userData.targetRotY = 0;
          mesh.userData.targetRotX = 0;
          mesh.userData.targetRotZ = mesh.userData.baseRotZ;
        }

        // Spring-damped lerp — smooth and natural
        const lerpFactor = 0.15;
        mesh.position.z  += (mesh.userData.targetZ    - mesh.position.z)  * lerpFactor;
        mesh.position.y  += (mesh.userData.targetY    - mesh.position.y)  * lerpFactor;
        mesh.rotation.x  += (mesh.userData.targetRotX - mesh.rotation.x)  * lerpFactor;
        mesh.rotation.y  += (mesh.userData.targetRotY - mesh.rotation.y)  * lerpFactor;
        mesh.rotation.z  += (mesh.userData.targetRotZ - mesh.rotation.z)  * lerpFactor;
      });

      // ─── Clock hands ────────────────────────────────────────────────────
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;

      hourHand.rotation.z = -hr  * ((Math.PI * 2) / 12);
      minHand.rotation.z  = -min * ((Math.PI * 2) / 60);
      secHand.rotation.z  = -sec * ((Math.PI * 2) / 60);

      // ─── Mobile gentle sway ─────────────────────────────────────────────
      mobileGroup.rotation.y = Math.sin(elapsedTime * 0.7)  * 0.14;
      mobileGroup.rotation.z = Math.cos(elapsedTime * 0.5)  * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 15. Responsive Resize ────────────────────────────────────────────
    const handleResize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;

      if (width < 640) {
        camera.fov = 50;
        camera.position.z = 6.4;
      } else if (width < 1024) {
        camera.fov = 42;
        camera.position.z = 5.2;
      } else {
        camera.fov = 37;
        camera.position.z = 4.45;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // ─── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      bookMeshes.forEach((m) => {
        m.geometry.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
        else m.material.dispose();
      });
      hitboxMeshes.forEach((h) => {
        h.geometry.dispose();
        h.material.dispose();
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run ONCE — no teardown on prop changes

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ cursor: "default" }}
    />
  );
}
