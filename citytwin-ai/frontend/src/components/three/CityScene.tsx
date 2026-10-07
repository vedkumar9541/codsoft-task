'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import BuildingMesh from './BuildingMesh';
import TrafficParticles from './TrafficParticles';

function CityContent() {
  return (
    <>
      <color attach="background" args={['#020408']} />

      <fog attach="fog" args={['#020408', 50, 160]} />

      {/* Lighting — futuristic cyan/purple */}
      <ambientLight intensity={0.15} color="#94a3b8" />
      <directionalLight position={[15, 25, 10]} intensity={0.4} color="#06b6d4" />
      <directionalLight position={[-15, 15, -10]} intensity={0.25} color="#8b5cf6" />
      <pointLight position={[0, 30, 0]} intensity={0.8} color="#06b6d4" distance={80} decay={2} />
      <pointLight position={[20, 5, -20]} intensity={0.3} color="#f43f5e" distance={40} decay={2} />
      <pointLight position={[-25, 5, 15]} intensity={0.3} color="#8b5cf6" distance={40} decay={2} />

      {/* Stars in background */}
      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0.5} fade speed={0.5} />

      {/* Cyber Grid floor */}
      <Grid
        infiniteGrid
        fadeDistance={100}
        fadeStrength={1.5}
        sectionColor="#06b6d4"
        sectionThickness={1}
        sectionSize={8}
        cellColor="#0a1628"
        cellThickness={0.4}
        cellSize={2}
        position={[0, -0.05, 0]}
      />

      {/* Ground plane for subtle reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#030712"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Buildings — procedurally generated city blocks */}
      <group>
        {Array.from({ length: 200 }).map((_, i) => (
          <BuildingMesh key={`bldg-${i}`} id={i} />
        ))}
      </group>

      {/* Road grid lines */}
      {Array.from({ length: 21 }).map((_, i) => {
        const pos = (i - 10) * 4;
        return (
          <group key={`road-${i}`}>
            {/* Horizontal road */}
            <mesh position={[0, 0.01, pos]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[90, 0.8]} />
              <meshBasicMaterial color="#0a1628" transparent opacity={0.6} />
            </mesh>
            {/* Vertical road */}
            <mesh position={[pos, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.8, 90]} />
              <meshBasicMaterial color="#0a1628" transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* Traffic Flow Particles */}
      <TrafficParticles />

      <OrbitControls
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={15}
        maxDistance={120}
        target={[0, 2, 0]}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function CityScene() {
  return (
    <Canvas
      camera={{ position: [55, 35, 55], fov: 45, near: 0.1, far: 300 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <CityContent />
      </Suspense>
    </Canvas>
  );
}
