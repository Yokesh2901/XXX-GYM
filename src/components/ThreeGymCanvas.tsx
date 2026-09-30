import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeGymCanvasProps {
  className?: string;
}

export const ThreeGymCanvas: React.FC<ThreeGymCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera & Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    // Fiery crimson rim light
    const crimsonLight = new THREE.PointLight(0xe11d48, 3.5, 25);
    crimsonLight.position.set(-6, -3, 3);
    scene.add(crimsonLight);

    // Warm gold accent light
    const goldLight = new THREE.PointLight(0xf59e0b, 3.0, 25);
    goldLight.position.set(6, 4, 2);
    scene.add(goldLight);

    // --- Materials ---
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x22262d,
      metalness: 0.85,
      roughness: 0.25,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.85,
      roughness: 0.25,
    });

    const redMetallicMaterial = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      metalness: 0.8,
      roughness: 0.3,
    });

    const redWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const goldWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    // Helper: Create Olympic Weight Plate (with center hub and lip)
    const createWeightPlate = (radius: number, thickness: number, mat: THREE.Material) => {
      const plateGroup = new THREE.Group();

      // Main Outer Disc (Torus for smooth rounded rim)
      const outerRimGeo = new THREE.TorusGeometry(radius, thickness * 0.45, 16, 48);
      const outerRim = new THREE.Mesh(outerRimGeo, mat);
      plateGroup.add(outerRim);

      // Inner Plate Body (cylinder)
      const innerBodyGeo = new THREE.CylinderGeometry(radius, radius, thickness * 0.4, 48);
      innerBodyGeo.rotateX(Math.PI / 2);
      const innerBody = new THREE.Mesh(innerBodyGeo, mat);
      plateGroup.add(innerBody);

      // Center Olympic Hole ring
      const centerHoleGeo = new THREE.TorusGeometry(radius * 0.22, thickness * 0.25, 16, 32);
      const centerHole = new THREE.Mesh(centerHoleGeo, chromeMaterial);
      plateGroup.add(centerHole);

      return plateGroup;
    };

    // Helper: Create 3D Hex Dumbbell
    const createDumbbell = () => {
      const dumbbellGroup = new THREE.Group();

      // Handle (Knurled Chrome Grip)
      const handleGeo = new THREE.CylinderGeometry(0.065, 0.065, 1.3, 24);
      const handle = new THREE.Mesh(handleGeo, chromeMaterial);
      dumbbellGroup.add(handle);

      // Hexagonal Head 1
      const headGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.38, 6);
      const head1 = new THREE.Mesh(headGeo, steelMaterial);
      head1.position.y = 0.65;
      dumbbellGroup.add(head1);

      // Red accent stripe on head 1
      const stripeGeo = new THREE.TorusGeometry(0.35, 0.025, 12, 6);
      stripeGeo.rotateX(Math.PI / 2);
      const stripe1 = new THREE.Mesh(stripeGeo, redMetallicMaterial);
      stripe1.position.y = 0.65;
      dumbbellGroup.add(stripe1);

      // Hexagonal Head 2
      const head2 = new THREE.Mesh(headGeo, steelMaterial);
      head2.position.y = -0.65;
      dumbbellGroup.add(head2);

      const stripe2 = new THREE.Mesh(stripeGeo, redMetallicMaterial);
      stripe2.position.y = -0.65;
      dumbbellGroup.add(stripe2);

      return dumbbellGroup;
    };

    // --- Floating Object Registry ---
    interface FloatingItem {
      mesh: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      floatSpeed: number;
      floatAmplitude: number;
      phase: number;
    }

    const floatingItems: FloatingItem[] = [];

    // 1. Large Olympic Weight Plate (Right side)
    const plate1 = createWeightPlate(1.2, 0.3, steelMaterial);
    plate1.position.set(3.2, 0.5, -0.5);
    scene.add(plate1);
    floatingItems.push({
      mesh: plate1,
      baseX: 3.2,
      baseY: 0.5,
      baseZ: -0.5,
      rotSpeedX: 0.005,
      rotSpeedY: 0.008,
      rotSpeedZ: 0.004,
      floatSpeed: 0.9,
      floatAmplitude: 0.25,
      phase: 0,
    });

    // 2. Medium 3D Hex Dumbbell (Right bottom / center)
    const dumbbell1 = createDumbbell();
    dumbbell1.position.set(2.4, -1.8, 0.8);
    dumbbell1.rotation.set(0.4, 0.6, 0.8);
    scene.add(dumbbell1);
    floatingItems.push({
      mesh: dumbbell1,
      baseX: 2.4,
      baseY: -1.8,
      baseZ: 0.8,
      rotSpeedX: 0.007,
      rotSpeedY: 0.009,
      rotSpeedZ: 0.006,
      floatSpeed: 1.1,
      floatAmplitude: 0.22,
      phase: 1.2,
    });

    // 3. Second Smaller Dumbbell (Left side)
    const dumbbell2 = createDumbbell();
    dumbbell2.scale.set(0.7, 0.7, 0.7);
    dumbbell2.position.set(-3.5, -1.2, -1.0);
    dumbbell2.rotation.set(-0.5, 0.3, -0.7);
    scene.add(dumbbell2);
    floatingItems.push({
      mesh: dumbbell2,
      baseX: -3.5,
      baseY: -1.2,
      baseZ: -1.0,
      rotSpeedX: 0.006,
      rotSpeedY: -0.007,
      rotSpeedZ: 0.005,
      floatSpeed: 0.8,
      floatAmplitude: 0.18,
      phase: 2.1,
    });

    // 4. Smaller Gold Accent Weight Plate (Upper Right)
    const plate2 = createWeightPlate(0.75, 0.2, goldMaterial);
    plate2.position.set(3.8, 2.2, -1.2);
    scene.add(plate2);
    floatingItems.push({
      mesh: plate2,
      baseX: 3.8,
      baseY: 2.2,
      baseZ: -1.2,
      rotSpeedX: -0.006,
      rotSpeedY: 0.01,
      rotSpeedZ: 0.005,
      floatSpeed: 1.3,
      floatAmplitude: 0.16,
      phase: 3.5,
    });

    // 5. Metallic Torus Wireframe 1 (Crimson Red Wireframe)
    const torusGeo1 = new THREE.TorusGeometry(1.6, 0.035, 16, 48);
    const torus1 = new THREE.Mesh(torusGeo1, redWireframeMaterial);
    torus1.position.set(1.5, 1.8, -1.5);
    scene.add(torus1);
    floatingItems.push({
      mesh: torus1,
      baseX: 1.5,
      baseY: 1.8,
      baseZ: -1.5,
      rotSpeedX: 0.008,
      rotSpeedY: 0.005,
      rotSpeedZ: -0.004,
      floatSpeed: 0.7,
      floatAmplitude: 0.2,
      phase: 4.0,
    });

    // 6. Metallic Torus Wireframe 2 (Gold Wireframe Orbiting)
    const torusGeo2 = new THREE.TorusGeometry(2.1, 0.03, 16, 64);
    const torus2 = new THREE.Mesh(torusGeo2, goldWireframeMaterial);
    torus2.position.set(-2.2, 1.4, -2.0);
    scene.add(torus2);
    floatingItems.push({
      mesh: torus2,
      baseX: -2.2,
      baseY: 1.4,
      baseZ: -2.0,
      rotSpeedX: -0.004,
      rotSpeedY: -0.007,
      rotSpeedZ: 0.006,
      floatSpeed: 0.6,
      floatAmplitude: 0.24,
      phase: 1.8,
    });

    // 7. Chrome Metallic Torus Ring (Floating foreground)
    const torusGeo3 = new THREE.TorusGeometry(0.9, 0.045, 16, 48);
    const torus3 = new THREE.Mesh(torusGeo3, chromeMaterial);
    torus3.position.set(-3.2, 1.8, 0.2);
    scene.add(torus3);
    floatingItems.push({
      mesh: torus3,
      baseX: -3.2,
      baseY: 1.8,
      baseZ: 0.2,
      rotSpeedX: 0.01,
      rotSpeedY: 0.006,
      rotSpeedZ: 0.008,
      floatSpeed: 1.0,
      floatAmplitude: 0.15,
      phase: 2.8,
    });

    // 8. Geometric Iron Octahedron Gems
    const octaGeo = new THREE.OctahedronGeometry(0.4, 0);
    const octa1 = new THREE.Mesh(octaGeo, steelMaterial);
    octa1.position.set(0.5, -2.2, 0.5);
    scene.add(octa1);
    floatingItems.push({
      mesh: octa1,
      baseX: 0.5,
      baseY: -2.2,
      baseZ: 0.5,
      rotSpeedX: 0.012,
      rotSpeedY: 0.015,
      rotSpeedZ: 0.01,
      floatSpeed: 1.2,
      floatAmplitude: 0.18,
      phase: 0.5,
    });

    const octa2 = new THREE.Mesh(octaGeo, redMetallicMaterial);
    octa2.scale.set(0.65, 0.65, 0.65);
    octa2.position.set(-1.8, -2.5, -0.5);
    scene.add(octa2);
    floatingItems.push({
      mesh: octa2,
      baseX: -1.8,
      baseY: -2.5,
      baseZ: -0.5,
      rotSpeedX: -0.01,
      rotSpeedY: -0.012,
      rotSpeedZ: 0.014,
      floatSpeed: 1.4,
      floatAmplitude: 0.15,
      phase: 3.1,
    });

    // --- Interactive Mouse / Parallax Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const { innerWidth, innerHeight } = window;
        mouseX = (e.touches[0].clientX / innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation based on cursor position
      targetX = THREE.MathUtils.lerp(targetX, mouseX * 0.8, 0.05);
      targetY = THREE.MathUtils.lerp(targetY, -mouseY * 0.6, 0.05);

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Animate floating items
      floatingItems.forEach((item) => {
        // Continuous rotation
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        // Floating sine wave motion
        const floatOffset = Math.sin(elapsedTime * item.floatSpeed + item.phase) * item.floatAmplitude;
        item.mesh.position.y = item.baseY + floatOffset;

        // Interactive subtle response to cursor
        item.mesh.position.x = item.baseX + targetX * 0.25;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
