import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // --- 3D Kinetic Geometric Wave Mesh ---
    // A clean, high-end undulating 3D wave plane representing iron strength & kinetic energy
    const cols = 55;
    const rows = 35;
    const count = cols * rows;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Color gradient from subtle rose/red to warm gold & slate
    const colorRose = new THREE.Color(0xe11d48);
    const colorGold = new THREE.Color(0xf59e0b);
    const colorSlate = new THREE.Color(0x94a3b8);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const index = (i * rows + j) * 3;
        positions[index] = (i - cols / 2) * 1.2; // x
        positions[index + 1] = 0; // y (wave)
        positions[index + 2] = (j - rows / 2) * 1.2; // z

        // Color blend
        const t = (i / cols + j / rows) * 0.5;
        const c = colorSlate.clone().lerp(t > 0.5 ? colorRose : colorGold, 0.45);
        colors[index] = c.r;
        colors[index + 1] = c.g;
        colors[index + 2] = c.b;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.y = -6;
    particles.rotation.x = 0.4;
    scene.add(particles);

    // --- Subtle Connecting Wireframe Lines for 3D Kinetic Grid ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xcbd5e1,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeGrid = new THREE.GridHelper(50, 40, 0xe11d48, 0xe2e8f0);
    wireframeGrid.position.y = -7;
    wireframeGrid.rotation.x = 0.2;
    wireframeGrid.material.transparent = true;
    (wireframeGrid.material as THREE.Material).opacity = 0.2;
    scene.add(wireframeGrid);

    // --- Scroll & Mouse Tracking ---
    let scrollY = window.scrollY;
    let targetCameraY = 5;
    let targetCameraRot = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      targetCameraY = 5 - progress * 8;
      targetCameraRot = progress * 0.3;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth camera interpolation based on scroll and mouse
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraY + mouseY * 0.6, 0.05);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2.5, 0.05);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetCameraRot, 0.05);
      camera.lookAt(0, -1, 0);

      // Animate 3D Wave Grid
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = (i * rows + j) * 3;
          const x = posArray[index];
          const z = posArray[index + 2];
          
          // Double sine wave with ripple
          const wave = Math.sin(x * 0.25 + time * 0.8) * Math.cos(z * 0.25 + time * 0.7) * 1.4;
          posArray[index + 1] = wave;
        }
      }
      posAttr.needsUpdate = true;

      // Rotate subtle grid helper
      wireframeGrid.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
};
