'use client';

import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

const hotspots = [
  { id: 1, name: 'AIIMS Intersection', zone: 'South', cong: 92, speed: 12, trend: 'up' },
  { id: 2, name: 'ITO Crossing', zone: 'Central', cong: 88, speed: 14, trend: 'down' },
  { id: 3, name: 'Dhaula Kuan', zone: 'South-West', cong: 85, speed: 18, trend: 'up' },
  { id: 4, name: 'Anand Vihar ISBT', zone: 'East', cong: 82, speed: 20, trend: 'flat' },
  { id: 5, name: 'Kashmere Gate', zone: 'North', cong: 78, speed: 22, trend: 'down' },
];

export default function HotspotsTable() {
  return (
    <div className="flex-1 overflow-auto custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[var(--text-secondary)] text-sm border-b border-[var(--border-color)]">
            <th className="pb-3 font-medium">Rank</th>
            <th className="pb-3 font-medium">Junction Name</th>
            <th className="pb-3 font-medium">Zone</th>
            <th className="pb-3 font-medium text-right">Congestion</th>
            <th className="pb-3 font-medium text-right">Avg Speed</th>
            <th className="pb-3 font-medium text-center">Trend</th>
          </tr>
        </thead>
        <tbody>
          {hotspots.map((h, i) => (
            <tr key={h.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-colors group">
              <td className="py-3 font-mono text-[var(--text-secondary)]">#{i + 1}</td>
              <td className="py-3 font-semibold group-hover:text-[var(--accent-cyan)] transition-colors cursor-pointer">{h.name}</td>
              <td className="py-3 text-sm text-[var(--text-secondary)]">{h.zone}</td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-16 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${h.cong}%`,
                        backgroundColor: h.cong > 85 ? 'var(--accent-rose)' : h.cong > 70 ? 'var(--accent-amber)' : 'var(--accent-emerald)'
                      }}
                    />
                  </div>
                  <span className="font-mono text-sm">{h.cong}%</span>
                </div>
              </td>
              <td className="py-3 text-right font-mono text-sm">{h.speed} km/h</td>
              <td className="py-3 text-center">
                <div className="flex justify-center">
                  {h.trend === 'up' && <ArrowUpRight size={16} className="text-[var(--accent-rose)]" />}
                  {h.trend === 'down' && <ArrowDownRight size={16} className="text-[var(--accent-emerald)]" />}
                  {h.trend === 'flat' && <Minus size={16} className="text-[var(--text-muted)]" />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
