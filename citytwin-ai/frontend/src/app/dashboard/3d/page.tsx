'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';

// Must dynamically import Three.js components to avoid SSR errors
const CityScene = dynamic(() => import('@/components/three/CityScene'), { ssr: false });

function LoadingScreen() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: '#020408' }}>
      <div style={{
        width: 60, height: 60,
        border: '2px solid rgba(6,182,212,0.2)',
        borderTopColor: '#06b6d4',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p style={{ color: '#06b6d4', fontFamily: 'monospace', fontSize: 14, letterSpacing: 2 }}>
        INITIALIZING 3D ENGINE{dots}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: '#020408' }}>
      <p style={{ color: '#f43f5e', fontFamily: 'monospace', fontSize: 14 }}>
        ⚠ WebGL not supported or 3D engine failed to load
      </p>
      <p style={{ color: '#64748b', fontFamily: 'monospace', fontSize: 12 }}>
        Please use a modern browser with GPU acceleration enabled
      </p>
    </div>
  );
}

export default function ThreeDPage() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <ErrorFallback />
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#020408' }}>
      {/* HUD Overlay */}
      <div style={{
        position: 'absolute', top: 24, left: 24, zIndex: 10,
        background: 'rgba(2,4,8,0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: 12,
        padding: '16px 20px',
        pointerEvents: 'none',
        minWidth: 200,
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#06b6d4', margin: 0, letterSpacing: 1 }}>
          3D DIGITAL TWIN
        </h2>
        <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0' }}>
          Delhi Central District — Live View
        </p>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['Renderer', 'WebGL 2.0', '#10b981'],
            ['Buildings', '~200', '#06b6d4'],
            ['Traffic Entities', '~800', '#f59e0b'],
            ['Mode', 'Real-time', '#8b5cf6'],
          ].map(([label, value, color]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'monospace' }}>
              <span style={{ color: '#475569' }}>{label}</span>
              <span style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls hint */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', gap: 16,
        background: 'rgba(2,4,8,0.6)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(6,182,212,0.15)',
        borderRadius: 8,
        padding: '8px 16px',
        pointerEvents: 'none',
      }}>
        {[
          ['🖱️ Left Drag', 'Orbit'],
          ['🖱️ Right Drag', 'Pan'],
          ['🔲 Scroll', 'Zoom'],
        ].map(([key, action]) => (
          <span key={key} style={{ fontSize: 11, fontFamily: 'monospace', color: '#475569' }}>
            <span style={{ color: '#06b6d4' }}>{key}</span> {action}
          </span>
        ))}
      </div>

      <Suspense fallback={<LoadingScreen />}>
        <CityScene />
      </Suspense>
    </div>
  );
}
