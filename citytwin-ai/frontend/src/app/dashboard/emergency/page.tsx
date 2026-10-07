'use client';

import dynamic from 'next/dynamic';
import IncidentCard from '@/components/emergency/IncidentCard';
import ResponseTimeGauge from '@/components/emergency/ResponseTimeGauge';
import ZoneBreakdown from '@/components/dashboard/ZoneBreakdown';

const CityMap = dynamic(() => import('@/components/map/CityMap'), { ssr: false });

export default function EmergencyPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-64">
        <div className="lg:col-span-2 glass-card p-4 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[var(--accent-rose)] opacity-5 blur-[100px] pointer-events-none" />
          <h3 className="font-semibold mb-4 text-[var(--accent-rose)] flex items-center">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-rose)] pulse-glow mr-2" />
            Live Incident Feed
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            <IncidentCard id={1} type="accident" severity="critical" loc="NH-8 Expressway" time="10 min ago" status="Dispatched" />
            <IncidentCard id={2} type="fire" severity="critical" loc="Okhla Phase 2" time="15 min ago" status="On Scene" />
            <IncidentCard id={3} type="medical" severity="warning" loc="CP Block A" time="22 min ago" status="Resolved" />
          </div>
        </div>

        <div className="glass-card p-4 flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-6 w-full text-left">Avg Response Time</h3>
          <ResponseTimeGauge />
        </div>

        <div className="glass-card p-4 flex flex-col">
          <h3 className="font-semibold mb-4">Active Resources</h3>
          <div className="flex-1">
             <ZoneBreakdown /> {/* Reusing chart for demo */}
          </div>
        </div>
      </div>

      <div className="flex-1 glass-card relative overflow-hidden flex flex-col min-h-[400px]">
        <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex justify-between items-center">
          <h3 className="font-semibold text-lg">Emergency Map</h3>
        </div>
        <div className="flex-1 relative">
          <CityMap />
        </div>
      </div>
    </div>
  );
}
