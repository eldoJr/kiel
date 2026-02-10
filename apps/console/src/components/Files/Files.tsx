import DraggablePanel from '../DraggablePanel/DraggablePanel';
import { useTheme } from '../../contexts/ThemeContext';
import { File, Folder } from 'lucide-react';

export default function Files({ onClose }: { onClose?: () => void }) {
  const { effectiveTheme } = useTheme();
  const files = [
    { name: 'config.json', type: 'file', size: '2.4 KB' },
    { name: 'logs', type: 'folder', items: 12 },
    { name: 'data.db', type: 'file', size: '15.8 MB' },
    { name: 'scripts', type: 'folder', items: 8 },
  ];

  return (
    <DraggablePanel id="files" onClose={onClose}>
      <div className={`h-full flex flex-col relative backdrop-blur-md ${effectiveTheme === 'light' ? 'bg-white/80 border-purple-600/40' : 'bg-black/40 border-purple-500/30'} border rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none" />
        
        <div className={`drag-handle cursor-move p-4 border-b ${effectiveTheme === 'light' ? 'border-purple-600/30' : 'border-purple-500/20'} relative z-10`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold tracking-wider ${effectiveTheme === 'light' ? 'text-purple-700' : 'text-purple-300'}`}>FILES</h3>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
          {files.map((file, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg ${effectiveTheme === 'light' ? 'bg-white/40 border-purple-600/20 hover:border-purple-600/40' : 'bg-black/20 border-purple-500/10 hover:border-purple-500/30'} border transition-all cursor-pointer`}
            >
              {file.type === 'folder' ? (
                <Folder size={18} className="text-purple-400" />
              ) : (
                <File size={18} className="text-cyan-400" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${effectiveTheme === 'light' ? 'text-gray-800' : 'text-cyan-200'}`}>{file.name}</p>
                <p className={`text-xs ${effectiveTheme === 'light' ? 'text-purple-600/70' : 'text-purple-500/60'}`}>
                  {file.type === 'folder' ? `${file.items} items` : file.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DraggablePanel>
  );
}
