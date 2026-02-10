import { Search, Edit3, Mic, Settings, FolderOpen, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import logo from '../../assets/logo.png';

interface SidebarProps {
  onMenuClick?: (menu: string) => void;
}

export default function Sidebar({ onMenuClick }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { effectiveTheme } = useTheme();

  const menuItems = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'edit', icon: Edit3, label: 'Edit' },
    { id: 'voice', icon: Mic, label: 'Voice' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'files', icon: FolderOpen, label: 'Files' },
    { id: 'history', icon: Clock, label: 'History' },
  ];

  const handleClick = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
    onMenuClick?.(id);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className={`relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/60 border-cyan-600/40' : 'bg-black/20 border-cyan-500/30'} border rounded-3xl p-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]`}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-purple-500/10 rounded-3xl" />
        
        <div className="relative">
          <div className={`flex justify-center mb-3 pb-3 border-b ${effectiveTheme === 'light' ? 'border-cyan-600/30' : 'border-cyan-500/20'}`}>
            <div className={`w-10 h-10 rounded-xl border ${effectiveTheme === 'light' ? 'border-cyan-600/40' : 'border-cyan-500/30'} flex items-center justify-center`}>
              <img src={logo} alt="KIEL" className="w-6 h-auto" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                      : effectiveTheme === 'light'
                        ? 'hover:bg-cyan-600/10 border border-transparent hover:border-cyan-600/30'
                        : 'hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20'
                  }`}
                  title={item.label}
                >
                  <Icon size={20} className={isActive ? 'text-cyan-300' : effectiveTheme === 'light' ? 'text-gray-700 group-hover:text-cyan-600' : 'text-white/70 group-hover:text-cyan-300'} />
                  <span className={`absolute left-full ml-3 px-3 py-1.5 ${effectiveTheme === 'light' ? 'bg-white/95 border-cyan-600/40 text-cyan-700' : 'bg-black/90 border-cyan-500/30 text-cyan-300'} border text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 animate-pulse" />
                  )}
                </button>
              );
            })}
            
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-2" />
            
            <button className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 border border-transparent group ${
              effectiveTheme === 'light' ? 'hover:bg-cyan-600/10 hover:border-cyan-600/30' : 'hover:bg-cyan-500/10 hover:border-cyan-500/20'
            }`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all">
                <User size={16} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
