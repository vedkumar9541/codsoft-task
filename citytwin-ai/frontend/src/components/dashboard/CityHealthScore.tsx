'use client';

import { motion } from 'framer-motion';

export default function CityHealthScore() {
  const score = 78;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 40) return 'var(--accent-rose)';
    if (s < 70) return 'var(--accent-amber)';
    return 'var(--accent-emerald)';
  };

  const color = getColor(score);

  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-cyan)] opacity-10 blur-[50px] rounded-full"></div>
      
      <h3 className="font-semibold text-[var(--text-secondary)] mb-4 w-full text-left">City Health Index</h3>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="45"
            stroke="var(--bg-tertiary)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="96"
            cy="96"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              filter: `drop-shadow(0 0 6px ${color})`
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color }}>{score}</span>
          <span className="text-xs text-[var(--text-secondary)] font-medium">/ 100</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--border-color)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Traffic</div>
          <div className="font-bold text-[var(--accent-emerald)]">82/100</div>
        </div>
        <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--border-color)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Air Quality</div>
          <div className="font-bold text-[var(--accent-amber)]">64/100</div>
        </div>
        <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--border-color)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Safety</div>
          <div className="font-bold text-[var(--accent-emerald)]">88/100</div>
        </div>
        <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--border-color)]">
          <div className="text-xs text-[var(--text-secondary)] mb-1">Infra</div>
          <div className="font-bold text-[var(--accent-emerald)]">78/100</div>
        </div>
      </div>
    </div>
  );
}
