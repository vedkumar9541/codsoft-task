'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Seeded pseudo-random for deterministic building generation
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function BuildingMesh({ id }: { id: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { position, scale, color, emissiveColor, emissiveIntensity } = useMemo(() => {
    const rand = seededRandom(id * 7919 + 1);

    // Cluster taller buildings near center
    const radius = rand() * 45;
    const angle = rand() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const distFromCenter = Math.sqrt(x * x + z * z);

    // Central zone has taller buildings (CBD area)
    let h = 2 + rand() * 4;
    if (distFromCenter < 12) {
      h += rand() * 18; // Skyscrapers in center
    } else if (distFromCenter < 25) {
      h += rand() * 8; // Mid-rise
    }

    const w = 0.8 + rand() * 2.2;
    const d = 0.8 + rand() * 2.2;

    // Sci-fi color scheme
    const r = rand();
    let col = '#0c1425';
    let emissive = '#000000';
    let intensity = 0;

    if (r > 0.92) {
      // Special glowing buildings (cyan)
      col = '#0a1628';
      emissive = '#06b6d4';
      intensity = 0.6;
    } else if (r > 0.85) {
      // Purple accent
      col = '#0e0f20';
      emissive = '#8b5cf6';
      intensity = 0.4;
    } else if (r > 0.78) {
      // Warm amber windows
      col = '#0f1520';
      emissive = '#f59e0b';
      intensity = 0.2;
    } else {
      col = '#0c1425';
      emissive = '#1e3a5f';
      intensity = 0.08;
    }

    return {
      position: [x, h / 2, z] as [number, number, number],
      scale: [w, h, d] as [number, number, number],
      color: col,
      emissiveColor: emissive,
      emissiveIntensity: intensity,
    };
  }, [id]);

  // Subtle floating animation for special buildings
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + id * 0.3) * 0.03;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={0.15}
        metalness={0.9}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}
