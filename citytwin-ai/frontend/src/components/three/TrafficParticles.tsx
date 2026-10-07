'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 800;

// Seeded random for deterministic initial positions
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Particle {
  x: number;
  z: number;
  isHorizontal: boolean;
  speed: number;
  dir: number;
  colorIdx: number;
}

export default function TrafficParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const initialized = useRef(false);

  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    const rand = seededRandom(42);

    for (let i = 0; i < COUNT; i++) {
      const isHorizontal = rand() > 0.5;
      // Create a grid road layout
      const roadCoord = (Math.floor(rand() * 20) - 10) * 4;

      const x = isHorizontal ? (rand() - 0.5) * 90 : roadCoord;
      const z = isHorizontal ? roadCoord : (rand() - 0.5) * 90;

      const speed = 0.05 + rand() * 0.25;
      const dir = rand() > 0.5 ? 1 : -1;
      const colorIdx = speed < 0.12 ? 0 : speed < 0.2 ? 1 : 2;

      temp.push({ x, z, isHorizontal, speed, dir, colorIdx });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => [
    new THREE.Color('#ef4444'), // Red (slow)
    new THREE.Color('#f59e0b'), // Amber (medium)
    new THREE.Color('#06b6d4'), // Cyan (fast)
  ], []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Initialize colors on first frame
    if (!initialized.current) {
      for (let i = 0; i < COUNT; i++) {
        mesh.setColorAt(i, colors[particles[i].colorIdx]);
      }
      if (mesh.instanceColor) {
        mesh.instanceColor.needsUpdate = true;
      }
      initialized.current = true;
    }

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];

      // Move particle along its road
      if (p.isHorizontal) {
        p.x += p.speed * p.dir;
        if (p.x > 45) p.x = -45;
        if (p.x < -45) p.x = 45;
      } else {
        p.z += p.speed * p.dir;
        if (p.z > 45) p.z = -45;
        if (p.z < -45) p.z = 45;
      }

      dummy.position.set(p.x, 0.15, p.z);

      if (p.isHorizontal) {
        dummy.scale.set(0.5, 0.1, 0.25);
      } else {
        dummy.scale.set(0.25, 0.1, 0.5);
      }

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
