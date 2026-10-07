'use client';

import TrafficTrend from '@/components/dashboard/TrafficTrend';
import ZoneBreakdown from '@/components/dashboard/ZoneBreakdown';

export default function AnalyticsPage() {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-auto">
      <h2 className="text-2xl font-bold">Analytics & Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Travel Time', val: '42m', change: '-4%', good: true },
          { label: 'Total Incidents (Week)', val: '142', change: '+12%', good: false },
          { label: 'Peak AQI Level', val: '210', change: '-15%', good: true },
          { label: 'Public Transit Usage', val: '4.2M', change: '+2.1%', good: true },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4">
            <h4 className="text-sm text-[var(--text-secondary)] mb-1">{stat.label}</h4>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black">{stat.val}</span>
              <span className={`text-sm font-bold ${stat.good ? 'text-[var(--accent-emerald)]' : 'text-[var(--accent-rose)]'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-80">
        <div className="glass-card p-4 flex flex-col">
          <h3 className="font-semibold mb-4">7-Day Traffic Volume</h3>
          <div className="flex-1">
            <TrafficTrend />
          </div>
        </div>
        <div className="glass-card p-4 flex flex-col">
          <h3 className="font-semibold mb-4">Congestion by Zone (Historical)</h3>
          <div className="flex-1">
            <ZoneBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
