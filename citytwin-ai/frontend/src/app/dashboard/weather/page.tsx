'use client';

import dynamic from 'next/dynamic';
import WeatherCard from '@/components/weather/WeatherCard';
import AQIGauge from '@/components/weather/AQIGauge';
import TrafficTrend from '@/components/dashboard/TrafficTrend'; // Reuse for chart

const CityMap = dynamic(() => import('@/components/map/CityMap'), { ssr: false });

export default function WeatherPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WeatherCard />
        </div>
        <div className="lg:col-span-2 glass-card p-6 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Air Quality Index</h2>
            <p className="text-[var(--text-secondary)] mb-6">Current PM2.5 levels are unhealthy for sensitive groups. Reduce prolonged outdoor exertion.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">PM2.5</div>
                <div className="font-bold text-lg text-[var(--accent-amber)]">85 µg/m³</div>
              </div>
              <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">PM10</div>
                <div className="font-bold text-lg text-[var(--accent-amber)]">140 µg/m³</div>
              </div>
              <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">NO2</div>
                <div className="font-bold text-lg text-[var(--accent-emerald)]">45 µg/m³</div>
              </div>
              <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-color)]">
                <div className="text-xs text-[var(--text-secondary)]">O3</div>
                <div className="font-bold text-lg text-[var(--accent-emerald)]">30 µg/m³</div>
              </div>
            </div>
          </div>
          <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
            <AQIGauge />
          </div>
        </div>
      </div>

      <div className="flex-1 glass-card relative overflow-hidden flex flex-col min-h-[400px]">
        <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-card)] flex justify-between items-center">
          <h3 className="font-semibold text-lg">Live Environmental Map</h3>
        </div>
        <div className="flex-1 relative">
          <CityMap />
        </div>
      </div>
    </div>
  );
}
