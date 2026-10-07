'use client';

import { motion } from 'framer-motion';
import { Car, Gauge, Wind, Siren, Thermometer, Radio } from 'lucide-react';
import { useEffect, useState } from 'react';

const metrics = [
  { id: 1, title: 'Total Vehicles', value: 245902, unit: '', icon: Car, color: 'var(--accent-blue)', trend: '+5.2%' },
  { id: 2, title: 'Avg Speed', value: 32.4, unit: 'km/h', icon: Gauge, color: 'var(--accent-emerald)', trend: '-1.2%' },
  { id: 3, title: 'Air Quality (AQI)', value: 142, unit: 'USG', icon: Wind, color: 'var(--accent-amber)', trend: '+12' },
  { id: 4, title: 'Active Incidents', value: 24, unit: '', icon: Siren, color: 'var(--accent-rose)', trend: '-3' },
  { id: 5, title: 'Temperature', value: 34, unit: '°C', icon: Thermometer, color: 'var(--accent-amber)', trend: 'Clear' },
  { id: 6, title: 'Sensors Online', value: 98.5, unit: '%', icon: Radio, color: 'var(--accent-cyan)', trend: '+0.1%' },
];

function Counter({ value, isFloat }: { value: number, isFloat: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}</span>;
}

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="glass-card p-4 glass-card-hover group cursor-default relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <metric.icon size={80} style={{ color: metric.color }} />
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `color-mix(in srgb, ${metric.color} 15%, transparent)` }}
            >
              <metric.icon size={20} style={{ color: metric.color }} />
            </div>
            <span className={`text-xs font-semibold ${metric.trend.startsWith('+') && metric.id !== 4 && metric.id !== 3 ? 'text-[var(--accent-emerald)]' : metric.id === 5 ? 'text-[var(--text-secondary)]' : 'text-[var(--accent-rose)]'}`}>
              {metric.trend}
            </span>
          </div>
          
          <div>
            <h4 className="text-[var(--text-secondary)] text-sm font-medium mb-1">{metric.title}</h4>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold tracking-tight">
                <Counter value={metric.value} isFloat={metric.value % 1 !== 0} />
              </span>
              {metric.unit && <span className="text-sm text-[var(--text-muted)] font-medium">{metric.unit}</span>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
