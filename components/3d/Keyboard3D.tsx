"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TacticalAudio } from "@/lib/utils";

interface KeyDef {
  code: string;
  label: string;
  width?: number;
  isModifier?: boolean;
}

const KEYBOARD_ROWS: KeyDef[][] = [
  // Row 0
  [
    { code: "Escape", label: "ESC", width: 1.1, isModifier: true },
    { code: "Digit1", label: "1" },
    { code: "Digit2", label: "2" },
    { code: "Digit3", label: "3" },
    { code: "Digit4", label: "4" },
    { code: "Digit5", label: "5" },
    { code: "Digit6", label: "6" },
    { code: "Digit7", label: "7" },
    { code: "Digit8", label: "8" },
    { code: "Digit9", label: "9" },
    { code: "Digit0", label: "0" },
    { code: "Minus", label: "-" },
    { code: "Equal", label: "=" },
    { code: "Backspace", label: "BACK", width: 1.6, isModifier: true },
  ],
  // Row 1
  [
    { code: "Tab", label: "TAB", width: 1.4, isModifier: true },
    { code: "KeyQ", label: "Q" },
    { code: "KeyW", label: "W" },
    { code: "KeyE", label: "E" },
    { code: "KeyR", label: "R" },
    { code: "KeyT", label: "T" },
    { code: "KeyY", label: "Y" },
    { code: "KeyU", label: "U" },
    { code: "KeyI", label: "I" },
    { code: "KeyO", label: "O" },
    { code: "KeyP", label: "P" },
    { code: "BracketLeft", label: "[" },
    { code: "BracketRight", label: "]" },
    { code: "Backslash", label: "\\", width: 1.3, isModifier: true },
  ],
  // Row 2
  [
    { code: "CapsLock", label: "CAPS", width: 1.6, isModifier: true },
    { code: "KeyA", label: "A" },
    { code: "KeyS", label: "S" },
    { code: "KeyD", label: "D" },
    { code: "KeyF", label: "F" },
    { code: "KeyG", label: "G" },
    { code: "KeyH", label: "H" },
    { code: "KeyJ", label: "J" },
    { code: "KeyK", label: "K" },
    { code: "KeyL", label: "L" },
    { code: "Semicolon", label: ";" },
    { code: "Quote", label: "'" },
    { code: "Enter", label: "ENTER", width: 2.1, isModifier: true },
  ],
  // Row 3
  [
    { code: "ShiftLeft", label: "SHIFT", width: 2.1, isModifier: true },
    { code: "KeyZ", label: "Z" },
    { code: "KeyX", label: "X" },
    { code: "KeyC", label: "C" },
    { code: "KeyV", label: "V" },
    { code: "KeyB", label: "B" },
    { code: "KeyN", label: "N" },
    { code: "KeyM", label: "M" },
    { code: "Comma", label: "," },
    { code: "Period", label: "." },
    { code: "Slash", label: "/" },
    { code: "ShiftRight", label: "SHIFT", width: 1.5, isModifier: true },
    { code: "ArrowUp", label: "▲", width: 1.0, isModifier: true },
  ],
  // Row 4
  [
    { code: "ControlLeft", label: "CTRL", width: 1.3, isModifier: true },
    { code: "MetaLeft", label: "DEVIL", width: 1.2, isModifier: true },
    { code: "AltLeft", label: "ALT", width: 1.2, isModifier: true },
    { code: "Space", label: "SPACE // NEMESIS", width: 5.4, isModifier: true },
    { code: "AltRight", label: "ALT", width: 1.2, isModifier: true },
    { code: "ArrowLeft", label: "◄", width: 1.0, isModifier: true },
    { code: "ArrowDown", label: "▼", width: 1.0, isModifier: true },
    { code: "ArrowRight", label: "►", width: 1.0, isModifier: true },
  ],
];

