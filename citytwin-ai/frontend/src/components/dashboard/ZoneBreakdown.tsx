'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'South', congestion: 85 },
  { name: 'Central', congestion: 72 },
  { name: 'East', congestion: 65 },
  { name: 'North', congestion: 58 },
  { name: 'West', congestion: 45 },
];

export default function ZoneBreakdown() {
  const getColor = (val: number) => {
    if (val > 80) return 'var(--accent-rose)';
    if (val > 60) return 'var(--accent-amber)';
    return 'var(--accent-emerald)';
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          stroke="var(--text-secondary)" 
          fontSize={12} 
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip 
          cursor={{ fill: 'var(--bg-tertiary)' }}
          contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
        />
        <Bar dataKey="congestion" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.congestion)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
