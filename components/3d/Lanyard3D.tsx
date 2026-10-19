"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TacticalAudio } from "@/lib/utils";

// Generates high-res tactical ID badge canvas texture
function createBadgeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background
  ctx.fillStyle = "#121216";
  ctx.fillRect(0, 0, 512, 768);

  // Top header stripe
  ctx.fillStyle = "#FF5500";
  ctx.fillRect(0, 0, 512, 54);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";
  ctx.fillText("RAW // TOP SECRET CLEARANCE", 256, 36);

  // Hologram Photo / Insignia Box
  ctx.fillStyle = "#1B1B22";
  ctx.fillRect(156, 90, 200, 200);
  ctx.strokeStyle = "#FF5500";
  ctx.lineWidth = 3;
  ctx.strokeRect(156, 90, 200, 200);

  // Hologram Emblem (Skull / Tactical Shield)
  ctx.fillStyle = "#FF5500";
  ctx.font = "80px sans-serif";
  ctx.fillText("☠", 256, 210);

  ctx.fillStyle = "#FFAA33";
  ctx.font = "bold 14px monospace";
  ctx.fillText("[HOLOGRAPHIC VERIFIED]", 256, 268);

  // Codename
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 28px monospace";
  ctx.fillText("CODENAME: NEMESIS", 256, 340);

  // Operative Name
  ctx.fillStyle = "#FF5500";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText("DHANUSH GURUDU", 256, 395);

  // Clearance Level
  ctx.fillStyle = "#FFAA33";
  ctx.font = "bold 22px monospace";
  ctx.fillText("CLEARANCE: LEVEL 5", 256, 445);

  // Department & Division
  ctx.fillStyle = "#8E8E98";
  ctx.font = "16px monospace";
  ctx.fillText("NFSU CS & CYBER SECURITY", 256, 485);
  ctx.fillText("ACADEMIC CGPA: 8.36 / 10", 256, 512);

  // Barcode
  ctx.fillStyle = "#EDEDEF";
  ctx.font = "40px monospace";
  ctx.fillText("||||||| | |||| | |||||| || | ||||", 256, 610);

  // Footer Serial
  ctx.fillStyle = "#555562";
  ctx.font = "14px monospace";
  ctx.fillText("SERIAL: RAW-IND-2024-NEMESIS-007", 256, 660);

  return new THREE.CanvasTexture(canvas);
}

