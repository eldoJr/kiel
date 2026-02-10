import DraggablePanel from '../DraggablePanel/DraggablePanel';
import { Volume2, Bell, Palette, Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Settings({ onClose }: { onClose?: () => void }) {
  const { theme, setTheme, effectiveTheme } = useTheme();

  return (
    <DraggablePanel id="settings" onClose={onClose}>
      <div className={`h-full flex flex-col relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/80 border-cyan-600/40' : 'bg-black/40 border-cyan-500/30'} border rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        
        <div className={`drag-handle cursor-move p-4 border-b ${effectiveTheme === 'light' ? 'border-cyan-600/30' : 'border-cyan-500/20'} relative z-10`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold tracking-wider ${effectiveTheme === 'light' ? 'text-cyan-700' : 'text-cyan-300'}`}>SETTINGS</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
          <div className={`p-4 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-cyan-600/20' : 'bg-black/20 border-cyan-500/10'} border`}>
            <div className="flex items-center gap-3 mb-2">
              <Volume2 size={18} className="text-cyan-400" />
              <span className={`text-sm font-semibold ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>Audio</span>
            </div>
            <input type="range" className="w-full accent-cyan-500" />
          </div>
          
          <div className={`p-4 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-cyan-600/20' : 'bg-black/20 border-cyan-500/10'} border`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-purple-400" />
                <span className={`text-sm font-semibold ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>Notifications</span>
              </div>
              <input type="checkbox" className="accent-purple-500" defaultChecked />
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-cyan-600/20' : 'bg-black/20 border-cyan-500/10'} border`}>
            <div className="flex items-center gap-3 mb-2">
              <Palette size={18} className="text-cyan-400" />
              <span className={`text-sm font-semibold ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>Theme</span>
            </div>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'dark' | 'light' | 'system')}
              className={`w-full ${effectiveTheme === 'light' ? 'bg-white/60 border-cyan-600/40 text-gray-900' : 'bg-black/40 border-cyan-500/30 text-cyan-100'} border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400`}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div className={`p-4 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-cyan-600/20' : 'bg-black/20 border-cyan-500/10'} border`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-purple-400" />
                <span className={`text-sm font-semibold ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>Privacy Mode</span>
              </div>
              <input type="checkbox" className="accent-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </DraggablePanel>
  );
}
