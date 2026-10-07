'use client';

import dynamic from 'next/dynamic';
import MetricCards from '@/components/dashboard/MetricCards';
import CityHealthScore from '@/components/dashboard/CityHealthScore';
import AlertFeed from '@/components/dashboard/AlertFeed';
import TrafficTrend from '@/components/dashboard/TrafficTrend';
import ZoneBreakdown from '@/components/dashboard/ZoneBreakdown';

// Dynamic import for Leaflet map to avoid SSR issues
const CityMap = dynamic(() => import('@/components/map/CityMap'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <MetricCards />
      
      <div className="flex-1 flex space-x-6 min-h-[500px]">
        {/* Main Map Area (65%) */}
        <div className="flex-[2] glass-card relative overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-card)]">
            <h3 className="font-semibold text-lg">Live City Map</h3>
            <div className="flex space-x-2">
              <span className="flex items-center text-xs space-x-1"><div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]" /><span>Smooth</span></span>
              <span className="flex items-center text-xs space-x-1"><div className="w-2 h-2 rounded-full bg-[var(--accent-amber)]" /><span>Moderate</span></span>
              <span className="flex items-center text-xs space-x-1"><div className="w-2 h-2 rounded-full bg-[var(--accent-rose)]" /><span>Heavy</span></span>
            </div>
          </div>
          <div className="flex-1 relative">
            <CityMap />
          </div>
        </div>

        {/* Side Panel (35%) */}
        <div className="flex-1 flex flex-col space-y-6">
          <CityHealthScore />
          
          <div className="flex-1 glass-card p-4 flex flex-col">
            <h3 className="font-semibold mb-4">Active Alerts</h3>
            <AlertFeed />
          </div>
        </div>
      </div>

      <div className="flex space-x-6 h-64">
        <div className="flex-1 glass-card p-4">
          <h3 className="font-semibold mb-4">Traffic Trend (24h)</h3>
          <div className="h-48">
            <TrafficTrend />
          </div>
        </div>
        <div className="flex-1 glass-card p-4">
          <h3 className="font-semibold mb-4">Zone Congestion Breakdown</h3>
          <div className="h-48">
            <ZoneBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
