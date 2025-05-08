import React from 'react';

interface SidebarProps {
  active: 'projects' | 'integrations' | 'settings' | null;
  onSelect: (section: 'projects' | 'integrations' | 'settings') => void;
}

const menu = [
  { key: 'projects', label: 'Projects', icon: '📁' },
  { key: 'integrations', label: 'Integrations', icon: '🔗' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
] as const;

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <nav className="h-full w-16 bg-gray-900 flex flex-col items-center py-4 space-y-2 shadow-lg">
      {menu.map((item) => (
        <button
          key={item.key}
          className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg text-xl transition-colors
            ${active === item.key ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          onClick={() => onSelect(item.key)}
          aria-label={item.label}
        >
          <span>{item.icon}</span>
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
} 