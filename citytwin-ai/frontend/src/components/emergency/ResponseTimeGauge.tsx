'use client';

import { motion } from 'framer-motion';

export default function ResponseTimeGauge() {
  const value = 7.2; // mins
  const max = 15;
  const target = 8;
  
  const percentage = Math.min(value / max, 1);
  const targetPercentage = target / max;
  
  const color = value <= target ? 'var(--accent-emerald)' : value <= 12 ? 'var(--accent-amber)' : 'var(--accent-rose)';

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {/* Background track */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-tertiary)" strokeWidth="8" />
        
        {/* Value arc */}
        <motion.circle
          initial={{ strokeDasharray: "0 251.2" }}
          animate={{ strokeDasharray: `${percentage * 251.2} 251.2` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />

        {/* Target indicator */}
        <circle 
          cx="50" 
          cy="10" 
          r="2" 
          fill="white" 
          style={{ transform: `rotate(${targetPercentage * 360}deg)`, transformOrigin: '50px 50px' }} 
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black" style={{ color }}>{value}</span>
        <span className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase">Mins</span>
      </div>
    </div>
  );
}
