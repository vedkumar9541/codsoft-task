'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function RootPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-4 border-t-[var(--accent-cyan)] border-r-transparent border-b-[var(--accent-blue)] border-l-transparent animate-spin mx-auto mb-6"></div>
        <h1 className="text-2xl font-black neon-text mb-2">CityTwin AI</h1>
        <p className="text-[var(--text-secondary)] text-sm tracking-widest uppercase">Initializing Core Systems...</p>
      </div>
    </div>
  );
}
