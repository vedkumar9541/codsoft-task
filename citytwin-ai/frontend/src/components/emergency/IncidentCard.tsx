'use client';

import { Flame, ShieldAlert, HeartPulse, Shield } from 'lucide-react';

interface Props {
  id: number;
  type: 'accident' | 'fire' | 'medical' | 'crime';
  severity: 'critical' | 'warning' | 'info';
  loc: string;
  time: string;
  status: string;
}

export default function IncidentCard({ id, type, severity, loc, time, status }: Props) {
  const getIcon = () => {
    if (type === 'accident') return <ShieldAlert size={18} />;
    if (type === 'fire') return <Flame size={18} />;
    if (type === 'medical') return <HeartPulse size={18} />;
    return <Shield size={18} />;
  };

  const color = severity === 'critical' ? 'var(--accent-rose)' : severity === 'warning' ? 'var(--accent-amber)' : 'var(--accent-blue)';

  return (
    <div 
      className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl p-3 flex items-start space-x-3 cursor-pointer hover:bg-[color-mix(in_srgb,var(--bg-tertiary)_80%,white)] transition-colors relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
      
      <div 
        className="p-2 rounded-lg shrink-0 mt-0.5"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
      >
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-sm truncate pr-2 capitalize">{type} Reported</h4>
          <span className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">{time}</span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{loc}</p>
        
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]">
            ID: #{id}
          </span>
          <span 
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`, color }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
