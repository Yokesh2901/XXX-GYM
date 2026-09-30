import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Real3DPhysiqueProps {
  /** Optional custom scroll progress (0 to 1). If not provided, tracks window scroll automatically */
  customProgress?: number;
  /** Whether user can click and drag to rotate 360 degrees */
  interactive?: boolean;
  /** Height or className override */
  className?: string;
  /** Show live stats overlay (muscle metrics, weight, etc.) */
  showStats?: boolean;
}

export const Real3DPhysique: React.FC<Real3DPhysiqueProps> = ({
  customProgress,
  interactive = true,
  className = 'w-full h-full',
  showStats = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);

  // Drag interaction states
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const dragRotationRef = useRef({ x: 0, y: 0 });
  const mouseScreenRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 8.2);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 2. Lighting System (Studio Athletic 3-Point Setup) ---
    // A. Ambient light for soft shadows
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    // B. Key Light (Crisp daylight from high-left)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // C. Fill Light (Warm bronze / amber from low-right)
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    // D. Rim Light (Intense Crimson Red #e11d48 from behind to silhouette muscle fibers)
    const rimLight = new THREE.DirectionalLight(0xe11d48, 4.0);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    // E. Secondary Rim Light (Cool cyan/white from right rear)
    const rimLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight2.position.set(4, 2, -4);
    scene.add(rimLight2);

    // F. Core Pulse Point Light (Heart/Solar Plexus power glow)
    const coreLight = new THREE.PointLight(0xe11d48, 1.5, 6);
    coreLight.position.set(0, 1.2, 0.6);
    scene.add(coreLight);

    // --- 3. Athletic Anatomy Materials ---
    // Realistic sculpted physique with competition-ready sheen & specular highlights
    const muscleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8a5542, // Rich athletic bronze / warm skin tone
      roughness: 0.32,
      metalness: 0.12,
      clearcoat: 0.65,
      clearcoatRoughness: 0.22,
      reflectivity: 0.6,
    });

    const deepTendonMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a3427, // Deeper shadow for abdominal inscriptions and pec cuts
      roughness: 0.55,
      metalness: 0.05,
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
      color: 0x784435,
      roughness: 0.4,
    });

    // --- 4. Building the Anatomical 3D Physique Hierarchy ---
    const athleteRoot = new THREE.Group();
    athleteRoot.position.y = -1.2;
    scene.add(athleteRoot);

    // Master Torso Group
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = 1.6;
    athleteRoot.add(torsoGroup);

    // Core Spine/Trunk Base
    const spineGeo = new THREE.CylinderGeometry(0.38, 0.32, 1.2, 24);
    const spine = new THREE.Mesh(spineGeo, muscleMaterial);
    spine.position.y = 0;
    torsoGroup.add(spine);

    // -------------------------------------------------------------
    // CHEST / PECTORALIS MAJOR (Left & Right Armor-Plate Pecs)
    // -------------------------------------------------------------
    const pecGroup = new THREE.Group();
    pecGroup.position.set(0, 0.42, 0.28);
    torsoGroup.add(pecGroup);

    // Rounded anatomical pec geometry using flattened capsules
    const pecGeo = new THREE.CapsuleGeometry(0.32, 0.36, 16, 24);
    
    // Left Pec
    const leftPec = new THREE.Mesh(pecGeo, muscleMaterial);
    leftPec.position.set(-0.35, 0, 0);
    leftPec.rotation.set(0.1, 0.18, -0.22);
    leftPec.scale.set(1, 0.85, 0.65);
    pecGroup.add(leftPec);

    // Right Pec
    const rightPec = new THREE.Mesh(pecGeo, muscleMaterial);
    rightPec.position.set(0.35, 0, 0);
    rightPec.rotation.set(0.1, -0.18, 0.22);
    rightPec.scale.set(1, 0.85, 0.65);
    pecGroup.add(rightPec);

    // Sternal cleft line
    const sternumGeo = new THREE.BoxGeometry(0.04, 0.7, 0.1);
    const sternum = new THREE.Mesh(sternumGeo, deepTendonMaterial);
    sternum.position.set(0, 0, 0.1);
    pecGroup.add(sternum);

    // -------------------------------------------------------------
    // 6-PACK RECTUS ABDOMINIS (3 Tiers of Sculpted Muscle Blocks)
    // -------------------------------------------------------------
    const absGroup = new THREE.Group();
    absGroup.position.set(0, -0.18, 0.3);
    torsoGroup.add(absGroup);

    const abGeo = new THREE.CapsuleGeometry(0.13, 0.12, 12, 16);
    const absMeshes: THREE.Mesh[] = [];

    // 3 tiers: Upper, Mid, Lower Abs
    const abTiers = [
      { y: 0.18, scaleX: 1.05, depth: 0.45 },
      { y: -0.06, scaleX: 1.0, depth: 0.48 },
      { y: -0.28, scaleX: 0.92, depth: 0.42 },
    ];

    abTiers.forEach((tier) => {
      // Left Ab
      const leftAb = new THREE.Mesh(abGeo, muscleMaterial);
      leftAb.position.set(-0.17, tier.y, 0);
      leftAb.rotation.set(0.12, 0.1, -0.05);
      leftAb.scale.set(tier.scaleX, 0.9, tier.depth);
      absGroup.add(leftAb);
      absMeshes.push(leftAb);

      // Right Ab
      const rightAb = new THREE.Mesh(abGeo, muscleMaterial);
      rightAb.position.set(0.17, tier.y, 0);
      rightAb.rotation.set(0.12, -0.1, 0.05);
      rightAb.scale.set(tier.scaleX, 0.9, tier.depth);
      absGroup.add(rightAb);
      absMeshes.push(rightAb);
    });

    // Vertical Linea Alba (Abdominal divide)
    const lineaAlbaGeo = new THREE.BoxGeometry(0.03, 0.75, 0.15);
    const lineaAlba = new THREE.Mesh(lineaAlbaGeo, deepTendonMaterial);
    lineaAlba.position.set(0, -0.06, 0.02);
    absGroup.add(lineaAlba);

    // -------------------------------------------------------------
    // LATS / LATISSIMUS DORSI (Iconic V-Taper Wings)
    // -------------------------------------------------------------
    const latsGroup = new THREE.Group();
    latsGroup.position.set(0, 0.25, -0.1);
    torsoGroup.add(latsGroup);

    const latWingGeo = new THREE.ConeGeometry(0.48, 1.25, 20);

    // Left Lat Wing
    const leftLat = new THREE.Mesh(latWingGeo, muscleMaterial);
    leftLat.position.set(-0.55, 0, 0);
    leftLat.rotation.set(0, 0, 0.48);
    leftLat.scale.set(0.85, 1, 0.45);
    latsGroup.add(leftLat);

    // Right Lat Wing
    const rightLat = new THREE.Mesh(latWingGeo, muscleMaterial);
    rightLat.position.set(0.55, 0, 0);
    rightLat.rotation.set(0, 0, -0.48);
    rightLat.scale.set(0.85, 1, 0.45);
    latsGroup.add(rightLat);

    // -------------------------------------------------------------
    // TRAPEZIUS (Neck to Shoulder Muscle Pyramids)
    // -------------------------------------------------------------
    const trapsGroup = new THREE.Group();
    trapsGroup.position.set(0, 0.85, -0.05);
    torsoGroup.add(trapsGroup);

    const trapGeo = new THREE.ConeGeometry(0.38, 0.65, 16);

    const leftTrap = new THREE.Mesh(trapGeo, muscleMaterial);
    leftTrap.position.set(-0.32, 0, 0);
    leftTrap.rotation.set(-0.15, 0, -0.35);
    leftTrap.scale.set(0.9, 1, 0.7);
    trapsGroup.add(leftTrap);

    const rightTrap = new THREE.Mesh(trapGeo, muscleMaterial);
    rightTrap.position.set(0.32, 0, 0);
    rightTrap.rotation.set(-0.15, 0, 0.35);
    rightTrap.scale.set(0.9, 1, 0.7);
    trapsGroup.add(rightTrap);

    // -------------------------------------------------------------
    // HEAD & NECK (Sculpted Jaw, Neck Muscles)
    // -------------------------------------------------------------
    const headNeckGroup = new THREE.Group();
    headNeckGroup.position.set(0, 1.05, 0.05);
    torsoGroup.add(headNeckGroup);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.42, 20);
    const neck = new THREE.Mesh(neckGeo, muscleMaterial);
    neck.position.set(0, 0.1, 0);
    headNeckGroup.add(neck);

    // Head / Cranium
    const headGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const head = new THREE.Mesh(headGeo, muscleMaterial);
    head.position.set(0, 0.52, 0.04);
    head.scale.set(0.82, 1.05, 0.9);
    headNeckGroup.add(head);

    // Jawline
    const jawGeo = new THREE.BoxGeometry(0.28, 0.22, 0.3);
    const jaw = new THREE.Mesh(jawGeo, muscleMaterial);
    jaw.position.set(0, 0.35, 0.12);
    jaw.rotation.set(0.3, 0, 0);
    headNeckGroup.add(jaw);

    // -------------------------------------------------------------
    // SHOULDERS / DELTOIDS (3D Cannonball Muscle Caps)
    // -------------------------------------------------------------
    const shouldersGroup = new THREE.Group();
    torsoGroup.add(shouldersGroup);

    const deltGeo = new THREE.SphereGeometry(0.36, 20, 20);

    // Left Deltoid
    const leftDelt = new THREE.Mesh(deltGeo, muscleMaterial);
    leftDelt.position.set(-0.85, 0.65, 0.05);
    leftDelt.scale.set(1, 0.9, 0.85);
    shouldersGroup.add(leftDelt);

    // Right Deltoid
    const rightDelt = new THREE.Mesh(deltGeo, muscleMaterial);
    rightDelt.position.set(0.85, 0.65, 0.05);
    rightDelt.scale.set(1, 0.9, 0.85);
    shouldersGroup.add(rightDelt);

    // -------------------------------------------------------------
    // ARMS: BICEPS, TRICEPS & FOREARMS
    // -------------------------------------------------------------
    const armsGroup = new THREE.Group();
    torsoGroup.add(armsGroup);

    // Left Arm Group
    const leftArm = new THREE.Group();
    leftArm.position.set(-0.95, 0.6, 0.05);
    armsGroup.add(leftArm);

    // Left Bicep (Spherical peak)
    const bicepGeo = new THREE.CapsuleGeometry(0.18, 0.42, 16, 20);
    const leftBicep = new THREE.Mesh(bicepGeo, muscleMaterial);
    leftBicep.position.set(-0.15, -0.32, 0.05);
    leftBicep.rotation.set(0.1, 0, -0.15);
    leftArm.add(leftBicep);

    // Left Tricep
    const leftTricep = new THREE.Mesh(bicepGeo, muscleMaterial);
    leftTricep.position.set(-0.12, -0.34, -0.1);
    leftTricep.rotation.set(-0.1, 0, -0.1);
    leftTricep.scale.set(0.9, 1.05, 0.9);
    leftArm.add(leftTricep);

    // Left Forearm
    const forearmGeo = new THREE.CylinderGeometry(0.14, 0.1, 0.55, 16);
    const leftForearm = new THREE.Mesh(forearmGeo, muscleMaterial);
    leftForearm.position.set(-0.25, -0.85, 0.1);
    leftForearm.rotation.set(0.35, 0, -0.2);
    leftArm.add(leftForearm);

    // Left Fist
    const fistGeo = new THREE.SphereGeometry(0.13, 14, 14);
    const leftFist = new THREE.Mesh(fistGeo, jointMaterial);
    leftFist.position.set(-0.35, -1.18, 0.22);
    leftArm.add(leftFist);

    // Right Arm Group
    const rightArm = new THREE.Group();
    rightArm.position.set(0.95, 0.6, 0.05);
    armsGroup.add(rightArm);

    // Right Bicep
    const rightBicep = new THREE.Mesh(bicepGeo, muscleMaterial);
    rightBicep.position.set(0.15, -0.32, 0.05);
    rightBicep.rotation.set(0.1, 0, 0.15);
    rightArm.add(rightBicep);

    // Right Tricep
    const rightTricep = new THREE.Mesh(bicepGeo, muscleMaterial);
    rightTricep.position.set(0.12, -0.34, -0.1);
    rightTricep.rotation.set(-0.1, 0, 0.1);
    rightTricep.scale.set(0.9, 1.05, 0.9);
    rightArm.add(rightTricep);

    // Right Forearm
    const rightForearm = new THREE.Mesh(forearmGeo, muscleMaterial);
    rightForearm.position.set(0.25, -0.85, 0.1);
    rightForearm.rotation.set(0.35, 0, 0.2);
    rightArm.add(rightForearm);

    // Right Fist
    const rightFist = new THREE.Mesh(fistGeo, jointMaterial);
    rightFist.position.set(0.35, -1.18, 0.22);
    rightArm.add(rightFist);

    // -------------------------------------------------------------
    // LOWER BODY: GLUTES, QUADS & CALVES
    // -------------------------------------------------------------
    const lowerBodyGroup = new THREE.Group();
    lowerBodyGroup.position.set(0, 0.8, 0);
    athleteRoot.add(lowerBodyGroup);

    // Pelvis
    const pelvisGeo = new THREE.CylinderGeometry(0.36, 0.3, 0.45, 20);
    const pelvis = new THREE.Mesh(pelvisGeo, muscleMaterial);
    pelvis.position.set(0, 0.1, 0);
    lowerBodyGroup.add(pelvis);

    // Quads
    const quadGeo = new THREE.CapsuleGeometry(0.22, 0.8, 16, 20);

    // Left Quad
    const leftQuad = new THREE.Mesh(quadGeo, muscleMaterial);
    leftQuad.position.set(-0.35, -0.65, 0.05);
    leftQuad.rotation.set(0.08, 0, 0.08);
    lowerBodyGroup.add(leftQuad);

    // Right Quad
    const rightQuad = new THREE.Mesh(quadGeo, muscleMaterial);
    rightQuad.position.set(0.35, -0.65, 0.05);
    rightQuad.rotation.set(0.08, 0, -0.08);
    lowerBodyGroup.add(rightQuad);

    // Calves
    const calfGeo = new THREE.CapsuleGeometry(0.16, 0.75, 14, 16);

    // Left Calf
    const leftCalf = new THREE.Mesh(calfGeo, muscleMaterial);
    leftCalf.position.set(-0.38, -1.6, -0.02);
    lowerBodyGroup.add(leftCalf);

    // Right Calf
    const rightCalf = new THREE.Mesh(calfGeo, muscleMaterial);
    rightCalf.position.set(0.38, -1.6, -0.02);
    lowerBodyGroup.add(rightCalf);

    // -------------------------------------------------------------
    // 5. SWIRLING ENERGY EMBERS & PARTICLES (Beast Aura)
    // -------------------------------------------------------------
    const emberCount = 90;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 3.5;
      emberPositions[i * 3 + 1] = Math.random() * 4.5 - 1.5;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: Math.random() * 0.015 + 0.008,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xe11d48,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const emberParticles = new THREE.Points(emberGeo, emberMat);
    athleteRoot.add(emberParticles);

    // --- 6. Interaction Handlers (Mouse Drag & Cursor Tracking) ---
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Track normalized cursor coordinates (-1 to 1) for head & torso eye contact
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseScreenRef.current = { x: nx, y: ny };

      // Free 360 drag rotation
      if (isDraggingRef.current && interactive) {
        const deltaX = clientX - prevMouseRef.current.x;
        const deltaY = clientY - prevMouseRef.current.y;
        dragRotationRef.current.y += deltaX * 0.008;
        dragRotationRef.current.x += deltaY * 0.005;
        // Limit pitch
        dragRotationRef.current.x = Math.max(-0.4, Math.min(0.4, dragRotationRef.current.x));
        prevMouseRef.current = { x: clientX, y: clientY };
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // --- 7. Window Resize Listener ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- 8. Animation & Render Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let currentMorphValue = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Determine active scroll progress (0 to 1)
      let targetProgress = 0;
      if (customProgress !== undefined) {
        targetProgress = customProgress;
      } else {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      }

      // Smooth lerp for buttery progressive hypertrophy transition
      currentMorphValue = THREE.MathUtils.lerp(currentMorphValue, targetProgress, 0.06);
      setInternalProgress(currentMorphValue);

      // -------------------------------------------------------------
      // 1. ALIVE BEHAVIOR: Rhythmic Respiration (Natural Breathing)
      // -------------------------------------------------------------
      const breath = Math.sin(elapsedTime * 2.2) * 0.032;
      const breathChest = Math.sin(elapsedTime * 2.2 + 0.3) * 0.055;

      // -------------------------------------------------------------
      // 2. HYPERTROPHY MORPHING (Skinny -> Muscular Beast)
      // -------------------------------------------------------------
      const p = currentMorphValue;

      // A. Chest Hypertrophy (armor plate expansion & protrusion)
      const pecScaleX = THREE.MathUtils.lerp(0.72, 1.42, p);
      const pecScaleY = THREE.MathUtils.lerp(0.75, 1.35, p);
      const pecDepth = THREE.MathUtils.lerp(0.55, 1.55, p) + breathChest;
      leftPec.scale.set(pecScaleX, pecScaleY, pecDepth);
      rightPec.scale.set(pecScaleX, pecScaleY, pecDepth);

      // B. 6-Pack Abs Definition & Protrusion
      const abDepth = THREE.MathUtils.lerp(0.25, 1.25, p);
      const abScale = THREE.MathUtils.lerp(0.8, 1.28, p);
      absMeshes.forEach((ab) => {
        ab.scale.z = abDepth;
        ab.scale.x = abScale;
      });

      // C. Lats V-Taper Wings (Outward Cobra Spread)
      const latWidth = THREE.MathUtils.lerp(0.58, 1.82, p) + breath * 0.4;
      leftLat.scale.x = latWidth;
      rightLat.scale.x = latWidth;
      leftLat.position.x = -0.45 - p * 0.25;
      rightLat.position.x = 0.45 + p * 0.25;

      // D. Traps (Shoulder to Neck Pyramids)
      const trapHeight = THREE.MathUtils.lerp(0.65, 1.68, p) + breath * 0.3;
      const trapWidth = THREE.MathUtils.lerp(0.75, 1.42, p);
      leftTrap.scale.set(trapWidth, trapHeight, trapWidth);
      rightTrap.scale.set(trapWidth, trapHeight, trapWidth);
      trapsGroup.position.y = 0.82 + p * 0.12;

      // E. Shoulders / Cannonball Deltoids
      const deltScale = THREE.MathUtils.lerp(0.72, 1.58, p);
      leftDelt.scale.set(deltScale, deltScale * 0.95, deltScale);
      rightDelt.scale.set(deltScale, deltScale * 0.95, deltScale);
      leftDelt.position.x = -0.75 - p * 0.32;
      rightDelt.position.x = 0.75 + p * 0.32;

      // F. Arms: Biceps & Triceps Swell
      const armBulk = THREE.MathUtils.lerp(0.74, 1.48, p);
      leftBicep.scale.set(armBulk, armBulk, armBulk * 1.15);
      rightBicep.scale.set(armBulk, armBulk, armBulk * 1.15);
      leftTricep.scale.set(armBulk * 0.9, armBulk, armBulk);
      rightTricep.scale.set(armBulk * 0.9, armBulk, armBulk);
      leftForearm.scale.set(armBulk * 0.9, 1, armBulk * 0.9);
      rightForearm.scale.set(armBulk * 0.9, 1, armBulk * 0.9);

      leftArm.position.x = -0.85 - p * 0.32;
      rightArm.position.x = 0.85 + p * 0.32;

      // G. Quads & Calves Thickening
      const legBulk = THREE.MathUtils.lerp(0.8, 1.38, p);
      leftQuad.scale.set(legBulk, 1, legBulk);
      rightQuad.scale.set(legBulk, 1, legBulk);
      leftCalf.scale.set(legBulk * 0.9, 1, legBulk * 0.9);
      rightCalf.scale.set(legBulk * 0.9, 1, legBulk * 0.9);

      // -------------------------------------------------------------
      // 3. DYNAMIC POSE & CAMERA CHOREOGRAPHY
      // -------------------------------------------------------------
      // Section-based natural body angles:
      // - Hero: Front relaxed aesthetic
      // - Middle: Slight quarter turn / side-flex
      // - Footer: Aggressive Most-Muscular front power pose
      const sectionPoseAngle = Math.sin(p * Math.PI) * 0.35;
      const baseRotationY = sectionPoseAngle + dragRotationRef.current.y;
      const baseRotationX = dragRotationRef.current.x;

      // Cursor Eye & Torso Tracking (Alive Parallax)
      const mouseInfluenceX = mouseScreenRef.current.x * 0.22;
      const mouseInfluenceY = mouseScreenRef.current.y * 0.12;

      athleteRoot.rotation.y = THREE.MathUtils.lerp(
        athleteRoot.rotation.y,
        baseRotationY + mouseInfluenceX,
        0.08
      );
      athleteRoot.rotation.x = THREE.MathUtils.lerp(
        athleteRoot.rotation.x,
        baseRotationX - mouseInfluenceY,
        0.08
      );

      // Head subtly leads the gaze towards mouse
      headNeckGroup.rotation.y = mouseScreenRef.current.x * 0.35;
      headNeckGroup.rotation.x = -mouseScreenRef.current.y * 0.2;

      // -------------------------------------------------------------
      // 4. LIGHTING & PARTICLE INTENSITY EVOLUTION
      // -------------------------------------------------------------
      rimLight.intensity = THREE.MathUtils.lerp(3.0, 7.5, p);
      coreLight.intensity = THREE.MathUtils.lerp(0.8, 3.2, p) + breath * 4;
      emberMat.opacity = THREE.MathUtils.lerp(0.2, 0.85, p);
      emberMat.size = THREE.MathUtils.lerp(0.06, 0.11, p);

      // Embers rising upward
      const positions = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        const vel = emberVelocities[i];
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y * (1 + p * 1.5);
        positions[i * 3 + 2] += vel.z;

        // Reset if top reached
        if (positions[i * 3 + 1] > 3.5) {
          positions[i * 3 + 1] = -1.2;
          positions[i * 3] = (Math.random() - 0.5) * 3.0;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [customProgress, interactive]);

  // Derived stats for optional overlay
  const weight = Math.round(56 + internalProgress * 22);
  const muscleMass = Math.round(14 + internalProgress * 38);
  const stageName =
    internalProgress < 0.25
      ? 'Day 1: Skinny Baseline'
      : internalProgress < 0.55
      ? 'Month 3: Athletic Foundation'
      : internalProgress < 0.82
      ? 'Month 6: Hypertrophy'
      : '1 Year+: XXX Ripped Beast';

  return (
    <div className={`relative ${className} select-none`}>
      {/* Three.js Canvas Container (100% transparent, no boxes, no cards) */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
      />

      {/* Optional Stats Minimal Overlay */}
      {showStats && (
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-display font-bold uppercase tracking-wider text-[11px]">
              {stageName}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-md font-mono font-bold text-slate-800">
            <span>
              <strong className="text-rose-600">{weight}</strong> kg
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Muscle: <strong className="text-emerald-600">+{muscleMass}%</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
