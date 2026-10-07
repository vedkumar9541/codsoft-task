'use client';

import { useUIStore } from '@/lib/store';
import { Layers, Car, Wind, Siren, Plus } from 'lucide-react';

const layers = [
  { id: 'traffic', label: 'Traffic', icon: Car },
  { id: 'aqi', label: 'Air Quality', icon: Wind },
  { id: 'incidents', label: 'Incidents', icon: Siren },
  { id: 'hospitals', label: 'Hospitals', icon: Plus },
];

export default function LayerControls() {
  const { activeLayer, setActiveLayer } = useUIStore();

  return (
    <div className="glass-card p-2 flex flex-col space-y-1">
      <div className="px-2 py-1 flex items-center space-x-2 border-b border-[var(--border-color)] mb-1">
        <Layers size={14} className="text-[var(--text-secondary)]" />
        <span className="text-xs font-semibold text-[var(--text-secondary)]">LAYERS</span>
      </div>
      {layers.map((layer) => {
        const isActive = activeLayer === layer.id;
        return (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
              isActive 
                ? 'bg-[var(--accent-cyan-glow)] text-[var(--accent-cyan)] shadow-[inset_0_0_8px_rgba(6,182,212,0.2)]' 
                : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            <layer.icon size={16} />
            <span>{layer.label}</span>
          </button>
        );
      })}
    </div>
  );
}
