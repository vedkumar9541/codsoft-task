'use client';

import { useAuthStore } from '@/lib/store';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6">System Settings</h2>
      
      <div className="glass-card p-6">
        <h3 className="font-semibold text-lg border-b border-[var(--border-color)] pb-3 mb-4">User Profile</h3>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center text-3xl font-bold">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <h4 className="text-xl font-bold">{user?.name || 'Administrator'}</h4>
            <p className="text-[var(--text-secondary)] mb-4">{user?.role || 'City Manager'}</p>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--accent-rose)] hover:text-white border border-[var(--border-color)] rounded-lg transition-colors text-sm font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold text-lg border-b border-[var(--border-color)] pb-3 mb-4">Map Preferences</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Default Map Layer</h4>
              <p className="text-sm text-[var(--text-secondary)]">The primary layer shown on load</p>
            </div>
            <select className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-3 py-1.5 text-sm">
              <option>Traffic</option>
              <option>Air Quality</option>
              <option>Emergencies</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">3D View Performance Mode</h4>
              <p className="text-sm text-[var(--text-secondary)]">Reduce particle count for better framerate</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-[var(--bg-tertiary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-cyan)]"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold text-lg border-b border-[var(--border-color)] pb-3 mb-4">System Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between bg-[var(--bg-tertiary)] p-3 rounded">
            <span className="text-[var(--text-secondary)]">Frontend Version</span>
            <span className="font-mono">v1.2.4-stable</span>
          </div>
          <div className="flex justify-between bg-[var(--bg-tertiary)] p-3 rounded">
            <span className="text-[var(--text-secondary)]">API Uplink</span>
            <span className="font-mono text-[var(--accent-emerald)]">CONNECTED</span>
          </div>
          <div className="flex justify-between bg-[var(--bg-tertiary)] p-3 rounded">
            <span className="text-[var(--text-secondary)]">WebSocket</span>
            <span className="font-mono text-[var(--accent-emerald)]">CONNECTED</span>
          </div>
          <div className="flex justify-between bg-[var(--bg-tertiary)] p-3 rounded">
            <span className="text-[var(--text-secondary)]">3D Engine</span>
            <span className="font-mono">WebGL 2.0 Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
