'use client';

import { useUIStore } from '@/lib/store';

export default function MapLegend() {
  const { activeLayer } = useUIStore();

  if (activeLayer !== 'traffic') return null;

  return (
    <div className="glass-card p-3 text-xs">
      <h4 className="font-semibold mb-2 text-[var(--text-secondary)]">Traffic Congestion</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-[var(--accent-emerald)] rounded"></div>
          <span>Free Flowing (&gt; 40 km/h)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1.5 bg-[var(--accent-amber)] rounded"></div>
          <span>Moderate (20-40 km/h)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-2 bg-[var(--accent-rose)] rounded shadow-[0_0_5px_rgba(244,63,94,0.5)]"></div>
          <span>Heavy (&lt; 20 km/h)</span>
        </div>
      </div>
    </div>
  );
}