// Generates dynamic canvas texture with keycap label
function createKeycapTexture(label: string, isModifier: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = isModifier ? "#FF5500" : "#F4F4F6";
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = isModifier ? "#FFFFFF" : "#121215";
  ctx.font = label.length > 5 ? "bold 28px monospace" : "bold 44px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function Keyboard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("SPACE");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 9.5, 9.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.3;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minAzimuthAngle = -Math.PI / 6;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 12, 6);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const accentLight1 = new THREE.PointLight(0xff5500, 1.2, 12);
    accentLight1.position.set(-6, 3, -2);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xff8800, 1.2, 12);
    accentLight2.position.set(6, 3, -2);
    scene.add(accentLight2);

    const keyboardGroup = new THREE.Group();
    keyboardGroup.rotation.x = 0.22;
    scene.add(keyboardGroup);

    // 3. Keyboard Chassis (Matte Black Frame)
    const chassisGeo = new THREE.BoxGeometry(16.5, 0.75, 5.9);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x121215,
      roughness: 0.7,
      metalness: 0.2,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.set(0, -0.15, 0.05);
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    keyboardGroup.add(chassisMesh);

    // Top Plate
    const plateGeo = new THREE.BoxGeometry(15.8, 0.1, 5.4);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c22,
      roughness: 0.4,
      metalness: 0.5,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0, 0.15, 0.05);
    keyboardGroup.add(plateMesh);

    // 4. Build Keys & Point Lights
    const keyMap = new Map<
      string,
      {
        mesh: THREE.Mesh;
        light: THREE.PointLight;
        baseY: number;
        targetY: number;
        currentY: number;
        isModifier: boolean;
      }
    >();

    const rowSpacing = 1.05;
    const keyGap = 0.08;

    KEYBOARD_ROWS.forEach((row, rowIndex) => {
      let totalWidth = 0;
      row.forEach((k) => {
        totalWidth += (k.width || 0.92) + keyGap;
      });

      let currentX = -totalWidth / 2;
      const zPos = (rowIndex - 2) * rowSpacing;

      row.forEach((def) => {
        const w = def.width || 0.92;
        const xPos = currentX + w / 2;
        currentX += w + keyGap;

        // Keycap geometry
        const keyGeo = new THREE.BoxGeometry(w, 0.42, 0.92);
        const texture = createKeycapTexture(def.label, !!def.isModifier);

        // Materials: Top face has label texture
        const materials = [
          new THREE.MeshStandardMaterial({ color: def.isModifier ? 0xff5500 : 0xf4f4f6, roughness: 0.4 }),
          new THREE.MeshStandardMaterial({ color: def.isModifier ? 0xff5500 : 0xf4f4f6, roughness: 0.4 }),
          new THREE.MeshStandardMaterial({
            map: texture || undefined,
            color: def.isModifier ? 0xff5500 : 0xf4f4f6,
            roughness: 0.35,
          }),
          new THREE.MeshStandardMaterial({ color: def.isModifier ? 0xff5500 : 0xf4f4f6 }),
          new THREE.MeshStandardMaterial({ color: def.isModifier ? 0xff5500 : 0xf4f4f6, roughness: 0.4 }),
          new THREE.MeshStandardMaterial({ color: def.isModifier ? 0xff5500 : 0xf4f4f6, roughness: 0.4 }),
        ];

        const keyMesh = new THREE.Mesh(keyGeo, materials);
        keyMesh.position.set(xPos, 0.35, zPos);
        keyMesh.castShadow = true;
        keyMesh.receiveShadow = true;
        keyMesh.userData = { code: def.code, label: def.label };
        keyboardGroup.add(keyMesh);

        // Under-key Orange LED point light
        const led = new THREE.PointLight(0xff5500, 0, 1.8);
        led.position.set(xPos, 0.1, zPos);
        keyboardGroup.add(led);

        keyMap.set(def.code.toLowerCase(), {
          mesh: keyMesh,
          light: led,
          baseY: 0.35,
          targetY: 0.35,
          currentY: 0.35,
          isModifier: !!def.isModifier,
        });
      });
    });

    // 5. Press and Release Handlers
    const pressKey = (code: string, label?: string) => {
      const lower = code.toLowerCase();
      let entry = keyMap.get(lower);
      if (!entry) {
        // Fallback search
        for (const [k, v] of keyMap.entries()) {
          if (lower.includes(k) || k.includes(lower)) {
            entry = v;
            break;
          }
        }
      }

      if (entry) {
        entry.targetY = entry.baseY - 0.15; // Animate down y: -0.15
        entry.light.intensity = 3.8; // Orange LED flash underneath
        setLastKeyPressed(label || code);
      }
    };

    const releaseKey = (code: string) => {
      const lower = code.toLowerCase();
      let entry = keyMap.get(lower);
      if (!entry) {
        for (const [k, v] of keyMap.entries()) {
          if (lower.includes(k) || k.includes(lower)) {
            entry = v;
            break;
          }
        }
      }

      if (entry) {
        entry.targetY = entry.baseY; // Spring back up
        entry.light.intensity = 0;
      }
    };

    // 6. Event Listeners: Physical Keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      pressKey(e.code, e.key.toUpperCase());
      TacticalAudio.playKeyClick("down");
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      releaseKey(e.code);
      TacticalAudio.playKeyClick("up");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 7. Raycasting for 3D Click Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(keyboardGroup.children, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData && hit.userData.code) {
          pressKey(hit.userData.code, hit.userData.label);
          TacticalAudio.playKeyClick("down");

          setTimeout(() => {
            releaseKey(hit.userData.code);
            TacticalAudio.playKeyClick("up");
          }, 150);
        }
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth interpolation for pressed keys
      keyMap.forEach((entry) => {
        entry.currentY = THREE.MathUtils.lerp(entry.currentY, entry.targetY, 0.35);
        entry.mesh.position.y = entry.currentY;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[380px] rounded-xl border border-[#282830] bg-[#0E0E10]/95 backdrop-blur-md overflow-hidden group"
    >
      {/* HUD Info Header */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono pointer-events-none select-none">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-tactical-orange animate-pulse" />
          <span className="text-text-primary font-bold">
            TACTICAL 3D MECHANICAL KEYBOARD
          </span>
          <span className="text-text-secondary hidden sm:inline">
            // PHYSICAL KEY SYNC ACTIVE
          </span>
        </div>
        <div className="px-2 py-0.5 rounded bg-surface border border-[#282830] text-tactical-orange">
          LAST_KEY: <span className="font-bold text-glow-orange">{lastKeyPressed}</span>
        </div>
      </div>

      {/* Subtext instruction */}
      <div className="absolute bottom-2 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-text-secondary pointer-events-none select-none">
        <span>Click 3D keys or type on your physical keyboard to actuate</span>
        <span className="hidden sm:inline">Orbit drag enabled</span>
      </div>
    </div>
  );
}
