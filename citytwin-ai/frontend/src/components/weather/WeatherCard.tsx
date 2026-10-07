'use client';

import { CloudRain, Wind, Droplets, Eye } from 'lucide-react';

export default function WeatherCard() {
  return (
    <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-cyan)] opacity-10 blur-[60px] rounded-full transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-lg text-[var(--text-secondary)]">Current Weather</h3>
          <p className="text-sm text-[var(--text-muted)]">Delhi NCR</p>
        </div>
        <div className="p-3 bg-[color-mix(in_srgb,var(--accent-blue)_20%,transparent)] rounded-2xl border border-[var(--border-color)]">
          <CloudRain size={32} className="text-[var(--accent-cyan)]" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-baseline space-x-2">
          <span className="text-6xl font-black tracking-tighter">34°</span>
          <span className="text-2xl text-[var(--text-secondary)]">C</span>
        </div>
        <span className="text-lg text-[var(--accent-cyan)] font-medium mt-1">Light Rain</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-[var(--border-color)]">
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-[var(--text-muted)] mb-1">
            <Wind size={14} />
            <span className="text-xs">Wind</span>
          </div>
          <span className="font-semibold text-sm">12 km/h</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-[var(--text-muted)] mb-1">
            <Droplets size={14} />
            <span className="text-xs">Humidity</span>
          </div>
          <span className="font-semibold text-sm">65%</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-[var(--text-muted)] mb-1">
            <Eye size={14} />
            <span className="text-xs">Visibility</span>
          </div>
          <span className="font-semibold text-sm">4 km</span>
        </div>
      </div>
    </div>
  );
}
