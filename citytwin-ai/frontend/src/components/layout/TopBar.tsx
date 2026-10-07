'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';

export default function TopBar() {
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1) return 'City Overview';
    const last = segments[segments.length - 1];
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  return (
    <div className="h-16 glass-card rounded-none border-t-0 border-l-0 border-r-0 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold tracking-tight">{getPageTitle()}</h2>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-cyan)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search junctions, incidents, commands..." 
            className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-full py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-full border border-[var(--border-color)]">
          <span className="font-mono">{format(time, 'MMM dd, yyyy')}</span>
          <span className="font-mono text-white font-medium">{format(time, 'HH:mm:ss')}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] pulse-glow" />
          <span className="text-xs font-semibold text-[var(--accent-emerald)] tracking-wider">SYSTEM ONLINE</span>
        </div>

        <button className="relative p-2 text-[var(--text-secondary)] hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-rose)] rounded-full border border-[var(--bg-primary)]"></span>
        </button>

        <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
