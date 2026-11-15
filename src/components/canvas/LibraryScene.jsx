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
    // Default neutral studio wall grey (before light on, matching reference image)
    scene.background = new THREE.Color("#4a4f56");

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
    renderer.toneMappingExposure = 1.18; // Crisp, clear exposure before light on
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ─── 2. Shared Textures & Materials ───────────────────────────────────
    const woodTexture = generateWoodTexture();
    const woodMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.65,
      metalness: 0.06,
      color: 0x362218
    });

    const pagesTexture = generatePagesTexture();
    const pagesMaterial = new THREE.MeshStandardMaterial({
      map: pagesTexture,
      roughness: 0.88,
      metalness: 0.02
    });

    // ─── 3. Natural Room Lighting (Balanced daylight before light on) ─────
    const ambientLight = new THREE.AmbientLight(0xdde8f5, 1.45);
    scene.add(ambientLight);

    // Window daylight coming from the left window
    const windowDaylight = new THREE.DirectionalLight(0xe8f2fc, 1.35);
    windowDaylight.position.set(-3.2, 1.6, 0.5);
    windowDaylight.target.position.set(0, 0, 0);
    scene.add(windowDaylight);
    scene.add(windowDaylight.target);

    // Subtle front room fill light to ensure all books & titles are readable
    const frontFillLight = new THREE.DirectionalLight(0xfff7ee, 0.45);
    frontFillLight.position.set(0.1, 0.5, 3.0);
    frontFillLight.target.position.set(0.1, 0, 0);
    scene.add(frontFillLight);
    scene.add(frontFillLight.target);

    // Warm ceiling lamp spotlight (toggled ON when light switch / cord is pulled)
    const lampX = 0.52;
    const lampY = 1.55;
    const lampZ = 0.52;

    const lampLight = new THREE.PointLight(0xffe2b0, 0.0, 6.0, 1.2);
    lampLight.position.set(lampX, lampY, lampZ);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 1024;
    lampLight.shadow.mapSize.height = 1024;
    lampLight.shadow.bias = -0.001;
    scene.add(lampLight);

    const lampSpot = new THREE.SpotLight(0xffe2b0, 0.0, 6.5, Math.PI / 2.8, 0.55, 1.2);
    lampSpot.position.set(lampX, lampY, lampZ);
    lampSpot.target.position.set(lampX, -0.35, 0);
    scene.add(lampSpot);
    scene.add(lampSpot.target);

    // ─── 4. Left Window (Clear Mountain Sky & Sill) ───────────────────────
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

    // ─── 6. Decorative Left & Right Resting Books (Matching Screenshot) ───
    const decorMatDark1 = new THREE.MeshStandardMaterial({ color: 0x1a2128, roughness: 0.75 });
    const decorMatDark2 = new THREE.MeshStandardMaterial({ color: 0x242220, roughness: 0.78 });
    const decorMatNavy  = new THREE.MeshStandardMaterial({ color: 0x1d293d, roughness: 0.72 });

    // Left book 1: Overshoot (standing straight against left wall)
    const overshootMesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.95, 0.52), decorMatDark1);
    overshootMesh.position.set(-1.98, -0.42 + 0.95 / 2 + 0.04, 0.0);
    overshootMesh.castShadow = true;
    shelfGroup.add(overshootMesh);

    // Left book 2: Friction (standing straight next to overshoot)
    const frictionMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.92, 0.51), decorMatDark2);
    frictionMesh.position.set(-1.83, -0.42 + 0.92 / 2 + 0.04, 0.0);
    frictionMesh.castShadow = true;
    shelfGroup.add(frictionMesh);

    // Right book: Light (leaning against right partition)
    const lightBookMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.96, 0.52), decorMatNavy);
    lightBookMesh.position.set(0.74, -0.42 + 0.96 / 2 + 0.04, 0.02);
    lightBookMesh.rotation.z = -0.16;
    lightBookMesh.castShadow = true;
    shelfGroup.add(lightBookMesh);

    // ─── 7. The 9 Interactive Developer Books ─────────────────────────────
    const bookMeshes = [];
    const hitboxMeshes = [];

    const bookWidth  = 0.192;
    const bookHeight = 0.94;
    const bookDepth  = 0.54;
    const bookGap    = 0.007; // Tight natural arrangement without gaps
    const startX     = -1.68; // Directly after Friction book

    // Soft individual organic tilts (subtle natural library lean)
    const naturalTilts = [
      0.00,   // 01 ABOUT ME
      0.015,  // 02 MY SKILLS
     -0.02,   // 03 EXPERIENCE
      0.00,   // 04 MY PROJECTS
      0.02,   // 05 MY JOURNEY
     -0.012,  // 06 HOBBIES
      0.008,  // 07 EDUCATION
      0.025,  // 08 RESUME
      0.00    // 09 CONTACT
    ];

    BOOKS_CATALOG.forEach((book, i) => {
      const spineTex = generateBookSpineTexture({
        index: book.index,
        title: book.title,
        subtitle: book.subtitle,
        bgColor: book.color,
        textColor: book.textColor
      });

      const coverTex = generateBookCoverTexture(book.color, book.title);

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

      const materials = [
        coverMat,     // right face (+X)
        spineMat,     // left face (-X)
        pagesMaterial,// top face (+Y)
        pagesMaterial,// bottom face (-Y)
        spineMat,     // front face (+Z: spine visible from viewer)
        coverMat      // back face (-Z)
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

      // Static invisible raycast hitbox
      const hitGeo = new THREE.BoxGeometry(bookWidth + 0.02, hVariation + 0.08, bookDepth * 1.4);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(posX, posY, posZ + 0.1);
      hitMesh.userData = { index: i };
      shelfGroup.add(hitMesh);
      hitboxMeshes.push(hitMesh);
    });

    // ─── 8. Hanging Light Pull String & Ivory Tip ("light tip end") ───────
    // Directly hanging from the shelf crown above the books (exact match to screenshot)
    const pullCordGroup = new THREE.Group();
    pullCordGroup.position.set(0.52, 1.38, 0.42);

    const cordLength = 0.36;
    const cordGeo = new THREE.CylinderGeometry(0.0018, 0.0018, cordLength, 8);
    // Wire is clean white with subtle luminescence matching user request
    const cordMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.20,
      metalness: 0.0,
      emissive: 0xffffff,
      emissiveIntensity: 0.16
    });
    const cordMesh = new THREE.Mesh(cordGeo, cordMat);
    cordMesh.position.y = -cordLength / 2;
    pullCordGroup.add(cordMesh);

    // Brass collar cap
    const capGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.012, 16);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4a246,
      metalness: 0.85,
      roughness: 0.22
    });
    const capMesh = new THREE.Mesh(capGeo, brassMat);
    capMesh.position.y = -cordLength;
    pullCordGroup.add(capMesh);

    // Conical white/ivory pull tassel / tip (the "light tip end")
    const tipGeo = new THREE.CylinderGeometry(0.007, 0.016, 0.048, 16);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.30,
      metalness: 0.04,
      emissive: 0xffffff,
      emissiveIntensity: 0.08
    });
    const tipMesh = new THREE.Mesh(tipGeo, tipMat);
    tipMesh.position.y = -cordLength - 0.025;
    pullCordGroup.add(tipMesh);

    // Bottom tip round bead
    const beadEndGeo = new THREE.SphereGeometry(0.0075, 16, 16);
    const beadEndMesh = new THREE.Mesh(beadEndGeo, tipMat);
    beadEndMesh.position.y = -cordLength - 0.049;
    pullCordGroup.add(beadEndMesh);

    // Large invisible hitbox mesh around the light cord & tip for interactive hover & swing
    const switchHitGeo = new THREE.BoxGeometry(0.36, 0.58, 0.36);
    const switchHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const switchHitMesh = new THREE.Mesh(switchHitGeo, switchHitMat);
    switchHitMesh.position.y = -cordLength / 2 - 0.04;
    switchHitMesh.userData = { isLampSwitch: true };
    pullCordGroup.add(switchHitMesh);

    scene.add(pullCordGroup);

    // ─── 9. Right Middle Shelf Accessories (Frame, Sphere & Stack) ────────
    const artTex = generateArtFrameTexture();
    const artFrameGeo = new THREE.BoxGeometry(0.38, 0.48, 0.03);
    const artFrameMat = [
      woodMaterial, woodMaterial, woodMaterial, woodMaterial,
      new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.38 }),
      woodMaterial
    ];
    const artMesh = new THREE.Mesh(artFrameGeo, artFrameMat);
    artMesh.position.set(1.36, -0.15, -0.08);
    artMesh.rotation.y = -0.12;
    artMesh.castShadow = true;
    shelfGroup.add(artMesh);

    // Smooth white marble sphere
    const sphereGeo = new THREE.SphereGeometry(0.09, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xf6f6f8,
      roughness: 0.18,
      metalness: 0.05
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(1.68, -0.32, 0.1);
    sphereMesh.castShadow = true;
    shelfGroup.add(sphereMesh);

    // Horizontal stack of 3 books with visible page sides
    const stackBookColors = ["#1a1917", "#322722", "#481c1c"];
    stackBookColors.forEach((col, idx) => {
      const sGeo = new THREE.BoxGeometry(0.48, 0.068, 0.38);
      const sMat = [
        pagesMaterial, // right face
        pagesMaterial, // left face
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.75 }), // top
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.75 }), // bottom
        pagesMaterial, // front face (+Z: white paper edges visible)
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.75 })  // back
      ];
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.position.set(1.72, -0.38 + idx * 0.072, -0.05);
      sMesh.rotation.y = (idx - 1) * 0.035;
      sMesh.castShadow = true;
      shelfGroup.add(sMesh);
    });

    // ─── 10. Top Shelf: Real-Time Clock, Vase & Branches ──────────────────
    const clockGroup = new THREE.Group();
    clockGroup.position.set(1.85, 1.75, -0.1);

    const clockTex = generateClockFaceTexture();
    const clockRimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 32);
    clockRimGeo.rotateX(Math.PI / 2);
    const clockMat = new THREE.MeshStandardMaterial({
      map: clockTex,
      roughness: 0.5,
      metalness: 0.15
    });
    const clockBody = new THREE.Mesh(clockRimGeo, clockMat);
    clockBody.castShadow = true;
    clockGroup.add(clockBody);

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

    const pivotGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.01, 16);
    pivotGeo.rotateX(Math.PI / 2);
    const pivotMesh = new THREE.Mesh(pivotGeo, new THREE.MeshBasicMaterial({ color: 0x1f1914 }));
    pivotMesh.position.z = 0.042;

    clockGroup.add(hourHand, minHand, secHand, pivotMesh);
    shelfGroup.add(clockGroup);

    // Ceramic vase with dried branches
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

    // Hanging kinetic mobile on top left
    const mobileGroup = new THREE.Group();
    mobileGroup.position.set(-0.35, 2.1, 0.2);

    const mobileWireMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    const mobileWire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.55), mobileWireMat);
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

    // ─── 11. Bottom Shelf Vintage Leather Books ────────────────────────────
    const leatherColors = [0x1e1915, 0x181e22, 0x261b14, 0x161c17, 0x241616, 0x1c1824];
    for (let b = 0; b < 18; b++) {
      const lbH = 0.72 + Math.sin(b * 1.8) * 0.06;
      const lbW = 0.14 + Math.cos(b * 2.1) * 0.03;
      const lbGeo = new THREE.BoxGeometry(lbW, lbH, 0.48);
      const lMat = [
        new THREE.MeshStandardMaterial({ color: leatherColors[b % leatherColors.length], roughness: 0.85 }),
        new THREE.MeshStandardMaterial({ color: leatherColors[b % leatherColors.length], roughness: 0.85 }),
        pagesMaterial, // White paper edge visible at the top!
        pagesMaterial,
        new THREE.MeshStandardMaterial({ color: leatherColors[b % leatherColors.length], roughness: 0.85 }),
        pagesMaterial
      ];
      const lbMesh = new THREE.Mesh(lbGeo, lMat);
      lbMesh.position.set(-1.8 + b * 0.175, -1.35 + lbH / 2 + 0.04, 0.0);
      lbMesh.rotation.z = Math.sin(b * 2.3) * 0.02;
      shelfGroup.add(lbMesh);
    }

    // ─── 12. High-Performance Raycasting & Pointer ─────────────────────────
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

    let currentTransition = null;
    let lastActiveIndex = null;
    let cordPullAnim = 0; // Tactile physical cord pull animation

    const handleClick = () => {
      if (currentTransition || (activeBookIndexRef.current != null)) return;

      raycaster.setFromCamera(pointer, camera);
      const allTargets = [...hitboxMeshes, switchHitMesh];
      const intersects = raycaster.intersectObjects(allTargets);

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object;
        if (clickedObj.userData.isLampSwitch) {
          cordPullAnim = 1.0; // Trigger physical pull spring
          onToggleLightRef.current?.();
        } else if (clickedObj.userData.index !== undefined) {
          const idx = clickedObj.userData.index;
          currentTransition = {
            type: "extracting",
            index: idx,
            startTime: null,
            duration: 0.72
          };
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick);

    // ─── 13. Animation Loop ───────────────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lighting lerp — Smooth transition between Daylight (OFF) and Warm Room (ON)
      const lit = isLightOnRef.current;
      const targetLampInt  = lit ? 4.5 : 0.0;
      const targetSpotInt  = lit ? 5.5 : 0.0;
      const targetAmbInt   = lit ? 1.55 : 1.45;
      const targetExposure = lit ? 1.25 : 1.18;
      const targetBg       = lit ? new THREE.Color("#211b17") : new THREE.Color("#4a4f56");
      const targetAmbColor = lit ? new THREE.Color("#fbeedc") : new THREE.Color("#dde8f5");

      lampLight.intensity  += (targetLampInt  - lampLight.intensity)  * 0.10;
      lampSpot.intensity   += (targetSpotInt  - lampSpot.intensity)   * 0.10;
      ambientLight.intensity += (targetAmbInt - ambientLight.intensity) * 0.10;
      ambientLight.color.lerp(targetAmbColor, 0.10);
      renderer.toneMappingExposure += (targetExposure - renderer.toneMappingExposure) * 0.10;
      scene.background.lerp(targetBg, 0.10);

      // Physical Cord Pull Spring Animation
      if (cordPullAnim > 0.001) {
        cordPullAnim *= 0.88;
        const pullOffset = Math.sin(cordPullAnim * Math.PI) * 0.035;
        pullCordGroup.position.y = 1.38 - pullOffset;
      } else {
        pullCordGroup.position.y = 1.38;
      }

      // Camera parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.055;
      camera.position.y += (targetCameraY - camera.position.y) * 0.055;
      camera.lookAt(0.08, 0.12, 0);

      // Detect book close
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

      if (currentTransition && currentTransition.startTime === null) {
        currentTransition.startTime = elapsedTime;
      }

      // Execute book extraction / return
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

      // Hover detection
      let activeHoverIdx = null;
      if (!currentTransition && activeBookIndexRef.current == null) {
        raycaster.setFromCamera(pointer, camera);
        const switchHit = raycaster.intersectObject(switchHitMesh);
        const hitIntersects = raycaster.intersectObjects(hitboxMeshes);

        if (hitIntersects.length > 0) {
          activeHoverIdx = hitIntersects[0].object.userData.index;
        }

        const isHoveringInteractable = switchHit.length > 0 || hitIntersects.length > 0;
        renderer.domElement.style.cursor = isHoveringInteractable ? "pointer" : "default";

        // Subtle glow / scale feedback on light tip when hovered
        if (switchHit.length > 0) {
          tipMat.emissive = new THREE.Color(0x332211);
        } else {
          tipMat.emissive = new THREE.Color(0x000000);
        }
      } else {
        renderer.domElement.style.cursor = "default";
      }

      // Smooth Book Hover (Preserving exact colors and readability)
      bookMeshes.forEach((mesh) => {
        if (currentTransition && mesh.userData.index === currentTransition.index) return;
        if (currentTransition || activeBookIndexRef.current != null) {
          mesh.position.z += (mesh.userData.baseZ - mesh.position.z) * 0.14;
          mesh.position.y += (mesh.userData.baseY - mesh.position.y) * 0.14;
          mesh.rotation.x += (0 - mesh.rotation.x) * 0.14;
          mesh.rotation.y += (0 - mesh.rotation.y) * 0.14;
          mesh.rotation.z += (mesh.userData.baseRotZ - mesh.rotation.z) * 0.14;
          return;
        }

        const isHovered = mesh.userData.index === activeHoverIdx;

        if (isHovered) {
          mesh.userData.targetZ = 0.34; // Lift forward
          mesh.userData.targetY = mesh.userData.baseY + 0.042; // Lift slightly up

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

        const lerpFactor = 0.15;
        mesh.position.z  += (mesh.userData.targetZ    - mesh.position.z)  * lerpFactor;
        mesh.position.y  += (mesh.userData.targetY    - mesh.position.y)  * lerpFactor;
        mesh.rotation.x  += (mesh.userData.targetRotX - mesh.rotation.x)  * lerpFactor;
        mesh.rotation.y  += (mesh.userData.targetRotY - mesh.rotation.y)  * lerpFactor;
        mesh.rotation.z  += (mesh.userData.targetRotZ - mesh.rotation.z)  * lerpFactor;
      });

      // Rotating Clock Hands in real-time
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;

      hourHand.rotation.z = -hr  * ((Math.PI * 2) / 12);
      minHand.rotation.z  = -min * ((Math.PI * 2) / 60);
      secHand.rotation.z  = -sec * ((Math.PI * 2) / 60);

      // Mobile sway
      mobileGroup.rotation.y = Math.sin(elapsedTime * 0.7)  * 0.14;
      mobileGroup.rotation.z = Math.cos(elapsedTime * 0.5)  * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 14. Responsive Resize ────────────────────────────────────────────
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
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ cursor: "default" }}
    />
  );
}
