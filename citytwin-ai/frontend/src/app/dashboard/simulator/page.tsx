'use client';

import { Play, Settings2, ShieldAlert } from 'lucide-react';
import dynamic from 'next/dynamic';

const CityMap = dynamic(() => import('@/components/map/CityMap'), { ssr: false });

export default function SimulatorPage() {
  return (
    <div className="h-full flex space-x-6">
      <div className="w-96 glass-card flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
          <h2 className="text-xl font-bold flex items-center">
            <Settings2 className="mr-2" />
            Scenario Builder
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Scenario Type</label>
            <select className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)]">
              <option>Road Closure (Construction)</option>
              <option>Heavy Rainfall</option>
              <option>VIP Movement</option>
              <option>Major Accident</option>
              <option>Festival / Event</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Affected Area</label>
            <button className="w-full bg-[color-mix(in_srgb,var(--accent-blue)_20%,transparent)] border border-[var(--accent-blue)] text-[var(--accent-blue)] rounded-lg px-4 py-3 font-semibold hover:bg-[color-mix(in_srgb,var(--accent-blue)_30%,transparent)] transition-colors">
              Select Area on Map
            </button>
            <p className="text-xs text-[var(--text-muted)] mt-2">Click to draw a polygon on the map.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Parameters</label>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Duration</span>
                  <span>4 hours</span>
                </div>
                <input type="range" className="w-full accent-[var(--accent-cyan)]" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Traffic Volume Multiplier</span>
                  <span>1.5x</span>
                </div>
                <input type="range" className="w-full accent-[var(--accent-cyan)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[var(--border-color)]">
          <button className="w-full bg-[var(--accent-emerald)] hover:bg-[#059669] text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center space-x-2 transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Play fill="currentColor" size={18} />
            <span>RUN SIMULATION</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex-1 glass-card relative overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
            <h3 className="font-semibold text-lg">Simulation Map</h3>
          </div>
          <div className="flex-1 relative">
            <CityMap />
          </div>
        </div>
        
        <div className="h-64 glass-card p-4 flex flex-col">
          <h3 className="font-semibold mb-4 text-[var(--text-secondary)]">Simulation Results (Preview)</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--border-color)] rounded-xl">
            <div className="text-center">
              <ShieldAlert size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
              <p className="text-[var(--text-muted)]">Configure and run a simulation to view predicted impact on traffic and AQI.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
