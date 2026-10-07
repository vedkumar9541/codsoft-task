'use client';

import { useUIStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Car,
  CloudSun,
  Siren,
  LineChart,
  BrainCircuit,
  Bot,
  TestTube2,
  Cuboid,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { name: 'City Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Traffic', path: '/dashboard/traffic', icon: Car },
  { name: 'Weather & AQI', path: '/dashboard/weather', icon: CloudSun },
  { name: 'Emergencies', path: '/dashboard/emergency', icon: Siren },
  { name: 'Analytics', path: '/dashboard/analytics', icon: LineChart },
  { name: 'Predictions', path: '/dashboard/predictions', icon: BrainCircuit },
  { name: 'AI Assistant', path: '/dashboard/assistant', icon: Bot },
  { name: 'Simulator', path: '/dashboard/simulator', icon: TestTube2 },
  { name: '3D City View', path: '/dashboard/3d', icon: Cuboid },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 80 }}
      className="glass-card rounded-none border-t-0 border-b-0 border-l-0 flex flex-col h-full relative z-20"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)]">
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl neon-text whitespace-nowrap"
          >
            CityTwin AI
          </motion.span>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[var(--accent-cyan-glow)] text-[var(--accent-cyan)] shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white'
              }`}
            >
              <item.icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'} />
              {sidebarOpen && (
                <span className="font-medium whitespace-nowrap text-sm">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[var(--border-color)]">
        <Link
          href="/dashboard/settings"
          className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
            pathname === '/dashboard/settings' ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white'
          }`}
        >
          <Settings size={22} />
          {sidebarOpen && <span className="font-medium">Settings</span>}
        </Link>
      </div>
    </motion.div>
  );
}
