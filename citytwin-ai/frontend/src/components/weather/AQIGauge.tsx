'use client';

import { motion } from 'framer-motion';

export default function AQIGauge() {
  const value = 142; // USG
  const max = 300;
  
  // Semi-circle gauge logic
  const percentage = Math.min(value / max, 1);
  const rotation = percentage * 180;
  
  const getColor = (v: number) => {
    if (v <= 50) return '#10b981'; // Good
    if (v <= 100) return '#f59e0b'; // Moderate
    if (v <= 150) return '#f97316'; // USG
    if (v <= 200) return '#f43f5e'; // Unhealthy
    return '#8b5cf6'; // Very Unhealthy / Hazardous
  };

  const color = getColor(value);

  return (
    <div className="relative w-48 h-24 overflow-hidden flex items-end justify-center">
      {/* Background Arc */}
      <div 
        className="absolute top-0 w-48 h-48 rounded-full border-[12px] border-[var(--bg-tertiary)]"
        style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent', transform: 'rotate(-45deg)' }}
      />
      
      {/* Value Arc */}
      <motion.div 
        initial={{ rotate: -45 }}
        animate={{ rotate: -45 + rotation }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 w-48 h-48 rounded-full border-[12px]"
        style={{ 
          borderColor: color,
          borderBottomColor: 'transparent', 
          borderLeftColor: 'transparent',
          filter: `drop-shadow(0 0 8px ${color})`
        }}
      />

      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-4xl font-black leading-none" style={{ color }}>{value}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mt-1">AQI Index</span>
      </div>
    </div>
  );
}
