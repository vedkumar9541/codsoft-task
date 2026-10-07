'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', volume: 1200 },
  { time: '04:00', volume: 800 },
  { time: '08:00', volume: 4500 },
  { time: '12:00', volume: 3800 },
  { time: '16:00', volume: 4200 },
  { time: '20:00', volume: 5100 },
  { time: '23:59', volume: 2100 },
];

export default function TrafficTrend() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <XAxis 
          dataKey="time" 
          stroke="var(--text-muted)" 
          fontSize={12} 
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="var(--text-muted)" 
          fontSize={12} 
          tickLine={false}
          axisLine={false}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
          itemStyle={{ color: 'var(--text-primary)' }}
        />
        <Area 
          type="monotone" 
          dataKey="volume" 
          stroke="var(--accent-cyan)" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorVolume)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
