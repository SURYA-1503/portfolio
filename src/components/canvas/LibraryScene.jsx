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
  isLightOn = true,
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0f121b");

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
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Shared Textures & Materials
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

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x28324a, 1.5);
    scene.add(ambientLight);

    const lampX = 0.48;
    const lampY = 1.45;
    const lampZ = 0.58;

    const lampLight = new THREE.PointLight(0xffe2b0, 4.2, 6.0, 1.2);
    lampLight.position.set(lampX, lampY, lampZ);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 1024;
    lampLight.shadow.mapSize.height = 1024;
    lampLight.shadow.bias = -0.001;
    scene.add(lampLight);

    const lampSpot = new THREE.SpotLight(0xffe2b0, 5.2, 6.0, Math.PI / 3.0, 0.55, 1.2);
    lampSpot.position.set(lampX, lampY, lampZ);
    lampSpot.target.position.set(lampX, -0.35, 0);
    scene.add(lampSpot);
    scene.add(lampSpot.target);

    const windowMoonLight = new THREE.DirectionalLight(0xa5cbf5, 1.2);
    windowMoonLight.position.set(-3.2, 1.5, -0.2);
    windowMoonLight.target.position.set(0, 0, 0);
    scene.add(windowMoonLight);
    scene.add(windowMoonLight.target);

    const fillLight = new THREE.PointLight(0x5a3520, 0.8, 4.5);
    fillLight.position.set(0, -1.2, 1.2);
    scene.add(fillLight);

    // 4. Room Elements: Left Window (Night Sky, Moon & Mountains)
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

    // 5. Wooden Bookshelf Structure
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

    // 6. The 9 Interactive Books and Static Hitboxes
    const bookMeshes = [];
    const hitboxMeshes = [];
    const bookWidth = 0.195;
    const bookHeight = 0.94;
    const bookDepth = 0.54;
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
      const coverMat = new THREE.MeshStandardMaterial({
        map: coverTex,
        roughness: 0.70,
        metalness: 0.05
      });

      const spineMat = new THREE.MeshStandardMaterial({
        map: spineTex,
        roughness: 0.65,
        metalness: 0.06
      });

      const materials = [
        coverMat,
        coverMat,
        pagesMaterial,
        pagesMaterial,
        spineMat, // Front Spine
        pagesMaterial
      ];

      const hVariation = bookHeight + Math.sin(i * 1.7) * 0.035;
      const geo = new THREE.BoxGeometry(bookWidth, hVariation, bookDepth);
      const mesh = new THREE.Mesh(geo, materials);

      const posX = startX + i * (bookWidth + 0.026);
      const posY = -0.42 + hVariation / 2 + 0.04;
      const posZ = 0.0;

      mesh.position.set(posX, posY, posZ);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.userData = {
        index: i,
        bookData: book,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        targetY: posY,
        targetZ: posZ,
        targetRotX: 0,
        targetRotY: 0,
        targetRotZ: 0
      };

      shelfGroup.add(mesh);
      bookMeshes.push(mesh);

      // STATIC INVISIBLE RAYCAST HITBOX (Placed at the resting slot)
      // This completely eliminates hover jitter, oscillation, and edge-flickering!
      const hitGeo = new THREE.BoxGeometry(bookWidth + 0.024, hVariation + 0.08, bookDepth * 1.4);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(posX, posY, posZ + 0.1);
      hitMesh.userData = { index: i };
      shelfGroup.add(hitMesh);
      hitboxMeshes.push(hitMesh);
    });

    // 7. Right Side Middle Shelf Accessories
    const artTex = generateArtFrameTexture();
    const artFrameGeo = new THREE.BoxGeometry(0.38, 0.48, 0.03);
    const artFrameMat = [
      woodMaterial,
      woodMaterial,
      woodMaterial,
      woodMaterial,
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

    // 8. Top Shelf Accessories: Real-time Analog Clock & Ceramic Vase
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

    const handMat = new THREE.MeshBasicMaterial({ color: 0x1f1914 });
    const secMat = new THREE.MeshBasicMaterial({ color: 0xb91c1c });

    const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.11, 0.005), handMat);
    hourHand.position.z = 0.035;
    const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.16, 0.005), handMat);
    minHand.position.z = 0.037;
    const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.18, 0.005), secMat);
    secHand.position.z = 0.039;

    clockGroup.add(hourHand, minHand, secHand);
    shelfGroup.add(clockGroup);

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

    // 9. Ceiling Accessories: Hanging Lamp & Mobile
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

    const mobileGroup = new THREE.Group();
    mobileGroup.position.set(-0.35, 2.1, 0.2);

    const mobileWire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.55), lampCordMat);
    mobileWire1.rotation.z = Math.PI / 2;
    mobileGroup.add(mobileWire1);

    const discOrange = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.01, 24), new THREE.MeshBasicMaterial({ color: 0xe06642 }));
    discOrange.position.set(-0.25, -0.15, 0);
    discOrange.rotation.x = Math.PI / 2;

    const discWhite = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 24), new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }));
    discWhite.position.set(0.05, -0.22, 0);
    discWhite.rotation.x = Math.PI / 2;

    const discDark = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.01, 24), new THREE.MeshBasicMaterial({ color: 0x334155 }));
    discDark.position.set(0.24, -0.12, 0);
    discDark.rotation.x = Math.PI / 2;

    mobileGroup.add(discOrange, discWhite, discDark);
    scene.add(mobileGroup);

    // 10. Bottom Shelf Vintage Leather Books
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
      shelfGroup.add(lbMesh);
    }

    // 11. High-Performance Raycasting (Zero DOM recalculations!)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-100, -100);
    let targetCameraX = 0.08;
    let targetCameraY = 0.32;

    const handlePointerMove = (e) => {
      // Use cached width & height (ZERO getBoundingClientRect reflow!)
      pointer.x = (e.clientX / width) * 2 - 1;
      pointer.y = -(e.clientY / height) * 2 + 1;

      targetCameraX = 0.08 + pointer.x * 0.16;
      targetCameraY = 0.32 + pointer.y * 0.08;
    };

    let currentTransition = null;
    let lastActiveIndex = null;

    const handleClick = () => {
      // Don't register clicks if a book is already being extracted, returning, or open
      if (currentTransition || (activeBookIndexRef.current != null)) {
        return;
      }

      raycaster.setFromCamera(pointer, camera);
      const allTargets = [...hitboxMeshes, beadMesh];
      const intersects = raycaster.intersectObjects(allTargets);

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object;
        if (clickedObj.userData.isLampSwitch) {
          onToggleLightRef.current?.();
        } else if (clickedObj.userData.index !== undefined) {
          const idx = clickedObj.userData.index;
          // Realistic physical book extraction sequence
          currentTransition = {
            type: "extracting",
            index: idx,
            startTime: clock.getElapsedTime(),
            duration: 0.72
          };
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick);

    // 12. 60–120fps Animation Loop with Fluid Spring-Damped Lerp
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lighting Lerp
      const currentLightOn = isLightOnRef.current;
      const targetLampInt = currentLightOn ? 4.2 : 0.6;
      const targetSpotInt = currentLightOn ? 5.2 : 0.5;
      const targetAmbInt = currentLightOn ? 1.5 : 0.85;
      const targetExposure = currentLightOn ? 1.25 : 0.95;
      const targetBg = currentLightOn ? new THREE.Color("#0f121b") : new THREE.Color("#06070b");

      lampLight.intensity += (targetLampInt - lampLight.intensity) * 0.12;
      lampSpot.intensity += (targetSpotInt - lampSpot.intensity) * 0.12;
      ambientLight.intensity += (targetAmbInt - ambientLight.intensity) * 0.12;
      renderer.toneMappingExposure += (targetExposure - renderer.toneMappingExposure) * 0.12;
      scene.background.lerp(targetBg, 0.12);

      // Camera Parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.06;
      camera.position.y += (targetCameraY - camera.position.y) * 0.06;
      camera.lookAt(0.08, 0.12, 0);

      // Check if open book was closed by user
      const currentActive = activeBookIndexRef.current;
      if (lastActiveIndex !== null && (currentActive == null) && !currentTransition) {
        // Book was just closed! Play physical return back to cupboard slot
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
            startTime: clock.getElapsedTime(),
            duration: 0.65
          };
        }
      }
      lastActiveIndex = currentActive;

      // Handle ongoing physical extraction / return transition
      if (currentTransition) {
        const now = clock.getElapsedTime();
        const elapsed = now - currentTransition.startTime;
        const rawT = Math.min(Math.max(elapsed / currentTransition.duration, 0), 1);

        const idx = currentTransition.index;
        const mesh = bookMeshes[idx];

        if (mesh) {
          const targetCenterX = -0.44;
          const targetCenterY = -0.03;
          const targetCenterZ = camera.position.z - 1.75;
          const targetRotY = -Math.PI / 2;

          if (currentTransition.type === "extracting") {
            // Cubic ease-in-out
            const ease = rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

            // 1. Pull forward out of the cupboard shelf
            const pullZ = rawT < 0.35 
              ? mesh.userData.baseZ + (rawT / 0.35) * 1.5 
              : (mesh.userData.baseZ + 1.5) + ((rawT - 0.35) / 0.65) * (targetCenterZ - (mesh.userData.baseZ + 1.5));

            // 2. Lift up and glide to center
            const liftY = mesh.userData.baseY + Math.sin(rawT * Math.PI) * 0.16 + (targetCenterY - mesh.userData.baseY) * ease;
            const moveX = mesh.userData.baseX + (targetCenterX - mesh.userData.baseX) * ease;

            // 3. Rotate so front cover faces camera
            const rotY = targetRotY * ease;
            const rotX = Math.sin(rawT * Math.PI) * 0.14;
            const rotZ = -Math.sin(rawT * Math.PI) * 0.05;

            mesh.position.set(moveX, liftY, pullZ);
            mesh.rotation.set(rotX, rotY, rotZ);

            if (rawT >= 1) {
              mesh.visible = false;
              currentTransition = null;
              onSelectBookRef.current?.(idx);
            }
          } else if (currentTransition.type === "returning") {
            // Smooth cubic ease-out
            const returnEase = 1 - Math.pow(1 - rawT, 3);

            const moveX = targetCenterX + (mesh.userData.baseX - targetCenterX) * returnEase;
            const moveY = targetCenterY + (mesh.userData.baseY - targetCenterY) * returnEase + Math.sin((1 - rawT) * Math.PI) * 0.10;
            const moveZ = targetCenterZ + (mesh.userData.baseZ - targetCenterZ) * returnEase;
            const rotY = targetRotY * (1 - returnEase);
            const rotX = Math.sin((1 - rawT) * Math.PI) * 0.08;
            const rotZ = -Math.sin((1 - rawT) * Math.PI) * 0.04;

            mesh.position.set(moveX, moveY, moveZ);
            mesh.rotation.set(rotX, rotY, rotZ);

            if (rawT >= 1) {
              mesh.position.set(mesh.userData.baseX, mesh.userData.baseY, mesh.userData.baseZ);
              mesh.rotation.set(0, 0, 0);
              mesh.userData.targetZ = mesh.userData.baseZ;
              mesh.userData.targetY = mesh.userData.baseY;
              mesh.userData.targetRotX = 0;
              mesh.userData.targetRotY = 0;
              mesh.userData.targetRotZ = 0;
              currentTransition = null;
            }
          }
        }
      }

      // Raycast against STATIC HITBOXES (Only when no book is active or transitioning)
      let activeHoverIdx = null;
      if (!currentTransition && activeBookIndexRef.current === null) {
        raycaster.setFromCamera(pointer, camera);
        const hitIntersects = raycaster.intersectObjects(hitboxMeshes);
        if (hitIntersects.length > 0) {
          activeHoverIdx = hitIntersects[0].object.userData.index;
        }
      }

      // Smooth 3D Book Lift + Subtle Tilt
      bookMeshes.forEach((mesh) => {
        if (currentTransition && mesh.userData.index === currentTransition.index) {
          // Handled above in transition
          return;
        }

        if (currentTransition || activeBookIndexRef.current !== null) {
          // Keep all remaining books at their resting positions while reading or transitioning
          mesh.position.z += (mesh.userData.baseZ - mesh.position.z) * 0.16;
          mesh.position.y += (mesh.userData.baseY - mesh.position.y) * 0.16;
          mesh.rotation.x += (0 - mesh.rotation.x) * 0.16;
          mesh.rotation.y += (0 - mesh.rotation.y) * 0.16;
          mesh.rotation.z += (0 - mesh.rotation.z) * 0.16;
          return;
        }

        const isHovered = mesh.userData.index === activeHoverIdx;

        if (isHovered) {
          mesh.userData.targetZ = 0.36; // Lifts forward out of shelf
          mesh.userData.targetY = mesh.userData.baseY + 0.045; // Lifts slightly

          // Gentle continuous 3D tilt
          const tiltFactorX = (pointer.x - 0.08) * 0.10;
          const tiltFactorY = -(pointer.y - 0.20) * 0.06;
          mesh.userData.targetRotY = tiltFactorX;
          mesh.userData.targetRotX = tiltFactorY;
          mesh.userData.targetRotZ = -tiltFactorX * 0.3;
        } else {
          mesh.userData.targetZ = mesh.userData.baseZ;
          mesh.userData.targetY = mesh.userData.baseY;
          mesh.userData.targetRotY = 0;
          mesh.userData.targetRotX = 0;
          mesh.userData.targetRotZ = 0;
        }

        // Spring-like lerp interpolation (Natural, responsive, 120fps smooth!)
        mesh.position.z += (mesh.userData.targetZ - mesh.position.z) * 0.16;
        mesh.position.y += (mesh.userData.targetY - mesh.position.y) * 0.16;
        mesh.rotation.x += (mesh.userData.targetRotX - mesh.rotation.x) * 0.16;
        mesh.rotation.y += (mesh.userData.targetRotY - mesh.rotation.y) * 0.16;
        mesh.rotation.z += (mesh.userData.targetRotZ - mesh.rotation.z) * 0.16;
      });

      // Rotating Clock Hands in real-time
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      hourHand.rotation.z = -hr * ((Math.PI * 2) / 12);
      minHand.rotation.z = -min * ((Math.PI * 2) / 60);
      secHand.rotation.z = -sec * ((Math.PI * 2) / 60);

      // Mobile gentle sway
      mobileGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.14;
      mobileGroup.rotation.z = Math.cos(elapsedTime * 0.5) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Responsive Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;

      if (width < 768) {
        camera.position.z = 5.8;
      } else if (width < 1024) {
        camera.position.z = 5.0;
      } else {
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
  }, []); // Run ONCE on mount, NEVER tears down!

  return <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
}
