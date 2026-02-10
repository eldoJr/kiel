import { Search, Edit3, Mic, Settings, FolderOpen, Clock, User } from 'lucide-react';

interface SidebarProps {
  onMenuClick?: (menu: string) => void;
}

export default function Sidebar({ onMenuClick }: SidebarProps) {
  const menuItems = [
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'edit', icon: Edit3, label: 'Edit' },
    { id: 'voice', icon: Mic, label: 'Voice' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'files', icon: FolderOpen, label: 'Files' },
    { id: 'history', icon: Clock, label: 'History' },
  ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-3 shadow-2xl">
        <div className="flex flex-col gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onMenuClick?.(item.id)}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/20 transition-all duration-200 group relative"
                title={item.label}
              >
                <Icon size={20} className="text-white" />
                <span className="absolute left-full ml-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </button>
            );
          })}
          
          <div className="h-px bg-white/20 my-2" />
          
          {/* User Profile */}
          <button className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/20 transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
