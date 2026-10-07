'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react';

const mockAlerts = [
  { id: 1, type: 'critical', title: 'Severe Congestion', msg: 'Outer Ring Road blocked near South Ex.', time: '2 min ago' },
  { id: 2, type: 'warning', title: 'AQI Spike', msg: 'PM2.5 levels exceeded 300 in Anand Vihar.', time: '15 min ago' },
  { id: 3, type: 'info', title: 'Event Setup', msg: 'Road closures begin at India Gate in 2h.', time: '1 hour ago' },
  { id: 4, type: 'critical', title: 'Major Accident', msg: 'NH-8 near Airport Expressway.', time: '2 hours ago' },
  { id: 5, type: 'warning', title: 'Sensor Offline', msg: 'Traffic cam TZ-442 unresponsive.', time: '3 hours ago' },
];

export default function AlertFeed() {
  const [alerts, setAlerts] = useState(mockAlerts);

  return (
    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
      {alerts.map((alert, i) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`p-3 rounded-xl border-l-4 bg-[var(--bg-tertiary)] hover:bg-[color-mix(in_srgb,var(--bg-tertiary)_80%,white)] transition-colors cursor-pointer ${
            alert.type === 'critical' ? 'border-[var(--accent-rose)]' : 
            alert.type === 'warning' ? 'border-[var(--accent-amber)]' : 'border-[var(--accent-blue)]'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="mt-0.5">
              {alert.type === 'critical' && <ShieldAlert size={16} className="text-[var(--accent-rose)]" />}
              {alert.type === 'warning' && <AlertTriangle size={16} className="text-[var(--accent-amber)]" />}
              {alert.type === 'info' && <Info size={16} className="text-[var(--accent-blue)]" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-sm">{alert.title}</h4>
                <span className="text-[10px] text-[var(--text-muted)] whitespace-nowrap ml-2">{alert.time}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">{alert.msg}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
