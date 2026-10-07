'use client';

import dynamic from 'next/dynamic';
import HotspotsTable from '@/components/traffic/HotspotsTable';
import TrafficTrend from '@/components/dashboard/TrafficTrend';
import ZoneBreakdown from '@/components/dashboard/ZoneBreakdown';

const CityMap = dynamic(() => import('@/components/map/CityMap'), { ssr: false });

export default function TrafficPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex-1 glass-card relative overflow-hidden flex flex-col min-h-[400px]">
        <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex justify-between items-center">
          <h3 className="font-semibold text-lg">Live Traffic Monitor</h3>
          <div className="flex space-x-4 text-sm">
            <span className="text-[var(--accent-emerald)] font-medium">Avg: 32 km/h</span>
            <span className="text-[var(--accent-amber)] font-medium">Moderate Congestion</span>
          </div>
        </div>
        <div className="flex-1 relative">
          <CityMap />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2 glass-card p-4 flex flex-col">
          <h3 className="font-semibold mb-4">Top Congested Hotspots</h3>
          <HotspotsTable />
        </div>
        <div className="glass-card p-4 flex flex-col space-y-6">
          <div className="flex-1">
            <h3 className="font-semibold mb-4">Network Volume</h3>
            <div className="h-32">
              <TrafficTrend />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-4">Zone Breakdown</h3>
            <div className="h-32">
              <ZoneBreakdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