export default function Lanyard3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff5500, 1.8, 8);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Anchor Ring
    const ringGeo = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x888894, metalness: 0.9, roughness: 0.2 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 2.2, 0);
    scene.add(ringMesh);

    // Lanyard Strap (Bezier curve line)
    const strapPoints = [
      new THREE.Vector3(0, 2.2, 0),
      new THREE.Vector3(0, 1.0, 0),
      new THREE.Vector3(0, -0.6, 0),
    ];
    const strapCurve = new THREE.QuadraticBezierCurve3(strapPoints[0], strapPoints[1], strapPoints[2]);
    const strapGeo = new THREE.BufferGeometry().setFromPoints(strapCurve.getPoints(24));
    const strapMat = new THREE.LineBasicMaterial({ color: 0xff5500, linewidth: 3 });
    const strapLine = new THREE.Line(strapGeo, strapMat);
    scene.add(strapLine);

    // Badge Group
    const badgeGroup = new THREE.Group();
    badgeGroup.position.set(0, -0.6, 0);
    scene.add(badgeGroup);

    // Metal Clip
    const clipGeo = new THREE.BoxGeometry(0.2, 0.35, 0.08);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0xc4c4cc, metalness: 0.85, roughness: 0.25 });
    const clipMesh = new THREE.Mesh(clipGeo, clipMat);
    clipMesh.position.set(0, 1.85, 0);
    badgeGroup.add(clipMesh);

    // Plastic Sleeve
    const sleeveGeo = new THREE.BoxGeometry(2.5, 3.8, 0.08);
    const sleeveMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.5,
      opacity: 0.85,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    badgeGroup.add(sleeveMesh);

    // Badge Card with Texture
    const badgeTexture = createBadgeTexture();
    const cardGeo = new THREE.BoxGeometry(2.35, 3.65, 0.05);
    const cardMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x141418 }),
      new THREE.MeshStandardMaterial({ color: 0x141418 }),
      new THREE.MeshStandardMaterial({ color: 0x141418 }),
      new THREE.MeshStandardMaterial({ color: 0x141418 }),
      new THREE.MeshStandardMaterial({
        map: badgeTexture || undefined,
        roughness: 0.3,
        metalness: 0.2,
      }),
      new THREE.MeshStandardMaterial({ color: 0x141418 }),
    ];
    const cardMesh = new THREE.Mesh(cardGeo, cardMaterials);
    cardMesh.position.set(0, 0, 0.02);
    badgeGroup.add(cardMesh);

    // Interactive Pendulum Physics & Dragging
    let isDragging = false;
    const pos = new THREE.Vector3(0, -0.6, 0);
    const vel = new THREE.Vector3(0, 0, 0);
    const targetPos = new THREE.Vector3(0, -0.6, 0);
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(badgeGroup.children, true);
      if (intersects.length > 0) {
        isDragging = true;
        TacticalAudio.playTerminalBeep(750, 0.04);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(dragPlane, intersection);
      if (intersection) {
        targetPos.set(
          THREE.MathUtils.clamp(intersection.x, -2.5, 2.5),
          THREE.MathUtils.clamp(intersection.y, -2.5, 0.8),
          0
        );
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false;
        TacticalAudio.playRadarPing();
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (!isDragging) {
        // Pendulum tension
        const pivot = new THREE.Vector3(0, 2.2, 0);
        const toPivot = new THREE.Vector3().subVectors(pos, pivot);
        const ropeLength = 2.8;

        vel.y -= 9.8 * delta;
        const currentDist = toPivot.length();
        const diff = currentDist - ropeLength;
        toPivot.normalize();
        vel.addScaledVector(toPivot, -diff * 40 * delta);

        vel.multiplyScalar(0.965);
        vel.x += Math.sin(time * 1.5) * 0.15 * delta;

        pos.addScaledVector(vel, delta);

        const targetRotZ = -vel.x * 0.25;
        const targetRotX = vel.y * 0.15;
        const targetRotY = Math.sin(time) * 0.1;

        badgeGroup.rotation.z = THREE.MathUtils.lerp(badgeGroup.rotation.z, targetRotZ, 0.15);
        badgeGroup.rotation.x = THREE.MathUtils.lerp(badgeGroup.rotation.x, targetRotX, 0.15);
        badgeGroup.rotation.y = THREE.MathUtils.lerp(badgeGroup.rotation.y, targetRotY, 0.15);
      } else {
        pos.lerp(targetPos, 0.4);
        badgeGroup.rotation.z = (targetPos.x - pos.x) * 0.8;
        badgeGroup.rotation.x = (pos.y - targetPos.y) * 0.8;
      }

      badgeGroup.position.copy(pos);

      // Update strap line geometry
      const p1 = new THREE.Vector3(0, 2.2, 0);
      const p3 = new THREE.Vector3(pos.x, pos.y + 1.85, pos.z);
      const p2 = new THREE.Vector3((p1.x + p3.x) / 2, (p1.y + p3.y) / 2 - 0.2, (p1.z + p3.z) / 2);
      const updatedCurve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
      strapLine.geometry.setFromPoints(updatedCurve.getPoints(24));

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
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
      className="relative w-full h-[450px] sm:h-[550px] rounded-xl border border-[#282830] bg-[#0E0E10]/95 backdrop-blur-md overflow-hidden flex flex-col justify-between p-4 shadow-2xl group"
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between text-xs font-mono text-text-secondary z-10 pointer-events-none select-none">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-tactical-orange animate-ping" />
          <span className="text-tactical-orange font-bold uppercase tracking-wider">
            RAW OPERATIVE 3D LANYARD BADGE
          </span>
        </div>
        <span className="text-[10px] text-text-secondary">
          DRAG TO SWING // RAPID PHYSICS
        </span>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary z-10 border-t border-[#282830] pt-2 pointer-events-none select-none">
        <span>SECURITY AUTH: LEVEL 5 TOP SECRET</span>
        <span className="text-tactical-orange font-bold">CLICK & DRAG BADGE</span>
      </div>
    </div>
  );
}
