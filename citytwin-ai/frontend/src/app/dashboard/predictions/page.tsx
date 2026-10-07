'use client';

import { BrainCircuit, Clock, TrendingUp } from 'lucide-react';
import TrafficTrend from '@/components/dashboard/TrafficTrend'; // Reuse for demo

export default function PredictionsPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">AI Predictions</h2>
          <p className="text-[var(--text-secondary)]">Powered by Graph Neural Networks & Spatio-Temporal Models</p>
        </div>
        <div className="flex space-x-2 bg-[var(--bg-tertiary)] p-1 rounded-lg border border-[var(--border-color)]">
          {['1h', '6h', '12h', '24h'].map(t => (
            <button key={t} className={`px-4 py-1 rounded text-sm ${t === '1h' ? 'bg-[var(--accent-cyan)] text-black font-bold' : 'hover:text-white transition-colors'}`}>
              +{t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Traffic Congestion', val: 'Moderate', conf: '94%', model: 'ST-GCN', trend: 'up', color: 'var(--accent-amber)' },
          { title: 'Air Quality (AQI)', val: '156 USG', conf: '88%', model: 'LSTM-Ensemble', trend: 'down', color: 'var(--accent-rose)' },
          { title: 'Accident Risk', val: 'Low', conf: '91%', model: 'XGBoost', trend: 'flat', color: 'var(--accent-emerald)' },
        ].map((p, i) => (
          <div key={i} className="glass-card p-5 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <BrainCircuit size={100} style={{ color: p.color }} />
            </div>
            <h3 className="font-semibold text-[var(--text-secondary)] mb-4">{p.title}</h3>
            <div className="text-3xl font-black mb-1" style={{ color: p.color }}>{p.val}</div>
            <div className="flex items-center space-x-2 text-sm text-[var(--text-muted)] mb-4">
              <TrendingUp size={14} />
              <span>Trend: {p.trend}</span>
            </div>
            <div className="pt-4 border-t border-[var(--border-color)] flex justify-between text-xs">
              <span className="flex items-center"><Clock size={12} className="mr-1"/> +1h Horizon</span>
              <span className="font-mono bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">Conf: {p.conf}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 glass-card p-5 flex flex-col min-h-[300px]">
        <h3 className="font-semibold mb-4">Congestion Forecast Model Accuracy</h3>
        <div className="flex-1">
          <TrafficTrend /> {/* Placeholder for actual prediction chart */}
        </div>
      </div>
    </div>
  );
}
